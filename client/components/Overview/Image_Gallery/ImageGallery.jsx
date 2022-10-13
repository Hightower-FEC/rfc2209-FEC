import React from 'react';
import ImageSlider from './ImageSlider.jsx';

const styles = {
  width: '500px',
  height: '350px',
  margin: '0 auto'
};

const {useState, useEffect} = React;

const ImageGallery = ({ productStyle }) => {
  const [currentPhotos, setCurrentPhotos] = useState(productStyle.photos);
  console.log(productStyle);

  return (
    <div>
      <div style={styles}>
        <ImageSlider images={currentPhotos}/>
      </div>
    </div>
  );
};

export default ImageGallery;