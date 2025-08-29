// import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { useRouter } from "next/navigation";

type IProps = {
  brands: any;
  categoryParam?: any;
  priceParam?: any;
  sortParam?: any;
  setLoading?: any;
};

const BrandFilter = ({
  brands,
  categoryParam,
  priceParam,
  sortParam,
  setLoading,
}: IProps) => {
  // const { brand: stateBrand } = useAppSelector((state) => state.filter);
  // const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChangeBrand = (brandId: any) => {
    setLoading(true);
    router.push(
      `/shop?category=${categoryParam ?? ""}&brand=${brandId ?? ""}&price=${
        priceParam ?? "1000000"
      }&sort=${sortParam ?? ""}`
    );
    setLoading(false);
  };

  const resetFilter = () => {
    setLoading(true);
    router.push(`/shop?category=${""}&brand=${""}&price=${""}&sort=${""}`);
    setLoading(false);
  };

  return (
    <div className="sidebar__widget mb-50">
      <div className="sidebar__widget-title mb-25">
        <h3>Brands</h3>
      </div>
      <div className="sidebar__widget-content">
        <div className="brand">
          <ul>
            {brands.map((b: any, i: any) => (
              <li
                key={i}
                // onClick={() => dispatch(add_brand(b))}
                onClick={() => handleChangeBrand(b?.id)}
              >
                <a
                  className={`cursor-pointer 
                    ${
                      ""
                      // stateBrand === b ? "active" : ""
                    }
                  `}
                >
                  {b?.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="reset-button mt-20">
          <button
            // onClick={()=> dispatch(reset())}
            onClick={() => resetFilter()}
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandFilter;
