import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'babel-polyfill';
import { ToastContainer } from 'react-toastify';
import { checkIsAdmin } from './components/services/authService';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Logout from './components/common/Logout';
import SingleMeetup from './components/SingleMeetup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './Loader.css';
import './App.css';
import './Modal.css';
import LoginContainer from './components/containers/LoginContainer';
import SignupContainer from './components/containers/SignupContainer';
import HomePage from './components/presentations/HomePage/HomePage';
import MeetupsContainer from './components/containers/MeetupsContainer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAdmin: false };
  }

  componentDidMount() {
    const isAdmin = checkIsAdmin();
    this.setState({ isAdmin });
  }

  render() {
    const { isAdmin } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div>
          <Header />
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/signup" component={SignupContainer} />
            <ProtectedRoute path="/meetups/:id" component={SingleMeetup} />
            <ProtectedRoute path="/dashboard" render={(props) => <Dashboard {...props} isAdmin={isAdmin} />} />
            <Route path="/meetups" component={MeetupsContainer} />
            <Route path="/logout" component={Logout} />
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
