import React, {useState} from 'react';
import axios from 'axios';
//import ScrollToTop from './Scroll/ScrollToTop.jsx';

const TopBar = ({submitSearch}) =>{
  const [entry, setEntry] = useState('');

  const navBarStyles = {
    display: 'flex',
    position: 'fixed',
    zIndex: 15,
    justifyContent: 'center',
    width: '100%',
    height: '30px',
    backgroundColor: '#090909',
    padding: '20px',
    margin: '0 !important',
    flexDirection: 'row',
  };

  const titleStyles = {
    color: '#F1F1F1',
    position: 'absolute',
    bottom: '10%',
    fontWeight: '800',
    fontSize: '45px',
    fontKerning: 'auto',
  };

  const logoStyles = {
    height: '50px',
    width: '50px',
    color: 'white',
    transform: 'translate(0, 2px)',
    backgroundImage: 'url(./lib/globeIcon.svg)',
    marginLeft: '10px',
    float: 'right'
  };

  return (
    <>
      <div className="top-bar" style={navBarStyles}>
        <div style={titleStyles}>
        atelier
          <div style={logoStyles}></div>
        </div>
      </div>
      <form id="search">
        <input id="input-form" placeholder="Search Items" onChange={() => {
          setEntry(event.target.value);
        }}></input>
        <button id="search-button" className="fa-solid fa-magnifying-glass fa-lg" onClick={() => {
          submitSearch(entry);
        }}></button>
      </form>
    </>
  );
};

export default TopBar;