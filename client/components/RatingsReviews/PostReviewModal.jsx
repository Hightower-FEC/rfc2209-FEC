import React, {useState, useEffect} from 'react';

import axios from 'axios';
import {v4} from 'uuid';
import Star from '../Star.jsx';
const PostReviewModal = ({currentProduct, showModal, onSubmit, onClose, applicableCharacteristics, interactions}) => {

  // The eight input fields for the review modal
  const [stars, setStars] = useState(0);
  const [isRecommended, setIsRecommended] = useState(true);
  const [characteristics, setCharacteristics] = useState({});
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [images, setImages] = useState([]);

  //
  const [isRated, setIsRated] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    let characteristicsToBe = {};
    Object.keys(applicableCharacteristics).map((characteristic) => {
      characteristicsToBe[applicableCharacteristics[characteristic].id] = 3;
    });
    setCharacteristics(characteristicsToBe);
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);


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
    zIndex: '100',

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
    margin: '0 0 0 2rem',
    display: 'inline-block',
    overflowY: 'auto',
    maxHeight: '550px'
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

  const result = {
    display: 'flex',
    gap: '10px',
    padding: '10px 0'
  };

  const thumbnail = {
    height: '200px'
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

  const clearFields = () => {
    setStars(0);
    setHoveredStar(0);
    setIsRated(false);
    setIsRecommended(true);

    let characteristicsToBe = {};
    Object.keys(applicableCharacteristics).map((characteristic) => {
      characteristicsToBe[applicableCharacteristics[characteristic].id] = 3;
    });
    setCharacteristics(characteristicsToBe);

    setSummary('');
    setBody('');
    setNickname('');
    setEmail('');
    setImages([]);
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
    if (stars < 1 || stars > 5) {
      valid = false;
      let error = createErrorMsg('Must give a rating');
      document.getElementsByClassName('error')[0].appendChild(error);
    } else if (body === '') { // Body field
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

    console.log(images);
    // If still valid, then submit form
    if (valid) {

      let formData = new FormData();

      formData.append('product_id', currentProduct.id);
      formData.append('rating', stars);
      formData.append('summary', summary);
      formData.append('body', body);
      formData.append('recommend', isRecommended);
      formData.append('name', nickname);
      formData.append('email', email);
      for (let i = 0; i < images.length; i++) {
        let type = images[i].name.split('.');
        type = type[type.length - 1];
        formData.append('files', images[i], `${v4()}.${type}`);
      }
      formData.append('characteristics', JSON.stringify(characteristics));

      // let data = {
      //   product_id: currentProduct.id,
      //   rating: stars,
      //   summary: summary,
      //   body: body,
      //   recommend: isRecommended,
      //   name: nickname,
      //   email: email,
      //   photos: images,
      //   characteristics: characteristics,
      // };

      axios.post('/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          console.log(response.status);
          if (response.status === 201) {
            clearFields();
            onSubmit();
          } else {
            let error = createErrorMsg('There was an issue posting your review');
            document.getElementsByClassName('error')[0].appendChild(error);
          }
        })
        .catch((err) => {
          console.log(err);
          let error = createErrorMsg('There was an issue posting your review');
          document.getElementsByClassName('error')[0].appendChild(error);
        });
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

  const handleRecommendedRadioChange = (e) => {
    setIsRecommended(e.target.value === 'true');
  };

  const handleCharacteristicRadioChange = (e) => {
    const characteristic = e.target.name;

    const id = applicableCharacteristics[characteristic].id;

    const newProperty = {};
    newProperty[id] = Number(e.target.value);



    let characteristicsToBe = Object.assign({}, characteristics, newProperty);

    setCharacteristics(characteristicsToBe);
  };

  const handleImageUpload = (e) => {
    setImages([]);
    let newImages = [];
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const files = e.target.files;
      const output = document.querySelector("#result");
      output.innerHTML = "";
      if (files.length <= 5) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].type.match("image")) {
            const picReader = new FileReader();
            picReader.addEventListener("load", function (event) {
              const picFile = event.target;
              const div = document.createElement("div");
              div.innerHTML = `<div class="thumbnail-reviews" style="background-image: url(${picFile.result});" title="${picFile.name}"></div>`;
              output.appendChild(div);
              newImages.push(files[i]);
            });
            picReader.readAsDataURL(files[i]);

          }
        }
        setImages(newImages);
      } else {
        e.target.value = '';
        let error = createErrorMsg('Cannot upload more than 5 images');
        document.getElementsByClassName('error')[0].appendChild(error);
      }
    } else {
      alert("Your browser does not support File API");
    }
  };

  const starSize = '20px';
  const starRating =
      <div style={{position: 'relative', display: 'flex', flexDirection: 'row', height: {starSize}, marginTop: '10px'}}>
        <div style={{position: 'absolute', width: `${Number(starSize.slice(0, 2)) * 5}px`, height: `${starSize}`, backgroundColor: '#ddd', zIndex: 99}}/>
        <div style={{position: 'absolute', width: `${Number(starSize.slice(0, 2)) * hoveredStar}px`, height: `${starSize}`, backgroundColor: 'black', zIndex: 100}} />
        <div style={{height: `${starSize}`, width: `${starSize}`, zIndex: 101}}>
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
        <div style={{height: `${starSize}`, width: `${starSize}`, zIndex: 101}}>
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
        <div style={{height: `${starSize}`, width: `${starSize}`, zIndex: 101}}>
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
        <div style={{height: `${starSize}`, width: `${starSize}`, zIndex: 101}}>
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
        <div style={{height: `${starSize}`, width: `${starSize}`, zIndex: 101}}>
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
      <div style={{justifyContent: 'flex-start'}} onChange={handleRecommendedRadioChange}>
        <span style={{paddingRight: '20px'}}>
          {console.log(typeof isRecommended)}
          <input type="radio" value="true" name="recommended" checked={isRecommended}/>
          <label htmlFor="yes">Yes</label>
        </span>

        <span>
          <input type="radio" value="false" name="recommended" checked={!isRecommended}/>
          <label htmlFor="no">No</label>
        </span>
      </div>;

  const minMax = {
    Size: ['A size too small', 'Perfect', 'A size too wide'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Comfort: ['Uncomfortable', 'Perfect'],
    Quality: ['Poor', 'Perfect'],
    Length: ['Runs short', 'Perfect', 'Runs long'],
    Fit: ['Runs tight', 'Perfect', 'Runs long'],
  };

  const characteristicsRadios =
    <div>
      {Object.keys(applicableCharacteristics).map((characteristic) => {
        return (
          <div className="characteristic-modal">
            <label htmlFor={characteristic}>{characteristic}</label>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} onChange={handleCharacteristicRadioChange}>
              <div>
                <input type="radio" name={characteristic} value={1} checked={characteristics[applicableCharacteristics[characteristic].id] === 1}/>
              </div>
              <div>
                <input type="radio" name={characteristic} value={2} checked={characteristics[applicableCharacteristics[characteristic].id] === 2}/>
              </div>
              <div>
                <input type="radio" name={characteristic} value={3} checked={characteristics[applicableCharacteristics[characteristic].id] === 3}/>
              </div>
              <div>
                <input type="radio" name={characteristic} value={4} checked={characteristics[applicableCharacteristics[characteristic].id] === 4}/>
              </div>
              <div>
                <input type="radio" name={characteristic} value={5} checked={characteristics[applicableCharacteristics[characteristic].id] === 5}/>
              </div>
            </div>
            <div className="characteristics-modal-options" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}>
              {minMax[characteristic].map((desc, index) => {
                const align = minMax[characteristic].length === 3 ? ['left', 'center', 'right'] : ['left', 'right'];

                let spaceStyle = {
                  width: '50%',
                  textAlign: `${align[index]}`
                };
                if (minMax[characteristic].length === 3) {
                  spaceStyle = {
                    width: '33%',
                    textAlign: `${align[index]}`
                  };
                }

                return (

                  <div style={spaceStyle}>{desc}</div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>;

  return showModal ?
    <div className='modal' style={modalStyle} onClick={onClose}>
      <div className='modal-content' style={modalContent} onClick={(e) => {
        interactions(e, 'RatingsReviews');
        e.stopPropagation();
      }}>
        {/* Modal Header */}
        <div className='modal-header'>
          <div>Write Your Review</div>
          <div className='product'>About the {currentProduct.name}</div>
          <div className="accent-underline"></div>
          <div className='error'></div>
        </div>

        {/* Modal Body */}
        <div className='modal-body' style={modalBody}>
          <label htmlFor='overall-rating'>Overall Rating<span className="accent-star">*</span></label><br/>
          {starRating}
          <fieldset style={{marginTop: '20px'}}> <legend htmlFor='recommend-product'>Do you recommend this product?<span className="accent-star">*</span></legend>
            {recommendRadio} </fieldset>
          <fieldset style={{marginTop: '20px'}}> <legend htmlFor='characteristics'>Characteristics<span className="accent-star">*</span></legend>
            {characteristicsRadios} </fieldset>
          <div className="modal-segment">
            <label htmlFor='review-summary'>Review Summary</label><br/>
            <textarea style={{marginTop: '5px'}} id='review-summary' rows='4' cols='50' onChange={(e) => setSummary(e.target.value)}/> <br/>
          </div>
          <div className="modal-segment">
            <label htmlFor='review-body'>Review Body<span className="accent-star">*</span></label><br/>
            <textarea style={{marginTop: '5px'}} id='review-body' rows='4' cols='50' onChange={(e) => setBody(e.target.value)}/> <br/>
          </div>
          <div className="modal-segment">
            <label for="files">Upload your photos: </label>
            <input id="files" type="file" multiple="multiple" accept="image/jpeg, image/png, image/jpg" onChange={(e) => {
              handleImageUpload(e);
            }}/>
          </div>
          <output id="result"/>

          <div className="modal-segment">
            <label htmlFor='your-nickname'>What is your nickname?<span className="accent-star">*</span></label><br/>
            <input style={{marginTop: '5px'}} type='text' id='your-nickname'placeholder='Example: jackson11!' onChange={(e) => setNickname(e.target.value)} /> <br/>
            <div style={{fontSize: '12px', fontStyle: 'italic', marginTop: '5px'}}>For privacy reasons, do not use your full name or email address</div>
          </div>

          <div className="modal-segment">
            <label htmlFor='your-email'>Your Email<span className="accent-star">*</span></label><br/>
            <input style={{marginTop: '5px'}} type='text' id='your-email' onChange={(e) => setEmail(e.target.value)}/> <br/>
            <span style={{fontSize: '12px', fontStyle: 'italic', marginTop: '5px'}}>For authentication reasons, you will not be emailed</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className='modal-footer' style={footer}>
          <button className='black-button' onClick={handleSubmit} style={{marginBottom: '10px'}}>Submit</button>
          <button className='black-button' onClick={onClose} style={{marginBottom: '10px'}} >Close</button>
        </div>
      </div>
    </div> : <></>;
};

export default PostReviewModal;