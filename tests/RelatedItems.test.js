/**
 * @jest-environment jsdom
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {unmountComponentAtNode} from 'react-dom';
import {render, screen, cleanup} from '@testing-library/react';
//import '@testing-library/jest-dom';
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
  //root.unmount;
  container.remove();
  container = null;
});

it('Renders with or without data', async () => {
  act(() => {
    const root = createRoot(container);
    root.render(<TableRow/>);
    //render(<TableRow />, container);
  });
  await expect(container.textContent).toMatchObject('whatever');
});