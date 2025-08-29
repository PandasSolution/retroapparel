import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
// import Breadcrumb from "@/components/common/breadcrumb";
import CheckoutArea from "@/components/checkout/checkout-area";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Checkout Page",
};

export default function CheckoutPage() {
  return (
    <Wrapper>
        <div className="header-section ">

    {/* header start */}
          <Header />
          {/* header end */}
        </div>

        <br></br>
      <main>
        <Suspense fallback={<Loading />}>
          {/* breadcrumb start */}
          {/* <Breadcrumb title="Checkout" subtitle="Checkout" /> */}
          {/* breadcrumb end */}

          {/* checkout area start */}
          <CheckoutArea />
          {/* checkout area end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
