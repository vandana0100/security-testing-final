import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get the service account credentials from environment variables
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
};

// Initialize the Firebase app with the service account credentials
initializeApp({
  credential: cert(serviceAccount),
});

// Get a reference to the Firestore service
const db: Firestore = getFirestore();

export { db };

