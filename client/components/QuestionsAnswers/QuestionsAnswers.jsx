import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { URL } from '../../../config/config.js';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import QuestionModal from './QuestionModal.jsx';


const QuestionsAnswers = ({productID}) => {
  // productID = 66642;
  // For testing different products
  let testID = 66641;
  // Questions array state
  const [questions, setQuestions] = useState([]);
  // Product name state
  const [name, setName] = useState('');
  // Question modal state
  const [showQModal, setQShow] = useState(false);
  // Count questions to render
  const [count, setCount] = useState(1);
  // Renders two questions at a time
  let increment = 2;

  // Get product name for question modal
  const getProductName = () => {
    axios.get(`${URL}/products/${testID}`)
      .then((response) => {
        setName(response.data.name);
      })
      .catch((err) => {
        console.log('Failed to get product name', err);
      });
  };

  // Helper function to send a GET request to questions endpoint using the productID as the params and setting the questions state to the result
  const getQuestions = () => {
    axios.get(`${URL}/qa/questions`, {
      params: {
        product_id: testID
      }
    })
      .then((response) => {
        // Data is array of objects where each object contains properties for a question like question_body, question_date, answers (object), etc
        let allQuestions = response.data.results;
        // Sort the questions array based on the descending helpfulness
        let sortQuestions = allQuestions.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
        // console.log('Sort questions by helpfulness: ', sortQuestions);
        setQuestions(sortQuestions);
      })
      .catch((err) => {
        console.log('Failed GET: ', err);
      });
  };

  // Fetch questions and product name for id upon page render
  useEffect(() => {
    getQuestions();
    getProductName();
  }, []);

  // Function to filter the questions array based on the search term
  const handleSearch = (search) => {
    console.log('Inside handle search:', search);
  };

  //----- Expand Question List Functionality -----
  // console.log('Question count', count);
  // console.log('Total questions: ', questions);
  // Helper function to slice the list in increments of two
  const expandQuestionList = (count, increment) => {
    return questions.slice(0, count * increment);
  };
  let currentList = expandQuestionList(count, increment);

  // Helper function to show and hide the question list button
  const showMoreQuestionButton = (count, increment) => {
    return (count * increment) < questions.length;
  };
  //---------------------------------------------

  // Helper function to submit question from modal
  const submitQuestion = (questionObj) => {
    console.log('Question from modal', questionObj);
  };
  // Helper function to submit question from modal
  const submitAnswer = (answerObj) => {
    console.log('Answer from modal', answerObj);
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
        name={name}
        questions={currentList}
        submitAnswer={submitAnswer}
        handleQuestionHelpful={handleQuestionHelpful}
        handleAnswerHelpful={handleAnswerHelpful}
      />

      {(showMoreQuestionButton(count, increment)) &&
      (<button className='moreQuestions' onClick={() => setCount(count + 1)}>More Answered Questions</button>)}

      <button className='questionModal' onClick={() => setQShow(true)}>Add A Question</button>

      <QuestionModal
        name={name}
        showQModal={showQModal}
        onClose={() => setQShow(false)}
        submitQuestion={submitQuestion}
      />
    </div>
  );
};


export default QuestionsAnswers;