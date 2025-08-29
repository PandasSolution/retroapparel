import { promises as fs } from "fs";
import { Metadata } from "next";
// internal
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import HeroSliderFour from "@/components/hero-banner/hero-banner-four";
import ShopCategory from "@/components/shop/shop-category";
import TrendingProducts from "@/components/products/trending-products";
import BlogArea from "@/components/blogs/blog-area";
import SubscribeArea from "@/components/subscribe-area";
import SmSliderProducts from "@/components/products/sm-slider-products";
import FooterTwo from "@/layout/footers/footer-2";


export const metadata: Metadata = {
  title: "Home Page Four",
};

export default async function HomePageFour() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/product-data.json",
    "utf8"
  );
  const product_data = JSON.parse(file);

  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main className="box-white grey-bg pt-50">
        <div className="container">
          <div className="box-white-inner">
            <div className="row">
              <div className="col-xl-12">
                {/* hero banner start */}
                <HeroSliderFour />
                {/* hero banner end */}


                {/* trending products start */}
                <TrendingProducts products={product_data} style_2={true} container="custom-container" />
                {/* trending products end */}

                {/* product banner start */}
                {/* <BannerProducts products={product_data} style_3={true} /> */}
                {/* product banner end */}

                {/* offer slider products start */}
                <section className="product__offer pb-45">
                  <div className="container custom-container">
                    <SmSliderProducts products={product_data} />
                  </div>
                </section>
                {/* offer slider products end */}

                {/* blog area start */}
                <BlogArea style_3={true} />
                {/* blog area end */}

                {/* subscribe area start */}
                <SubscribeArea style_3={true} />
                {/* subscribe area end */}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* footer start */}
      <FooterTwo />
      {/* footer end */}
    </Wrapper>
  );
}
