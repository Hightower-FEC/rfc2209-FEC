import React from 'react';
import AddToCartForm from './Form/AddToCartForm.jsx';
import ImageGallery from './Image_Gallery/ImageGalleryV2.jsx';
import ExpandedView from './Image_Gallery/ExpandedView.jsx';
import Stars from '../Stars.jsx';
import axios from 'axios';
import { gsap } from 'gsap';


import { URL } from '../../../config/config.js';
const { useEffect, useState, useRef } = React;

const Overview = ({ productID, interactions}) => {
  const [currentProductStyles, setCurrentProductStyles] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [currentImages, setCurrentImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [toggleView, setToggleView] = useState(false);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQty, setSelectedQty] = useState('');

  const overviewRef = useRef(null);

  useEffect(() => {
    axios.get(`${URL}/products/${productID}`)
      .then((response) => {
        setCurrentProduct(response.data);
      })
      .then(() => {
        axios.get(`${URL}/products/${productID}/styles`)
          .then((response) => {
            setSelectedSize('');
            setSelectedQty('');
            setCurrentIndex(0);
            setImageIndex(0);
            setCurrentProductStyles(response.data);
            setCurrentStyle(response.data.results[0]);
          });
      })
      .catch((err) => console.log(err));
  }, [productID]);


  const overviewContainerStyles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const productInfoContainerStyles = {
    margin: '0 0 0 20px',
    flex: '1 2 auto',
    display: 'flex',
    // minWidth: '400px',
    maxWidth: '400px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '10px',
    alignContent: 'space-between',
  };

  const stylesContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '15px',
    marginTop: '10px',
    width: 'fit-content',
    height: 'fit-content',
    padding: '15px 25px 15px 25px',
    backgroundColor: '#DDDDDD',
    borderRadius: '10px',
    // marginRight: '40px'
  };

  const styleStyles = (image) => {
    return {
      height: '70px',
      width: '70px',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: 'center',
      cursor: 'pointer',
      backgroundImage: `url(${image.thumbnail_url})`,
      borderRadius: '50%',
      flex: '0 0 auto'
    };
  };

  const itemCategoryStyle = {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '10px'
  };

  const itemNameStyle = {
    fontSize: '50px',
    fontWeight: '700'
  };

  const selectedStyleStyles = {
    fontSize: '16px',
  };

  const handleStyleClick = (index) => {
    // console.log(currentProductStyles);
    setSelectedQty('');
    setSelectedSize('');
    setCurrentStyle(currentProductStyles.results[index]);
    setCurrentIndex(index);
    setImageIndex(0);
  };

  const handleImageClick = (images, index) => {
    setCurrentImages(images);
    setImageIndex(index);
    setToggleView(true);
  };

  const toggleOffView = (index) => {
    setImageIndex(index);
    setToggleView(false);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleQtyChange = (event) => {
    setSelectedQty(event.target.value);
  };

  if (currentStyle && currentProduct) {
    if (toggleView) {
      return (
        <ExpandedView toggleOffView={toggleOffView} images={currentImages} index={imageIndex}/>
      );
    }
    return (
      <div ref={overviewRef} onClick={(e) => interactions(e, 'Overview')}>
        <div style={{height: '110px'}}></div>
        <div style={overviewContainerStyles}>
          <ImageGallery style={{flex: '2 1 auto'}} imageIndex={imageIndex} handleImageClick={handleImageClick} productStyle={currentStyle}/>
          <div style={productInfoContainerStyles}>
            <div>
              <div style={itemCategoryStyle}>{currentProduct.category.toUpperCase()}</div>
              <div style={{width: 'fit-content'}}>
                <Stars productID={productID} size={'20px'}/>
              </div>
              <div style={itemNameStyle}>{currentProduct.name}</div>
            </div>
            <div>{currentStyle.original_price}</div>
            <div>
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
            </div>
            <AddToCartForm currentStyle={currentStyle} handleSizeChange={handleSizeChange} handleQtyChange={handleQtyChange} selectedSize={selectedSize} selectedQty={selectedQty}/>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          width: '1200px',
          height: 'fit-content',
          margin: '20px auto'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '65%',
            marginTop: '30px',
            borderRight: '2px solid rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '600',
              width: '90%',
            }}>{currentProduct.slogan}</div>
            <div style={{
              width: '90%',
              marginTop: '10px',
              lineHeight: '28px',
              fontSize: '18px',
            }}>{currentProduct.description}</div>
          </div>
          <div style={{
            width: 'fit-content',
            padding: '0',
            margin: '10px 0 0 0',
            lineHeight: '28px',
            fontSize: '18px'
          }}>
            <ul>
              {currentProduct.features.map((feature, i) => {
                return <li key={i}><b>{feature.feature + ' '}</b> {feature.value}</li>;
              })}
            </ul>
          </div>

        </div>
      </div>
    );
  }
  return null;
};

export default Overview;