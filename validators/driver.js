const Joi = require('@hapi/joi');

exports.driverValidation = (driver) => {
  const schema = Joi.object({
    masjid_location: Joi.required(),
    time_leaving: Joi.string().required(),
    jumma_timings: Joi.required(),
    current_location: Joi.required(),
    city: Joi.string().lowercase().required(),
    phone_number: Joi.string().required(),
    radius_in_miles: Joi.string().required(),
    message: Joi.string(),
  });

  return schema.validate(driver);
};
