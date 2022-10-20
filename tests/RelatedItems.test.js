/**
 * @jest-environment jsdom
 */

import React from 'react';
import {createRoot, render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import RelatedItems from '../client/components/RelatedItems/RelatedItems.jsx';
import TableRow from '../client/components/RelatedItems/TableRow.jsx';

let container = null;
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

it('Renders with or without data', () => {
  act(() => {
    const root = createRoot(container);
    root.render(<TableRow/>);
  });
  expect(container.textContent).toBe('whatever');
});