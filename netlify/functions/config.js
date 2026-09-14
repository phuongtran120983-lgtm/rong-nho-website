// Netlify Function: Quản lý cấu hình thanh toán Sepay (Cloud Database)
// Endpoint: /api/config

let memoryConfig = {
  bank_shortcode: 'ACB',
  bank_name: 'ACB - Ngân Hàng TMCP Á Châu',
  bank_account: '876997',
  account_holder: 'TRAN THI PHUONG',
  sepay_api_token: process.env.SEPAY_API_TOKEN || ''
};

function getBlobStore() {
  try {
    const { getStore } = require('@netlify/blobs');
    return getStore({ name: 'rong_nho_config', consistency: 'strong' });
  } catch (err) {
    return null;
  }
}

exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: 'OK' };
  }

  const store = getBlobStore();

  if (event.httpMethod === 'POST') {
    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch(e){}
    
    if (body.bank_shortcode) memoryConfig.bank_shortcode = body.bank_shortcode.toUpperCase();
    if (body.bank_account) memoryConfig.bank_account = body.bank_account;
    if (body.account_holder) memoryConfig.account_holder = body.account_holder.toUpperCase();
    if (body.sepay_api_token !== undefined) memoryConfig.sepay_api_token = body.sepay_api_token;

    if (store) {
      try {
        await store.setJSON('payment_config', memoryConfig);
      } catch(e) {
        console.warn('Blobs save config error:', e);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, config: memoryConfig })
    };
  }

  // GET
  if (store) {
    try {
      const saved = await store.get('payment_config', { type: 'json' });
      if (saved) {
        memoryConfig = Object.assign(memoryConfig, saved);
      }
    } catch(e) {
      console.warn('Blobs load config error:', e);
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(memoryConfig)
  };
};
