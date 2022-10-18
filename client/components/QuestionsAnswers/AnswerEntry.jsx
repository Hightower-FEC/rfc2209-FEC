import React, {useState, useEffect} from 'react';

// Sub-component for AnswerList: AnswerEntry
const AnswerEntry = ({answer, handleAnswerHelpful}) => {
  // console.log('Inside answer entry', answer);
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

  return (
    <div>
      {answer.body} <br/>
      <sub>
        <span>
          by {answer.answerer_name}, {formatDate(answer.date)} | Helpful?
          <a href='javascript:null' onClick={handleClickHelpfulness}> Yes </a> ({answer.helpfulness}) |
          {!report ? <a href='javascript:null' onClick={handleClickReport}> Report </a> : <span> Reported </span>}
        </span>
      </sub>
    </div>
  );
};

export default AnswerEntry;