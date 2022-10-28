import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import ScrollToTop from './Scroll/ScrollToTop.jsx';

const TopBar = ({submitSearch, handleThemeToggle}) =>{
  const [entry, setEntry] = useState('');
  const [currentResults, setCurrentResults] = useState([]);


  const navBarStyles = {
    display: 'flex',
    position: 'fixed',
    zIndex: 15,
    justifyContent: 'space-between',
    width: '100%',
    height: '30px',
    backgroundColor: '#090909',
    padding: '20px',
    margin: '0 !important',
    flexDirection: 'row',
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
    transform: 'translate(0, 2px)',
    backgroundImage: 'url(./lib/globeIcon.svg)',
    marginLeft: '10px',
    float: 'right'
  };

  const submitEntry = (text) => {
    event.preventDefault();
    axios.get('/products?count=1011')
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => console.log(error));
  };



  return (
    <div className="top-bar" style={navBarStyles}>
      <div>
        <form id="search">
          <input id="input-form" placeholder="Search Items" onChange={() => {
            setEntry(event.target.value);
          }}></input>
          <button id="search-button" className="fa-solid fa-magnifying-glass fa-lg" onClick={() => {
            submitSearch(entry);
          }}></button>
        </form>
      </div>

      <div style={{position: 'absolute', left: '43%', top: '10%'}}>
        <div style={titleStyles}>
        atelier
          <div style={logoStyles}></div>
        </div>
      </div>

      <div>
        <button className="black-button" style={{height: '35px', marginRight: '30px'}} onClick={handleThemeToggle}>Change Theme</button>
      </div>
    </div>
  );
};

export default TopBar;