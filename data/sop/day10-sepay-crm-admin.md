# SOP Ngày 10 - Kết Nối Sepay & Build Hệ Thống Bán Hàng Tự Động

## 🔥 Mẹo của Nghĩa: Làm ngay trước khi đọc tiếp
Ngày hôm nay nặng.

Nhưng bạn không cần đọc hết SOP.

Copy toàn bộ SOP này, paste vào agent đang dùng và nói:

> "Đây là SOP tôi cần làm hôm nay. Hướng dẫn tôi từng bước một — mỗi lần chỉ 1 bước, chờ tôi làm xong báo lại rồi mới tiếp. Bị lỗi thì fix luôn. Bắt đầu đi."
Từ đó AI làm MC.

Bạn chỉ cần làm theo.

Kẹt chỗ nào thì nói:

> "bị kẹt rồi"
AI tự xử.

---

# Trước khi bắt đầu - bạn thuộc nhóm nào?

## Nhóm 1: Đã có sản phẩm đang bán
Bạn sẽ:

- Kết nối Sepay để nhận tiền tự động
- Dùng CRM để quản lý đơn hàng
- Không ghi sổ tay thủ công nữa

## Nhóm 2: Chưa có sản phẩm
Bạn sẽ:

- Kết nối Sepay trước
- Tạo sản phẩm số đơn giản nhất có thể trong hôm nay
- Ví dụ: ebook, template, checklist
- Gắn sản phẩm đó vào CRM luôn

---

# Bước 1 - Đăng ký Sepay
Vào link này để đăng ký miễn phí:

