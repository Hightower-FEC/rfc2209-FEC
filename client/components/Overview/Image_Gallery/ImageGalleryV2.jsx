import React from 'react';
import ImageSlider from './ImageSliderV2.jsx';
import {styles} from './styles.js';
import { gsap } from 'gsap';

const {useEffect, useState, useRef} = React;

const ImageGallery = ({ productStyle, handleImageClick, imageIndex }) => {
  const [currentPhotos, setCurrentPhotos] = useState(productStyle.photos);
  const [currentIndex, setCurrentIndex] = useState(imageIndex);

  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);

  const maxThumbnailSlides = Math.floor(productStyle.photos.length / 7);

  const imageGalleryRef = useRef(null);

  useEffect(() => {

    gsap.to(imageGalleryRef.current, {
      delay: 0,
      opacity: 0,
      duration: 0,
      ease: 'exp.out'
    });
    gsap.to(imageGalleryRef.current, {
      delay: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'exp.out'
    });

    console.log(productStyle);
    setCurrentPhotos(productStyle.photos);
    setCurrentIndex(imageIndex);
    setCurrentThumbnailIndex(Math.floor(imageIndex / 7));
  }, [productStyle]);

  const goToNextImage = () => {
    if (currentIndex === currentPhotos.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentIndex === 0) {
      setCurrentIndex(currentPhotos.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };


  const handleThumbnailClick = (index) => {
    console.log('handling thumbnail click', index);
    setCurrentIndex(index);
  };

  const goToNextSetOfThumbnails = () => {
    if (currentThumbnailIndex === maxThumbnailSlides) { return; }
    setCurrentThumbnailIndex(currentThumbnailIndex + 1);
  };

  const goToPreviousSetOfThumbnails = () => {
    if (currentThumbnailIndex === 0) { return; }
    setCurrentThumbnailIndex(currentThumbnailIndex - 1);
  };

  return (
    <div ref={imageGalleryRef} style={{position: 'relative', height: '600px'}}>
      <div className="imageGalleryOptions">
        <div className="gallery-leftPointer" onClick={goToPreviousImage}>‹</div>
        <div className="gallery-rightPointer" onClick={goToNextImage}>›</div>
        <div style={{height: '100%', width: '100%', cursor: 'zoom-in'}}
          onClick={() => { handleImageClick(currentPhotos, currentIndex); }}
        ></div>
        <div className="thumbnail-leftPointer" onClick={goToPreviousSetOfThumbnails}>‹</div>
        <div className="thumbnail-rightPointer" onClick={goToNextSetOfThumbnails}>›</div>

        <div className="gallery-thumbnails-container" style={styles.thumbnailBackground}></div>

        <div style={styles.thumbnailCarousel}>
          <div style={{
            whiteSpace: 'nowrap',
            transition: 'transform 0.3s',
            transform: `translateX(-${currentThumbnailIndex * 100}%)`
          }}>
            {currentPhotos.map((photo, index) => {
              return <ThumbnailSlider
                currentPhotos={currentPhotos}
                currentIndex={currentIndex}
                key={index}
                index={index}
                handleThumbnailClick={handleThumbnailClick}
                photo={photo}
              />;
            })
            }
          </div>
        </div>
      </div>


      <div style={styles.imageCarousel}>
        <div style={styles.photoContainer(currentIndex)}>
          {currentPhotos.map((photo, index) => {
            return <ImageSlider
              currentPhotos={currentPhotos}
              currentIndex={currentIndex}
              key={index}
              handleImageClick={handleImageClick}
              photo={photo}/>;
          })}
        </div>
      </div>
    </div>
  );
};

const ThumbnailSlider = ({ photo, currentIndex, handleThumbnailClick, currentPhotos, index }) => {
  if (index === currentIndex) {
    return (
      <div style={styles.thumbContainerStyles}>
        <div className="selected-thumbnails"
          onClick={() => { handleThumbnailClick(index); }}
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            borderRadius: '10px',
            cursor: 'pointer',
            marginRight: '10px',
            height: '80px',
            width: '80px',
            // border: '2px solid white',
            backgroundImage: `url(${photo.thumbnail_url})`
          }}></div>
      </div>
    );
  } else {
    return (
      <div style={styles.thumbContainerStyles}>
        <div
          onClick={() => { handleThumbnailClick(index); }}
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            borderRadius: '10px',
            cursor: 'pointer',
            marginRight: '10px',
            height: '80px',
            width: '80px',
            backgroundImage: `url(${photo.thumbnail_url})`
          }}></div>
      </div>
    );
  }
};

export default ImageGallery;
