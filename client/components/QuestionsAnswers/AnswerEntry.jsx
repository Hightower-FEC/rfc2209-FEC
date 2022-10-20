import React, {useState, useEffect} from 'react';
import Images from './Images.jsx';

// Sub-component for AnswerList: AnswerEntry
const AnswerEntry = ({answer, handleAnswerHelpful}) => {
  console.log('Inside answer entry', answer);
  const [report, setReport] = useState(false);

  let helpful = false;
  // Helper function to toggle helpfulness flag and pass data to parent function
  const handleClickHelpfulness = () => {
    helpful = !helpful;
    handleAnswerHelpful(answer.id, helpful);
  };

  // Send PUT request to report this answer
  const handleClickReport = () => {
    setReport(true);
    console.log(`You have reported answer ${answer.id} to admin`);
  };
  // Format date into readable format for user
  const formatDate = (date) => {
    return new Date(`${date}`).toDateString().slice(3);
  };

  const answerStyle = {
    margin: '10px 0 0 30px'
  };
  const answerer = {
    fontSize: '16px',
    margin: '25px 0',
    color: 'black'
  };

  return (
    <div style={answerStyle}>
      {answer.body} <br/>
      { (answer.photos.length > 0) &&
      <Images images={answer.photos} />}
      <span style={answerer}>
        by {answer.answerer_name}, {formatDate(answer.date)} | Helpful?
        <a href='javascript:null' onClick={handleClickHelpfulness}> Yes </a> ({answer.helpfulness}) |
        {!report ?
          <a href='javascript:null' onClick={handleClickReport}> Report </a> :
          <span> Reported </span>}
      </span>
    </div>
  );
};

export default AnswerEntry;