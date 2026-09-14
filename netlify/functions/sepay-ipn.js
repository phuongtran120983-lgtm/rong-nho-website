// Netlify Function - nhận thông báo thanh toán (IPN) từ Sepay
// URL sau khi deploy: https://rongnhonhatrang.vn/.netlify/functions/sepay-ipn
//
// Cần thiết lập 2 biến môi trường trong Netlify:
//   TELEGRAM_BOT_TOKEN - token bot Telegram (lấy từ BotFather)
//   TELEGRAM_CHAT_ID   - chat id của bạn (lấy từ bước getUpdates)

exports.handler = async function (event) {
  // Sepay sẽ gửi POST mỗi khi có giao dịch chuyển khoản thành công
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  // Các trường phổ biến Sepay gửi về (có thể khác chút tùy tài liệu Sepay mới nhất)
  const soTien = data.transferAmount || data.amount || 'không rõ';
  const noiDung = data.content || data.description || 'không có nội dung';
  const nganHang = data.gateway || data.bank || '';
  const thoiGian = data.transactionDate || new Date().toLocaleString('vi-VN');

  const message =
    `💰 CÓ ĐƠN HÀNG MỚI - RONG NHO NHA TRANG\n\n` +
    `Số tiền: ${soTien}đ\n` +
    `Nội dung CK: ${noiDung}\n` +
    `Ngân hàng: ${nganHang}\n` +
    `Thời gian: ${thoiGian}\n\n` +
    `👉 Kiểm tra và liên hệ khách để xác nhận đơn hàng nhé!`;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });
    } catch (err) {
      console.error('Lỗi gửi Telegram:', err);
    }
  }

  // Luôn trả về 200 để Sepay biết đã nhận thành công
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
