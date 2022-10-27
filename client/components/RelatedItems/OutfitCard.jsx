import React, {useState, useEffect} from 'react';
import axios from 'axios';

const OutfitCard = ({width, outfit, handleAddOutfitClick, handleRemoveOutfitClick, number, index}) => {
  const [image, setImage] = useState(null);
  const [salePrice, setSalePrice] = useState(null);

  useEffect(() => {
    axios.get(`/products/${outfit.id}/styles`)
      .then((response) => {
        setImage(response.data.results[0].photos[0].url);
        setSalePrice(response.data.results[0].sale_price);
      })
      .catch(error => console.log(error));
  }, [outfit]);

  return (
    <>
      <div className="product-card" style={{width: width, backgroundImage: `url(${image})`, transform: `translateX(-${index * 110}%)`}}>
        <div className="upper-half">
          <span id="remove-icon" className="fa-solid fa-trash" onClick={() => {
            handleRemoveOutfitClick(number);
          }}></span>
        </div>
        <div className="bottom-half">
          <div className="category">{outfit.category}</div>
          <div><strong>{outfit.name}</strong></div>
          <div className="default-price">{outfit.default_price}</div>
        </div>
      </div>
    </>
  );
};

export default OutfitCard;