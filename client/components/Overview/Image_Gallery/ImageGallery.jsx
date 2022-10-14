import React from 'react';
import ImageSlider from './ImageSlider.jsx';

const styles = {
  width: '600px',
  height: '400px',
  margin: '0 20px 0 0'
};

const {useState, useEffect} = React;

const ImageGallery = ({ productStyle }) => {
  const [currentPhotos, setCurrentPhotos] = useState(productStyle.photos);
  // console.log(productStyle);

  return (
    <div>
      <div style={styles}>
        <ImageSlider images={productStyle.photos}/>
      </div>
    </div>
  );
};

export default ImageGallery;