export const styles = {
  currentPhoto: (currentPhoto) => {
    return {
      width: '800px',
      zIndex: 1,
      height: '100%',
      position: 'absolute',
      borderRadius: '10px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#DDDDDD',
      backgroundSize: 'contain',
      backgroundImage: `url(${currentPhoto.url})`,
      cursor: 'zoom-in'
    };
  },

  thumbnailStyles: (image) => {
    return {
      zIndex: 8,
      minHeight: '15%',
      minWidth: '100px',
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
  },

  selectedThumbnailStyles: (image) => {
    return {
      minHeight: '15%',
      minWidth: '100px',
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
  },

  containerStyles: {
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    width: '800px',
    height: '600px',
    position: 'relative'
  },

  photoContainer: (index) => {
    return {
      whiteSpace: 'nowrap',
      transition: 'transform 0.3s',
      transform: `translateX(-${index * 100}%)`,
      width: '800px',
      height: '600px',
    };
  },

  thumbnailContainer: (index) => {
    return {
      whiteSpace: 'nowrap',
      transition: 'transform 0.3s',
      transform: `translateX(-${index * 50}%)`,
      width: '900px',
      height: '75px',
      zIndex: 6,
      gap: '2%',
    };
  },

  thumbnailContainerStyles: {
    zIndex: 6,
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2%',
    padding: '20px 50px 20px 50px',
    top: '90%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '10px',
    height: '80px',
    width: '80%'
  },

  imageCarousel: {
    width: '800px',
    height: '600px',
    position: 'relative',
    overflow: 'hidden',
  },

  thumbnailCarousel: {
    zIndex: 3,
    width: '600px',
    overflow: 'hidden',
    position: 'absolute',
    bottom: '20px',
    left: '100px',

  },

  expandedImageCarousel: {
    height: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
  },

  expandedPhotoContainer: (index) => {
    return {
      whiteSpace: 'nowrap',
      transition: 'transform 0.3s',
      transform: `translateX(-${index * 100}%)`,
      width: 'auto',
      height: '100vh',
    };
  },

  expandedContainerStyles: {
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: '100vh',
    position: 'relative'
  },

  thumbContainerStyles: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    justifyContent: 'center',
    height: '90px',
    position: 'relative',
  },

  thumbnailBackground: {
    zIndex: 2,
    position: 'absolute',
    height: '90px',
    width: '600px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: '10px 50px 10px 50px',
    bottom: '10px',
    left: '50px',
  }
};
