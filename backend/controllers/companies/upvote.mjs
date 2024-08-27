import { supabase } from '/opt/nodejs/index.mjs';

const handleVoteTransaction = async (userId, companyId) => {
  const response = await supabase.rpc('handle_vote', { p_user_id: userId, p_company_id: companyId });
  return response; 
};
export const handler = async (event) => {  
   const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };
  try {
    const body = JSON.parse(event.body); // Parse the body
    const { userId, companyId } = body;

    if (!userId || !companyId) {
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
    console.error('Error in vote handler:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error', error: error.message }),
    };
  }
};
