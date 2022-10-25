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
            <a>5 stars</a><a>{numOfReviewsByStar[4]}</a>
          </div>
          <div>
            <a>4 stars</a><a>{numOfReviewsByStar[3]}</a>
          </div>
          <div>
            <a>3 stars</a><a>{numOfReviewsByStar[2]}</a>
          </div>
          <div>
            <a>2 stars</a><a>{numOfReviewsByStar[1]}</a>
          </div>
          <div>
            <a>1 stars</a><a>{numOfReviewsByStar[0]}</a>
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