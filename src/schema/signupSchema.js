import Joi from 'joi-browser';

const schema = {
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required().label('Email'),
  username: Joi.string()
    .required().label('Username'),
  password: Joi.string()
    .min(8)
    .alphanum()
    .required()
    .label('Password'),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .options({
      language: {
        any: {
          allowOnly: '!!Passwords do not match',
        },
      },
    }),
};

export default schema;
