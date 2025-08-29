"use client";
import { add_category, add_sub_category } from "@/redux/features/filter";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

const CategoryFilter = ({
  categories,
  allProducts,
  brandParam,
  priceParam,
  sortParam,
  setLoading,
}: any) => {
  const { category, subCategory } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleParentCategory = (value: string) => {
    dispatch(add_category(value));
  };

  const handleSubCategory = (list: string) => {
    dispatch(add_sub_category(list));
  };

  const handleCategory = async (cat: any) => {
    setLoading(true);
    router.push(
      `/shop?category=${cat?.id ?? ""}&brand=${brandParam ?? ""}&price=${
        priceParam ?? "100000"
      }&sort=${sortParam ?? ""}`
    );
    setLoading(false);
  };

  return (
    <div className="sidebar__widget mb-55">
      <div className="sidebar__widget-title mb-25">
        <h3>Product Categories</h3>
      </div>
      <div className="sidebar__widget-content">
        <div className="categories">
          <div id="accordion">
            {categories.map((item: any, i: any) => (
              <div
                key={i}
                className={`card ${category === item.name ? "show" : ""}`}
              >
                <div className="card-header ${category === item.name ? 'active' : ''}" onClick={() => handleCategory(item)}>

  <h5 className="mb-0">
    <button
      onClick={() => handleCategory(item)}
      className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 font-bold transform hover:-translate-y-1 ${
        category === item.name
          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-2xl"
          : "bg-white text-gray-800 shadow-md hover:shadow-xl"
      }`}
      aria-expanded={category === item.name ? "true" : "false"}
    >
      {item.name}
    </button>
  </h5>
</div>
                {/* <div
                  id={`collapse-${i}`}
                  className={`collapse `}
                  aria-labelledby={`accordion-${i}`}
                  data-bs-parent="#accordion"
                >
                  <div className="card-body">
                    <div className="categories__list">
                      <ul>
                        {item?.children?.map((list, j) => (
                          <li key={j}>
                            <a
                              onClick={() => handleSubCategory(list)}
                              className={`text-capitalize cursor-pointer ${subCategory === list ? 'active' : ''}`}
                            >
                              {list.toLowerCase()}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
