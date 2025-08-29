"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// internal
import ErrorMsg from "../common/error-msg";
// import CouponArea from "./coupon-area";
import { postData, postDataWithToken } from "@/api/api";
import useCartInfo from "@/hooks/use-cart-info";
import { clearCart, getCartProducts } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../Loader";
import CheckoutOrders from "./checkout-orders";
// import CheckoutPayment from "./checkout-payment";

// type form data

type FormData = {
  name: string;
  // lastName: string;
  // company: string;
  country: string;
  address: string;
  billingAddress: string;
  // city: string;
  // apartment: string;
  // state: string;
  postalCode: string;
  email: string;
  phone: string;
  // orderNote?: string;
};

const schema = yup.object().shape({
  name: yup.string().required().label("Full Name"),
  // lastName: yup.string().required().label("Last Name"),
  // company: yup.string().required().label("Company"),
  country: yup.string().required().label("Country"),
  address: yup.string().required().label("Address"),
  billingAddress: yup.string().required().label("Billing Address"),
  // city: yup.string().required().label("City"),
  // apartment: yup.string().required().label("Apartment"),
  // state: yup.string().required().label("State"),
  postalCode: yup.string().required().label("Zip Code"),
  email: yup.string().required().email().label("Email"),
  phone: yup.string().required().min(4).label("Phone"),
  // orderNote: yup.string().label("Order Note"),
});

