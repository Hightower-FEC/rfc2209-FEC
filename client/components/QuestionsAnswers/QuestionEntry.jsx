import React, {useState, useEffect} from 'react';
import AnswerList from './AnswerList.jsx';
import AnswerModal from './AnswerModal.jsx';

// Sub-component for QuestionList: QuestionEntry
const QuestionEntry = ({question, i, name, query, submitAnswer, handleQuestionHelpful, handleAnswerHelpful}) => {
  const [showAModal, setAShow] = useState(false);

  // Helper function to toggle helpfulness flag and pass data to parent function
  let helpful = false;
  const handleClickHelpfulness = () => {
    helpful = !helpful;
    handleQuestionHelpful(question.question_id, helpful);
  };


  return (
    <div>
      <strong > Q: {question.question_body} </strong>
      <span> Helpful? <a href='javascript:null' onClick={handleClickHelpfulness}>Yes</a> ({question.question_helpfulness}) |
        <a href='javascript:null' onClick={() => setAShow(true)}>Add Answer</a>
      </span>
      <AnswerList
        answers = {question.answers}
        handleAnswerHelpful={handleAnswerHelpful}/>
      <AnswerModal
        name={name}
        showAModal={showAModal}
        questionBody={question.question_body}
        onClose={() => setAShow(false)}
        submitAnswer={submitAnswer}/>
    </div>
  );
};

export default QuestionEntry;