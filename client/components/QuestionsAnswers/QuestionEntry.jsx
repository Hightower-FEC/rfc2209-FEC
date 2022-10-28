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
    !helpfulness && setHelpCount(helpCount + 1);
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
    borderRadius: '10px',
    minHeight: '100px'
  };
  const questionHeader = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  };
  const Q = {
    display: 'inline',
    float: 'left',
    fontWeight: 'bold',
    margin: '0 10px 0 0',
    fontSize: '18px'
  };
  const questionBody = {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: '18px'
  };
  const links = {
    display: 'inline-block',
    float: 'right',
    fontSize: '14px',
    margin: '0 30px 0 0'
  };

  return (
    <div className="q-bg" style={questionStyle}>
      <div style={questionHeader}>
        {/* Question body */}
        <div>
          <div style={Q}> Q: </div>
          <div className='question-body' style={questionBody}>{question.question_body} </div>
        </div>
        {/* Links */}
        <div style={links}> Helpful?{' '}
          {!helpfulness ?
            (<a href='true' className="accent-text" onClick={(e) => handleClickHelpfulness(e)}>Yes</a>) :
            <span> Voted </span> }
          {' '} ({helpCount}) {' '} |  {' '}
          <a href='true' className="accent-text" onClick={(e) => handleClickReport(e)}>Report</a> |
          <a href='true' className="accent-text" onClick={(e) => handleClickAddAnswer(e)}>Add Answer</a>
        </div>
      </div>

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