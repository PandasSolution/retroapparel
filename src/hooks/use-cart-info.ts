import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";

const useCartInfo = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const { cart_products } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const cart = cart_products.reduce(
      (cartTotal, cartItem) => {
        const { discountedRetailPrice, orderQuantity } = cartItem;
        if (typeof orderQuantity !== "undefined") {
          const itemTotal = discountedRetailPrice * orderQuantity;
          cartTotal.quantity += orderQuantity;
          cartTotal.total += itemTotal;
        }
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      }
    );
    setQuantity(cart.quantity);
    setTotal(cart.total);
  }, [cart_products]);

  return {
    quantity,
    total,
    setTotal,
  };
};

export default useCartInfo;
