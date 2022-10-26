import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { URL } from '../../../config/config.js';
import QuestionList from './QuestionList.jsx';
import QuestionModal from './QuestionModal.jsx';


const QuestionsAnswers = ({productID, interactions}) => {
  // default productID = 66642

  // For testing different products
  let testID = 66641;
  let testCount = 10;

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
    axios.get(`${URL}/products/${productID}`)
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
        count: 10
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

  // Fetch questions and product name for id upon page render and when productID changes
  useEffect(() => {
    getQuestions();
    getProductName();
  }, [productID]);


  //----- Expand Question List Functionality -----
  // console.log('Question count', count);
  // console.log('Total questions: ', questions);
  // Helper function to slice the list in increments of two
  const expandQuestionList = (list, count, increment) => {
    return list.slice(0, count * increment);
  };
  // let currentList = expandQuestionList(questions, count, increment);

  // Helper function to show and hide the question list button
  const showMoreQuestionButton = (query, count, increment) => {
    return (query.length <= 2) ? (count * increment) < questions.length : (count * increment) < found.length;
  };
  //---------------------------------------------

  //------------------ TO DO ---------------------
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
  //---------------------------------------------

  // Function to filter questions list in real time
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    const results = questions.filter(question => {
      if (e.target.value.length > 2) {
        return question.question_body.toLowerCase().includes(e.target.value.toLowerCase());
      }
    });
    // console.log('Before regex Question', results);
    (results.length > 0) && console.log('Filtered questions: ', results);
    setFound(results);

    // Future Enhancement of highlighting search word in real time
    // let oldTexts = document.getElementsByClassName('question-body');
    // console.log('getElements', oldTexts);
    // for (let i = 0; i < oldTexts.length; i++) {
    //   if (e.target.value.length >= 0) {
    //     let text = oldTexts[i];
    //     let re = new RegExp(e.target.value, 'g');
    //     let newText = text.innerText.replace(re, `<mark>${e.target.value}</mark>`);
    //     text.innerHTML = newText;
    //   }
    // }
  };

  // const highlightWord = (e) => {
  //   let oldTexts = document.getElementsByClassName('question-body');
  //   console.log('getElements', oldTexts);
  //   for (let i = 0; i < oldTexts.length; i++) {
  //     if (e.target.value.length >= 0) {
  //       let text = oldTexts[i];
  //       let re = new RegExp(e.target.value, 'g');
  //       let newText = text.innerText.replace(re, `<mark>${e.target.value}</mark>`);
  //       text.innerHTML = newText;
  //     }
  //   }
  // };
  // useEffect(() => {
  //   console.log('useEffect', query);
  //   highlightWord(query);
  // }, [query]);

  // Function to switch between the default list and the filter list if the query has 3 or more characters in the search input
  const switchList = (searchStr) => {
    return searchStr.length <= 2 ?
      expandQuestionList(questions, count, increment) :
      expandQuestionList(found, count, increment);
  };

  // --------------- CSS Style ---------------
  const container = {
    textAlign: 'left',
    margin: '0 10rem 0 10rem'
  };
  const searchField = {
    display: 'inline-block',
    textAlign: 'left',
    margin: '0 0 1rem 0',
    height: '50px',
    width: '100%',
    fontSize: '24px'
  };
  const moreQuestionsBtn = {
    display: 'inline-block',
    margin: '10px 20px 0 0',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    width: '33%',
    height: '60px'
  };
  const addQuestionBtn = {
    display: 'inline-block',
    margin: '10px 20px 0 0',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    width: '20%',
    height: '60px'
  };
  const noQuestionMsg = {
    display: 'block',
    textAlign: 'center',
    margin: '2rem 0 2rem 0',
    justifyContent: 'center',
    fontSize: '2em'
  };
  //---------------------------------------------

  return (
    <div style={container} onClick={(e)=>interactions(e, 'QuestionsAnswers')}>
      <h1 >Questions and Answers</h1>
      <div >
        {questions.length > 0 ?
          (<form onSubmit={(e) => e.preventDefault()}>
            <input type='search' value={query} onInput={handleInputChange} placeholder =' Have a question? Search for answers...' style={searchField}/>
          </form>) :
          (<span style={noQuestionMsg}>
            No questions for this product yet. Be the first to add one!
          </span>)
        }
      </div>
      <QuestionList
        name={name}
        questions={switchList(query)}
        submitAnswer={submitAnswer}
        handleQuestionHelpful={handleQuestionHelpful}
        handleAnswerHelpful={handleAnswerHelpful}
      />

      {(showMoreQuestionButton(query, count, increment)) &&
      (<button className='moreQuestions' onClick={() => setCount(count + 1)} style={moreQuestionsBtn}>MORE ANSWERED QUESTIONS</button>)}

      <button className='questionModal' onClick={() => setQShow(true)} style={addQuestionBtn}>ADD A QUESTION +</button>

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