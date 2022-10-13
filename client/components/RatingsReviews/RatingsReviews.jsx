import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Summary from './Summary.jsx';
import Reviews from './Reviews.jsx';


const RatingsReviews = ({productID}) =>{
  return (
    <div>
      <h1>
        RatingsReviews
      </h1>
      <div>
        <Summary/>
        <Reviews/>
      </div>
    </div>

  );
};

export default RatingsReviews;