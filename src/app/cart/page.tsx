import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
// import Breadcrumb from "@/components/common/breadcrumb";
import CartArea from "@/components/cart/cart-area";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Cart Page",
};

export default function CartPage() {
  return (
    <Wrapper>
      <div className="header-section ">

    {/* header start */}
          <Header />
          {/* header end */}
        </div>
      

      <main>
        <Suspense fallback={<Loading />}>
          {/* breadcrumb start */}
          {/* <Breadcrumb title="Your Cart" subtitle="Cart" /> */}
          {/* breadcrumb end */}

          {/* cart area start */}
          <CartArea />
          {/* cart area end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
