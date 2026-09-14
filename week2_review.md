# 📝 TỔNG KẾT TUẦN 2: HÀNH TRÌNH 12 NGÀY LỘT XÁC (WEEK 2 REVIEW)
**Họ và tên:** Trần Thị Phương  
**Dự án:** Rong Nho Tách Nước Nha Trang (Khánh Hòa)  
**Website:** `https://rongnhonhatrang.vn`  
**Thời gian:** Ngày 14/09/2026  

---

### (1) 12 ngày qua tôi đã build được gì?
* **Website bán hàng chính thức trên domain riêng:** `https://rongnhonhatrang.vn` hoàn thiện giao diện landing page chuẩn bán lẻ, hình ảnh vùng nuôi Khánh Hòa thật 100%, tích hợp video và form khảo sát.
* **Bộ não thứ 2 (Second Brain):** Cơ sở dữ liệu `brain.db` lưu trữ trọn vẹn chân dung khách hàng mẹ bỉm, nỗi đau con lười ăn rau, 5 ma trận đối thủ, chiến lược định vị 3 cam kết và Brand Voice mộc mạc, ấm áp của Phương.
* **Chatbot tư vấn tự động 24/7:** Hoạt động liên tục trên website, biết tư vấn giá, hướng dẫn bí quyết sốc nhiệt 3-3 ngâm rong giòn tan không tanh và thuyết phục khách hàng khéo léo.
* **Hệ thống thanh toán tự động VietQR (Sepay):** Trang `rongnhonhatrang.vn/thanh-toan` tự động sinh mã VietQR theo mã đơn hàng, tự động nhận tiền và khớp đơn tức thì.
* **Hệ thống CRM Admin Panel:** Trang `rongnhonhatrang.vn/admin` quản lý 3 tab: Sản phẩm, Khách hàng, Đơn hàng, tự động trừ tồn kho với hàng vật lý và giữ nguyên với sản phẩm số.
* **Hệ thống Email Marketing tự động (Resend):** Đã xác thực 100% domain riêng, tự động gửi chuỗi 3 email nuôi dưỡng và email xác nhận đơn hàng từ `hi@rongnhonhatrang.vn`.
* **Sản phẩm số:** Xuất bản cuốn Ebook "Cẩm Nang 15 Món Ăn Eat Clean Cùng Rong Nho Nha Trang" tại `rongnhonhatrang.vn/ebook`.

---

### (2) Số liệu thật của tôi là gì?
*(Dữ liệu đối soát thực tế từ file so_lieu.md)*:
* **Khách hàng trong CRM / Danh sách chờ:** `5 khách hàng thực tế` (+ data khảo sát trên Google Sheets).
* **Đơn hàng trên hệ thống:** `3 đơn hàng` (2 đơn `success` đã thanh toán, 1 đơn `pending`).
* **Doanh thu thực tế đã thu:** `398.000₫` (299.000₫ đơn Combo 3 Tặng 1 + 99.000₫ đơn Ebook).
* **Bài viết truyền thông đã đăng liên tục:** `7 bài viết` trong 7 ngày qua trên Facebook, Zalo và Cộng đồng KP3.
* **Điểm Brand Voice trung bình:** `9.6 / 10`.

---

### (3) Điều khó nhất tôi đã vượt qua?
* Điều khó nhất với một người "mù công nghệ" như mình là nỗi sợ kỹ thuật: từ việc trỏ DNS tên miền trên 123HOST, sửa các bản ghi DKIM/MX/CNAME để verify Resend, đến việc kết nối webhook ngân hàng Sepay. Đã có những lúc tưởng chừng bế tắc vì mở trình duyệt ẩn danh không thấy đơn hàng, nhưng nhờ kiên trì đối thoại với AI Agent từng bước một, mọi lỗi kỹ thuật đều được gỡ bỏ tận gốc.
* Vượt qua sự ngại ngùng khi viết bài công khai trên mạng xã hội: từ chỗ không biết viết gì thành người có thể viết liên tục 7 ngày đúng giọng thật, chia sẻ giá trị thật cho các mẹ bỉm.

---

### (4) Điều gì tôi làm chưa tốt?
* Ban đầu còn phụ thuộc nhiều vào việc test trên máy tính cá nhân (`localhost`), chưa kiểm thử kỹ lưỡng hành vi khách hàng thật trên môi trường mạng internet (như việc trình duyệt ẩn danh bị cô lập localStorage).
* Tốc độ phản hồi và theo dõi thủ công trong những ngày đầu còn chậm, cần dựa vào tự động hóa nhiều hơn để giải phóng sức lao động.
* Chưa chủ động kéo thêm traffic từ các hội nhóm ăn dặm, eat clean mà mới chủ yếu đăng trên trang cá nhân và Zalo.

---

### (5) Nếu bắt đầu lại từ ngày 1, tôi sẽ làm khác gì?
* Tôi sẽ kết nối thẳng Database đám mây (Cloud Database) và cấu hình DNS tên miền ngay từ đầu để mọi dữ liệu được đồng bộ xuyên suốt trên internet, không phải mất thời gian fix lỗi trung gian.
* Tôi sẽ tự tin đóng vai khách hàng thật để test toàn bộ luồng (end-to-end) sớm hơn, thay vì chờ đến ngày cuối mới phát hiện ra các điểm nghẽn.
* Tôi sẽ mạnh dạn tương tác và chia sẻ câu chuyện khởi nghiệp rong nho của mình rộng rãi hơn tới cộng đồng ngay từ những ngày đầu.
