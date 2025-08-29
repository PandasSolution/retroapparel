import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import Breadcrumb from "@/components/common/breadcrumb";
import Footer from "@/layout/footers/footer";
import blog_data from "@/data/blog-data";
import BlogDetailsArea from "@/components/blogs/blog-details/blog-details-area";

export const metadata: Metadata = {
  title: "Blog Details Page",
};

export default function BlogDetailsPage() {
  const blog = blog_data.filter((b) => b.blog === "blog-standard")[0];
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
        {/* breadcrumb start */}
        <Breadcrumb title="Blog Details" subtitle="Blog Details" />
        {/* breadcrumb end */}

        {/* blog details area start */}
        <BlogDetailsArea blog={blog} />
        {/* blog details area end */}
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
