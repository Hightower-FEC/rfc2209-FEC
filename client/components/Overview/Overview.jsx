import React from 'react';
import AddToCartForm from './Form/AddToCartForm.jsx';
import ImageGallery from './Image_Gallery/ImageGalleryV2.jsx';
import ExpandedView from './Image_Gallery/ExpandedView.jsx';
import Stars from '../Stars.jsx';
import axios from 'axios';
import { gsap } from 'gsap';

const { useEffect, useState, useRef } = React;

const Overview = ({ currentProduct, reviewMetaData, interactions}) => {
  const [currentProductStyles, setCurrentProductStyles] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(null);

  const [currentImages, setCurrentImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [toggleView, setToggleView] = useState(false);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQty, setSelectedQty] = useState('');

  const overviewRef = useRef(null);

  useEffect(() => {
    axios.get(`/products/${currentProduct.id}/styles`)
      .then((response) => {
        setSelectedSize('');
        setSelectedQty('');
        setCurrentIndex(0);
        setImageIndex(0);
        setCurrentProductStyles(response.data);
        setCurrentStyle(response.data.results[0]);
      })
      .catch((err) => console.log(err));
  }, [currentProduct]);

  useEffect(() => {
    console.log(currentStyle);
  }, [currentStyle]);

  const overviewContainerStyles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  // const productInfoContainerStyles = {
  //   margin: '0 0 0 20px',
  //   flex: '1 2 auto',
  //   display: 'flex',
  //   // minWidth: '400px',
  //   maxWidth: '400px',
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   gap: '10px',
  //   alignContent: 'space-between',
  // };

  const styleStyles = (image) => {
    return {
      height: '70px',
      width: '70px',
      padding: '2px',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: 'center',
      cursor: 'pointer',
      backgroundImage: `url(${image.thumbnail_url})`,
      borderRadius: '50%',
      flex: '0 0 auto',
    };
  };

  const currentStyleStyles = (image) => {
    return {
      // border: '2px solid rgb(34, 34, 34)',
      height: '70px',
      width: '70px',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: 'center',
      cursor: 'pointer',
      backgroundImage: `url(${image.thumbnail_url})`,
      borderRadius: '50%',
      flex: '0 0 auto',
      boxShadow: 'inset 0 0 10px rgba(34, 34, 34)'
    };
  };

  const itemCategoryStyle = {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '10px'
  };

  const itemNameStyle = {
    fontSize: '40px',
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
          <div className="productInfoContainer">
            <div>
              <div style={itemCategoryStyle}>{currentProduct.category.toUpperCase()}</div>
              <div style={{width: 'fit-content'}}>
                <Stars reviewMetaData={reviewMetaData} size={'20px'}/>
              </div>
              <div style={itemNameStyle}>{currentProduct.name}</div>
              <div className="accent-underline"></div>
            </div>
            <div>{currentStyle.original_price}</div>
            <div>
              <div style={selectedStyleStyles}><b>STYLE {':'}  </b>{currentStyle.name}</div>
              <div className="stylesContainer">
                {currentProductStyles.results.map((style, i) => {
                  if (currentStyle.style_id === style.style_id) {
                    return (
                      <div key={i}
                        className="selected-style"
                        style={currentStyleStyles(style.photos[0])}
                        onClick={() => { handleStyleClick(i); }}
                      ></div>
                    );
                  }
                  return (
                    <div key={i}
                      // className="selected-style"
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
          <div className="item-desc-seperator" style={{
            display: 'flex',
            flexDirection: 'column',
            width: '65%',
            marginTop: '30px',
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