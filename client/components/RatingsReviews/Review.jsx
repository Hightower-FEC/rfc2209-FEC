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

  const reported = isReported ? <u>Reported</u> : <u onClick={handleReportClick}> Report </u>;
  const recommended = review.recommend ? <div></div> : null;
  const response = review.response ? <div></div> : null;
  const helpful = isHelpful ? <u> Yes!</u> : <u onClick={handleHelpfulClick}> Yes </u>;

  return (
    <div style={{padding: '20px', borderBottom: 'solid'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Stars rating={review.rating}/>
        {/* **********************We need to fix this!!! Terrible formatting of date********************** */}
        <a>{review.reviewer_name}, {parseDate(review.date)}</a>
      </div>
      <h4>
        {review.summary}
      </h4>
      <div>
        <p>{review.body}</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <a>Helpful? {helpful} ({helpfulCount}) | {reported}</a>
      </div>
    </div>

  );
};

export default Review;