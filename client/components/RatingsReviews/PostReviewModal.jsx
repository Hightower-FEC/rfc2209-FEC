import React, {useState, useEffect} from 'react';

import Star from '../Star.jsx';

const PostReviewModal = ({showModal, onClose, name, submitReview, applicableCharacteristics}) => {

  // The eight input fields for the review modal
  const [stars, setStars] = useState(0);
  const [isRecommended, setIsRecommended] = useState();
  const [characteristics, setCharacteristics] = useState();
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  //
  const [isRated, setIsRated] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
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
    zIndex: '100'
  };
  const modalContent = {
    width: '75%',
    borderRadius: '1rem',
    backgroundColor: '#fff',
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
    margin: '0 0 0 2rem',
    display: 'inline-block'
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
  const reviewStyle = {
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

  const fill = '#000';
  const notFill = '#f1f1f1';

  // Helper function to verify email address
  const verifyEmail = (email) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(email);
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
    if (body === '') { // Body field
      valid = false;
      let error = createErrorMsg('Review cannot be blank');
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
      let formatReview = {
        // question_body: ask,
        // asker_name: nickname,
        // asker_email: email
        // // question_helpfulness: 0,
        // // answers: {},
        // // reported: false
      };
      submitReview(formatReview);
      onClose();
    }
  };

  const handleStarHover = (star) => {
    if (!isRated || star > stars) {
      setHoveredStar(star);
    }
  };

  const handleStarUnHover = () => {
    setHoveredStar(stars);
  };

  const handleStarClick = (star) => {
    if (star === stars) {
      setStars(0);
    } else {
      setIsRated(true);
      setStars(star);
      setHoveredStar(star);
    }

  };




  const starRating =
      <div style={{display: 'flex', flexDirection: 'row', height: '15px'}}>
        <div style={{marginTop: '2px', position: 'absolute', width: '75px', height: '15px', backgroundColor: '#ddd', zIndex: 99}}/>
        <div style={{marginTop: '2px', position: 'absolute', width: `${15 * hoveredStar}px`, height: '15px', backgroundColor: 'black', zIndex: 100}} />
        <div style={{height: '15px', width: '15px', zIndex: 101}}>
          <Star
            backgroundColor={'#fff'}
            onMouseEnter={() => {
              handleStarHover(1);
            }}
            onMouseLeave={handleStarUnHover}
            onClick={() => {
              handleStarClick(1);
            }}/>
        </div>
        <div style={{height: '15px', width: '15px', zIndex: 101}}>
          <Star
            backgroundColor={'#fff'}
            onMouseEnter={() => {
              handleStarHover(2);
            }}
            onMouseLeave={handleStarUnHover}
            onClick={() => {
              handleStarClick(2);
            }}/>
        </div>
        <div style={{height: '15px', width: '15px', zIndex: 101}}>
          <Star
            backgroundColor={'#fff'}
            onMouseEnter={() => {
              handleStarHover(3);
            }}
            onMouseLeave={handleStarUnHover}
            onClick={() => {
              handleStarClick(3);
            }}/>
        </div>
        <div style={{height: '15px', width: '15px', zIndex: 101}}>
          <Star
            backgroundColor={'#fff'}
            onMouseEnter={() => {
              handleStarHover(4);
            }}
            onMouseLeave={handleStarUnHover}
            onClick={() => {
              handleStarClick(4);
            }}/>
        </div>
        <div style={{height: '15px', width: '15px', zIndex: 101}}>
          <Star
            backgroundColor={'#fff'}
            onMouseEnter={() => {
              handleStarHover(5);
            }}
            onMouseLeave={handleStarUnHover}
            onClick={() => {
              handleStarClick(5);
            }}/>
        </div>
      </div>;

  const recommendRadio =
      <div style={{justifyContent: 'flex-start'}}>
        <span style={{paddingRight: '20px'}}>
          <input type="radio" value="true" checked/>
          <label for="yes">Yes</label>
        </span>

        <span>
          <input type="radio" value="false"/>
          <label for="no">No</label>
        </span>
      </div>;

  const characteristicsRadios =
    <div>
      <div style={{justifyContent: 'flex-start'}}>
        <span>
          <input type="radio" value="true" checked/>
          <label for="yes">Yes</label>
        </span>

        <span>
          <input type="radio" value="false"/>
          <label for="no">No</label>
        </span>

        <span>
          <input type="radio" value="false"/>
          <label for="no">No</label>
        </span>

        <span>
          <input type="radio" value="false"/>
          <label for="no">No</label>
        </span>

        <span>
          <input type="radio" value="false"/>
          <label for="no">No</label>
        </span>
      </div>
    </div>;

  return showModal ?
    <div className='modal' style={modalStyle} onClick={onClose}>
      <div className='modal-content' style={modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className='modal-header' style={header}>
          <h4>Write Your Review</h4>
          <h4 className='product'>About the {name}</h4>
          <div className='error' style={error}></div><br/>
        </div>

        {/* Modal Body */}
        <div className='modal-body' style={modalBody}>
          <label htmlFor='overall-rating'>Overall Rating*</label><br/>
          {starRating}
          <fieldset style={{marginTop: '20px'}}> <legend htmlFor='recommend-product'>Do you recommend this product?*</legend>
            {recommendRadio} </fieldset>
          <fieldset style={{marginTop: '20px'}}> <legend htmlFor='characteristics'>Characteristics*</legend>
            {characteristicsRadios} </fieldset>

          <label htmlFor='review-summary'>Review Summary</label><br/>
          <textarea id='review-summary' rows='4' cols='50' onChange={(e) => setSummary(e.target.value)}/> <br/>

          <label htmlFor='review-body'>Review Body*</label><br/>
          <textarea id='review-body' rows='4' cols='50' onChange={(e) => setBody(e.target.value)}/> <br/>

          <label htmlFor='your-photos'>Upload Your Photos</label><br/>
          <textarea id='your-photos' rows='4' cols='50'/> <br/>

          <label htmlFor='your-nickname'>What is your nickname?*</label><br/>
          <input type='text' id='your-nickname'placeholder='Example: jackson11!' onChange={(e) => setNickname(e.target.value)} /> <br/>
          <div>For privacy reasons, do not use your full name or email address</div>

          <label htmlFor='your-email'>Your Email*</label><br/>
          <input type='text' id='your-email' onChange={(e) => setEmail(e.target.value)}/> <br/>
          <span>For authentication reasons, you will not be emailed</span>
        </div>

        {/* Modal Footer */}
        <div className='modal-footer' style={footer}>
          <button className='submitBtn' onClick={handleSubmit}style={btn}>Submit</button>
          <button className='closeBtn' onClick={onClose} style={btn} >Close</button>
        </div>
      </div>
    </div> : <></>;
};

export default PostReviewModal;