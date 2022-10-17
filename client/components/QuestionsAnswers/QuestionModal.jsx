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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const modalContent = {
    width: 750 + 'px',
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
    if (ask === '' || nickname === '' || email === '' || !verifyEmail(email)) {
      alert('You must enter the correct information');
    } else {
      let formatQuestion = {
        question_body: ask,
        asker_name: nickname,
        asker_email: email
      };
      submitQuestion(formatQuestion);
      onClose();
    }
  };

  return (showQModal && (
    <div className='modal' style={modalStyle} onClick={onClose}>
      <div className='modal-content' style={modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className='modal-header' style={modalHeadFoot}>
          <h4 className='modal-timer'>Ask Your Question</h4>
          <h5>About the {name}</h5>
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
        <div className='modal-footer' style={modalHeadFoot}>
          <button className='submitBtn' onClick={handleSubmit}>Submit</button>
          <button className='closeBtn' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  ));
};

export default QuestionModal;