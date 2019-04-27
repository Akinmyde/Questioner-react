import Joi from 'joi-browser';

const schema = {
  title: Joi.string()
    .required()
    .label('Title'),
  body: Joi.string()
    .required()
    .label('Body'),
};

export default schema;
