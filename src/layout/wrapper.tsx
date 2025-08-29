"use client";
import BackToTop from "@/components/common/back-to-top";
import ProductModal from "@/components/common/modals/product-modal";
import { getCartProducts, initialOrderQuantity } from "@/redux/features/cart";
import { getCompareProducts } from "@/redux/features/compare";
import { getWishlistProducts } from "@/redux/features/wishlist";
import { useAppDispatch } from "@/redux/hook";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialOrderQuantity());
    dispatch(getCartProducts());
    dispatch(getWishlistProducts());
    dispatch(getCompareProducts());
  }, [router, dispatch]);

  return (
    <>
      {children}
      <BackToTop />
      <ProductModal />
      <ToastContainer />
    </>
  );
};

export default Wrapper;
