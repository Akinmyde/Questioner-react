/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import propTypes from 'prop-types';

const Input = ({ id, label, ...rest }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      {...rest}
      id={id}
    />
  </div>
);

Input.defaultProps = {
  autoFocus: propTypes.defaultProps = '',
};

Input.propTypes = {
  type: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  required: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  autoFocus: propTypes.string,
  value: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Input;
