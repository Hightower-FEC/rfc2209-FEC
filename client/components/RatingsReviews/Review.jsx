import React, {useState, useEffect} from 'react';


import Stars from '../Stars.jsx';
const Review = ({productID, review}) =>{
  /**
   * Add review_id to helpful in localStorage and in POST req to API
   */
  const handleHelpfulClick = () => {
    if (!localStorage.helpful) {
      localStorage.helpful = [];
    }
    // Post
    // .then(() => {
    //    localStorage.helpful.push(productID);
    //  });
    console.log(localStorage.helpful);
    localStorage.helpful.push(review.review_id);


  };

  /**
   * Report review to API in PUT req and store that report in localStorage
   */
  const handleReportClick = () => {
    console.log('report');
  };

  const recommended = review.recommend ? <div></div> : null;
  const response = review.response ? <div></div> : null;
  const helpful = !localStorage.helpful || localStorage.helpful.indexOf(review.review_id) === -1 ? <u onClick={handleHelpfulClick}> Yes</u> : <u> Yes</u>;
  const reported = !localStorage.reported || localStorage.reported.indexOf(review.review_id) === -1 ? <u onClick={handleReportClick}> Report </u> : <u> Reported </u>;

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
        <a>Helpful? {helpful} ({review.helpfulness}) | {reported}</a>
      </div>
    </div>

  );
};

export default Review;