# Job Tracker — Production Kubernetes Platform on AWS EKS

## What I Built
A production-grade deployment platform for a full-stack Job Tracker application (React + Flask + PostgreSQL) running on AWS EKS with GitOps, CI/CD, auto-scaling, and full observability.

## Architecture
Developer pushes code
↓
GitHub Actions (CI/CD)

Builds Docker images
Pushes to AWS ECR
Updates k8s manifests
↓
Argo CD (GitOps)
Detects manifest changes
Auto-syncs to EKS cluster
↓
EKS Cluster (ap-south-1)
backend (Flask API) — HPA enabled
frontend (React + Nginx)
postgres (PostgreSQL 15)
↓
Prometheus + Grafana
Live metrics and dashboards


## Problems This Solves
| Problem | Solution |
|---------|----------|
| Single server = single point of failure | EKS runs pods across multiple nodes |
| Manual deployments = human error | Argo CD GitOps — Git is source of truth |
| Traffic spikes crash the server | HPA scales pods automatically at 60% CPU |
| No visibility into system health | Prometheus scrapes metrics, Grafana visualizes |
| Inconsistent builds | GitHub Actions standardizes every build |

## Tech Stack
- **AWS EKS** — managed Kubernetes cluster
- **AWS ECR** — private Docker registry
- **Argo CD** — GitOps continuous deployment
- **GitHub Actions** — CI/CD pipeline
- **Helm** — package manager for Kubernetes
- **Prometheus + Grafana** — monitoring and alerting
- **HPA** — Horizontal Pod Autoscaler

## Key Results
- Zero-downtime deployments via rolling updates
- Auto-scaling proven: CPU hit 183% under load, HPA triggered scale-out
- Full GitOps: no manual kubectl apply in production
- 15+ Kubernetes dashboards in Grafana out of the box

## How to Deploy
```bash
# 1. Create EKS cluster
eksctl create cluster --name job-tracker-cluster --region ap-south-1 --node-type t3.small --nodes 3 --managed

# 2. Deploy application
kubectl apply -f k8s/base/

# 3. Install Argo CD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl apply -f argocd/application.yaml

# 4. Install monitoring
helm install monitoring prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
```

## What I Learned
- How GitOps eliminates deployment risk by making Git the single source of truth
- How HPA and Cluster Autoscaler work together to handle traffic spikes
- How Prometheus scrapes metrics and why pull-based monitoring is more reliable than push
- Real debugging: pod scheduling failures due to node capacity limits on t3.micro vs t3.small
