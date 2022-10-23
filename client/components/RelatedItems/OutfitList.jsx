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
    console.log('inside of update index', outfits.length);
    if (index < 0) {
      index = outfits.length - 1;
    } else if (index > outfits) {
      index = 0;
    }
    setIndex(index);
  };

  const addOutfit = (item) => {
    let newItem = [];
    newItem.push(item);
    const outfitCollection = outfits.concat(newItem);
    setOutfits(outfitCollection);
  };

  return (
    <div className="carousel">
      <div className="carousel-outfit">
        {outfits.length > 0 ? outfits.map((outfit, key) => {
          return <OutfitCard outfit={outfit} index={index} key={key} width={'25%'} />;
        }) : null}
        <div className="product-card" style={{width: '25%'}}>
          <div className="plus-container">
            <img src="assets/blueplus.webp" alt="plus symbol" className="plus-symbol" onClick={() => {
              addOutfit(product);
            }}></img>
          </div>
        </div>
      </div>
      {index > 0 ? <div className="indicators"><div className="leftArrow" onClick={() => {
        updateIndex(index - 1);
      }}>
          ‹
      </div></div> : null}
      {index < outfits.length ? <div className="indicators"><div className="rightArrow" onClick={() => {
        updateIndex(index + 1);
      }}>
          ›
      </div></div> : null}
    </div>
  );
};

export default OutfitList;