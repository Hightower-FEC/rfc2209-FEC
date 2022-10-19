import React, {useState, useEffect} from 'react';
import ProductList from './ProductList.jsx';
import axios from 'axios';
import { URL } from '../../../config/config.js';

const RelatedItems = ({productID, handleRelated}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/products/${productID}/related`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productID]);

  return (
    <div>
      <h1>
        RelatedItems
      </h1>
      <ProductList products={products} handleRelated={handleRelated}/>
    </div>
  );
};

export default RelatedItems;