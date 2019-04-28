import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'babel-polyfill';
import { ToastContainer } from 'react-toastify';
import { getCurrentUser } from './components/services/authService';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Logout from './components/common/Logout';
import SingleMeetup from './components/SingleMeetup';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Meetups from './components/Meetups';
import Login from './components/Login';
import Signup from './components/Signup';
import 'react-toastify/dist/ReactToastify.css';
import './Loader.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const userId = getCurrentUser();
    this.setState({ userId });
  }

  render() {
    const { userId } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div>
          <Header userId={userId} />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/meetups/:id" component={SingleMeetup} />
            <Route path="/meetups/:id" component={SingleMeetup} />
            <Route path="/meetups" component={Meetups} />
            <Route path="/logout" component={Logout} />
            <Route path="/dashboard" component={Dashboard} />
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
