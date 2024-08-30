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
    let body;
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else {
      body = event.body;
    }
    
    console.log('Received body:', body);

    const { userId, companyId } = body;

    if (!userId || !companyId) {
      console.log('Invalid or missing userId or companyId:', { userId, companyId });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid or missing userId or companyId' }),
      };
    }

    const response = await handleVoteTransaction(userId, companyId);
    
    console.log('Vote transaction response:', response);
    
    if (response.error) {
      throw new Error('Failed to process vote: ' + response.error.message);
    }

    if (!response.data || response.data.length === 0) {
      throw new Error('No data returned from vote transaction');
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
