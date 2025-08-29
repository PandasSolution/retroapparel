"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// internal
import { fetchData } from "@/api/api";
import useCartInfo from "@/hooks/use-cart-info";
import {
  add_cart_product,
  clearCart,
  getCartProducts,
  quantityDecrement,
  remove_product,
} from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCookies } from "next-client-cookies";

const CartArea = () => {
  const cookies = useCookies();
  const { cart_products } = useAppSelector((state) => state.cart);
  const { total } = useCartInfo();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      dispatch(getCartProducts());
    }
  }, [dispatch]);

  const [coupon, setCoupon] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [couponData, setCouponData] = useState<any>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("coupon") as any) ?? null
      : null
  );
  const [singleCouponData, setSingleCouponData] = useState<any | null>();

  const fetchCoupons = async () => {
    try {
      const response = await fetchData({
        url: `/customer/coupons`,
        cache: `no-store`,
      });

      if (!response?.success) {
        // setToastMessage(response?.message as string);
        setSingleCouponData(null);
        return;
      }

      setSingleCouponData(response?.data);
      // localStorage.setItem("coupon", JSON.stringify(response?.data));
      // setToastMessage(response?.message as string);
    } catch (error) {
      console.log(error as string);
      // setToastMessage(error as string);
      setCouponData(null);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const applyCoupon = async () => {
    setLoading(true);
    try {
      if (!coupon) {
        setToastMessage("Please enter coupon code");
        return;
      }

      const response = await fetchData({
        url: `/customer/coupons/${coupon}`,
        cache: `no-store`,
      });

      if (!response?.success) {
        setToastMessage(response?.message as string);
        setCouponData({});
        return;
      }

      setCouponData(response?.data);
      localStorage.setItem("coupon", JSON.stringify(response?.data));
      setToastMessage(response?.message as string);
    } catch (error) {
      console.log(error as string);
      setToastMessage(error as string);
      setCouponData({});
    } finally {
      setLoading(false);
      setCoupon("");
    }
  };

  return (
    <section className="cart-area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {cart_products.length === 0 && (
              <div className="text-center">
                <h3>Your cart is empty</h3>
                <Link href="/shop" className="os-btn os-btn-2 mt-30">
                  Return to shop
                </Link>
              </div>
            )}
            {cart_products.length > 0 && (
              <div>
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Image</th>
                        <th className="cart-product-name">Product</th>
                        <th className="product-price">Unit Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart_products.map((item, index) => (
                        <tr key={index}>
                          <td className="product-thumbnail">
                            <Link href={`/product-details/${item.slug}`}>
                              <Image
                                src={item.image ?? "/noimage.png"}
                                alt="cart_img"
                                width={125}
                                height={160}
                                style={{
                                  height: "90px",
                                  objectFit: "contain",
                                  background: "#f6f6f6",
                                }}
                              />
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link href={`/product-details/${item.slug}`}>
                              {`${item.name} (${item?.variant})`}
                            </Link>
                          </td>
                          <td className="product-price">
                            <span className="amount">
                              {item.discountedRetailPrice} TK
                            </span>
                          </td>
                          <td className="product-quantity">
                            <div className="cart-plus-minus">
                              <input
                                type="text"
                                value={item.orderQuantity}
                                readOnly
                              />
                              <div
                                onClick={() =>
                                  dispatch(quantityDecrement(item))
                                }
                                className="dec qtybutton"
                              >
                                -
                              </div>
                              <div
                                onClick={() => dispatch(add_cart_product(item))}
                                className="inc qtybutton"
                              >
                                +
                              </div>
                            </div>
                          </td>
                          <td className="product-subtotal">
                            <span className="amount">
                              {item.orderQuantity * item.discountedRetailPrice}{" "}
                              TK
                            </span>
                          </td>
                          <td
                            onClick={() => dispatch(remove_product(item))}
                            className="product-remove"
                          >
                            <button>
                              <i className="fa fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {singleCouponData && singleCouponData?.length > 0 && (
                  <div className="row mt-2">
                    <div className="col-12">
                      <p>
                        **Apply{" "}
                        {singleCouponData?.map((coup: any, index: any) => {
                          return (
                            <span key={coup?.id}>
                              <span
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  background: "#000",
                                  borderRadius: "4px",
                                  padding: "2px 10px",
                                }}
                              >
                                {coup?.code}
                              </span>{" "}
                              for {coup?.discountAmount}TK discount on{" "}
                              {coup?.orderPriceLimit > 0
                                ? coup?.orderPriceLimit + "TK or more"
                                : "any"}{" "}
                              order{" "}
                              {index !== singleCouponData?.length - 1 && "/"}
                            </span>
                          );
                        })}
                        {/* <span
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            background: "#000",
                            borderRadius: "4px",
                            padding: "2px 10px",
                          }}
                        >
                          BOGO50
                        </span>{" "}
                        coupon for 50TK discount on 250TK or more order */}
                      </p>
                    </div>
                  </div>
                )}

                <div className="row">
                  <div className="col-12">
                    <div className="coupon-all">
                      <div className="coupon">
                        <input
                          required
                          id="coupon_code"
                          className="input-text"
                          name="coupon_code"
                          placeholder="Coupon code"
                          type="text"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                        />
                  <button
  className="coupon-btn"
  name="apply_coupon"
  type="button"
  onClick={() => applyCoupon()}
  disabled={loading}
>
  {loading ? "Applying..." : "Apply coupon"}
</button>
                      </div>
                      <div className="coupon2">
                        <button
                          onClick={() => {
                            dispatch(clearCart());
                            localStorage.removeItem("coupon");
                          }}
                          className="clear-cart-btn "
                          name="update_cart"
                          type="button"
                        >
                          Clear Cart 
                        </button>
                      </div>
                    </div>
                  </div>
                  {toastMessage && (
                    <div
                      className="w-[100%] h-[20px] text-center py-2 my-3 text-black"
                      style={{ background: "#7fea7f" }}
                    >
                      {toastMessage}
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-5 ms-auto">
                    <div className="cart-page-total">
                      <h2>Cart totals</h2>
                      <ul className="mb-20">
                        <li>
                          Subtotal{" "}
                          <span>
                            {total}
                            TK
                          </span>
                        </li>
                        {/* <li>
                          Delivery Charge <span>{100} TK</span>
                        </li> */}
                        {couponData && (
                          <li>
                            Coupon Discount{" "}
                            <span>
                              {couponData?.orderPriceLimit
                                ? couponData?.orderPriceLimit <= total
                                  ? couponData?.discountAmount ?? 0
                                  : 0
                                : couponData?.discountAmount ?? 0}{" "}
                              TK
                            </span>
                          </li>
                        )}

                        <li>
                          Grand Total{" "}
                          <span>
                            {total -
                              (couponData?.orderPriceLimit
                                ? couponData?.orderPriceLimit <= total
                                  ? couponData?.discountAmount ?? 0
                                  : 0
                                : couponData?.discountAmount ?? 0)}{" "}
                            TK
                          </span>
                        </li>
                      </ul>
             
             
                 <div className="text-center mt-4">
  <Link
    href={
      cookies?.get("token") && cookies?.get("userinfo")
        ? "/checkout"
        : "/login"
    }
    className="proceed-btn"
  >
    Proceed to checkout
  </Link>
</div>


                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartArea;
