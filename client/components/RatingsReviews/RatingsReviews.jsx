import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Summary from './Summary.jsx';
import Reviews from './Reviews.jsx';


const RatingsReviews = ({productID}) =>{
  return (
    <div>
      <h3>
        RatingsReviews
      </h3>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Summary/>
        <Reviews/>
      </div>
    </div>

  );
};

export default RatingsReviews;