import { Request, Response, NextFunction } from 'express';
import { Branch } from '../models/branch';

let branches: Branch[] = [];
let currentId = 1;

// Create a new branch
export const createBranch = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, address, phone } = req.body;
    const newBranch: Branch = { id: currentId++, name, address, phone };
    branches.push(newBranch);
    res.status(201).json(newBranch);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// Get all branches
export const getAllBranches = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(branches);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// Get branch by ID
export const getBranchById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const branch = branches.find(branch => branch.id === parseInt(id));
    
    if (branch) {
      res.status(200).json(branch);
    } else {
      res.status(404).json({ message: 'Branch not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// Update a branch
export const updateBranch = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    let branch = branches.find(branch => branch.id === parseInt(id));
    if (branch) {
      branch = { ...branch, ...updatedData };
      res.status(200).json(branch);
    } else {
      res.status(404).json({ message: 'Branch not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// Delete a branch
export const deleteBranch = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    branches = branches.filter(branch => branch.id !== parseInt(id));
    res.status(204).send();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

