import React, {useState, useEffect} from 'react';

const AnswerModal = ({showAModal, submitAnswer, name, questionBody, onClose}) => {

  // The three input fields for the question modal
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const modalStyle = {
    position: 'fixed',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const modalContent = {
    width: '80%',
    backgroundColor: '#fff'
  };
  const modalHeadFoot = {
    padding: 10 + 'px'
  };
  const modalBody = {
    padding: 10 + 'px',
    borerTop: 1 + 'px solid #eee',
    borderBottom: 1 + 'px solid #eee',
  };

  // Helper function to verify email address
  const verifyEmail = (email) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(email);
  };

  // Pass formatted question data to parent component
  const handleSubmit = () => {
    if (answer === '' || nickname === '' || email === '' || !verifyEmail(email)) {
      alert('You must enter the correct information');
    } else {
      let formatAnswer = {
        body: answer,
        answerer_name: nickname,
        answerer_email: email
      };
      submitAnswer(formatAnswer);
      onClose();
    }
  };

  return (showAModal && (
    <div className='modal' style={modalStyle} onClick={onClose}>
      <div className='modal-content' style={modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className='modal-header' style={modalHeadFoot}>
          <h4 className='modal-timer'>Submit Your Answer</h4>
          <h5>{name}: {questionBody}</h5>
        </div>

        {/* Modal Body */}
        <div className='modal-body' style={modalBody}>
          <label htmlFor='your-question'>Your Answer*</label><br/>
          <textarea id='your-question' rows='4' cols='50' onChange={(e) => setAnswer(e.target.value)}/> <br/>

          <label htmlFor='your-nickname'>What is your nickname?*</label><br/>
          <input type='text' id='your-nickname' placeholder='Example: jackson11!' onChange={(e) => setNickname(e.target.value)} /> <br/>
          <span>For privacy reasons, do not use your full name or email address</span><br/>

          <label htmlFor='your-email'>Your Email*</label><br/>
          <input type='text' id='your-email' onChange={(e) => setEmail(e.target.value)}/> <br/>
          <span>For authentication reasons, you will not be emailed</span><br/>
        </div>

        {/* Modal Footer */}
        <div className='modal-footer' style={modalHeadFoot}>
          <button className='submitBtn' onClick={handleSubmit}>Submit Answer</button>
          <button className='closeBtn' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  ));
};

export default AnswerModal;