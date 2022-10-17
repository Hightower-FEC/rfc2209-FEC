import React, {useState, useEffect} from 'react';
import AnswerList from './AnswerList.jsx';

// Sub-component for QuestionList: QuestionEntry
const QuestionEntry = ({question, i, handleQuestionHelpful, handleAnswerHelpful}) => {
  // console.log('Inside question entry', question);

  let helpful = false;
  // Helper function to toggle helpfulness flag and pass data to parent function
  const handleClickHelpfulness = () => {
    helpful = !helpful;
    handleQuestionHelpful(question.question_id, helpful);
  };

  return (
    <div>
      <strong> Q: {question.question_body} </strong>
      <span> Helpful? <a href='#' onClick={handleClickHelpfulness}>Yes</a> ({question.question_helpfulness}) | <a>Add Answer</a> </span>
      <AnswerList answers = {question.answers}handleAnswerHelpful={handleAnswerHelpful}/>
    </div>
  );
};

export default QuestionEntry;