-- ====================================================================
-- Migration: Add Lessons & Lesson Categories (Vocabulary, Kanji, Grammar)
-- JLPT Practice & Examination Platform
-- ====================================================================

-- 1. Create 'lessons' table
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('vocabulary', 'kanji', 'grammar')),
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Add 'lesson_id' column to 'exams' table
ALTER TABLE public.exams 
  ADD COLUMN IF NOT EXISTS lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL;

-- 3. Create indexes for quick category filtering and relationship lookups
CREATE INDEX IF NOT EXISTS idx_lessons_category ON public.lessons(category);
CREATE INDEX IF NOT EXISTS idx_lessons_order_index ON public.lessons(order_index ASC);
CREATE INDEX IF NOT EXISTS idx_exams_lesson_id ON public.exams(lesson_id);

-- 4. Enable Row Level Security (RLS) for lessons
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON public.lessons;
DROP POLICY IF EXISTS "Lessons can be inserted by everyone" ON public.lessons;
DROP POLICY IF EXISTS "Lessons can be updated by everyone" ON public.lessons;
DROP POLICY IF EXISTS "Lessons can be deleted by everyone" ON public.lessons;

-- Create public access policies for lessons
CREATE POLICY "Lessons are viewable by everyone" ON public.lessons
  FOR SELECT USING (true);
CREATE POLICY "Lessons can be inserted by everyone" ON public.lessons
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Lessons can be updated by everyone" ON public.lessons
  FOR UPDATE USING (true);
CREATE POLICY "Lessons can be deleted by everyone" ON public.lessons
  FOR DELETE USING (true);

-- 5. Seed default lessons & map existing exams
DO $$
DECLARE
  v_vocab_1 UUID;
  v_vocab_2 UUID;
  v_vocab_3 UUID;
  v_kanji_1 UUID;
  v_kanji_2 UUID;
  v_grammar_1 UUID;
  v_grammar_2 UUID;
BEGIN
  -- Insert sample vocabulary lessons
  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'vocabulary' AND title = 'Bài 1: Từ vựng Nhập môn & Chào hỏi') THEN
    INSERT INTO public.lessons (category, title, description, order_index)
    VALUES ('vocabulary', 'Bài 1: Từ vựng Nhập môn & Chào hỏi', 'Từ vựng cơ bản về chào hỏi, giới thiệu bản thân, quốc tịch và nghề nghiệp.', 1)
    RETURNING id INTO v_vocab_1;
  ELSE
    SELECT id INTO v_vocab_1 FROM public.lessons WHERE category = 'vocabulary' AND title = 'Bài 1: Từ vựng Nhập môn & Chào hỏi' LIMIT 1;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'vocabulary' AND title = 'Bài 2: Đồ vật & Đời sống hàng ngày') THEN
    INSERT INTO public.lessons (category, title, description, order_index)
    VALUES ('vocabulary', 'Bài 2: Đồ vật & Đời sống hàng ngày', 'Từ vựng đồ dùng cá nhân, đồ vật trong phòng, vị trí và giá cả.', 2)
    RETURNING id INTO v_vocab_2;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'vocabulary' AND title = 'Bài 3: Địa điểm & Phương hướng') THEN
    INSERT INTO public.lessons (category, title, description, order_index)
    VALUES ('vocabulary', 'Bài 3: Địa điểm & Phương hướng', 'Địa điểm công cộng, phương tiện giao thông và cách hỏi đường.', 3)
    RETURNING id INTO v_vocab_3;
  END IF;

  -- Insert sample kanji lessons
  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'kanji' AND title = 'Bài 1: Chữ số & Thời gian') THEN
    INSERT INTO public.lessons (category, title, description, order_index)
    VALUES ('kanji', 'Bài 1: Chữ số & Thời gian', 'Hán tự căn bản: 一, 二, 三, 四, 五, 六, 七, 八, 九, 十, 百, 千, 万, 日, 月, 年, 時.', 1)
    RETURNING id INTO v_kanji_1;
  ELSE
    SELECT id INTO v_kanji_1 FROM public.lessons WHERE category = 'kanji' AND title = 'Bài 1: Chữ số & Thời gian' LIMIT 1;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'kanji' AND title = 'Bài 2: Con người & Tự nhiên') THEN
    INSERT INTO public.lessons (category, title, description, order_index)
    VALUES ('kanji', 'Bài 2: Con người & Tự nhiên', 'Hán tự chỉ người và thiên nhiên: 人, 男, 女, 子, 父, 母, 山, 川, 木, 田, 雨.', 2)
    RETURNING id INTO v_kanji_2;
  END IF;

  -- Insert sample grammar lessons
  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'grammar' AND title = 'Bài 1: Trợ từ căn bản & Câu khẳng định / phủ định') THEN
    INSERT INTO public.lessons (category, title, description, order_index)
    VALUES ('grammar', 'Bài 1: Trợ từ căn bản & Câu khẳng định / phủ định', 'Trọng điểm cấu trúc N5: N1 は N2 です / ではありません / ですか, trợ từ の, も.', 1)
    RETURNING id INTO v_grammar_1;
  ELSE
    SELECT id INTO v_grammar_1 FROM public.lessons WHERE category = 'grammar' AND title = 'Bài 1: Trợ từ căn bản & Câu khẳng định / phủ định' LIMIT 1;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.lessons WHERE category = 'grammar' AND title = 'Bài 2: Trợ từ nơi chốn & hành động (で, に, へ, を)') THEN
    INSERT INTO public.lessons (category, title, description, order_index)
    VALUES ('grammar', 'Bài 2: Trợ từ nơi chốn & hành động (で, に, へ, を)', 'Diễn đạt hành động tại địa điểm (で), di chuyển đến đâu (へ/に), và tân ngữ (を).', 2)
    RETURNING id INTO v_grammar_2;
  END IF;

  -- Map existing unassigned exams to appropriate default lessons
  -- 1. Exams with 'kanji' or 'hán tự' in title -> assign to Kanji Bài 1
  UPDATE public.exams
  SET lesson_id = v_kanji_1
  WHERE lesson_id IS NULL AND (LOWER(title) LIKE '%kanji%' OR LOWER(title) LIKE '%hán tự%');

  -- 2. Exams with 'ngữ pháp' or 'grammar' in title -> assign to Grammar Bài 1
  UPDATE public.exams
  SET lesson_id = v_grammar_1
  WHERE lesson_id IS NULL AND (LOWER(title) LIKE '%ngữ pháp%' OR LOWER(title) LIKE '%grammar%' OR LOWER(title) LIKE '%starter%');

  -- 3. Any remaining unassigned exams -> assign to Vocabulary Bài 1
  UPDATE public.exams
  SET lesson_id = v_vocab_1
  WHERE lesson_id IS NULL;

END $$;
