import React from 'react';
const { useState, useEffect } = React;

const ImageSlider = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState(images);

  useEffect(() => {
    console.log('useeffect ran');
    setCurrentIndex(0);
  }, [images]);


  const containerStyles = {
    height: '100%',
    position: 'relative'
  };

  const leftPointerStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '32px',
    textShadow: '0 0 2px black',
    fontSize: '100px',
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
    textShadow: '0 0 2px black',
    fontSize: '100px',
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
    position: 'absolute',
    justifyContent: 'space-between',
    padding: '20px',
    top: '91%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '10px',
    height: '100px',
    width: '90%'
  };

  const thumbnailStyles = (image) => {
    return {
      minHeight: '15%',
      minWidth: '15%',
      maxHeight: '100%',
      maxWidth: '25%',
      margin: '0 0 0 0',
      backgroundSize: 'cover',
      backgroundImage: 'center',
      borderRadius: '2px',
      cursor: 'pointer',
      backgroundImage: `url(${image.url})`
    };
  };

  const selectedThumbnailStyles = (image) => {
    return {
      minHeight: '15%',
      minWidth: '15%',
      maxHeight: '100%',
      maxWidth: '25%',
      margin: '0 0 0 0',
      backgroundSize: 'cover',
      backgroundImage: 'center',
      borderRadius: '2px',
      border: '2px solid white',
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
        <div style={{position: 'absolute', height: '900px', width: '600px'}}>
          <div style={leftPointerStyles} onClick={goToPreviousImage}>‹</div>
          <div style={rightPointerStyles} onClick={goToNextImage}>›</div>
          <div style={thumbnailContainer}>
            {images.map((image, i) => {
              if (i === currentIndex) {
                return (
                  <div key={i} onClick={() => { handleThumbnailClick(i); }} style={selectedThumbnailStyles(image)}>
                  </div>
                );
              }
              return (
                <div key={i} onClick={() => { handleThumbnailClick(i); }} style={thumbnailStyles(image)}>
                </div>
              );
            })}
          </div>
        </div>
      }
      <div style={slideStyles}></div>
    </div>
  );
};

export default ImageSlider;