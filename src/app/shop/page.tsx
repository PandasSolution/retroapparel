// import Breadcrumb from "@/components/common/breadcrumb";
import { fetchData } from "@/api/api";
import ShopArea from "@/components/shop/shop-area";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
// import { promises as fs } from "fs";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Shop Page",
};

export default async function ShopPage({ searchParams }: any) {
  // const file = await fs.readFile(
  //   process.cwd() + "/src/app/product-data.json",
  //   "utf8"
  // );
  // const product_data = JSON.parse(file);

  const categories = await fetchData({
    url: `/customer/categories`,
    cache: "force-cache",
  });

  const brands = await fetchData({
    url: `/customer/brands`,
    cache: "force-cache",
  });

  const params = await searchParams;
  let categoryParam = params?.category;
  let brandParam = params?.brand;
  let priceParam = params?.price;
  let sortParam = params?.sort;

  console.log(params?.category);
  console.log(params?.brand);
  console.log(params?.price);
  console.log(params?.sort);

  const productRes = await fetchData({ url: "/customer/products" });

  let allProducts = productRes?.data;

  // if (sortParam === "low") {
  //   allProducts = allProducts.sort((a: any, b: any) => {
  //     const minPriceA = Math.min(
  //       ...a.productAttributes.map((attr: any) => attr.discountedRetailPrice)
  //     );
  //     const minPriceB = Math.min(
  //       ...b.productAttributes.map((attr: any) => attr.discountedRetailPrice)
  //     );
  //     return minPriceA - minPriceB;
  //   });
  // }

  // if (sortParam === "high") {
  //   allProducts = allProducts.sort((a: any, b: any) => {
  //     const minPriceA = Math.min(
  //       ...a.productAttributes.map((attr: any) => attr.discountedRetailPrice)
  //     );
  //     const minPriceB = Math.min(
  //       ...b.productAttributes.map((attr: any) => attr.discountedRetailPrice)
  //     );
  //     return minPriceB - minPriceA;
  //   });
  // }

  // if (categoryParam || brandParam || priceParam) {
  //   if (categoryParam === "") {
  //     categoryParam = undefined;
  //   }
  //   if (brandParam === "") {
  //     brandParam = undefined;
  //   }
  //   if (priceParam === "") {
  //     priceParam = undefined;
  //   }
  //   allProducts = allProducts?.filter(
  //     (itm: any) =>
  //       (itm?.categoryId === categoryParam || itm?.brandId === brandParam) &&
  //       ((itm?.productAttributes &&
  //         itm?.productAttributes?.length > 0 &&
  //         itm?.productAttributes[0]?.discountedRetailPrice <=
  //           Number(priceParam)) ||
  //         (itm?.productAttributes &&
  //           itm?.productAttributes?.length > 0 &&
  //           itm?.productAttributes[1]?.discountedRetailPrice <=
  //             Number(priceParam)) ||
  //         (itm?.productAttributes &&
  //           itm?.productAttributes?.length > 0 &&
  //           itm?.productAttributes[2]?.discountedRetailPrice <=
  //             Number(priceParam)) ||
  //         (itm?.productAttributes &&
  //           itm?.productAttributes?.length > 0 &&
  //           itm?.productAttributes[3]?.discountedRetailPrice <=
  //             Number(priceParam)) ||
  //         (itm?.productAttributes &&
  //           itm?.productAttributes?.length > 0 &&
  //           itm?.productAttributes[100]?.discountedRetailPrice <=
  //             Number(priceParam)))
  //   );
  // }

  // console.log({ allProducts });

allProducts = allProducts.filter((product: any) => {
  const matchCategory = categoryParam ? product.categoryId === categoryParam : true;
  const matchPrice = priceParam
    ? product.productAttributes?.some(
        (attr: any) => attr.discountedRetailPrice <= Number(priceParam)
      )
    : true;

  return matchCategory && matchPrice;
});


  return (
    <Wrapper>
      {/* header start */}
      <div className="header-section">
        <Header />
      </div>
      {/* header end */}

      <main>
        {/* breadcrumb start */}
        {/* <Breadcrumb title="Shop" subtitle="Shop" /> */}
        {/* breadcrumb end */}
        <Suspense fallback={<Loading />}>
          {/* shop area start */}
          <ShopArea
            product_data={[]}
            categories={categories?.data}
            brands={brands?.data}
            categoryParam={categoryParam}
            brandParam={brandParam}
            priceParam={priceParam}
            sortParam={sortParam}
            allProducts={allProducts}
          />
          {/* shop area end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
