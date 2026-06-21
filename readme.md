# Inventory Management System

A full-stack Inventory Management System built using React, FastAPI, PostgreSQL, and Docker.

## Features

* Product Management (Create, Read, Update, Delete)
* Customer Management (Create, Read, Delete)
* Order Management
* Dashboard with statistics
* Low Stock Product Alerts
* REST API with FastAPI
* PostgreSQL Database
* Dockerized Backend & Database

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL

### DevOps

* Docker
* Docker Compose

## Project Structure

```text
inventory-management-system/
├── backend/
├── frontend/
├── docker-compose.yml
└── readme.md
```

## Running with Docker

```bash
docker compose up --build
```

Backend:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

Frontend:

```text
http://localhost:5173
```

## Dashboard Metrics

* Total Products
* Total Customers
* Total Orders
* Low Stock Products

## Author

Ashish kumar Singh
