import { supabase } from '/opt/nodejs/index.mjs';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
  };

export const handler = async (event, context) => {
    try {
        // Parse query parameters
        const queryParams = event.queryStringParameters || {};
        const { 
            page = 1, 
            limit = 10, 
            sector, 
            stage,
            region,
            search
        } = queryParams;

        // Calculate offset
        const offset = (page - 1) * limit;

        // Start building the query
        let query = supabase
            .from('companies')
            .select('*', { count: 'exact' });

        // Apply filters if provided
        if (sector) query = query.eq('sector', sector);
        if (stage) query = query.eq('stage', stage);
        if (region) query = query.eq('region', region);
        if (search) query = query.ilike('title', `%${search}%`);

        // Add pagination
        query = query.range(offset, offset + limit - 1);

        // Execute the query
        const { data, error, count } = await query;

        if (error) throw error;

        // Calculate total pages
        const totalPages = Math.ceil(count / limit);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                companies: data,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalItems: count,
                    itemsPerPage: parseInt(limit),
                }
            }),
        };
    } catch (error) {
        console.error('Error fetching companies:', error);
        return {
            statusCode: 500,
           headers,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};
