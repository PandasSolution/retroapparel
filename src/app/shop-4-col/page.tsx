import React from "react";
import { promises as fs } from 'fs';
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import Breadcrumb from "@/components/common/breadcrumb";
import Footer from "@/layout/footers/footer";
import ShopArea from "@/components/shop/shop-area";

export const metadata: Metadata = {
  title: "Shop 4 Col Page",
};

export default async function ShopFourColPage() {
  const file = await fs.readFile(process.cwd() + '/src/app/product-data.json', 'utf8');
  const product_data = JSON.parse(file);
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
        {/* breadcrumb start */}
        <Breadcrumb title="Shop" subtitle="Shop" />
        {/* breadcrumb end */}

        {/* shop area start */}
        <ShopArea shop_col="col-xl-3 col-lg-3 col-md-6 col-sm-6 custom-col-10" product_data={product_data} />
        {/* shop area end */}
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
