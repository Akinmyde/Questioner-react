import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from './common/Input';
import Button from './common/Button';
import validate from '../helpers/validator';
import loginSchema from '../schema/loginSchema';
import userService from './services/userService';
import exceptionHandler from '../helpers/exceptionHandler';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { account: { email: '', password: '' } };
  }

  render() {
    const { account: userAcount } = this.state;
    const { email, password } = userAcount;

    const doSumbit = async () => {
      // call the server
      try {
        const { data: result } = await userService.login(userAcount);
        const { data } = result;
        toast.success('Welcome');
        return console.log(data[0]);
      } catch (ex) {
        return exceptionHandler(ex);
      }
    };

    const handelClick = (e) => {
      e.preventDefault();
      const error = validate(userAcount, loginSchema);
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
      <React.Fragment>
        <div className="container">
          <div className="imgcontainer">
            <i className="fas fa-user-circle fa-5x" />
          </div>
          <Input
            value={email}
            onChange={hanleChange}
            autoFocus="autoFocus"
            type="email"
            id="email"
            label="Email"
            placeholder="johndeo@gmail.com"
            required="required"
          />
          <Input
            value={password}
            onChange={hanleChange}
            type="password"
            id="password"
            label="Password"
            placeholder="password"
            required="required"
          />
          <div className="right font12"><Link to="/forget">Forget Password</Link></div>
          <Button onClick={handelClick} id="login" value="Login" />
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
