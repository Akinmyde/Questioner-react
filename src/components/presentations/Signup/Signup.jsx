import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from '../../common/Form';
import Loader from '../../common/Loader';
import signupSchema from '../../../schema/signupSchema';

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
    const { signup } = this.props;
    await signup(data, this.props);
  };

  render() {
    const { auth, LoadingReducer } = this.props;
    const { userId } = auth;
    const { loader } = LoadingReducer;

    if (userId) return <Redirect to="/" />;
    return (
      <React.Fragment>
        {loader && <Loader />}
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
