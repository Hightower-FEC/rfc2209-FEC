import React from 'react';
const { useState, useEffect } = React;

const ImageSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div style={containerStyles}>
      <div style={leftPointerStyles}>‹</div>
      <div style={rightPointerStyles}>›</div>
      <div style={slideStyles}></div>
    </div>
  );
};

export default ImageSlider;