import React, {useState, useEffect} from 'react';

import axios from 'axios';

import Stars from '../Stars.jsx';
import Pointer from '../Pointer.jsx';

const Summary = ({currentProduct, reviewMetaData}) => {
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
    axios.get(`/reviews/meta?product_id=${currentProduct.id}`)
      .then((response) => {
        response = response.data;
        let numOfReviews = Number(response.recommended['true']) + Number(response.recommended['false']);
        let reviewsByStar = [0, 0, 0, 0, 0];
        let totalStars = 0;
        for (let rating in response.ratings) {
          totalStars += Number(rating) * response.ratings[rating];
          reviewsByStar[rating - 1] = response.ratings[rating];
        }
        setAverageRating((Math.round((totalStars / numOfReviews) * 100) / 100).toFixed(1));
        setPercentWhoRecommend((Math.round((response.recommended['true'] / numOfReviews * 100) * 100) / 100).toFixed(0));
        setNumOfReviewsByStar(reviewsByStar);
        setCharacteristics(response.characteristics);
      });
  }, [currentProduct]);


  return averageRating ? (
    <div className="summary-container">
      <div style={{display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '20px'}}>
        <div style={{fontSize: '32px', fontWeight: 'bold', marginTop: '3px'}}>{averageRating}</div>
        <div style={{width: 'fit-content', height: '45px', }}>
          <Stars reviewMetaData={reviewMetaData} size={'25px'} needsBackground={true}/>
        </div>
      </div>
      <div style={{fontSize: '14px'}}>
        <div style={{margin: '0 0 10px 0'}}>
          <strong>{percentWhoRecommend}%</strong> of reviews recommend this product
        </div>

        <div className="summary-bars">
          <div className="bar-container">
            <div className="bar-labels">5 stars</div>
            <div className="percent-bars-bg" style={{position: 'relative',
              width: '80%',
              height: '15px',
              overflow: 'hidden'}}>

              <span className="percent-bars" style={{position: 'absolute', width: `${(numOfReviewsByStar[4] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div className="bar-container">
            <div className="bar-labels">4 stars</div>
            <div className="percent-bars-bg" style={{position: 'relative',
              width: '80%',
              height: '15px',
              overflow: 'hidden'}}>

              <span className="percent-bars" style={{position: 'absolute', width: `${(numOfReviewsByStar[3] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div className="bar-container">
            <div className="bar-labels">3 stars</div>
            <div className="percent-bars-bg" style={{position: 'relative',
              width: '80%',
              height: '15px',
              overflow: 'hidden'}}>
              <span className="percent-bars" style={{position: 'absolute', width: `${(numOfReviewsByStar[2] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div className="bar-container">
            <div className="bar-labels">2 stars</div>
            <div className="percent-bars-bg" style={{position: 'relative',
              width: '80%',
              height: '15px',
              overflow: 'hidden'}}>

              <span className="percent-bars" style={{position: 'absolute', width: `${(numOfReviewsByStar[1] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div className="bar-container">
            <div className="bar-labels">1 stars</div>
            <div className="percent-bars-bg" style={{position: 'relative',
              width: '80%',
              height: '15px',
              overflow: 'hidden'}}>

              <span className="percent-bars" style={{position: 'absolute', width: `${(numOfReviewsByStar[0] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
        </div>

        <div className="summary-characteristics">
          {Object.keys(characteristics).map((characteristic => {
            return (
              <div>
                <div className="characteristic">{characteristic}</div>
                <div className="percent-bars-bg" style={{position: 'relative',
                  width: '100%',
                  height: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'row'}}>

                  <div className="percent-bars" style={{ width: `${characteristics[characteristic]['value'] / .05}%`, height: '10px'}}/>

                  <div style={{position: 'relative', width: '16px', height: '16px', marginLeft: '-8px'}}><Pointer/></div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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