import React from 'react';
import {styles} from './styles.js';

const {useState, useEffect} = React;


const ImageSlider = ({ photo, currentIndex, handleImageClick, currentPhotos }) => {
  // const [currentPhoto, setCurrentPhoto] = useState(photos[0]);

  useEffect(() => {
    // console.log(photo);
    // setCurrentPhoto(photos[0]);
  }, [photo]);

  return (
    <div style={styles.containerStyles} >
      <div
        onClick={() => { handleImageClick(currentPhotos, currentIndex); }}
        style={styles.currentPhoto(photo)}></div>
    </div>
  );
};


export default ImageSlider;