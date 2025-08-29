"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/types/product-d-t";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { add_cart_product } from "@/redux/features/cart";

const SingleSmProduct = ({ product }: { product: IProduct }) => {
  const [isItemAddToCart, setIsItemAddToCart] = useState(false);
  const { cart_products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsItemAddToCart(cart_products.some((i) => i.id === product.id));
  }, [cart_products, product.id]);

  return (
    <>
      <div className="features__product-wrapper d-flex mb-20">
        <div className="features__product-thumb mr-15">
          <Link href={`/product-details/${product.id}`}>
            <Image src={product.img} alt="pro-sm-1" width={85} height={100} />
          </Link>
        </div>
        <div className="features__product-content">
          <h5>
            <Link href={`/product-details/${product.id}`}>{product.title}</Link>
          </h5>
          <div className="price">
            <span>${product.price}</span>
            {product.old_price && (
              <span className="price-old">${product.old_price}</span>
            )}
            <div className="add-cart p-absolute transition-3">
              {isItemAddToCart ? (
                <Link href="/cart" className="cursor-pointer">
                  View Cart
                </Link>
              ) : (
                <button onClick={() => dispatch(add_cart_product(product))}>
                  + Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleSmProduct;
