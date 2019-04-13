import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../../../public/images/new_logo.png';

const Header = ({ userId }) => (
  <header>
    <div className="header">
      <Link to="/" className="logo"><img className="image sm" src={Logo} alt="logo" /></Link>
      <Link className="show-menu" to="/"><i className="fas fa-bars" /></Link>
      <Link className="hide-menu" to="/"><i className="fas fa-times" /></Link>
      <div className="header-right">
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

Header.defaultProps = {
  userId: propTypes.defaultProps = null,
};

Header.propTypes = {
  userId: propTypes.number,
};

export default Header;
