import React from "react";

import TopBar from './TopBar.jsx';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';

const App = () =>{
  return (
    <div>
      <TopBar/>
      <ProductDetail/>
      <QuestionsAnswers/>
      <RatingsReviews/>
      <RelatedItems/>
    </div>
  );
};

export default App;