import React, {useState, useEffect} from 'react';
import ProductList from './ProductList.jsx';
import axios from 'axios';
import { API_KEY, URL } from '../../../config/config.js';

<<<<<<< HEAD
const RelatedItems = () =>{
  return (
    <h1>
      RelatedItems
    </h1>
  );
};

=======
const RelatedItems = ({productID}) => {
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
      <ProductList products={products}/>
    </div>
  );
};

>>>>>>> 49e5923a28ea75c259eddb2a9490ef42229a1d68
export default RelatedItems;