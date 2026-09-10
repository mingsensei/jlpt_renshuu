import { supabase, isSupabaseConfigured } from './supabase';
import type { Exam, Question, RawQuestionInput, ExamResult, UserAnswerReview } from '../types/exam';
import { DEMO_EXAMS, DEMO_QUESTIONS } from '../data/sampleExams';

const LOCAL_STORAGE_EXAMS_KEY = 'jlpt_local_exams';
const LOCAL_STORAGE_QUESTIONS_KEY = 'jlpt_local_questions';
const LOCAL_STORAGE_RESULTS_KEY = 'jlpt_local_results';

// Helper to access LocalStorage for offline/fallback mode
function getLocalExams(): Exam[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_EXAMS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_EXAMS_KEY, JSON.stringify(DEMO_EXAMS));
      localStorage.setItem(LOCAL_STORAGE_QUESTIONS_KEY, JSON.stringify(DEMO_QUESTIONS));
      return DEMO_EXAMS;
    }
    return JSON.parse(raw);
  } catch {
    return DEMO_EXAMS;
  }
}

function saveLocalExams(exams: Exam[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_EXAMS_KEY, JSON.stringify(exams));
  } catch (err) {
    console.error('Error saving local exams:', err);
  }
}

function getLocalQuestions(examId: string): Question[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_QUESTIONS_KEY);
    const map: Record<string, Question[]> = raw ? JSON.parse(raw) : DEMO_QUESTIONS;
    return map[examId] || [];
  } catch {
    return DEMO_QUESTIONS[examId] || [];
  }
}

function saveLocalQuestions(examId: string, questions: Question[]) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_QUESTIONS_KEY);
    const map: Record<string, Question[]> = raw ? JSON.parse(raw) : { ...DEMO_QUESTIONS };
    map[examId] = questions;
    localStorage.setItem(LOCAL_STORAGE_QUESTIONS_KEY, JSON.stringify(map));
  } catch (err) {
    console.error('Error saving local questions:', err);
  }
}

