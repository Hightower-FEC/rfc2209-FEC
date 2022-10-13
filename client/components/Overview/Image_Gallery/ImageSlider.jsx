import React from 'react';
const { useState, useEffect } = React;

const ImageSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const containerStyles = {
    height: '100%',
    position: 'relative'
  };

  const leftPointerStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '32px',
    fontSize: '45px',
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer'
  };

  const rightPointerStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '32px',
    fontSize: '45px',
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer'
  };

  const slideStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    backgroundImage: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${props.images[currentIndex].url})`
  };

  const thumbnailContainer = {
    display: 'flex',
    justifyContent: 'center',
    margin: '5px 10px',
    height: '100%'
  };

  const thumbnailStyles = (image) => {
    return {
      minHeight: '15%',
      minWidth: '15%',
      maxHeight: '25%',
      maxWidth: '25%',
      margin: '0 5px',
      backgroundSize: 'cover',
      backgroundImage: 'center',
      backgroundImage: `url(${image.url})`
    };
  };

  const goToNextImage = () => {
    if (currentIndex === props.images.length - 1) { return; }
    setCurrentIndex(currentIndex + 1);
  };

  const goToPreviousImage = () => {
    if (currentIndex === 0) { return; }
    setCurrentIndex(currentIndex - 1);
  };

  const toggleShowArrows = () => {
    console.log('toggling');
    setShowArrows(!showArrows);
  };

  return (
    <div style={containerStyles}
      onMouseEnter={toggleShowArrows}
      onMouseLeave={toggleShowArrows}
    >
      {showArrows &&
        <>
          <div style={leftPointerStyles} onClick={goToPreviousImage}>❮</div>
          <div style={rightPointerStyles} onClick={goToNextImage}>❯</div>
        </>
      }
      <div style={slideStyles}></div>
      <div style={thumbnailContainer}>
        {props.images.map((image, i) => {
          return (
            <div key={i} style={thumbnailStyles(image)}>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;