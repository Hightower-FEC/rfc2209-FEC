import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({products}) => {
  return (
    <>
      {products.map((product, key) => {
        return (
          <ProductCard product={product} key={key}/>
        );
      })}
    </>
  );
};

export default ProductList;