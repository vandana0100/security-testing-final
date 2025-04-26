import request from 'supertest';
import app from '../src/app';
import { describe, it, expect, beforeEach } from '@jest/globals';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: number;
}

describe('Employee API', () => {
  let employeeId: string;

  beforeEach(() => {
    (global as unknown as { employees: Employee[]; currentId: number }).employees = [];
    (global as unknown as { employees: Employee[]; currentId: number }).currentId = 1;
  });

  it('should create a new employee', async () => {
    const newEmployee = {
      name: 'John Dae',
      position: 'Senior Developer', 
      department: 'Engineering',
      email: 'john.dae@example.com',
      phone: '15559876543', 
      branchId: 2,
    };
    const response = await request(app).post('/api/v1/employees').send(newEmployee);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    employeeId = response.body.id;
  });

  it('should return 400 if required fields are missing during employee creation', async () => {
    const newEmployee = { name: 'John Dae' }; 

    const response = await request(app).post('/api/v1/employees').send(newEmployee);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid data');
  });

  it('should update employee information', async () => {
    if (!employeeId) {
      return;
    }

    const updatedEmployee = {
      name: 'John Dae', 
      position: 'Lead Developer',
      department: 'Engineering',
      email: 'john.dae@example.com',
      phone: '15559876543', 
      branchId: 2,
    };

    const response = await request(app).put(`/api/v1/employees/${employeeId}`).send(updatedEmployee);
    expect(response.status).toBe(200);
  });

  it('should return 400 if the employee update data is invalid', async () => {
    if (!employeeId) {
      return;
    }
    const invalidUpdate = { email: 'invalid-email', phone: '1234576453' };
    const response = await request(app).put(`/api/v1/employees/${employeeId}`).send(invalidUpdate);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid data');
  });

  it('should delete an employee', async () => {
    if (!employeeId) {
      console.log('Skipping test: No employee ID available');
      return;
    }
    const response = await request(app).delete(`/api/v1/employees/${employeeId}`);
    expect(response.status).toBe(204);
  });
});

describe('GET /api/v1/employees/branch/:branchId', () => {
  it('should return all employees for a specific branch', async () => {
    const res = await request(app).get('/api/v1/employees/branch/1');
    expect(res.status).toBe(200);
  });

  it('should return 404 if no employees found for the branch', async () => {
    const res = await request(app).get('/api/v1/employees/branch/999');
    expect(res.status).toBe(404);
  });
});

describe('GET /api/v1/employees/department/:department', () => {
  it('should return all employees for a specific department', async () => {
    const res = await request(app).get('/api/v1/employees/department/HR');
    expect(res.status).toBe(200);
  });

  it('should return 404 if no employees found in the department', async () => {
    const res = await request(app).get('/api/v1/employees/department/Marketing');
    expect(res.status).toBe(404);
  });
});
