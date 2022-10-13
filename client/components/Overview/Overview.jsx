import React from 'react';
import AddCart from './AddCart.jsx';
import ImageGallery from './Image_Gallery/ImageGallery.jsx';
import axios from 'axios';

import { API_KEY, BASE_URL, CAMPUS_CODE } from '../../../config/config.js';
const { useEffect, useState } = React;

const Overview = ({ productID }) => {
  const [currentProductStyles, setCurrentProductStyles] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/products/${productID}/styles`, {
      headers: {
        'Authorization': API_KEY
      }})
      .then((response) => {
        console.log(response.data);
        setCurrentProductStyles(response.data);
        setCurrentStyle(response.data.results[1]);
      })
      .catch((err) => console.log(err));
  }, []);
  if (currentStyle) {
    return (
      <div>
        <h1>
        ProductDetail
        </h1>
        <ImageGallery productStyle={currentStyle}/>
        <AddCart />
      </div>
    );
  }
  return null;
};

export default Overview;