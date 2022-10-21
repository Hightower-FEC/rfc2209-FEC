import React from 'react';
import ImageSlider from './ImageSliderV2.jsx';

const styles = {
  width: '1000px',
  height: '800px',
  margin: '0 20px 0 0',
};

const {useEffect} = React;

const ImageGallery = ({ productStyle }) => {

  useEffect(() => {
    console.log(productStyle);
  }, [productStyle]);

  return (
    <div>
      <div style={styles}>
        <ImageSlider photos={productStyle.photos}/>
      </div>
    </div>
  );
};

export default ImageGallery;
