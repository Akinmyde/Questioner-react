import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../../../public/images/new_logo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: true };
  }

  render() {
    const { auth } = this.props;
    const { userId } = auth;
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
            {userId && (
            <React.Fragment>
              <Link id="dashboard" to="/dashboard">Dashboard</Link>
              <Link id="logout" className="active" to="/logout">Logout</Link>
            </React.Fragment>
            )}
            {!userId && (
              <Link id="login" className="active" to="/login">Login</Link>
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

const mapStateToProps = ({auth}) => ({auth})

export default connect(mapStateToProps, {})(Header)

