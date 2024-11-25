import redis
from functools import wraps
import pickle
import os
import logging

logger = logging.getLogger("uvicorn")

# Connect to Redis
redis_client = redis.Redis(
        host=os.getenv('REDIS_HOST', 'localhost'), 
        port=os.getenv('REDIS_PORT', 6379), 
        db=0
    )

def redis_bloom_cache(bloom_key, cache_key_prefix, expire_time=os.getenv('REDIS_EXPIRE_TIME', 3600)):
    """
    A decorator that implements a caching mechanism using Redis and a Bloom filter.

    This decorator checks if a function call is likely cached using a Bloom filter,
    then retrieves the result from Redis if it exists. If not found, it executes
    the function, caches the result, and adds the key to the Bloom filter.

    The mechanism works as follows:
    1. Check if the function call key exists in the Bloom filter.
    2. If it does (Bloom filter hit):
       a. Try to retrieve the result from the Redis cache.
       b. If found in cache, return the cached result.
       c. If not found in cache (false positive), execute the function and add the result to the cache.
    3. If it doesn't exist in the Bloom filter:
       a. Execute the function.
       b. Add the key to the Bloom filter.
       c. Do NOT add the result to the cache.

    This approach ensures that the cache is only populated for keys that have been
    previously added to the Bloom filter, reducing unnecessary cache entries and
    potential cache pollution.

    Parameters:
    bloom_key (str): The key used for the Bloom filter in Redis.
    cache_key_prefix (str): The prefix used for cache keys in Redis.
    expire_time (int, optional): The expiration time for cached results in seconds.
                                 Defaults to 3600 (1 hour).

    Returns:
    function: A wrapped function that implements the caching mechanism.

    Note:
    The wrapped function will return the cached result if available, otherwise
    it will execute the original function. Results are only cached if the Bloom
    filter indicates a potential previous execution.
    """

    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generate a unique key for the function call
            call_key = pickle.dumps((func.__name__, args, kwargs))
            cache_key = f"{cache_key_prefix}:{call_key}"

            # Check if the key might exist in the Bloom filter
            if redis_client.execute_command('BF.EXISTS', bloom_key, call_key):
                logger.info("Bloom filter hit!")
                
                # If it might exist, try to get it from Redis cache
                cached_result = redis_client.get(cache_key)
                if cached_result:
                    logger.info("Cache hit!")
                    return pickle.loads(cached_result)
                else:
                    logger.info("Bloom filter false positive")
                    
                    # If not in cache but in Bloom filter, call the function and add to cache
                    result = await func(*args, **kwargs)

                    # Store the result in Redis cache
                    redis_client.setex(cache_key, expire_time, pickle.dumps(result))
                    
                    return result
            else:
                logger.info("Bloom filter miss!")

            # If not in cache or Bloom filter, call the function
            result = await func(*args, **kwargs)

            # Add the key to the Bloom filter
            redis_client.execute_command('BF.ADD', bloom_key, call_key)

            return result
        return wrapper
    return decorator

# Example usage
if __name__ == "__main__":
    @redis_bloom_cache('function_calls', 'cache_prefix', expire_time=3600)
    def example_function(a, b):
        print("Executing expensive operation")
        return a + b
        
    print(example_function(1, 2))  # First call, will execute the function
    print(example_function(1, 2))  # Second call, should be a cache hit
    print(example_function(3, 4))  # New parameters, will execute the function