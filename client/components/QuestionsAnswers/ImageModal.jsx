import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ImageModal = ({url, showImage, onClose}) => {

  const viewRef = useRef(null);

  useEffect(() => {
    gsap.to(viewRef.current, {
      delay: 0,
      opacity: 0,
      duration: 0,
      ease: 'exp.out'
    });
    gsap.to(viewRef.current, {
      delay: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'exp.out'
    });
  }, []);

  const modal = {
    position: 'fixed',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    border: '10px solid white'
  };
  const X = {
    fontSize: '30px'
  };

  return (
    (showImage) &&
    (<div className="img-modal" onClick={onClose} style={modal}>
      <div className="modal-body" style={modalContent}>
        <img src={url} id="modal-image" style={modalImage}/>
        {/* <span className="close" style={X}>&times;</span> */}
      </div>
    </div>)
  );
};

export default ImageModal;