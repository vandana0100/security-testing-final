import dotenv from "dotenv";
// Load environment variables BEFORE your internal imports!
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import setupSwagger from "../config/swagger";
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import health from './api/v1/routes/health';
import employeeRoutes from './api/v1/routes/employeeRoutes';
import branchRoutes from './api/v1/routes/branchRoutes'; 
import errorHandler from './api/v1/middleware/errorHandler';
import { accessLogger } from "./api/v1/middleware/logger";

const app = express();

// Swagger configuration 
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Management API',
      version: '1.0.0',
      description: 'API documentation for the Management API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/api/v1/routes/health.ts', './src/api/v1/routes/branchRoutes.ts', './src/api/v1/routes/employeeRoutes.ts'],  
};

// Generate Swagger docs
const specs = swaggerJsdoc(options);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Setup Swagger
setupSwagger(app);

// Middleware for JSON parsing
app.use(express.json());

// Logger middleware
export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Apply middleware before routes
app.use(accessLogger);

// Apply error handling middleware last
app.use(errorHandler);  // Handles all errors

// Use Helmet.js for basic security practices
app.use(helmet());

// Configure CORS to allow only trusted domains
const corsOptions = {
  origin: ['https://trusted-domain.com', 'https://another-trusted-domain.com'], // List of trusted domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

// Use CORS middleware with the configuration
app.use(cors(corsOptions));  

app.get('/test-unknown', (req, res, next) => {
  // Force an unknown error
  next(new Error('This is an unknown error'));
});

// Routes
app.use('/api/v1/', health);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/branches', branchRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});


// Root route
app.get('/', (req: Request, res: Response): void => {
  res.send('Welcome to the Management API. Visit /api-docs for API documentation.');
});

// Global Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    details: err.details || [],
  });
});

export default app;
