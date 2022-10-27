/**
 * @jest-environment jsdom
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {unmountComponentAtNode} from 'react-dom';
import {render, screen, waitFor, cleanup} from '@testing-library/react';

import {act} from 'react-dom/test-utils';
import App from '../client/components/app.jsx';
import QuestionsAnswers from '../client/components/QuestionsAnswers/QuestionsAnswers.jsx';
import QuestionList from '../client/components/QuestionsAnswers/QuestionList.jsx';

// Testing a test
// describe('Testing a test in Questions and Answers', () => {
//   it('adds 1 + 2 to equal 3', () => {
//     const sum = (a, b) => {
//       return a + b;
//     };
//     expect(sum(1, 2)).toBe(3);
//   });
// });

const testQuestions = [{}, {}, {}]
describe('Test QuestionAnswer widget functionality', () =>{
  afterEach(() => {
    cleanup();
  });

  it('Should render QuestionsAnswer widget', () => {
    render(<QuestionsAnswers/>);
    // const QAComponent = screen.getByTestId('QA-widget');
    const title = screen.getByText('Questions and Answers');
    expect(title).toBeInTheDocument();
  });

  it('Should render question list inside widget', () => {
    render(<QuestionsAnswers/>);
    const questions = screen.getByTestId('questions-list');
    expect(questions).toBeInTheDocument();
  });

  it('Should render a button to expand list', () => {
    // const expandListBtn = screen.getByTestId('more-questions');
    expect(expandListBtn).toBeInTheDocument();
  });

  it('Should render a button to add a question', () => {
    const addQuestionBtn = screen.getByTestId('question-modal');
    expect(addQuestionBtn).toBeInTheDocument();
  });

  // it('Should render two questions in list by default', async () => {
  //   //render(<QuestionList questions={testQuestions}/>);
  //   await waitFor(() => {
  //     const questions = screen.getByTestId('questions-list')
  //     expect(questions).toBeInTheDocument()
  //     expect(questions).toHaveLength(2)
  //   })
  // })


});

