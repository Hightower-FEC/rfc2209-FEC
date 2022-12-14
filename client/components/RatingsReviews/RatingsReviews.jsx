import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Summary from './Summary.jsx';
import Reviews from './Reviews.jsx';

const RatingsReviews = ({currentProduct, reviewMetaData, interactions}) =>{
  /**
   * Only render Ratings and Reviews once we get a product for which we need to render reviews for
   */
  const [reviews, setReviews] = useState();

  /**
   * On render, try and get reviews using the productID
   */
  useEffect(() => {
    axios.get(`reviews?product_id=${currentProduct.id}`)
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentProduct]);

  /**
   * Retrieve reviews from API passing a specified sort parameter
   */
  const sortReviews = (sortBy) => {
    axios.get(`reviews?product_id=${currentProduct.id}&sort=${sortBy}`)
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  /**
   * Only render Ratings and Reviews once we get reviews to render
   */
  return reviews ? (
    <div style={{margin: '0 10rem 0 10rem'}}
      onClick={(e)=>interactions(e, 'RatingsReviews')}>
      <h1 style={{margin: '80px 0 0 0'}}>
        Ratings and Reviews
      </h1>
      <div className="accent-underline-reviews"></div>
      <div className="ratings-reviews">
        <Summary currentProduct={currentProduct} reviewMetaData={reviewMetaData}/>
        <Reviews currentProduct={currentProduct} reviewMetaData={reviewMetaData} reviews={reviews} handleSetSort={sortReviews} interactions={interactions}/>
      </div>
    </div>
  ) : <></>;
};
export default RatingsReviews;