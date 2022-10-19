import React, {useState, useEffect} from 'react';
import Review from './Review.jsx';
import axios from 'axios';

const Reviews = ({productID, reviews, handleSetSort}) =>{
  const [sortedBy, setSortedBy] = useState('relevance');
  const [renderedReviews, setRenderedReviews] = useState(reviews.slice(0, 2));
  const sorts = ['relevance', 'helpfulness', 'newest'];

  useEffect(() => {
    handleSetSort(sortedBy);
    setRenderedReviews([...reviews.slice(0, renderedReviews.length)]);
  }, [sortedBy]);



  /**
   * Sets the renderedReviews to be currently renderedReviews, plus the next two reviews from our passed reviews (and using slice insures that if there is only one more review, there are no bad side effects)
   */
  const handleMoreReviewsClick = () => {
    setRenderedReviews([...renderedReviews, ...reviews.slice(renderedReviews.length, renderedReviews.length + 2)]);
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

  return (
    <div>
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
      <div>
        {moreReviews}
        <button onClick={handleAddReviewClick}>Add a review +</button>
      </div>
    </div>

  );
};

export default Reviews;