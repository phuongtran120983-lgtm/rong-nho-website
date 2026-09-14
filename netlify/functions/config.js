// Netlify Function: Trả về cấu hình thanh toán Sepay
// Endpoint: /api/config

exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: 'OK' };
  }

  const config = {
    bank_shortcode: 'MB',
    bank_account: '0933951409',
    account_holder: 'TRAN THI PHUONG',
    sepay_api_token: process.env.SEPAY_API_TOKEN || ''
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(config)
  };
};
