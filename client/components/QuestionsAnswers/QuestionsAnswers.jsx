import React, {useState, useEffect} from 'react';

const QuestionsAnswers = ({productID}) => {
  // productID = 66642


  const getQuestions = () => {

  };
  const getAnswers = () => {

  };

  return (
    <div>
      <h1>Questions and Answers</h1>
      <Search />
    </div>
  );
};

const Search = () => {
  // Set search state to an empty string
  const [search, setSearch] = useState('');

  const handleSearch = ((e) => {
    e.preventDefault();
    console.log('Submit search for: ', search);
    setSearch('');
  });

  return (
    <form onSubmit={handleSearch}>
      <input id='search' onChange={((e) => setSearch(e.target.value))} value = {search} placeholder ='Have a question? Search for answers...' />
      <button type='submit'>🔍︎</button>
    </form>
  );
};

const QuestionList = ({}) => {

};


export default QuestionsAnswers;