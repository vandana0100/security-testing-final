import { createEmployee, getEmployeeById, updateEmployee, deleteEmployee } from '../src/api/v1/services/employeeService';

describe('Employee Service with Middleware for Error Handling', () => {
  beforeEach(() => {
    // Test setup (if needed)
  });

  it('should throw an error when creating an employee fails', () => {
    expect(() => createEmployee({
      id: '',
      name: 'John Doe',
      position: 'Developer',
      department: 'Engineering',
      email: 'john.doe@example.com',
      phone: '+1 (555) 987-6543',
      branchId: 2,
    })).toThrow('Failed to create employee');
  });

  it('should throw an error if an employee is not found by ID', () => {
    expect(() => getEmployeeById('non-existent-id')).toThrow('Employee not found');
  });

  it('should throw an error if an employee is not found during an update', () => {
    expect(() => updateEmployee('non-existent-id', { position: 'Lead Developer' }))
      .toThrow('Employee not found');
  });

  it('should throw an error if an employee is not found during deletion', () => {
    expect(() => deleteEmployee('non-existent-id')).toThrow('Employee not found');
  });
});
