import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({
  id,
  location,
  date,
  title,
  imageUrl,
  isAdmin,
}) => (
  <div className="meetup-link">
    <div>
      <img className="image" src={imageUrl} alt="logo" />
      <h4><Link className="meetup-link" to={`/meetups/${id}`}>{title}</Link></h4>
      <h6>{location}</h6>
      <span className="text-holder">
        <ul className="details">
          <li>{date}</li>
          {isAdmin && (
          <React.Fragment>
            <li title="delete"><Link to="/meetups" className="delete"><i className="fas fa-trash" /></Link></li>
            <li title="edit"><Link to="/meetups" className="edit"><i className="fas fa-edit" /></Link></li>
          </React.Fragment>
          )}
        </ul>
      </span>
    </div>
  </div>
);

Card.propTypes = {
  id: propTypes.number.isRequired,
  location: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  imageUrl: propTypes.string.isRequired,
  isAdmin: propTypes.bool.isRequired,
};

export default Card;
