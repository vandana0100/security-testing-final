/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the branch
 *         name:
 *           type: string
 *           description: The name of the branch
 *         address:
 *           type: string
 *           description: The address of the branch
 *         phone:
 *           type: string
 *           description: The contact phone number of the branch
 */
export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
}
