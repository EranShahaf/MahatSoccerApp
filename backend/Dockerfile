FROM python:3.12.7

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the src code to the Docker image
COPY ./src/ ./

# Expose the port the app runs on
EXPOSE 8000

# Command to run the FastAPI server
CMD ["python", "server.py"]