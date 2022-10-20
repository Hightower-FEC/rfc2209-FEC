import React, {useState, useEffect} from 'react';
import AnswerEntry from './AnswerEntry.jsx';

// Sub-component for QuestionEntry: AnswerList
// Up to TWO answers should be display for each question
const AnswerList = ({answers, handleAnswerHelpful}) => {

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

  // Helper function to show or hide the link
  const showMoreAnswerLink = (count, increment) => {
    return (count * increment) < sortAnswers.length;
  };

  // Helper function to show the answer list if there is at least one answer
  const hasAnswer = () => {
    return sortAnswers.length > 0;
  };

  return (
    hasAnswer() ?
      (<div>
        <strong > A: </strong>
        <span>{currentList.map((answer, i) =>
          <AnswerEntry
            answer={answer} key={i}
            handleAnswerHelpful={handleAnswerHelpful} />)}
        </span>
        {showMoreAnswerLink(count, increment) &&
        (<a className='moreAnswers' href='javascript:null' onClick={() => setCount(count + 1)}>More Answers</a>)}
      </div>
      ) :
      <div>No answer for this question yet</div>
  );
};

export default AnswerList;