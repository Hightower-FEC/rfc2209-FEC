/**
 * @jest-environment jsdom
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

import Example from './Example.js';

//For each test, we usually want to render our React tree to a DOM element that’s attached to document. This is important so that it can receive DOM events. When the test ends, we want to “clean up” and unmount the tree from the document.
let container = null;

//beforeEach and afterEach blocks will run and isolate the effects of a test to itself
beforeEach(() => {
  //setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with or without a name', () => {
  //act() is a helper function from react-dom/test-utils that makes sure all updates related to all "units" of interaction (e.g., tasks like rendering, user events, data fetching, etc.) have been processed and applied to the DOM before you make any assertions.
  act(() => {
    const root = createRoot(container);
    root.render(<Example />);
    //render(<Example />, container);
  });
  expect(container.textContent).toBe('Hey, stranger');

  act(() => {
    const root = createRoot(container);
    root.render(<Example name="Jenny" />);
    //render(<Example name="Jenny" />, container);
  });
  expect(container.textContent).toBe('Hello, Jenny!');

  act(() => {
    const root = createRoot(container);
    root.render(<Example name="Margaret" />);
    //render(<Example name="Margaret" />, container);
  });
  expect(container.textContent).toBe('Hello, Margaret!');
});