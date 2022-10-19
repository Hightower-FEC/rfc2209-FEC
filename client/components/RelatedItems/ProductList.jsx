import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({products, handleRelatedItemClick}) => {
  return (
    <>
      {products.map((product, key) => {
        return (
          <ProductCard handleRelatedItemClick={handleRelatedItemClick} product={product} key={key}/>
        );
      })}
    </>
  );
};

export default ProductList;