import React, {useState, useEffect} from 'react';
import QuestionEntry from './QuestionEntry.jsx';

// Sub-component: QuestionsList
// By default, load up to TWO questions on page render
const QuestionList = ({questions, name, query, submitAnswer, handleQuestionHelpful, handleAnswerHelpful}) => {

  return (
    questions.map((question, i) => <QuestionEntry
      question={question} key={i} name={name} query={query}
      submitAnswer={submitAnswer}
      handleQuestionHelpful={handleQuestionHelpful}
      handleAnswerHelpful={handleAnswerHelpful}
    />)
  );
};

export default QuestionList;