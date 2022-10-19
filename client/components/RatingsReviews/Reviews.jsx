import React, {useState, useEffect} from 'react';
import Review from './Review.jsx';
import axios from 'axios';

const Reviews = ({productID, reviews}) =>{
  const [sortedBy, setSortedBy] = useState('relevance');
  const [renderedReviews, setRenderedReviews] = useState(reviews.slice(0, 2));
  const sorts = ['newest', 'helpfulness', 'relevance'];

  useEffect(() => {
    // Call drilled func
  }, [sortedBy]);


  return (
    <div>
      {/* Header */}
      <h4>
        {reviews.length} reviews, sorted by
        <select>
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
        <button>More Reviews</button>
        <button>Add a review +</button>
      </div>
    </div>

  );
};

export default Reviews;