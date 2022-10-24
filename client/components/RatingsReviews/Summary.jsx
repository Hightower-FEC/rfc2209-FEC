import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Stars from '../Stars.jsx';
import Pointer from '../Pointer.jsx';

const Summary = ({productID, reviews}) => {
  const [averageRating, setAverageRating] = useState();
  const [percentWhoRecommend, setPercentWhoRecommend] = useState();
  const [numOfReviewsByStar, setNumOfReviewsByStar] = useState();
  const [numOfRatings, setNumOfRatings] = useState();
  const [characteristics, setCharacteristics] = useState();

  const minMax = {
    Size: ['A size too small', 'Perfect', 'A size too wide'],
    'Width': ['Too narrow', 'Perfect', 'Too wide'],
    'Comfort': ['Uncomfortable', 'Perfect'],
    'Quality': ['Poor', 'Perfect'],
    'Length': ['Runs short', 'Perfect', 'Runs long'],
    'Fit': ['Runs tight', 'Perfect', 'Runs long'],

  };

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
        setCharacteristics(response.characteristics);
      });
  }, [productID, reviews]);


  return averageRating ? (
    <div style={{width: '50%'}}>
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
          {Object.keys(characteristics).map((characteristic => {
            return (
              <div>
                {console.log(characteristic)}
                <div>{characteristic}</div>
                <div style={{position: 'relative',
                  width: '100%',
                  height: '10px',
                  background: '#ddd',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'row'}}>

                  <div style={{background: '#ddd', width: `${characteristics[characteristic]['value'] / .05}%`, height: '10px'}}/>

                  <div style={{position: 'relative', width: '16px', height: '16px', marginLeft: '-8px'}}><Pointer/></div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  {console.log(minMax.characteristic)}
                  {minMax[characteristic].map((desc) => {
                    return (
                      <span>{desc}</span>
                    );
                  })}
                </div>

              </div>
            );
          }))}

        </div>
      </div>
    </div>

  ) : <></>;
};

export default Summary;