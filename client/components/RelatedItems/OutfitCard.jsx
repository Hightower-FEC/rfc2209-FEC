import React, {useState, useEffect} from 'react';
import axios from 'axios';

const OutfitCard = ({width, outfit, handleAddOutfitClick}) => {
  const [image, setImage] = useState("https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80");
  const [salePrice, setSalePrice] = useState(null);

  console.log('this is outfit', outfit)

  // useEffect(() => {
  //   axios.get(`${URL}/products/${outfit}/styles`)
  //     .then((response) => {
  //       console.log('this is the response for image', response.data.results[0].photos[0].url);
  //       setImage(response.data.results[0].photos[0].url);
  //       setSalePrice(response.data.results[0].sale_price);
  //     })
  //     .catch(error => console.log(error));
  // }, [outfit]);

  return (
    <>
      <div className="product-card" style={{width: width, backgroundImage: `url(${image})`}}>
        <div className="upper-half" /*style={{backgroundImage: `url(${image})`}}*/>
          <span id="favorite-related"><strong>✩</strong></span>
        </div>
        <div className="bottom-half">
          <div className="category">{outfit.category}</div>
          <div><strong>{outfit.name}</strong></div>
          <div className="default-price">{outfit.default_price}</div>
        </div>
      </div>
    </>
  );
};

export default OutfitCard;