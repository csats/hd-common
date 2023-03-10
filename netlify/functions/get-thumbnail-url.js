import { createClient } from '@supabase/supabase-js';

const {
  CSATS_DATABASE_URL,
  CSATS_DATABASE_SECRET_API_KEY
} = process.env;

const supabase = createClient(CSATS_DATABASE_URL, CSATS_DATABASE_SECRET_API_KEY);

exports.handler = async function (event, context) {
  console.log(event.queryStringParameters)
  const thumbnailName = event.queryStringParameters['name'];

  let { data, error } = await supabase.storage
    .from('case-thumbnails')
    .createSignedUrl(thumbnailName, 60000, {
      transform: {
        width: 375,
        height: 250,
      },
    })
  if (error) {
    console.log(error)
  }

  console.log(data);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // TODO: Tighten security here
    },
    body: JSON.stringify(data.signedUrl),
  };

}