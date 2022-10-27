import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Stars from '../Stars.jsx';
const Review = ({review}) =>{
  const [isHelpful, setisHelpful] = useState(review.helpful);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulness);
  const [isReported, setIsReported] = useState(false);

  /**
   * Not sure why, but if without this, the number of helpful doesn't follow reviews - it just stays at the review index
   * E.g. if we sort by helpful, and most helpful is 14, then sort by newest, it'll say the newest has 14 helpful when it should be 0.
   */
  useEffect(() => {
    setisHelpful(review.helpful);
    setHelpfulCount(review.helpfulness);
  }, [review]);

  /**
   * Report review to API in PUT req and store that report in localStorage
   */
  const handleReportClick = () => {
    axios.put(`/reviews/${review.review_id}/report`)
      .then((response) => {
        if (response.status === 200) {
          setIsReported(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  /**
   * Add review_id to helpful in localStorage and in POST req to API
   */
  const handleHelpfulClick = () => {
    axios.put(`/reviews/${review.review_id}/helpful`)
      .then((response) => {
        if (response.status === 200) {
          setisHelpful(true);
          setHelpfulCount(helpfulCount + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const parseDate = (reviewDate) => {
    reviewDate = new Date(reviewDate);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = reviewDate.getFullYear();
    let date = reviewDate.getDate().toString().padStart(2, '0');
    let month = months[reviewDate.getMonth()];

    return `${month} ${date}, ${year}`;
  };

  const reported = isReported ? <u>Reported</u> : <u onClick={handleReportClick} className="blue-text"> Report </u>;
  const recommended = review.recommend ? <div></div> : null;
  const response = review.response ? <div></div> : null;
  const helpful = isHelpful ? <u> Yes!</u> : <u onClick={handleHelpfulClick} className="blue-text"> Yes </u>;

  return (
    <div style={{padding: '20px', borderBottom: '1px solid rgba(0, 0, 0, 0.4)'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <a className="review-name"><strong style={{marginRight: '10px', fontSize: '18px'}}>{review.reviewer_name}</strong></a>
        {/* **********************We need to fix this!!! Terrible formatting of date********************** */}
      </div>
      <div style={{width: 'fit-content', margin: '0 0 5px 0'}}>
        <Stars size={'18px'} rating={review.rating}/>
      </div>
      <div className="review-date">
        {parseDate(review.date)}
      </div>
      <div className="review-summary">
        {review.summary}
      </div>
      <div className="review-body">
        {review.body}
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <a className="review-options">Helpful? {helpful} ({helpfulCount}) | {reported}</a>
      </div>
    </div>

  );
};

export default Review;