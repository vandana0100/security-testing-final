import app from './app';
import dotenv from "dotenv";
// Load environment variables BEFORE your internal imports!
dotenv.config();
 
// Only start the server if this file is run directly (not imported for testing)
let server: any;
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { server };