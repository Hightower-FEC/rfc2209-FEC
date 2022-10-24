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
    for (let i = 0; i < quarters.length; i++) {
      if (decimal < (quarters[i] + mid)) {
        setPercentRating((wholeRating + quarters[i]) / .05);
        break;
      }
    }
  };

  useEffect(() => {
    if (productID) {
      axios.get(`/reviews?product_id=${productID}`)
        .then((response) => {
          let results = response.data.results;
          let sumRatings = 0;
          for (let i = 0; i < results.length; i++) {
            sumRatings += results[i].rating;
          }
          // Take total of ratings sum, divide by number of ratings to get average rating.  Divide average rating by 5 (highest possible rating), then multiple by 100 to get percent.

          roundRating((sumRatings / results.length));
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
      {/* {console.log(percentRating)} */}
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