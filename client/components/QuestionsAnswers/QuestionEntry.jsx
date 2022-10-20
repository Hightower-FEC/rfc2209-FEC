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

  const questionStyle = {
    display: 'block',
    fontSize: '20px',
    margin: '25px 0'
  };
  const Q = {
    display: 'inline-block',
    float: 'left',
    fontWeight: 'bold',
    margin: '0 10px 0 0'
  };
  const questionBody = {
    fontWeight: 'bold'
  };
  const links = {
    display: 'inline-block',
    float: 'right',
    fontSize: '16px'
  };

  return (
    <div style={questionStyle}>
      <span style={Q}> Q: </span>
      <span style={questionBody}> {question.question_body} </span>
      <span style={links}> Helpful? <a href='javascript:null' onClick={handleClickHelpfulness}>Yes</a> ({question.question_helpfulness}) |
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