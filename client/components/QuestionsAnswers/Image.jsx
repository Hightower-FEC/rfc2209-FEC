import React, {useState, useEffect} from 'react';

const Image = ({url}) => {

  const imageStyle = {
    width: 100 + 'px',
    height: 100 + 'px'
  };

  return (
    <img src={url} style={imageStyle}/>
  );
};

export default Image;