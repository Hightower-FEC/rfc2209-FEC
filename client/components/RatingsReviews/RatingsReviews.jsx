import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Summary from './Summary.jsx';
import Reviews from './Reviews.jsx';

import { URL } from '../../../config/config.js';

const RatingsReviews = ({productID}) =>{
  /**
   * Only render Ratings and Reviews once we get a product for which we need to render reviews for
   */
  return productID ? (
    <div>
      <h3>
        RatingsReviews
      </h3>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Summary productID={productID}/>
        <Reviews productID={productID} />
      </div>
    </div>
  ) : <></>;
};
export default RatingsReviews;