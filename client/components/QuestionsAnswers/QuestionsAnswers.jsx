import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { URL } from '../../../config/config.js';
import QuestionList from './QuestionList.jsx';
import Search from './Search.jsx';
import QuestionModal from './QuestionModal.jsx';

const QuestionsAnswers = ({productID}) => {
  // productID = 66642
  // Questions array state
  const [questions, setQuestions] = useState([]);
  // Product name state
  const [name, setName] = useState('');
  // Question modal state
  const [showQModal, setQShow] = useState(false);
  // Answer modal state
  const [showAModal, setAShow] = useState(false);

  // Get product name for question modal
  const getProductName = () => {
    axios.get(`${URL}/products/${productID}`)
      .then((response) => {
        setName(response.data.name);
        // console.log('Product name', response.data.name);
      })
      .catch((err) => {
        console.log('Failed to get product name', err);
      });
  };

  // Helper function to send a GET request to questions endpoint using the productID as the params and setting the questions state to the result
  const getQuestions = () => {
    axios.get(`${URL}/qa/questions`, {
      params: {
        product_id: 66646
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
    getProductName();
  }, []);

  // Function to filter the questions array based on the search term
  const handleSearch = (search) => {
    console.log('Inside handle search:', search);
  };

  // Function to render the rest of the questions
  const moreQuestions = () => {
    console.log('Render more questions');
  };

  // Helper Function to render modal
  const addQuestion = () => {
    console.log('Modal pop up');
  };

  // Helper function to submit question from modal
  const submitQuestion = (questionObj) => {
    console.log('Question from modal', questionObj)
  };

  // Send a PUT request to update the question's helpfulness
  const handleQuestionHelpful = (questionId, helpful) => {
    let isHelpful = helpful ? 'helpful' : 'not helpful';
    console.log(`Marked question id ${questionId} ${isHelpful}`);
  };

  // Send a PUT request to update the answer's helpfulness
  const handleAnswerHelpful = (answerId, helpful) => {
    let isHelpful = helpful ? 'helpful' : 'not helpful';
    console.log(`Marked answer id ${answerId} ${isHelpful}`);
  };

  return (
    <div >
      <h1>Questions and Answers</h1>
      <Search handleSearch={handleSearch}/>
      <QuestionList
        questions={questions}
        handleQuestionHelpful={handleQuestionHelpful}
        handleAnswerHelpful={handleAnswerHelpful} />
      <button className='moreQuestions' onClick={moreQuestions}>More Answered Questions</button>
      <button className='addQuestion' onClick={()=> setQShow(true)}>Add A Question</button>
      <QuestionModal
        name={name}
        showQModal={showQModal}
        onClose={() => setQShow(false)}
        submitQuestion={submitQuestion}/>
    </div>
  );
};


export default QuestionsAnswers;