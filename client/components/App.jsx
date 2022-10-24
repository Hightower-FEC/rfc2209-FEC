import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TopBar from './TopBar.jsx';
import Overview from './Overview/Overview.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import ScrollToComponent from './Scroll/ScrollToComponent.jsx';

import { URL } from '../../config/config.js';

const App = () => {
  const [currentProductID, setCurrentProductID] = useState();

  useEffect(() => {
    console.log('id:', currentProductID);
  });

  useEffect(() => {
    axios.get(`${URL}/products`)
      .then((response) => {
        setCurrentProductID(response.data[4].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRelatedItemClick = (id) => {
    setCurrentProductID(id);
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

    // axios.post('[INSERT URL]', interaction)
    //   .then(res => console.log('Sent interaction'))
    //   .catch(err => console.log('Failed to send interaction', err));
  };

  if (currentProductID) {
    return (
      <div >
        <TopBar/>
        <Overview productID={currentProductID} interactions={interactions}/>
        <ScrollToComponent />
        <RelatedItems productID={currentProductID} handleRelatedItemClick={handleRelatedItemClick} interactions={interactions}/>
        <QuestionsAnswers productID={currentProductID} interactions={interactions}/>
        <RatingsReviews productID={currentProductID}/>
      </div>
    );
  }

  return (
    // <TopBar/>
    <div></div>
  );
};

export default App;