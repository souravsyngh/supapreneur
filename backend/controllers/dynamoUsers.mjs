import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Users";

if (!TABLE_NAME) {
  throw new Error("USERS_TABLE_NAME environment variable is not set");
}

export const handler = async (event) => {
  try {
    const { email, firebaseId } = JSON.parse(event.body);

    // Basic input validation
    if (!email || !firebaseId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email and Firebase ID are required" }),
      };
    }

    // Generate username from email
    const username = email.split("@")[0].toLowerCase();

    // Check if the user already exists
    const existingUser = await dynamo.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { email,firebaseId  },
      })
    );

    if (existingUser.Item) {
      console.info("Registration attempt for existing user", { email });
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "User already exists",
          userExists: true,
        }),
      };
    }

    // Create new user
    const newUser = {
      email,
      username,
      firebaseId,
    };

    await dynamo.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: newUser,
        ConditionExpression: "attribute_not_exists(email)", // Prevent race conditions
      })
    );

    console.info("User registered successfully", { email });
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User registered successfully",
        userExists: false,
      }),
    };
  } catch (error) {
    console.error("Error registering user", {
      error: error.message,
      stack: error.stack,
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
