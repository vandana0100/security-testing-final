import { Employee } from '../models/Employee';

// Mocked database
const employees: Employee[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    position: 'Manager', 
    department: 'HR', 
    email: 'john@example.com', 
    phone: '123-456-7890', 
    branchId: 1 
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    position: 'Engineer', 
    department: 'Engineering', 
    email: 'jane@example.com', 
    phone: '987-654-3210', 
    branchId: 1 
  },
  { 
    id: '3', 
    name: 'Alice Brown', 
    position: 'HR Specialist', 
    department: 'HR', 
    email: 'alice@example.com', 
    phone: '555-123-4567', 
    branchId: 2 
  },
  { 
    id: '4', 
    name: 'Bob White', 
    position: 'Senior Engineer', 
    department: 'Engineering', 
    email: 'bob@example.com', 
    phone: '555-765-4321', 
    branchId: 2 
  }
];

// Function to create an employee
export const createEmployee = (employee: Employee): Employee => {
  if (!employee.id || !employee.name || !employee.email) {
    throw new Error('Failed to create employee'); // Error thrown if required fields are missing
  }
  
  // Logic for creating employee (e.g., saving to a database or in-memory store)
  return employee; // Assuming successful creation
};

export const getAllEmployees = () => {
  return employees; // No need for a try-catch block here
};

export const getEmployeeById = (id: string) => { // ID should be a string
  const employee = employees.find((e) => e.id === id);
  if (!employee) throw new Error('Employee not found');
  return employee;
};

export const updateEmployee = (id: string, updatedData: Partial<Employee>) => { // ID should be a string
  const employee = employees.find((e) => e.id === id);
  if (!employee) throw new Error('Employee not found');
  Object.assign(employee, updatedData);
  return employee;
};

export const deleteEmployee = (id: string) => { // ID should be a string
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) throw new Error('Employee not found');
  employees.splice(index, 1);
};

export function getEmployeesByBranch(arg0: number) {
  throw new Error('Function not implemented.');
}
export function getEmployeesByDepartment(department: string) {
  throw new Error('Function not implemented.');
}