> [https://sepay.vn?gcid=8](https://sepay.vn/?gcid=8)
Làm theo hướng dẫn:

- Điền thông tin
- Xác minh số điện thoại
- Kết nối ngân hàng
Thời gian dự kiến:

> 5-10 phút

---

# Bước 2 - Để AI kết nối Sepay vào website
Mở agent:

> File → Open Folder → thư mục website
Paste prompt này:

> "Tôi muốn kết nối Sepay vào website để nhận thanh toán tự động. Hãy đọc tài liệu tại [https://docs.sepay.vn/](https://docs.sepay.vn/) và hướng dẫn tôi từng bước một — mỗi lần chỉ 1 bước, chờ tôi làm xong báo lại rồi mới tiếp. Bắt đầu từ bước đơn giản nhất, không cần backend phức tạp."
AI sẽ:

- Tự đọc docs
- Tự hiểu luồng kết nối
- Dẫn bạn từng bước
Bạn làm theo và báo lại sau mỗi bước.

## Nếu bị lỗi
Nói với AI:

> "Bị lỗi này [paste lỗi], fix giúp tôi."

---

# Bước 3 - Build database CRM
Vẫn ở thư mục website, paste prompt này:

> "Thêm 3 bảng mới vào file brain.db: (1) bảng products — lưu tên sản phẩm, loại sản phẩm physical/digital/service, giá, mô tả, số lượng còn lại. Lưu ý: số lượng còn lại chỉ bắt buộc với sản phẩm vật lý; sản phẩm số hoặc dịch vụ có thể để trống/null. (2) bảng customers — lưu tên, số điện thoại, Zalo, ngày đăng ký — import toàn bộ data từ waitlist.json vào đây luôn, tránh trùng lặp. (3) bảng orders — lưu khách hàng nào mua sản phẩm gì, số tiền, trạng thái đơn hàng, ngày mua. Chạy luôn cho tôi."
Sau khi AI chạy xong, hỏi AI:

> "Đọc brain.db và cho tôi biết 3 bảng vừa tạo có data gì bên trong."

## Nếu bị lỗi
Copy thông báo lỗi, paste vào AI và nói:

> "bị lỗi này, fix giúp tôi."

---

# Bước 4 - Build Admin Panel
Vẫn ở thư mục website, paste prompt này:

> "Tạo một trang admin panel tại đường dẫn /admin — giao diện web đơn giản có 3 tab: Sản phẩm, Khách hàng, Đơn hàng. Mỗi tab hiển thị danh sách data từ brain.db và có nút thêm mới, chỉnh sửa, xóa. Không cần đăng nhập. Khi admin thêm đơn hàng mới thì chỉ tự động trừ số lượng sản phẩm còn lại nếu đó là sản phẩm vật lý. Với sản phẩm số hoặc dịch vụ thì không trừ tồn kho."
Sau khi AI làm xong, mở:

> yourdomain.com/admin

## Kiểm tra

- 3 tab có hiện ra không?
- Tab Sản phẩm có data không?
- Tab Khách hàng có data không?
- Tab Đơn hàng có data không?
- Thử thêm 1 sản phẩm
- Thử thêm 1 đơn hàng
- Nếu là sản phẩm vật lý, khi thêm đơn hàng thì số lượng còn lại có bị trừ không?
- Nếu là sản phẩm số hoặc dịch vụ, hệ thống có giữ nguyên tồn kho / không trừ số lượng không?

## Nếu bị lỗi
Copy thông báo lỗi, paste vào AI và nói:

> "bị lỗi này, fix giúp tôi."

> Lưu ý: bản "không cần đăng nhập" chỉ nên dùng cho bài tập/demo. Nếu đưa lên public thật, nên thêm mật khẩu hoặc cách bảo vệ trang admin.

---

# Bước 5 - Tạo sản phẩm số nếu chưa có gì để bán
Bỏ qua bước này nếu bạn đã có sản phẩm.

Mở agent:

> File → Open Folder → thư mục my-brain
Paste prompt này:

> "Đọc brand voice và thông tin business trong brain.db. Gợi ý 3 sản phẩm số đơn giản nhất tôi có thể tạo trong hôm nay. Mỗi sản phẩm ghi rõ: tên, mô tả ngắn, giá bán gợi ý, mất bao lâu để tạo."
Chọn 1 trong 3 sản phẩm.

Sau đó paste tiếp:

> "Tạo cho tôi sản phẩm số [tên sản phẩm] — viết đầy đủ nội dung, xuất ra file PDF. Đúng giọng của tôi."
Sau khi tạo xong sản phẩm số:

> Vào yourdomain.com/admin → tab Sản phẩm → thêm sản phẩm vừa tạo vào CRM.
Lưu ý: sản phẩm số hoặc dịch vụ không cần trừ số lượng tồn kho như sản phẩm vật lý.

---

# Bước 6 - Test nhận tiền thật
Tự chuyển **2.000đ** cho chính mình để test toàn bộ luồng.

## Luồng test

### 1. Vào trang thanh toán
Vào trang checkout / thanh toán trên website.

### 2. Submit thông tin thanh toán
Điền:

- Họ tên
- Số điện thoại / email
- Món hàng / dịch vụ
Lúc này ở:

> yourdomain.com/admin → tab Đơn hàng
Phải có đơn hàng được khởi tạo với trạng thái:

> pending

### 3. Quét QR và chuyển khoản
Quay lại trang checkout.

Quét QR.

Chuyển **2.000đ** đúng nội dung chuyển khoản.

### 4. Kiểm tra ngân hàng
Kiểm tra tài khoản ngân hàng có tiền vào không.

### 5. Kiểm tra trạng thái đơn hàng
Vào:

> yourdomain.com/admin → tab Đơn hàng
Kiểm tra trạng thái đơn hàng đã chuyển từ:

> pending
sang:

> success
chưa.

### 6. Kiểm tra màn hình checkout
Màn hình trang checkout phải hiển thị nội dung thông báo chuyển khoản thành công.

Nếu tất cả chạy đúng, bạn có một hệ thống bán hàng hoàn chỉnh.

---

# Bước 7 - Review bộ não thứ 2 + Đăng bài
Mở agent:

> File → Open Folder → thư mục my-brain
Paste prompt này:

> "Đọc toàn bộ brain_score.md và brand voice trong brain.db. Làm 2 việc: (1) Viết bản tổng kết bộ não thứ 2 sau 7 ngày — đã học được gì, điểm mạnh, cần bổ sung gì — lưu vào brain_review.md. (2) Viết 1 bài đăng thông báo hôm nay tôi vừa có hệ thống bán hàng hoàn chỉnh — nhận tiền tự động qua QR, quản lý đơn hàng và khách hàng trong một chỗ. Tone hào hứng, gần gũi. Có link website. Lưu vào day10.txt."
Sau khi AI viết xong:

- Chỉnh tối đa 5 phút
- Đăng thật lên ít nhất 2 kênh

---

# Bước 8 - Nộp bài

## Bài nộp cần có

### 1. Link trang thanh toán
Ví dụ:

> yourdomain.com/thanh-toan
Người review vào phải thấy QR và quét được bằng điện thoại.

### 2. Link trang admin
Ví dụ:

> yourdomain.com/admin
Người review vào phải thấy đủ 3 tab có data thật.

Lưu ý: hãy mở trang /admin cho người review hoặc cung cấp id & mật khẩu đăng nhập nếu đã bật bảo vệ trang admin.

### 3. Screenshot xác nhận nhận tiền
Cần có bằng chứng đã nhận tiền sau khi test **2.000đ**.

### 4. Link bài đăng
Ít nhất 2 kênh.

Link phải public.

### 5. Screenshot brain_review.md
Cần có bản tổng kết 7 ngày.

---

# ✅ Được duyệt khi

- Link trang thanh toán mở được.
- Các trường email, số điện thoại có validate để tránh khách nhập sai bị mất data liên hệ.
- Trang thanh toán đã thật sự kết nối được với Sepay để thực hiện thanh toán tự động.
- Đơn hàng ở /admin tự động khởi tạo trạng thái **pending** khi thực hiện thao tác submit đơn. Sau khi QR chuyển tiền thành công, đơn hàng chuyển sang trạng thái **success** -> Màn hình thanh toán hiển thị thông điệp cảm ơn.
- Link /admin mở được để reviewer vào check, có đủ 3 tab, mỗi tab có data thật.
- Nếu bán sản phẩm vật lý, hệ thống có xử lý tồn kho.
- Nếu bán sản phẩm số hoặc dịch vụ, hệ thống không trừ tồn kho một cách máy móc.
- Có bằng chứng đã nhận tiền test **2.000đ**.
- Link bài đăng mở được, không phải ảnh chụp màn hình.
- Có file **brain_review.md**.

## Lưu ý quan trọng
Trạng thái đơn hàng nên có chức năng kích hoạt thanh toán thành công bằng tay.

Lý do: đôi khi real case khách hàng chuyển tiền nhưng nội dung chuyển khoản trong app ngân hàng không khớp với nội dung chuyển khoản trên màn hình.

Khi đó hệ thống có thể không tự động chuyển trạng thái đơn hàng sang thanh toán thành công.

Với những case này, nên xử lý thủ công bằng tay.

Nếu đọc chưa hiểu, screenshot lại chỗ này và hỏi AI.

---

# ❌ Chưa đạt khi

- Chỉ nộp ảnh, không có link
- Link /admin không mở được
- Link /admin thiếu tab
- Chưa test nhận tiền thật
- Thiếu brain_review.md
- Link bài đăng bị private

---

# ⚠️ Nhớ chuỗi 7 ngày kết thúc hôm nay
Vẫn phải đăng ít nhất 3 bài hôm nay.

Bài này tính ngoài bài thông báo.

Đây là ngày cuối.

Đăng nhiều hơn bình thường nếu có thể.

---

# 💡 Mẹo AI-First
Ngày hôm nay nặng.

Nhưng để ý: bạn không tự code gì cả.

Bạn chỉ paste prompt và bấm đồng ý.

AI đọc docs Sepay thay bạn.

AI viết code CRM thay bạn.

AI import data thay bạn.

Đây là sức mạnh thật sự của AI First.

Không phải học code.

Mà là biết cách ra lệnh.
