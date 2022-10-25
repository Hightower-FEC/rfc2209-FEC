import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Star from './Star.jsx';

import { URL } from '../../config/config.js';

const Stars = ({rating, productID, size = '12px'}) => {
  const [percentRating, setPercentRating] = useState();

  const roundRating = (trueRating) => {

    let decimal = trueRating - Math.floor(trueRating);

    let wholeRating = trueRating - decimal;


    // Find nearest quarter rating to round to
    const mid = 0.125;
    const quarters = [0, 0.25, 0.5, 0.75, 1];
    // The actual quarters look kinda strange on render, so these are sort of like, pseudo-quarters that look better when rendered inside the star
    const renderQuarters = [0, .4, .5, .66, 1];
    for (let i = 0; i < quarters.length; i++) {
      if (decimal < (quarters[i] + mid)) {
        setPercentRating((wholeRating + renderQuarters[i]) / .05);
        break;
      }
    }
  };

  useEffect(() => {
    if (productID) {
      axios.get(`/reviews/meta?product_id=${productID}`)
        .then((response) => {
          let numOfRatings = 0;
          let totalRating = 0;
          for (let rating in response.data.ratings) {
            totalRating += rating * Number(response.data.ratings[rating]);
            numOfRatings += Number(response.data.ratings[rating]);
          }
          roundRating((totalRating / numOfRatings));
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (rating) {
      roundRating(rating);
    }
  }, [rating, productID]);




  return percentRating ? (
    <div style={{position: 'relative', height: 'auto', width: 'auto'}}>
      <div style={{display: 'flex', flexDirection: 'rows', width: 'auto', height: `${size}`}}>
        <div style={{position: 'absolute', width: '100%', height: `${size}`, backgroundColor: '#ddd', zIndex: -2}}/>
        <div style={{position: 'absolute', width: `${percentRating}%`, height: `${size}`, backgroundColor: 'black', zIndex: -1}}/>
        <Star/>
        <Star/>
        <Star/>
        <Star/>
        <Star/>

      </div>
    </div>
  ) : <></>;
};

export default Stars;