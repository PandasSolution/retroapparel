'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// internal
import { IProduct } from "@/types/product-d-t";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { add_cart_product } from "@/redux/features/cart";
import { handleModalProduct, handleOpenModal } from "@/redux/features/utility";

// img style
const imgStyle = {
  width: "100%",
  height: "100%",
};

const ProductItemTwo = ({ product }: { product: IProduct }) => {
  const [isItemAddToCart, setIsItemAddToCart] = useState(false);
  const { cart_products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsItemAddToCart(cart_products.some((i) => i.id === product.id));
  }, [cart_products,product.id]);
  
  
  const handleProductModal = (prd: IProduct) => {
    dispatch(handleModalProduct({ product: prd }))
    dispatch(handleOpenModal())
  }

  return (
    <div className="product__item mb-40">
      <div className="product__wrapper">
        <div className="product__thumb">
          <Link href={`/product-details/${product.id}`} className="w-img">
            <Image src={product.img} alt="product-img" width={261} height={333} style={imgStyle} />
            <Image
              className="product__thumb-2"
              src={product.thumb_img}
              alt="product-img"
              width={261} height={333} style={imgStyle}
            />
          </Link>
          <div className="product__action-3 transition-3">
          {isItemAddToCart ? (
            <Link href="/cart" className="action-btn">
              View Cart
            </Link>
          ) : (
            <a
              onClick={() => dispatch(add_cart_product(product))}
              className="action-btn"
            >
              <i className="fal fa-plus"></i> Add to cart
            </a>
          )}

            <a
              className="action-btn cursor-pointer"
              onClick={() =>handleProductModal(product)}
            >
              <i className="fal fa-eye"></i>
            </a>
          </div>
          {product.new && (
            <div className="product__sale product__sale-3">
              <span className="new">new</span>
            </div>
          )}
        </div>
        <div className="product__content product__content-2 p-relative text-center">
          <div className="product__content-inner">
            <div className="rating">
              <a href="#"><i className="fal fa-star"></i></a>
              <a href="#"><i className="fal fa-star"></i></a>
              <a href="#"><i className="fal fa-star"></i></a>
              <a href="#"><i className="fal fa-star"></i></a>
              <a href="#"><i className="fal fa-star"></i></a>
            </div>
            <h4>
              <Link href={`/product-details/${product.id}`}>
                {product.title}
              </Link>
            </h4>
            <div className="product__price-3">
              <span>${product.price.toFixed(2)}</span>
              {product.old_price && (
                <span className="old-price">
                  <del> ${product.old_price.toFixed(2)}</del>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemTwo;
