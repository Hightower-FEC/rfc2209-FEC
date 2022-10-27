import React, {useState} from 'react';
import axios from 'axios';

const TopBar = () =>{
  const [entry, setEntry] = useState('');

  const navBarStyles = {
    display: 'flex',
    position: 'fixed',
    zIndex: 15,
    justifyContent: 'center',
    width: '100%',
    height: '30px',
    backgroundColor: 'black',
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

  const submitEntry = (text) => {
    axios.get('products?count=1011')
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  };

  return (
    <>
      <div style={navBarStyles}>
        <div style={titleStyles}>
        atelier
          <div style={logoStyles}></div>
        </div>
      </div>
      <form id="search">
        <input id="input-form" placeholder="Search Items" onChange={() => {
          setEntry(event.target.value);
        }}></input>
        <button id="search-button" class="fa-solid fa-magnifying-glass fa-lg" onClick={submitEntry}></button>
      </form>
    </>
  );
};

export default TopBar;