function getLocalResults(): ExamResult[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RESULTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalResult(result: ExamResult) {
  try {
    const results = getLocalResults();
    results.unshift(result);
    localStorage.setItem(LOCAL_STORAGE_RESULTS_KEY, JSON.stringify(results));
  } catch (err) {
    console.error('Error saving local result:', err);
  }
}

export const examService = {
  /**
   * Fetch all exams with their question counts
   */
  async getExams(): Promise<Exam[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*, questions(count)')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            time_limit: item.time_limit,
            shuffle_questions: item.shuffle_questions,
            shuffle_options: item.shuffle_options,
            created_at: item.created_at,
            questions_count: item.questions ? item.questions[0]?.count ?? 0 : 0
          }));
        } else if (error) {
          console.warn('Supabase getExams error, falling back to local storage:', error.message);
        }
      } catch (err) {
        console.warn('Network error connecting to Supabase:', err);
      }
    }

    // Fallback to local
    return getLocalExams();
  },

  /**
   * Fetch a single exam and its questions by ID
   */
  async getExamById(id: string): Promise<{ exam: Exam; questions: Question[] } | null> {
    if (isSupabaseConfigured()) {
      try {
        const [examRes, questionsRes] = await Promise.all([
          supabase.from('exams').select('*').eq('id', id).single(),
          supabase.from('questions').select('*').eq('exam_id', id).order('order_index', { ascending: true })
        ]);

        if (!examRes.error && examRes.data && !questionsRes.error && questionsRes.data) {
          return {
            exam: {
              ...examRes.data,
              questions_count: questionsRes.data.length
            },
            questions: questionsRes.data
          };
        }
      } catch (err) {
        console.warn('Supabase getExamById error, falling back to local:', err);
      }
    }

    // Fallback to local
    const localExams = getLocalExams();
    const exam = localExams.find((e) => e.id === id);
    if (!exam) return null;

    const questions = getLocalQuestions(id);
    return {
      exam: { ...exam, questions_count: questions.length },
      questions
    };
  },

  /**
   * Create a new exam with parsed questions
   */
  async createExam(
    title: string,
    description: string,
    timeLimitSeconds: number | null,
    rawQuestions: RawQuestionInput[],
    shuffleQuestions: boolean = false,
    shuffleOptions: boolean = false
  ): Promise<string> {
    const examId = crypto.randomUUID ? crypto.randomUUID() : `exam-${Date.now()}`;

    if (isSupabaseConfigured()) {
      try {
        // Insert exam
        const { data: examData, error: examError } = await supabase
          .from('exams')
          .insert({
            id: examId,
            title,
            description: description || null,
            time_limit: timeLimitSeconds,
            shuffle_questions: shuffleQuestions,
            shuffle_options: shuffleOptions
          })
          .select('id')
          .single();

        if (!examError && examData) {
          const actualExamId = examData.id;

          // Format questions for Supabase
          const questionsPayload = rawQuestions.map((q, idx) => ({
            exam_id: actualExamId,
            question: q.question,
            option_a: q.options[0] || '',
            option_b: q.options[1] || '',
            option_c: q.options[2] || '',
            option_d: q.options[3] || '',
            correct_answer: q.answer,
            explanation: q.explanation || null,
            order_index: idx + 1
          }));

          const { error: questionsError } = await supabase
            .from('questions')
            .insert(questionsPayload);

          if (!questionsError) {
            return actualExamId;
          } else {
            console.error('Failed to insert questions into Supabase:', questionsError);
          }
        } else {
          console.error('Failed to insert exam into Supabase:', examError);
        }
      } catch (err) {
        console.warn('Error saving to Supabase, falling back to local storage:', err);
      }
    }

    // Fallback: Save to localStorage
    const newExam: Exam = {
      id: examId,
      title,
      description: description || null,
      time_limit: timeLimitSeconds,
      shuffle_questions: shuffleQuestions,
      shuffle_options: shuffleOptions,
      created_at: new Date().toISOString(),
      questions_count: rawQuestions.length
    };

    const newQuestions: Question[] = rawQuestions.map((q, idx) => ({
      id: `q-${examId}-${idx + 1}`,
      exam_id: examId,
      question: q.question,
      option_a: q.options[0] || '',
      option_b: q.options[1] || '',
      option_c: q.options[2] || '',
      option_d: q.options[3] || '',
      correct_answer: q.answer,
      explanation: q.explanation || null,
      order_index: idx + 1
    }));

    const currentExams = getLocalExams();
    currentExams.unshift(newExam);
    saveLocalExams(currentExams);
    saveLocalQuestions(examId, newQuestions);

    return examId;
  },

  /**
   * Delete an exam
   */
  async deleteExam(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('exams').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }

    const currentExams = getLocalExams().filter((e) => e.id !== id);
    saveLocalExams(currentExams);
    return true;
  },

  /**
   * Save exam result
   */
  async saveResult(result: {
    examId: string;
    score: number;
    total: number;
    percentage: number;
    timeSpent: number;
    answers: UserAnswerReview[];
    examTitle?: string;
  }): Promise<string> {
    const resultId = crypto.randomUUID ? crypto.randomUUID() : `result-${Date.now()}`;

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('exam_results')
          .insert({
            id: resultId,
            exam_id: result.examId,
            score: result.score,
            total: result.total,
            percentage: result.percentage,
            time_spent: result.timeSpent,
            answers: result.answers
          })
          .select('id')
          .single();

        if (!error && data) {
          return data.id;
        }
      } catch (err) {
        console.warn('Supabase saveResult error:', err);
      }
    }

    // Local fallback
    const localResult: ExamResult = {
      id: resultId,
      exam_id: result.examId,
      score: result.score,
      total: result.total,
      percentage: result.percentage,
      time_spent: result.timeSpent,
      answers: result.answers,
      created_at: new Date().toISOString(),
      exam_title: result.examTitle
    };

    saveLocalResult(localResult);
    return resultId;
  },

  /**
   * Get exam result by ID
   */
  async getResultById(id: string): Promise<ExamResult | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('exam_results')
          .select('*, exams(title)')
          .eq('id', id)
          .single();

        if (!error && data) {
          return {
            id: data.id,
            exam_id: data.exam_id,
            score: data.score,
            total: data.total,
            percentage: data.percentage,
            time_spent: data.time_spent,
            answers: data.answers,
            created_at: data.created_at,
            exam_title: data.exams?.title
          };
        }
      } catch (err) {
        console.warn('Supabase getResultById error:', err);
      }
    }

    const localResults = getLocalResults();
    return localResults.find((r) => r.id === id) || null;
  }
};
