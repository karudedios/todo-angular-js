const Joi = require('joi');

module.exports = Joi.alternatives(Joi.object(), Joi.string().length(24));
