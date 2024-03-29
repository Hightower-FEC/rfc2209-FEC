import React from 'react';
import { gsap } from 'gsap';
import {styles} from './styles.js';
const {useState, useRef, useEffect} = React;


const ExpandedView = ({toggleOffView, images, index}) => {
  const [currentIndex, setCurrentIndex] = useState(index);
  const [currentPhotos, setCurrentPhotos] = useState(images);
  const [showArrows, setShowArrows] = useState(false);

  const viewRef = useRef(null);

  useEffect(() => {
    gsap.to(viewRef.current, {
      delay: 0,
      opacity: 0,
      duration: 0,
      ease: 'exp.out'
    });
    gsap.to(viewRef.current, {
      delay: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'exp.out'
    });
  }, []);

  const imgStyles = {
    width: '100vw',
    height: '100%',
    position: 'relative',
    borderRadius: '10px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundImage: `url(${images[currentIndex].url})`,
    cursor: 'zoom-out'
  };

  const imgContainerStyles = {
    width: 'auto',
    height: '100vh',
    margin: '0 auto'

  };

  const thumbnailContainer = {
    zIndex: 3,
    flexDirection: 'column',
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    padding: '20px',
    top: '50%',
    left: '5%',
    gap: '10px',
    transform: 'translate(-50%, -50%)',
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
    <div style={{position: 'relative'}}>
      <div style={{height: '50px'}}></div>
      <div className="expanded-leftPointer" onClick={goToPreviousImage}>‹</div>
      <div style={
        {
          position: 'absolute',
          height: '100vh',
          width: '100vw',
          zIndex: 2,
          cursor: 'zoom-out'
        }
      } onClick={() => { toggleOffView(currentIndex); }}
      ></div>
      <div className="zoom-out-button" style={{position: 'absolute'}} onClick={() => { toggleOffView(currentIndex); }}>
        <i className="fa-solid fa-magnifying-glass-minus zoom-out-icon"></i>
      </div>
      <div className="expanded-rightPointer" onClick={goToNextImage}>›</div>
      <div style={imgContainerStyles}>
        <div className="expanded-thumbnail-container" style={thumbnailContainer}>
          {images.map((image, i) => {
            if (i === currentIndex) {
              return (
                <div key={i} onClick={() => { handleThumbnailClick(i); }} style={selectedThumbnailStyles(image)} className="selected-thumbnails">
                </div>
              );
            }
            return (
              <div key={i} onClick={() => { handleThumbnailClick(i); }} style={thumbnailStyles(image)}>
              </div>
            );
          })}
        </div>

        <div style={styles.expandedImageCarousel}>
          <div ref={viewRef} style={styles.expandedPhotoContainer(currentIndex)}>
            {currentPhotos.map((photo, index) => {
              return (
                <div
                  key={index}
                  style={styles.expandedContainerStyles}>
                  <div className="expanded-image" style={imgStyles}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedView;