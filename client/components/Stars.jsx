import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { URL } from '../../config/config.js';

const Stars = ({productID}) => {
  const [percentRating, setPercentRating] = useState();

  useEffect(() => {
    axios.get(`${URL}/reviews?product_id=${productID}`)
      .then((response) => {
        let results = response.data.results;
        let sumRatings = 0;
        for (let i = 0; i < results.length; i++) {
          sumRatings += results[i].rating;
          console.log(sumRatings);
        }
        // Take total of ratings sum, divide by number of ratings to get average rating.  Divide average rating by 5 (highest possible rating), then multiple by 100 to get percent.
        setPercentRating((sumRatings / results.length) / .05);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return percentRating ? (
    <h1>
      <div style={{fontSize: 12}}>
        <span>★★★★★</span>
      </div>
    </h1>
  ) : <></>;
};

export default Stars;