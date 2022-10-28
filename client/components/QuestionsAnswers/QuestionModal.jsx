import React, {useState, useEffect} from 'react';

const QuestionModal = ({ name, productID, showQModal, onClose, submitQuestion}) => {

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '999'
  };
  const modalContent = {
    width: '75%',
    borderRadius: '1rem',
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
    margin: '0 0 20px 0',
    height: '20px',
    width: '50%',
    fontSize: '14px'
  };
  const emailStyle = {
    display: 'inline-block',
    textAlign: 'left',
    margin: '0 0 5px 0',
    height: '20px',
    width: '50%',
    fontSize: '14px'
  };
  const questionStyle = {
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

  // Helper function to verify email address
  const verifyEmail = (email) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(regex);
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
        body: ask,
        asker: nickname,
        email: email,
        productID: productID
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
          <div>Ask Your Question</div>
          <div className='product'>About the {name}</div>
          <div className='error' style={error}></div>
          <div className='accent-underline'></div>
        </div>

        {/* Modal Body */}
        <div className='modal-body' style={modalBody}>
          <div className='modal-segment'>
            <div htmlFor='your-question'>Your Question<span className="accent-star">*</span></div>
            <textarea style={{marginTop: '5px'}} rows='5' cols='200' placeholder='Enter your question here' onChange={(e) => setAsk(e.target.value)} style={questionStyle}/>
          </div>

          <div className='modal-segment'>
            <label htmlFor='your-nickname'>What is your nickname?<span className="accent-star">*</span></label><br/>
            <input style={{marginTop: '5px', height: '20px'}} type='text' id='your-nickname' placeholder='Example: jackson11!' onChange={(e) => setNickname(e.target.value)} style={nicknameStyle}/>
          </div>

          <div className='modal-segment'>
            <label htmlFor='your-email'>Your Email<span className="accent-star">*</span></label><br/>
            <input style={{marginTop: '5px'}} type='text' id='your-email' placeholder='Example: johndoe@gmail.com' onChange={(e) => setEmail(e.target.value)} style={emailStyle}/> <br/>
            <span style={{fontSize: '12px', fontStyle: 'italic', marginTop: '5px'}}>For privacy reasons, do NOT use your full name or email address!</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className='modal-footer' style={footer}>
          <button className='black-button' onClick={handleSubmit}>Submit</button>
          <button className='black-button' onClick={onClose} >Close</button>
        </div>
      </div>
    </div>
  ));
};

export default QuestionModal;