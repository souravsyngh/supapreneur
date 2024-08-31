import { supabase } from '/opt/nodejs/index.mjs'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

const createResponse = (statusCode, body) => ({
  statusCode,
  headers,
  body: JSON.stringify(body)
})

export const handler = async (event) => {
  console.log(event)
  try {
    const firebaseId = event.pathParameters?.firebaseId

    if (!firebaseId) {
      return createResponse(400, { error: 'Firebase ID is required' })
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, email')
      .eq('firebase_id', firebaseId) // Corrected column name
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return createResponse(500, { error: 'Internal server error' })
    }

    if (!data) {
      return createResponse(404, { error: 'User not found' })
    }

    return createResponse(200, { user: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return createResponse(500, { error: 'Internal server error' })
  }
}
