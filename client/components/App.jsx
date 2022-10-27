import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar.jsx';
import Overview from './Overview/Overview.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import ScrollToTop from './Scroll/ScrollToTop.jsx';
import Results from './Results.jsx';

const App = () => {
  const [currentProduct, setCurrentProduct] = useState();
  const [reviewMetaData, setReviewMetaData] = useState();
  const [searchResults, setSearchResults] = useState([]);

  /**
   * Initialize currentProduct to arbitary product on app start
   */
  useEffect(() => {
    axios.get('/products/66646')
      .then((response) => {
        setCurrentProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /**
   * Update review meta data on product change
   */
  useEffect(() => {
    if (currentProduct) {
      axios.get(`/reviews/meta?product_id=${currentProduct.id}`)
        .then((response) => {
          setReviewMetaData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentProduct]);

  /**
   * Sets currentProduct to the related item that was clicked
   * @param productClicked: product to change currentProduct to
   */
  const handleRelatedItemClick = (productClicked) => {
    setCurrentProduct(productClicked);
  };

  // Function to track and send user click activity
  const interactions = (e, widget) => {
    let date = new Date();
    let currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // Track: element of the page which was clicked, time of click, module clicked
    let interaction = {
      element: e.target,
      time: currentTime,
      module: widget
    };
    console.log('Click info:', interaction);
  };

  if (currentProduct && searchResults.length === 0) {
    return (
      <div >
        <TopBar searchResults={searchResults} setSearchResults={setSearchResults}/>
        <Overview currentProduct={currentProduct} reviewMetaData={reviewMetaData} interactions={interactions}/>
        <RelatedItems currentProduct={currentProduct} handleRelatedItemClick={handleRelatedItemClick} interactions={interactions}/>
        <QuestionsAnswers currentProduct={currentProduct} interactions={interactions}/>
        <RatingsReviews currentProduct={currentProduct} reviewMetaData={reviewMetaData} interactions={interactions}/>
        <ScrollToTop />
      </div>
    );
  }

  if (searchResults.length > 1) {
    return (
      <>
        <TopBar />
        <Results results={searchResults.slice(0, 10)} />
      </>
    );
  }

  return (
    // <TopBar/>
    <div></div>
  );
};

export default App;