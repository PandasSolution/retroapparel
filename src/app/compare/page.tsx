import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import Breadcrumb from "@/components/common/breadcrumb";
import Footer from "@/layout/footers/footer";
import CompareArea from "@/components/compare/compare-area";

export const metadata: Metadata = {
  title: "Compare Page",
};

export default function ComparePage() {
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
        {/* breadcrumb start */}
        <Breadcrumb title="Compare" subtitle="Compare" />
        {/* breadcrumb end */}

        {/* compare area start */}
        <CompareArea />
        {/* compare area end */}
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
