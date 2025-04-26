import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee and Branch API',
      version: '1.0.0',
      description: 'API documentation for managing employees and branches',
    },
  },
  apis: ['./src/api/v1/routes/health.ts', './src/api/v1/routes/branchRoutes.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Swagger UI will be accessible at /api-docs
};

export default swaggerDocs;
