import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { URL } from '../../../config/config.js';
// import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import QuestionModal from './QuestionModal.jsx';


const QuestionsAnswers = ({productID}) => {
  // productID = 66642;
  // For testing different products
  let testID = 66641;
  let testPage = 1;

  // Product name state
  const [name, setName] = useState('');
  // Sorted questions state
  const [questions, setQuestions] = useState([]);
  // Searched questions state
  const [found, setFound] = useState([]);
  // Search term state
  const [query, setQuery] = useState('');
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
        product_id: testID,
        page: testPage
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
  // const handleSearch = (search) => {
  //   console.log('Inside handle search:', search);
  // };

  //----- Expand Question List Functionality -----
  // console.log('Question count', count);
  // console.log('Total questions: ', questions);
  // Helper function to slice the list in increments of two
  const expandQuestionList = (list, count, increment) => {
    return list.slice(0, count * increment);
  };
  // let currentList = expandQuestionList(questions, count, increment);

  // Helper function to show and hide the question list button
  const showMoreQuestionButton = (count, increment) => {
    return (count * increment) < questions.length;
  };
  //---------------------------------------------

  // Helper function to submit question from modal
  const submitQuestion = (questionObj) => {
    console.log('Question from modal', questionObj);
    // setQuestions([questionObj, ...questions]);
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


  // Function to filter questions list in real time
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    const results = questions.filter(question => {
      if (e.target.value.length > 2) {
        return question.question_body.toLowerCase().includes(e.target.value.toLowerCase());
      }
    });

    // Future Enhancement of highlighting search word in real time
    // results.map(question => {
    //   let newQuestion = question.question_body.replace(
    //     new RegExp(e.target.value, 'g'),
    //     match => `<mark>${match}</mark>`);
    //   return newQuestion;
    // });

    (results.length > 0) && console.log('Filter results: ', results);
    setFound(results);
  };

  // Function to switch between the default list and the filter list if the query has 3 or more characters in the search input
  const switchList = (searchStr) => {
    return searchStr.length <= 2 ?
      expandQuestionList(questions, count, increment) :
      expandQuestionList(found, count, increment);
  };

  const Search = ({handleSearch}) => {
    //  const [search, setSearch] = useState('');
    const handleSubmit = ((e) => {
      e.preventDefault();
      console.log('Submit search for: ', search);
      handleSearch(search);
      setSearch('');
    });

    return (
      <form onSubmit={handleSubmit}>
        <input id='search' onChange={handleInputChange} value={query} placeholder ='Have a question? Search for answers...' />
        <button type='submit'>🔍︎</button>
      </form>
    );
  };

  const searchField = {
    justifyContent: 'center',
    margin: 'auto',
    width: '50%'
  };
  const searchBtn = {

  };

  return (
    <div >
      <h1>Questions and Answers</h1>
      {/* <Search handleSearch={handleSearch}/> */}
      <div >
        <form onSubmit={(e) => e.preventDefault()}>
          <input type='search' value={query} onChange={handleInputChange} placeholder ='Have a question? Search for answers...' style={searchField}/>
          <button type='submit' style={searchBtn}>🔍︎</button>
        </form>
      </div>
      <QuestionList
        name={name}
        questions={switchList(query)}
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