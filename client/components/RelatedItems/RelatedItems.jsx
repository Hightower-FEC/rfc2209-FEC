import React from 'react';
import ProductList from './ProductList.jsx';

const RelatedItems = ({currentProductID}) => {
  return (
    <div>
      <h1>
        RelatedItems
      </h1>
      <ProductList products={currentProductID}/>
    </div>
  );
};

export default RelatedItems;