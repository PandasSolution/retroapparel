"use client";

import { fetchDataWithToken, putDataWithToken } from "@/api/api";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChangePasswordForm from "../forms/change-password-form";

const ProfileMenuArea = () => {
  const cookies = useCookies();
  const router = useRouter();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(
    JSON.parse(cookies?.get("userinfo") as any)?.name
  );
  const [email, setEmail] = useState<string>(
    JSON.parse(cookies?.get("userinfo") as any)?.email
  );
  const [phone, setPhone] = useState<string>(
    JSON.parse(cookies?.get("userinfo") as any)?.phone
  );
  const [address, setAddress] = useState<string>(
    JSON.parse(cookies?.get("userinfo") as any)?.address
  );
  const [billingAddress, setBillingAddress] = useState<string>(
    JSON.parse(cookies?.get("userinfo") as any)?.billingAddress
  );
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);

  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<any>([]);

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userinfo");
    // window.location.href = "/login";
    router.replace("/login");
  };

  const updateProfile = async () => {
    setLoading(true);
    if (!name || !phone || !email || !address || !billingAddress) {
      setToastMessage("Please fill up the empty fields");
      setLoading(false);
      return;
    }

    try {
      const profileUpdateRes = await putDataWithToken(
        `/customer/auth/users/${
          JSON.parse(cookies?.get("userinfo") as any)?.id
        }`,
        {
          name,
          email,
          phone,
          address,
          billingAddress,
        }
      );

      if (!profileUpdateRes?.success) {
        setToastMessage(profileUpdateRes?.message as string);
        return;
      }

      setToastMessage(
        (profileUpdateRes?.message as string) + " You will be logged out soon."
      );
      setIsEdit(false);

      setTimeout(() => {
        // router.replace("/login");
        cookies.remove("token");
        cookies.remove("userinfo");
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.log(error as string);
      setToastMessage(error as any);
    } finally {
      setLoading(false);
    }
  };

  const getOrderList = async () => {
    setLoading(true);

    try {
      const resposne = await fetchDataWithToken({
        url: `/orders/user/${JSON.parse(cookies.get("userinfo") as any)?.id}`,
        cache: "no-store",
      });

      if (!resposne.success) {
        console.log(resposne?.message as string);
        return;
      }

      setOrders(resposne?.data);
    } catch (error) {
      console.log(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  const openDetail = (ord: any) => {
    setIsDetail((prev) => !prev);
    setDetailData(ord);
  };

  return (
    <section className="profile__menu pb-70 grey-bg">
      <div className="container">
        <div className="row">
          <div className="col-xxl-4 col-md-4">
            <div className="profile__menu-left bg-white mb-50">
              <h3 className="profile__menu-title">
                <i className="fa fa-list-alt"></i> Your Menu
              </h3>
              <div className="profile__menu-tab">
                <div
                  className="nav nav-tabs flex-column justify-content-start text-start"
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    className="nav-link active"
                    id="nav-account-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-account"
                    type="button"
                    role="tab"
                    aria-controls="nav-account"
                    aria-selected="true"
                  >
                    {" "}
                    <i className="fa fa-user"></i> My Account{" "}
                  </button>

                  <button
                    className="nav-link"
                    id="nav-order-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-order"
                    type="button"
                    role="tab"
                    aria-controls="nav-order"
                    aria-selected="false"
                  >
                    <i className="fa fa-file"></i> Orders{" "}
                  </button>

                  {/* <button
                    className="nav-link"
                    id="nav-password-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-password"
                    type="button"
                    role="tab"
                    aria-controls="nav-password"
                    aria-selected="false"
                  >
                    <i className="fa fa-lock"></i>Change Password
                  </button> */}

                  <button className="nav-link" onClick={() => logout()}>
                    <i className="fa fa-sign-out"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-8 col-md-8">
            <div className="profile__menu-right">
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-account"
                  role="tabpanel"
                  aria-labelledby="nav-account-tab"
                >
                  <div className="profile__info">
                    <div className="profile__info-top d-flex justify-content-between align-items-center">
                      <h3 className="profile__info-title">
                        Profile Information
                      </h3>
                      {isEdit ? (
                        <button
                          className="profile__info-btn"
                          type="button"
                          // data-bs-toggle="modal"
                          // data-bs-target="#profile_edit_modal"
                          onClick={() => updateProfile()}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                          {loading ? "Updating..." : "Update Profile"}
                        </button>
                      ) : (
                        <button
                          className="profile__info-btn"
                          type="button"
                          // data-bs-toggle="modal"
                          // data-bs-target="#profile_edit_modal"
                          onClick={() => setIsEdit(true)}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                          {"Edit Profile"}
                        </button>
                      )}
                    </div>

                    {toastMessage && (
                      <div
                        className="w-[100%] h-[20px] text-center py-2 my-3 text-black"
                        style={{ background: "#7fea7f" }}
                      >
                        {toastMessage}
                      </div>
                    )}

                    <div className="profile__info-wrapper white-bg">
                      <div className="profile__info-item">
                        <p>Name</p>
                        <h4>
                          {isEdit ? (
                            <input
                              type="text"
                              className="col-xl-12 p-1"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          ) : (
                            <>{name}</>
                          )}
                        </h4>
                      </div>
                      <div className="profile__info-item">
                        <p>Email</p>
                        <h4>
                          {isEdit ? (
                            <input
                              type="text"
                              className="col-xl-12 p-1"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          ) : (
                            <a
                              href={`#`}
                              className="__cf_email__"
                              data-cfemail="94fdfaf2fbd4f1f0e1fff1e6baf7fbf9"
                            >
                              {email}
                            </a>
                          )}
                        </h4>
                      </div>
                      <div className="profile__info-item">
                        <p>Phone</p>
                        <h4>
                          {isEdit ? (
                            <input
                              type="text"
                              className="col-xl-12 p-1"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          ) : (
                            <>{phone}</>
                          )}
                        </h4>
                      </div>
                      <div className="profile__info-item">
                        <p>Shipping Address</p>
                        <h4>
                          {isEdit ? (
                            <input
                              type="text"
                              className="col-xl-12 p-1"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          ) : (
                            <>{address}</>
                          )}
                        </h4>
                      </div>
                      <div className="profile__info-item">
                        <p>Billing Address</p>
                        <h4>
                          {isEdit ? (
                            <input
                              type="text"
                              className="col-xl-12 p-1"
                              value={billingAddress}
                              onChange={(e) =>
                                setBillingAddress(e.target.value)
                              }
                            />
                          ) : (
                            <>{billingAddress}</>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-order"
                  role="tabpanel"
                  aria-labelledby="nav-order-tab"
                >
                  <div className="order__info">
                    <div className="order__info-top d-flex justify-content-between align-items-center">
                      <h3 className="order__info-title">My Orders</h3>
                      {/* <button type="button" className="order__info-btn">
                        <i className="fa-regular fa-trash-can"></i> Clear
                      </button> */}
                    </div>

                    <div className="order__list white-bg table-responsive">
                      {!isDetail && (
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#Invoice</th>
                              <th scope="col">Date</th>
                              <th scope="col">Items</th>
                              <th scope="col">Price</th>
                              <th scope="col">Status</th>
                              <th scope="col">Details</th>
                            </tr>
                          </thead>
                          {orders && (
                            <tbody>
                              {orders?.map((order: any) => {
                                return (
                                  <tr key={order?.id}>
                                    <td className="order__id">
                                      #{order?.invoiceNumber}
                                    </td>
                                    <td>
                                      {order?.createdAt?.slice(0, 10)}
                                      {/* <Link
                                href="/product-details"
                                className="order__title"
                              >
                                University seminar series global.
                              </Link> */}
                                    </td>
                                    <td>{order?.totalItems}</td>
                                    <td>{order?.subtotal} TK</td>
                                    <td style={{ textAlign: "center" }}>
                                      <p
                                        style={{
                                          background:
                                            order?.status?.toLowerCase() ===
                                            "pending"
                                              ? "orange"
                                              : order?.status?.toLowerCase() ===
                                                "delivered"
                                              ? "green"
                                              : order?.status?.toLowerCase() ===
                                                "returned"
                                              ? "black"
                                              : order?.status?.toLowerCase() ===
                                                "shipped"
                                              ? "teal"
                                              : "red",
                                          padding: "1px 5px",
                                          color: "white",
                                          width: "85%",
                                          borderRadius: "6px",
                                        }}
                                      >
                                        {order?.status}
                                      </p>
                                    </td>
                                    <td>
                                      <Link
                                        href="#"
                                        className="order__view-btn"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          openDetail(order);
                                        }}
                                      >
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}

                              {/* <tr>
                            <td className="order__id">#2441</td>
                            <td>
                              <Link
                                href="/product-details"
                                className="order__title"
                              >
                                Web coding and apache basics
                              </Link>
                            </td>
                            <td>$59.54</td>
                            <td>
                              <Link
                                href="/product-details"
                                className="order__view-btn"
                              >
                                View
                              </Link>
                            </td>
                          </tr> */}
                              {/* <tr>
                            <td className="order__id">#2357</td>
                            <td>
                              <Link
                                href="/product-details"
                                className="order__title"
                              >
                                Economics historical development
                              </Link>
                            </td>
                            <td>$89.90</td>
                            <td>
                              <Link
                                href="/product-details"
                                className="order__view-btn"
                              >
                                View
                              </Link>
                            </td>
                          </tr> */}
                            </tbody>
                          )}
                        </table>
                      )}

                      {/* Detail View */}
                      {isDetail && (
                        <table className="table">
                          <thead>
                            <tr>
                              <th
                                onClick={() => setIsDetail(false)}
                                style={{ cursor: "pointer" }}
                              >
                                <p
                                  style={{
                                    background: "black",
                                    padding: "1px 8px",
                                    width: "max-content",
                                    borderRadius: "4px",
                                    color: "white",
                                  }}
                                >
                                  Back
                                </p>
                              </th>
                            </tr>
                            <tr>
                              <th scope="col">Product</th>
                              <th scope="col">Price</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Discount</th>
                              <th scope="col">Total Price</th>
                              {/* <th scope="col">Action</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {detailData?.orderItems?.map((itm: any) => {
                              return (
                                <tr key={itm?.id}>
                                  <td>
                                    {itm?.name} ({itm?.size})
                                  </td>
                                  <td>{itm?.discountedRetailPrice} TK</td>
                                  <td style={{ textAlign: "center" }}>
                                    {itm?.quantity}
                                  </td>
                                  <td>{itm?.discountPrice} TK</td>
                                  <td>{itm?.totalPrice} TK</td>
                                  {/* <td>HELLO</td> */}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-password"
                  role="tabpanel"
                  aria-labelledby="nav-password-tab"
                >
                  <div className="password__change">
                    <div className="password__change-top">
                      <h3 className="password__change-title">
                        Change Password
                      </h3>
                    </div>
                    <div className="password__form white-bg">
                      <ChangePasswordForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileMenuArea;
