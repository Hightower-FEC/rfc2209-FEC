import React, { useState, useEffect, useRef } from 'react';

const ImageModal = ({url, showImage, onClose}) => {

  const modal = {
    position: 'fixed',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '999'
  };
  const modalContent = {
    textAlign: 'center'
  };
  const modalImage = {
    display: 'block',
    justifyContent: 'center',
    border: '10px solid white',
    width: '100%',
    height: '100%',
    maxWidth: '75rem',
    maxHeight: '75em'
  };

  return (
    (showImage) &&
    (<div className="img-modal" onClick={onClose} style={modal}>
      <div className="modal-body" style={modalContent}>
        <img src={url} id="modal-image" style={modalImage}/>
      </div>
    </div>)
  );
};

export default ImageModal;