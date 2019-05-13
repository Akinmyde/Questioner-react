import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from './common/Form';
import Loader from './common/Loader';
import loginSchema from '../schema/loginSchema';
import { login, getCurrentUser } from './services/authService';
import exceptionHandler from '../helpers/exceptionHandler';

class Login extends Form {
  constructor(props) {
    super(props);
    this.state = { data: { email: '', password: '' }, loading: false };
  }

  schema = { ...loginSchema };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    this.setState({ loading: true });
    try {
      await login({ username: email, password });
      const { location } = this.props;
      const { state } = location;
      const path = state ? state.from.pathname : '/';
      this.props.history.push(path);
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;

    const { loading } = this.state;
    return (
      <React.Fragment>
        {loading && <Loader />}
        <div className="container">
          <div className="imgcontainer">
            <i className="fas fa-user-circle fa-5x" />
          </div>
          {this.renderInput('email', 'Email', 'JohnDoe@gmail.com', 'email')}
          {this.renderInput('password', 'Password', 'password', 'password')}
          <div className="right font12"><Link to="/forget">Forget Password</Link></div>
          {this.renderButton('Login')}
          <div className="center font12">
            {'Don\'t have an account?'}
            {' '}
            <Link to="/signup">Sign up</Link>
          </div>
          <div className="error font12" />
        </div>
      </React.Fragment>
    );
  }
}

export default Login;

