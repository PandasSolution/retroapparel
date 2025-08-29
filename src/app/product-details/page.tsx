import Breadcrumb from "@/components/common/breadcrumb";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { promises as fs } from "fs";
import { Metadata } from "next";
// import ProductDetailsUpper from "@/components/product-details/product-details-upper";
import ProductDetailsBottom from "@/components/product-details/product-details-bottom";
import RelatedProducts from "@/components/products/related-products";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Shop Details Page",
};

export default async function ProductDetailsPage() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/product-data.json",
    "utf8"
  );
  const product_data = JSON.parse(file);
  const product = [...product_data][0];
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
        <Suspense fallback={<Loading />}>
          {/* breadcrumb start */}
          <Breadcrumb title="Product Details" subtitle="Product Details" />
          {/* breadcrumb end */}

          {/* shop details upper area start */}
          <section className="shop__area pb-65">
            <div className="shop__top grey-bg-6 pt-100 pb-90">
              <div className="container">
                {/* <ProductDetailsUpper product={product} /> */}
                <ProductDetailsBottom product={product} />
              </div>
            </div>
          </section>
          {/* shop details upper area end */}

          {/* related products start */}
          <RelatedProducts product_data={product_data} product={product} />
          {/* related products end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
