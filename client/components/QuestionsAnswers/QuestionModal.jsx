import React, {useState, useEffect} from 'react';

const QuestionModal = ({showQModal, onClose, name, submitQuestion}) => {

  // The three input fields for the question modal
  const [ask, setAsk] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  // Modal style
  const modalStyle = {
    position: 'fixed',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '9999999'
  };
  const modalContent = {
    width: '60%',
    height: '35%',
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
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
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
    if (ask === '') { // Questin field
      valid = false;
      let error = createErrorMsg('Question cannot be blank');
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
      let formatQuestion = {
        question_body: ask,
        asker_name: nickname,
        asker_email: email
        // question_helpfulness: 0,
        // answers: {},
        // reported: false
      };
      submitQuestion(formatQuestion);
      onClose();
    }
  };

  return (showQModal && (
    <div className='modal' style={modalStyle} onClick={onClose}>
      <div className='modal-content' style={modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className='modal-header' style={header}>
          <h4>Ask Your Question</h4>
          <h4 className='product'>About the {name}</h4>
          <div className='error' style={error}></div><br/>
          {/* <span className='error2' style={error}></span><br/>
          <span className='error3' style={error}></span> */}
        </div>

        {/* Modal Body */}
        <div className='modal-body' style={modalBody}>
          <label htmlFor='your-question'>Your Question*</label><br/>
          <textarea id='your-question' rows='4' cols='50' onChange={(e) => setAsk(e.target.value)}/> <br/>

          <label htmlFor='your-nickname'>What is your nickname?*</label><br/>
          <input type='text' id='your-nickname'placeholder='Example: jackson11!' onChange={(e) => setNickname(e.target.value)} /> <br/>

          <label htmlFor='your-email'>Your Email*</label><br/>
          <input type='text' id='your-email' onChange={(e) => setEmail(e.target.value)}/> <br/>
          <span>For privacy reasons, do NOT use your full name or email address!</span>
        </div>

        {/* Modal Footer */}
        <div className='modal-footer' style={footer}>
          <button className='submitBtn' onClick={handleSubmit}style={btn}>Submit</button>
          <button className='closeBtn' onClick={onClose} style={btn} >Close</button>
        </div>
      </div>
    </div>
  ));
};

export default QuestionModal;