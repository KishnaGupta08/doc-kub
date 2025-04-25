# 🌦️ Weather Dashboard with Backend API

This is a full-stack weather dashboard project built with **React**, **Node.js**, **Express**, and **MongoDB**. The application allows users to register, login, and search weather forecasts by city. The project is fully containerized using **Docker** and deployed using **Kubernetes** with proper **Ingress** routing for frontend and backend services.

---

## 🚀 Features

- 🌐 React frontend with real-time weather search
- 🔐 Node.js + Express backend with user authentication (JWT)
- 📦 MongoDB for storing user data and preferences
- 🐳 Dockerized for easy deployment
- ☸️ Kubernetes setup with Ingress for domain-based routing
- ⚡ Works locally using `minikube tunnel`

---

## 📁 Project Structure


---

## 🧰 Tech Stack

- **Frontend**: React, Axios, TailwindCSS (optional)
- **Backend**: Node.js, Express, JWT Auth
- **Database**: MongoDB
- **DevOps**: Docker, Kubernetes, Ingress Controller, Minikube

---

## 🛠️ Getting Started

### Prerequisites

- Node.js & npm
- Docker & Docker Compose
- Minikube
- kubectl
- NGINX Ingress Controller installed

### Local Setup

```bash
# Start minikube and enable ingress
minikube start
minikube tunnel

# Apply K8s configurations
kubectl apply -f kub-yaml-files/

# Edit your hosts file:
127.0.0.1   weather.local
127.0.0.1   backend.local


📦 Docker Build Commands
docker build -t weather-frontend ./frontend
docker build -t weather-backend ./backend



📡 API Endpoints
POST /api/auth/register
POST /api/auth/login



🧪 Test with cURL

curl -X POST http://backend.local/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'