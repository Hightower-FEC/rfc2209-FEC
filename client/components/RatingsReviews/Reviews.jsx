import React, {useState, useEffect} from 'react';
import Review from './Review.jsx';
import axios from 'axios';

const Reviews = ({productID, reviews, handleSetSort}) =>{
  const [sortedBy, setSortedBy] = useState('relevance');
  const [numofReviewsToRender, setNumofReviewsToRender] = useState(2);
  const sorts = ['relevance', 'helpfulness', 'newest'];

  useEffect(() => {
    handleSetSort(sortedBy);
  }, [sortedBy]);

  const renderedReviews = reviews.slice(0, numofReviewsToRender);


  /**
   * Increments number of reviews to render
   */
  const handleMoreReviewsClick = () => {
    setNumofReviewsToRender(numofReviewsToRender + 2);
  };

  /**
   * Provides a pop-up modal for posting a review to API (NOT YET IMPLEMENTED)
   */
  const handleAddReviewClick = () => {
    console.log('Add a review clicked');
  };

  /**
   * Handles whether More Reviews button is rendered or not
   * So long as there are more reviews to render, then it will render
   */
  const moreReviews = renderedReviews.length < reviews.length ? <button onClick={handleMoreReviewsClick}>More Reviews</button> : null;

  return renderedReviews ? (
    <div className="reviews-container">
      {/* Header */}
      <h4>
        {reviews.length} reviews, sorted by
        <select onChange={(event) => {
          setSortedBy(event.target.value);
        }}>
          {sorts.map((sort, index) => {
            return (
              <option value={sort}>{sort}</option>
            );
          })}
        </select>
      </h4>
      {/* Map reviews */}
      <div>
        {renderedReviews.map((review) => {
          return (
            <Review productID={productID} review={review}/>
          );
        })}
      </div>

      {/* Buttons for adding or loading reviews */}
      <div style={{padding: '20px'}}>
        {moreReviews}
        <button onClick={handleAddReviewClick}>Add a review +</button>
      </div>
    </div>

  ) : <></>;
};

export default Reviews;