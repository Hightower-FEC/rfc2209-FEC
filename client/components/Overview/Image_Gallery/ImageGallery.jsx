import React from 'react';
import ImageSlider from './ImageSlider.jsx';

const styles = {
  width: '1000px',
  height: '800px',
  margin: '0 20px 0 0'
};

const {useState, useEffect} = React;

const ImageGallery = ({ productStyle, handleImageClick, imageIndex }) => {
  useEffect(() => {
    console.log(productStyle.name);
  }, [productStyle]);

  return (
    <div>
      <div style={styles}>
        <ImageSlider
          handleImageClick={handleImageClick}
          images={productStyle.photos}
          imageIndex={imageIndex}
        />
      </div>
    </div>
  );
};

export default ImageGallery;