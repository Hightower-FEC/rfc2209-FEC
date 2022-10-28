import React, {useState, useEffect} from 'react';
import AnswerList from './AnswerList.jsx';
import AnswerModal from './AnswerModal.jsx';

// Sub-component for QuestionList: QuestionEntry
const QuestionEntry = ({question, i, name, query, submitAnswer, handleQuestionHelpful, handleQuestionReport, handleAnswerHelpful, handleAnswerReport}) => {

  const [helpfulness, setHelpfulness] = useState(question.helpful);
  const [helpCount, setHelpCount] = useState(question.question_helpfulness);
  const [report, setReport] = useState(false);
  const [showAModal, setAShow] = useState(false);

  // Helper function to toggle helpfulness flag and pass data to parent function
  let helpful = false;
  const handleClickHelpfulness = (e) => {
    e.preventDefault();
    /* Pseudocode-ish
    Once the user clicks on 'Yes', send a PUT request to server. The server will keep track of the answer.id and a boolean will be set to false. In the server, any repeat PUT requests to the same answer id will be handled to just return the boolean instead of sending another PUT request. On the client side, I'll use the boolean to disable the link to upvote the helpfulness.
    */
    !helpfulness && setHelpCount(helpCount + 1);
    // The helpfulness state should be set to the boolean sent back by the server
    setHelpfulness(true);
    handleQuestionHelpful(question.question_id, helpful);
  };
  // Helper function for the report link
  const handleClickReport = (e) => {
    e.preventDefault();
    handleQuestionReport(question.question_id);
  };
  // Helper function for the add answer link
  const handleClickAddAnswer = (e) => {
    e.preventDefault();
    setAShow(true);
  };


  const questionStyle = {
    display: 'block',
    fontSize: '16px',
    margin: '30px 0 0 0',
    padding: '10px',
    borderRadius: '10px'
    // borderBottom: '2px solid rgba(0, 0, 0, 0.4)',
  };
  const Q = {
    display: 'inline-block',
    float: 'left',
    fontWeight: 'bold',
    margin: '0 10px 0 0',
    fontSize: '18px'
  };
  const questionBody = {
    fontWeight: 'bold',
    fontSize: '18px'
  };
  const links = {
    display: 'inline-block',
    float: 'right',
    fontSize: '14px'
  };

  return (
    <div className="q-bg" style={questionStyle}>
      <span style={Q}> Q: </span>
      <span className='question-body' style={questionBody}> {question.question_body} </span>
      <span style={links}> Helpful?{' '}
        {!helpfulness ?
          (<a className="accent-text" onClick={(e) => handleClickHelpfulness(e)}>Yes</a>) :
          <span> Voted </span> }
        {' '} ({helpCount}) {' '} |  {' '}
        <a className="accent-text" onClick={(e) => handleClickReport(e)}>Report</a> |
        <a className="accent-text" onClick={(e) => handleClickAddAnswer(e)}>Add Answer</a>
      </span>
      <AnswerList
        answers = {question.answers}
        handleAnswerHelpful={handleAnswerHelpful}
        handleAnswerReport={handleAnswerReport}
      />
      <AnswerModal
        name={name}
        questionId={question.question_id}
        showAModal={showAModal}
        questionBody={question.question_body}
        onClose={() => setAShow(false)}
        submitAnswer={submitAnswer}/>
    </div>
  );
};

export default QuestionEntry;