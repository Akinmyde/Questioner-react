import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from '../../common/Form';
import Loader from '../../common/Loader';
import loginSchema from '../../../schema/loginSchema';

class Login extends Form {
  constructor(props) {
    super(props);
    this.state = { data: { email: '', password: '' } };
  }

  schema = { ...loginSchema };

  doSubmit = async () => {
    const { login } = this.props;
    const { email, password } = this.state.data;
    await login({ username: email, password }, this.props);
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

