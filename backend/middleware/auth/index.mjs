import { initializeFirebaseApp, validateToken } from '/opt/nodejs/index.mjs';

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    await initializeFirebaseApp();

    if (!event.headers || !event.headers.Authorization) {
      throw new Error('Missing Authorization header');
    }

    const userId = await validateToken(event.headers.Authorization);

    return {
      statusCode: 200,
      body: JSON.stringify({ userId, message: 'Authenticated successfully' }),
    };
  } catch (error) {
    console.error('Error in handler:', error);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: error.message || 'Unauthorized' }),
    };
  }
};
