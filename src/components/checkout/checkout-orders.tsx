"use client";
import useCartInfo from "@/hooks/use-cart-info";
import { IProduct } from "@/types/product-d-t";
import { useState } from "react";

// prop type
type IProps = {
  cart_products: IProduct[];
  paymentMethod?: any;
  setPaymentMethod?: any;
  deliveryFee?: number;
};

const CheckoutOrders = ({
  cart_products,
  paymentMethod,
  setPaymentMethod,
  deliveryFee,
}: IProps) => {
  const { total } = useCartInfo();
  const [shipCost, setShipCost] = useState<number | string>(7.0);

  return (
    <div className="your-order-table table-responsive">
      {cart_products.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className="product-name">Product</th>
              <th className="product-total">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart_products.map((item: any, i) => (
              <tr key={i} className="cart_item">
                <td className="product-name">
                  {item?.name} ({item?.variant})
                  <strong className="product-quantity">
                    {" "}
                    × {item.orderQuantity}
                  </strong>
                </td>
                <td className="product-total">
                  <span className="amount">
                    {(item.discountedRetailPrice * item.orderQuantity).toFixed(
                      2
                    )}{" "}
                    TK
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="cart-subtotal">
              <th>Delivery Charge</th>
              <td>
                <span className="amount">
                  {(deliveryFee ?? 100)?.toFixed(2)} TK
                </span>
              </td>
            </tr>

            {JSON.parse(localStorage.getItem("coupon") as any) && (
              <tr className="cart-subtotal">
                <th>Coupon Discount</th>
                <td>
                  <span className="amount">
                    {(JSON.parse(localStorage.getItem("coupon") as any)
                      ?.orderPriceLimit
                      ? JSON.parse(localStorage.getItem("coupon") as any)
                          ?.orderPriceLimit <= total
                        ? JSON.parse(localStorage.getItem("coupon") as any)
                            ?.discountAmount ?? 0
                        : 0
                      : JSON.parse(localStorage.getItem("coupon") as any)
                          ?.discountAmount ?? 0
                    ).toFixed(2)}{" "}
                    TK
                  </span>
                </td>
              </tr>
            )}

            <tr className="order-total">
              <th>Order Total</th>
              <td>
                <strong>
                  <span className="amount">
                    {(
                      total +
                      (deliveryFee ?? 100) -
                      (JSON.parse(localStorage.getItem("coupon") as any)
                        ?.orderPriceLimit
                        ? JSON.parse(localStorage.getItem("coupon") as any)
                            ?.orderPriceLimit <= total
                          ? JSON.parse(localStorage.getItem("coupon") as any)
                              ?.discountAmount ?? 0
                          : 0
                        : JSON.parse(localStorage.getItem("coupon") as any)
                            ?.discountAmount ?? 0)
                    ).toFixed(2)}{" "}
                    TK
                    {/* {typeof shipCost === "number"
                      ? (total + shipCost).toFixed(2)
                      : total.toFixed(2)} */}
                  </span>
                </strong>
              </td>
            </tr>
            <tr className="shipping">
              <th>Payment Method</th>
              <td>
                <ul>
                  <li>
                    <input
                      type="radio"
                      id="amount"
                      name="shipping"
                      value={"Cash on Delivery"}
                      // onChange={() => setShipCost(7.0)}
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                        console.log(e.target.value);
                      }}
                      // checked={shipCost === 7.0}
                      // checked
                    />
                    <label htmlFor="amount">
                      {/* Flat Rate: <span className="amount">$7.00</span> */}
                      Cash on Delivery
                    </label>
                  </li>

                  {/* <li>
                    <input
                      type="radio"
                      id="free"
                      name="shipping"
                      value={"Digital Payment"}
                      // onChange={() => setShipCost("free")}
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                    <label htmlFor="free">Digital Payment</label>
                  </li> */}
                </ul>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default CheckoutOrders;
