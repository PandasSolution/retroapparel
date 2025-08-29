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
          <section className="contact__map">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-xl-12">
                  <div className="contact__map-wrapper p-relative">
                    {/* <iframe src="https://maps.google.com/maps?hl=en&amp;q=Dhaka+()&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed"></iframe> */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d58434.57175571618!2d90.36703298467062!3d23.741646940877953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x3755b9bc2e0854cb%3A0xc67c6062ea54402!2s3rd%20Floor%2C%20APQ%20Shopping%20Mall%2C%20143%2C%202%20Bailey%20Rd%2C%20Dhaka%201000!3m2!1d23.7416524!2d90.4082328!4m0!5e0!3m2!1sen!2sbd!4v1738996777346!5m2!1sen!2sbd"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* contact map end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
