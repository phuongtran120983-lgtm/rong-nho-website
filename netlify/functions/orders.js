// Netlify Function: Quản lý Đơn hàng (Orders) lưu trữ đám mây 24/7
// Endpoint: /api/orders, /api/orders/check-status, /api/orders/confirm

let memoryOrders = [
  { id: 1, order_code: "RN1001", customer_name: "Nguyễn Thị Thu Hà", customer_phone: "0912345678", customer_email: "thuha.nguyen@gmail.com", product_id: 1, product_name: "COMBO MUA 3 TẶNG 1 (Tổng 4 Hộp)", amount: 299000, status: "success", created_at: "2026-09-12 14:10:00" },
  { id: 2, order_code: "RN1002", customer_name: "Trần Thanh Thảo", customer_phone: "0987654321", customer_email: "thao.tran@outlook.com", product_id: 4, product_name: "Ebook: Cẩm Nang 15 Món Ăn Eat Clean Cùng Rong Nho", amount: 99000, status: "success", created_at: "2026-09-13 09:25:00" },
  { id: 3, order_code: "RN1003", customer_name: "Lê Hoàng Yến", customer_phone: "0903112233", customer_email: "hoangyen.le@gmail.com", product_id: 2, product_name: "COMBO MUA 5 TẶNG 2 (Tổng 7 Hộp)", amount: 480000, status: "pending", created_at: "2026-09-14 08:30:00" }
];

function getBlobStore() {
  try {
    const { getStore } = require('@netlify/blobs');
    return getStore({ name: 'rong_nho_orders', consistency: 'strong' });
  } catch (err) {
    return null;
  }
}

async function getAllOrders(store) {
  if (store) {
    try {
      const { blobs } = await store.list();
      if (blobs && blobs.length > 0) {
        const list = await Promise.all(blobs.map(b => store.get(b.key, { type: 'json' })));
        const valid = list.filter(Boolean);
        valid.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        return valid;
      } else {
        // Khởi tạo các đơn mẫu ban đầu vào store
        for (const ord of memoryOrders) {
          await store.setJSON(ord.order_code, ord);
        }
        return memoryOrders;
      }
    } catch (e) {
      console.warn('Blobs read fallback to memory:', e);
    }
  }
  return memoryOrders;
}

exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: 'OK' };
  }

  const store = getBlobStore();
  const path = event.path || '';
  const query = event.queryStringParameters || {};

  // 1. CHECK STATUS CHO TRANG THANH TOÁN (checkOrderStatus)
  if (path.includes('check-status') || query.code) {
    const code = query.code;
    if (!code) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing code' }) };
    }

    if (store) {
      try {
        const order = await store.get(code, { type: 'json' });
        if (order) {
          return { statusCode: 200, headers, body: JSON.stringify({ status: order.status, order }) };
        }
      } catch (e) {}
    }

    const found = memoryOrders.find(o => o.order_code === code);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: found ? found.status : 'pending', order: found || null })
    };
  }

  // 2. KÍCH HOẠT ĐƠN HÀNG THÀNH CÔNG (confirm order)
  if (path.includes('confirm') && event.httpMethod === 'POST') {
    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch(e){}
    const code = body.order_code;
    if (!code) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing order_code' }) };
    }

    let updatedOrder = null;
    if (store) {
      try {
        const ord = await store.get(code, { type: 'json' });
        if (ord) {
          ord.status = 'success';
          ord.updated_at = new Date().toISOString();
          await store.setJSON(code, ord);
          updatedOrder = ord;
        }
      } catch (e) {}
    }

    const memOrd = memoryOrders.find(o => o.order_code === code);
    if (memOrd) {
      memOrd.status = 'success';
      updatedOrder = memOrd;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, order_code: code, status: 'success', order: updatedOrder })
    };
  }

  // 3. GET /api/orders -> Lấy toàn bộ đơn hàng
  if (event.httpMethod === 'GET') {
    const orders = await getAllOrders(store);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(orders)
    };
  }

  // 4. POST /api/orders -> Tạo đơn hàng mới
  if (event.httpMethod === 'POST') {
    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch(e){}

    const randId = Math.floor(1000 + Math.random() * 9000);
    const orderCode = body.order_code || ('RN' + randId);
    const timeStr = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    const newOrder = {
      id: Date.now(),
      order_code: orderCode,
      customer_name: body.customer_name || 'Khách hàng',
      customer_phone: body.customer_phone || '',
      customer_email: body.customer_email || '',
      customer_address: body.customer_address || body.notes || '',
      product_id: body.product_id || 1,
      product_name: body.product_name || 'Rong Nho Tách Nước Nha Trang',
      amount: parseInt(body.amount) || 299000,
      status: body.status || 'pending',
      notes: body.notes || '',
      created_at: timeStr
    };

    if (store) {
      try {
        await store.setJSON(orderCode, newOrder);
      } catch (e) {
        console.warn('Blobs save error:', e);
      }
    }
    memoryOrders.unshift(newOrder);

    // Đồng bộ thêm vào Google Sheets tự động
    const gSheetUrl = 'https://script.google.com/macros/s/AKfycbyc10hrhge61K7-7wtORlWEB1rOseWKuVehgdsrtLFZPk25PEhTV0p8AIaHguQ1EME84g/exec';
    try {
      fetch(gSheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          name: newOrder.customer_name,
          phone: newOrder.customer_phone,
          Email: newOrder.customer_email,
          product: newOrder.product_name,
          amount: newOrder.amount.toString(),
          order_code: newOrder.order_code,
          status: newOrder.status
        }).toString()
      }).catch(() => {});
    } catch(err) {}

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(newOrder)
    };
  }

  // 5. DELETE /api/orders
  if (event.httpMethod === 'DELETE') {
    const parts = path.split('/');
    const idToDelete = parts[parts.length - 1] || query.id;
    if (store && idToDelete) {
      try {
        // Xóa theo order_code hoặc id
        await store.delete(idToDelete);
        const { blobs } = await store.list();
        for (const b of blobs) {
          const ord = await store.get(b.key, { type: 'json' });
          if (ord && ord.id == idToDelete) {
            await store.delete(b.key);
          }
        }
      } catch(e){}
    }
    memoryOrders = memoryOrders.filter(o => o.id != idToDelete && o.order_code != idToDelete);
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  }

  return { statusCode: 405, headers, body: 'Method Not Allowed' };
};
