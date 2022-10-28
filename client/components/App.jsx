import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar.jsx';
import Overview from './Overview/Overview.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import ScrollToTop from './Scroll/ScrollToTop.jsx';
import ResultsList from './ResultsList.jsx';

const App = () => {
  const [currentProduct, setCurrentProduct] = useState();
  const [reviewMetaData, setReviewMetaData] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);

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

  //Cache all the products so that the entire catalogue can be iterated with each search entry
  useEffect(() => {
    axios.get('/products?count=1011')
      .then((response) => {
        setSearchResults(response.data);
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

  const submitEntry = (text) => {
    event.preventDefault();
    console.log('search results', searchResults);
    let results = [];
    const allItems = searchResults.slice();
    allItems.forEach((item) => {
      if (item.category.toLowerCase() === text.toLowerCase() || item.name.toLowerCase() === text.toLowerCase()) {
        results.push(item);
      }
    });
    setCurrentResults(results);
  };

  // useEffect(() => {
  //   console.log('search results', searchResults.slice());
  // }, [searchResults]);

  if (currentProduct && currentResults.length === 0) {
    return (
      <div >
        <TopBar submitSearch={submitEntry} />
        <Overview currentProduct={currentProduct} reviewMetaData={reviewMetaData} interactions={interactions}/>
        <RelatedItems currentProduct={currentProduct} handleRelatedItemClick={handleRelatedItemClick} interactions={interactions}/>
        <QuestionsAnswers currentProduct={currentProduct} interactions={interactions}/>
        <RatingsReviews currentProduct={currentProduct} reviewMetaData={reviewMetaData} interactions={interactions}/>
        <ScrollToTop />
      </div>
    );
  }

  if (currentResults.length > 1) {
    return (
      <>
        <TopBar />
        <div style={{height: '150px'}}></div>
        <ResultsList results={currentResults} />
        <ScrollToTop />
      </>
    );
  }

  return (
    // <TopBar/>
    <div></div>
  );
};

export default App;