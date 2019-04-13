import React from 'react';
import propTypes from 'prop-types';

const Button = ({ value, ...rest }) => (<button {...rest} className="btn" type="submit">{value}</button>);

Button.propTypes = {
  id: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default Button;
