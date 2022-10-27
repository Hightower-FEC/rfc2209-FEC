import React, {useState, useEffect} from 'react';
import Image from './Image.jsx';

const Images = ({images}) => {

  return (
    <div style={{display: 'flex', gap: '10px'}}>
      {images.map((image, i) => <Image url={image} key={i} />)}
    </div>
  );
};

export default Images;