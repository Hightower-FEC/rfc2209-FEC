import React, {useState, useEffect} from 'react';


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
        <a>{review.reviewer_name}, {review.date}</a>
      </div>
      <h4>
        {review.summary}
      </h4>
      <div>
        <p>{review.body}</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        Helpful? Yes ({review.helpfulness}) | Report
      </div>
    </div>

  );
};

export default Review;