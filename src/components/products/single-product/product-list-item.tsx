"use client";
// import { add_cart_product } from "@/redux/features/cart";
// import { add_to_compare } from "@/redux/features/compare";
import { handleModalProduct, handleOpenModal } from "@/redux/features/utility";
// import { add_to_wishlist } from "@/redux/features/wishlist";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IProduct } from "@/types/product-d-t";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// props type
type IProps = {
  product: IProduct;
};

// img style
const imgStyle: any = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  background: "#f6f6f6",
  padding: "1px",
};

const ProductListItem = ({ product, setLoading }: any) => {
  const {
    id,
    img,
    details,
    title,
    old_price,
    discount,
    thumb_img,
    price,
    sm_desc,
  } = product || {};
  const [isItemAddToCart, setIsItemAddToCart] = useState(false);
  const [isCompareAdd, setIsCompareAdd] = useState(false);
  const [isWishlistAdd, setIsWishlistAdd] = useState(false);
  const { cart_products } = useAppSelector((state) => state.cart);
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const { compare_products } = useAppSelector((state) => state.compare);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsItemAddToCart(cart_products.some((i) => i.id === product.id));
    setIsWishlistAdd(wishlist.some((i) => i.id === product.id));
    setIsCompareAdd(compare_products.some((i) => i.id === product.id));
  }, [cart_products, compare_products, product.id, wishlist]);

  const handleProductModal = (prd: IProduct) => {
    dispatch(handleModalProduct({ product: prd }));
    dispatch(handleOpenModal());
  };

  const addToWishlist = (prod: any) => {
    let wishlistProduct = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const productExists = wishlistProduct.some(
      (item: any) => item.id === prod.id
    );

    console.log(productExists);

    if (productExists) {
      wishlistProduct = wishlistProduct.filter(
        (item: any) => item.id !== prod.id
      );
    } else {
      wishlistProduct.push({ ...prod, count: 1 });
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlistProduct));

    // setWishlistProduct((prevWishlist: any[]) => {
    //   const productExists = prevWishlist.some((item) => item.id === prod.id);

    //   if (productExists) {
    //     // Remove product
    //     const updatedWishlist = prevWishlist.filter(
    //       (item) => item.id !== prod.id
    //     );
    //     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    //     return updatedWishlist;
    //   } else {
    //     // Add product
    //     const updatedWishlist = [...prevWishlist, { ...prod, count: 1 }];
    //     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    //     return updatedWishlist;
    //   }
    // });
  };

  const handleClick = async () => {
    setLoading(true);
  };

  return (
    <div className="product__wrapper mb-20">
      <div className="row">
        <div className="col-xl-4 col-lg-4">
          <div className="product__thumb product__thumb__list">
            <Link
              href={`/product-details/${product?.slug}`}
              onClick={() => handleClick()}
            >
              <Image
                src={product?.images[0]?.image ?? "/noimage.png"}
                alt="product-img"
                // width={255}
                // height={325}
                width={450}
                height={520}
                style={imgStyle}
              />
              {product?.images[1]?.image && (
                <Image
                  className="product__thumb-2"
                  src={product?.images[1]?.image ?? "/noimage.png"}
                  alt="product-img"
                  width={450}
                  height={520}
                  style={imgStyle}
                />
              )}
            </Link>
            <div className="product__sale">
              {/* {product.new && <span className="new">new</span>} */}
              {product?.productAttributes &&
                product?.productAttributes?.length > 0 &&
                product?.productAttributes[0]?.discountPercent > 0 && (
                  <span className="percent">
                    -{product?.productAttributes[0]?.discountPercent}%
                  </span>
                )}
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-lg-8">
          <div className="product__content p-relative">
            <div className="product__content-inner list">
              <h4>
                <Link
                  href={`/product-details/${product?.slug}`}
                  onClick={() => handleClick()}
                >
                  {product?.name}
                </Link>
              </h4>
              <div className="product__price-2 mb-10">
                <span>
                  {product?.productAttributes &&
                    product?.productAttributes?.length > 0 &&
                    product?.productAttributes[0]?.discountedRetailPrice}{" "}
                  TK
                </span>
                {product?.productAttributes &&
                  product?.productAttributes?.length > 0 && (
                    <span className="old-price">
                      {product?.productAttributes[0]?.price}
                    </span>
                  )}
              </div>
              <p>{product?.shortDescription}</p>
              {/* <div className="product__list mb-30">
                <ul>
                  {details.details_list.slice(0, 3).map((l: any, i: any) => (
                    <li key={i}>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
            <div className="add-cart-list d-sm-flex align-items-center">
              {isItemAddToCart ? (
                <Link
                  href="/cart"
                  className="add-cart-btn mr-10"
                  onClick={() => handleClick()}
                >
                  View cart
                </Link>
              ) : (
                <a
                  // onClick={() => dispatch(add_cart_product(product))}
                  onClick={() => handleProductModal(product)}
                  className="add-cart-btn mr-10 cursor-pointer"
                >
                  {" "}
                  <i className="fal fa-plus"></i> Add to Cart
                </a>
              )}
              <div className="product__action-2 transition-3 mr-20">
                <a
                  // onClick={() => dispatch(add_to_wishlist(product))}
                  onClick={() => addToWishlist(product)}
                  className={`cursor-pointer ${isWishlistAdd ? "active" : ""}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Add to Wishlist"
                >
                  <i className="fal fa-heart"></i>
                </a>
                {/* <a
                  onClick={() => dispatch(add_to_compare(product))}
                  className={`cursor-pointer ${isCompareAdd ? "active" : ""}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Compare"
                >
                  <i className="fal fa-sliders-h"></i>
                </a> */}
                <a
                  onClick={() => handleProductModal(product)}
                  className="cursor-pointer"
                >
                  <i className="fal fa-search"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
