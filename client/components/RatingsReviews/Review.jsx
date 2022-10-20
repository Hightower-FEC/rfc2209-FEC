import React, {useState, useEffect} from 'react';


import Stars from '../Stars.jsx';
const Review = ({productID, review}) =>{
  /**
   * I think I will need to use local storage for this...
   */
  const [helpful, setHelpful] = useState();


  const recommended = review.recommend ? <div></div> : null;
  const response = review.response ? <div></div> : null;
  return (
    <div style={{padding: '20px', borderBottom: 'solid'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Stars rating={review.rating}/>
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
        <a>Helpful? <u onClick={()=>{console.log('yes');}}> Yes</u> ({review.helpfulness}) | <u onClick={()=>{console.log('report');}}> Report </u></a>
      </div>
    </div>

  );
};

export default Review;