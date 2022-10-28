/**
 * @jest-environment jsdom
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {unmountComponentAtNode} from 'react-dom';
import {render, screen, waitFor, cleanup} from '@testing-library/react';

import {act} from 'react-dom/test-utils';
import RatingsReviews from '../client/components/RatingsReviews/RatingsReviews.jsx';

const testQuestions = [{}, {}, {}];

describe('Test RatingsReviews widget functionality', () =>{
  afterEach(() => {
    cleanup();
  });

  it('Should render RatingsReviews widget', () => {
    render(<RatingsReviews currentProduct={{id:66642}}/>);
    const title = screen.getByText('Ratings and Reviews');
    expect(title).toBeInTheDocument();
  });
});

