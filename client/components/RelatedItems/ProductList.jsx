import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({product}) => {
  return (
    <>
      {product.map((product, key) => {
        return (
          <ProductCard product={product} key={key}/>
        );
      })}
    </>
  );
};

export default ProductList;