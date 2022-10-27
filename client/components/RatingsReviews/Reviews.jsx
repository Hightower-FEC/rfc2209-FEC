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
  const [name, setName] = useState();

  /**
   * On render, try and get reviews using the productID
   */
  useEffect(() => {
    axios.get(`/reviews?product_id=${productID}`)
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/products?product_id=${productID}`)
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [productID]);

  useEffect(() => {
    axios.get(`reviews?product_id=${productID}&sort=${sortedBy}`)
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sortedBy]);

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
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

      <PostReviewModal showModal={showModal} onClose={handleCloseModal} name={name} submitReview={()=>{}}/>
    </div>

  ) : <></>;
};

export default Reviews;