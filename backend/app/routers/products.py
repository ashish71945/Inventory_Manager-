from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate

from app.models.order import Order

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.post("/")
def create_product(
    product:ProductCreate,
    db:Session = Depends(get_db)
):

    existing = db.query(Product)\
        .filter(
            Product.sku == product.sku
        ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    new_product = Product(**product.model_dump())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.get("/")
def get_products(
    db:Session = Depends(get_db)
):
    return db.query(Product).all()


@router.get("/{product_id}")
def get_product(
    product_id:int,
    db:Session = Depends(get_db)
):

    product = db.query(Product)\
        .filter(
            Product.id == product_id
        ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product

@router.put("/{product_id}")
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    existing_product = db.query(Product)\
        .filter(Product.id == product_id)\
        .first()

    if not existing_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    sku_exists = db.query(Product)\
        .filter(
            Product.sku == product.sku,
            Product.id != product_id
        ).first()

    if sku_exists:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    existing_product.name = product.name
    existing_product.sku = product.sku
    existing_product.price = product.price
    existing_product.quantity = product.quantity

    db.commit()
    db.refresh(existing_product)

    return existing_product

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(Product)\
        .filter(Product.id == product_id)\
        .first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    existing_order = db.query(Order)\
        .filter(Order.product_id == product_id)\
        .first()

    if existing_order:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete product with existing orders"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }