import React from 'react';

const TopBar = () =>{

  const navBarStyles = {
    display: 'flex',
    position: 'fixed',
    zIndex: 4,
    justifyContent: 'center',
    width: '100%',
    height: '50px',
    backgroundColor: 'black',
    padding: '20px',
    margin: '0 !important'
  };

  const titleStyles = {
    color: '#F1F1F1',
    fontWeight: '800',
    fontSize: '45px',
    fontKerning: 'auto',

  };

  const logoStyles = {
    height: '50px',
    width: '50px',
    color: 'white',
    backgroundImage: 'url(./lib/globeIcon.svg)',
    marginLeft: '10px',
    float: 'right'
  };

  return (
    <div style={navBarStyles}>
      <div style={titleStyles}>
        atelier
        <div style={logoStyles}></div>
      </div>
    </div>
  );
};

export default TopBar;