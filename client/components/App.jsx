import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar.jsx';
import Overview from './Overview/Overview.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';

import { URL } from '../../config/config.js';

const App = () => {
  const [currentProductID, setCurrentProductID] = useState();

  //Why is this useEffect needed when a random number could be assigned as default state?
  useEffect(() => {
    console.log('id:', currentProductID);
  });

  useEffect(() => {
    axios.get(`${URL}/products`)
      .then((response) => {
        setCurrentProductID(response.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRelated = (id) => {

    setCurrentProductID(id);
  };

  if (currentProductID) {
    return (
      <div>
        <TopBar/>
        <Overview productID={currentProductID}/>
        <RelatedItems productID={currentProductID} handleRelatedItemClick={handleRelatedItemClick}/>
        <QuestionsAnswers productID={currentProductID}/>
        <RatingsReviews productID={currentProductID}/>
        <RelatedItems productID={currentProductID} handleRelated={handleRelated}/>
      </div>
    );
  }

  //What is this supposed to do?
  return (
    <TopBar/>
  );
};

export default App;