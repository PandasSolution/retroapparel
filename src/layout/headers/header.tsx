"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
// internal
import logo from "@/assets/img/logo/strike_logo.jpeg";
import Loader from "@/components/Loader";
import useCartInfo from "@/hooks/use-cart-info";
import useSticky from "@/hooks/use-sticky";
import { useCookies } from "next-client-cookies";
import ExtraInfo from "./header-com/extra-info";
import NavManus from "./header-com/nav-manus";
import SearchPopup from "./header-com/search-popup";
import { useRef, useState, useEffect } from "react";


const OffCanvas = dynamic(() => import("@/components/common/offcanvas"), { ssr: false });
const MiniCart = dynamic(() => import("./header-com/mini-cart"), { ssr: false });

// props
type IProps = {
  header_big?: boolean;
  white_bg?: boolean;
};

const Header = ({ header_big, white_bg }: IProps) => {
  const cookies = useCookies();
  const { sticky } = useSticky();
  const { quantity } = useCartInfo();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


   const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      {loading && <Loader />}

      <header>
     <div
 id="header-sticky"
  className={`header__area glass-header ${sticky ? "sticky top-0 left-0 z-50" : ""}`}
 style={{
  backdropFilter: "blur(20px) saturate(150%)",
  WebkitBackdropFilter: "blur(20px) saturate(150%)",
  background: "rgba(255, 255, 255, 0.3)", // slightly more visible
  boxShadow: `
    0 2px 6px rgba(0,0,0,0.03),   /* soft subtle shadow */
    inset 0 0 10px rgba(255,255,255,0.1) /* subtle inner glow */
  `,
}}
>
          <div className={`${header_big ? "container-fluid" : "container"}`}>
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                <div className="logo">
                  <Link href="/">
                    {/* <Image src={logo} alt="logo" priority width={180} /> */}
                    <h3 className="retro-logo">Retro Apparel</h3>
                  </Link>
                </div>
              </div>

              {/* Desktop & Mobile Menus */}
              <div className="col-xl-9 col-lg-9 col-md-8 col-sm-8">
                <div className="header__right p-relative d-flex justify-content-between align-items-center">

                  {/* Desktop Menu */}
                  <div className="main-menu d-none d-lg-block">
                    <nav>
                      <NavManus setLoading={setLoading} />
                    </nav>
                  </div>

                  {/* Mobile Menu Button */}
                  <div className="mobile-menu-btn d-lg-none">
                    <button onClick={() => setShowSidebar(true)} className="mobile-menu-toggle">
                      <i className="fas fa-bars"></i>
                    </button>
                  </div>

                  {/* Actions: Search, Cart, User */}
                  <div className="header__action">
                    <ul className="d-flex align-items-center gap-3">
                      {/* Search */}
                      <li>
                        <button
                          className="search-toggle"
                          onClick={() => setShowSearch(true)}
                        >
                          <i className="ion-ios-search-strong"></i> Search
                        </button>
                      </li>

                      {/* Cart */}
                      <li>
                        <button className="cart">
                          <i className="ion-bag"></i> Cart <span>({quantity})</span>
                        </button>
                        <MiniCart setLoading={setLoading} />
                      </li>

                      {/* User / Extra Info */}
                      <li>
                        <button>
                          {cookies.get("userinfo") && cookies.get("token") ? (
                            <i className="far fa-user"></i>
                          ) : (
                            <i className="far fa-bars"></i>
                          )}
                        </button>
                        <ExtraInfo setLoading={setLoading} />
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Popup */}
      <SearchPopup showSearch={showSearch} setShowSearch={setShowSearch} />

      {/* Offcanvas Mobile Menu */}
      <OffCanvas openMobileMenus={showSidebar} setOpenMobileMenus={setShowSidebar} />
    </>
  );
};

export default Header;