const CheckoutArea = () => {
  const cookies = useCookies();
  const { total } = useCartInfo();
  const { cart_products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [deliveryFee, setDeliveryFee] = useState<number>(100);
  const [cities, setCities] = useState<any>([]);
  const [zones, setZones] = useState<any>([]);
  const [cityId, setCityId] = useState<number>(0);
  const [zoneId, setZoneId] = useState<number>(0);
  const [pathao_store_id, setpathao_store_id] = useState<number>(0);
  const [pathaoAuthToken, setPathaoAuthToken] = useState<string>("");
  const [loadingMain, setLoadingMain] = useState<boolean>(false);

  const params = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      dispatch(getCartProducts());
    }
  }, [dispatch]);

  //cityId and zoneId fetch
  // useEffect(() => {
  //   if (!params.get("isSuccess")) {
  //     const getCity = async () => {
  //       setLoadingMain(true);
  //       const cityResp = await fetchDataWithTokenPathao({
  //         url: `/aladdin/api/v1/city-list`,
  //         token: pathaoAuthToken,
  //       });

  //       if (cityResp?.code !== 200) {
  //         setCities([]);
  //         console.log(cityResp?.message);
  //         // setLoadingMain(false);
  //         return;
  //       }

  //       setCities(cityResp?.data?.data);
  //       setLoadingMain(false);
  //     };

  //     getCity();
  //   }
  // }, [pathaoAuthToken]);

  // useEffect(() => {
  //   if (!params.get("isSuccess") && cityId) {
  //     const getZone = async () => {
  //       setLoadingMain(true);
  //       const cityResp = await fetchDataWithTokenPathao({
  //         url: `/aladdin/api/v1/cities/${cityId}/zone-list`,
  //         token: pathaoAuthToken,
  //       });

  //       if (cityResp?.code !== 200) {
  //         setZones([]);
  //         console.log(cityResp?.message);
  //         if (cityId) {
  //           setLoadingMain(false);
  //         }
  //         return;
  //       }

  //       setZones(cityResp?.data?.data);
  //       if (cityId) {
  //         setLoadingMain(false);
  //       }
  //     };

  //     getZone();
  //   }
  // }, [cityId]);

  //pathao auth
  // useEffect(() => {
  //   if (!params.get("isSuccess")) {
  //     //pathao auth courier api
  //     const authPost = async () => {
  //       setLoadingMain(true);
  //       const authRes: any = await postDataPathao(
  //         `/aladdin/api/v1/issue-token`,
  //         {
  //           client_id: pathao_client_id,
  //           client_secret: pathao_client_secret,
  //           grant_type: "password",
  //           username: pathao_username,
  //           password: pathao_password,
  //         }
  //       );

  //       if (authRes?.access_token) {
  //         setPathaoAuthToken(authRes?.access_token);
  //         // cookies.set("token2", authRes?.access_token);
  //         //pathao merchant store info
  //         // const storeInfo = await fetchDataWithTokenPathao({
  //         //   url: `/aladdin/api/v1/stores`,
  //         //   token: authRes?.access_token,
  //         // });

  //         // if (storeInfo?.code !== 200) {
  //         //   setToastMessage(
  //         //     (storeInfo?.message as string) || "Store is not valid"
  //         //   );
  //         //   return;
  //         // }

  //         // console.log(storeInfo?.data?.data);

  //         // setpathao_store_id(storeInfo?.data?.data[0]?.store_id);
  //         // setLoadingMain(false);
  //       } else {
  //         setToastMessage("Sorry, Courier token is invalid. Try again.");
  //         // setLoadingMain(false);
  //         // return;
  //       }
  //     };

  //     authPost();
  //   }

  //   // const pathaoToken = authRes?.access_token;
  //   // console.log(Number(pathao_store_id));
  // }, []);

  //get delivery fee from pathao api
  // useEffect(() => {
  //   if (!params.get("isSuccess") && zoneId) {
  //     const calculatePrice = async () => {
  //       setLoadingMain(true);
  //       const resp = await postDataPathaoWithToken(
  //         `/aladdin/api/v1/merchant/price-plan`,
  //         pathaoAuthToken,
  //         {
  //           store_id: pathao_store_id,
  //           item_type: 2,
  //           delivery_type: 48,
  //           item_weight: 0.5,
  //           recipient_city: cityId,
  //           recipient_zone: zoneId,
  //         }
  //       );

  //       if (resp?.code !== 200) {
  //         setDeliveryFee(100);
  //         console.log(resp?.message as string);
  //         setLoadingMain(false);
  //         return;
  //       }

  //       setDeliveryFee(resp?.data?.final_price);
  //       setLoadingMain(false);
  //     };

  //     calculatePrice();
  //   }
  // }, [zoneId]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  // const onSubmit = handleSubmit((data) => {
  //   alert(JSON.stringify(data));
  //   reset();
  // });

  const [name, setName] = useState<any>(
    JSON.parse(cookies?.get("userinfo") as any)?.name ?? ""
  );
  const [country, setCountry] = useState<any>(
    JSON.parse(cookies?.get("userinfo") as any)?.country ?? ""
  );
  const [city, setCity] = useState<any>(
    JSON.parse(cookies?.get("userinfo") as any)?.city ?? ""
  );
  const [address, setAddress] = useState<any>(
    JSON.parse(cookies?.get("userinfo") as any)?.address ?? ""
  );
  const [billingAddress, setBillingAddress] = useState<any>(
    JSON.parse(cookies?.get("userinfo") as any)?.billingAddress ?? ""
  );
  const [postalCode, setPostalCode] = useState<any>(
    JSON.parse(cookies?.get("userinfo") as any)?.postalCode ?? ""
  );
  const [email, setEmail] = useState<any>(
    JSON.parse(cookies?.get("userinfo") as any)?.email ?? ""
  );
  const [phone, setPhone] = useState<any>(
    JSON.parse(cookies?.get("userinfo") as any)?.phone ?? ""
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  // const [loadingMain, setLoadingMain] = useState<boolean>(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [invoiceNo, setInvoiceNo] = useState<any>(
    Date.now()?.toString() + Math.random()?.toFixed(0)?.toString()
  );

  const router = useRouter();

  // useEffect(() => {
  //   setInvoiceNo(Date.now()?.toString());
  // }, []);

  // useEffect(() => {
  //   const orderPlace = async () => {
  //     if (!localStorage?.getItem("payload")) {
  //       window.location.href =
  //         "/checkout?isSuccess=Sorry, order could not be processed. Please try again.";
  //       return;
  //     }

  //     const response = await postDataWithToken(
  //       `/orders`,
  //       JSON.parse(localStorage.getItem("payload") as any)
  //     );

  //     if (!response.success) {
  //       console.log(response?.message as string);
  //     }

  //     await fetchData({
  //       url: "/customer/brands",
  //       cache: "no-store",
  //     });
  //   };

  //   if (params?.get("isSuccess") === "true") {
  //     orderPlace();
  //     setTimeout(() => {
  //       localStorage?.removeItem("coupon");
  //       localStorage?.removeItem("cart_products");
  //       localStorage?.removeItem("payload");

  //       window.location.href =
  //         "/checkout?isSuccess=Thank you for your order. You will receive an invoice to your mail soon.";
  //     }, 5000);
  //   }

  //   if (params?.get("isSuccess") === "false") {
  //     window.location.href =
  //       "/checkout?isSuccess=Sorry, order could not be processed. Please try again.";
  //   }
  // }, []);

  const placeOrder = async () => {
    setLoading(true);
    try {
      if (!paymentMethod || paymentMethod === "") {
        setToastMessage("Please select a payment method");
        return;
      }
      if (
        !name ||
        !city ||
        !address ||
        !billingAddress ||
        !postalCode ||
        !email ||
        !phone
        // ||
        // cityId === 0 ||
        // zoneId === 0
      ) {
        setToastMessage("Please fill up all the required fields.");
        return;
      }

      let payload = {
        userId: JSON.parse(cookies.get("userinfo") as any)?.id,
        couponId:
          JSON.parse(localStorage.getItem("coupon") as any)?.id ?? undefined,
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        customerBillingAddress: billingAddress,
        customerEmail: email,
        customerCity: city,
        customerPostalCode: postalCode,
        invoiceNumber: invoiceNo?.slice(7),
        paymentMethod: paymentMethod,
        deliveryChargeInside: deliveryFee ?? 100,
        deliveryChargeOutside: null,
        orderItems: cart_products?.map((prod: any) => {
          return {
            productId: prod?.productId,
            productAttributeId: prod?.productAttributeId,
            name: prod?.name,
            size: prod?.variant,
            costPrice: prod?.costPrice,
            retailPrice: prod?.retailPrice,
            discountPercent: prod?.discountPercent,
            discountPrice: prod?.discountPrice,
            discountedRetailPrice: prod?.discountedRetailPrice,
            quantity: prod?.orderQuantity,
            totalCostPrice: prod?.totalCostPrice,
            totalPrice: prod?.totalPrice,
          };
        }),
      };

      // console.log({ payload });

      if (paymentMethod?.toLowerCase() === "digital payment") {
        const responses = await postData(`/orders-init`, payload);
        localStorage.setItem("payload", JSON.stringify(payload));
        setToastMessage("Redirecting to SSL Commerz...");
        window.location.href = responses?.data?.gateway;
        return;
        // router.push(response?.data?.gateway);
        // return;
        // alert("RED");
        // return;
      }

      const response = await postDataWithToken(`/orders`, payload);

      // console.log({ response });

      // return;

      if (!response?.success) {
        // setToastMessage(response?.message as string);
        setToastMessage("Something went wrong! Try again.");
        console.log(response?.message as string);
        return;
      }

      //pathao courier delivery api
      // const courierRes = await postDataPathaoWithToken(
      //   `/aladdin/api/v1/orders`,
      //   pathaoAuthToken,
      //   {
      //     store_id: Number(pathao_store_id),
      //     merchant_order_id: invoiceNo,
      //     recipient_name: name,
      //     recipient_phone: phone,
      //     recipient_address: address,
      //     recipient_city: cityId,
      //     recipient_zone: zoneId,
      //     recipient_area: null,
      //     delivery_type: 48,
      //     item_type: 2,
      //     special_instruction: "",
      //     item_quantity: cart_products ? cart_products?.length : 0,
      //     item_weight: "0.5",
      //     item_description: payload?.orderItems
      //       ?.map((itm: any) => {
      //         return itm?.name;
      //       })
      //       ?.join(", "),
      //     amount_to_collect:
      //       paymentMethod?.toLowerCase() === "digital payment"
      //         ? 0
      //         : total +
      //           deliveryFee -
      //           (JSON.parse(localStorage.getItem("coupon") as any)
      //             ?.orderPriceLimit
      //             ? JSON.parse(localStorage.getItem("coupon") as any)
      //                 ?.orderPriceLimit <= total
      //               ? JSON.parse(localStorage.getItem("coupon") as any)
      //                   ?.discountAmount ?? 0
      //               : 0
      //             : JSON.parse(localStorage.getItem("coupon") as any)
      //                 ?.discountAmount ?? 0),
      //   }
      // );

      // console.log({ courierRes });

      setToastMessage(response?.message as string);
      setIsOrderPlaced(true);

      // await fetchData({
      //   url: "/customer/brands",
      //   cache: "no-store",
      // });

      setTimeout(() => {
        dispatch(clearCart());
        localStorage.removeItem("coupon");
        // router.replace("/");
        window.location.href = "/";
      }, 4000);
    } catch (error) {
      console.log(error as string);
      setToastMessage(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loadingMain && <Loader />}
      <div>
        {/* coupon area start */}
        {/* {cart_products.length > 0 && <CouponArea />} */}
        {/* coupon area end */}

        <section className="checkout-area pb-70 pt-70">
          <div className="container">
            {cart_products.length === 0 && (
              <div className="text-center pt-30">
                {params?.get("isSuccess") === "true" ||
                params?.get("isSuccess") === "false" ? (
                  <h3>Please wait...</h3>
                ) : params?.get("isSuccess") ? (
                  <h3 style={{ background: "#7fea7f", padding: "105px 20px" }}>
                    {params?.get("isSuccess")}
                  </h3>
                ) : (
                  <h3>Your cart is empty</h3>
                )}

                <Link href="/shop" className="os-btn os-btn-2 mt-30">
                  Return to shop
                </Link>
              </div>
            )}

            {cart_products.length > 0 && (
              <form
              // onSubmit={onSubmit}
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="checkbox-form">
                      <h3>Billing Details</h3>
                      <div className="row">
                        {/* <div className="col-md-12">
                          <div className="country-select">
                            <label>
                              City to Deliver{" "}
                              <span className="required">*</span>
                            </label>
                            <select
                              id="cityId"
                              onChange={(e) =>
                                setCityId(Number(e.target.value))
                              }
                              // {...register("country")}
                            >
                              <option value={0}>Select a city</option>
                              {cities?.map((city: any) => {
                                return (
                                  <option
                                    value={city?.city_id}
                                    key={city?.city_id}
                                  >
                                    {city?.city_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div> */}
                        {/* <div className="col-md-12">
                          <div className="country-select">
                            <label>
                              Zone to Deliver{" "}
                              <span className="required">*</span>
                            </label>
                            <select
                              id="zoneId"
                              onChange={(e) =>
                                setZoneId(Number(e.target.value))
                              }
                            >
                              {cityId > 0 &&
                                zones?.map((zone: any) => {
                                  return (
                                    <option
                                      value={zone?.zone_id}
                                      key={zone?.zone_id}
                                    >
                                      {zone?.zone_name}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div> */}
                        <div className="col-md-12">
                          <div className="checkout-form-list">
                            <label>
                              Full Name <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              // value={
                              //   JSON.parse(cookies?.get("userinfo") as any)?.name
                              // }
                              // {...register("name")}
                              value={name}
                              placeholder="Full Name"
                              onChange={(e) => setName(e.target.value)}
                              readOnly
                            />
                            <ErrorMsg msg={errors.name?.message!} />
                          </div>
                        </div>
                        {/* <div className="col-md-6">
                        <div className="checkout-form-list">
                          <label>
                            Last Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            {...register("lastName")}
                            placeholder="Last Name"
                          />
                          <ErrorMsg msg={errors.lastName?.message!} />
                        </div>
                      </div> */}
                        {/* <div className="col-md-12">
                        <div className="checkout-form-list">
                          <label>Phone</label>
                          <input
                            type="text"
                            id="company"
                            {...register("company")}
                            placeholder="Phone"
                          />
                          <ErrorMsg msg={errors.company?.message!} />
                        </div>
                      </div> */}
                        <div className="col-md-12">
                          <div className="checkout-form-list">
                            <label>
                              Email Address <span className="required">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              // {...register("email")}
                              // value={
                              //   JSON.parse(cookies?.get("userinfo") as any)?.email
                              // }
                              placeholder="Your Email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <ErrorMsg msg={errors.email?.message!} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="checkout-form-list">
                            <label>
                              Phone <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              id="phone"
                              value={phone}
                              // {...register("phone")}
                              // value={
                              //   JSON.parse(cookies?.get("userinfo") as any)?.phone
                              // }
                              placeholder="Phone"
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <ErrorMsg msg={errors.phone?.message!} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="checkout-form-list">
                            <label>
                              Shipping Address{" "}
                              <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              id="address"
                              value={address}
                              // {...register("address")}
                              // value={
                              //   JSON.parse(cookies?.get("userinfo") as any)
                              //     ?.address
                              // }
                              placeholder="Shipping Address"
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <ErrorMsg msg={errors.address?.message!} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="checkout-form-list">
                            <label>
                              Billing Address{" "}
                              <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              id="billingAddress"
                              value={billingAddress}
                              // {...register("billingAddress")}
                              // value={
                              //   JSON.parse(cookies?.get("userinfo") as any)
                              //     ?.billingAddress
                              // }
                              placeholder="Billing Address"
                              onChange={(e) =>
                                setBillingAddress(e.target.value)
                              }
                            />
                            <ErrorMsg msg={errors.billingAddress?.message!} />
                          </div>
                        </div>
                        {/* <div className="col-md-12">
                        <div className="checkout-form-list">
                          <input
                            type="text"
                            id="apartment"
                            {...register("apartment")}
                            placeholder="Apartment, suite, unit etc. (optional)"
                          />
                        </div>
                      </div> */}
                        {/* <div className="col-md-12">
                        <div className="checkout-form-list">
                          <label>
                            Town / City <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="city"
                            {...register("city")}
                            placeholder="Town / City"
                          />
                          <ErrorMsg msg={errors.city?.message!} />
                        </div>
                      </div> */}
                        <div className="col-md-6">
                          <div className="checkout-form-list">
                            <label>
                              City <span className="required">*</span>
                            </label>
                            <input
                              id="city"
                              value={city}
                              // {...register("country")}
                              // value={
                              //   JSON.parse(cookies?.get("userinfo") as any)
                              //     ?.country
                              // }
                              type="text"
                              placeholder="City"
                              onChange={(e) => setCity(e.target.value)}
                              readOnly
                            />
                            <ErrorMsg msg={errors.country?.message!} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="checkout-form-list">
                            <label>
                              Postcode / Zip <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              value={postalCode}
                              // {...register("postalCode")}
                              // value={
                              //   JSON.parse(cookies?.get("userinfo") as any)
                              //     ?.postalCode
                              // }
                              placeholder="Postcode / Zip"
                              onChange={(e) => setPostalCode(e.target.value)}
                            />
                            <ErrorMsg msg={errors.postalCode?.message!} />
                          </div>
                        </div>

                        {/* <div className="col-md-6">
                        <div className="checkout-form-list">
                          <label>
                            Phone <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="phone"
                            {...register("phone")}
                            placeholder="Postcode / Zip"
                          />
                          <ErrorMsg msg={errors.phone?.message!} />
                        </div>
                      </div> */}
                      </div>
                      {/* <div className="different-address">
                      <div className="order-notes">
                        <div className="checkout-form-list">
                          <label>Order Notes</label>
                          <textarea
                            id="orderNote"
                            cols={30}
                            rows={10}
                            {...register("orderNote")}
                            placeholder="Notes about your order, e.g. special notes for delivery."
                          ></textarea>
                        </div>
                      </div>
                    </div> */}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="your-order mb-30 ">
                      <h3>
                        Your order{" "}
                        <span
                          className="text-[gray]"
                          style={{ color: "gray", fontSize: "16px" }}
                        >
                          Invoice#{invoiceNo?.slice(7)}
                        </span>
                      </h3>
                      {/* checkout orders */}
                      <CheckoutOrders
                        cart_products={cart_products}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        deliveryFee={deliveryFee}
                      />
                      {/* checkout orders */}

                      {/* checkout payment */}
                      {/* <CheckoutPayment /> */}
                      <div className="payment-method">
                        {/* <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn-link collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Cheque Payment
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse show"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="card-body">
              Please send your cheque to Store Name, Store Street, Store Town,
              Store State / County, Store Postcode.
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingThree">
            <h5 className="mb-0">
              <button
                className="btn-link collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                PayPal
              </button>
            </h5>
          </div>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="card-body">
              Pay via PayPal; you can pay with your credit card if you don’t
              have a PayPal account.
            </div>
          </div>
        </div>
      </div> */}
                        {(toastMessage || params.get("isSuccess")) && (
                          <div
                            className="w-[100%] h-[20px] text-center py-2 text-black"
                            style={{ background: "#7fea7f" }}
                          >
                            {toastMessage !== ""
                              ? toastMessage
                              : params.get("isSuccess") === "true"
                              ? "Please wait..."
                              : params.get("isSuccess")}
                          </div>
                        )}
                        <div className="order-button-payment mt-20">
                      <div style={{ textAlign: "center" }}>
  <button
    type="button"
    className="place-order-btn"
    onClick={() => placeOrder()}
    disabled={
      loading ||
      isOrderPlaced ||
      params.get("isSuccess") === "true" ||
      params.get("isSuccess") === "false"
    }
  >
    {loading
      ? "Placing order..."
      : isOrderPlaced
      ? "Order Placed"
      : "Place order"}
  </button>
</div>

                        </div>
                      </div>
                      {/* checkout payment */}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckoutArea;
