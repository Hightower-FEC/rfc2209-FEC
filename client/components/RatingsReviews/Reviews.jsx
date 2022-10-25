import React, {useState, useEffect} from 'react';
import Review from './Review.jsx';
import axios from 'axios';

import PostReviewModal from './PostReviewModal.jsx';

const Reviews = ({productID, handleSetSort}) =>{
  /**
   * Init reviews as undefined - nothing is rendered unless this state has value
   */
  const [reviews, setReviews] = useState();
  const [sortedBy, setSortedBy] = useState('relevance');
  const [numofReviewsToRender, setNumofReviewsToRender] = useState(2);
  const sorts = ['relevance', 'helpfulness', 'newest'];
  const [showModal, setShowModal] = useState(false);

  /**
   * On render, try and get reviews using the productID
   */
  useEffect(() => {
    axios.get(`reviews?product_id=${productID}`)
      .then((response) => {
        axios.get(`reviews?product_id=${productID}&sort=${sortBy}`)
          .then((response) => {
            setReviews(response.data.results);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productID]);

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

  const handleCloseModal = () => {
    console.log('Later');
  };

  const renderedReviews = reviews ? reviews.slice(0, numofReviewsToRender) : null;


  /**
   * Handles whether More Reviews button is rendered or not
   * So long as there are more reviews to render, then it will render
   */
  const moreReviews = renderedReviews && renderedReviews.length < reviews.length ? <button onClick={handleMoreReviewsClick}>More Reviews</button> : null;

  return renderedReviews ? (
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
      <div style={{padding: '20px'}}>
        {moreReviews}
        <button onClick={handleAddReviewClick}>Add a review +</button>
      </div>

      <PostReviewModal/>
    </div>

  ) : <></>;
};

export default Reviews;