import React, {useState} from 'react';

const OutfitCard = ({width, outfit, handleAddOutfitClick}) => {

  return (
    <>
      <div className="product-card" style={{width: width}}>
        <div className="category">{outfit.category}</div>
        <div><strong>{outfit.name}</strong></div>
        <div className="default-price">{outfit.default_price}</div>
      </div>
      {/* <div className="product-card" style={{width: width}}>
        <div className="plus-container">
          <img src="assets/blueplus.webp" alt="plus symbol" className="plus-symbol" onClick={() => {
            const newOutfit = [product];
            handleAddOutfitClick(newOutfit);
          }}></img>
        </div>
      </div> */}
    </>
  );
};

export default OutfitCard;