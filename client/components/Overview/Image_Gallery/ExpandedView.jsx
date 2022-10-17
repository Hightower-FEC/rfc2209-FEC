import React from 'react';

const {useState} = React;


const ExpandedView = ({toggleOffView, images, index}) => {
  const [currentIndex, setCurrentIndex] = useState(index);
  const [showArrows, setShowArrows] = useState(false);

  const imgStyles = {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: '10px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#DDDDDD',
    backgroundSize: 'contain',
    backgroundImage: `url(${images[currentIndex].url})`,
    cursor: 'zoom-out'
  };

  const leftPointerStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '230px',
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

  const imgContainerStyles = {
    width: 'auto',
    height: '100vh',
    margin: '0 auto'

  };

  const exitButtonStyles = {
    zIndex: 2,
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundImage: 'url(https://img.icons8.com/external-line-adri-ansyah/344/external-interface-basic-ui-line-adri-ansyah-10.png)',
    backgroundPosition: 'center',
  };

  const thumbnailContainer = {
    zIndex: 2,
    flexDirection: 'column',
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    padding: '20px',
    top: '55%',
    left: '5%',
    gap: '10px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '10px',
    height: '80%',
    width: '5%'
  };

  const thumbnailStyles = (image) => {
    return {
      width: '100%',
      height: '30%',
      margin: '0 0 0 0',
      backgroundSize: 'cover',
      backgroundImage: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '2px',
      cursor: 'pointer',
      backgroundImage: `url(${image.url})`
    };
  };

  const selectedThumbnailStyles = (image) => {
    return {
      width: '100%',
      height: '30%',
      margin: '0 0 0 0',
      backgroundSize: 'cover',
      backgroundImage: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '2px',
      cursor: 'pointer',
      backgroundImage: `url(${image.url})`,
      border: '2px solid white',
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

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div style={leftPointerStyles} onClick={goToPreviousImage}>‹</div>
      <div style={rightPointerStyles} onClick={goToNextImage}>›</div>
      <div style={imgContainerStyles}>
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
        <div style={imgStyles} onClick={toggleOffView}>
          <div style = {{
            position: 'absolute',
            right: '20px',
            height: '30px',
            width: '30px',
            top: '20px',
            zIndex: 1,
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '50%',
            cursor: 'zoom-out'
          }}>
            <div style={exitButtonStyles} onClick={toggleOffView}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedView;