import Joi from 'joi-browser';

const schema = {
  topic: Joi.string()
    .required()
    .label('Topic'),
  location: Joi.string()
    .required()
    .label('Location'),
  happeningOn: Joi.date()
    .required()
    .label('happeningOn'),
};

export default schema;
