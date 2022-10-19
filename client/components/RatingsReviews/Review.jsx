import React, {useState, useEffect} from 'react';

import { formatDistanceToNow, parseISO } from "date-fns";


import Stars from '../Stars.jsx';
const Review = ({productID, review}) =>{
  /**
   * I think I will need to use local storage for this...
   */
  const [helpful, setHelpful] = useState();

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Stars productID={productID}/>
        {/* **********************We need to fix this!!! Terrible formatting of date********************** */}
        <a>{review.reviewer_name}, {new Date(review.date).toUTCString().split(',')[1].split('00:')[0]}</a>
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