-- ====================================================================
-- Migration: Add Reading Category (Đọc hiểu) & JLPT Levels (N5 - N1)
-- Passage (~500 words), Vietnamese Translation & Question Types
-- JLPT Practice & Examination Platform
-- ====================================================================

-- 1. Update lessons table category constraint to include 'reading'
ALTER TABLE public.lessons DROP CONSTRAINT IF EXISTS lessons_category_check;
ALTER TABLE public.lessons ADD CONSTRAINT lessons_category_check 
  CHECK (category IN ('vocabulary', 'kanji', 'grammar', 'reading'));

-- 2. Add 'level' column to lessons (N5, N4, N3, N2, N1)
ALTER TABLE public.lessons 
  ADD COLUMN IF NOT EXISTS level TEXT CHECK (level IS NULL OR level IN ('N5', 'N4', 'N3', 'N2', 'N1'));

-- 3. Add 'passage', 'passage_translation', 'level' to exams table
ALTER TABLE public.exams 
  ADD COLUMN IF NOT EXISTS passage TEXT;

ALTER TABLE public.exams 
  ADD COLUMN IF NOT EXISTS passage_translation TEXT;

ALTER TABLE public.exams 
  ADD COLUMN IF NOT EXISTS level TEXT CHECK (level IS NULL OR level IN ('N5', 'N4', 'N3', 'N2', 'N1'));

-- 4. Add 'question_type' to questions table ('multiple_choice' or 'fill_blank')
ALTER TABLE public.questions 
  ADD COLUMN IF NOT EXISTS question_type TEXT DEFAULT 'multiple_choice';

-- 5. Add reading columns to exam_results for persistent snapshot
ALTER TABLE public.exam_results 
  ADD COLUMN IF NOT EXISTS passage TEXT;

ALTER TABLE public.exam_results 
  ADD COLUMN IF NOT EXISTS passage_translation TEXT;

ALTER TABLE public.exam_results 
  ADD COLUMN IF NOT EXISTS level TEXT;

-- 6. Create indexes for quick lookups
CREATE INDEX IF NOT EXISTS idx_exams_level ON public.exams(level);
CREATE INDEX IF NOT EXISTS idx_lessons_level ON public.lessons(level);
CREATE INDEX IF NOT EXISTS idx_questions_question_type ON public.questions(question_type);

-- 7. Seed Initial Reading Lessons (N5 to N1)
DO $$
DECLARE
  v_reading_n5 UUID;
  v_reading_n4 UUID;
  v_reading_n3 UUID;
  v_reading_n2 UUID;
  v_reading_n1 UUID;
  v_exam_n3 UUID;
  v_exam_n5 UUID;
