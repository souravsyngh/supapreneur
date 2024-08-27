import { supabase } from '/opt/nodejs/index.mjs';

export const handler = async (event) => {
  const { user_id, startup_id } = JSON.parse(event.body);

  if (!user_id || !startup_id) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid input data' }),
    };
  }

  try {
    // Step 1: Fetch existing upvote status for the user and startup
    const { data: existingUpvote, error: fetchError } = await supabase
      .from('upvotes')
      .select('id, is_upvote')
      .eq('user_id', user_id)
      .eq('startup_id', startup_id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Error fetching upvote status' }),
      };
    }

    // Step 2: If an upvote exists, toggle its status
    if (existingUpvote) {
      const newIsUpvote = !existingUpvote.is_upvote;
      const { error: updateError } = await supabase
        .from('upvotes')
        .update({ is_upvote: newIsUpvote, updated_at: new Date().toISOString() })
        .eq('id', existingUpvote.id);

      if (updateError) {
        return {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Error updating upvote' }),
        };
      }
    } else {
      // Step 3: If no upvote exists, insert a new one with is_upvote = true
      const { error: insertError } = await supabase
        .from('upvotes')
        .insert({ user_id, startup_id, is_upvote: true });

      if (insertError) {
        return {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Error inserting upvote' }),
        };
      }
    }

    // Step 4: Fetch the updated upvote count
    const { count: upvoteCount, error: countError } = await supabase
      .from('upvotes')
      .select('*', { count: 'exact', head: true })
      .eq('startup_id', startup_id)
      .eq('is_upvote', true);

    if (countError) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Error fetching upvote count' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify({
        message: 'Upvote status updated successfully',
        upvote_count: upvoteCount,
      }),
    };
  } catch (error) {
    console.error('Internal Server Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
