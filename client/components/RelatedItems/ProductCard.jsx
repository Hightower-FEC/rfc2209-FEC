import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { URL } from '../../../config/config.js';

const ProductCard = ({product, index, width}) => {
  const [card, setCard] = useState({});
  const [image, setImage] = useState();

  useEffect(() => {
    axios.get(`${URL}/products/${product}`)
      .then((response) => {
        setCard(response.data);
      })
      .then(() => {
        axios.get(`${URL}/products/${product}/styles`)
          .then((response) => {
            setImage(response.data.results[0].photos[0].thumbnail_url);
          });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="product-card" style={{width: width, transform: `translateX(-${index * 100}%)`}}>
      <span id="favorite-related">✩</span>
      <img className="related-thumbnails" src={image}></img>
      <div className="category">{card.category}</div>
      <div><strong>{card.name}</strong></div>
      <div className="default-price">{card.default_price}</div>
      <div>Stars</div>
    </div>
  );
};

export default ProductCard;