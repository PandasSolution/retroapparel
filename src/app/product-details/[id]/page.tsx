import { fetchData } from "@/api/api";
import Loading from "@/app/loading";
// import Breadcrumb from "@/components/common/breadcrumb";
import ProductDetailsBottom from "@/components/product-details/product-details-bottom";
import ProductDetailsUpper from "@/components/product-details/product-details-upper";
// import RelatedProducts from "@/components/products/related-products";
// import product_data from "@/data/product-data";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shop Details Page",
};

export default async function ProductDetailsPage({ params }: any) {
  const { id } = await params;
  // const products = [...product_data];
  // const product = products.find((pro duct) => product.id === Number(id));
  console.log({ id });
  const productRes = await fetchData({
    url: `/customer/products/${id}`,
    cache: "force-cache",
  });

  console.log({ productRes });

  return (
    <Wrapper>
      {productRes ? (
        <>

        <div className="header-section ">

    {/* header start */}
          <Header />
          {/* header end */}
        </div>
      

          <main>
            <Suspense fallback={<Loading />}>
              {/* breadcrumb start */}
              {/* <Breadcrumb title="Product Details" subtitle="Product Details" /> */}
              {/* breadcrumb end */}

              {/* shop details upper area start */}
              <section className="shop__area pb-65">
                <div className="shop__top grey-bg-6 pt-100 pb-90">
                  <div className="container">
                    <ProductDetailsUpper
                      product={productRes?.data}
                      isModal={false}
                    />
                  </div>
                </div>
                <ProductDetailsBottom product={productRes?.data} />
              </section>
              {/* shop details upper area end */}

              {/* related products start */}
              {/* <RelatedProducts
              product_data={productRes?.data}
              product={productRes?.data}
            /> */}
              {/* related products end */}
            </Suspense>
          </main>

          {/* footer start */}
          <Footer />
          {/* footer end */}
        </>
      ) : (
        <div className="text-center" style={{ height: "100vh" }}>
          <h2>Product Not Found Id : {params?.id}</h2>
        </div>
      )}
    </Wrapper>
  );
}
