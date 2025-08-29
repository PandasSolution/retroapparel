"use client";
import Slider from "react-slick";
import blog_data from "@/data/blog-data";
import BlogSingle from "./single-blog/blog-single";

// blog items
const blog_items = blog_data.filter((blog) => blog.blog === "home");

// slider setting
const settings = {
  autoplay: true,
  autoplaySpeed: 10000,
  arrows: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

// props type
type IProps = {
  style_2?: boolean;
  style_3?: boolean;
};

const BlogArea = ({ style_2, style_3 }: IProps) => {
  return (
    <>
      <section className={`blog__area pb-70 ${style_2 ? "pt-90" : ""}`}>
        <div className={`container ${style_3 ? "custom-container" : ""}`}>
          <div className="row">
            <div className="col-xl-12">
              <div
                className={`section__title-wrapper text-center mb-55 ${ style_3 ? "p-relative" : ""}`}
              >
                <div className="section__title mb-10">
                  <h2>Our Blog Posts</h2>
                </div>
                <div className="section__sub-title">
                  <p>
                    Mirum est notare quam littera gothica quam nunc putamus
                    parum claram!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="blog__slider owl-carousel">
                <Slider {...settings}>
                  {blog_items.map((item, i) => {
                    return <BlogSingle key={i} item={item} />;
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

export default BlogArea;
