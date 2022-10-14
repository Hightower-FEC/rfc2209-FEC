import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { URL } from '../../../config/config.js';

const QuestionsAnswers = ({productID}) => {
  // productID = 66642
  const [questions, setQuestions] = useState([]);

  // Helper function to send a GET request to questions endpoint using the productID as the params and setting the questions state to the result
  const getQuestions = () => {
    axios.get(`${URL}/qa/questions`, {
      params: {
        product_id: 66645
      }
    })
      .then((response) => {
        // Data is array of objects where each object contains properties for a question like question_body, question_date, answers (object), etc
        let allQuestions = response.data.results;
        console.log('Success GET: ', allQuestions); // Success log
        setQuestions(allQuestions);
        // return allQuestions;
      })
      .catch((err) => {
        console.log('Failed GET: ', err);
      });
  };


  // Fetch questions for product id upon page render
  useEffect(() => {
    getQuestions();
  }, []);

  // Function to filter the questions array based on the search term
  const handleSearch = (search) => {
    console.log('Inside handle search: ', search);
  };

  // Function to render the rest of the questions
  const moreQuestions = () => {
    console.log('Render more questions');
  };

  // Function to render modal
  const addQuestion = () => {
    console.log('Modal pop up');
  };


  return (
    <div>
      <h1>Questions and Answers</h1>
      <Search handleSearch={handleSearch}/>
      <QuestionList questions={questions} />
      <button id='more-questions' onClick={moreQuestions}>More Answered Questions</button>
      <button id='add-question' onClick={addQuestion}>Add A Question</button>
    </div>
  );
};

// Sub-component: Search Bar
const Search = ({handleSearch}) => {
  // Set search state to an empty string
  const [search, setSearch] = useState('');


  const handleSubmit = ((e) => {
    e.preventDefault();
    console.log('Submit search for: ', search);
    handleSearch(search);
    setSearch('');
  });

  return (
    <form onSubmit={handleSubmit}>
      <input id='search' onChange={((e) => setSearch(e.target.value))} value = {search} placeholder ='Have a question? Search for answers...' />
      <button type='submit'>🔍︎</button>
    </form>
  );
};

// Sub-component: QuestionsList
// By default, load up to FOUR questions on page render
const QuestionList = ({questions}) => {

  return (
    questions.map((question, i) => <QuestionEntry question={question} key={i}/>)
  );
};

// Sub-component for QuestionList: QuestionEntry
const QuestionEntry = ({question, i}) => {

  return (
    <div>
      <strong> Q: {question.question_body} </strong>
      <span> Helpful? <a>Yes</a> ({question.question_helpfulness}) | <a>Add Answer</a> </span>
      <AnswerList answers = {question.answers}/>
    </div>
  );
};

// Sub-component for QuestionEntry: AnswerList
// Up to TWO answers should be display for each question
const AnswerList = ({answers}) => {
  console.log('Inside answers list: ', answers);
  let answerIDs = Object.keys(answers);

  return (
    <div>
      <strong > A: </strong>
      <span>{answerIDs.map((id, i) => <AnswerEntry answer={answers[id]} key={i} />)} </span>
    </div>
  );
};

// Sub-component for AnswerList: AnswerEntry
const AnswerEntry = ({answer}) => {
  // console.log('Inside answer entry');

  return (
    <div>
      {answer.body} <br />
      <sub>
        by {answer.answerer_name}, {answer.date} | Helpful? Yes ({answer.helpfulness}) | Report
      </sub>
    </div>
  );
};

export default QuestionsAnswers;