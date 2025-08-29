"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// internal
// import { IProduct } from "@/types/product-d-t";
import { postDataWithToken } from "@/api/api";
import { add_cart_product, decrement, increment } from "@/redux/features/cart";
import { handleOpenModal } from "@/redux/features/utility";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCookies } from "next-client-cookies";
import { usePathname } from "next/navigation";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

// prop type
type IProps = {
  product: any;
  style_2?: boolean;
  bottomShow?: boolean;
  isModal?: boolean;
};

const ProductDetailsUpper = ({
  product,
  style_2,
  bottomShow = true,
  isModal = true,
}: IProps) => {
  const [variant, setVariant] = useState<any>("");
  const [price, setPrice] = useState<number | any>(null);
  const [retailPrice, setRetailPrice] = useState<number | any>(null);
  const [costPrice, setCostPrice] = useState<number | any>(null);
  const [discountPrice, setDiscountPrice] = useState<number | any>(null);
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const [productAttributeId, setProductAttributeId] = useState<string>("");
  const [stock, setStock] = useState<number>(
    product?.productAttributes[0]?.stockAmount
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string>("");
  const { orderQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [activeImg, setActiveImg] = useState(
    product?.images[0]?.image ?? "/noimage.png"
  );

  const handleImageActive = (img: string) => {
    setActiveImg(img);
  };

  let ratingCount = product?.review?.reduce((accum: any, currElem: any) => {
    return (accum = accum + currElem?.rating);
  }, 0);

  let ratingAverage = ratingCount / product?.review?.length;

  const pathname = usePathname();

  const [loading, setLoading] = useState<boolean>(false);

  const cookies = useCookies();

  const preorder = async () => {
    setLoading(true);
    try {
      if (!cookies?.get("token") || !cookies?.get("userinfo")) {
        setToastMessage("Please login first to preorder");
        return;
      }

      const res = await postDataWithToken(`/preorders`, {
        productId: product?.id,
        productAttributeId,
        userId: JSON.parse(cookies.get("userinfo") as any)?.id,
      });

      if (!res?.success) {
        setToastMessage(res?.message as string);
        console.log(res?.message as string);
        return;
      }

      setToastMessage(res?.message as string);
    } catch (error) {
      console.log(error as string);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(product?.productAttributes);
  // }, [stock]);

  return (
    <>
      <div className="row">
        {/* {!isModal && (
          <div className="col-xl-6 col-lg-6">
            <div className="product__modal-box d-flex">
              <div className="product__modal-nav mr-20">
                <nav>
                  <div className="nav nav-tabs" id="product-details">
                    {product?.images?.map((img: any, i: any) => (
                      <a
                        key={img?.id}
                        className={`nav-item nav-link cursor-pointer ${
                          img === activeImg ? "active" : ""
                        }`}
                      >
                        <div
                          className="product__nav-img w-img"
                          onClick={() => handleImageActive(img)}
                        >
                          <Image
                            src={img?.image}
                            alt="product-img"
                            width={92}
                            height={117}
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="tab-content mb-20" id="product-detailsContent">
                <div className="product__modal-img product__thumb w-img">
                  <Image
                    src={activeImg}
                    alt="product-img"
                    width={418}
                    height={534}
                  />
                  <div className="product__sale">
                    {product.new && <span className="new">new</span>}
                    {product.discount && (
                      <span className="percent">-{product.discount}%</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {product && (
          <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
            <div className="product__modal-box">
              <div className="tab-content mb-20" id="nav-tabContent">
                <div className="product__modal-img w-img">
                  <InnerImageZoom
                    src={activeImg}
                    // alt="product-img"
                    width={327}
                    height={360}
                    className="image_big_modal"
                    hasSpacer={true}
                  />
                  {/* <Image
                    src={activeImg}
                    alt="product-img"
                    width={327}
                    height={416}
                    className="image_big_modal"
                  /> */}
                </div>
              </div>
              <nav>
                <div className="nav nav-tabs justify-content-start">
                  {product?.images?.map((img: any, i: any) => (
                    <a
                      key={i + new Date()}
                      className={`nav-item nav-link cursor-pointer images_small_modal ${
                        img === activeImg ? "active" : ""
                      }`}
                    >
                      <div
                        className="product__nav-img w-img"
                        onClick={() => handleImageActive(img?.image)}
                      >
                        <Image
                          src={img?.image}
                          alt="product-img"
                          width={92}
                          height={117}
                          className="images_for_modal"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        )}

        <div
          className={
            product
              ? "col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12"
              : "col-xl-6 col-lg-6"
          }
        >
          <div className="product__modal-content product__modal-content-2">
            <h4>
              <Link href={`/product-details/${product?.slug}`}>
                {product.name}
              </Link>
            </h4>
            <div className="rating rating-shop mb-15">
              <ul>
                <li>
                  <span>
                    <i
                      className={
                        ratingAverage > 0 ? "fas fa-star" : "fal fa-star"
                      }
                    ></i>
                  </span>
                </li>
                <li>
                  <span>
                    <i
                      className={
                        ratingAverage > 1 ? "fas fa-star" : "fal fa-star"
                      }
                    ></i>
                  </span>
                </li>
                <li>
                  <span>
                    <i
                      className={
                        ratingAverage > 2 ? "fas fa-star" : "fal fa-star"
                      }
                    ></i>
                  </span>
                </li>
                <li>
                  <span>
                    <i
                      className={
                        ratingAverage > 3 ? "fas fa-star" : "fal fa-star"
                      }
                    ></i>
                  </span>
                </li>
                <li>
                  <span>
                    <i
                      className={
                        ratingAverage > 4 ? "fas fa-star" : "fal fa-star"
                      }
                    ></i>
                  </span>
                </li>
              </ul>
              <span className="rating-no ml-10 rating-left">
                {product?.review && product?.review?.length} rating(s)
              </span>
              <span className="review rating-left">
                <a href="#">👁️ {product?.viewCount}</a>
              </span>
            </div>
            <div className="product__price-2 mb-25">
              <span>
                {price
                  ? price
                  : product?.productAttributes[0]?.discountedRetailPrice}{" "}
                TK
              </span>
              {product.productAttributes[0]?.retailPrice &&
                discountPrice > 0 && (
                  <span className="old-price">
                    {retailPrice
                      ? retailPrice
                      : product.productAttributes[0]?.retailPrice}{" "}
                    TK
                  </span>
                )}
            </div>
            <div className="product__modal-des mb-30">
              <p>{product.shortDescription}</p>
            </div>
            <div className="product__modal-form mb-30">
              <form action="#">
                <div className="product__modal-input size mb-20">
                  <label>
                    Variant <i className="fas fa-star-of-life"></i>
                  </label>
                  <select
                    onChange={(e) => {
                      setVariant(e.target.value?.split(" | ")[0]);
                      setPrice(Number(e.target.value?.split(" | ")[1]));
                      setRetailPrice(Number(e.target.value?.split(" | ")[2]));
                      setCostPrice(Number(e.target.value?.split(" | ")[3]));
                      setDiscountPrice(Number(e.target.value?.split(" | ")[4]));
                      setDiscountPercent(
                        Number(e.target.value?.split(" | ")[5])
                      );
                      setProductAttributeId(e.target.value?.split(" | ")[6]);
                      setStock(Number(e.target.value?.split(" | ")[7]));
                      // console.log(Number(e.target.value?.split(" | ")[7]));
                    }}
                  >
                    <option value={""}>- Please select -</option>
                    {product?.productAttributes?.map((size: any, i: any) => (
                      <option
                        key={i}
                        value={`${size?.size} | ${
                          size?.discountedRetailPrice ?? 0
                        } | ${size?.retailPrice ?? 0} | ${
                          size?.costPrice ?? 0
                        } | ${size?.discountPrice ?? 0} | ${
                          discountPercent ?? 0
                        } | ${size?.id} | ${size?.stockAmount}`}
                      >
                        {size?.size}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="product__modal-input color mb-20">
                  <label>
                    Color <i className="fas fa-star-of-life"></i>
                  </label>
                  <select>
                    <option>- Please select -</option>
                    {product.colors.map((clr) => (
                      <option key={clr}>{clr}</option>
                    ))}
                  </select>
                </div> */}
                <div className="product__modal-required mb-5">
                  <span>Required Fields *</span>
                </div>
                <div className="pro-quan-area d-sm-flex align-items-center">
                  <div className="product-quantity-title">
                    <label>Quantity</label>
                  </div>
                  <div className="product-quantity mr-20 mb-20">
                    <div className="cart-plus-minus">
                      <input
                        type="text"
                        value={orderQuantity}
                        disabled
                        readOnly
                      />
                      <div
                        onClick={() => {
                          dispatch(decrement());
                          // setQuantity((prev) => prev - 1);
                        }}
                        className="dec qtybutton"
                      >
                        -
                      </div>
                      <div
                        onClick={() => {
                          dispatch(increment());
                          // setQuantity((prev) => prev + 1);
                        }}
                        className="inc qtybutton"
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="pro-cart-btn">
                    {stock > 0 ? (
                      <a
                        onClick={() => {
                          if (variant === "") {
                            setToastMessage("Please select a variant first");
                            return;
                          }
                          dispatch(
                            add_cart_product({
                              name: product?.name,
                              image: product?.images[0]?.image,
                              barcode: product?.barcode,
                              id: product?.id + variant,
                              productCode: product?.productCode,
                              shortDescription: product?.shortDescription,
                              sku: product?.sku,
                              slug: product?.slug,
                              viewCount: product?.viewCount,
                              variant,
                              orderQuantity: orderQuantity,
                              discountedRetailPrice: price,
                              costPrice: costPrice,
                              retailPrice: retailPrice,
                              discountPrice: discountPrice,
                              discountPercent: discountPercent,
                              totalCostPrice:
                                costPrice && orderQuantity * costPrice,
                              totalPrice: price && orderQuantity * price,
                              productId: product?.id,
                              productAttributeId: productAttributeId,
                            })
                          );

                          setToastMessage("Added to cart");
                          if (
                            !pathname?.split("/")?.includes("product-details")
                          ) {
                            setTimeout(() => {
                              dispatch(handleOpenModal());
                              if (orderQuantity > 1) {
                                for (let i = 1; i < orderQuantity; i++) {
                                  dispatch(decrement());
                                }
                              }
                            }, 1500);
                          }
                        }}
                        className="add-cart-btn-u mb-10 cursor-pointer"
                      >
                        + Add to Cart
                      </a>
                    ) : (
                      <>
                        {loading ? (
                          <button
                            type="button"
                            // href="#"
                            // onClick={() => preorder()}
                            className="add-cart-btn-u mb-20 cursor-pointer"
                          >
                            🛒Preordering...
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => preorder()}
                            className="add-cart-btn-u mb-20 cursor-pointer"
                          >
                            🛒 Preorder
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </form>

              {toastMessage && (
                <div
                  className="w-[100%] h-[20px] text-center py-2 my-3 text-black"
                  style={{ background: "#7fea7f" }}
                >
                  {toastMessage}
                </div>
              )}
            </div>

            {bottomShow && (
              <div>
                <div className="product__tag mb-25">
                  <span>Category:</span>
                  <span>
                    <a className="cursor-pointer">{product?.category?.name}</a>
                  </span>
                </div>
                {/* <div className="product__share">
                  <span>Share :</span>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-behance"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsUpper;
