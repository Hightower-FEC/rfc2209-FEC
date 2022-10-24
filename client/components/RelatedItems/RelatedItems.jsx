import React, {useState, useEffect} from 'react';
import ProductList from './ProductList.jsx';
import OutfitList from './OutfitList.jsx';
import axios from 'axios';
import { URL } from '../../../config/config.js';

const RelatedItems = ({productID, handleRelatedItemClick}) => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    axios.get(`${URL}/products/${productID}/related`)
      .then((response) => {
        setProducts(response.data);
      })
      .then(() => {
        axios.get(`${URL}/products/${productID}`)
          .then((response) => {
            setCurrentProduct(response.data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productID]);

  return (
    <div>
      <h1 style={{margin: '0 0 0 138px', fontSize: '40px'}}>
        Related Items
      </h1>
      <ProductList products={products} productA={currentProduct} handleRelatedItemClick={handleRelatedItemClick} />
      <h1>
        Your Outfit
      </h1>
      <OutfitList product={currentProduct} />
    </div>
  );
};

export default RelatedItems;