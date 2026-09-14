# 🌿 HỆ THỐNG BÁN HÀNG TỰ ĐỘNG & CRM RONG NHO NHA TRANG

Hệ thống bán hàng, thanh toán tự động VietQR, CRM và Email Marketing chuẩn AI-First cho thương hiệu **Rong Nho Tách Nước Nha Trang (Khánh Hòa)**.

* **Domain chính thức:** `https://rongnhonhatrang.vn`
* **Người sáng lập:** Phương Trần (Hotline/Zalo: `0933.951.409`)
* **Kiến trúc:** Static Frontend (HTML/Tailwind CSS) + Serverless Cloud Functions (Netlify) + SQLite Second Brain (`brain.db`).

---

## 🚀 CÁC TÍNH NĂNG CHÍNH CỦA HỆ THỐNG

1. **Trang chủ & Landing Page (`/`):**
   - Giới thiệu rong nho nuôi trồng tại vùng biển Khánh Hòa.
   - Form khảo sát & thu thập danh sách chờ (Waitlist) tích hợp validate SĐT và Email.
   - Widget Chatbot AI tư vấn và chốt sale 24/7.
2. **Cổng thanh toán VietQR tự động (`/thanh-toan`):**
   - Sinh mã QR VietQR động theo từng mã đơn hàng `#RN...`.
   - Kết nối cổng thanh toán Sepay (MB Bank `0933951409`), tự động nhận diện giao dịch và chuyển trạng thái đơn sang `success`.
3. **Trang Quản trị CRM (`/admin`):**
   - Quản lý 3 tab: **Sản phẩm**, **Khách hàng**, **Đơn hàng**.
   - Tự động trừ tồn kho với sản phẩm vật lý; không trừ tồn kho với sản phẩm số / dịch vụ.
   - Đồng bộ dữ liệu đám mây 24/7, truy cập được từ mọi trình duyệt và thiết bị (kể cả cửa sổ ẩn danh).
4. **Hệ thống Email Marketing tự động (Resend):**
   - Xác thực 100% domain riêng: gửi từ `Phương Trần - Rong Nho Nha Trang <hi@rongnhonhatrang.vn>`.
   - Chuỗi 3 email nuôi dưỡng chuẩn Brand Voice (`email_sequence.md`).
   - Chế độ `+test` gửi tức thì 3 email về hộp thư.
   - Email xác nhận đơn hàng tự động gửi biên nhận kèm mã đơn `#RN...`.

---

## 🛠️ HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

### 1. Chạy trên máy tính cá nhân (Localhost)
* **Yêu cầu:** Python 3.9+ hoặc Node.js 18+.
* **Khởi động server nội bộ:**
```bash
python server.py
# Server chạy tại: http://localhost:5000
```
* Các đường dẫn test:
  * Website: `http://localhost:5000/`
  * Admin: `http://localhost:5000/admin`
  * Thanh toán: `http://localhost:5000/thanh-toan`
  * Ebook: `http://localhost:5000/ebook`

### 2. Triển khai lên Netlify (Serverless Cloud - Đang chạy thực tế)
* Dự án được kết nối tự động với kho GitHub: `https://github.com/phuongtran120983-lgtm/rong-nho-website.git`.
* Mỗi khi push commit lên nhánh `main`, Netlify sẽ tự động kích hoạt build và deploy lên domain `rongnhonhatrang.vn`.
* File cấu hình điều hướng: `_redirects` định tuyến toàn bộ API sang `netlify/functions/`.

### 3. Hướng dẫn Triển khai lên máy chủ ảo VPS (Linux Ubuntu / Nginx)
Khi đưa dự án lên VPS riêng độc lập:
1. **Cài đặt Nginx & Python:**
```bash
sudo apt update && sudo apt install -y nginx python3 python3-pip git
```
2. **Clone mã nguồn về VPS:**
```bash
cd /var/www
git clone https://github.com/phuongtran120983-lgtm/rong-nho-website.git
cd rong-nho-website
cp .env.example .env
```
3. **Cấu hình Nginx reverse proxy (`/etc/nginx/sites-available/rongnhonhatrang`):**
```nginx
server {
    server_name rongnhonhatrang.vn www.rongnhonhatrang.vn;
    root /var/www/rong-nho-website;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
4. **Cấu hình Systemd chạy nền `server.py`:**
```ini
[Unit]
Description=Rong Nho Nha Trang CRM Service
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/rong-nho-website
ExecStart=/usr/bin/python3 -u server.py
Restart=always

[Install]
WantedBy=multi-user.target
```
5. **Cài chứng chỉ bảo mật SSL Let's Encrypt:**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d rongnhonhatrang.vn -d www.rongnhonhatrang.vn
```

---

## 🔒 BIẾN MÔI TRƯỜNG BẢO MẬT (.env)
* `RESEND_API_KEY`: Khóa kết nối Resend Email Marketing.
* `RESEND_FROM_EMAIL`: Địa chỉ email người gửi (`hi@rongnhonhatrang.vn`).
* `SEPAY_BANK_ACCOUNT`: Số tài khoản nhận tiền Sepay (`876997`).
* `SEPAY_BANK_SHORTCODE`: Ngân hàng (`ACB`).
