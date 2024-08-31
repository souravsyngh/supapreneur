import { supabase } from "/opt/nodejs/index.mjs";

const headers = {
  'Access-Control-Allow-Origin': '*', 
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const handler = async (event) => {
  try {
    const { firebaseId, email } = JSON.parse(event.body);
    console.log("Received request:", { firebaseId, email });

    if (!firebaseId || !email) {
      console.log("Missing firebaseId or email");
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Firebase ID and email are required" }),
      };
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select()
      .eq('firebase_id', firebaseId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error("Error fetching user:", fetchError);
      throw fetchError;
    }

    if (existingUser) {
      console.log("Existing user logged in:", existingUser.id);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Login successful", user: existingUser }),
      };
    } else {
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({ firebase_id: firebaseId, email })
        .select()
        .single();

      if (insertError) {
        console.error("Error creating new user:", insertError);
        throw insertError;
      }

      console.log("New user registered:", newUser.id);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ message: "User registered successfully", user: newUser }),
      };
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "An error occurred. Please try again later." }),
    };
  }
};
