import React, {useState, useEffect} from 'react';
import ImageModal from './ImageModal.jsx';

const Image = ({url}) => {

  const [showImage, growImage] = useState(false);

  let imageStyle = {
    margin: '10px 15px 0 0',
    width: '100px',
    height: '100px',
    border: '1px solid black'
  };

  let largeImage = {
    margin: '10px 15px 0 0',
    border: '1px solid black'
  };


  return (
    <>
      <img src={url} style={imageStyle} onClick={() => growImage(true)}/>

      <ImageModal
        url={url}
        showImage={showImage}
        onClose={() => growImage(false)}
      />
    </>
  );
};

export default Image;