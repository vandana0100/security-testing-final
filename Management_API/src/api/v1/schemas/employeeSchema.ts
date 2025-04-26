import Joi from 'joi';

const employeeSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name cannot be longer than 100 characters',
    'any.required': 'Name is required',
  }),
  position: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Position cannot be empty',
    'string.min': 'Position must be at least 3 characters long',
    'string.max': 'Position cannot be longer than 50 characters',
    'any.required': 'Position is required',
  }),
  department: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Department cannot be empty',
    'string.min': 'Department must be at least 3 characters long',
    'string.max': 'Department cannot be longer than 100 characters',
    'any.required': 'Department is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
    'string.empty': 'Phone cannot be empty',
    'string.pattern.base': 'Phone number must be a valid number with 10-15 digits',
    'any.required': 'Phone is required',
  }),
  branchId: Joi.number().integer().positive().required().messages({
    'number.base': 'Branch ID must be a number',
    'number.integer': 'Branch ID must be an integer',
    'number.positive': 'Branch ID must be a positive number',
    'any.required': 'Branch ID is required',
  }),
});

export default employeeSchema;
