import { promises as fs } from "fs";
import { Metadata } from "next";
// internal
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import HeroSliderTwo from "@/components/hero-banner/hero-banner-two";
import ShopCategory from "@/components/shop/shop-category";
import Brands from "@/components/brands/brand-area";
import BlogArea from "@/components/blogs/blog-area";
import SubscribeArea from "@/components/subscribe-area";
import Testimonial from "@/components/testimonial/testimonial-area";
import TrendingProductsThree from "@/components/products/trending-products-3";
import SaleOffProducts from "@/components/products/sale-off-products";
import SmSliderProducts from "@/components/products/sm-slider-products";
import Footer from "@/layout/footers/footer";


export const metadata: Metadata = {
  title: "Home Page Three",
};

export default async function HomePageThree() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/product-data.json",
    "utf8"
  );
  const product_data = JSON.parse(file);

  return (
    <Wrapper>
      {/* header start */}
      <Header header_big={true} />
      {/* header end */}

      <main className="box-25">
        {/* hero banner start */}
        <HeroSliderTwo />
        {/* hero banner end */}

  
        {/* trending products start */}
        <TrendingProductsThree products={product_data} />
        {/* trending products end */}

        {/* product banner start */}
        {/* <BannerProducts products={product_data} style_2={true} /> */}
        {/* product banner end */}

        {/* sale of products start */}
        <SaleOffProducts products={product_data} />
        {/* sale of products end */}

        {/* testimonial start */}
        <Testimonial />
        {/* testimonial end */}

        {/* offer slider products start */}
        <section className="product__offer pt-115 pb-50">
          <div className="container">
            <SmSliderProducts products={product_data} />
          </div>
        </section>
        {/* offer slider products end */}

        {/* brand area start */}
        <Brands df={true}/>
        {/* brand area end */}

        {/* subscribe area start */}
        <SubscribeArea style_2={true}/>
        {/* subscribe area end */}

        {/* blog area start */}
        <BlogArea style_2={true}/>
        {/* blog area end */}


      </main>

      {/* footer start */}
      <div className="box-25 box-m-15 box-pb-40">
        <Footer style_2={true} />
      </div>
      {/* footer end */}
    </Wrapper>
  );
}
