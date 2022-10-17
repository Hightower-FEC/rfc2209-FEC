import React, {useState, useEffect} from 'react';
import QuestionEntry from './QuestionEntry.jsx';

// Sub-component: QuestionsList
// By default, load up to FOUR questions on page render
const QuestionList = ({questions, handleQuestionHelpful, handleAnswerHelpful}) => {

  return (
    questions.map((question, i) => <QuestionEntry
      question={question} key={i}
      handleQuestionHelpful={handleQuestionHelpful}
      handleAnswerHelpful={handleAnswerHelpful}
    />)
  );
};

export default QuestionList;