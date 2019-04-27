import React from 'react';
import propTypes from 'prop-types';

const Button = ({ value, ...rest }) => (<button {...rest} type="button">{value}</button>);

Button.defaultProps = {
  className: propTypes.defaultProps = 'btn',
};

Button.propTypes = {
  id: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  className: propTypes.string,
};

export default Button;
