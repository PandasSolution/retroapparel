import { IProduct } from "@/types/product-d-t";
import BrandFilter from "./filter/brand-filter";
import CategoryFilter from "./filter/category-filter";
// import ColorFilter from "./filter/color-filter";
// import FeatureProducts from "./filter/feature-products";
import PriceFilter from "./filter/price-filter";
// import SizeFilter from "./filter/size-filter";

// prop type
type IProps = {
  feature_products: IProduct[];
  brands: string[];
  colors: string[];
  sizes: string[];
  categories?: any;
  allProducts?: any;
  brandParam?: any;
  categoryParam?: any;
  priceParam?: any;
  sortParam?: any;
  setLoading?: any;
  // setAllProducts?: any;
};

const ShopSidebar = ({
  feature_products,
  brands,
  colors,
  sizes,
  categories,
  allProducts,
  brandParam,
  categoryParam,
  priceParam,
  sortParam,
  setLoading,
}: // setAllProducts,
IProps) => {
  return (
    <div className="shop__sidebar">
      {categories && categories?.length > 0 && (
        <CategoryFilter
          categories={categories}
          allProducts={allProducts}
          brandParam={brandParam}
          priceParam={priceParam}
          sortParam={sortParam}
          setLoading={setLoading}
          // setAllProducts={setAllProducts}
        />
      )}

      <PriceFilter
        categoryParam={categoryParam}
        brandParam={brandParam}
        sortParam={sortParam}
        setLoading={setLoading}
      />
      {/* <SizeFilter sizes={sizes} />
      <ColorFilter colors={colors} /> */}
      {brands && brands?.length > 0 && (
        <BrandFilter
          brands={brands}
          categoryParam={categoryParam}
          priceParam={priceParam}
          sortParam={sortParam}
          setLoading={setLoading}
        />
      )}

      {/* <FeatureProducts products={feature_products} /> */}
    </div>
  );
};

export default ShopSidebar;
