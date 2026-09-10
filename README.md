# JLPT Exam Master - Web App Học & Kiểm Tra Tiếng Nhật

Web application học và kiểm tra tiếng Nhật với giao diện tối giản (phong cách Notion trắng/đen nguyên bản, thiết kế Mobile-First), phân quyền đăng nhập (chỉ giáo viên/người tạo mới được tạo đề, khách tự do làm bài), hỗ trợ tạo đề thi tức thì từ chuỗi JSON, bấm giờ tự động, tự chuyển câu khi chọn đáp án, chấm điểm và xem giải thích chi tiết.

---

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (Minimalist Black & White, tối ưu 100% Mobile-First)
- **Icons**: Lucide React
- **Routing & Auth**: React Router v7 + Auth Context (Supabase Auth & Local fallback)
- **Backend & Database**: Supabase PostgreSQL
- **Deployment**: Tối ưu sẵn sàng deploy Vercel (`vercel.json`)

---

## 🔐 Phân Quyền & Chức Năng Đăng Nhập

1. **Khách (Guest)**:
   - Tự do xem toàn bộ danh sách bài thi.
   - Làm bài thi trắc nghiệm (không giới hạn hoặc có giới hạn thời gian).
   - Tự động chuyển câu khi click chọn phương án.
   - Xem kết quả, chấm điểm tự động và lời giải thích chi tiết.
   - **Không thể tạo đề thi mới** (khi cố truy cập trang tạo đề, hệ thống sẽ yêu cầu đăng nhập).

2. **Người dùng / Giáo viên (Logged-in User)**:
   - Đăng nhập / Đăng ký tài khoản (hỗ trợ nút **1-Click Đăng nhập nhanh tài khoản mẫu**).
   - Tạo bài kiểm tra mới bằng cách dán chuỗi JSON hoặc upload file `.json`.
   - Quản lý và xóa bài thi do mình tạo.

---

## 📱 Thiết Kế Mobile-First

- Thanh điều hướng (Navbar) thu gọn thông minh kèm menu dropdown trên thiết bị di động.
- Kích thước thẻ câu hỏi và phương án A/B/C/D đạt chuẩn touch target tối thiểu 48px, hỗ trợ hiệu ứng phản hồi xúc giác (`active:scale-98`).
- Bộ đếm thời gian (Timer), nút Nộp bài, nút Trước/Sau được bố trí thuận tiện cho thao tác ngón cái khi cầm điện thoại.
- Bảng câu hỏi (Question Palette) tự co giãn linh hoạt, không bị vỡ giao diện trên bất kỳ kích thước màn hình nào (iPhone SE, Android, iPad, Laptop).

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ngay

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy môi trường phát triển (Local Dev)
npm run dev
```
Mở trình duyệt tại: `http://localhost:5173`

---

## 📄 File Mẫu Định Dạng JSON

Dự án đã xuất sẵn 2 file mẫu định dạng câu hỏi:
- File mẫu gốc: [`exam_template.json`](exam_template.json)
- File tải trực tiếp từ web: [`public/exam_template.json`](public/exam_template.json)

```json
[
  {
    "question": "「食べます」のて形はどれですか？",
    "options": [
      "食べて",
      "食べた",
      "食べる",
      "食べない"
    ],
    "answer": 0,
    "explanation": "食べます là động từ nhóm 2. Thể て là 食べて."
  }
]
```

---

## 🗄 Cấu Hình Supabase

1. Mở file [`.env`](.env) và điền anon key từ Supabase Dashboard:
   ```env
   VITE_SUPABASE_URL=https://ntodbclgjrphbezmdvan.supabase.co
   VITE_SUPABASE_KEY=your_supabase_anon_key_here
   ```
2. Chạy file SQL khởi tạo bảng và RLS tại [`supabase/schema.sql`](supabase/schema.sql) trong **Supabase SQL Editor**.
