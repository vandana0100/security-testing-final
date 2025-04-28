import express from 'express';
import { getAllEmployeesForBranch, getEmployeesByDepartment } from '../controllers/employeeController';
const router = express.Router();
import { validateRequest } from '../middleware/validateRequest';

// Define the Employee interface
interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: number;
}

// In-memory employees store with Employee type
let employees: Employee[] = [];
let currentId = 1;

/**
 * @swagger
 * tags:
 *   - name: Employees
 *     description: API endpoints for managing employees
 */

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     description: Retrieve a list of all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Successfully retrieved employee list
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "John Doe"
 *                 position: "Software Engineer"
 *                 department: "IT"
 *                 email: "johndoe@example.com"
 *                 phone: "123-456-7890"
 *                 branchId: 101
 */
router.get('/', async (req, res) => {
  res.status(200).json(employees);
});

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     description: Add a new employee to the system
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               position:
 *                 type: string
 *                 example: "Project Manager"
 *               department:
 *                 type: string
 *                 example: "Operations"
 *               email:
 *                 type: string
 *                 example: "janedoe@example.com"
 *               phone:
 *                 type: string
 *                 example: "987-654-3210"
 *               branchId:
 *                 type: integer
 *                 example: 102
 *     responses:
 *       201:
 *         description: Successfully created employee
 *         content:
 *           application/json:
 *             example:
 *               id: 2
 *               name: "Jane Doe"
 *               position: "Project Manager"
 *               department: "Operations"
 *               email: "janedoe@example.com"
 *               phone: "987-654-3210"
 *               branchId: 102
 */
router.post('/', validateRequest, async (req, res) => {
  const newEmployee: Employee = {
    id: currentId++, // Increment id for each new employee
    ...req.body,
  };

  employees.push(newEmployee); // Push to the in-memory array or Firestore if integrated
  res.status(201).json(newEmployee); // Respond with the created employee
});

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     description: Retrieve details of a specific employee by their ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved employee details
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "John Doe"
 *               position: "Software Engineer"
 *               department: "IT"
 *               email: "johndoe@example.com"
 *               phone: "123-456-7890"
 *               branchId: 101
 *       404:
 *         description: Employee not found
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const employee = employees.find(emp => emp.id === parseInt(id));

  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});


/**
 * @swagger
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     description: Modify details of an existing employee
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               branchId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 */
router.put('/:id', validateRequest,  async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  let employee = employees.find(emp => emp.id === parseInt(id));
  if (employee) {
    employee = { ...employee, ...updatedData };
    res.status(200).json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Remove an employee from the system
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  employees = employees.filter(emp => emp.id !== parseInt(id));
  res.status(204).send();
});

/**
 * @swagger
 * /api/v1/employees/branch/{branchId}:
 *   get:
 *     summary: Get all employees for a specific branch
 *     description: Retrieve a list of employees assigned to a particular branch
 *     tags: [Employees]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         description: Branch ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved employees for the branch
 */
router.get('/branch/:branchId', getAllEmployeesForBranch);

/**
 * @swagger
 * /api/v1/employees/department/{department}:
 *   get:
 *     summary: Get all employees in a department
 *     description: Retrieve employees working in a specific department
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         description: Department name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved employees for the department
 */
router.get('/department/:department', getEmployeesByDepartment);

export default router;
