import React, {useState, useEffect} from 'react';
import OutfitCard from './OutfitCard.jsx';

const OutfitList = ({product}) => {
  const [index, setIndex] = useState(0);
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem('Atelier Outfit Creation List');
    if (data !== null) {
      setOutfits(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Atelier Outfit Creation List', JSON.stringify(outfits));
  }, [outfits]);

  const updateIndex = (index) => {
    if (index < 0) {
      index = outfits.length - 1;
    } else if (index > outfits) {
      index = 0;
    }
    setIndex(index);
  };

  const addOutfit = (item) => {
    if (outfits.filter(outfit => outfit.id === item.id).length === 0) {
      let newItem = [item];
      const outfitCollection = outfits.concat(newItem);
      setOutfits(outfitCollection);
    }
  };

  const removeOutfit = (index) => {
    let outfitCollection = outfits.slice();
    outfitCollection.splice(index, 1);
    setOutfits(outfitCollection);
  };

  return (
    <div className="carousel">
      <div className="carousel-outfit">
        {outfits.length > 0 ? outfits.map((outfit, key) => {
          return <OutfitCard outfit={outfit} index={index} handleRemoveOutfitClick={removeOutfit} number={key} width={'300px'} />;
        }) : <div className="product-card" style={{width: '300px', transform: `translateX(-${index * 110}%)`}}>
          <div className="plus-container">
            <i id="plus-icon" className="fa-solid fa-heart-circle-plus fa-5x" onClick={() => {
              addOutfit(product);
            }}></i>
          </div>
          <div className="add-container">
            <button id="add-button">Add to Outfit</button>
          </div>
        </div>}
        {outfits.length > 0 ? <div className="plus-card" style={{width: '300px', transform: `translateX(-${index * 110}%)`}}>
          <div className="plus-container">
            <i id="plus-icon" className="fa-solid fa-heart-circle-plus fa-5x" onClick={() => {
              addOutfit(product);
            }}></i>
          </div>
          <div className="add-container">
            <button id="add-button">Add to Outfit</button>
          </div>
        </div> : null}
      </div>
      {index > 0 ? <div className="indicators"><div className="leftArrow" onClick={() => {
        updateIndex(index - 1);
      }}>
          ‹
      </div></div> : null}
      {outfits.length > 3 && index < outfits.length - 3 ? <div className="indicators"><div className="rightArrow" onClick={() => {
        updateIndex(index + 1);
      }}>
          ›
      </div></div> : null}
    </div>
  );
};

export default OutfitList;