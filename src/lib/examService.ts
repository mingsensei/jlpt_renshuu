import { supabase, isSupabaseConfigured } from './supabase';
import type { Exam, Question, RawQuestionInput, ExamResult, UserAnswerReview, Lesson, ExamCategory, JLPTLevel } from '../types/exam';
import { DEMO_EXAMS, DEMO_QUESTIONS, DEMO_LESSONS } from '../data/sampleExams';

const LOCAL_STORAGE_LESSONS_KEY = 'jlpt_local_lessons';
const LOCAL_STORAGE_EXAMS_KEY = 'jlpt_local_exams';
const LOCAL_STORAGE_QUESTIONS_KEY = 'jlpt_local_questions';
const LOCAL_STORAGE_RESULTS_KEY = 'jlpt_local_results';

const READING_META_PREFIX = '<!-- READING_META:';
const READING_META_SUFFIX = '-->';

export function packReadingMetadata(
  description: string | null | undefined,
  meta: {
    passage?: string | null;
    passage_translation?: string | null;
    level?: JLPTLevel | null;
  }
): string {
  const cleanDesc = description ? description.replace(/<!-- READING_META:[\s\S]*?-->\n?/g, '').trim() : '';
  if (!meta.passage && !meta.passage_translation && !meta.level) {
    return cleanDesc;
  }
  const json = JSON.stringify({
    passage: meta.passage || null,
    passage_translation: meta.passage_translation || null,
    level: meta.level || null
  });
  return `${READING_META_PREFIX}${json}${READING_META_SUFFIX}\n${cleanDesc}`;
}

export function unpackReadingMetadata(exam: any): {
  description: string | null;
  passage: string | null;
  passage_translation: string | null;
  level: JLPTLevel | null;
} {
  let passage = exam.passage || null;
  let passage_translation = exam.passage_translation || null;
  let level = exam.level || null;
  let desc = exam.description || null;

  if (desc && desc.includes(READING_META_PREFIX)) {
    try {
      const match = desc.match(/<!-- READING_META:([\s\S]*?)-->/);
      if (match && match[1]) {
        const meta = JSON.parse(match[1]);
        if (!passage && meta.passage) passage = meta.passage;
        if (!passage_translation && meta.passage_translation) passage_translation = meta.passage_translation;
        if (!level && meta.level) level = meta.level;
        desc = desc.replace(/<!-- READING_META:[\s\S]*?-->\n?/, '').trim() || null;
      }
    } catch (e) {
      console.warn('Failed to parse reading metadata from description:', e);
    }
  }

  return { description: desc, passage, passage_translation, level };
}

