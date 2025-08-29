// import Breadcrumb from "@/components/common/breadcrumb";
import RegisterForm from "@/components/forms/register-form";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Create an Account",
};

export default function RegisterPage() {
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
        <Suspense fallback={<Loading />}>
          {/* breadcrumb start */}
          {/* <Breadcrumb title="Register" subtitle="Register" /> */}
          {/* breadcrumb end */}

          {/* register area start */}
          <section className="login-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <div className="basic-login">
                    <h3 className="text-center mb-60">Create an Account</h3>
                    {/* register form start */}
                    <RegisterForm />
                    {/* register form end */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* register area end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
