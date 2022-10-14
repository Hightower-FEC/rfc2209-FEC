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
  width: '21%',
  fontSize: '25px',
};

const AddToCartForm = () => {
  return (
    <div style={formContainerStyles}>
      <select style={selectStyles} id="size_select" defaultValue="none">
        <option value="none" disabled hidden>SELECT SIZE</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="xl">XL</option>
      </select>
      <select style={quantityStyles} defaultValue="1">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button style={buttonStyles} type="button" value="ADD TO CART">ADD TO CART <strong style={{marginLeft: '40%'}}>＋</strong></button>
      <button style={starButtonStyles} type="button" value="★">★</button>
    </div>
  );
};

export default AddToCartForm;