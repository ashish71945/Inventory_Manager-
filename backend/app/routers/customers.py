from app.models.order import Order
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.post("/")
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(Customer)\
        .filter(
            Customer.email == customer.email
        ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_customer = Customer(**customer.model_dump())

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return new_customer


@router.get("/")
def get_customers(
    db: Session = Depends(get_db)
):
    return db.query(Customer).all()


@router.get("/{customer_id}")
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer)\
        .filter(
            Customer.id == customer_id
        ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


@router.delete("/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer)\
        .filter(
            Customer.id == customer_id
        ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )
        
    existing_order = db.query(Order)\
        .filter(Order.customer_id == customer_id)\
        .first()

    if existing_order:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete customer with existing orders"
        )


    db.delete(customer)
    db.commit()

    return {
        "message": "Customer deleted successfully"
    }