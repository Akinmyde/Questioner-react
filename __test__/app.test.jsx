/* eslint-env mocha */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

it('renders without crashing', () => {
  ReactDOM.render(<App />, document.createElement('div'));
});
