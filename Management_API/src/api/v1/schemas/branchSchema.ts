import Joi from 'joi';

export const branchSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.empty': 'Branch ID cannot be empty',
    'string.uuid': 'Branch ID must be a valid UUID',
    'any.required': 'Branch ID is required',
  }),

  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Branch name cannot be empty',
    'string.min': 'Branch name must be at least 3 characters long',
    'string.max': 'Branch name cannot be longer than 100 characters',
    'any.required': 'Branch name is required',
  }),

  address: Joi.string().min(5).max(200).required().messages({
    'string.empty': 'Address cannot be empty',
    'string.min': 'Address must be at least 5 characters long',
    'string.max': 'Address cannot be longer than 200 characters',
    'any.required': 'Address is required',
  }),

  phone: Joi.string().pattern(/^[+]?[0-9]{10,15}$/).required().messages({
    'string.empty': 'Phone number cannot be empty',
    'string.pattern.base': 'Phone number must be a valid number with 10-15 digits, including an optional international code (e.g., +1234567890)',
    'any.required': 'Phone number is required',
  }),
});
