import React, {useState} from 'react';

const ResultsList = ({results}) => {
  const [image, setImage] = useState([]);

  // useEffect(() => {
  //   axios.get(`/products/${}`)
  //     .then((response) => {
  //       setRelatedProduct(response.data);
  //     })
  //     .then(() => {
  //       axios.get(`/products/${product}/styles`)
  //         .then((response) => {
  //           setImage(response.data.results[0].photos[0].url);
  //           setSalePrice(response.data.results[0].sale_price);
  //         });
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  return (
    <>
      <div className="results">
        {results.slice(0, 5).map((result, key) => {
          return (
            <div className="results-card">
              <div>{result.name}</div>
              <div>{result.description}</div>
              <div>{result.default_price}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ResultsList;