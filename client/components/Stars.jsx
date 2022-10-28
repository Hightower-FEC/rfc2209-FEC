import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Star from './Star.jsx';

const Stars = ({backgroundColor, rating, reviewMetaData, size = '12px', needsBackground, color}) => {
  const [percentRating, setPercentRating] = useState();

  needsBackground = needsBackground || false;

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
    if (reviewMetaData) {
      let numOfRatings = 0;
      let totalRating = 0;

      for (let rating in reviewMetaData.ratings) {
        totalRating += rating * Number(reviewMetaData.ratings[rating]);
        numOfRatings += Number(reviewMetaData.ratings[rating]);
      }
      roundRating((totalRating / numOfRatings));

    } else if (rating) {
      roundRating(rating);
    }
  }, [rating, reviewMetaData]);




  return percentRating ? (
    needsBackground ? (
      <div style={{position: 'relative', width: 'fit-content', height: `${size}`}}>
        <div className="stars-optional-bg" style={{position: 'absolute', padding: '10px', zIndex: -4, height: `${size}`, width: '125px', borderRadius: '10px'}}>
        </div>
        <div style={{position: 'absolute', height: 'auto', width: 'auto'}}>
          {/* {console.log(percentRating)} */}
          <div style={{display: 'flex', position: 'absolute', flexDirection: 'rows', width: 'auto', height: `${size}`, top: '10px', left: '10px'}}>
            <div className="stars-default" style={{position: 'absolute', width: 'fit-content', height: `${size}`, zIndex: -2}}/>
            <div className="star-percent" style={{position: 'absolute', width: `${percentRating}%`, height: `${size}`, zIndex: -1}}/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
          </div>
        </div>

      </div>
    )
      :
      <div style={{position: 'relative', height: 'auto', width: 'auto'}}>
        {/* {console.log(percentRating)} */}
        <div style={{display: 'flex', flexDirection: 'rows', width: 'auto', height: `${size}`}}>
          <div className="stars-default" style={{position: 'absolute', width: '100%', height: `${size}`, zIndex: -2}}/>
          <div className="star-percent" style={{position: 'absolute', width: `${percentRating}%`, height: `${size}`, zIndex: -1}}/>
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