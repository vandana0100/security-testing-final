import express from 'express';
import request from 'supertest';
import  errorHandler  from '../src/api/v1/middleware/errorHandler';  
import { RepositoryError, ServiceError } from "../src/api/v1/errors/errors"; 

describe('Error Handler Middleware', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());  

    app.get('/test', (req, res) => {
      throw new RepositoryError('Test repository error');
    });

    app.post('/test', (req, res) => {
      throw new ServiceError('Test service error');
    });

    // Catch-all for undefined routes
    app.use('*', (req, res, next) => {
      next(new Error('Unknown route')); 
    });

    // Attach the error handler middleware at the end of all routes
    app.use(errorHandler);
  });

  it('should return 500 and a custom message for RepositoryError', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Test repository error');
  });

  it('should return 500 and a custom message for ServiceError', async () => {
    const response = await request(app).post('/test');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Test service error');
  });

  it('should return 500 for unknown errors', async () => {
    const response = await request(app).get('/test-unknown');
    expect(response.status).toBe(500); 
    expect(response.body.message).toBe('An unexpected error occurred');
  });
});
