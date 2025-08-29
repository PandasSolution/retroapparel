import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
// import Breadcrumb from "@/components/common/breadcrumb";
import WishlistArea from "@/components/wishlist/wishlist-area";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Wishlist Page",
};

export default function WishlistPage() {
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
        <Suspense fallback={<Loading />}>
          {/* breadcrumb start */}
          {/* <Breadcrumb title="Wishlist" subtitle="Wishlist" /> */}
          {/* breadcrumb end */}

          {/* wishlist area start */}
          <WishlistArea />
          {/* wishlist area end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
