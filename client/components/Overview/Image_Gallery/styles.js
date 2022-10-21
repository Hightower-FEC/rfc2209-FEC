export const styles = {
  currentPhoto: (currentPhoto) => {
    return {
      width: '100%',
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

  containerStyles: {
    height: '100%',
    width: '100%',
    position: 'relative'
  },

};
