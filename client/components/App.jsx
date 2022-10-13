import React from 'react';

import TopBar from './TopBar.jsx';
import Overview from './Overview/Overview.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';

const { useState, useEffect } = React;

const App = () => {
  const [currentProduct, setCurrentProduct] = useState(null);

  return (
    <div>
      <TopBar/>
      <Overview/>
      <QuestionsAnswers/>
      <RatingsReviews/>
      <RelatedItems/>
    </div>
  );
};

export default App;