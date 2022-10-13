import React, {useState, useEffect} from 'react';
import ProductList from './ProductList.jsx';
import axios from 'axios';
import { API_KEY, URL } from '../../../config/config.js';

const RelatedItems = ({productID}) => {
  console.log(productID);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/products/${productID}/related`)
      .then((response) => {
        console.log('This is the response', response);
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
      <ProductList products={products}/>
    </div>
  );
};

export default RelatedItems;