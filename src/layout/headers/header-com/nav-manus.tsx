import { fetchData } from "@/api/api";
import menuData from "@/data/menu-data";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavManus = ({ setLoading }: any) => {
  const [menusData, setMenusData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const getCategoriesAndBrands = async () => {
    try {
      setLoading && setLoading(true);
      setLoadingData(true);

      // Fetch Categories
      const catRes = await fetchData({ url: `/customer/categories`, cache: "force-cache" });
      const categories = catRes?.data || [];

      const categoryMenu = [
        {
          link: `/shop`,
          title: "Categories",
          hasDropdown: true,
          megamenu: false,
          dropdownItems: categories.map((cat: any) => ({
            link: `/shop?category=${cat.id}&price=1000000`,
            title: cat.name,
          })),
        },
      ];

      // Fetch Brands
      const brandRes = await fetchData({ url: `/customer/brands`, cache: "force-cache" });
      const brands = brandRes?.data || [];

      const brandMenu = [
        {
          link: `/shop`,
          title: "Brands",
          hasDropdown: true,
          megamenu: false,
          dropdownItems: brands.length
            ? brands.map((brand: any) => ({
                link: `/shop?brand=${brand.id}&price=1000000`,
                title: brand.name,
              }))
            : [],
        },
      ];

       const home =   {
          link: `/contact`,
          title: "Contact",
          hasDropdown: false,
          megamenu: false,
         
        }

      setMenusData([...menuData, ...categoryMenu, ...brandMenu,home]);
    } catch (err) {
      console.error("NavManus fetch error:", err);
      const brandMenuFallback = [
        { link: "/shop", title: "Brands", hasDropdown: true, megamenu: false, dropdownItems: [] },
      ];
      setMenusData([...menuData, brandMenuFallback]);
    } finally {
      setLoading && setLoading(false);
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getCategoriesAndBrands();
  }, []);

  if (loadingData) {
    return <ul><li>Loading menu...</li></ul>;
  }

  return (
    <ul className="main-menu-list d-flex gap-4">
      {menusData.map((item, index) => (
        <li
          key={index}
          className={`${
            item.hasDropdown && !item.megamenu
              ? "active has-dropdown"
              : item.megamenu
              ? "mega-menu has-dropdown"
              : ""
          }`}
        >
          <Link href={item.link} className="menu-link">
            {item.title}
          </Link>

          {/* Dropdown */}
          {item.hasDropdown && !item.megamenu && (
            <ul className="submenu transition-3">
              {item.dropdownItems.length ? (
                item.dropdownItems.map((menu: any, idx: number) => (
                  <li key={idx}>
                    <Link href={menu.link} className="submenu-link">
                      {menu.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="submenu-link">No Brands Available</li>
              )}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavManus;