BEGIN
  -- N5 Reading Lesson
  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'reading' AND level = 'N5') THEN
    INSERT INTO public.lessons (category, level, title, description, order_index)
    VALUES ('reading', 'N5', 'Đọc hiểu N5: Đoạn văn ngắn & Thông báo cơ bản', 'Luyện tập kỹ năng đọc hiểu đoạn văn ngắn 200-300 từ, thông báo, biển báo cơ bản.', 1)
    RETURNING id INTO v_reading_n5;
  END IF;

  -- N4 Reading Lesson
  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'reading' AND level = 'N4') THEN
    INSERT INTO public.lessons (category, level, title, description, order_index)
    VALUES ('reading', 'N4', 'Đọc hiểu N4: Thư từ & Đời sống thường nhật', 'Đọc hiểu thư từ, email, các bài văn về đời sống, văn hóa sinh hoạt Nhật Bản.', 2)
    RETURNING id INTO v_reading_n4;
  END IF;

  -- N3 Reading Lesson
  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'reading' AND level = 'N3') THEN
    INSERT INTO public.lessons (category, level, title, description, order_index)
    VALUES ('reading', 'N3', 'Đọc hiểu N3: Đoạn văn trung cấp ~500 từ', 'Rèn luyện khả năng đọc hiểu chuyên sâu với đoạn văn ~500 từ, câu hỏi điền từ và suy luận ý chính.', 3)
    RETURNING id INTO v_reading_n3;
  ELSE
    SELECT id INTO v_reading_n3 FROM public.lessons WHERE category = 'reading' AND level = 'N3' LIMIT 1;
  END IF;

  -- N2 Reading Lesson
  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'reading' AND level = 'N2') THEN
    INSERT INTO public.lessons (category, level, title, description, order_index)
    VALUES ('reading', 'N2', 'Đọc hiểu N2: Xã hội, Công nghệ & Bình luận', 'Đọc hiểu nghị luận, bình luận xã hội, bài báo với lập luận phức tạp và từ vựng phong phú.', 4)
    RETURNING id INTO v_reading_n2;
  END IF;

  -- N1 Reading Lesson
  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'reading' AND level = 'N1') THEN
    INSERT INTO public.lessons (category, level, title, description, order_index)
    VALUES ('reading', 'N1', 'Đọc hiểu N1: Chuyên khảo, Triết học & Trừu tượng', 'Đọc hiểu trình độ cao cấp với các chủ đề trừu tượng, văn học, triết học và lý luận sâu sắc.', 5)
    RETURNING id INTO v_reading_n1;
  END IF;

  -- Seed Sample N3 Reading Exam if not present
  IF v_reading_n3 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.exams WHERE title LIKE '%JLPT N3 Đọc hiểu%') THEN
    INSERT INTO public.exams (
      lesson_id,
      title,
      description,
      time_limit,
      level,
      passage,
      passage_translation,
      shuffle_questions,
      shuffle_options
    )
    VALUES (
      v_reading_n3,
      'JLPT N3 Đọc hiểu - Thói quen đọc sách và sự thay đổi thời đại số',
      'Bài thi đọc hiểu mẫu trình độ JLPT N3: Đoạn văn ~500 từ thảo luận về văn hóa đọc sách thời hiện đại. Gồm câu hỏi điền vào chỗ trống và câu hỏi trắc nghiệm tìm hiểu ý tác giả.',
      1800,
      'N3',
      E'近年、スマートフォンやタブレット端末の普及によって、人々の生活習慣は大きく変化した。特に目立つのは、読書に対する姿勢の違いである。以前は通勤や通学の電車の中で文庫本や新聞を読んでいる人の姿をよく見かけたものだが、最近ではほとんどの人が画面を見つめている。\n\nもちろん、電子書籍の利用者が増えていることも事実である。いつでもどこでも何百冊もの本を持ち歩くことができ、文字の大きさを自由に変えられるなど、デジタルならではの利点も多い。しかし、ネットサーフィンやSNSの閲覧に多くの時間を費やし、一冊の本をじっくり読む時間が減ってしまったと感じる人も（ 1 ）。\n\nある調査によると、1ヶ月に1冊も本を読まない成人の割合が約半数に達したという。本を読むことは、単に知識や情報を得るためだけのものではない。登場人物の気持ちを想像したり、著者の論理的な思考を追体験したりすることで、深い思考力や共感力が養われるのである。\n\n情報を短時間で効率よく手に入れることばかりが重視される現代だからこそ、あえて時間をかけて活字と向き合う習慣が（ 2 ）。本を開く時間は、忙しい日常の中で自分の心と静かに語り合うための、かけがえのない貴重なひとときなのである。',
      E'Những năm gần đây, với sự phổ biến của điện thoại thông minh và máy tính bảng, thói quen sinh hoạt của con người đã thay đổi đáng kể. Điều dễ nhận thấy nhất chính là sự khác biệt trong thái độ đối với việc đọc sách. Trước đây, người ta thường bắt gặp hình ảnh mọi người đọc sách bỏ túi hoặc báo giấy trên tàu điện khi đi làm hay đi học, nhưng gần đây hầu hết mọi người đều dán mắt vào màn hình.\n\nTất nhiên, cũng có một thực tế là số lượng người sử dụng sách điện tử đang tăng lên. Có rất nhiều ưu điểm chỉ kỹ thuật số mới có như việc có thể mang theo hàng trăm cuốn sách mọi lúc mọi nơi và tự do thay đổi kích cỡ chữ. Tuy nhiên, cũng có không ít người cảm thấy rằng việc dành nhiều thời gian lướt web và mạng xã hội đã khiến thời gian đọc kỹ trọn vẹn một cuốn sách bị giảm đi.\n\nTheo một khảo sát, tỷ lệ người trưởng thành không đọc cuốn sách nào trong một tháng đã lên tới khoảng một nửa. Việc đọc sách không đơn thuần chỉ là để thu thập kiến thức hay thông tin. Bằng cách tưởng tượng cảm xúc của các nhân vật hay trải nghiệm lại tư duy logic của tác giả, khả năng tư duy sâu sắc và năng lực thấu cảm sẽ được nuôi dưỡng.\n\nChính vì đang sống trong thời đại hiện nay - nơi mà việc thu nhận thông tin nhanh chóng và hiệu quả luôn được đề cao - nên thói quen dành thời gian đối diện với từng con chữ in lại càng trở nên cần thiết hơn bao giờ hết. Khoảng thời gian mở một cuốn sách ra chính là khoảnh khắc vô giá không thể thay thế để tĩnh lặng trò chuyện với tâm hồn mình giữa những ngày tháng bận rộn.',
      false,
      false
    )
    RETURNING id INTO v_exam_n3;

    -- Add 4 questions (fill in blank & multiple choice)
    IF v_exam_n3 IS NOT NULL THEN
      -- Question 1: Fill blank
      INSERT INTO public.questions (exam_id, question, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation, order_index)
      VALUES (
        v_exam_n3,
        E'（ 1 ）に入る最も適切な表現はどれですか。',
        'fill_blank',
        '少なくないようだ',
        '多すぎるはずだ',
        'いないに違いない',
        '減るわけがない',
        0,
        E'Giải thích: Cụm từ 「少なくない」（không ít）thường đi với 「〜と感じる人も少なくない」（người cảm thấy... không phải là ít）. Câu trước tác giả nêu rằng người ta dành quá nhiều thời gian lướt SNS làm giảm thời gian đọc sách, nên nhận định rằng người cảm thấy như vậy "không hề ít" là hoàn toàn tự nhiên và logic.',
        1
      );

      -- Question 2: Fill blank
      INSERT INTO public.questions (exam_id, question, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation, order_index)
      VALUES (
        v_exam_n3,
        E'（ 2 ）に入る最も適切な表現はどれですか。',
        'fill_blank',
        '求められているのではないだろうか',
        '禁止されるべきではないか',
        '無意味になる恐れがある',
        '必要とされないはずだ',
        0,
        E'Giải thích: 「〜からこそ、〜が求められているのではないだろうか」 là cấu trúc nêu quan điểm/kêu gọi của tác giả: Chính vì thời đại chuộng nhanh gọn, nên thói quen dành thời gian đọc sách "chẳng phải càng được đòi hỏi/cần thiết hơn hay sao?". Các phương án khác mang nghĩa phủ định hoặc cấm đoán, không phù hợp ngữ cảnh tôn vinh giá trị đọc sách.',
        2
      );

      -- Question 3: Multiple choice
      INSERT INTO public.questions (exam_id, question, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation, order_index)
      VALUES (
        v_exam_n3,
        E'筆者によると、本を読むことの本来の価値は何ですか。',
        'multiple_choice',
        '思考力や他者への共感力をじっくり養うこと',
        '電子書籍を使って素早く情報を検索すること',
        '最新の時事問題について誰よりも早く知ること',
        '電車の中で周囲の人とコミュニケーションをとること',
        0,
        E'Giải thích: Đoạn 3 nêu rõ: 「本を読むことは、単に知識や情報を得るためだけのものではない。登場人物の気持ちを想像したり、著者の論理的な思考を追体験したりすることで、深い思考力や共感力が養われるのである。」 (Nuôi dưỡng tư duy sâu sắc và sự thấu cảm).',
        3
      );

      -- Question 4: Multiple choice
      INSERT INTO public.questions (exam_id, question, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation, order_index)
      VALUES (
        v_exam_n3,
        E'この文章で筆者が最も伝えたいことはどれですか。',
        'multiple_choice',
        '現代社会の忙しさの中でも、本と向き合い自分を見つめる時間を大切にしてほしい。',
        '電子書籍は目が疲れるため、今すぐ紙の本に戻すべきである。',
        'スマートフォンの利用を電車内ですべて禁止するべきである。',
        '月に1冊も本を読まない大人は反省して速読の練習をするべきだ。',
        0,
        E'Giải thích: Câu kết của bài nêu bật thông điệp chủ đạo: 「本を開く時間は、忙しい日常の中で自分の心と静かに語り合うための、かけがえのない貴重なひとときなのである。」 Tác giả khuyên dù bận rộn cũng nên trân trọng khoảnh khắc đọc sách để đối thoại với chính tâm hồn mình.',
        4
      );
    END IF;
  END IF;
END $$;
