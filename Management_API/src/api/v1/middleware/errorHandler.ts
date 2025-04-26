import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import fs from "fs"; // Add fs import for file system operations
import path from "path"; // Add path import for file paths
import { RepositoryError, ServiceError } from "../errors/errors"; 
import { errorResponse } from "../models/employeeGroup";

interface ExtendedError extends Error {
  code?: string | number;
  stack?: string;
}

// Create a write stream for error logging
const errorLogStream = fs.createWriteStream(
  path.join(__dirname, "../../../logs/error.log"), 
  { flags: "a" } // Append to the file
);

// Use the morgan logger with a custom stream for error logging
const errorLogger = morgan("combined", { stream: errorLogStream });

const errorHandler = (
  err: ExtendedError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log the error using morgan (errorLogger)
  errorLogger(req, res, () => {});
  console.error(err);

  // Handle specific types of errors
  if (err instanceof RepositoryError || err instanceof ServiceError) {
    res.status(500).json(errorResponse(err.message, err.code));
  } else {
    // Generic error response for unhandled errors
    res.status(500).json(errorResponse("An unexpected error occurred"));
  }
};

export default errorHandler;
