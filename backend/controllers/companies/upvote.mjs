import { supabase } from '/opt/nodejs/index.mjs';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const handleVoteTransaction = async (userId, companyId) => {
  const response = await supabase.rpc('handle_vote', { p_user_id: userId, p_company_id: companyId });
  return response; 
};

const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const handler = async (event) => {
  try {
    const { userId, companyId } = event.body; // Parse the body

    if (!userId || !companyId || !isValidUUID(userId) || !isValidUUID(companyId)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid or missing userId or companyId' }),
      };
    }

    const response = await handleVoteTransaction(userId, companyId);
    
    if (response.error) {
      throw new Error('Failed to process vote');
    }

    const { action, vote_count } = response.data[0]; 

    console.log(`Vote ${action} for company ${companyId}. New vote count: ${vote_count}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: `Vote ${action} successfully`,
        companyId,
        voteCount: vote_count
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error', error: error.message }),
    };
  }
};
