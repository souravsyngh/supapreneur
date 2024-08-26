import { supabase} from "/opt/nodejs/index.mjs"

export const handler = async (event) => {
 
  
   const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };
  
  try {
    const { firebaseId, email } = JSON.parse(event.body);
    console.log("Parsed body:", { firebaseId, email });

    if (!firebaseId || !email) {
      console.log("Missing firebaseId or email");
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Firebase ID and email are required" }),
      };
    }
        // Check if the user already exists
        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select()
            .eq('firebase_id', firebaseId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            throw fetchError;
        }

        if (existingUser) {
            // User exists, return login success
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: "Login successful", user: existingUser }),
            };
        } else {
            // User doesn't exist, create a new user
            const { data: newUser, error: insertError } = await supabase
                .from('users')
                .insert({ firebase_id: firebaseId, email })
                .select()
                .single();

            if (insertError) {
                throw insertError;
            }

            return {
                statusCode: 201,
                headers,
                body: JSON.stringify({ message: "User registered successfully", user: newUser }),
            };
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "An error occurred. Please try again later." }),
        };
    }
};
