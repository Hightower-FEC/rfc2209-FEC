import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Stars from '../Stars.jsx';
import Pointer from '../Pointer.jsx';

const Summary = ({productID, reviews}) => {
  const [averageRating, setAverageRating] = useState();
  const [percentWhoRecommend, setPercentWhoRecommend] = useState();
  const [numOfReviewsByStar, setNumOfReviewsByStar] = useState();
  const [characteristics, setCharacteristics] = useState();

  const minMax = {
    Size: ['A size too small', 'Perfect', 'A size too wide'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Comfort: ['Uncomfortable', 'Perfect'],
    Quality: ['Poor', 'Perfect'],
    Length: ['Runs short', 'Perfect', 'Runs long'],
    Fit: ['Runs tight', 'Perfect', 'Runs long'],

  };

  /**
   *
   */
  useEffect(() => {
    axios.get(`/reviews/meta?product_id=${productID}`)
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
        console.log(response.recommended);
        setAverageRating((Math.round((totalStars / numOfReviews) * 100) / 100).toFixed(1));
        setPercentWhoRecommend((Math.round((response.recommended['true'] / numOfReviews * 100) * 100) / 100).toFixed(0));
        setNumOfReviewsByStar(reviewsByStar);
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

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[4] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div>
            <u>4 stars</u>
            <div style={{position: 'relative',
              width: '100%',
              height: '15px',
              background: '#ddd',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[3] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div>
            <u>3 stars</u>
            <div style={{position: 'relative',
              width: '100%',
              height: '15px',
              background: '#ddd',
              overflow: 'hidden'}}>
              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[2] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div>
            <u>2 stars</u>
            <div style={{position: 'relative',
              width: '100%',
              height: '15px',
              background: '#ddd',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[1] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div>
            <u>1 stars</u>
            <div style={{position: 'relative',
              width: '100%',
              height: '15px',
              background: '#ddd',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[0] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
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