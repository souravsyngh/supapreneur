import { supabase } from '/opt/nodejs/index.mjs'


export const handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,GET'
  };

  // Check if it's a preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: headers,
      body: ''
    };
  }

  const slug = event.pathParameters?.slug;

  if (!slug) {
    return {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({ message: 'Slug parameter is required' }),
    };
  }

  try {
    // Fetch company by slug
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // PGRST116 is the error code for "Results contain 0 rows"
        return {
          statusCode: 404,
          headers: headers,
          body: JSON.stringify({ message: 'Company not found' }),
        };
      }
      throw error;
    }

    if (!data) {
      return {
        statusCode: 404,
        headers: headers,
        body: JSON.stringify({ message: 'Company not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ company: data }),
    };
  } catch (err) {
    console.error('Error fetching company:', err);
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ message: 'Internal Server Error', error: err.message }),
    };
  }
};
