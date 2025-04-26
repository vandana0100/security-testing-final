import { Request, Response, NextFunction } from 'express';
import employeeSchema from '../schemas/employeeSchema';
import { branchSchema } from '../schemas/branchSchema';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = employeeSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: 'Invalid data',
      details: error.details
    });
    return;
  }
  next();
};

export const validateBranchData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = branchSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: 'Invalid branch data',
      details: error.details
    });
    return;
  }
  next();
};
