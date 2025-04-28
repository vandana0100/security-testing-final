import { NextFunction, Request, Response } from 'express';
import * as employeeService from '../services/employeeService';
import { Employee } from '../models/employeeGroup';

// Create a new employee
export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// Get all employees
export const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees); // Return employee data
  } catch (error) {
    next(error);
  }
};

// Get employee by ID
export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id.toString());
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Update employee information
export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedEmployee = await employeeService.updateEmployee(req.params.id.toString(), req.body);
    if (updatedEmployee) {
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Delete an employee
export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await employeeService.deleteEmployee(req.params.id.toString());
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};

const employees: Employee[] = [
  { id: 1, name: 'John Doe', department: 'HR', branchId: 1 },
  { id: 2, name: 'Jane Smith', department: 'Engineering', branchId: 1 },
  { id: 3, name: 'Alice Brown', department: 'HR', branchId: 2 },
  { id: 4, name: 'Bob White', department: 'Engineering', branchId: 2 },
];

// Get all employees for a specific branch
export const getAllEmployeesForBranch = (req: Request, res: Response, next: NextFunction) => {
  const { branchId } = req.params;
  const branchEmployees = employees.filter(employee => employee.branchId === parseInt(branchId));

  if (branchEmployees.length > 0) {
    res.status(200).json(branchEmployees);
  } else {
    // Explicitly create a 404 error response
    res.status(404).json({ message: 'No employees found for this branch.' });
  }
};

// Get all employees for a specific department
export const getEmployeesByDepartment = (req: Request, res: Response, next: NextFunction) => {
  const { department } = req.params;
  const departmentEmployees = employees.filter(employee => employee.department.toLowerCase() === department.toLowerCase());

  if (departmentEmployees.length > 0) {
    res.status(200).json(departmentEmployees);
  } else {
    // Explicitly create a 404 error response
    res.status(404).json({ message: 'No employees found in this department.' });
  }
};


