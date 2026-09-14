// Netlify Function: Quản lý Sản phẩm (Products)
// Endpoint: /api/products

let memoryProducts = [
  { id: 1, name: "COMBO MUA 3 TẶNG 1 (Tổng 4 Hộp)", type: "physical", price: 299000, stock: 48, description: "Tặng 2 chai sốt mè rang mè Nhật + Miễn phí vận chuyển toàn quốc." },
  { id: 2, name: "COMBO MUA 5 TẶNG 2 (Tổng 7 Hộp)", type: "physical", price: 480000, stock: 35, description: "Tặng 4 chai sốt mè rang mè Nhật + Miễn phí ship toàn quốc." },
  { id: 3, name: "Gói dùng thử 1 Hộp (5 gói tách nước)", type: "physical", price: 120000, stock: 100, description: "Tặng 1 chai sốt mè mini, phí ship 30k toàn quốc." },
  { id: 4, name: "Ebook: Cẩm Nang 15 Món Ăn Eat Clean Cùng Rong Nho Nha Trang", type: "digital", price: 99000, stock: null, description: "Sản phẩm số: Công thức salad, gỏi, sushi chuẩn Nhật." },
  { id: 5, name: "Tư Vấn Dinh Dưỡng & Thực Đơn Eat Clean 1:1 Qua Zalo", type: "service", price: 199000, stock: null, description: "Dịch vụ đồng hành thiết kế thực đơn lành mạnh cùng rong nho trong 14 ngày." }
];

function getBlobStore() {
  try {
    const { getStore } = require('@netlify/blobs');
    return getStore({ name: 'rong_nho_products', consistency: 'strong' });
  } catch (err) {
    return null;
  }
}

async function getAllProducts(store) {
  if (store) {
    try {
      const { blobs } = await store.list();
      if (blobs && blobs.length > 0) {
        const list = await Promise.all(blobs.map(b => store.get(b.key, { type: 'json' })));
        const valid = list.filter(Boolean);
        valid.sort((a, b) => a.id - b.id);
        return valid;
      } else {
        for (const p of memoryProducts) {
          await store.setJSON(p.id.toString(), p);
        }
        return memoryProducts;
      }
    } catch (e) {
      console.warn('Products Blobs fallback:', e);
    }
  }
  return memoryProducts;
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

  if (event.httpMethod === 'GET') {
    const products = await getAllProducts(store);
    return { statusCode: 200, headers, body: JSON.stringify(products) };
  }

  if (event.httpMethod === 'POST') {
    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch(e){}
    const products = await getAllProducts(store);
    const newId = body.id ? parseInt(body.id) : (products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1);
    const item = {
      id: newId,
      name: body.name || 'Sản phẩm mới',
      type: body.type || 'physical',
      price: parseInt(body.price) || 0,
      stock: body.type === 'physical' ? (parseInt(body.stock) || 0) : null,
      description: body.description || ''
    };

    if (store) {
      await store.setJSON(item.id.toString(), item);
    }
    const idx = memoryProducts.findIndex(p => p.id === newId);
    if (idx >= 0) memoryProducts[idx] = item;
    else memoryProducts.push(item);

    return { statusCode: 200, headers, body: JSON.stringify(item) };
  }

  if (event.httpMethod === 'DELETE') {
    const parts = path.split('/');
    const id = parts[parts.length - 1];
    if (store && id) await store.delete(id);
    memoryProducts = memoryProducts.filter(p => p.id != id);
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  }

  return { statusCode: 405, headers, body: 'Method Not Allowed' };
};
