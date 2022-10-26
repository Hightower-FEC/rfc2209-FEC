import React, {useState, useEffect} from 'react';
import ImageModal from './ImageModal.jsx';

const Image = ({url}) => {

  const [showImage, growImage] = useState(false);

  const imageStyle = {
    margin: '10px 0 5px 0',
    width: '100px',
    height: '100px',
    padding: '5px',
    backgroundImage: `url(${url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#DDDDDD',
    border: '1px solid rgba(0, 0, 0, 0.4)',
    borderRadius: '5px'
  };

  let largeImage = {
    margin: '10px 15px 0 0',
    border: '1px solid black'
  };


  return (
    <>
      <div style={imageStyle} onClick={() => growImage(true)}></div>

      <ImageModal
        url={url}
        showImage={showImage}
        onClose={() => growImage(false)}
      />
    </>
  );
};

export default Image;