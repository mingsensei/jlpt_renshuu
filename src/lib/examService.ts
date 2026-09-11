import { supabase, isSupabaseConfigured } from './supabase';
import type { Exam, Question, RawQuestionInput, ExamResult, UserAnswerReview, Lesson, ExamCategory } from '../types/exam';
import { DEMO_EXAMS, DEMO_QUESTIONS, DEMO_LESSONS } from '../data/sampleExams';

const LOCAL_STORAGE_LESSONS_KEY = 'jlpt_local_lessons';
const LOCAL_STORAGE_EXAMS_KEY = 'jlpt_local_exams';
const LOCAL_STORAGE_QUESTIONS_KEY = 'jlpt_local_questions';
const LOCAL_STORAGE_RESULTS_KEY = 'jlpt_local_results';

function getLocalLessons(): Lesson[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_LESSONS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_LESSONS_KEY, JSON.stringify(DEMO_LESSONS));
      return DEMO_LESSONS;
    }
    return JSON.parse(raw);
  } catch {
    return DEMO_LESSONS;
  }
}

function saveLocalLessons(lessons: Lesson[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_LESSONS_KEY, JSON.stringify(lessons));
  } catch (err) {
    console.error('Error saving local lessons:', err);
  }
}

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
   * Fetch lessons, optionally filtered by category, including their nested exams
   */
  async getLessons(category?: ExamCategory): Promise<Lesson[]> {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase
          .from('lessons')
          .select('*, exams(*, questions(count))')
          .order('order_index', { ascending: true })
          .order('created_at', { ascending: true });

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (!error && data) {
          return data.map((item: any) => ({
            id: item.id,
            category: item.category as ExamCategory,
            title: item.title,
            description: item.description,
            order_index: item.order_index,
            created_at: item.created_at,
            exams_count: item.exams ? item.exams.length : 0,
            exams: item.exams
              ? item.exams
                  .map((e: any) => ({
                    id: e.id,
                    lesson_id: e.lesson_id,
                    title: e.title,
                    description: e.description,
                    time_limit: e.time_limit,
                    shuffle_questions: e.shuffle_questions,
                    shuffle_options: e.shuffle_options,
                    created_at: e.created_at,
                    questions_count: e.questions ? e.questions[0]?.count ?? 0 : 0
                  }))
                  .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              : []
          }));
        } else if (error) {
          console.warn('Supabase getLessons error, falling back to local storage:', error.message);
        }
      } catch (err) {
        console.warn('Network error connecting to Supabase for lessons:', err);
      }
    }

    // Fallback to local
    const localLessons = getLocalLessons();
    const localExams = getLocalExams();
    const filtered = category ? localLessons.filter((l) => l.category === category) : localLessons;

    return filtered.map((lesson) => {
      const examsForLesson = localExams.filter((e) => e.lesson_id === lesson.id);
      return {
        ...lesson,
        exams_count: examsForLesson.length,
        exams: examsForLesson
      };
    });
  },

  /**
   * Create a new lesson
   */
  async createLesson(
    category: ExamCategory,
    title: string,
    description?: string,
    orderIndex?: number
  ): Promise<Lesson> {
    const lessonId = crypto.randomUUID ? crypto.randomUUID() : `lesson-${Date.now()}`;
    const newLesson: Lesson = {
      id: lessonId,
      category,
      title: title.trim(),
      description: description?.trim() || null,
      order_index: orderIndex ?? 0,
      created_at: new Date().toISOString(),
      exams: [],
      exams_count: 0
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .insert({
            id: lessonId,
            category,
            title: title.trim(),
            description: description?.trim() || null,
            order_index: orderIndex ?? 0
          })
          .select('*')
          .single();

        if (!error && data) {
          return { ...data, exams: [], exams_count: 0 };
        }
      } catch (err) {
        console.warn('Supabase createLesson error, using local fallback:', err);
      }
    }

    const currentLessons = getLocalLessons();
    currentLessons.push(newLesson);
    saveLocalLessons(currentLessons);
    return newLesson;
  },

  /**
   * Delete a lesson
   */
  async deleteLesson(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('lessons').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase deleteLesson error:', err);
      }
    }
    const current = getLocalLessons().filter((l) => l.id !== id);
    saveLocalLessons(current);
    return true;
  },

  /**
   * Fetch all exams with their question counts
   */
  async getExams(category?: ExamCategory): Promise<Exam[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*, questions(count), lessons(id, title, category)')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const list: Exam[] = data.map((item: any) => ({
            id: item.id,
            lesson_id: item.lesson_id,
            title: item.title,
            description: item.description,
            time_limit: item.time_limit,
            shuffle_questions: item.shuffle_questions,
            shuffle_options: item.shuffle_options,
            created_at: item.created_at,
            questions_count: item.questions ? item.questions[0]?.count ?? 0 : 0,
            lesson: item.lessons ? {
              id: item.lessons.id,
              title: item.lessons.title,
              category: item.lessons.category,
              description: null
            } : null
          }));

          if (category) {
            return list.filter((e) => e.lesson?.category === category);
          }
          return list;
        } else if (error) {
          console.warn('Supabase getExams error, falling back to local storage:', error.message);
        }
      } catch (err) {
        console.warn('Network error connecting to Supabase:', err);
      }
    }

    // Fallback to local
    const localLessons = getLocalLessons();
    const exams = getLocalExams().map((e) => {
      const l = localLessons.find((les) => les.id === e.lesson_id);
      return {
        ...e,
        lesson: l || null
      };
    });

    if (category) {
      return exams.filter((e) => e.lesson?.category === category);
    }
    return exams;
  },

  /**
   * Fetch a single exam and its questions by ID
   */
  async getExamById(id: string): Promise<{ exam: Exam; questions: Question[] } | null> {
    if (isSupabaseConfigured()) {
      try {
        const [examRes, questionsRes] = await Promise.all([
          supabase.from('exams').select('*, lessons(id, title, category)').eq('id', id).single(),
          supabase.from('questions').select('*').eq('exam_id', id).order('order_index', { ascending: true })
        ]);

        if (!examRes.error && examRes.data && !questionsRes.error && questionsRes.data) {
          const examData = examRes.data;
          return {
            exam: {
              id: examData.id,
              lesson_id: examData.lesson_id,
              title: examData.title,
              description: examData.description,
              time_limit: examData.time_limit,
              shuffle_questions: examData.shuffle_questions,
              shuffle_options: examData.shuffle_options,
              created_at: examData.created_at,
              questions_count: questionsRes.data.length,
              lesson: examData.lessons ? {
                id: examData.lessons.id,
                title: examData.lessons.title,
                category: examData.lessons.category,
                description: null
              } : null
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
    const localLessons = getLocalLessons();
    const exam = localExams.find((e) => e.id === id);
    if (!exam) return null;

    const lesson = localLessons.find((l) => l.id === exam.lesson_id) || null;
    const questions = getLocalQuestions(id);
    return {
      exam: { ...exam, lesson, questions_count: questions.length },
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
    shuffleOptions: boolean = false,
    lessonId?: string | null
  ): Promise<string> {
    const examId = crypto.randomUUID ? crypto.randomUUID() : `exam-${Date.now()}`;

    if (isSupabaseConfigured()) {
      try {
        // Insert exam
        const { data: examData, error: examError } = await supabase
          .from('exams')
          .insert({
            id: examId,
            lesson_id: lessonId || null,
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
      lesson_id: lessonId || null,
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
  },

  /**
   * Update an existing exam and its questions
   */
  async updateExam(
    id: string,
    title: string,
    description: string,
    timeLimitSeconds: number | null,
    rawQuestions: RawQuestionInput[],
    shuffleQuestions: boolean = false,
    shuffleOptions: boolean = false,
    lessonId?: string | null
  ): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        // 1. Update exams row
        const { error: examError } = await supabase
          .from('exams')
          .update({
            lesson_id: lessonId || null,
            title,
            description: description || null,
            time_limit: timeLimitSeconds,
            shuffle_questions: shuffleQuestions,
            shuffle_options: shuffleOptions
          })
          .eq('id', id);

        if (!examError) {
          // 2. Delete old questions and insert new ones
          await supabase.from('questions').delete().eq('exam_id', id);

          const questionsPayload = rawQuestions.map((q, idx) => ({
            exam_id: id,
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
            return true;
          } else {
            console.error('Failed to update questions in Supabase:', questionsError);
          }
        } else {
          console.error('Failed to update exam in Supabase:', examError);
        }
      } catch (err) {
        console.warn('Supabase updateExam error, falling back to local storage:', err);
      }
    }

    // Local fallback
    const currentExams = getLocalExams();
    const idx = currentExams.findIndex((e) => e.id === id);
    if (idx !== -1) {
      currentExams[idx] = {
        ...currentExams[idx],
        lesson_id: lessonId !== undefined ? lessonId : currentExams[idx].lesson_id,
        title,
        description: description || null,
        time_limit: timeLimitSeconds,
        shuffle_questions: shuffleQuestions,
        shuffle_options: shuffleOptions,
        questions_count: rawQuestions.length
      };
      saveLocalExams(currentExams);
    }

    const newQuestions: Question[] = rawQuestions.map((q, qIdx) => ({
      id: `q-${id}-${qIdx + 1}`,
      exam_id: id,
      question: q.question,
      option_a: q.options[0] || '',
      option_b: q.options[1] || '',
      option_c: q.options[2] || '',
      option_d: q.options[3] || '',
      correct_answer: q.answer,
      explanation: q.explanation || null,
      order_index: qIdx + 1
    }));
    saveLocalQuestions(id, newQuestions);

    return true;
  },

  /**
   * Get all exam results (for history)
   */
  async getAllResults(): Promise<ExamResult[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('exam_results')
          .select('*, exams(title)')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map((item: any) => ({
            id: item.id,
            exam_id: item.exam_id,
            score: item.score,
            total: item.total,
            percentage: item.percentage,
            time_spent: item.time_spent,
            answers: item.answers,
            created_at: item.created_at,
            exam_title: item.exams?.title || 'Bài thi JLPT'
          }));
        }
      } catch (err) {
        console.warn('Supabase getAllResults error:', err);
      }
    }

    return getLocalResults();
  },

  /**
   * Delete an exam result
   */
  async deleteResult(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('exam_results').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase deleteResult error:', err);
      }
    }

    const currentResults = getLocalResults().filter((r) => r.id !== id);
    try {
      localStorage.setItem(LOCAL_STORAGE_RESULTS_KEY, JSON.stringify(currentResults));
    } catch {
      // ignore
    }
    return true;
  }
};
