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
    justifyContent: 'center',
    zIndex: '9999999'
  };
  const modalContent = {
    width: '75%',
    borderRadius: '1rem',
    backgroundColor: '#fff'
  };

  const header = {
    fontSize: '28px'
  };
  const error = {
    fontSize: '18px',
    color: 'red'
  };

  const modalBody = {
    padding: '10px',
    fontSize: '18px',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
    margin: '0 0 0 2rem'
  };
  const nicknameStyle = {
    display: 'inline-block',
    textAlign: 'left',
    margin: '0 0 1rem 0',
    height: '40px',
    width: '50%',
    fontSize: '24px'
  };
  const emailStyle = {
    display: 'inline-block',
    textAlign: 'left',
    margin: '0 0 1rem 0',
    height: '40px',
    width: '50%',
    fontSize: '24px'
  };
  const answerStyle = {
    width: '90%',
    height: '100px',
    fontSize: '24px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    backgroundColor: '#f8f8f8',
    fontSize: '18px',
    resize: 'none'
  };

  const footer = {
    display: 'flex',
    justifyContent: 'center'
  };
  const btn = {
    display: 'inline-block',
    margin: '10px 4rem 0 0',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    width: '20%',
    height: '60px'
  };

  // Helper function to verify email address
  const verifyEmail = (email) => {
    let checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(checkEmail);
  };
  // Helper function to create a span that displays the error message on submission
  const createErrorMsg = (message) => {
    let errorSpan = document.createElement('span');
    errorSpan.innerHTML = `<span>${message}</span><br/>`;
    return errorSpan;
  };
  // Pass formatted question data to parent component
  const handleSubmit = () => {
    // Flags for checking if input is correct
    let valid = true;

    // Remove any error messsage that appeared from previous submission
    let errors = document.getElementsByClassName('error')[0];
    while (errors.firstChild) {
      errors.removeChild(errors.firstChild);
    }

    // Check input fields
    if (answer === '') { // Questin field
      valid = false;
      let error = createErrorMsg('Answer cannot be blank');
      document.getElementsByClassName('error')[0].appendChild(error);
    }
    if (nickname === '') { // Nickname field
      valid = false;
      let error = createErrorMsg('Nickname cannot be blank');
      document.getElementsByClassName('error')[0].appendChild(error);
    }
    if (email === '') { // Email field
      valid = false;
      let error = createErrorMsg('Email cannot be blank');
      document.getElementsByClassName('error')[0].appendChild(error);
    } else if (!verifyEmail(email)) {
      valid = false;
      let error = createErrorMsg('Email is not valid');
      document.getElementsByClassName('error')[0].appendChild(error);
    }

    // If still valid, then submit form
    if (valid) {
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
        <div className='modal-header' style={header}>
          <h4 className='modal-timer'>Submit Your Answer</h4>
          <h4>{name}: {questionBody}</h4>
          <div className='error' style={error}></div><br/>
        </div>

        {/* Modal Body */}
        <div className='modal-body' style={modalBody}>
          <label htmlFor='your-answer'>Your Answer*</label><br/>
          <textarea id='your-answer' rows='5' cols='200' placeholder='Enter your answer here' onChange={(e) => setAnswer(e.target.value)} style={answerStyle}/> <br/>

          <label htmlFor='your-nickname'>What is your nickname?*</label><br/>
          <input type='text' id='your-nickname' placeholder='Example: jackson11!' onChange={(e) => setNickname(e.target.value)} style={nicknameStyle}/> <br/>
          <span>For privacy reasons, do not use your full name or email address</span><br/>

          <label htmlFor='your-email'>Your Email*</label><br/>
          <input type='text' id='your-email' placeholder='Example: johndoe@gmail.com' onChange={(e) => setEmail(e.target.value)} style={emailStyle}/> <br/>
          <span>For authentication reasons, you will not be emailed</span><br/>
        </div>

        {/* Modal Footer */}
        <div className='modal-footer' style={footer}>
          <button className='submitBtn' onClick={handleSubmit} style={btn}>Submit Answer</button>
          <button className='closeBtn' onClick={onClose} style={btn}>Close</button>
        </div>
      </div>
    </div>
  ));
};

export default AnswerModal;