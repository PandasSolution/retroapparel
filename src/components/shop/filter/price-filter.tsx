"use client";
import { set_price_value } from "@/redux/features/filter";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const InputRange = dynamic(() => import("@/ui/input-range"), { ssr: false });

const PriceFilter = ({
   categoryParam,
  brandParam,
  sortParam,
  setLoading,
}: {
  categoryParam?: string;
  brandParam?: string;
  sortParam?: string;
  setLoading?: (loading: boolean) => void; // 👈 add type
}) => {
  const router = useRouter();
  const { priceValue } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

const handleChanges = (val: number[]) => {
  const clamped: [number, number] = [
    Math.max(0, Math.min(val[0], 5000)),
    Math.max(0, Math.min(val[1], 5000)),
  ];

  dispatch(set_price_value(clamped));
};

  const handleChangesPrice = () => {
    startTransition(() => {
      router.push(
        `/shop?category=${categoryParam ?? ""}&brand=${brandParam ?? ""}&price=${
          Math.min(priceValue[1], 5000)
        }&sort=${sortParam ?? ""}`
      );
    });
  };

  return (
    <div className="sidebar__widget mb-55">
      <div className="sidebar__widget-title mb-30">
        <h3>Filter By Price</h3>
      </div>
      <div className="sidebar__widget-content">
        <div className="price__slider">
          <div className="mb-25">
            <InputRange
              MAX={5000}
              MIN={0}
              STEP={1}
              values={[
                Math.min(priceValue[0], 5000),
                Math.min(priceValue[1], 5000),
              ]}
              handleChanges={handleChanges}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleChangesPrice}
              disabled={isPending}
            >
              {isPending ? "Filtering..." : "Filter"}
            </button>
            <label htmlFor="amount">Price :</label>
            <span className="input-range">
              {priceValue[0]} TK - {priceValue[1]} TK
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
