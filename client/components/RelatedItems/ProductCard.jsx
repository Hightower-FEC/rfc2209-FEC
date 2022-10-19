import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { URL } from '../../../config/config.js';
import ComparisonModal from './ComparisonModal.jsx';

const ProductCard = ({product, productA, index, width, handleRelated}) => {
  const [card, setCard] = useState({});
  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/products/${product}`)
      .then((response) => {
        setCard(response.data);
      })
      .then(() => {
        axios.get(`${URL}/products/${product}/styles`)
          .then((response) => {
            setImage(response.data.results[0].photos[0].url);
          });
      })
      .catch(err => console.log(err));
  }, [product]);

  return (
    <>
      <div className="product-card" style={{width: width, transform: `translateX(-${index * 100}%)`, backgroundImage: `url(${image})`}} >
        <div className="upper-half" /*style={{backgroundImage: `url(${image})`}}*/>
          <span id="favorite-related" onClick={() => {
            setShowModal(true);
            const allFeatures = productA.features.concat(card.features);
            setFeatures(allFeatures);
          }}><strong>✩</strong></span>
        </div>
        <div className="bottom-half">
          <div className="category">{card.category}</div>
          <div><strong>{card.name}</strong></div>
          <div className="default-price">{card.default_price}</div>
          <div onClick={() => {
        handleRelated(card.id);
      }}>Stars</div>
        </div>
      </div>
      <ComparisonModal show={showModal} productA={productA} productB={card} features={features} onClose={() => {
        setShowModal(false);
      }}/>
    </>
  );
};

export default ProductCard;