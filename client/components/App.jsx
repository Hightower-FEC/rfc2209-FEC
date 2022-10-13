<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import axios from 'axios';


import TopBar from './TopBar.jsx';
import Overview from './Overview/Overview.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';

import { API_KEY, URL } from '../../config/config.js';

const App = () => {
  const [currentProductID, setCurrentProductID] = useState();

  useEffect(() => {
    axios.get(`${URL}/products`, {
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

=======
import React from 'react';
import RelatedItems from './RelatedItems.jsx';

const App = () =>{
  return (
    <>
      <h1>
        Welcome to React App thats build using Webpack and Babel separately
      </h1>
      <RelatedItems />
    </>
  );
};

>>>>>>> 24d997be26229768af22eacc5ed48e0bdcb23736
export default App;