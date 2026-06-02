# Inventory Management System

## Features

- Product Management
- Customer Management
- Order Management
- Dashboard
- Low Stock Alerts

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- React Router

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL

## Setup

### Backend

pip install -r requirements.txt

uvicorn app.main:app --reload

### Frontend

npm install

npm run dev

## API Endpoints

### Products
GET /products
POST /products
PUT /products/{id}
DELETE /products/{id}

### Customers
...

### Orders
...

### Dashboard
GET /dashboard