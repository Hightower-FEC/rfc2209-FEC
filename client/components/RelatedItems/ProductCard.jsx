import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ComparisonModal from './ComparisonModal.jsx';
import Stars from '../Stars.jsx';


const ProductCard = ({product, currentProduct, index, width, handleRelatedItemClick}) => {
  const [relatedProduct, setRelatedProduct] = useState({});
  const [image, setImage] = useState(currentProduct);
  const [salePrice, setSalePrice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios.get(`/products/${product}`)
      .then((response) => {
        setRelatedProduct(response.data);
      })
      .then(() => {
        axios.get(`/products/${product}/styles`)
          .then((response) => {
            setImage(response.data.results[0].photos[0].url);
            setSalePrice(response.data.results[0].sale_price);
          });
      })
      .catch(err => console.log(err));
  }, [product]);

  const combineFeatures = (product1, product2) => {
    let repeatedFeatures = {};
    let combinedFeatures = [];
    for (let i = 0; i < product1.length; i++) {
      if (!product1[i].value) {
        continue;
      }
      repeatedFeatures[product1[i].feature] = product1[i].value;
      combinedFeatures.push(product1[i]);
    }
    for (let i = 0; i < product2.length; i++) {
      if (!product2[i].value) {
        continue;
      }
      if (product2[i].value === repeatedFeatures[product2[i].feature]) {
        continue;
      }
      combinedFeatures.push(product2[i]);
    }
    return combinedFeatures;
  };

  return (

    <>
      <div className="product-card" style={{width: width, transform: `translateX(-${index * 110}%)`, backgroundImage: `url(${image})`}} onClick={() => {
        handleRelatedItemClick(relatedProduct);
        window.scrollTo({top: 20, behavior: 'smooth'});
      }}>
        <div className="upper-half">
          <span id="favorite-related" className="fa-solid fa-star" onClick={(event) => {
            event.stopPropagation();
            setShowModal(true);
            const allFeatures = combineFeatures(currentProduct.features, relatedProduct.features);
            setFeatures(allFeatures);
          }}></span>
        </div>
        <div className="bottom-half">
          <div className="category">{relatedProduct.category}</div>
          <div className="card-name">{relatedProduct.name}</div>
          {salePrice ? <div className="sale-price">{salePrice} <s>{relatedProduct.default_price}</s></div> : <div className="default-price">{relatedProduct.default_price}</div>}
          {/* <div className="card-stars" style={{width: 'fit-content'}}>
            <Stars productID={product}/>
          </div> */}
        </div>
      </div>
      <ComparisonModal show={showModal} currentProduct={currentProduct} relatedProduct={relatedProduct} features={features} onClose={() => {
        setShowModal(false);
      }}/>
    </>
  );
};

export default ProductCard;