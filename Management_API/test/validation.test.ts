import { Request, Response, NextFunction } from 'express';
import { validateRequest, validateBranchData } from '../src/api/v1/middleware/validateRequest'; // import your middlewares

const mockRequest = (body: object) => ({
  body
} as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

  describe('validateBranchData Middleware', () => {
    it('should call next for valid branch data', () => {
      const validBranchData = {
        id: 'e0b3f710-928f-41e1-b74a-dc56b287e1bb',
        name: 'Main Branch',
        address: '123 Main St',
        phone: '5551234567'
      };
      const req = mockRequest(validBranchData);
      const res = mockResponse();
      const next = mockNext;
  
      validateBranchData(req, res, next);
  
      expect(next).toHaveBeenCalledTimes(1); // Ensure next() is called exactly once
      expect(res.status).not.toHaveBeenCalled(); // No status should be set for valid data
      expect(res.json).not.toHaveBeenCalled(); // No response should be sent
    });
  
  it('should return 400 for invalid employee data', () => {
    const invalidData = {
      name: 'J',  // Invalid name (too short)
      position: 'Manager',
      email: 'invalid-email'
    };
    const req = mockRequest(invalidData);
    const res = mockResponse();
    const next = mockNext;

    validateRequest(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid data',  // Expecting the message to be "Invalid data"
      details: expect.any(Array) // The validation details should be an array
    });
    expect(next).not.toHaveBeenCalled(); // next() should not be called if there's a validation error
  });
});

describe('validateBranchData Middleware', () => {
  it('should call next for valid branch data', () => {
    const validBranchData = {
      id: 'e0b3f710-928f-41e1-b74a-dc56b287e1bb',
      name: 'Main Branch',
      address: '123 Main St',
      phone: '5551234567'
    };
    const req = mockRequest(validBranchData);
    const res = mockResponse();
    const next = mockNext;

    validateBranchData(req, res, next);

    expect(next).toHaveBeenCalledTimes(1); // Ensure next() is called exactly once
    expect(res.status).not.toHaveBeenCalled(); // No status should be set for valid data
    expect(res.json).not.toHaveBeenCalled(); // No response should be sent
  });

  it('should return 400 for invalid branch data', () => {
    const invalidBranchData = {
      id: 'invalid-uuid',
      name: 'AB', // Invalid name (too short)
      address: '123', // Valid address
      phone: '12345' // Invalid phone format
    };
    const req = mockRequest(invalidBranchData);
    const res = mockResponse();
    const next = mockNext;

    validateBranchData(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid branch data',  // Expecting "Invalid branch data"
      details: expect.any(Array) // The validation details should be an array
    });
    expect(next).not.toHaveBeenCalled(); // next() should not be called if there's a validation error
  });
});
