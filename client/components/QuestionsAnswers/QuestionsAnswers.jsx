import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { URL } from '../../../config/config.js';
import QuestionList from './QuestionList.jsx';
import QuestionModal from './QuestionModal.jsx';


const QuestionsAnswers = ({productID, interactions}) => {

  // For testing different products
  let testID = 66641;
  let testCount = 500;

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
  // console.log('All questions:', questions);

  //----- Expand Question List Functionality -----
  // console.log('Question count', count);
  // console.log('Total questions: ', questions);
  // Helper function to slice the list in increments of two
  const expandQuestionList = (list, count, increment) => {
    return list.slice(0, count * increment);
  };
  // Function to switch between the default list and the filter list if the query has 3 or more characters in  search input
  const switchList = (searchStr) => {
    return searchStr.length < 3 ?
      expandQuestionList(questions, count, increment) :
      expandQuestionList(found, count, increment);
  };

  // Helper function to show and hide the question list button
  const showMoreQuestionButton = (query, count, increment) => {
    return (query.length <= 2) ? (count * increment) < questions.length : (count * increment) < found.length;
  };
  //---------------------------------------------

  //---- Submitting Questions and Answers ----
  // Helper function to submit question from modal
  const submitQuestion = (question) => {
    // Receive a 201 status upon successful question submission
    axios.post(`${URL}/qa/questions`, {
      body: question.body,
      name: question.asker,
      email: question.email,
      product_id: question.productID
    })
      .then((res) => {
        console.log('Submitted question! Response:', res);
        getQuestions();
      })
      .catch((err) => {
        console.log('Failed to submit question');
      });
  };
  // Helper function to submit question from modal
  const submitAnswer = (questionId, answerObj) => {
    // Receive a 201 status upon successful answer submission
    axios.post(`${URL}/qa/questions/${questionId}/answers`, {
      body: answerObj.body,
      name: answerObj.answerer_name,
      email: answerObj.answerer_email,
      photos: answerObj.photos
    })
      .then((res) => {
        console.log('Submitted answer! Response:', res);
        getQuestions();
      })
      .catch((err) => console.log('Failed to submit answer. Error:', err));
  };

  // -------------- Upvote Helpulness -----------
  // Send a PUT request to update the question's helpfulness
  const handleQuestionHelpful = (questionId) => {
    // Receive a 204 status upon successful PUT request
    axios.put(`${URL}/qa/questions/${questionId}/helpful`)
      .then((res) => console.log(`Marked question id ${questionId} helpful. Response: `, res))
      .catch((err) => console.log(`Could not mark question id ${questionId} helpful. Error: `, err));
  };
  // Send a PUT request to update the answer's helpfulness
  const handleAnswerHelpful = (answerId) => {
    // Receive a status 204 upon successful PUT request
    axios.put(`${URL}/qa/answers/${answerId}/helpful`)
      .then((res) => console.log(`Marked answer id ${answerId} helpful. Response: `, res))
      .catch((err) => console.log(`Could not mark answer id ${answerId} helpful. Error: `, err));
  };

  // -------------- Report to Admin  -----------
  // Send a PUT request to report the question
  const handleQuestionReport = (questionId) => {
    // Receive a status 204 upon successful PUT request
    axios.put(`${URL}/qa/questions/${questionId}/report`)
      .then((res) => console.log(`Reported question id ${questionId} to admin. Response:`, res))
      .catch((err) => console.log(`Could not report question id ${questionId} to admin. Error: `, err));
  };
  // Send a PUT request to report the answer
  const handleAnswerReport = (answerId) => {
    // Receive a status 204 upon successful PUT request
    axios.put(`${URL}/qa/answers/${answerId}/report`)
      .then((res) => console.log(`Reported answer id ${answerId} to admin. Response:`, res))
      .catch((err) => console.log(`Could not report answer id ${answerId} to admin. Error: `, err));
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


  // --------------- CSS Style ---------------
  const container = {
    textAlign: 'left',
    margin: '80px 10rem 0 10rem'
  };
  const searchField = {
    display: 'inline-block',
    textAlign: 'left',
    margin: '0 0 0 0',
    height: '30px',
    width: '100%',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid rgba(0, 0, 0, 0.4)',
    padding: '20px 10px 20px 10px'
  };
  const moreQuestionsBtn = {
    display: 'inline-block',
    margin: '10px 20px 0 0',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    width: '33%',
    height: '30px'
  };
  const addQuestionBtn = {
    display: 'inline-block',
    margin: '10px 20px 0 0',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    width: '20%',
    height: '30px'
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
      <h1 style={{fontSize: '30px'}} >Questions & Answers</h1>
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
        handleQuestionReport={handleQuestionReport}
        handleAnswerHelpful={handleAnswerHelpful}
        handleAnswerReport={handleAnswerReport}
      />

      {(showMoreQuestionButton(query, count, increment)) &&
      (<button data-testid='more-questions' className='black-button QA-buttons' onClick={() => setCount(count + 1)}>MORE ANSWERED QUESTIONS</button>)}

      <button data-testid='question-modal' className='black-button QA-buttons' onClick={() => setQShow(true)}>ADD A QUESTION +</button>

      <QuestionModal
        name={name}
        productID={productID}
        showQModal={showQModal}
        onClose={() => setQShow(false)}
        submitQuestion={submitQuestion}
      />
    </div>
  );
};


export default QuestionsAnswers;