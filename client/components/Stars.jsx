import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Star from './Star.jsx';

import { URL } from '../../config/config.js';

const Stars = ({productID, size}) => {
  size = size || '12px';
  const [percentRating, setPercentRating] = useState();

  useEffect(() => {
    axios.get(`${URL}/reviews?product_id=${productID}`)
      .then((response) => {
        let results = response.data.results;
        let sumRatings = 0;
        for (let i = 0; i < results.length; i++) {
          sumRatings += results[i].rating;
        }
        // Take total of ratings sum, divide by number of ratings to get average rating.  Divide average rating by 5 (highest possible rating), then multiple by 100 to get percent.
        setPercentRating((sumRatings / results.length) / .05);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return percentRating ? (
    <div style={{position: 'relative', height: 'auto', width: 'auto'}}>
      <div style={{display: 'flex', flexDirection: 'rows', width: 'auto', height: `${size}`}}>
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