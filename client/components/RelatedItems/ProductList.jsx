import React, {useState} from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({products}) => {
  const [index, setIndex] = useState(0);

  const updateIndex = (index) => {
    if (index < 0) {
      index = React.Children.count(products) - 1;
    } else if (index >= React.Children.count(products)) {
      index = 0;
    }
    setIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-view">
        {products.map((product, key) => {
          return <ProductCard product={product} index={index} key={key} width={'50%'}/>;
        })}
      </div>
      <div className="indicators">
        <button onClick={() => {
          updateIndex(index - 1);
        }}>
          Previous
        </button>
        <button onClick={() => {
          updateIndex(index + 1);
        }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;