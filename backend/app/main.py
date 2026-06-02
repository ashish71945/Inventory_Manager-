from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base
from app.database import engine
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order

from app.routers.products import router as product_router
from app.routers.customers import router as customer_router
from app.routers.orders import router as order_router
from app.routers.dashboard import router as dashboard_router
    
app = FastAPI(
    title="Inventory API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(
    bind=engine
)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)
