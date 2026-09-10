export interface Exam {
  id: string;
  title: string;
  description: string | null;
  time_limit: number | null; // in seconds: null = unlimited, e.g. 1800 for 30 minutes
  shuffle_questions?: boolean;
  shuffle_options?: boolean;
  created_at?: string;
  questions_count?: number;
}

export interface Question {
  id: string;
  exam_id: string;
  question: string;
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
  options: string[];
  answer: number;
  explanation?: string;
}

export interface UserAnswerReview {
  questionId: string;
  question: string;
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
}

export interface CreateExamFormData {
  title: string;
  description?: string;
  jsonContent: string;
  timeMode: 'unlimited' | 'limited';
  timeLimitMinutes: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
}
