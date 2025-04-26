import morgan, { StreamOptions } from 'morgan';
import fs from 'fs';
import path from 'path';

// Ensure the logs directory exists
const logDirectory = path.join(__dirname, '../../../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true }); // Create the directory if it doesn't exist
}

// Create a write stream (in append mode) for access logs
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

// Create a write stream for error logs
const errorLogStream: StreamOptions = {
  write: (message) => fs.appendFileSync(path.join(logDirectory, 'error.log'), message),
};

// Setup the logger for access logs
const accessLogger = morgan('combined', { stream: accessLogStream });

// Setup the logger for error logs (you can adjust the format if needed)
const errorLogger = morgan('combined', { stream: errorLogStream });

export { accessLogger, errorLogger };
