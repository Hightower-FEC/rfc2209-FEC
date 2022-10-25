import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon
} from 'react-share';

const selectStyles = {
  width: '60%',
  padding: '5px',
  fontSize: '14px',
  fontWeight: 'bold',
  height: '30px',
  flex: '4 1 50%',
};

const quantityStyles = {
  fontSize: '14px',
  width: '20px',
  fontWeight: 'bold',
  padding: '5px',
  flex: '2 2 auto',
  height: '30px',
};

const buttonStyles = {
  fontSize: '14px',
  fontWeight: 'bold',
  width: '70%',
  height: '30px',
  flex: '4 1 70%'
};

const formContainerStyles = {
  fontSize: '16px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
  rowGap: '10px',
  columnGap: '10px',
  width: '100%'
};

const starButtonStyles = {
  fontSize: '20px',
  height: '30px',
  flex: '1 1 auto'
};

const shareButtonStyles = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
  gap: '10px',
  padding: '0',
  width: 'fit-content',
  height: 'fit-content',
};

const {useState, useEffect} = React;

const AddToCartForm = ({currentStyle, handleSizeChange, handleQtyChange, selectedSize, selectedQty}) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (currentStyle) {
    return (
      <div style={formContainerStyles}>
        <div style={formContainerStyles}>

          <select
            style={selectStyles}
            onChange={handleSizeChange}
            id="size_select"
            value={selectedSize}
          >
            <option value="" disabled hidden>SELECT SIZE</option>
            {Object.keys(currentStyle.skus).map((key, i) => {
              return <option
                key={i}
                value={key}
              >
                {currentStyle.skus[key].size}
              </option>;
            })}

          </select>
          <select style={quantityStyles} value={selectedQty} onChange={handleQtyChange}>
            {
              selectedSize !== '' ?
                Array.from({length: currentStyle.skus[selectedSize].quantity}, (num, i) => i + 1).map((number, i) => {
                  return (<option key={i} value={number}>{number}</option>);
                })
                :
                <option value="" disabled hidden>QTY</option>
            }


          </select>
          <button style={buttonStyles} type="button" value="ADD TO CART">ADD TO CART</button>
          <button
            style={starButtonStyles}
            type="button"
            onClick={toggleFavorite}>
            {isFavorite ? <i className="fa-solid fa-star"></i> : <i className="far fa-star"></i>}
          </button>
        </div>

        <div style={shareButtonStyles}>
          <div>
            <FacebookShareButton
              url={'http://github.com'}
              quote={'Checkout this PRODUCT_NAME from Atelier'}>
              <FacebookIcon size={40} round={true}/>
            </FacebookShareButton>
          </div>

          <div>
            <TwitterShareButton
              url={'http://github.com'}
              quote={'Checkout this PRODUCT_NAME from Atelier'}>
              <TwitterIcon size={40} round={true}/>
            </TwitterShareButton>
          </div>

          <div>
            <PinterestShareButton
              url={'http://github.com'}
              media={currentStyle.photos[0].url}
              quote={'Checkout this PRODUCT_NAME from Atelier'}>
              <PinterestIcon size={40} round={true}/>
            </PinterestShareButton>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default AddToCartForm;