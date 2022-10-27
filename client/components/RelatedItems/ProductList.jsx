import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({products, currentProduct, handleRelatedItemClick}) => {
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
      <div className="carousel-related">
        {console.log(products)}
        {products.filter(Boolean).map((product, key) => {
          console.log(product);
          return <ProductCard product={product} currentProduct={currentProduct} index={index} key={key} width={'300px'} handleRelatedItemClick={handleRelatedItemClick}/>;
        })}
      </div>
      {index > 0 ? <div className="indicators"><div className="leftArrow" onClick={() => {
        updateIndex(index - 1);
      }}>
          ‹
      </div></div> : null}
      {index < React.Children.count(products) - 4 ? <div className="indicators"><div className="rightArrow" onClick={() => {
        updateIndex(index + 1);
      }}>
          ›
      </div></div> : null}
    </div>
  );
};

export default ProductList;