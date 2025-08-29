import BlogDetailsArea from "@/components/blogs/blog-details/blog-details-area";
import Breadcrumb from "@/components/common/breadcrumb";
import blog_data from "@/data/blog-data";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Details Page",
};

export default async function BlogDetailsPage({ params }: any) {
  const { id } = await params;
  const blog = blog_data.find((b) => b.id === Number(id));
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
        <BlogDetailsArea blog={blog!} />
        {/* blog details area end */}
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