function getLocalLessons(): Lesson[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_LESSONS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_LESSONS_KEY, JSON.stringify(DEMO_LESSONS));
      return DEMO_LESSONS;
    }
    const parsed: Lesson[] = JSON.parse(raw);
    let updated = false;
    DEMO_LESSONS.forEach((dl) => {
      if (!parsed.some((l) => l.id === dl.id)) {
        parsed.push(dl);
        updated = true;
      }
    });
    if (updated) {
      localStorage.setItem(LOCAL_STORAGE_LESSONS_KEY, JSON.stringify(parsed));
    }
    return parsed;
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
    const parsed: Exam[] = JSON.parse(raw);
    let updated = false;
    DEMO_EXAMS.forEach((de) => {
      if (!parsed.some((e) => e.id === de.id)) {
        parsed.unshift(de);
        updated = true;
      }
    });
    if (updated) {
      localStorage.setItem(LOCAL_STORAGE_EXAMS_KEY, JSON.stringify(parsed));
    }
    return parsed;
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
    const map: Record<string, Question[]> = raw ? JSON.parse(raw) : { ...DEMO_QUESTIONS };
    if (!map[examId] && DEMO_QUESTIONS[examId]) {
      map[examId] = DEMO_QUESTIONS[examId];
      localStorage.setItem(LOCAL_STORAGE_QUESTIONS_KEY, JSON.stringify(map));
    }
    return map[examId] || DEMO_QUESTIONS[examId] || [];
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
            level: item.level || null,
            order_index: item.order_index,
            created_at: item.created_at,
            exams_count: item.exams ? item.exams.length : 0,
            exams: item.exams
              ? item.exams
                  .map((e: any) => {
                    const meta = unpackReadingMetadata(e);
                    return {
                      id: e.id,
                      lesson_id: e.lesson_id,
                      title: e.title,
                      description: meta.description,
                      passage: meta.passage,
                      passage_translation: meta.passage_translation,
                      level: meta.level,
                      time_limit: e.time_limit,
                      shuffle_questions: e.shuffle_questions,
                      shuffle_options: e.shuffle_options,
                      created_at: e.created_at,
                      questions_count: e.questions ? e.questions[0]?.count ?? 0 : 0
                    };
                  })
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
   * Create a lesson (if reading, creates single lesson; if vocab/kanji/grammar, syncs across 3 categories)
   */
  async createLesson(
    category: ExamCategory,
    title: string,
    description?: string,
    orderIndex?: number,
    level?: JLPTLevel
  ): Promise<Lesson> {
    if (category === 'reading') {
      const payload: any = {
        id: crypto.randomUUID ? crypto.randomUUID() : `lesson-reading-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        category: 'reading',
        title: title.trim(),
        description: description?.trim() || null,
        order_index: orderIndex ?? 1
      };
      if (level) payload.level = level;

      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from('lessons')
            .insert(payload)
            .select('*')
            .single();

          if (!error && data) {
            return { ...data, level: data.level || level || null, exams: [], exams_count: 0 };
          } else if (error) {
            console.warn('Supabase create reading lesson error, using local fallback:', error.message);
          }
        } catch (err) {
          console.warn('Supabase create reading lesson error:', err);
        }
      }

      const currentLessons = getLocalLessons();
      const newL: Lesson = {
        ...payload,
        level: level || null,
        created_at: new Date().toISOString(),
        exams: [],
        exams_count: 0
      };
      currentLessons.push(newL);
      saveLocalLessons(currentLessons);
      return newL;
    }

    const created = await this.createLessonForAllCategories(title, description, orderIndex);
    return created.find((l) => l.category === category) || created[0];
  },

  /**
   * Create lesson across all 3 non-reading categories simultaneously
   */
  async createLessonForAllCategories(
    title: string,
    description?: string,
    orderIndex?: number
  ): Promise<Lesson[]> {
    const categories: ExamCategory[] = ['vocabulary', 'kanji', 'grammar'];
    const payloads = categories.map((cat) => ({
      id: crypto.randomUUID ? crypto.randomUUID() : `lesson-${cat}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      category: cat,
      title: title.trim(),
      description: description?.trim() || null,
      order_index: orderIndex ?? 1
    }));

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .insert(payloads)
          .select('*');

        if (!error && data) {
          return data.map((d: any) => ({ ...d, exams: [], exams_count: 0 }));
        } else if (error) {
          console.warn('Supabase createLessonForAllCategories error, using local fallback:', error.message);
        }
      } catch (err) {
        console.warn('Supabase createLessonForAllCategories error:', err);
      }
    }

    const currentLessons = getLocalLessons();
    const createdList: Lesson[] = [];
    payloads.forEach((p) => {
      const l: Lesson = {
        ...p,
        created_at: new Date().toISOString(),
        exams: [],
        exams_count: 0
      };
      currentLessons.push(l);
      createdList.push(l);
    });
    saveLocalLessons(currentLessons);
    return createdList;
  },

  /**
   * Update a lesson
   */
  async updateLesson(
    id: string,
    updates: {
      title?: string;
      description?: string;
      order_index?: number;
      category?: ExamCategory;
      level?: JLPTLevel;
    }
  ): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const payload: any = {};
        if (updates.title !== undefined) payload.title = updates.title.trim();
        if (updates.description !== undefined) payload.description = updates.description.trim() || null;
        if (updates.order_index !== undefined) payload.order_index = updates.order_index;
        if (updates.category !== undefined) payload.category = updates.category;
        if (updates.level !== undefined) payload.level = updates.level;

        const { error } = await supabase
          .from('lessons')
          .update(payload)
          .eq('id', id);

        if (!error) return true;
      } catch (err) {
        console.warn('Supabase updateLesson error:', err);
      }
    }

    const currentLessons = getLocalLessons();
    const idx = currentLessons.findIndex((l) => l.id === id);
    if (idx !== -1) {
      currentLessons[idx] = {
        ...currentLessons[idx],
        ...(updates.title !== undefined ? { title: updates.title.trim() } : {}),
        ...(updates.description !== undefined ? { description: updates.description.trim() || null } : {}),
        ...(updates.order_index !== undefined ? { order_index: updates.order_index } : {}),
        ...(updates.category !== undefined ? { category: updates.category } : {}),
        ...(updates.level !== undefined ? { level: updates.level } : {})
      };
      saveLocalLessons(currentLessons);
    }
    return true;
  },

  /**
   * Delete a lesson
   */
  async deleteLesson(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        // Unlink exams belonging to this lesson
        await supabase.from('exams').update({ lesson_id: null }).eq('lesson_id', id);
        const { error } = await supabase.from('lessons').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase deleteLesson error:', err);
      }
    }

    const current = getLocalLessons().filter((l) => l.id !== id);
    saveLocalLessons(current);

    // Unlink in local exams
    const localExams = getLocalExams();
    let changed = false;
    localExams.forEach((e) => {
      if (e.lesson_id === id) {
        e.lesson_id = null;
        changed = true;
      }
    });
    if (changed) saveLocalExams(localExams);

    return true;
  },

  /**
   * Delete multiple lessons by id (e.g. across categories)
   */
  async deleteLessons(ids: string[]): Promise<boolean> {
    if (ids.length === 0) return true;
    for (const id of ids) {
      await this.deleteLesson(id);
    }
    return true;
  },

  /**
   * Update all lessons with the same title across categories
   */
  async updateLessonAcrossCategories(
    oldTitle: string,
    updates: {
      title?: string;
      description?: string;
      order_index?: number;
    }
  ): Promise<boolean> {
    const all = await this.getLessons();
    const matching = all.filter((l) => l.title.trim().toLowerCase() === oldTitle.trim().toLowerCase());
    for (const lesson of matching) {
      await this.updateLesson(lesson.id, updates);
    }
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
          .select('*, questions(count), lessons(id, title, category, level)')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const list: Exam[] = data.map((item: any) => {
            const meta = unpackReadingMetadata(item);
            return {
              id: item.id,
              lesson_id: item.lesson_id,
              title: item.title,
              description: meta.description,
              passage: meta.passage,
              passage_translation: meta.passage_translation,
              level: meta.level || (item.lessons ? item.lessons.level : null),
              time_limit: item.time_limit,
              shuffle_questions: item.shuffle_questions,
              shuffle_options: item.shuffle_options,
              created_at: item.created_at,
              questions_count: item.questions ? item.questions[0]?.count ?? 0 : 0,
              lesson: item.lessons ? {
                id: item.lessons.id,
                title: item.lessons.title,
                category: item.lessons.category,
                level: item.lessons.level || null,
                description: null
              } : null
            };
          });

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
        level: e.level || (l ? l.level : null),
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
          supabase.from('exams').select('*, lessons(id, title, category, level)').eq('id', id).single(),
          supabase.from('questions').select('*').eq('exam_id', id).order('order_index', { ascending: true })
        ]);

        if (!examRes.error && examRes.data && !questionsRes.error && questionsRes.data) {
          const examData = examRes.data;
          const meta = unpackReadingMetadata(examData);

          return {
            exam: {
              id: examData.id,
              lesson_id: examData.lesson_id,
              title: examData.title,
              description: meta.description,
              passage: meta.passage,
              passage_translation: meta.passage_translation,
              level: meta.level || (examData.lessons ? examData.lessons.level : null),
              time_limit: examData.time_limit,
              shuffle_questions: examData.shuffle_questions,
              shuffle_options: examData.shuffle_options,
              created_at: examData.created_at,
              questions_count: questionsRes.data.length,
              lesson: examData.lessons ? {
                id: examData.lessons.id,
                title: examData.lessons.title,
                category: examData.lessons.category,
                level: examData.lessons.level || null,
                description: null
              } : null
            },
            questions: questionsRes.data.map((q: any) => ({
              ...q,
              question_type: q.question_type || (q.question?.includes('（') || q.question?.includes('(') ? 'fill_blank' : 'multiple_choice')
            }))
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
      exam: {
        ...exam,
        level: exam.level || (lesson ? lesson.level : null),
        lesson,
        questions_count: questions.length
      },
      questions
    };
  },

  /**
   * Create a new exam with parsed questions and reading options
   */
  async createExam(
    title: string,
    description: string,
    timeLimitSeconds: number | null,
    rawQuestions: RawQuestionInput[],
    shuffleQuestions: boolean = false,
    shuffleOptions: boolean = false,
    lessonId?: string | null,
    readingOptions?: {
      passage?: string | null;
      passage_translation?: string | null;
      level?: JLPTLevel | null;
    }
  ): Promise<string> {
    const examId = crypto.randomUUID ? crypto.randomUUID() : `exam-${Date.now()}`;
    const packedDescription = packReadingMetadata(description, readingOptions || {});

    if (isSupabaseConfigured()) {
      try {
        const payload: any = {
          id: examId,
          lesson_id: lessonId || null,
          title,
          description: packedDescription,
          time_limit: timeLimitSeconds,
          shuffle_questions: shuffleQuestions,
          shuffle_options: shuffleOptions
        };

        if (readingOptions?.passage) payload.passage = readingOptions.passage;
        if (readingOptions?.passage_translation) payload.passage_translation = readingOptions.passage_translation;
        if (readingOptions?.level) payload.level = readingOptions.level;

        let examData: any = null;
        const res = await supabase.from('exams').insert(payload).select('id').single();
        if (!res.error && res.data) {
          examData = res.data;
        } else if (res.error) {
          // If column not found (migration not run yet), retry with packed description
          const fallbackPayload = {
            id: examId,
            lesson_id: lessonId || null,
            title,
            description: packedDescription,
            time_limit: timeLimitSeconds,
            shuffle_questions: shuffleQuestions,
            shuffle_options: shuffleOptions
          };
          const fallbackRes = await supabase.from('exams').insert(fallbackPayload).select('id').single();
          if (!fallbackRes.error && fallbackRes.data) {
            examData = fallbackRes.data;
          }
        }

        if (examData) {
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
          console.error('Failed to insert exam into Supabase');
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
      passage: readingOptions?.passage || null,
      passage_translation: readingOptions?.passage_translation || null,
      level: readingOptions?.level || null,
      created_at: new Date().toISOString(),
      questions_count: rawQuestions.length
    };

    const newQuestions: Question[] = rawQuestions.map((q, idx) => ({
      id: `q-${examId}-${idx + 1}`,
      exam_id: examId,
      question: q.question,
      question_type: q.type || 'multiple_choice',
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
    passage?: string | null;
    passage_translation?: string | null;
    level?: JLPTLevel | null;
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
      exam_title: result.examTitle,
      passage: result.passage || null,
      passage_translation: result.passage_translation || null,
      level: result.level || null
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
          .select('*, exams(title, description, time_limit)')
          .eq('id', id)
          .single();

        if (!error && data) {
          const meta = data.exams ? unpackReadingMetadata(data.exams) : { passage: null, passage_translation: null, level: null };
          return {
            id: data.id,
            exam_id: data.exam_id,
            score: data.score,
            total: data.total,
            percentage: data.percentage,
            time_spent: data.time_spent,
            answers: data.answers,
            created_at: data.created_at,
            exam_title: data.exams?.title,
            passage: meta.passage,
            passage_translation: meta.passage_translation,
            level: meta.level
          };
        }
      } catch (err) {
        console.warn('Supabase getResultById error:', err);
      }
    }

    const localResults = getLocalResults();
    const found = localResults.find((r) => r.id === id);
    if (found && !found.passage) {
      // Try to attach passage from local exam if available
      const localExams = getLocalExams();
      const matchExam = localExams.find((e) => e.id === found.exam_id);
      if (matchExam) {
        return {
          ...found,
          passage: matchExam.passage,
          passage_translation: matchExam.passage_translation,
          level: matchExam.level
        };
      }
    }
    return found || null;
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
    lessonId?: string | null,
    readingOptions?: {
      passage?: string | null;
      passage_translation?: string | null;
      level?: JLPTLevel | null;
    }
  ): Promise<boolean> {
    const packedDescription = packReadingMetadata(description, readingOptions || {});

    if (isSupabaseConfigured()) {
      try {
        // 1. Update exams row
        const updatePayload: any = {
          lesson_id: lessonId || null,
          title,
          description: packedDescription,
          time_limit: timeLimitSeconds,
          shuffle_questions: shuffleQuestions,
          shuffle_options: shuffleOptions
        };
        if (readingOptions?.passage) updatePayload.passage = readingOptions.passage;
        if (readingOptions?.passage_translation) updatePayload.passage_translation = readingOptions.passage_translation;
        if (readingOptions?.level) updatePayload.level = readingOptions.level;

        let examError: any = null;
        const res = await supabase.from('exams').update(updatePayload).eq('id', id);
        if (res.error) {
          // fallback without extra columns
          const fallbackPayload = {
            lesson_id: lessonId || null,
            title,
            description: packedDescription,
            time_limit: timeLimitSeconds,
            shuffle_questions: shuffleQuestions,
            shuffle_options: shuffleOptions
          };
          const fallbackRes = await supabase.from('exams').update(fallbackPayload).eq('id', id);
          examError = fallbackRes.error;
        }

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
        passage: readingOptions?.passage !== undefined ? readingOptions.passage : currentExams[idx].passage,
        passage_translation: readingOptions?.passage_translation !== undefined ? readingOptions.passage_translation : currentExams[idx].passage_translation,
        level: readingOptions?.level !== undefined ? readingOptions.level : currentExams[idx].level,
        questions_count: rawQuestions.length
      };
      saveLocalExams(currentExams);
    }

    const newQuestions: Question[] = rawQuestions.map((q, qIdx) => ({
      id: `q-${id}-${qIdx + 1}`,
      exam_id: id,
      question: q.question,
      question_type: q.type || 'multiple_choice',
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
