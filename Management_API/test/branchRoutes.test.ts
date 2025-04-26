import { Request, Response, NextFunction } from 'express';
import { validateBranchData } from '../src/api/v1/middleware/validateRequest';

describe('Branch Validation Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  // Test valid branch data
  it('should call next if the branch data is valid', () => {
    req.body = {
      id: 'b9a6f23e-8586-41d2-b3c7-d1c032a3404e', // Valid id
      name: 'Main Branch',
      address: '123 Main St',
      phone: '5551234567',
    };

    validateBranchData(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledTimes(1); // Ensure next() is called
    expect(res.status).not.toHaveBeenCalled(); // Ensure no error response
  });

  // Test invalid name (too short)
  it('should return 400 if the name is too short', () => {
    req.body = {
      id: 'b9a6f23e-8586-41d2-b3c7-d1c032a3404e', // Valid id
      name: 'A',  // Invalid, should be at least 3 characters
      address: '123 Main St',
      phone: '5551234567',
    };

    validateBranchData(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid branch data',
      details: expect.any(Array), // Ensure error details are returned
    });
    expect(next).not.toHaveBeenCalled(); // next() should not be called on validation error
  });

  // Test invalid address (too short)
  it('should return 400 if the address is too short', () => {
    req.body = {
      id: 'b9a6f23e-8586-41d2-b3c7-d1c032a3404e', // Valid id
      name: 'Main Branch',
      address: '123', // Invalid, should be at least 5 characters
      phone: '5551234567',
    };

    validateBranchData(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid branch data',
      details: expect.any(Array),
    });
    expect(next).not.toHaveBeenCalled();
  });

  // Test invalid phone number (does not match pattern)
  it('should return 400 if the phone number is invalid', () => {
    req.body = {
      id: 'b9a6f23e-8586-41d2-b3c7-d1c032a3404e', // Valid id
      name: 'Main Branch',
      address: '123 Main St',
      phone: '12345773899339930',  // Invalid, should be a 10-digit number
    };

    validateBranchData(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid branch data',
      details: expect.any(Array),
    });
    expect(next).not.toHaveBeenCalled();
  });

  // Test missing required fields
  it('should return 400 if required fields are missing', () => {
    req.body = {
      id: 'b9a6f23e-8586-41d2-b3c7-d1c032a3404e', // Valid id
      name: 'Main Branch', // Missing address and phone
    };

    validateBranchData(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid branch data',
      details: expect.any(Array),
    });
    expect(next).not.toHaveBeenCalled();
  });
});
