"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
// internal
import ExtraInfo from "./header-com/extra-info";
import NavManus from "./header-com/nav-manus";
import useCartInfo from "@/hooks/use-cart-info";
import useSticky from "@/hooks/use-sticky";
import logo from "@/assets/img/logo/logo.png";
import SearchPopup from "./header-com/search-popup";
import MiniCart from "./header-com/mini-cart";
const OffCanvas = dynamic(() => import('@/components/common/offcanvas'), {
  ssr: false
})

const HeaderTwo = () => {
  const { sticky } = useSticky();
  const { quantity } = useCartInfo();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <>
      <header>
        <div
          id="header-sticky"
          className={`header__area header__transparent box-25 ${sticky ? "sticky" : ""}`}
        >
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="main-menu d-none d-lg-block position-relative">
                  <nav>
                    <NavManus />
                  </nav>
                </div>
              </div>
              <div className="col-xl-3 col-lg-2 col-md-4 col-sm-4">
                <div className="logo">
                  <Link href="/">
                    <Image src={logo} alt="logo" priority />
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-8 col-sm-8">
                <div className="header__right p-relative d-flex justify-content-between justify-content-sm-end align-items-center">
                  <div className="mobile-menu-btn d-lg-none">
                    <button
                      className="mobile-menu-toggle"
                      onClick={() => setShowSidebar(true)}
                    >
                      <i className="fas fa-bars"></i>
                    </button>
                  </div>
                  <div className="header__action">
                    <ul>
                      <li>
                        <button
                          className="search-toggle"
                          onClick={() => setShowSearch(true)}
                        >
                          <i className="ion-ios-search-strong"></i> Search
                        </button>
                      </li>
                      <li>
                        <button className="cart">
                          <i className="ion-bag"></i> Cart{" "}
                          <span>({quantity})</span>
                        </button>
                        {/* cart area start */}
                        <MiniCart />
                        {/* cart area end */}
                      </li>
                      <li>
                        <button>
                          <i className="far fa-bars"></i>
                        </button>
                        <ExtraInfo />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* search popup start */}
      <SearchPopup showSearch={showSearch} setShowSearch={setShowSearch} />
      {/* search popup end */}

      {/* offcanvas start */}
      <OffCanvas openMobileMenus={showSidebar} setOpenMobileMenus={setShowSidebar} />
      {/* offcanvas end */}
    </>
  );
};

export default HeaderTwo;
