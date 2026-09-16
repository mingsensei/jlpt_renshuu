# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Học sinh và sinh viên người Việt tự luyện thi JLPT ở nhà, ở mọi trình độ từ N5 đến N1. Họ học theo thời gian biểu cá nhân, cần kiểm tra kiến thức nhanh mà không phải đăng ký tài khoản hay cài đặt gì thêm.

Người dùng thứ cấp: giáo viên tiếng Nhật tự tạo đề thi riêng bằng JSON, không phụ thuộc vào ngân hàng câu hỏi có sẵn.

## Product Purpose

JLPT Exam Master là nền tảng luyện thi và thi thử tiếng Nhật JLPT trực tuyến cho người học Việt Nam. Học sinh có thể làm bài thi mà không cần tài khoản; giáo viên đăng nhập để tạo và quản lý đề thi của riêng mình bằng cách dán JSON. Thành công là học sinh hoàn thành bài thi, nhận kết quả, đọc giải thích và cảm thấy mình tiến bộ.

## Positioning

Giáo viên tự tạo đề thi riêng bằng JSON không phụ thuộc nội dung có sẵn — đây là điểm khác biệt mà các app luyện thi JLPT phổ biến (Anki, Jlpt Sensei, v.v.) không cung cấp. Không phải platform nội dung: là công cụ thi.

## Operating Context

- Người học dùng chủ yếu trên điện thoại (mobile-first), trong các buổi ôn thi ngắn 15–30 phút.
- Giáo viên tạo đề từ máy tính, dán JSON hoặc upload file `.json`.
- Deploy trên Vercel, backend là Supabase PostgreSQL.
- Kết nối internet cần thiết cho Supabase; có fallback localStorage khi offline/dev.

## Capabilities and Constraints

- 4 loại bài: Từ vựng (語彙), Kanji (漢字), Ngữ pháp (文法), Đọc hiểu (読解).
- 5 cấp độ JLPT: N5 → N4 → N3 → N2 → N1.
- Guest: xem danh sách, làm bài, xem kết quả — không cần tài khoản.
- Logged-in (giáo viên): tạo/sửa/xóa đề thi và lesson.
- Bài đọc hiểu (reading) có passage tiếng Nhật và dịch tiếng Việt song song.
- Hỗ trợ shuffle câu hỏi và đáp án, đặt giới hạn thời gian hoặc không giới hạn.
- Auto-advance: tự chuyển câu sau khi chọn đáp án.
- JapanesePassageReader: furigana, TTS, tra từ điển inline.
- Ngôn ngữ giao diện: tiếng Việt (không có kế hoạch đa ngôn ngữ).
- Accessibility: chưa có tiêu chuẩn được xác định chính thức.

## Brand Commitments

Chưa có tên thương hiệu, logo, hay brand guideline chính thức. Phong cách giao diện hiện tại là minimalist trắng/đen (Notion-style). Định hướng visual sẽ được quyết định bởi impeccable — chưa locked.

## Evidence on Hand

- Codebase đầy đủ tại `/Users/minhss/Desktop/JLPT/APP/src/`.
- Dữ liệu demo trong `sampleExams.ts` (~30KB).
- Schema Supabase tại `supabase/schema.sql`.
- Template JSON tại `public/exam_template.json` và `public/reading_template.json`.
- Không có asset hình ảnh, logo, hay brand material nào được commit.

## Product Principles

1. **Không rào cản vào bài** — học sinh làm bài ngay lập tức, không cần đăng ký, không friction.
2. **Giáo viên là người tạo nội dung** — platform phục vụ quyền tự chủ nội dung của giáo viên, không lock-in vào ngân hàng đề có sẵn.
3. **Mobile trước hết** — mọi thao tác phải hoạt động tốt trên điện thoại một tay.
4. **Tập trung vào bài thi** — giao diện không tranh sự chú ý với nội dung học tập.
5. **Phản hồi tức thì** — chấm điểm, giải thích, và kết quả ngay sau khi nộp bài.
