import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-toastify';
import Input from './common/Input';
import Button from './common/Button';
import validate from '../helpers/validator';
import signupSchema from '../schema/signupSchema';
import userService from './services/userService';
import exceptionHandler from '../helpers/exceptionHandler';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        username: '', email: '', password: '', confirmPassword: '',
      },
    };
  }

  render() {
    const { account: userAcount, error: signupError } = this.state;
    const {
      username, email, password, confirmPassword,
    } = userAcount;

    const doSumbit = async () => {
      // call the server
      try {
        const { data: result } = await userService.register(userAcount);
        const { data } = result;
        toast.success('Welcome');
        return console.log(data[0]);
      } catch (ex) {
        return exceptionHandler(ex);
      }
    };

    const handelClick = (e) => {
      e.preventDefault();
      const error = validate(userAcount, signupSchema);
      if (error) return toast.error(error);

      doSumbit();
      return console.log(this.state);
    };

    const hanleChange = ({ currentTarget: input }) => {
      const account = { ...userAcount };
      account[input.id] = input.value;
      this.setState({ account });
    };

    return (
      <div className="container">
        {signupError.length > 0 ? <p>{signupError}</p> : null }
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
    );
  }
}

export default Signup;
