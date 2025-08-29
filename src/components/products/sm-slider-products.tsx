"use client";
import React,{useRef} from "react";
import { IProduct } from "@/types/product-d-t";
import Slider from "react-slick";
import SingleSmProduct from "./single-product/single-sm-product";

// slick setting
const settings = {
  autoplay: false,
  autoplaySpeed: 10000,
  infinite: false,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function chunkArray(arr: IProduct[], chunkSize: number) {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push({ id: i + 1, products: arr.slice(i, i + chunkSize) });
  }
  return chunkedArray;
}

// prop type
type IProps = {
  products: IProduct[];
};

const SmSliderProducts = ({ products }: IProps) => {
  const trendingRef = useRef<Slider | null>(null);
  const discountRef = useRef<Slider | null>(null);
  const topRatedRef = useRef<Slider | null>(null);
  const trending_slider_products = chunkArray(
    products.filter((p) => p.trending),
    3
  );
  const discount_slider_products = chunkArray(
    products.filter((p) => p.discount! > 0),
    3
  );
  const top_rated_slider_products = chunkArray(
    products.filter((p) => p.topRated),
    3
  );
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-4 col-md-6">
        <div className="product__offer-inner mb-30">
          <div className="product__title mb-60">
            <h4>Top Seller Products</h4>
          </div>
          <div className="product__offer-slider p-relative">
            <Slider {...settings} ref={trendingRef}>
              {trending_slider_products.map((items, i) => (
                <div key={i} className="product__offer-wrapper">
                  <div className="sidebar__widget-content">
                    {items.products.slice(0, 3).map((item, index) => (
                      <SingleSmProduct key={index} product={item} />
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
            <div className="owl-nav">
              <div className="owl-prev" onClick={() => trendingRef.current?.slickPrev()}>
                <button>
                  <i className="fal fa-angle-left"></i>
                </button>
              </div>
              <div className="owl-next" onClick={() => trendingRef.current?.slickNext()}> 
                <button>
                  <i className="fal fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-4 col-md-6">
        <div className="product__offer-inner mb-30">
          <div className="product__title mb-60">
            <h4>On Sale Products</h4>
          </div>
          <div className="product__offer-slider p-relative">
            <Slider {...settings} ref={discountRef}>
              {discount_slider_products.map((items, i) => (
                <div key={i} className="product__offer-wrapper">
                  <div className="sidebar__widget-content">
                    {items.products.slice(0, 3).map((item, index) => (
                      <SingleSmProduct key={index} product={item} />
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
            <div className="owl-nav">
              <div className="owl-prev" onClick={() => discountRef.current?.slickPrev()}>
                <button>
                  <i className="fal fa-angle-left"></i>
                </button>
              </div>
              <div className="owl-next" onClick={() => discountRef.current?.slickNext()}>
                <button>
                  <i className="fal fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-4 col-md-6">
        <div className="product__offer-inner mb-30">
          <div className="product__title mb-60">
            <h4>Top Rated Products</h4>
          </div>
          <div className="product__offer-slider p-relative">
            <Slider {...settings} ref={topRatedRef}>
              {top_rated_slider_products.map((items, i) => (
                <div key={i} className="product__offer-wrapper">
                  <div className="sidebar__widget-content">
                    {items.products.slice(0, 3).map((item, index) => (
                      <SingleSmProduct key={index} product={item} />
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
            <div className="owl-nav">
              <div className="owl-prev" onClick={() => topRatedRef.current?.slickPrev()}>
                <button>
                  <i className="fal fa-angle-left"></i>
                </button>
              </div>
              <div className="owl-next" onClick={() => topRatedRef.current?.slickNext()}>
                <button>
                  <i className="fal fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmSliderProducts;
