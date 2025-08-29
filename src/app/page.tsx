import Brands from "@/components/brands/brand-area";
import HeroSliderOne from "@/components/hero-banner/hero-banner-one";
import TrendingProducts from "@/components/products/trending-products";
import ShopCategory from "@/components/shop/shop-category";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";

import { fetchData } from "@/api/api";

import SaleOffProducts from "@/components/products/sale-off-products";
import SubscribeArea from "@/components/subscribe-area";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "./loading";

export default async function HomePage() {
  // const file = await fs.readFile(
  //   process.cwd() + "/src/app/product-data.json",
  //   "utf8"
  // );
  // const product_data = JSON.parse(file);

  const banners = await fetchData({
    url: "/customer/banners",
    cache: "force-cache",
  });
  // const result = await banners.json();

  // console.log({ banners });

  const categories = await fetchData({
    url: `/customer/categories?skip=0&take=5`,
    cache: "force-cache",
  });

  // console.log({ categories });

  const trendingProducts = await fetchData({
    url: `/customer/trending-products?skip=0&take=10`,
    cache: "force-cache",
  });

  // console.log({ trendingProducts });

  const featuredProducts = await fetchData({
    url: `/customer/featured-products?skip=0&take=10`,
    cache: "force-cache",
  });

  // console.log({ featuredProducts });

  const brands = await fetchData({
    url: `/customer/brands?skip=0&take=10`,
    cache: "force-cache",
  });

  // console.log({ featuredProducts });

  // const categories2 = await fetchData({
  //   url: `/customer/categories?skip=0&take=5`,
  //   cache: "force-cache",
  // });

  // console.log({ categories2 });

  return (
    <Wrapper>
      {/* <Loading /> */}
      {/* header start */}

      <Header />

      {/* header end */}

      <main>
        <Suspense fallback={<Loading />}>
          {/* hero banner start */}

          {banners?.data?.length > 0 && (
            <HeroSliderOne banners={banners?.data} />
          )}

          {/* hero banner end */}

          {/* category area start */}

          {categories?.data?.length > 0 && (
            <ShopCategory categories={categories?.data} />
          )}

          {/* category area end */}

          {/* trending products start */}

          {trendingProducts?.data?.length > 0 && (
            <TrendingProducts
              products={[]}
              trendingProd={trendingProducts?.data}
            />
          )}

          {/* trending products end */}

          {/* product banner start */}

          {/* {categories?.data?.length > 0 && (
            <BannerProducts products={[]} categories={categories?.data} />
          )} */}

          {/* product banner end */}

          {/* sale of products start */}

          {featuredProducts?.data?.length > 0 && (
            <SaleOffProducts
              products={[]}
              featuredProducts={featuredProducts?.data}
            />
          )}

          {/* sale of products end */}

          {/* brand area start */}
{/* 
          {brands?.data?.length > 0 && <Brands brands={brands?.data} />} */}

          {/* brand area end */}

          {/* blog area start */}
          {/* <BlogArea/> */}
          {/* blog area end */}

          {/* subscribe area start */}
          <SubscribeArea />
          {/* subscribe area end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
