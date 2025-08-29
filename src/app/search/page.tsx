import Breadcrumb from "@/components/common/breadcrumb";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { promises as fs } from "fs";
import { Metadata } from "next";
// import SearchArea from "@/components/search/search-area";

export const metadata: Metadata = {
  title: "Search Page",
};

export default async function SearchPage() {
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

      <main>
        {/* breadcrumb start */}
        <Breadcrumb title="Search" subtitle="Search" />
        {/* breadcrumb end */}

        {/* search area start */}
        {/* <SearchArea product_data={product_data}/> */}
        {/* search area end */}
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
