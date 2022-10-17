import React from 'react';

const selectStyles = {
  width: '60%',
  padding: '10px',
  fontSize: '14px',
  fontWeight: 'bold',
  flex: '4 1 20%',
};

const quantityStyles = {
  fontSize: '14px',
  width: '20px',
  fontWeight: 'bold',
  padding: '10px',
  flex: '2 1 auto',
};

const buttonStyles = {
  fontWeight: 'bold',
  width: '75%',
  flex: '2 1 auto'
};

const formContainerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
  rowGap: '10px',
  columnGap: '10px',
};

const starButtonStyles = {
  fontSize: '25px',
};

const {useState} = React;

const AddToCartForm = ({currentStyle}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQty, setSelectedQty] = useState('');

  const handleSizeChange = (event) => {
    console.log(event.target.value);
    setSelectedSize(event.target.value);
  };

  const handleQtyChange = (event) => {
    console.log(event.target.value);
    setSelectedQty(event.target.value);
  };

  return (
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
      <button style={starButtonStyles} type="button" value="★">★</button>
    </div>
  );
};

export default AddToCartForm;