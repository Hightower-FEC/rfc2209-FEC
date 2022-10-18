import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const { useState, useEffect } = React;

const ImageSlider = ({images, handleImageClick, imageIndex}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(images[imageIndex]);
  const [currentPhotos, setCurrentPhotos] = useState(images);
  const [visibleThumbnails, setVisibleThumbnails] = useState(images.slice(0, 5));
  const [firstThumbnailIndex, setFirstThumbnailIndex] = useState(0);
  const [lastThumbnailIndex, setLastThumbnailIndex] = useState(4);

  useEffect(() => {
    console.log('image index:', imageIndex);
    console.log('last index:', lastThumbnailIndex);
    setCurrentIndex(imageIndex);
    setCurrentPhotos(images);
    setCurrentPhoto(images[imageIndex]);
    // setVisibleThumbnails(images.slice(0, 5));
    // if (imageIndex > lastThumbnailIndex) {
    //   setLastThumbnailIndex(imageIndex + 5);
    //   setFirstThumbnailIndex(imageIndex);
    // }
  }, [images]);

  useEffect(() => {
    // console.log('vis', visibleThumbnails);
    // console.log('first index:', firstThumbnailIndex);
    // console.log('last index:', lastThumbnailIndex);
    setVisibleThumbnails(currentPhotos.slice(firstThumbnailIndex, lastThumbnailIndex + 1));
    // console.log('current photo', currentPhoto);
  }, [lastThumbnailIndex]);


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

  const leftThumbnailPointerStyles = {
    position: 'absolute',
    top: '90%',
    transform: 'translate(0, -50%)',
    left: '20px',
    textShadow: '0 0 2px black',
    fontSize: '100px',
    color: 'white',
    zIndex: 3,
    userSelect: 'none',
    cursor: 'pointer'
  };

  const rightThumbnailPointerStyles = {
    position: 'absolute',
    top: '90%',
    transform: 'translate(0, -50%)',
    right: '20px',
    textShadow: '0 0 2px black',
    fontSize: '100px',
    color: 'white',
    zIndex: 3,
    userSelect: 'none',
    cursor: 'pointer'
  };

  const slideStyles = {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: '10px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#DDDDDD',
    backgroundSize: 'contain',
    backgroundImage: `url(${currentPhoto.url})`,
    cursor: 'zoom-in'
  };

  const thumbnailContainer = {
    zIndex: 2,
    display: 'flex',
    position: 'absolute',
    justifyContent: 'space-between',
    padding: '20px 50px 20px 50px',
    top: '91%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '10px',
    height: '100px',
    width: '80%'
  };

  const thumbnailStyles = (image) => {
    return {
      minHeight: '15%',
      minWidth: '18%',
      maxHeight: '100%',
      maxWidth: '20%',
      margin: '0 0 0 0',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      borderRadius: '2px',
      cursor: 'pointer',
      backgroundImage: `url(${image.url})`
    };
  };

  const selectedThumbnailStyles = (image) => {
    return {
      minHeight: '15%',
      minWidth: '18%',
      maxHeight: '100%',
      maxWidth: '20%',
      margin: '0 0 0 0',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '2px',
      border: '2px solid white',
      cursor: 'pointer',
      backgroundImage: `url(${image.url})`
    };
  };

  const goToNextImage = () => {
    if (currentIndex === images.length - 1) { return; }
    setCurrentPhoto(images[currentIndex + 1]);
    setCurrentIndex(currentIndex + 1);
  };

  const goToPreviousImage = () => {
    if (currentIndex === 0) { return; }
    setCurrentPhoto(images[currentIndex - 1]);
    setCurrentIndex(currentIndex - 1);
  };

  const toggleShowArrows = () => {
    setShowArrows(!showArrows);
  };

  const handleThumbnailClick = (index) => {
    setCurrentPhoto(visibleThumbnails[index]);
    setCurrentIndex(firstThumbnailIndex + index);
  };

  const goToNextSetOfThumbnails = () => {
    if (firstThumbnailIndex + 5 >= currentPhotos.length - 1) {
      setFirstThumbnailIndex(currentPhotos.length - 1);
      // setLastThumbnailIndex(currentPhotos.length);
      if (lastThumbnailIndex < currentPhotos.length - 1) {
        setLastThumbnailIndex(lastThumbnailIndex + 5);
      }
    } else {
      setFirstThumbnailIndex(firstThumbnailIndex + 5);
      setLastThumbnailIndex(lastThumbnailIndex + 5);

    }
    // setVisibleThumbnails(currentPhotos.slice(firstThumbnailIndex + 5, lastThumbnailIndex + 6));
  };

  const goToPreviousSetOfThumbnails = () => {
    // setVisibleThumbnails(currentPhotos.slice(firstThumbnailIndex - 5, lastThumbnailIndex - 6));
    if (firstThumbnailIndex - 5 <= 0) {
      setFirstThumbnailIndex(0);
      // setLastThumbnailIndex(4);
      setLastThumbnailIndex(4);
    } else {
      setFirstThumbnailIndex(firstThumbnailIndex - 5);
      setLastThumbnailIndex(lastThumbnailIndex - 5);
    }
  };

  return (
    <div style={containerStyles}
      onMouseEnter={toggleShowArrows}
      onMouseLeave={toggleShowArrows}
    >
      {showArrows &&
        <div style={{position: 'absolute', height: '900px', width: '600px'}} >
          <div style={leftPointerStyles} onClick={goToPreviousImage}>‹</div>
          <div style={rightPointerStyles} onClick={goToNextImage}>›</div>
          <div style={leftThumbnailPointerStyles} onClick={goToPreviousSetOfThumbnails}>‹</div>
          <div style={rightThumbnailPointerStyles} onClick={goToNextSetOfThumbnails}>›</div>
          <div style={thumbnailContainer}>
            {visibleThumbnails.map((image, i) => {
              if (image.url === currentPhoto.url) {
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

      <div style={slideStyles} onClick={() => { handleImageClick(currentPhotos, currentIndex); }}></div>

    </div>
  );
};

export default ImageSlider;