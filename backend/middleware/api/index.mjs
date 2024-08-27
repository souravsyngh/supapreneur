export const handler = async (event) => {
  try {
    await initializeFirebaseApp();

    if (!event.authorizationToken) {
      return {
        principalId: 'user',
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Deny',
              Resource: event.methodArn,
            },
          ],
        },
        context: { error: 'Missing Authorization header' },
      };
    }

    const userId = await validateToken(event.authorizationToken);

    return {
      principalId: userId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn,
          },
        ],
      },
      context: { userId },
    };
  } catch (error) {
    console.error('Error in handler:', error);
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: event.methodArn,
          },
        ],
      },
      context: { error: error.message || 'Unauthorized' },
    };
  }
};
