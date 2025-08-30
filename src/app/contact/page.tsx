import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
import { Suspense } from "react";
// import Breadcrumb from "@/components/common/breadcrumb";
// import breadcrumb_bg from "@/assets/img/page-title/page-title-2.jpg";
import ContactArea from "@/components/contact/contact-area";
import Footer from "@/layout/footers/footer";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Contact Page",
};

export default function ContactPage() {
  return (
    <Wrapper>
   
   <div className="header-section ">

    {/* header start */}
          <Header />
          {/* header end */}
        </div>
      

      <main>
        <Suspense fallback={<Loading />}>
          {/* breadcrumb start */}
          {/* <Breadcrumb
          bg_img={breadcrumb_bg}
          title="Contact Us"
          subtitle="Contact"
        /> */}
          {/* breadcrumb end */}

          {/* contact area start */}
          <ContactArea />
          {/* contact area end */}

          {/* contact map start */}
        
          {/* contact map end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
