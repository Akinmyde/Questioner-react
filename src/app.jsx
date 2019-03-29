import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './components/HomePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Route path="/" component={HomePage} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
