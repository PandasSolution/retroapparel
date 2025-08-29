"use client";
import useCartInfo from "@/hooks/use-cart-info";
import { remove_product } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";

const MiniCart = ({ setLoading }: any) => {
  const cookies = useCookies();
  const cartItems = useAppSelector((state) => state.cart.cart_products);
  const dispatch = useAppDispatch();
  const { total } = useCartInfo();
  // const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
  };

  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="mini-cart">
        {cartItems.length === 0 && <h5>Your cart is empty</h5>}
        {cartItems.length >= 1 && (
          <div className="mini-cart-inner">
            <ul
              className={`mini-cart-list ${
                cartItems.length > 2 ? "slider-height" : ""
              } 
          ${cartItems.length > 1 ? "slider-height-2" : ""}`}
            >
              {cartItems.map((item: any, index) => (
                <li key={index}>
                  <div className="cart-img f-left">
                    <Link
                      href={`/product-details/${item?.slug}`}
                      onClick={() => handleClick()}
                    >
                      <Image
                        src={item?.image ?? "/noimage.png"}
                        alt="cart-img"
                        width={75}
                        height={96}
                        style={{ objectFit: "contain", background: "#f6f6f6" }}
                      />
                    </Link>
                  </div>
                  <div className="cart-content f-left text-start">
                    <h5>
                      <Link
                        href={`/product-details/${item?.slug}`}
                        onClick={() => handleClick()}
                      >
                        {item?.name} ({item?.variant})
                      </Link>
                    </h5>
                    <div className="cart-price">
                      <span className="ammount">
                        {item.orderQuantity} <i className="fal fa-times"></i>
                      </span>
                      <span className="price">
                        {item?.discountedRetailPrice} TK
                      </span>
                    </div>
                  </div>
                  <div className="del-icon f-right mt-30">
                    <button onClick={() => dispatch(remove_product(item))}>
                      <i className="fal fa-times"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-price d-flex justify-content-between mb-30">
              <span>Subtotal:</span>
              <span>
                {/* {cartItems?.reduce((accum, curElem) => {
                  return (accum = accum + curElem?.totalPrice);
                }, 0)}{" "} */}
                {total}
                TK
              </span>
            </div>
            <div className="checkout-link">
              <Link
                href={"/cart"}
                className="os-btn"
                onClick={() => handleClick()}
              >
                view Cart
              </Link>
              <Link
                href={
                  cookies?.get("token") && cookies?.get("userinfo")
                    ? "/checkout"
                    : "/login"
                }
                className="os-btn os-btn-black"
                onClick={() => handleClick()}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniCart;
