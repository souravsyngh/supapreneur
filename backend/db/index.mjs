import {
  RDSDataClient,
  ExecuteStatementCommand,
} from "@aws-sdk/client-rds-data";

// Configuration
const CLUSTER_ARN = "arn:aws:rds:us-east-1:339713102948:cluster:meshcircle-dev";
const SECRET_ARN =
  "arn:aws:secretsmanager:us-east-1:339713102948:secret:rds!cluster-e85738b5-0643-4df8-b340-86c5e8dcfa89-2FF5Ku";
const DATABASE_NAME = "meshcircledev";

const rdsDataClient = new RDSDataClient({ region: "us-east-1" });

const executeStatement = async (sql, parameters = []) => {
  const params = {
    resourceArn: CLUSTER_ARN,
    secretArn: SECRET_ARN,
    database: DATABASE_NAME,
    sql: sql,
    parameters: parameters,
  };

  try {
    const command = new ExecuteStatementCommand(params);
    const response = await rdsDataClient.send(command);
    return response.records;
  } catch (error) {
    console.error("Error executing SQL:", error);
    throw error;
  }
};

const checkDatabaseConnection = async () => {
  try {
    console.log("Checking database connection...");
    const result = await executeStatement("SELECT 1");
    if (result && result.length > 0) {
      console.log("Database connection successful");
      return true;
    } else {
      console.log("Database connection check failed");
      return false;
    }
  } catch (error) {
    console.error("Database connection check failed:", error);
    return false;
  }
};

const handler = async (event, context) => {
  const isConnected = await checkDatabaseConnection();
  if (!isConnected) {
    throw new Error("Failed to connect to the database");
  }

  try {
    console.log("Executing query...");
    const sql = "SELECT * FROM package";
    const results = await executeStatement(sql);
    console.log("Query executed successfully");

    // Transform the results
    const transformedResults = results.map((row) => {
      const obj = {};
      row.forEach((col, index) => {
        const key = Object.keys(col)[0]; // Get the column name
        obj[key] = Object.values(col)[0]; // Get the column value
      });
      return obj;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(transformedResults),
    };
  } catch (err) {
    console.error("Error during operation:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

export { handler };
