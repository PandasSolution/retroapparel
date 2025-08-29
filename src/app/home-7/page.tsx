import { promises as fs } from "fs";
import { Metadata } from "next";
// internal
import Wrapper from "@/layout/wrapper";
import HeaderFour from "@/layout/headers/header-4";
import HeroSliderSeven from "@/components/hero-banner/hero-banner-seven";
import ShopCategory from "@/components/shop/shop-category";
import VideoBox from "@/components/video-box/video-box";
import TestimonialTwo from "@/components/testimonial/testimonial-2";
import BlogsAreaTwo from "@/components/blogs/blog-area-2";
import BrandsAreaTwo from "@/components/brands/brand-area-2";
import FashionProducts from "@/components/products/fashion-products";
import FashionFeatureProducts from "@/components/products/fashion-feature-products";
import FooterThree from "@/layout/footers/footer-3";

export const metadata: Metadata = {
  title: "Home Page Seven",
};

export default async function HomePageSeven() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/product-data.json",
    "utf8"
  );
  const product_data = JSON.parse(file);

  return (
    <Wrapper>
      {/* header start */}
      <HeaderFour />
      {/* header end */}

      <main>
        {/* hero banner start */}
        <HeroSliderSeven />
        {/* hero banner end */}

        {/* category area start */}
        {/* <ShopCategory category_2={true} /> */}
        {/* category area end */}

        {/* fashion products start */}
        <FashionProducts products={product_data}/>
        {/* fashion products end */}

        {/* video box start */}
        <VideoBox/>
        {/* video box end */}

        {/* feature products start */}
        <FashionFeatureProducts products={product_data}/>
        {/* feature products end */}

        {/* testimonial start */}
        <TestimonialTwo/>
        {/* testimonial end */}

        {/* blog area start */}
        <BlogsAreaTwo/>
        {/* blog area end */}

        {/* brands start */}
        <BrandsAreaTwo/>
        {/* brands end */}
      </main>

      {/* footer start */}
      <FooterThree/>
      {/* footer end */}
    </Wrapper>
  );
}
