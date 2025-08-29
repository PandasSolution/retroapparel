import Link from "next/link";
import React from "react";
import { StaticImageData } from "next/image";
import default_bg from "@/assets/img/page-title/page-title-1.jpg";

// prop type
type IProps = {
  bg_img?: StaticImageData;
  title: string;
  subtitle: string;
};

const Breadcrumb = ({ bg_img = default_bg, title, subtitle }: IProps) => {
  return (
    <>
      <section
        className="page__title p-relative d-flex align-items-center"
        style={{ background: `url( ${bg_img.src}` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="page__title-inner text-center">
                <h1>{title}</h1>
                <div className="page__title-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <Link href="/">Home</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {subtitle}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcrumb;
