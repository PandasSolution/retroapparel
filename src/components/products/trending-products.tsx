"use client";
import { IProduct } from "@/types/product-d-t";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../Loader";
import ProductItem from "./single-product/product-item";

type IProps = {
  products: IProduct[];
  style_2?: boolean;
  container?: string;
  trendingProd?: any;
};

function TrendingProducts({
  products,
  style_2 = false,
  container = "container",
  trendingProd = [],
}: IProps) {
  const trendingProducts = products.filter((p) => p.trending);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handlePerView = () => {
    router.push("/shop");
  };

  const productList = trendingProd?.length ? trendingProd : trendingProducts;

  return (
    <>
      {loading && <Loader />}
      <section className="product__area pt-60 pb-100">
        <div className={container}>
          {/* Section Title */}
          <div className="row">
            <div className="col-xl-12">
              <div className="section__title-wrapper text-center mb-55">
                <div className="section__title mb-10">
                  <h2>Trending Products</h2>
                </div>
                <div className="section__sub-title p-relative">
                  <p>Check out the most popular and top-selling products</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-3 g-4">
            {productList.map((item: any, index: number) => (
              <div key={index} className="col">
                <ProductItem product={item} setLoading={setLoading} isSearchPopup={false} />
              </div>
            ))}
          </div>

          <br></br>

<br></br>
          {/* See More Button */}
       <div className="col-xl-12 text-center">
  <a
    href="/shop"
    onClick={() => {
      handlePerView();
      setLoading(true);
    }}
    className="see-more-btn"
  >
    See More
  </a>
</div>

        </div>
      </section>
    </>
  );
}

export default TrendingProducts;
