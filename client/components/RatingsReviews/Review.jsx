import React, {useState, useEffect} from 'react';

import Stars from '../Stars.jsx';
const Review = ({productID, review}) =>{
  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Stars productID={productID}/>
        <a>{review.reviewer_name}, {review.date}</a>
      </div>
      <h4>
        {review.body}
      </h4>
      <div>
        <p>{review.summary}</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        Helpful? Yes ({review.helpfulness}) | Report
      </div>
    </div>

  );
};

export default Review;