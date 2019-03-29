import React from 'react';

const Header = () => (
  <header>
    <div>
      <a href="index.html" className="logo"><img className="image sm" src="image/new_logo.png" alt="logo" /></a>
      <a href="#" className="show-menu"><i className="fas fa-bars" /></a>
      <a href="" className="hide-menu"><i className="fas fa-times" /></a>
      <div className="header-right">
        <a href="" />
        <a href="index.html#contact">Contact</a>
        <a href="index.html#about">About</a>
        <a href="meetups.html">Meetups</a>
        <a id="dashboard" href="user.html">Dashboard</a>
        <a className="active" id="login" href="login.html">Sign in</a>
      </div>
    </div>
  </header>
);

export default Header;
