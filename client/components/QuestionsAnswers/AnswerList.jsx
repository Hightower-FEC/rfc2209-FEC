import React, {useState, useEffect} from 'react';
import AnswerEntry from './AnswerEntry.jsx';

// Sub-component for QuestionEntry: AnswerList
// Up to TWO answers should be display for each question
const AnswerList = ({answers, handleAnswerHelpful, handleAnswerReport}) => {

  const [count, setCount] = useState(1);
  // Number of answers to render at a time
  let increment = 2;

  // Collect all the answers and store in an array
  let allAnswers = Object.values(answers);
  // Sort answers by descending order
  let sortAnswers = allAnswers.sort((a, b) => b.helpfulness - a.helpfulness);
  // console.log('Total answers: ', sortAnswers);

  // console.log('Answer count', count);
  // Helper function to slice the list in increments of two
  const expandAnswerList = (count, increment) => {
    return sortAnswers.slice(0, count * increment);
  };
  let currentList = expandAnswerList(count, increment);

  // Helper function to reset the count to 1 for collapsing answer
  const collapseAnswers = (e) => {
    e.preventDefault();
    setCount(1);
  };
  // Helper function to show or hide the link
  const showMoreAnswerLink = (count, increment) => {
    return (count * increment) < sortAnswers.length;
  };

  // Helper function to upvote the helpfulness rating
  const moreAnswers = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };
  // Helper function to show the answer list if there is at least one answer
  const hasAnswer = () => {
    return sortAnswers.length > 0;
  };

  const answerStyle = {
    display: 'block',
    margin: '10px 0',
    fontSize: '16px'
  };
  const A = {
    display: 'inline-block',
    float: 'left',
    fontSize: '18px',
    fontWeight: 'normal',
    margin: '0 10px 0 0'
  };
  const moreAnswer = {
    margin: '0 0 10px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'black'
  };
  const noAnswer = {
    fontStyle: 'italic',
    display: 'block',
    margin: '10px 0 0 30px'
  };

  return (
    hasAnswer() ?
      (<div style={answerStyle}>
        <span style={A}> A: </span>
        <span style={answerStyle}>{currentList.map((answer, i) =>
          <AnswerEntry
            answer={answer} key={i}
            handleAnswerHelpful={handleAnswerHelpful}
            handleAnswerReport={handleAnswerReport}
          />)}
        </span>
        <span>
          {showMoreAnswerLink(count, increment) ?
            (<a style={moreAnswer} className='moreAnswers' href='true' onClick={(e) => moreAnswers(e)}>MORE ANSWERS</a>) :
            (<a style={moreAnswer} className='collaspeAnswers' href='true' onClick={(e) => collapseAnswers(e)}>COLLAPSE ANSWERS</a>)}
        </span>
      </div>
      ) :
      <span className='noAnswer' style={noAnswer}>No answer for this question yet</span>
  );
};

export default AnswerList;