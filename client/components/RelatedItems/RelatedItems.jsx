import React, {useState, useEffect} from 'react';
import ProductList from './ProductList.jsx';
import OutfitList from './OutfitList.jsx';
import axios from 'axios';

const RelatedItems = ({currentProduct, handleRelatedItemClick, interactions}) => {
  const [products, setProducts] = useState([]);

  /**
   * Get related products
   */
  useEffect(() => {
    axios.get(`/products/${currentProduct.id}/related`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentProduct]);

  return (
    <div onClick={(e) => interactions(e, 'RelatedItems')}>
      <h1 className="headers">
        Related Items
      </h1>
      <div className="accent-underline-related"></div>
      <ProductList products={products} currentProduct={currentProduct} handleRelatedItemClick={handleRelatedItemClick} />
      <h1 className="headers-outfit">
        Your Outfit
      </h1>
      <div className="accent-underline-related"></div>
      <OutfitList product={currentProduct} />
    </div>
  );
};

export default RelatedItems;