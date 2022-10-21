import React from 'react';
import ImageSlider from './ImageSlider.jsx';
import { gsap } from 'gsap';


const styles = {
  width: '1000px',
  height: '800px',
  margin: '0 20px 0 0',
  opacity: '0'
};

const {useState, useEffect, useRef} = React;

const ImageGallery = ({ productStyle, handleImageClick, imageIndex }) => {
  // useEffect(() => {
  //   console.log(productStyle.name);
  // }, [productStyle]);
  const imageGalleryRef = useRef(null);

  useEffect(() => {
    gsap.to(imageGalleryRef.current, {
      delay: 0,
      opacity: 0,
      duration: 0,
      ease: 'exp.out'
    });
    gsap.to(imageGalleryRef.current, {
      delay: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'exp.out'
    });
  }, [productStyle]);

  return (
    <div>
      <div ref={imageGalleryRef} style={styles}>
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