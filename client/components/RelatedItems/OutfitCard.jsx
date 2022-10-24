import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { URL } from '../../../config/config.js';

const OutfitCard = ({width, outfit, handleAddOutfitClick}) => {
  const [image, setImage] = useState(null);
  const [salePrice, setSalePrice] = useState(null);

  useEffect(() => {
    axios.get(`${URL}/products/${outfit.id}/styles`)
      .then((response) => {
        setImage(response.data.results[0].photos[0].url);
        setSalePrice(response.data.results[0].sale_price);
      })
      .catch(error => console.log(error));
  }, [outfit]);

  return (
    <>
      <div className="product-card" style={{width: width, backgroundImage: `url(${image})`}}>
        <div className="upper-half" /*style={{backgroundImage: `url(${image})`}}*/>
          <span id="favorite-related"><strong>✩</strong></span>
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