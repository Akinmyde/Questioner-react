import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from './common/Form';
import Loader from './common/Loader';
import signupSchema from '../schema/signupSchema';
import { register, getTokenKey } from './services/authService';
import exceptionHandler from '../helpers/exceptionHandler';

class Signup extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '', email: '', password: '', confirmPassword: '',
      },
      loading: false,
    };
  }

  schema = { ...signupSchema };

  doSubmit = async () => {
    const { data } = this.state;
    this.setState({ loading: true });
    try {
      await register(data);
      window.location = '/';
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    if (getTokenKey()) return <Redirect to="/" />;
    const { loading } = this.state;
    return (
      <React.Fragment>
        {loading && <Loader />}
        <div className="container">
          <div className="imgcontainer">
            <i className="fas fa-user-circle fa-5x" />
          </div>
          {this.renderInput('email', 'Email', 'JohnDoe@gmail.com', 'email')}
          {this.renderInput('username', 'Username', 'John Doe')}
          {this.renderInput('password', 'Password', 'password', 'password')}
          {this.renderInput('confirmPassword', 'Retype Password', 'Confirm Password', 'password')}
          <div className="right font12"><Link to="/forget">Forget Password</Link></div>
          {this.renderButton('Signup')}
          <div className="center font12">
            {'Already have an account?'}
            {' '}
            <Link to="/login">Login</Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Signup;
