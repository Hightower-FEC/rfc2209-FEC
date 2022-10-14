import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { API_KEY, URL } from '../../../config/config.js';

const ProductCard = ({product}) => {
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
            console.log('This is the style data', response.data)
            setImage(response.data.results[0].photos[0].thumbnail_url);
          })
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="product-card">
      <img className="thumbnails" src={image}></img>
      <div className="category">{card.category}</div>
      <div><strong>{card.name}</strong></div>
      <div className="default-price">{card.default_price}</div>
      <div>Stars</div>
    </div>
  );
};

export default ProductCard;