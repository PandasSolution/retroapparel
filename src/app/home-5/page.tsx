import { promises as fs } from "fs";
import { Metadata } from "next";
// internal
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import HeroSliderOne from "@/components/hero-banner/hero-banner-one";
import TrendingProducts from "@/components/products/trending-products";
import SubscribeArea from "@/components/subscribe-area";
import Footer from "@/layout/footers/footer";

export const metadata: Metadata = {
  title: "Home Page Five",
};

export default async function HomePageFive() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/product-data.json",
    "utf8"
  );
  const product_data = JSON.parse(file);

  return (
    <Wrapper>
      {/* header start */}
      <HeaderTwo />
      {/* header end */}

      <main>
        {/* hero banner start */}
        {/* <HeroSliderOne style_2={true} slider_cls="3" /> */}
        {/* hero banner end */}

        <div className="box-25">
          {/* trending products start */}
    
          {/* trending products end */}

          {/* product banner start */}
          {/* <BannerProducts products={product_data} style_2={true} /> */}
          {/* product banner end */}

          {/* subscribe area start */}
          <SubscribeArea />
          {/* subscribe area end */}
        </div>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
