import Link from 'next/link';
import React from 'react';
import { IProduct } from '@/types/product-d-t';
import ProductItem from './single-product/product-item';


// props
type IProps = {
  product_data:IProduct[];
  product: IProduct;
};
const RelatedProducts = ({product_data,product}: IProps) => {
  const related_product = product_data.filter(p => p.category === product.category);
  return (
    <section className="related__product pb-60">
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="section__title-wrapper text-center mb-55">
            <div className="section__title mb-10">
              <h2>Trending Products</h2>
            </div>
            <div className="section__sub-title">
              <p>Mirum est notare quam littera gothica quam nunc putamus parum claram!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
       
       {related_product.map((product, i) => (
          <div key={i} className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
            <div className="product__item">
              <ProductItem product={product} />
            </div>
          </div>
        ))}
    
      </div>
    </div>
  </section>
  );
};

export default RelatedProducts;