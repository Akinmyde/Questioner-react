/* eslint-env mocha */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/app';

it('renders without crashing', () => {
  ReactDOM.render(<App />, document.createElement('div'));
});
