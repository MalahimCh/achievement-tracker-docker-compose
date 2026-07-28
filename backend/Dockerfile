# Base image
FROM python:3.12-slim

# Prevent Python from creating .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Show logs immediately
ENV PYTHONUNBUFFERED=1

# Working directory inside container
WORKDIR /app

# Copy requirements first (better Docker caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app ./app

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
