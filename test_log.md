# 📝 NHẬT KÝ KIỂM THỬ END-TO-END (TEST LOG NGÀY 12)
**Dự án:** Rong Nho Tách Nước Nha Trang  
**Người thực hiện:** Phương Trần  
**Domain kiểm thử:** `https://rongnhonhatrang.vn`  
**Mục tiêu:** Kiểm tra trơn tru toàn bộ luồng vận hành từ khách truy cập ➔ điền form ➔ nhận email ➔ chatbot tư vấn ➔ đặt hàng VietQR ➔ Sepay khớp tiền ➔ email xác nhận ➔ cập nhật CRM.

---

## 🧪 BẢNG THEO DÕI KIỂM THỬ TỪNG BƯỚC

| STT | Bước thực hiện | Kết quả thực tế | Trạng thái |
| :---: | :--- | :--- | :---: |
| **1** | Truy cập `rongnhonhatrang.vn` ➔ điền form khảo sát (`phuongtran.120983+test@gmail.com`) | Dữ liệu được ghi nhận vào CRM đám mây và Google Sheets. | ✅ PASS |
| **2** | Kiểm tra hộp thư Gmail | Nhận ngay tức thì cả 3 email sequence từ `Phương Trần - Rong Nho Nha Trang <hi@rongnhonhatrang.vn>`. | ✅ PASS |
| **3** | Chat với Chatbot AI tư vấn 3 câu (giá cả, bé lười ăn rau, "để tôi nghĩ thêm") | Chatbot phản hồi đúng kịch bản, giọng mộc mạc, tư vấn đúng mẹo sốc nhiệt 3-3 và thuyết phục khéo léo. | ✅ PASS |
| **4** | Đặt mua hàng tại `rongnhonhatrang.vn/thanh-toan` | Hệ thống sinh mã đơn `#RN...` và mã VietQR Sepay kèm đúng số tiền và nội dung chuyển khoản. | ✅ PASS |
| **5** | Chuyển khoản thật 2.000đ qua VietQR | Tiền về tài khoản MB Bank `0933951409`, Sepay webhook bắn tín hiệu về hệ thống. | ✅ PASS |
| **6** | Kiểm tra Email xác nhận đơn hàng | Nhận được email biên nhận đơn hàng chi tiết `#RN...` từ `hi@rongnhonhatrang.vn`. | ✅ PASS |
| **7** | Kiểm tra trang quản trị `/admin` trên cửa sổ ẩn danh | Đơn hàng xuất hiện ngay trên tab Đơn hàng và chuyển trạng thái `✅ success`. Tồn kho hàng vật lý tự động trừ 1. | ✅ PASS |

---

## 🐛 BÁO CÁO CÁC BUG ĐÃ GẶP & CÁCH KHẮC PHỤC (BUG LOG)

### 🔴 Bug 1: Domain Resend ban đầu chưa xác minh xong DNS
* **Hiện tượng:** Email gửi đi bị dính `@resend.dev` hoặc báo lỗi domain chưa verify, reviewer từ chối bài.
* **Nguyên nhân:** Thiếu bản ghi CNAME `rsend -> send.forge.rmta.net` trên trang quản lý DNS 123HOST, khiến trạng thái Resend bị giữ ở mức `partially_verified`.
* **Cách khắc phục:** Đã thêm đầy đủ 4 bản ghi DNS (DKIM TXT, MX send, TXT send, CNAME rsend). Resend đã chuyển sang `Verified 100% (Xanh lá)`. Toàn bộ email hiện gửi đi chính danh từ `hi@rongnhonhatrang.vn`.

### 🔴 Bug 2: Dữ liệu đơn hàng chỉ lưu localStorage cục bộ, mở ẩn danh không thấy đơn
* **Hiện tượng:** Test trên trình duyệt thường thì thấy đơn, nhưng mở trình duyệt ẩn danh vào `/admin` thì danh sách đơn hàng trống trơn.
* **Nguyên nhân:** Website host trên Netlify dạng máy chủ tĩnh, file SQLite `brain.db` chỉ nằm trên máy tính cá nhân chứ không online trên internet.
* **Cách khắc phục:** Xây dựng hệ thống Serverless Cloud Functions (`netlify/functions/orders.js`, `products.js`, `customers.js`, `config.js`) kết nối lưu trữ đám mây 24/7 qua Netlify Blobs và đồng bộ Google Sheets. Giờ đây bất kỳ ai ở bất kỳ máy tính hay cửa sổ ẩn danh nào cũng thấy đơn hàng đồng bộ tức thì.

### 🔴 Bug 3: Validate trường Email và Số điện thoại ở form còn lỏng lẻo
* **Hiện tượng:** Khách nhập thiếu số điện thoại hoặc email sai đuôi thì form vẫn gửi, dễ làm mất data khách.
* **Nguyên nhân:** Form HTML5 chỉ kiểm tra thuộc tính `required` cơ bản.
* **Cách khắc phục:** Đã bổ sung regex kiểm tra định dạng số điện thoại Việt Nam 10 chữ số (`^(0|\+84)[3|5|7|8|9][0-9]{8}$`) và regex kiểm tra định dạng email chuẩn trước khi gửi.
