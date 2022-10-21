import React, {useState, useEffect} from 'react';

const Image = ({url}) => {

  const imageStyle = {
    margin: '10px 15px 0 0',
    width: '100px',
    height: '100px',
    border: '1px solid black'
  };

  return (
    <img src={url} style={imageStyle}/>
  );
};

export default Image;