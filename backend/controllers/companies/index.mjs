import { querySupabase } from '/opt/nodejs/index.mjs';

export const handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
  };

  try {
    const companies = await querySupabase('startups', '*');

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ companies }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ message: 'Internal Server Error', error: err.message }),
    };
  }
};
