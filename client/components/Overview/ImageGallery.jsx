import React from 'react';

const exampleData = [
  {
    imageId: 'https://unsplash.com/photos/jLEGurepDco'
  },
  {
    imageId: 'https://unsplash.com/photos/J2-wAQDckus'
  },
  {
    imageId: 'https://unsplash.com/photos/j1GiPlvSGWI'
  }
];

const ImageGallery = () => {

  return (
    <div>
      <img src={exampleData[0].imageId}></img>
      {exampleData.map((image) => {
        return <img src={imageId}/>;
      })}
    </div>
  );
};

export default ImageGallery;