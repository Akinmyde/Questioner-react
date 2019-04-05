import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/images/new_logo.png';

const Header = () => (
  <header>
    <div className="header">
      <Link to="/" className="logo"><img className="image sm" src={Logo} alt="logo" /></Link>
      <Link className="show-menu" to="/"><i className="fas fa-bars" /></Link>
      <Link className="hide-menu" to="/"><i className="fas fa-times" /></Link>
      <div className="header-right">
        <Link to="/" />
        <Link to="/meetups">Meetups</Link>
        <Link id="dashboard" to="/user">Dashboard</Link>
        <Link className="active" id="login" to="login.html">Sign in</Link>
      </div>
    </div>
  </header>
);

export default Header;
