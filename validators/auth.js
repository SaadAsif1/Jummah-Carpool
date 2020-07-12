const Joi = require('@hapi/joi');

exports.signupValidation = (signup) => {
  const schema = Joi.object({
    name: Joi.string().max(32).required(),
    age: Joi.string().max(10).required(),
    email: Joi.string().max(32).lowercase().required(),
    password: Joi.string().min(6).max(20).required(),
    masjid: Joi.string().required(),
  });

  return schema.validate(signup);
};

exports.singinValidation = (signIn) => {
  const schema = Joi.object({
    email: Joi.string().max(32).lowercase().required(),
    password: Joi.string().min(6).max(20).required(),
  });

  return schema.validate(signIn);
};

exports.forgotPasswordValidation = (signIn) => {
  const schema = Joi.object({
    email: Joi.string().max(32).lowercase().required(),
  });

  return schema.validate(signIn);
};

exports.resetPasswordValidation = (signIn) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).max(20).required(),
    resetPasswordLink: Joi.string().required(),
  });

  return schema.validate(signIn);
};
