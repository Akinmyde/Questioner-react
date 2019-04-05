import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div id="banner">
    <div>
      <h1>Welcome to Questioner App</h1>
      <div className="banner-button">
        <Link className="md" to="/login">Get Started</Link>
      </div>
    </div>
  </div>
);

export default HomePage;
