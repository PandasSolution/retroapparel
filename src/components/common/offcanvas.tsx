"use client";
import { fetchData } from "@/api/api";
import { mobile_menus } from "@/data/menu-data";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// prop type
type IProps = {
  openMobileMenus: boolean;
  setOpenMobileMenus: React.Dispatch<React.SetStateAction<boolean>>;
};

const OffCanvas = ({ openMobileMenus, setOpenMobileMenus }: IProps) => {
  const [activeMenu, setActiveMenu] = React.useState("");
  const [menusData, setMenusData] = useState<any>([...mobile_menus]);
  const [categories, setCategories] = useState<any>([]);
  const [brands, setBrands] = useState<any>([]);

  const getCategories = async () => {
    const response = await fetchData({
      url: `/customer/categories`,
      cache: "force-cache",
    });

    setCategories(response?.data);

    const menuTemp: any = [
      {
        link: `#`,
        title: "Categories",
        hasDropdown: true,
        megamenu: false,
        dropdownMenu: response?.data?.map((itm: any) => {
          return {
            link: `/shop?category=${itm?.id}&price=1000000`,
            title: itm?.name,
            dropdownMenu: itm?.subcategory?.map((sub: any) => {
              return {
                link: `/shop?category=${sub?.categoryId}&price=1000000`,
                title: sub?.name,
              };
            }),
          };
        }),
      },
    ];

    const response1 = await fetchData({
      url: `/customer/brands`,
      cache: "force-cache",
    });

    setBrands(response1?.data);

    const menuBrandTemp: any = [
      {
        link: `#`,
        title: "Brands",
        hasDropdown: true,
        megamenu: false,
        dropdownMenu: response1?.data?.map((itm: any) => {
          return {
            link: `/shop?brand=${itm?.id}&price=1000000`,
            title: itm?.name,
            // dropdownMenu: itm?.subcategory?.map((sub: any) => {
            //   return {
            //     link: `/shop?category=${sub?.categoryId}`,
            //     title: sub?.name,
            //   };
            // }),
          };
        }),
      },
    ];

    setMenusData([...menusData, ...menuTemp, ...menuBrandTemp]);
  };

  useEffect(() => {
    getCategories();
    // getBrands();
  }, []);

  const handleOpenMenu = (navTitle: string) => {
    if (navTitle === activeMenu) {
      setActiveMenu("");
    } else {
      setActiveMenu(navTitle);
    }
  };
  return (
    <>
      <section
        className={`extra__info transition-3 ${
          openMobileMenus ? "info-opened" : ""
        }`}
      >
        <div className="extra__info-inner">
          <div className="extra__info-close text-end">
            <a
              onClick={() => setOpenMobileMenus(false)}
              className="extra__info-close-btn cursor-pointer"
            >
              <i className="fal fa-times"></i>
            </a>
          </div>

          <nav className="side-mobile-menu d-block d-lg-none mm-menu">
            <ul>
              {menusData.map((menu: any, i: any) => (
                <li
                  key={i}
                  className={`${
                    menu.dropdownMenu
                      ? "menu-item-has-children has-droupdown"
                      : ""
                  } ${activeMenu === menu.title ? "active" : ""}`}
                >
                  {menu.dropdownMenu && (
                    <a onClick={() => handleOpenMenu(menu.title)}>
                      {menu.title}
                    </a>
                  )}
                  {menu.dropdownMenu ? (
                    <ul
                      className={`sub-menu ${
                        activeMenu === menu.title ? "active" : ""
                      }`}
                    >
                      {menu.dropdownMenu.map((sub_m: any, index: any) => (
                        <li key={index}>
                          <Link href={sub_m.link}>{sub_m.title}</Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Link href={menu.link!}>{menu.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div
        onClick={() => setOpenMobileMenus(false)}
        className={`body-overlay transition-3 ${
          openMobileMenus ? "opened" : ""
        }`}
      ></div>
    </>
  );
};

export default OffCanvas;
