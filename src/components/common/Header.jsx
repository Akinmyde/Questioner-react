import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../../../public/images/new_logo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { className: 'fas fa-bars', showMenu: false };
  }

  toggleMenu = e => {
    let className;
    let showMenu;
    if (this.state.className === 'fas fa-bars') {
      className = 'fas fa-times'
      showMenu = true;
    } 
    else {
      className = 'fas fa-bars'
      showMenu = false
    }
    this.setState({ className, showMenu: !showMenu })
  }
  render() {
    const { userId } = this.props;
    const { className, showMenu } = this.state;
    return (
      <header>
        <div className="header">
          <Link to="/" className="logo"><img className="image sm" src={Logo} alt="logo" /></Link>
          <Link className="show-menu" onClick={this.toggleMenu}><i className={className} /></Link>
          <div style={{ float: 'right', display: !showMenu ? 'block' : 'none' }}>
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
