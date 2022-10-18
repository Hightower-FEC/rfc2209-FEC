import React from 'react';
import AddToCartForm from './Form/AddToCartForm.jsx';
import ImageGallery from './Image_Gallery/ImageGallery.jsx';
import ExpandedView from './Image_Gallery/ExpandedView.jsx';
import axios from 'axios';

import { URL } from '../../../config/config.js';
const { useEffect, useState } = React;

const Overview = ({ productID }) => {
  const [currentProductStyles, setCurrentProductStyles] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [currentImages, setCurrentImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [toggleView, setToggleView] = useState(false);


  useEffect(() => {
    axios.get(`${URL}/products/${productID}`)
      .then((response) => {
        console.log('product details:', response.data);
        setCurrentProduct(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${URL}/products/${productID}/styles`)
      .then((response) => {
        // console.log('product styles:', response.data);
        console.log('product style:', response.data.results[currentIndex]);
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
    display: 'flex',
    width: '400px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  };

  const stylesContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    gap: '30px',
    width: 'auto',
    height: 'auto',
    padding: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '10px'
  };

  const styleStyles = (image) => {
    return {
      height: '90px',
      width: '90px',
      backgroundSize: 'cover',
      backgroundImage: 'center',
      cursor: 'pointer',
      backgroundImage: `url(${image.thumbnail_url})`,
      borderRadius: '50%'
    };
  };

  const itemCategoryStyle = {
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: '30px'
  };

  const itemNameStyle = {
    fontSize: '70px',
    marginBottom: '60px',
    fontWeight: '700'
  };

  const selectedStyleStyles = {
    fontSize: '20px',
    marginTop: '100px'
  };

  const handleStyleClick = (index) => {
    console.log(currentProductStyles);
    setCurrentStyle(currentProductStyles.results[index]);
    setCurrentIndex(index);
  };

  const handleImageClick = (images, index) => {
    console.log('handling image click', images, index);
    setCurrentImages(images);
    setImageIndex(index);
    setToggleView(true);
  };

  const toggleOffView = () => {
    setToggleView(false);
  };

  if (currentStyle && currentProduct) {
    if (toggleView) {
      return (
        <ExpandedView toggleOffView={toggleOffView} images={currentImages} index={imageIndex}/>
      );
    }
    return (
      <>
        <div style={overviewContainerStyles}>
          <ImageGallery handleImageClick={handleImageClick} productStyle={currentStyle}/>
          <div style={productInfoContainerStyles}>
            <div style={itemCategoryStyle}>{currentProduct.category.toUpperCase()}</div>
            <div style={itemNameStyle}>{currentProduct.name}</div>
            <div>{currentStyle.original_price}</div>
            <div style={selectedStyleStyles}><b>STYLE {':'}  </b>{currentStyle.name}</div>
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
            <AddToCartForm currentStyle={currentStyle}/>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          width: '1200px',
          height: '150px',
          margin: '20px auto'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '75%',
            marginTop: '30px',
            borderRight: '2px solid black'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',

            }}>{currentProduct.slogan}</div>
            <div style={{
              width: '100%',
              marginTop: '30px',
              lineHeight: '28px',
              fontSize: '18px',
            }}>{currentProduct.description}</div>
          </div>
          <div style={{
            width: '15%',
            padding: '30px',
            margin: '10px 0 0 0',
            lineHeight: '28px',
            fontSize: '18px'
          }}>
            <ul>
              {currentProduct.features.map((feature, i) => {
                return <li><b>{feature.feature + ' '}</b> {feature.value}</li>;
              })}
            </ul>
          </div>

        </div>
      </>
    );
  }
  return null;
};

export default Overview;