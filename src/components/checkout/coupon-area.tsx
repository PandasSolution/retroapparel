"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMsg from "../common/error-msg";



// login form 
function LoginForm() {
  type FormData = {
    email: string;
    password: string;
  };
  // login schema
  const schema = yup.object().shape({
    email: yup.string().required().email().label("Email"),
    password: yup.string().required().min(6).label("Password"),
  });

  const {register,handleSubmit,reset,formState: { errors }} = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onLoginSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
    reset();
  });

  return (
    <form onSubmit={onLoginSubmit}>
      <p className="form-row-first">
        <label>
          Email <span className="required">*</span>
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder="Email address..."
        />
        <ErrorMsg msg={errors.email?.message!} />
      </p>
      <p className="form-row-last">
        <label>
          Password <span className="required">*</span>
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder="Enter password..."
        />
        <ErrorMsg msg={errors.password?.message!} />
      </p>
      <p className="form-row">
        <button className="os-btn os-btn-black" type="submit">
          Login
        </button>
        <label>
          <input type="checkbox" />
          Remember me
        </label>
      </p>
      <p className="lost-password">
        <a href="#">Lost your password?</a>
      </p>
    </form>
  )
}

// coupon form 
function CouponForm() {
  type ICoupon = {
    coupon: string;
  };
  // coupon schema
  const couponSchema = yup.object().shape({
    coupon: yup.string().required().label("Coupon"),
  });
  const {register,handleSubmit,reset,formState: { errors }} = useForm<ICoupon>({
    resolver: yupResolver(couponSchema),
  });
  const onCouponSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
    reset();
  });
  return (
    <form onSubmit={onCouponSubmit}>
      <p className="checkout-coupon">
        <input id="coupon" {...register("coupon")} type="text" placeholder="Coupon Code" />
        <ErrorMsg msg={errors.coupon?.message!} />
        <button className="os-btn os-btn-black" type="submit">
          Apply Coupon
        </button>
      </p>
    </form>
  )
}


const CouponArea = () => {
  const [checkoutLogin, setCheckoutLogin] = useState(false);
  const [checkoutCoupon, setCheckoutCoupon] = useState(false);

  return (
    <>
      <section className="coupon-area pt-100 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="coupon-accordion">
                <h3>
                  Returning customer?{" "}
                  <span
                    onClick={() => setCheckoutLogin(!checkoutLogin)}
                    id="showlogin"
                  >
                    Click here to login
                  </span>
                </h3>
                {checkoutLogin && (
                  <div id="checkout-login" className="coupon-content">
                    <div className="coupon-info">
                      <p className="coupon-text">
                        Quisque gravida turpis sit amet nulla posuere lacinia.
                        Cras sed est sit amet ipsum luctus.
                      </p>
                      {/* form start */}
                      <LoginForm/>
                      {/* form start */}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="coupon-accordion">
                <h3>
                  Have a coupon?{" "}
                  <span
                    onClick={() => setCheckoutCoupon(!checkoutCoupon)}
                    id="showcoupon"
                  >
                    Click here to enter your code
                  </span>
                </h3>
                {checkoutCoupon && (
                  <div id="checkout_coupon" className="coupon-checkout-content">
                    <div className="coupon-info">
                      <CouponForm/>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CouponArea;
