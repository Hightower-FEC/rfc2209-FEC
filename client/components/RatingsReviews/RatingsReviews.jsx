import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Summary from './Summary.jsx';
import Reviews from './Reviews.jsx';

import { URL } from '../../../config/config.js';

const RatingsReviews = ({productID}) =>{
  /**
   * Init reviews as undefined - nothing is rendered unless this state has value
   */
  const [reviews, setReviews] = useState();

  /**
   * On render, try and get reviews using the productID
   */
  useEffect(() => {
    axios.get(`${URL}/reviews?product_id=${productID}`)
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productID]);

  /**
   * Retrieve reviews from API passing a specified sort parameter
   */
  const sortReviews = (sortBy) => {
    axios.get(`${URL}/reviews?product_id=${productID}&sort=${sortBy}`)
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
    <div style={{margin: '0 10rem 0 10rem'}}>
      <h1 style={{margin: '40px 0 10px 0'}}>
        Ratings and Reviews
      </h1>
      <div className="ratings-reviews">
        <Summary productID={productID} reviews={reviews}/>
        <Reviews productID={productID} reviews={reviews} handleSetSort={sortReviews}/>
      </div>
    </div>
  ) : <></>;
};

export default RatingsReviews;