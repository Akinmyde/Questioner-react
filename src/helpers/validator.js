import Joi from 'joi-browser';

const joiFormater = str => str.split('"').join('');

const validate = (data, schema) => {
  const { error } = Joi.validate(data, schema);
  if (!error) return '';
  const { message } = error.details[0];
  return joiFormater(message);
};

export default validate;
