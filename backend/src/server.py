from controller import app
import logging

logger = logging.getLogger("uvicorn")

def main():
    init_mysql_db()
    logger.info("Starting API...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    
if __name__ == "__main__":
    import uvicorn
    from dal import init_mysql_db 
    
    main()