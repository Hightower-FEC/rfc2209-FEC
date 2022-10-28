import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ResultsCard = ({result, onClick}) => {
  const [card, setCard] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`/products/${result.id}`)
      .then((response) => {
        setCard(response.data);
      })
      .then(() => {
        axios.get(`/products/${result.id}/styles`)
          .then((response) => {
            setImage(response.data.results[0].photos[0].url);
          });
      })
      .catch(err => console.log(err));
  }, [result]);

  return (
    <>
      <div className="results-card" style={{backgroundImage: `url(${image})`}} onClick={() => {
        onClick(card);
      }}>
        <div>{result.name}</div>
        <div>{result.default_price}</div>
        <div className="blank"></div>
        <div>{result.description}</div>
      </div>
    </>
  );
};

export default ResultsCard;