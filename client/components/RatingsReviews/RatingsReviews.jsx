import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Summary from './Summary.jsx';
import Reviews from './Reviews.jsx';

import { URL } from '../../../config/config.js';

const RatingsReviews = ({productID}) =>{

  useEffect(() => {
    axios.get(`${URL}/reviews?product_id=${productID}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3>
        RatingsReviews
      </h3>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Summary productID={productID}/>
        <Reviews productID={productID}/>
      </div>
    </div>

  );
};

export default RatingsReviews;