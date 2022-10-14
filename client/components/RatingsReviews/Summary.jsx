import React, {useState, useEffect} from 'react';

import Stars from '../Stars.jsx';

const Summary = ({productID}) =>{
  return (
    <div>
      <h1 style={{display: 'flex', flexDirection: 'row'}}>
        3.5 <Stars productID={productID}/>
      </h1>
      <div>
        <div>
          100% of reviews recommend this product
        </div>

        <div>
          <div>
            <a>5 stars</a><a>-----</a>
          </div>
          <div>
            <a>4 stars</a><a>-----</a>
          </div>
          <div>
            <a>3 stars</a><a>-----</a>
          </div>
          <div>
            <a>2 stars</a><a>-----</a>
          </div>
          <div>
            <a>1 stars</a><a>-----</a>
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

  );
};

export default Summary;