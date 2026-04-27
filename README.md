<img width="1640" height="959" alt="ChatGPT Image Apr 27, 2026, 03_42_50 PM" src="https://github.com/user-attachments/assets/c08a5f4a-b117-444c-8ca7-396712a87ae8" />
# Job Tracker — Production Kubernetes Platform on AWS EKS

## What I Built
A production-grade deployment platform for a full-stack Job Tracker application (React + Flask + PostgreSQL) running on AWS EKS with GitOps, CI/CD, auto-scaling, and full observability.

## CI/CD

<img width="1871" height="909" alt="Screenshot 2026-04-27 153732" src="https://github.com/user-attachments/assets/4d2ed7df-7db0-4392-9579-4f4d6aa30335" />

## Grafana

<img width="1521" height="963" alt="Screenshot 2026-04-27 153639" src="https://github.com/user-attachments/assets/36beb37e-0587-4dfa-a22e-50793b6929b4" />

## ArgoCD

<img width="1729" height="909" alt="Screenshot 2026-04-27 153510" src="https://github.com/user-attachments/assets/b6219082-f172-428c-8b7c-cdd6292dfb35" />
<img width="1709" height="953" alt="Screenshot 2026-04-27 153442" src="https://github.com/user-attachments/assets/c39397b1-979a-4c3f-bcc5-0ff632ae1d2f" />

## Architecture

<img width="1640" height="959" alt="ChatGPT Image Apr 27, 2026, 03_42_50 PM" src="https://github.com/user-attachments/assets/c08a5f4a-b117-444c-8ca7-396712a87ae8" />


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
