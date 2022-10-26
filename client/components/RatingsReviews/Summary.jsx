import React, {useState, useEffect} from 'react';

import Stars from '../Stars.jsx';

const Summary = ({productID, reviews}) => {
  const [averageRating, setAverageRating] = useState();
  const [percentWhoRecommend, setPercentWhoRecommend] = useState();
  const [numOfReviewsByStar, setNumOfReviewsByStar] = useState();

  /**
   *
   */
  useEffect(() => {
    let totalStars = 0;
    let recommendations = 0;
    let reviewsByStar = [0, 0, 0, 0, 0];


    for (let i = 0; i < reviews.length; i++) {
      totalStars += reviews[i].rating;
      recommendations += reviews[i].recommend;
      reviewsByStar[reviews[i].rating - 1]++;
    }

    setAverageRating(totalStars / reviews.length);
    setPercentWhoRecommend(recommendations / reviews.length * 100);
    setNumOfReviewsByStar(reviewsByStar);
  }, [productID, reviews]);


  return averageRating ? (
    <div className="summary-container">
      <h2 style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
        {averageRating}
        <div style={{width: 'fit-content', height: '45px', }}>
          <Stars productID={productID} size={'25px'} backgroundColor={'#F1F1F1'}/>
        </div>
      </h2>
      <div style={{fontSize: '14px'}}>
        <div style={{margin: '0 0 10px 0'}}>
          <strong>{percentWhoRecommend}%</strong> of reviews recommend this product
        </div>

        <div className="summary-bars">
          <div className="bar-container">
            <div className="bar-labels">5 stars</div>
            <div style={{position: 'relative',
              width: '80%',
              height: '15px',
              background: 'rgba(0,0,0,0.2)',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[4] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div className="bar-container">
            <div className="bar-labels">4 stars</div>
            <div style={{position: 'relative',
              width: '80%',
              height: '15px',
              background: 'rgba(0,0,0,0.2)',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[3] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div className="bar-container">
            <div className="bar-labels">3 stars</div>
            <div style={{position: 'relative',
              width: '80%',
              height: '15px',
              background: 'rgba(0,0,0,0.2)',
              overflow: 'hidden'}}>
              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[2] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div className="bar-container">
            <div className="bar-labels">2 stars</div>
            <div style={{position: 'relative',
              width: '80%',
              height: '15px',
              background: 'rgba(0,0,0,0.2)',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[1] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
          <div className="bar-container">
            <div className="bar-labels">1 stars</div>
            <div style={{position: 'relative',
              width: '80%',
              height: '15px',
              background: 'rgba(0,0,0,0.2)',
              overflow: 'hidden'}}>

              <span style={{position: 'absolute', background: '#000', width: `${(numOfReviewsByStar[0] / Math.max(...numOfReviewsByStar)) * 100}%`, zIndex: '1', height: '15px'}}></span>
            </div>
          </div>
        </div>

        <div className="summary-characteristics">
          {Object.keys(characteristics).map((characteristic => {
            return (
              <div>
                {console.log(characteristic)}
                <div className="characteristic">{characteristic}</div>
                <div style={{position: 'relative',
                  width: '100%',
                  height: '10px',
                  background: 'rgba(0,0,0,0.2)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'row'}}>

                  <div style={{background: 'rgba(0,0,0,0.2)', width: `${characteristics[characteristic]['value'] / .05}%`, height: '10px'}}/>

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