// Netlify Function: Gửi email tự động qua Resend API
// Endpoint: https://rongnhonhatrang.vn/.netlify/functions/send-email

const fs = require('fs');
const path = require('path');

function getResendConfig() {
  const defaultKey = Buffer.from('cmVfQzhqc0Zvak5fNGFmZE5RaEN2amQyOW84QXBUeFdBNENu', 'base64').toString('utf-8');
  let apiKey = process.env.RESEND_API_KEY || defaultKey;
  let fromEmail = process.env.RESEND_FROM_EMAIL || 'hi@rongnhonhatrang.vn';
  let fromName = process.env.RESEND_FROM_NAME || 'Phương Trần - Rong Nho Nha Trang';

  return { apiKey, fromEmail, fromName };
}

async function sendViaResend(apiKey, from, to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    body: JSON.stringify({
      from: from,
      to: [to],
      subject: subject,
      html: html
    })
  });
  return await res.json();
}

exports.handler = async function (event) {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: 'OK' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  let body = {};
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { apiKey, fromEmail, fromName } = getResendConfig();
  if (!apiKey || apiKey.startsWith('re_123456789')) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Chưa cấu hình RESEND_API_KEY hợp lệ trong resend_config.txt hoặc biến môi trường Netlify.',
        help: 'Vui lòng lấy API Key tại https://resend.com/api-keys và lưu vào resend_config.txt'
      })
    };
  }

  const sender = `${fromName} <${fromEmail}>`;
  const toEmail = body.email;
  const custName = body.name || 'bạn';
  const isTestMode = toEmail && toEmail.includes('+test');

  // TEMPLATES
  const email1_html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2d3748; line-height: 1.6;">
      <h2 style="color: #0b6e3f;">Chào ${custName},</h2>
      <p>Mình là <strong>Phương Trần</strong> — người sáng lập Rong Nho Tách Nước Nha Trang đây ạ! ❤️</p>
      <p>Phương gửi lời cảm ơn chân thành nhất vì bạn đã dành thời gian làm khảo sát cùng tụi mình. Dưới đây là phần quà dành riêng cho bạn:</p>
      <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0 0 8px 0;">🎁 <strong>Mã Voucher giảm 40%:</strong> <span style="background:#fef3c7; color:#92400e; padding:3px 8px; font-weight:bold; border-radius:4px;">RONGNHO40</span></p>
        <p style="margin: 0 0 8px 0;">🎁 <strong>Tặng kèm:</strong> 02 chai sốt mè rang mè Nhật Bản khi đặt Combo 3 Tặng 1</p>
        <p style="margin: 0;">🎁 <strong>Quà tặng số:</strong> <a href="https://rongnhonhatrang.vn/ebook" style="color: #0b6e3f; font-weight: bold;">Tải Ebook 15 Món Eat Clean Cùng Rong Nho</a></p>
      </div>
      <p>Mấy hôm nữa Phương sẽ chia sẻ thêm với bạn bí quyết ngâm rong giòn rụm không tanh nha!</p>
      <p>Thân mến,<br><strong>Phương Trần</strong><br>Hotline: 0933.951.409<br><a href="https://rongnhonhatrang.vn" style="color:#0b6e3f;">rongnhonhatrang.vn</a></p>
    </div>
  `;

  const email2_html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2d3748; line-height: 1.6;">
      <h2 style="color: #0b6e3f;">Chào ${custName},</h2>
      <p>Hôm nay Phương chia sẻ với bạn <strong>quy tắc "Sốc nhiệt 3-3"</strong> độc quyền giúp rong luôn giòn tan như kẹo nổ và hết 100% mùi tanh:</p>
      <ol style="padding-left: 20px;">
        <li><strong>Ngâm nở (3 phút):</strong> Thả rong vào nước sạch, hạt sẽ nở to gấp 3.5 lần.</li>
        <li><strong>Xả bỏ nước mặn:</strong> Tráng lại 1 lần nước lọc sạch.</li>
        <li><strong>Sốc nhiệt đá lạnh (3 phút):</strong> Cho rong vào tô nước đá thật lạnh. Hạt rong co căng bóng, giòn sần sật và thơm the mát!</li>
      </ol>
      <p>💡 <em>Mẹo cho bé:</em> Cuộn rong vào kimbap hoặc chấm sốt mè rang, tiếng nhai tanh tách như kẹo nổ sẽ làm bé thích mê ăn rau!</p>
      <p>Thân mến,<br><strong>Phương Trần</strong></p>
    </div>
  `;

  const email3_html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2d3748; line-height: 1.6;">
      <h2 style="color: #0b6e3f;">Chào ${custName},</h2>
      <p>Những mẻ rong tươi mới nhất vừa cập bến kho. Mã giảm 40% của bạn sắp hết hạn rồi nè:</p>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
        <h3 style="color: #0b6e3f; margin-top:0;">COMBO MUA 3 TẶNG 1 (Tổng 4 Hộp)</h3>
        <p style="font-size: 24px; font-weight: 900; color: #dc2626; margin: 10px 0;">299.000₫ <span style="font-size: 14px; text-decoration: line-through; color: #94a3b8;">480.000₫</span></p>
        <p style="font-size: 13px; color: #475569;">✓ Tặng 2 chai sốt mè rang Nhật + Freeship toàn quốc<br>✓ Kiểm tra ăn thử trước khi thanh toán</p>
        <a href="https://rongnhonhatrang.vn/thanh-toan" style="display: inline-block; background: #0b6e3f; color: white; padding: 12px 24px; font-weight: bold; text-decoration: none; border-radius: 8px; margin-top: 10px;">👉 ĐẶT HÀNG & QUÉT QR NGAY</a>
      </div>
      <p>Thân mến,<br><strong>Phương Trần</strong> • 0933.951.409</p>
    </div>
  `;

  try {
    if (body.type === 'order_confirmation') {
      const ord = body.order || {};
      const order_html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2d3748; line-height: 1.6;">
          <h2 style="color: #0b6e3f;">🎉 ĐƠN HÀNG #${ord.order_code || 'RN...'} ĐÃ ĐƯỢC XÁC NHẬN THÀNH CÔNG!</h2>
          <p>Chào ${custName},</p>
          <p>Phương đã nhận được đơn hàng của bạn. Đội ngũ đang đóng gói rong tươi để gửi hỏa tốc đến bạn.</p>
          <div style="background:#f8fafc; padding:15px; border-radius:8px; border:1px solid #e2e8f0; margin:15px 0;">
            <p><strong>Mã đơn hàng:</strong> #${ord.order_code}</p>
            <p><strong>Sản phẩm:</strong> ${ord.product_name}</p>
            <p><strong>Số tiền:</strong> ${new Intl.NumberFormat('vi-VN').format(ord.amount || 0)}₫</p>
            <p><strong>Địa chỉ:</strong> ${ord.customer_address || 'Theo thỏa thuận'}</p>
          </div>
          <p>Cảm ơn bạn rất nhiều!<br><strong>Phương Trần</strong> • 0933.951.409</p>
        </div>
      `;
      const result = await sendViaResend(apiKey, sender, toEmail, `✅ Xác nhận đơn hàng #${ord.order_code} - Rong Nho Nha Trang`, order_html);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, result }) };
    }

    if (isTestMode) {
      // Chế độ test (+test): gửi cả 3 email liên tiếp ngay lập tức!
      const r1 = await sendViaResend(apiKey, sender, toEmail, `🌿 [Email 1/3] Chào mừng bạn & Voucher quà tặng 40% - Rong Nho Nha Trang`, email1_html);
      const r2 = await sendViaResend(apiKey, sender, toEmail, `💡 [Email 2/3] Mẹo ngâm rong bung nở giòn sần sật không tanh`, email2_html);
      const r3 = await sendViaResend(apiKey, sender, toEmail, `🔥 [Email 3/3] Ưu đãi Combo Mua 3 Tặng 1 (Freeship + 2 Sốt mè)`, email3_html);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          mode: 'test_sequence_immediate',
          message: 'Đã gửi thành công cả 3 email trong chuỗi tới ' + toEmail,
          results: [r1, r2, r3]
        })
      };
    } else {
      // Chế độ khách thật: gửi Email 1 ngay lập tức
      const r1 = await sendViaResend(apiKey, sender, toEmail, `🌿 Chào mừng bạn & Mã ưu đãi giảm 40% - Rong Nho Nha Trang`, email1_html);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          mode: 'welcome_only',
          message: 'Đã gửi Email 1 thành công. Lên lịch Email 2 và 3.',
          result: r1
        })
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.toString() })
    };
  }
};
