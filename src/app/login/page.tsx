import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
// import Breadcrumb from "@/components/common/breadcrumb";
import LoginForm from "@/components/forms/login-form";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Login Page",
};

export default function LoginPage() {
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
        <Suspense fallback={<Loading />}>
          {/* breadcrumb start */}
          {/* <Breadcrumb title="Login" subtitle="Login" /> */}
          {/* breadcrumb end */}

          {/* login area start */}
          <section className="login-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <div className="basic-login">
                    <h3 className="text-center mb-60">Login to your Account</h3>
                    {/* login form start */}
                    <LoginForm />
                    {/* login form end */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* login area end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
