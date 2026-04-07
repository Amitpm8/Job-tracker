# Use the official Python 3.11 slim image as the base — slim reduces image size by
# omitting unused system packages while still supporting psycopg2-binary out of the box
FROM python:3.11-slim

# Prevent Python from writing .pyc bytecode files — keeps the image clean and lean
ENV PYTHONDONTWRITEBYTECODE=1

# Force Python to send stdout/stderr straight to terminal without buffering
# — without this, docker logs shows nothing until buffer flushes, making debugging blind
ENV PYTHONUNBUFFERED=1

# Set /app as the working directory inside the container
# — all subsequent COPY, RUN, CMD commands operate relative to this path
WORKDIR /app

# Copy requirements.txt FIRST before any source code
# — Docker caches each layer, pip install is expensive (30-60s)
# — as long as requirements.txt doesn't change, Docker skips this layer on rebuild
COPY requirements.txt .

# Install all Python dependencies
# — --no-cache-dir tells pip not to store download cache on disk, reducing image size
RUN pip install --no-cache-dir -r requirements.txt

# Copy all remaining source files AFTER pip install
# — code changes daily but dependencies change rarely
# — this order means editing app.py never re-triggers pip install
# — .dockerignore handles excluding .env, __pycache__, etc.
COPY . .

# Tell Docker this container listens on port 5000
# — EXPOSE is documentation + used by Compose for internal networking
EXPOSE 5000

# Start the app using Gunicorn — production WSGI server, not flask run
# — app:create_app() calls the factory function in app.py
# — 0.0.0.0 binds to all interfaces so Docker network traffic can reach it
# — 3 workers handle concurrent requests
# — CMD not ENTRYPOINT so it can be overridden (e.g. docker run ... bash)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "3", "app:create_app()"]
