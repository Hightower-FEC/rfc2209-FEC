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

  useEffect(() => {
    axios.get(`${URL}/products`)
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
        <Overview productID={currentProductID}/>
        <QuestionsAnswers productID={currentProductID}/>
        <RatingsReviews productID={currentProductID}/>
        <RelatedItems productID={currentProductID}/>
      </div>
    );
  }

  return (
    <TopBar/>
  );
};

export default App;