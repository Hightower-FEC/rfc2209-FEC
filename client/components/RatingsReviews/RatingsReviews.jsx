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
    console.log('reset');
    axios.get(`${URL}/reviews?product_id=${productID}`)
      .then((response) => {
        //console.log(response.data);
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /**
   * Retrieve reviews from API passing a specified sort parameter
   */
  const sortReviews = (sortBy) => {
    axios.get(`${URL}/reviews?product_id=${productID}&sort=${sortBy}`)
      .then((response) => {
        console.log('change:', response.data.results);
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
    <div>
      <h3>
        RatingsReviews
      </h3>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Summary productID={productID} reviews={reviews}/>
        <Reviews productID={productID} reviews={reviews} handleSetSort={sortReviews}/>
      </div>
    </div>
  ) : <></>;
};

export default RatingsReviews;