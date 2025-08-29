"use client";
import usePagination from "@/hooks/use-pagination";
import { reset } from "@/redux/features/filter";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IProduct } from "@/types/product-d-t";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import ProductItem from "../products/single-product/product-item";
import ProductListItem from "../products/single-product/product-list-item";
import ShopSidebar from "./shop-sidebar";

// prop type
type IProps = {
  shop_right?: boolean;
  shop_col?: string;
  product_data: IProduct[];
  categories?: any;
  brands?: any;
  categoryParam?: any;
  brandParam?: any;
  priceParam?: any;
  sortParam?: any;
  allProducts?: any;
};

const ShopArea = ({
  product_data,
  shop_right,
  shop_col,
  categories,
  brands,
  categoryParam,
  brandParam,
  priceParam,
  sortParam,
  allProducts,
}: IProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // const [allProducts, setAllProducts] = useState<any>([]);
  // const brands = [...new Set(product_data.map((p) => p.brand))];
  const allColors = product_data.flatMap((item) => item.colors);
  const uniqueColors = [...new Set(allColors)].slice(0, 8);
  const allSizes = product_data.flatMap((item) => item.sizes);
  const uniqueSizes = [...new Set(allSizes)];
  const feature_products = product_data.filter((p) => p.trending).slice(0, 2);

  // pagination per page
  const pagination_per_page = shop_col ? 12 : 9;

  const { category, subCategory, sizes, colors, brand, priceValue } =
    useAppSelector((state) => state.filter);
  const [products, setProducts] = useState<IProduct[]>([...product_data]);
  const { currentItems, handlePageClick, pageCount } = usePagination<IProduct>(
    products,
    pagination_per_page
  );

  const dispatch = useAppDispatch();

  // filter
  useEffect(() => {
    let filteredData = [...product_data]
      .filter((p) =>
        category && !subCategory
          ? p.parentCategory.toLowerCase() === category.toLowerCase()
          : !category && subCategory
          ? p.category.toLowerCase() === subCategory.toLowerCase()
          : category && subCategory
          ? p.parentCategory.toLowerCase() === category.toLowerCase() &&
            p.category.toLowerCase() === subCategory.toLowerCase()
          : true
      )
      .filter((p) => p.price >= priceValue[0] && p.price <= priceValue[1])
      .filter((p) => {
        if (sizes.length > 0) {
          return p.sizes.some((s) => sizes.includes(s));
        }
        return true;
      })
      .filter((p) => {
        if (colors.length > 0) {
          return p.colors.some((c) => colors.includes(c));
        }
        return true;
      })
      .filter((p) => {
        if (brand) {
          return p.brand.toLowerCase() === brand.toLowerCase();
        }
        return true;
      });

    setProducts(filteredData);
  }, [brand, category, colors, priceValue, product_data, sizes, subCategory]);

  // handle Sort Change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "sale") {
      setProducts([...product_data].filter((p) => p.discount! > 0));
    } else if (e.target.value === "high") {
      setProducts([...product_data].sort((a, b) => b.price - a.price));
    } else if (e.target.value === "low") {
      setProducts([...product_data].sort((a, b) => a.price - b.price));
    } else {
      setProducts([...product_data]);
    }
  };

  const handleSortPriceChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLoading(true);
    if (e.target.value === "sale") {
      setProducts([...product_data].filter((p) => p.discount! > 0));
    } else if (e.target.value === "high") {
      router.push(
        `/shop?category=${categoryParam ?? ""}&brand=${
          brandParam ?? ""
        }&price=${priceParam ?? "5000"}&sort=${"high"}`
      );
    } else if (e.target.value === "low") {
      router.push(
        `/shop?category=${categoryParam ?? ""}&brand=${
          brandParam ?? ""
        }&price=${priceParam ?? "1000000"}&sort=${"low"}`
      );
    } else {
      router.push(
        `/shop?category=${categoryParam ?? ""}&brand=${
          brandParam ?? ""
        }&price=${priceParam ?? "1000000"}&sort=${""}`
      );
    }
    setLoading(false);
  };

  // const getAllProducts = async () => {
  //   try {
  //     const productRes = await fetchData({ url: "/customer/products" });

  //     if (!productRes.success) {
  //       console.log(productRes?.message as string);
  //       setAllProducts([]);
  //       return;
  //     }

  //     setAllProducts(productRes?.data);
  //   } catch (error) {
  //     console.log(error as string);
  //   }
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  // const params = useSearchParams();

  // useEffect(() => {
  //   console.log(categoryParam);
  //   console.log({ allProducts });
  //   setAllProducts(
  //     allProducts?.filter((itm: any) => itm?.categoryId == categoryParam)
  //   );
  //   // console.log(params?.get("category"));
  //   console.log("HELLO");
  // }, [categoryParam]);

  return (
    <>
      {loading && <Loader />}
      <section className="shop__area pt-100 pb-100">
        <div className="container">
          <div className="row">
            {!shop_right && !shop_col && (
              <div className="col-xl-3 col-lg-3 col-md-4">
                {/* shop sidebar start */}
                <ShopSidebar
                  feature_products={feature_products}
                  brands={brands}
                  colors={uniqueColors}
                  sizes={uniqueSizes}
                  categories={categories}
                  allProducts={allProducts}
                  brandParam={brandParam}
                  priceParam={priceParam}
                  sortParam={sortParam}
                  categoryParam={categoryParam}
                  setLoading={setLoading}
                  // setAllProducts={setAllProducts}
                />
                {/* shop sidebar end */}
              </div>
            )}
            <div className={shop_col ? "col-xl-12" : "col-xl-9 col-lg-8"}>
              <div className="shop__content-area">
                <div className="shop__header d-sm-flex justify-content-between align-items-center mb-40">
                  <div className="shop__header-left">
                    <div className="show-text">
                      <span>
                        {/* Showing 1–{currentItems.length} of  */}
                        {allProducts.length} results
                      </span>
                    </div>
                  </div>
                  <div className="shop__header-right d-flex align-items-center justify-content-between justify-content-sm-end">
                    <div className="sort-wrapper mr-30 pr-25 p-relative">
                      <select onChange={handleSortPriceChange}>
                        <option value="asc">Default Sorting</option>
                        {/* <option value="sale">On Sale</option> */}
                        <option value="high">Price High To Low</option>
                        <option value="low">Price Low To High</option>
                      </select>
                    </div>
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-grid-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#pills-grid"
                          type="button"
                          role="tab"
                          aria-controls="pills-grid"
                          aria-selected="true"
                          tabIndex={-1}
                        >
                          <i className="fas fa-th"></i>
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-list-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#pills-list"
                          type="button"
                          role="tab"
                          aria-controls="pills-list"
                          aria-selected="false"
                          tabIndex={-1}
                        >
                          <i className="fas fa-list-ul"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* if no item in product */}
                {allProducts.length === 0 && (
                  <div className="cartmini__empty text-center mt-80">
                    <div className="mb-30">
                      <Image
                        src="/assets/img/shop/empty-cart.png"
                        alt="empty-cart-img"
                        width={283}
                        height={171}
                      />
                    </div>
                    <h4>
                      Sorry! Could not find the product you were looking For!!!
                    </h4>
                    <p>
                      Please check if you have misspelt something or try
                      searching with other words.
                    </p>
                    <button
                      onClick={() => dispatch(reset())}
                      className="os-btn os-btn-3"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-grid"
                    role="tabpanel"
                    aria-labelledby="pills-grid-tab"
                  >
  <div className="row g-0">
  {allProducts.map((item: any, i: any) => (
    <div
      key={i}
      className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ml-20 product-shop-card"
    >
      <ProductItem product={item} setLoading={setLoading} />
    </div>
  ))}
</div>


                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-list"
                    role="tabpanel"
                    aria-labelledby="pills-list-tab"
                  >
                    {allProducts.map((item: any, i: any) => (
                      <ProductListItem
                        key={i}
                        product={item}
                        setLoading={setLoading}
                      />
                    ))}
                  </div>
                </div>
                {/* <div className="row mt-40">
                <div className="col-xl-12">
                  <div className="shop-pagination-wrapper d-md-flex justify-content-between align-items-center">
                    <div className="basic-pagination">
                      <nav>
                        <Pagination
                          handlePageClick={handlePageClick}
                          pageCount={pageCount}
                        />
                      </nav>
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
            </div>

            {shop_right && !shop_col && (
              <div className="col-xl-3 col-lg-3 col-md-4">
                {/* shop sidebar start */}
                <ShopSidebar
                  feature_products={feature_products}
                  brands={brands}
                  colors={uniqueColors}
                  sizes={uniqueSizes}
                  allProducts={allProducts}
                  brandParam={brandParam}
                  priceParam={priceParam}
                  sortParam={sortParam}
                  categoryParam={categoryParam}
                  setLoading={setLoading}
                  // setAllProducts={setAllProducts}
                />
                {/* shop sidebar end */}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopArea;
