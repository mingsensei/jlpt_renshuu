-- ====================================================================
-- JLPT Practice & Examination Platform - Supabase PostgreSQL Schema
-- Host: db.ntodbclgjrphbezmdvan.supabase.co
-- ====================================================================

-- 1. Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create 'lessons' table (Vocabulary, Kanji, Grammar)
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('vocabulary', 'kanji', 'grammar')),
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create 'exams' table
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  time_limit INTEGER DEFAULT NULL, -- null = unlimited, integer = time limit in seconds
  shuffle_questions BOOLEAN DEFAULT FALSE,
  shuffle_options BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create 'questions' table
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer INTEGER NOT NULL CHECK (correct_answer >= 0 AND correct_answer <= 3), -- 0=A, 1=B, 2=C, 3=D
  explanation TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Create 'exam_results' table
CREATE TABLE IF NOT EXISTS public.exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  percentage FLOAT NOT NULL,
  time_spent INTEGER DEFAULT 0, -- seconds spent on the exam
  answers JSONB DEFAULT '[]'::jsonb, -- detailed review data
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_lessons_category ON public.lessons(category);
CREATE INDEX IF NOT EXISTS idx_lessons_order_index ON public.lessons(order_index ASC);
CREATE INDEX IF NOT EXISTS idx_exams_lesson_id ON public.exams(lesson_id);
CREATE INDEX IF NOT EXISTS idx_questions_exam_id ON public.questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_exam_id ON public.exam_results(exam_id);
CREATE INDEX IF NOT EXISTS idx_exams_created_at ON public.exams(created_at DESC);

-- 6. Configure Row Level Security (RLS)
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

-- Lessons Policies
DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON public.lessons;
DROP POLICY IF EXISTS "Lessons can be inserted by everyone" ON public.lessons;
DROP POLICY IF EXISTS "Lessons can be updated by everyone" ON public.lessons;
DROP POLICY IF EXISTS "Lessons can be deleted by everyone" ON public.lessons;

CREATE POLICY "Lessons are viewable by everyone" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Lessons can be inserted by everyone" ON public.lessons FOR INSERT WITH CHECK (true);
CREATE POLICY "Lessons can be updated by everyone" ON public.lessons FOR UPDATE USING (true);
CREATE POLICY "Lessons can be deleted by everyone" ON public.lessons FOR DELETE USING (true);

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public exams are viewable by everyone" ON public.exams;
DROP POLICY IF EXISTS "Public exams can be inserted by everyone" ON public.exams;
DROP POLICY IF EXISTS "Public exams can be updated by everyone" ON public.exams;
DROP POLICY IF EXISTS "Public exams can be deleted by everyone" ON public.exams;

DROP POLICY IF EXISTS "Questions are viewable by everyone" ON public.questions;
DROP POLICY IF EXISTS "Questions can be inserted by everyone" ON public.questions;
DROP POLICY IF EXISTS "Questions can be updated by everyone" ON public.questions;
DROP POLICY IF EXISTS "Questions can be deleted by everyone" ON public.questions;

DROP POLICY IF EXISTS "Results are viewable by everyone" ON public.exam_results;
DROP POLICY IF EXISTS "Results can be inserted by everyone" ON public.exam_results;

-- Create open policies for public access (anon & authenticated)
CREATE POLICY "Public exams are viewable by everyone" ON public.exams
  FOR SELECT USING (true);
CREATE POLICY "Public exams can be inserted by everyone" ON public.exams
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Public exams can be updated by everyone" ON public.exams
  FOR UPDATE USING (true);
CREATE POLICY "Public exams can be deleted by everyone" ON public.exams
  FOR DELETE USING (true);

CREATE POLICY "Questions are viewable by everyone" ON public.questions
  FOR SELECT USING (true);
CREATE POLICY "Questions can be inserted by everyone" ON public.questions
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Questions can be updated by everyone" ON public.questions
  FOR UPDATE USING (true);
