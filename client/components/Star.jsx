import React from 'react';

const Star = ({backgroundColor, onMouseEnter, onMouseLeave, onClick})=>{
  backgroundColor = backgroundColor || '#f1f1f1';
  return (
    <svg id="eHPDQqGymj41" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shapetendering="geometricPrecision" texttendering="geometricPrecision"
      onMouseEnter={() => {
        onMouseEnter();
      }}
      onMouseLeave={() => {
        onMouseLeave();
      }}
      onClick={()=> {
        onClick();
      }}>
      <polygon points="0,-11.000438 10.462038,-3.399322 6.465895,8.899541 -6.465895,8.899541 -10.462038,-3.399322 0,-11.000438" transform="translate(26.6 17.609597)" strokeWidth="0"/>

      <polygon points="0,-11.000438 10.462038,-3.399322 6.465895,8.899541 -6.465895,8.899541 -10.462038,-3.399322 0,-11.000438" transform="translate(20.81441 0.6)" strokeWidth="0"/>

      <polygon points="0,-11.000438 10.462038,-3.399322 6.465895,8.899541 -6.465895,8.899541 -10.462038,-3.399322 0,-11.000438" transform="translate(-2.5 17.65)" strokeWidth="0"/>

      <polygon points="0,-11.000438 10.462038,-3.399322 6.465895,8.899541 -6.465895,8.899541 -10.462038,-3.399322 0,-11.000438" transform="translate(12 28.25)" strokeWidth="0"/>

      <polygon points="0,-11.000438 10.462038,-3.399322 6.465895,8.899541 -6.465895,8.899541 -10.462038,-3.399322 0,-11.000438" transform="translate(12 28.729699)" fill={backgroundColor} strokeWidth="0"/><polygon points="0,-11.000438 10.462038,-3.399322 6.465895,8.899541 -6.465895,8.899541 -10.462038,-3.399322 0,-11.000438" transform="matrix(1.017059 0 0 1.025565 27.202182 17.86805)" fill={backgroundColor} strokeWidth="0"/>

      <polygon points="0,-11.000438 10.462038,-3.399322 6.465895,8.899541 -6.465895,8.899541 -10.462038,-3.399322 0,-11.000438" transform="translate(3.090448 0.6)" strokeWidth="0"/>

      <polygon points="0,-11.000438 10.462038,-3.399322 6.465895,8.899541 -6.465895,8.899541 -10.462038,-3.399322 0,-11.000438" transform="matrix(1.017059 0 0 1.025565-3.200588 17.86805)" fill={backgroundColor} strokeWidth="0"/>

      <polygon points="0,-11.000438 10.462038,-3.399322 6.465895,8.899541 -6.465895,8.899541 -10.462038,-3.399322 0,-11.000438" transform="matrix(1.017059 0 0 1.025565 21.284288-.045271)" fill={backgroundColor} strokeWidth="0"/>

      <polygon points="0,-11.000438 10.462038,-3.399322 6.465895,8.899541 -6.465895,8.899541 -10.462038,-3.399322 0,-11.000438" transform="matrix(1.017059 0 0 1.025565 2.620571-.045271)" fill={backgroundColor} strokeWidth="0"/>
    </svg>

  );
};

export default Star;
