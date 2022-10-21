import React from 'react';
import {styles} from './styles.js';

const {useState, useEffect} = React;


const ImageSlider = ({ photos }) => {
  const [currentPhoto, setCurrentPhoto] = useState(photos[0]);

  useEffect(() => {
    console.log(currentPhoto);
    setCurrentPhoto(photos[0]);
  }, [photos]);

  return (
    <div style={styles.containerStyles} >
      <div style={styles.currentPhoto(currentPhoto)}></div>
    </div>
  );
};


export default ImageSlider;