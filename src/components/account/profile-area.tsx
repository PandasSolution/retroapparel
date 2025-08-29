"use client";

import { useCookies } from "next-client-cookies";
import Link from "next/link";

const ProfileArea = () => {
  const cookies = useCookies();

  return (
    <section className="profile__area pt-90 pb-50 grey-bg">
      <div className="container">
        <div className="profile__basic-inner pb-20 bg-white">
          <div className="row align-items-center">
            <div className="col-xxl-6 col-md-6">
              <div className="profile__basic d-md-flex align-items-center">
                <div className="profile__basic-thumb mr-30">
                  <img
                    src={JSON.parse(cookies?.get("userinfo") as any)?.image}
                    alt=""
                  />
                </div>
                <div className="profile__basic-content">
                  <h3 className="profile__basic-title">
                    Welcome Back{" "}
                    <span>
                      {JSON.parse(cookies?.get("userinfo") as any)?.name}
                    </span>
                  </h3>
                  {/* <p>
                    2 Running Products <Link href="/">View Products</Link>
                  </p> */}
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6">
              <div className="profile__basic-cart d-flex align-items-center justify-content-md-end">
                <div className="cart-info mr-10">
                  <Link href="/cart">View cart</Link>
                </div>
                <div className="cart-item">
                  <Link href="/cart">
                    <i className="fa-regular fa-basket-shopping"></i>
                    {/* <span className="cart-quantity">2</span> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileArea;
