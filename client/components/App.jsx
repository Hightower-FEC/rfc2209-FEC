import React, {useState, useEffect} from 'react';
import axios from 'axios';


import TopBar from './TopBar.jsx';
import Overview from './Overview/Overview.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';

import { API_KEY, BASE_URL, CAMPUS_CODE } from '../../config/config.js';

const App = () => {
  const [currentProductID, setCurrentProductID] = useState();

  useEffect(() => {
    axios.get(`${BASE_URL}/${CAMPUS_CODE}/products`, {
      headers: {
        'Authorization': API_KEY
      }})
      .then((response) => {
        setCurrentProductID(response.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  if (currentProductID) {
    return (
      <div>
        <TopBar/>
        <Overview product={currentProductID}/>
        <QuestionsAnswers product={currentProductID}/>
        <RatingsReviews product={currentProductID}/>
        <RelatedItems product={currentProductID}/>
      </div>
    );
  }

  return (
    <TopBar/>
  );
};

export default App;