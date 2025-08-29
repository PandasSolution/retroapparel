// "use client";

// import { IProduct } from "@/types/product-d-t";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import Loader from "../Loader";

// // prop type
// type IProps = {
//   style_2?: boolean;
//   style_3?: boolean;
//   products: IProduct[];
//   categories?: any;
// };

// // img style
// const imgStyle = {
//   width: "100%",
//   height: "100%",
// };

// const BannerProducts = ({
//   style_2,
//   products,
//   style_3,
//   categories = [],
// }: IProps) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const bannerProducts = products.filter((p) => p.banner).slice(0, 2);

//   const handleClick = async () => {
//     setLoading(true);
//   };

//   return (
//     <>
//       {loading && <Loader />}
//       <div className="banner__area-2 pb-60">
//         <div className={`container-fluid ${style_2 ? "" : "p-0"}`}>
//           <div className="row g-0">
//             {categories?.slice(0, 2)?.map((item: any, index: any) => (
//               <div
//                 key={item?.id}
//                 className={`col-xl-6 col-lg-6 ${
//                   index === 0 ? "banner-right pr-15" : "banner-left pl-15"
//                 }`}
//               >
//                 <div className="banner__item-2 p-relative mb-30">
//                   <div className="banner__thumb fix banner_card">
//                     <Link
//                       href={`/shop?category=${item?.id}&price=1000000`}
//                       className="w-img"
//                       onClick={() => handleClick()}
//                     >
//                       <Image
//                         src={item?.image ?? "/noimage.png"}
//                         alt="banner"
//                         width={937}
//                         height={451}
//                         style={imgStyle}
//                       />
//                     </Link>
//                   </div>
//                   <div
//                     className={`banner__content-2 ${
//                       style_3 ? "banner__content-4" : ""
//                     } ${
//                       index !== 0 && style_3 ? "banner__content-4-right" : ""
//                     } p-absolute transition-3`}
//                   >
//                     <span>Category</span>
//                     <h4>
//                       <Link
//                         href={`/shop?category=${item?.id}&price=1000000`}
//                         onClick={() => handleClick()}
//                       >
//                         {item?.name}
//                       </Link>
//                     </h4>
//                     <p style={{ maxWidth: style_3 ? "250px" : "450px" }}>
//                       {style_3 ? item.sm_desc.slice(0, 50) : item.sm_desc}
//                     </p>
//                     <Link
//                       href={`/shop?category=${item?.id}&price=1000000`}
//                       className="os-btn os-btn-2"
//                       onClick={() => handleClick()}
//                     >
//                       buy now
//                       {/* / <span>${item.price.toFixed(2)}</span> */}
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BannerProducts;
