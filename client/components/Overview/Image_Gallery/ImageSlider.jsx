import React from 'react';
const { useState, useEffect } = React;

const ImageSlider = ({images}) => {
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
    textShadow: '0 0 7px black',
    fontSize: '45px',
    color: 'white',
    zIndex: 1,
    userSelect: 'none',
    cursor: 'pointer'
  };

  const rightPointerStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '32px',
    textShadow: '0 0 7px black',
    fontSize: '45px',
    color: 'white',
    zIndex: 1,
    userSelect: 'none',
    cursor: 'pointer'
  };

  const slideStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#DDDDDD',
    backgroundSize: 'contain',
    backgroundImage: `url(${images[currentIndex].url})`
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
      cursor: 'pointer',
      backgroundImage: `url(${image.url})`
    };
  };

  const goToNextImage = () => {
    if (currentIndex === images.length - 1) { return; }
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

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
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
        {images.map((image, i) => {
          return (
            <div key={i} onClick={() => { handleThumbnailClick(i); }} style={thumbnailStyles(image)}>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;