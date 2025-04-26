import { Router } from 'express';
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from '../controllers/branchController';
import { validateRequest } from '../middleware/validateRequest';

const router: Router = Router();

/**
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags:
 *       - Branches  # Corrected formatting
 *     description: API endpoint to create a new branch in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the branch
 *               address:
 *                 type: string
 *                 description: Physical address of the branch
 *               phone:
 *                 type: string
 *                 description: Contact phone number of the branch
 *     responses:
 *       '201':
 *         description: Branch created successfully
 *       '400':
 *         description: Bad request, invalid input data
 */
router.post('/', validateRequest, createBranch); // Create new branch

/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Get all branches
 *     tags:
 *       - Branches  # Added missing tags
 *     description: Retrieve a list of all branches in the system.
 *     responses:
 *       '200':
 *         description: Successfully retrieved all branches
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "Main Branch"
 *                 address: "123 Main St"
 *                 phone: "123-456-7890"
 *               - id: 2
 *                 name: "Branch 2"
 *                 address: "456 Branch Rd"
 *                 phone: "987-654-3210"
 */
router.get('/', getAllBranches); // Get all branches

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags:
 *       - Branches  # Added missing tags
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Branch found and retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "Main Branch"
 *               address: "123 Main St"
 *               phone: "123-456-7890"
 *       '404':
 *         description: Branch not found for the given ID
 */
router.get('/:id', getBranchById); // Get branch by ID

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update an existing branch by ID
 *     tags:
 *       - Branches  # Added missing tags
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to update
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
 *                 description: Updated name of the branch
 *               address:
 *                 type: string
 *                 description: Updated address of the branch
 *               phone:
 *                 type: string
 *                 description: Updated phone number of the branch
 *     responses:
 *       '200':
 *         description: Branch updated successfully
 *       '404':
 *         description: Branch not found for the given ID
 */
router.put('/:id', validateRequest, updateBranch); // Update a branch by ID

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags:
 *       - Branches  # Added missing tags
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Branch deleted successfully (No content returned)
 *       '404':
 *         description: Branch not found for the given ID
 */
router.delete('/:id', deleteBranch); // Delete a branch by ID

export default router;
