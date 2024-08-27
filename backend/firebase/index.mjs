import admin from "firebase-admin";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

let firebaseApp;

export const initializeFirebaseApp = async () => {
  if (!firebaseApp) {
    const secretName = "firebaseAdminCredentials";
    const client = new SecretsManagerClient({ region: "us-east-1" });
    const command = new GetSecretValueCommand({ SecretId: secretName });

    try {
      const { SecretString } = await client.send(command);
      const credentials = JSON.parse(SecretString);

      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(credentials),
        storageBucket: "supapreneur.appspot.com",
      });
    } catch (error) {
      console.error("Error fetching secret:", error);
      throw error;
    }
  }
  return firebaseApp;
};

export const validateToken = async (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const token = authHeader.split(" ")[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken.uid;
};
