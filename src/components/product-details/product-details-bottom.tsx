"use client";

import { postDataWithToken } from "@/api/api";
import { IProduct } from "@/types/product-d-t";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useEffect, useState } from "react";

// prop type
type IProps = {
  product: IProduct;
};

const ProductDetailsBottom = ({ product }: any) => {
  const cookies = useCookies();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [star, setStar] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [reviewObj, setReviewObj] = useState<any>([]);

  const postReview = async () => {
    setLoading(true);

    if (cookies?.get("token") && cookies?.get("userinfo")) {
      if (star < 1) {
        setToastMessage("Please give a rating first.");
        return;
      }
      try {
        const reviewsRes = await postDataWithToken("/reviews", {
          productId: product?.id,
          userId: JSON.parse(cookies?.get("userinfo") as any)?.id,
          rating: star,
          comment: comment,
        });

        if (!reviewsRes?.success) {
          setToastMessage(reviewsRes?.message as string);
          return;
        }

        setToastMessage(reviewsRes?.message as string);
        setStar(0);
        setComment("");
        setReviewObj([...reviewObj, reviewsRes?.data]);
        // console.log(reviewsRes?.data);
      } catch (error) {
        console.log(error as string);
        setToastMessage(error as string);
      } finally {
        setLoading(false);
      }
    } else {
      setToastMessage(`Please login first to give a review`);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(product?.review);
  }, []);

  return (
    <div className="shop__bottom">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="product__details-tab">
              <div className="product__details-tab-nav text-center mb-45">
                <nav>
                  <div
                    className="nav nav-tabs justify-content-start justify-content-sm-center"
                    id="pro-details"
                    role="tablist"
                  >
                    <a
                      className="nav-item nav-link active"
                      id="des-tab"
                      data-bs-toggle="tab"
                      href="#des"
                      role="tab"
                      aria-controls="des"
                      aria-selected="true"
                      tabIndex={-1}
                    >
                      Description
                    </a>
                    {/* <a className="nav-item nav-link" id="add-tab" data-bs-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="false" tabIndex={-1}>Additional Information</a> */}
                    <a
                      className="nav-item nav-link"
                      id="review-tab"
                      data-bs-toggle="tab"
                      href="#review"
                      role="tab"
                      aria-controls="review"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      Reviews ({product?.review?.length + reviewObj?.length})
                    </a>
                  </div>
                </nav>
              </div>
              <div className="tab-content" id="pro-detailsContent">
                <div
                  className="tab-pane fade show active"
                  id="des"
                  role="tabpanel"
                  aria-labelledby="des-tab"
                >
                  <div className="product__details-des">
                    <p>{product?.longDescription}</p>

                    {/* <div className="product__details-des-list mb-20">
                    <ul>
                      <li><span>Claritas est etiam processus dynamicus.</span></li>
                      <li><span>Qui sequitur mutationem consuetudium lectorum.</span></li>
                      <li><span>Claritas est etiam processus dynamicus.</span></li>
                      <li><span>Qui sequitur mutationem consuetudium lectorum.</span></li>
                      <li><span>Claritas est etiam processus dynamicus.</span></li>
                      <li><span>Qui sequitur mutationem consuetudium lectorum.</span></li>
                    </ul>
                  </div>
                  <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release.</p> */}
                  </div>
                </div>

                {/* <div className="tab-pane fade" id="add" role="tabpanel" aria-labelledby='add-tab'>
                <div className="product__details-add">
                  <ul>
                    <li><span>Weight</span></li>
                    <li><span>{product?.weight} KG</span></li>
                    <li><span>Dimention</span></li>
                    <li><span>{product?.dimension}</span></li>
                    <li><span>Size</span></li>
                    <li><span>XL, XXL, LG, SM, MD</span></li>
                  </ul>
                </div>
              </div> */}

                <div
                  className="tab-pane fade"
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                >
                  <div className="product__details-review">
                    <div className="postbox__comments">
                      <div className="postbox__comment-title mb-30">
                        <h3>
                          Reviews ({product?.review?.length + reviewObj?.length}
                          )
                        </h3>
                      </div>
                      <div className="latest-comments mb-30">
                        <ul>
                          {product?.review?.map((review: any, index: any) => (
                            <li key={index}>
                              <div className="comments-box">
                                <div className="comments-avatar">
                                  <Image
                                    src={
                                      review?.user?.image ??
                                      "https://cdn-icons-png.flaticon.com/512/9368/9368192.png"
                                    }
                                    alt="review-img"
                                    width={78}
                                    height={79}
                                  />
                                </div>
                                <div className="comments-text">
                                  <div className="avatar-name">
                                    <h5>{review.user?.name}</h5>
                                    <span>
                                      {" "}
                                      - {review.createdAt?.substr(0, 10)}{" "}
                                    </span>
                                    {/* <a className="reply" href="#">
                                      Leave Reply
                                    </a> */}
                                  </div>
                                  <div className="user-rating">
                                    <ul>
                                      <li>
                                        <a href="#">
                                          <i
                                            className={
                                              review?.rating > 0
                                                ? "fas fa-star"
                                                : "fal fa-star"
                                            }
                                          ></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i
                                            className={
                                              review?.rating > 1
                                                ? "fas fa-star"
                                                : "fal fa-star"
                                            }
                                          ></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i
                                            className={
                                              review?.rating > 2
                                                ? "fas fa-star"
                                                : "fal fa-star"
                                            }
                                          ></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i
                                            className={
                                              review?.rating > 3
                                                ? "fas fa-star"
                                                : "fal fa-star"
                                            }
                                          ></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i
                                            className={
                                              review?.rating > 4
                                                ? "fas fa-star"
                                                : "fal fa-star"
                                            }
                                          ></i>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <p>{review?.comment}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                          {reviewObj &&
                            reviewObj?.length > 0 &&
                            reviewObj?.map((revObj: any) => {
                              return (
                                <li key={revObj?.id}>
                                  <div className="comments-box">
                                    <div className="comments-avatar">
                                      <Image
                                        src={
                                          JSON.parse(
                                            cookies?.get("userinfo") as any
                                          )?.image ??
                                          "https://cdn-icons-png.flaticon.com/512/9368/9368192.png"
                                        }
                                        alt="review-img"
                                        width={78}
                                        height={79}
                                      />
                                    </div>
                                    <div className="comments-text">
                                      <div className="avatar-name">
                                        <h5>
                                          {
                                            JSON.parse(
                                              cookies?.get("userinfo") as any
                                            )?.name
                                          }
                                        </h5>
                                        <span>
                                          {" "}
                                          - {revObj.createdAt?.substr(
                                            0,
                                            10
                                          )}{" "}
                                        </span>
                                        {/* <a className="reply" href="#">
                                    Leave Reply
                                  </a> */}
                                      </div>
                                      <div className="user-rating">
                                        <ul>
                                          <li>
                                            <a href="#">
                                              <i
                                                className={
                                                  revObj?.rating > 0
                                                    ? "fas fa-star"
                                                    : "fal fa-star"
                                                }
                                              ></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i
                                                className={
                                                  revObj?.rating > 1
                                                    ? "fas fa-star"
                                                    : "fal fa-star"
                                                }
                                              ></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i
                                                className={
                                                  revObj?.rating > 2
                                                    ? "fas fa-star"
                                                    : "fal fa-star"
                                                }
                                              ></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i
                                                className={
                                                  revObj?.rating > 3
                                                    ? "fas fa-star"
                                                    : "fal fa-star"
                                                }
                                              ></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <i
                                                className={
                                                  revObj?.rating > 4
                                                    ? "fas fa-star"
                                                    : "fal fa-star"
                                                }
                                              ></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                      <p>{revObj?.comment}</p>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                    <div className="post-comments-form mb-100">
                      <div className="post-comments-title mb-30">
                        <h3>Your Review</h3>
                        <div className="post-rating">
                          <span>Your Rating :</span>
                          <ul>
                            <li>
                              {/* <a href="#"> */}
                              {star > 0 ? (
                                <i
                                  className="fa fa-star cursor-pointer"
                                  style={{ color: "orange" }}
                                  onClick={() => setStar(1)}
                                ></i>
                              ) : (
                                <i
                                  className="fal fa-star cursor-pointer"
                                  onClick={() => setStar(1)}
                                ></i>
                              )}
                              {/* </a> */}
                            </li>
                            <li>
                              {/* <a href="#"> */}
                              {star > 1 ? (
                                <i
                                  className="fa fa-star cursor-pointer"
                                  style={{ color: "orange" }}
                                  onClick={() => setStar(2)}
                                ></i>
                              ) : (
                                <i
                                  className="fal fa-star cursor-pointer"
                                  onClick={() => setStar(2)}
                                ></i>
                              )}
                              {/* </a> */}
                            </li>
                            <li>
                              {/* <a href="#"> */}
                              {star > 2 ? (
                                <i
                                  className="fa fa-star cursor-pointer"
                                  style={{ color: "orange" }}
                                  onClick={() => setStar(3)}
                                ></i>
                              ) : (
                                <i
                                  className="fal fa-star cursor-pointer"
                                  onClick={() => setStar(3)}
                                ></i>
                              )}
                              {/* </a> */}
                            </li>
                            <li>
                              {/* <a href="#"> */}
                              {star > 3 ? (
                                <i
                                  className="fa fa-star cursor-pointer"
                                  style={{ color: "orange" }}
                                  onClick={() => setStar(4)}
                                ></i>
                              ) : (
                                <i
                                  className="fal fa-star cursor-pointer"
                                  onClick={() => setStar(4)}
                                ></i>
                              )}
                              {/* </a> */}
                            </li>
                            <li>
                              {/* <a href="#"> */}
                              {star > 4 ? (
                                <i
                                  className="fa fa-star cursor-pointer"
                                  style={{ color: "orange" }}
                                  onClick={() => setStar(5)}
                                ></i>
                              ) : (
                                <i
                                  className="fal fa-star cursor-pointer"
                                  onClick={() => setStar(5)}
                                ></i>
                              )}
                              {/* </a> */}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <form
                        id="contacts-form"
                        className="conatct-post-form"
                        action="#"
                      >
                        <div className="row">
                          {/* <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="contact-icon p-relative contacts-name">
                              <input type="text" placeholder="Name" />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="contact-icon p-relative contacts-name">
                              <input type="email" placeholder="Email" />
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="contact-icon p-relative contacts-email">
                              <input type="text" placeholder="Subject" />
                            </div>
                          </div> */}
                          <div className="col-xl-12">
                            <div className="contact-icon p-relative contacts-message">
                              <textarea
                                name="comments"
                                id="comments"
                                cols={30}
                                rows={10}
                                placeholder="Comments"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              ></textarea>
                            </div>
                          </div>
                          {toastMessage && (
                            <div
                              className="w-[100%] h-[20px] text-center py-2 mb-4 text-black"
                              style={{ background: "#7fea7f" }}
                            >
                              {toastMessage}
                            </div>
                          )}
                          <div className="col-xl-12">
                            <button
                              className="os-btn os-btn-black"
                              type="button"
                              onClick={() => postReview()}
                              disabled={loading}
                            >
                              {loading ? "Posting..." : "Post review"}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsBottom;