CREATE POLICY "Questions can be deleted by everyone" ON public.questions
  FOR DELETE USING (true);

CREATE POLICY "Results are viewable by everyone" ON public.exam_results
  FOR SELECT USING (true);
CREATE POLICY "Results can be inserted by everyone" ON public.exam_results
  FOR INSERT WITH CHECK (true);

-- ====================================================================
-- Sample Initial Data (JLPT N5 Vocabulary & Grammar Starter Test)
-- ====================================================================
DO $$
DECLARE
  new_exam_id UUID;
BEGIN
  -- Check if a sample exam already exists
  IF NOT EXISTS (SELECT 1 FROM public.exams WHERE title = 'JLPT N5 Starter Quiz - 語彙と文法') THEN
    INSERT INTO public.exams (title, description, time_limit, shuffle_questions, shuffle_options)
    VALUES (
      'JLPT N5 Starter Quiz - 語彙と文法',
      'Đề thi thử JLPT N5 tổng hợp từ vựng và ngữ pháp căn bản, gồm 10 câu hỏi tiêu chuẩn.',
      900, -- 15 minutes = 900 seconds
      false,
      false
    )
    RETURNING id INTO new_exam_id;

    -- Insert Questions
    INSERT INTO public.questions (exam_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, order_index)
    VALUES
      (
        new_exam_id,
        '「食べます」のて形はどれですか？',
        '食べて',
        '食べた',
        '食べる',
        '食べない',
        0,
        '食べます is a group 2 (一段) verb. Drop -ます and add -て -> 食べて.',
        1
      ),
      (
        new_exam_id,
        '日本の首都はどこですか？',
        '大阪',
        '京都',
        '東京',
        '北海道',
        2,
        'Tokyo (東京) is the capital city of Japan.',
        2
      ),
      (
        new_exam_id,
        '日本語で「book」は何と言いますか？',
        '本',
        '車',
        '水',
        '山',
        0,
        '「本」(ほん - hon) nghĩa là sách (book).',
        3
      ),
      (
        new_exam_id,
        'わたしはまいあさコーヒーを＿＿＿。',
        'のみます',
        'たべます',
        'みます',
        'ききます',
        0,
        'Đồ uống (コーヒー - cà phê) đi với động từ のみます (uống).',
        4
      ),
      (
        new_exam_id,
        'きのう、ともだち＿＿えいがをみました。',
        'に',
        'と',
        'で',
        'を',
        1,
        'Trợ từ と dùng để chỉ cùng làm việc gì đó với ai: ともだちと (cùng với bạn).',
        5
      ),
      (
        new_exam_id,
        '「学校」の読み方はどれですか？',
        'がっこう',
        'がこう',
        'かっこう',
        'がっこ',
        0,
        '学校 đọc là がっこう (gakkou - trường học).',
        6
      ),
      (
        new_exam_id,
        'このへやはすずしいですが、＿＿＿です。',
        'せまい',
        'ひろい',
        'あかるい',
        'あたらしい',
        0,
        'Liên từ 「が」 mang nghĩa tương phản/tiêu cực sau ý tốt: Phòng mát nhưng hẹp (せまい).',
        7
      ),
      (
        new_exam_id,
        'すみません、いま＿＿じですか？',
        'なん',
        'なに',
        'どこ',
        'だれ',
        0,
        'Hỏi giờ dùng なんじ (何時).',
        8
      ),
      (
        new_exam_id,
        'あした雨が＿＿＿、いえにいます。',
        'ふったら',
        'ふるなら',
        'ふると',
        'ふれば',
        0,
        'Cấu trúc điều kiện ~たら: 雨がふったら (Nếu trời mưa thì sẽ ở nhà).',
        9
      ),
      (
        new_exam_id,
        '駅まで歩いてどのくらい＿＿＿か？',
        'かかります',
        'します',
        'いきます',
        'あります',
        0,
        'Hỏi mất bao lâu về thời gian dùng động từ かかります (かかりますか).',
        10
      );
  END IF;
END $$;
