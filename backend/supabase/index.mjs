import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export const querySupabase = async (tableName, query) => {
  try {
    const { data, error } = await supabase
      .from(tableName) 
      .select(query);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error querying Supabase:", error);
    throw error;
  }
};
