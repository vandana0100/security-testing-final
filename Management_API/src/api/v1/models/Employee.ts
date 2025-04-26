/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the employee
 *         name:
 *           type: string
 *           description: The name of the employee
 *         position:
 *           type: string
 *           description: The position of the employee in the company
 *         department:
 *           type: string
 *           description: The department where the employee works
 *         email:
 *           type: string
 *           description: The email address of the employee
 *         phone:
 *           type: string
 *           description: The phone number of the employee
 *         branchId:
 *           type: integer
 *           description: The ID of the branch the employee is assigned to
 */
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: number;
}
