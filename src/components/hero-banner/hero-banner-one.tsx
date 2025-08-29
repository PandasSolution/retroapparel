"use client";
import Slider from "react-slick";

// slick settings
const settings = {
  autoplay: false,
  autoplaySpeed: 10000,
  dots: true,
  fade: true,
  arrows: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 1 } },
    { breakpoint: 992, settings: { slidesToShow: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

// prop types
type IProps = {
  banners?: any[];
};

const HeroSliderOne = ({ banners = [] }: IProps) => {
  return (
    <section className="slider__area w-full relative" style={{ marginTop: "80px" }}>
      {/* marginTop should match your header height */}
      <Slider {...settings}>
        {banners.map((slider, index) => (
          <div
            key={index}
            className="w-full flex justify-center items-center relative"
            style={{
              minHeight: "400px",
              // position: "relative",
            }}
          >
            {/* Optional overlay for green-leaves harmony */}
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: "rgba(60, 107, 69, 0.15)", // subtle green-leaves tint
                backdropFilter: "blur(1px)",
                zIndex: 1,
              }}
            ></div>

            {/* <img
              // src={slider?.image}
              src="https://www.aarong.com/_next/image?url=https%3A%2F%2Fmcprod.aarong.com%2Fmedia%2Fmageplaza%2Fbannerslider%2Fbanner%2Fimage%2Fd%2F5%2Fd5-monsoon-mb-170dpi-19-07-2025-sm.png&w=1920&q=75"
              alt={`banner-${index}`}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                maxHeight: "100vh",
                zIndex: 2,
                position: "relative",
                borderRadius: "8px", // subtle rounding
              }}
              
            /> */}

            <img
  src="https://www.gentlepark.com/sbp-admin/upload/campaign/bad6e1ed2.jpg"
  alt={`banner-${index}`}
  className="banner-image"
/>

          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSliderOne;