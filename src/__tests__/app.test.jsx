import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('Landing Page', () => {
  it('should render app correctly', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from '../App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


// "\\.(css|less|sass|scss)$": "<rootDir>/src/setupTests.js",
// "\\.(js|jsx)$": "<rootDir>/src/setupTests.js"
