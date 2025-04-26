/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the employee
 *         name:
 *           type: string
 *           description: The name of the employee
 *         department:
 *           type: string
 *           description: The department where the employee works
 *         branchId:
 *           type: integer
 *           description: The ID of the branch the employee is assigned to
 *     EmployeeList:
 *       type: object
 *       properties:
 *         branchId:
 *           type: integer
 *           description: The ID of the branch to which employees belong
 *         employees:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Employee'
 *           description: List of employees for a particular branch
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         code:
 *           type: string
 *           description: Optional error code
 */
export interface Employee {
  id: number;
  name: string;
  department: string;
  branchId: number;
}

export interface EmployeeList {
  branchId: number;
  employees: Employee[];
}

export const errorResponse = (message: string, code?: string | number) => {
  return { message, code };
};
