import React, {useState, useEffect} from 'react';
import Review from './Review.jsx';
import axios from 'axios';

const Reviews = ({productID}) =>{

  return (
    <div>
      <h4>
        248 reviews, sorted by relevance
      </h4>
      <div>
        <Review productID={productID}/>
      </div>
    </div>

  );
};

export default Reviews;