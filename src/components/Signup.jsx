import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './common/Loader';
import Input from './common/Input';
import Button from './common/Button';
import validate from '../helpers/validator';
import signupSchema from '../schema/signupSchema';
import { register } from './services/authService';
import exceptionHandler from '../helpers/exceptionHandler';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        username: '', email: '', password: '', confirmPassword: '',
      },
      loading: false,
    };
  }

  render() {
    const { account: userAcount, loading } = this.state;
    const {
      username, email, password, confirmPassword,
    } = userAcount;

    const doSumbit = async () => {
      // call the server
      this.setState({ loading: true });
      try {
        await register(userAcount);
      } catch (ex) {
        exceptionHandler(ex);
      } finally {
        this.setState({ loading: false });
      }
    };

    const handelClick = (e) => {
      e.preventDefault();
      const error = validate(userAcount, signupSchema);
      if (error) return toast.error(error);
      return doSumbit();
    };

    const hanleChange = ({ currentTarget: input }) => {
      const account = { ...userAcount };
      account[input.id] = input.value;
      this.setState({ account });
    };

    return (
      <React.Fragment>
        {loading && <Loader />}
        <div className="container">
          <div className="imgcontainer">
            <i className="fas fa-user-circle fa-5x" />
          </div>
          <Input
            onChange={hanleChange}
            autoFocus="autoFocus"
            value={email}
            type="email"
            id="email"
            label="Email"
            placeholder="johndeo@gmail.com"
            required="required"
          />
          <Input
            onChange={hanleChange}
            value={username}
            type="text"
            id="username"
            label="Username"
            placeholder="John Deo"
            required="required"
          />
          <Input
            onChange={hanleChange}
            value={password}
            type="password"
            id="password"
            label="Password"
            placeholder="password"
            required="required"
          />
          <Input
            onChange={hanleChange}
            value={confirmPassword}
            type="password"
            id="confirmPassword"
            label="Retype Password"
            placeholder="password"
            required="required"
          />
          <div className="right font12"><Link to="/forget">Forget Password</Link></div>
          <Button onClick={handelClick} id="Signup" value="Signup" />
          <div className="center font12">
            {'Already have an account?'}
            {' '}
            <Link to="/login">Login</Link>
          </div>
          <br />
          <div className="error font12" />
        </div>
      </React.Fragment>
    );
  }
}

export default Signup;
