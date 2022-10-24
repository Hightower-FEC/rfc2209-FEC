import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Stars from '../Stars.jsx';

const Summary = ({productID, reviews}) => {
  const [averageRating, setAverageRating] = useState();
  const [percentWhoRecommend, setPercentWhoRecommend] = useState();
  const [numOfReviewsByStar, setNumOfReviewsByStar] = useState();
  const [numOfRatings, setNumOfRatings] = useState();


  /**
   *
   */
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews/meta?product_id=${productID}`)
      .then((response) => {
        console.log(response.data);
        response = response.data;
        let numOfReviews = Number(response.recommended['true']) + Number(response.recommended['false']);
        let reviewsByStar = [0, 0, 0, 0, 0];
        let totalStars = 0;
        for (let rating in response.ratings) {
          totalStars += Number(rating) * response.ratings[rating];
          reviewsByStar[rating - 1] = response.ratings[rating];
        }

        setAverageRating((Math.round((totalStars / numOfRatings) * 100) / 100).toFixed(1));
        setPercentWhoRecommend((Math.round((response.recommended['true'] / numOfRatings * 100) * 100) / 100).toFixed(0));
        setNumOfReviewsByStar(reviewsByStar);
        setNumOfRatings(numOfReviews);
      });
  }, [productID, reviews]);


  return averageRating ? (
    <div>
      <h1 style={{display: 'flex', flexDirection: 'row'}}>
        {averageRating} <Stars productID={productID}/>
      </h1>
      <div>
        <div>
          {percentWhoRecommend}% of reviews recommend this product
        </div>

        <div>
          <div>
            <u>5 stars</u>
            <div style={{position: 'relative',
              width: '100%',
              height: '15px',
              background: '#ddd',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[4] / numOfRatings) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div>
            <u>4 stars</u>
            <div style={{position: 'relative',
              width: '100%',
              height: '15px',
              background: '#ddd',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[3] / numOfRatings) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div>
            <u>3 stars</u>
            <div style={{position: 'relative',
              width: '100%',
              height: '15px',
              background: '#ddd',
              overflow: 'hidden'}}>
              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[2] / numOfRatings) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div>
            <u>2 stars</u>
            <div style={{position: 'relative',
              width: '100%',
              height: '15px',
              background: '#ddd',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[1] / numOfRatings) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div>
            <u>1 stars</u>
            <div style={{position: 'relative',
              width: '100%',
              height: '15px',
              background: '#ddd',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[0] / numOfRatings) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <a>Size</a>
            </div>
            <a>-----------</a>
          </div>
          <div>
            <div>
              <a>Comfort</a>
            </div>
            <a>-----------</a>
          </div>
        </div>
      </div>
    </div>

  ) : <></>;
};

export default Summary;