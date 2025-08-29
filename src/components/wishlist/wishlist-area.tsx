"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// internal
import { add_cart_product } from "@/redux/features/cart";
import {
  getWishlistProducts,
  remove_wishlist_product,
} from "@/redux/features/wishlist";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IProduct } from "@/types/product-d-t";

const WishlistArea = () => {
  const [discountedRetailPrice, setDiscountedRetailPrice] = useState<any>(0);
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();
  // handle remove
  const handleRemove = (item: IProduct) => {
    dispatch(remove_wishlist_product(item));
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      dispatch(getWishlistProducts());
    }
  }, [dispatch]);

  const [wishlistProduct, setWishlistProduct] = useState<any>(
    JSON.parse(localStorage.getItem("wishlist") as any) || []
  );

  const handleRemoveProd = (prod: any) => {
    setWishlistProduct(
      wishlistProduct.filter((itm: any) => itm?.id !== prod?.id)
    );
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistProduct));
  }, [wishlistProduct]);

  const handleChangeVariant = (variant: any) => {
    console.log({ variant });
    setDiscountedRetailPrice(variant?.discountedRetailPrice);
  };

  return (
    <section className="cart-area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {wishlistProduct.length === 0 && (
              <div className="text-center">
                <h3>No wishlist product</h3>
              </div>
            )}
            {wishlistProduct.length > 0 && (
              <div>
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Images</th>
                        <th className="cart-product-name">Product</th>
                        <th className="product-price">Variant</th>
                        {/* <th className="product-price">Price</th> */}
                        <th className="product-quantity">Action</th>
                        {/* <th className="product-subtotal">Total</th> */}
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlistProduct.map((product: any, index: any) => (
                        <tr key={product?.id}>
                          <td className="product-thumbnail">
                            <Link href={`/product-details/${product?.slug}`}>
                              <Image
                                src={
                                  product?.images[0]?.image ?? "/noimage.png"
                                }
                                alt="wishlist-img"
                                width={125}
                                height={159}
                                style={{
                                  height: "90px",
                                  objectFit: "contain",
                                }}
                              />
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link href={`/product-details/${product?.slug}`}>
                              {product.name}
                            </Link>
                          </td>
                          <td className="product-price">
                            <span className="amount">
                              <select>
                                {product.productAttributes?.map((itm: any) => {
                                  return (
                                    <option
                                      key={itm?.size}
                                      value={itm?.size}
                                      onChange={() => handleChangeVariant(itm)}
                                    >
                                      {itm?.size}
                                    </option>
                                  );
                                })}
                              </select>
                              {/* {
                                product.productAttributes[0]
                                  ?.discountedRetailPrice
                              }{" "}
                              TK */}
                            </span>
                          </td>
                          {/* <td>
                            {discountedRetailPrice !== 0
                              ? discountedRetailPrice
                              : product.productAttributes[0]
                                  ?.discountedRetailPrice}
                          </td> */}
                          <td className="product-quantity">
                            <button
                              onClick={() =>
                                dispatch(add_cart_product(product))
                              }
                              className="os-btn os-btn-black"
                              type="submit"
                            >
                              Add TO Cart
                            </button>
                          </td>
                          {/* <td className="product-subtotal">
                            <span className="amount">${product.price}</span>
                          </td> */}
                          <td className="product-remove">
                            <button onClick={() => handleRemoveProd(product)}>
                              <i className="fa fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishlistArea;
