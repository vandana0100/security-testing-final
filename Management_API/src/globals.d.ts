// globals.d.ts
import { Employee } from './src/api/v1/routes/employeeRoutes'; // Adjust the path to where Employee interface is defined

declare global {
  var employees: Employee[];
  var currentId: number;
}

export {};  // This ensures the file is treated as a module
