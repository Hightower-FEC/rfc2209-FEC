import React, {useState, useEffect} from 'react';

const Image = ({url}) => {

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

  return (
    <div style={imageStyle}></div>
  );
};

export default Image;