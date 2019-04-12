import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'babel-polyfill';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }


  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/not-found" component="not-found" />
            <Route path="/" exact component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
