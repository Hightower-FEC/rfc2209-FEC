import React from 'react';
import AddCart from './AddCart.jsx';
import ImageGallery from './Image_Gallery/ImageGallery.jsx';
import axios from 'axios';

import { API_KEY, BASE_URL, CAMPUS_CODE } from '../../../config/config.js';
const { useEffect } = React;

const Overview = ({ product }) => {

  useEffect(() => {
    axios.get(`${BASE_URL}/${CAMPUS_CODE}/products/${product}`, {
      headers: {
        'Authorization': API_KEY
      }});
  });
  return (
    <div>
      <h1>
      ProductDetail
      </h1>
      <ImageGallery />
      <AddCart />
    </div>
  );
};

export default Overview;