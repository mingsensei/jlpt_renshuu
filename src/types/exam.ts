export type ExamCategory = 'vocabulary' | 'kanji' | 'grammar' | 'reading';

export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export const JLPT_LEVELS: { id: JLPTLevel; label: string; name: string; color: string; badgeBg: string }[] = [
  { id: 'N5', label: 'N5', name: 'Sơ cấp 1', color: 'text-emerald-700 border-emerald-300 bg-emerald-50', badgeBg: 'bg-emerald-600' },
  { id: 'N4', label: 'N4', name: 'Sơ cấp 2', color: 'text-blue-700 border-blue-300 bg-blue-50', badgeBg: 'bg-blue-600' },
  { id: 'N3', label: 'N3', name: 'Trung cấp', color: 'text-amber-700 border-amber-300 bg-amber-50', badgeBg: 'bg-amber-600' },
  { id: 'N2', label: 'N2', name: 'Trung cao cấp', color: 'text-orange-700 border-orange-300 bg-orange-50', badgeBg: 'bg-orange-600' },
  { id: 'N1', label: 'N1', name: 'Cao cấp', color: 'text-purple-700 border-purple-300 bg-purple-50', badgeBg: 'bg-purple-600' },
];

export type QuestionType = 'multiple_choice' | 'fill_blank';

export interface Lesson {
  id: string;
  category: ExamCategory;
  title: string;
  description: string | null;
  level?: JLPTLevel | null;
  order_index?: number;
  created_at?: string;
  exams?: Exam[];
  exams_count?: number;
}

export const CATEGORY_TABS: { id: ExamCategory; label: string; subLabel: string; kanji: string }[] = [
  { id: 'vocabulary', label: 'Từ vựng', subLabel: 'Goi', kanji: '語彙' },
  { id: 'kanji', label: 'Kanji', subLabel: 'Kanji', kanji: '漢字' },
  { id: 'grammar', label: 'Ngữ pháp', subLabel: 'Bunpou', kanji: '文法' },
  { id: 'reading', label: 'Đọc hiểu', subLabel: 'Dokkai', kanji: '読解' },
];

export interface Exam {
  id: string;
  lesson_id?: string | null;
  title: string;
  description: string | null;
  time_limit: number | null; // in seconds: null = unlimited, e.g. 1800 for 30 minutes
  shuffle_questions?: boolean;
  shuffle_options?: boolean;
  passage?: string | null; // Japanese reading passage (~500 words)
  passage_translation?: string | null; // Vietnamese translation of the passage
  level?: JLPTLevel | null; // N5, N4, N3, N2, N1
  created_at?: string;
  questions_count?: number;
  lesson?: Lesson | null;
}

export interface Question {
  id: string;
  exam_id: string;
  question: string;
  question_type?: QuestionType; // 'multiple_choice' or 'fill_blank'
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: number; // 0, 1, 2, 3
  explanation: string | null;
  order_index?: number;
}

/**
 * The input format pasted by user in JSON textarea
 */
export interface RawQuestionInput {
  question: string;
  type?: QuestionType;
  question_type?: QuestionType;
  options: string[];
  answer: number;
  explanation?: string;
}

/**
 * Reading Exam JSON input format (can be pasted directly in JSON area)
 */
export interface RawReadingExamInput {
  title?: string;
  description?: string;
  level?: JLPTLevel;
  time_limit?: number | null; // in seconds or minutes
  passage: string;
  passage_translation?: string;
  questions: RawQuestionInput[];
}

export interface UserAnswerReview {
  questionId: string;
  question: string;
  questionType?: QuestionType;
  options: string[];
  userAnswer: number | null; // index of chosen option in displayed order
  correctAnswer: number; // index of correct answer in displayed order
  isCorrect: boolean;
  explanation?: string | null;
  originalAnswerIndex?: number;
}

export interface ExamResult {
  id: string;
  exam_id: string;
  score: number;
  total: number;
  percentage: number;
  time_spent?: number; // seconds
  answers?: UserAnswerReview[];
  created_at?: string;
  exam_title?: string;
  passage?: string | null;
  passage_translation?: string | null;
  level?: JLPTLevel | null;
}

export interface CreateExamFormData {
  title: string;
  description?: string;
  jsonContent: string;
  category: ExamCategory;
  level?: JLPTLevel;
  passage?: string;
  passage_translation?: string;
  timeMode: 'unlimited' | 'limited';
  timeLimitMinutes: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
}
