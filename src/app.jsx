import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const msg = 'welcome to Questioner App';
    return (
      <div>{msg}</div>
    );
  }
}

export default App;
