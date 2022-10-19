import React, {useState, useEffect} from 'react';
import ProductList from './ProductList.jsx';
import axios from 'axios';
import { API_KEY, URL } from '../../../config/config.js';

const RelatedItems = ({productID, handleRelatedItemClick}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/products/${productID}/related`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>
        RelatedItems
      </h1>
      <ProductList handleRelatedItemClick={handleRelatedItemClick} products={products}/>
    </div>
  );
};

export default RelatedItems;