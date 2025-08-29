"use client";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";
import Loader from "../Loader";

// brands
const brands: string[] = [
  "/assets/img/client/client-1.jpg",
  "/assets/img/client/client-2.jpg",
  "/assets/img/client/client-3.jpg",
  "/assets/img/client/client-4.jpg",
  "/assets/img/client/client-5.jpg",
  "/assets/img/client/client-4.jpg",
  "/assets/img/client/client-2.jpg",
];

const settings = {
  autoplay: true,
  autoplaySpeed: 10000,
  arrows: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const Brands = ({ df, brands = [] }: { df?: boolean; brands?: any }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
  };

  return (
    <>
      {loading && <Loader />}
      <section className={`client__area ${df ? "" : "pt-15 pb-140"}`}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div
                className={`client__slider ${
                  df ? "pt-80 pb-80 border-top-1" : ""
                } text-center`}
              >
                <Slider {...settings}>
                  {brands.map((img: any, i: any) => {
                    return (
                      <div key={i + img?.id} className="client__thumb">
                        <a
                          href={`/shop?brand=${img?.id}&price=1000000`}
                          onClick={() => handleClick()}
                        >
                          <Image
                            src={img?.image ?? "/noimage.png"}
                            alt="client"
                            width={240}
                            height={125}
                          />
                        </a>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Brands;
