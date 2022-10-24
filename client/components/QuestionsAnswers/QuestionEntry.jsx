import React, {useState, useEffect} from 'react';
import AnswerList from './AnswerList.jsx';
import AnswerModal from './AnswerModal.jsx';

// Sub-component for QuestionList: QuestionEntry
const QuestionEntry = ({question, i, name, query, submitAnswer, handleQuestionHelpful, handleQuestionReport, handleAnswerHelpful, handleAnswerReport}) => {

  const [helpfulness, setHelpfulness] = useState(false);
  const [helpCount, setHelpCount] = useState(question.question_helpfulness);
  const [showAModal, setAShow] = useState(false);

  // Helper function to toggle helpfulness flag and pass data to parent function
  let helpful = false;
  const handleClickHelpfulness = () => {
    //helpful = !helpful;

    /* Pseudocode-ish
    Once the user clicks on 'Yes', send a PUT request to server. The server will keep track of the answer.id and a boolean will be set to false. In the server, any repeat PUT requests to the same answer id will be handled to just return the boolean instead of sending another PUT request. On the client side, I'll use the boolean to disable the link to upvote the helpfulness.
    */
    !helpfulness && setHelpCount(helpCount + 1);
    // The helpfulness state should be set to the boolean sent back by the server
    setHelpfulness(true);
    handleQuestionHelpful(question.question_id, helpful);
  };


  const questionStyle = {
    display: 'block',
    fontSize: '20px',
    margin: '25px 0',
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
    fontSize: '18px'
  };

  return (
    <div style={questionStyle}>
      <span style={Q}> Q: </span>
      <span className='question-body' style={questionBody}> {question.question_body} </span>
      <span style={links}> Helpful?
        {!helpfulness ?
          (<a href='javascript:null' onClick={handleClickHelpfulness}>Yes</a>) :
          <span> Voted </span> }

         ({helpCount}) |
        <a href='javascript:null' onClick={() => setAShow(true)}>Add Answer</a>
      </span>
      <AnswerList
        answers = {question.answers}
        handleAnswerHelpful={handleAnswerHelpful}
        handleAnswerReport={handleAnswerReport}
      />
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