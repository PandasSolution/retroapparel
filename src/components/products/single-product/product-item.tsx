"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { handleModalProduct, handleOpenModal } from "@/redux/features/utility";

const ProductItem = ({
  product,
  setLoading,
  isSearchPopup = false, // add this
}: {
  product: any;
  setLoading?: any;
  isSearchPopup?: boolean; // declare it here
}) => {
  const [isWishlistAdd, setIsWishlistAdd] = useState(false);
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    setIsWishlistAdd(wishlist.some((i) => i.id === product.id));
  }, [wishlist, product.id]);

  const handleProductModal = (prd: any) => {
    dispatch(handleModalProduct({ product: prd }));
    dispatch(handleOpenModal());
  };

  const addToWishlist = (prod: any) => {
    let wishlistProduct = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlistProduct.some((i: any) => i.id === prod.id);
    if (exists) wishlistProduct = wishlistProduct.filter((i: any) => i.id !== prod.id);
    else wishlistProduct.push({ ...prod, count: 1 });
    localStorage.setItem("wishlist", JSON.stringify(wishlistProduct));
    setIsWishlistAdd(!exists);
  };

  return (
    <div className="product-card-full">
      <Link href={`/product-details/${product.slug}`} onClick={() => setLoading && setLoading(true)}>
        <div className="product-image-wrapper">
          <Image
            src={product?.images?.[0]?.image ?? "/noimage.png"}
            alt={product.name}
            fill
            style={{ objectFit: "cover", borderRadius: "20px" }}
          />
          {product?.images?.[1]?.image && (
            <Image
              src={product.images[1].image}
              alt={product.name}
              fill
              className="hover-image"
              style={{ objectFit: "cover", borderRadius: "20px" }}
            />
          )}
          {/* Overlay content */}
          <div className="product-overlay">
            <h4>{product.name}</h4>
            <div className="price">
              <span>{product.productAttributes?.[0]?.discountedRetailPrice} TK</span>
              {product.productAttributes?.[0]?.discountPercent > 0 && (
                <span className="old-price">{product.productAttributes[0].retailPrice} TK</span>
              )}
            </div>
            <div className="overlay-buttons">
              <button className={`wishlist-btn ${isWishlistAdd ? "active" : ""}`} onClick={() => addToWishlist(product)}>
                <i className="fal fa-heart"></i>
              </button>
              <button className="view-btn" onClick={() => handleProductModal(product)}>
                <i className="fal fa-search"></i>
              </button>
              <button className="add-cart-btn" onClick={() => handleProductModal(product)}>
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
