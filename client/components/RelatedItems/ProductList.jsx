import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({currentProductID}) => {
  return (
    <>
      {currentProductID.map((product, key) => {
        return (
          <ProductCard product={product} key={key}/>
        );
      })}
    </>
  );
};

export default ProductList;