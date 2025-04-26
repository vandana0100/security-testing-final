import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Get the health status of the API
 *     tags:
 *      - Health
 *     description: Returns a simple message indicating if the API is healthy and functioning.
 *     responses:
 *       200:
 *         description: The API is healthy and operational.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server is healthy"
 *       500:
 *         description: Internal Server Error
 */
router.get('/health', (req: Request, res: Response) => {
  // This route is used to check if the API is functioning properly
  res.status(200).json({ message: 'Server is healthy' });
});

export default router;
