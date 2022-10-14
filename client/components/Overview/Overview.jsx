import React from 'react';
import AddCart from './StyleSelector/AddCart.jsx';
import ImageGallery from './Image_Gallery/ImageGallery.jsx';
import axios from 'axios';

import { URL } from '../../../config/config.js';
const { useEffect, useState } = React;

const Overview = ({ productID }) => {
  const [currentProductStyles, setCurrentProductStyles] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    axios.get(`${URL}/products/${productID}`)
      .then((response) => {
        // console.log('product details:', response.data);
        setCurrentProduct(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${URL}/products/${productID}/styles`)
      .then((response) => {
        // console.log('product styles:', response.data);
        // console.log('product style:', response.data.results[currentIndex]);
        setCurrentProductStyles(response.data);
        setCurrentStyle(response.data.results[currentIndex]);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   console.log(currentStyle);
  // }, [currentStyle]);

  const overviewContainerStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  const productInfoContainerStyles = {
    margin: '0 0 0 20px',
    width: '300px'
  };

  const stylesContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    width: '100%',
    height: '50%'
  };

  const styleStyles = (image) => {
    return {
      height: '75px',
      width: '75px',
      backgroundSize: 'cover',
      backgroundImage: 'center',
      cursor: 'pointer',
      marginTop: '10px',
      marginRight: '10px',
      backgroundImage: `url(${image.thumbnail_url})`,
      borderRadius: '50%'
    };
  };

  const handleStyleClick = (index) => {
    console.log(currentProductStyles);
    setCurrentStyle(currentProductStyles.results[index]);
    setCurrentIndex(index);
  };

  if (currentStyle && currentProduct) {
    return (
      <div style={overviewContainerStyles}>
        <ImageGallery productStyle={currentStyle}/>
        <div style={productInfoContainerStyles}>
          <h3>{currentProduct.category}</h3>
          <h1>{currentProduct.name}</h1>
          <p>{currentStyle.original_price}</p>
          <p><b>STYLE {'>'}</b> {currentStyle.name}</p>
          <div style={stylesContainer}>
            {currentProductStyles.results.map((style, i) => {
              return (
                <div key={i}
                  style={styleStyles(style.photos[0])}
                  onClick={() => { handleStyleClick(i); }}
                ></div>
              );
            })}
          </div>

          <AddCart />
        </div>
      </div>
    );
  }
  return null;
};

export default Overview;