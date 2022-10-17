import React, {useState, useEffect} from 'react';
import AnswerEntry from './AnswerEntry.jsx';

// Sub-component for QuestionEntry: AnswerList
// Up to TWO answers should be display for each question
const AnswerList = ({answers, handleAnswerHelpful}) => {
  // console.log('Inside answers list: ', answers);
  let answerIDs = Object.keys(answers);

  return (
    <div>
      <strong > A: </strong>
      <span>{answerIDs.map((id, i) =>
        <AnswerEntry
          answer={answers[id]} key={i}
          handleAnswerHelpful={handleAnswerHelpful} />)}
      </span>
    </div>
  );
};

export default AnswerList;