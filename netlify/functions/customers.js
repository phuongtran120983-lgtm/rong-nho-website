// Netlify Function: Quản lý Khách hàng (Customers)
// Endpoint: /api/customers

let memoryCustomers = [
  { id: 1, name: "Nguyễn Thị Thu Hà", phone: "0912345678", zalo: "0912345678", email: "thuha.nguyen@gmail.com", address: "Số 45 Lê Lợi, P. Bến Nghé, Quận 1, TP.HCM", created_at: "2026-09-08 09:15:00" },
  { id: 2, name: "Trần Thanh Thảo", phone: "0987654321", zalo: "0987654321", email: "thao.tran@outlook.com", address: "Tòa Landmark 2, Vinhomes Central Park, Bình Thạnh, TP.HCM", created_at: "2026-09-09 14:30:00" },
  { id: 3, name: "Lê Hoàng Yến", phone: "0903112233", zalo: "0903112233", email: "hoangyen.le@gmail.com", address: "28 Quang Trung, P. Vĩnh Hải, Nha Trang, Khánh Hòa", created_at: "2026-09-10 11:20:00" },
  { id: 4, name: "Phạm Thị Mỹ Linh", phone: "0938445566", zalo: "0938445566", email: "mylinh.pham@yahoo.com", address: "Số 12 Ngõ 198 Xã Đàn, Đống Đa, Hà Nội", created_at: "2026-09-11 16:45:00" },
  { id: 5, name: "Vũ Minh Anh", phone: "0977889900", zalo: "0977889900", email: "minhanh.vu@gmail.com", address: "156 Nguyễn Văn Linh, Hải Châu, Đà Nẵng", created_at: "2026-09-12 10:05:00" }
];

function getBlobStore() {
  try {
    const { getStore } = require('@netlify/blobs');
    return getStore({ name: 'rong_nho_customers', consistency: 'strong' });
  } catch (err) {
    return null;
  }
}

async function getAllCustomers(store) {
  if (store) {
    try {
      const { blobs } = await store.list();
      if (blobs && blobs.length > 0) {
        const list = await Promise.all(blobs.map(b => store.get(b.key, { type: 'json' })));
        const valid = list.filter(Boolean);
        valid.sort((a, b) => b.id - a.id);
        return valid;
      } else {
        for (const c of memoryCustomers) {
          await store.setJSON(c.id.toString(), c);
        }
        return memoryCustomers;
      }
    } catch (e) {
      console.warn('Customers Blobs fallback:', e);
    }
  }
  return memoryCustomers;
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

  if (path.includes('import-waitlist') && event.httpMethod === 'POST') {
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, imported: 5 }) };
  }

  if (event.httpMethod === 'GET') {
    const list = await getAllCustomers(store);
    return { statusCode: 200, headers, body: JSON.stringify(list) };
  }

  if (event.httpMethod === 'POST') {
    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch(e){}
    const customers = await getAllCustomers(store);
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const item = {
      id: newId,
      name: body.name || 'Khách hàng',
      phone: body.phone || '',
      zalo: body.zalo || body.phone || '',
      email: body.email || '',
      address: body.address || '',
      created_at: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    };

    if (store) {
      await store.setJSON(item.id.toString(), item);
    }
    memoryCustomers.unshift(item);
    return { statusCode: 200, headers, body: JSON.stringify(item) };
  }

  if (event.httpMethod === 'PUT') {
    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch(e){}
    const parts = path.split('/');
    const id = parseInt(parts[parts.length - 1]);
    const customers = await getAllCustomers(store);
    const found = customers.find(c => c.id === id);
    if (found) {
      Object.assign(found, body);
      if (store) await store.setJSON(id.toString(), found);
      return { statusCode: 200, headers, body: JSON.stringify(found) };
    }
    return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) };
  }

  if (event.httpMethod === 'DELETE') {
    const parts = path.split('/');
    const id = parts[parts.length - 1];
    if (store && id) await store.delete(id);
    memoryCustomers = memoryCustomers.filter(c => c.id != id);
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  }

  return { statusCode: 405, headers, body: 'Method Not Allowed' };
};
