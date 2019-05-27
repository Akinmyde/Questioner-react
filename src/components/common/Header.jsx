import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../../../public/images/new_logo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: true };
  }

  render() {
    const { userId } = this.props;
    const { showMenu } = this.state;
    return (
      <header>
        <div className="header">
          <Link to="/" className="logo"><img className="image sm" src={Logo} alt="logo" /></Link>
          <label htmlFor="check" className="show-menu"><i className='fas fa-bars' /></label>
          <input type="checkbox" id="check" name="check" />
          <div className="menu">
            <Link to="/" />
            <Link to="/meetups">Meetups</Link>
            {!userId && <Link className="active" id="login" to="/login">Login</Link>}
            {userId && (
            <React.Fragment>
              <Link id="dashboard" to="/dashboard">Dashboard</Link>
              <Link id="logout" className="active" to="/logout">Logout</Link>
            </React.Fragment>
            )}
          </div>
        </div>
      </header>
    );
  }
}


Header.defaultProps = {
  userId: propTypes.defaultProps = null,
};

Header.propTypes = {
  userId: propTypes.number,
};

export default Header;
