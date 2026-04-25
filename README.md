# Job Tracker

A full-stack job application tracking app, fully containerized with Docker.

## Preview

![Dashboard](assets/dashboard.png)<img width="1276" height="967" alt="Screenshot 2026-04-25 092148" src="https://github.com/user-attachments/assets/e9596d13-021c-4153-bcda-568ca4ef62a1" />


## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Nginx |
| Backend | Flask + SQLAlchemy + Gunicorn |
| Database | PostgreSQL 15 |
| Container | Docker + Docker Compose |
| CI/CD | GitHub Actions + Docker Hub |

## Architecture

Browser → Nginx (port 80) → Flask API (port 5000) → PostgreSQL (port 5432)

All services run in isolated containers on a private Docker bridge network.
Only port 80 is exposed to the outside world.

## Quick Start

```bash
git clone https://github.com/Amitpm8/Job-tracker.git
cd Job-tracker
cp .env.example .env
# Edit .env with your values
docker compose up --build
```

Open `http://localhost` in your browser.

## Docker Concepts Covered

- Dockerfile layer caching optimization
- Multi-stage builds (Node → Nginx, 900MB → 25MB)
- Docker Compose service networking
- Named volumes for data persistence
- Healthchecks with `depends_on: condition: service_healthy`
- Environment variable injection at runtime
- CI/CD pipeline with GitHub Actions + Docker Hub registry
- Image tagging strategy (`:latest` + `:git-sha` for rollback)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobs | Get all jobs |
| POST | /api/jobs | Add new job |
| PUT | /api/jobs/:id | Update job |
| DELETE | /api/jobs/:id | Delete job |
| GET | /api/stats | Get dashboard stats |

## CI/CD Pipeline

Every push to `main` branch:
1. Builds backend and frontend Docker images
2. Pushes to Docker Hub with `:latest` and `:git-sha` tags
3. Layer caching keeps builds under 30 seconds

## Local Development

```bash
docker compose logs -f backend    # Flask logs
docker compose logs -f db         # Postgres logs
docker compose ps                 # Container status
docker exec -it job-tracker-backend-1 bash  # Shell into backend
```
