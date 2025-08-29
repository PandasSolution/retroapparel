import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import Breadcrumb from "@/components/common/breadcrumb";
import Footer from "@/layout/footers/footer";
import BlogTwoCalMasonryArea from "@/components/blogs/blog-masonry-area";

export const metadata: Metadata = {
  title: "Blog 2 col Masonry Page",
};

export default function BlogTwoColMasonryPage() {
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
        {/* breadcrumb start */}
        <Breadcrumb title="Blog Masonry" subtitle="Blog Masonry" />
        {/* breadcrumb end */}

        {/* blog masonry area start */}
        <BlogTwoCalMasonryArea />
        {/* blog masonry area end */}
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
