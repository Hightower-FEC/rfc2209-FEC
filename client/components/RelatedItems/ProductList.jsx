import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({products, handleRelated}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [products]);

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
          return <ProductCard product={product} index={index} key={key} width={'25%'} handleRelated={handleRelated}/>;
        })}
      </div>
      {index > 0 ? <div className="indicators"><div className="leftArrow" onClick={() => {
        updateIndex(index - 1);
      }}>
          ‹
      </div></div> : null}
      {index < React.Children.count(products) - 1 ? <div className="indicators"><div className="rightArrow" onClick={() => {
        updateIndex(index + 1);
      }}>
          ›
      </div></div> : null}
    </div>
  );
};

export default ProductList;