import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  HelpCircle,
  Play,
  ArrowLeft,
  ArrowRight,
  Send,
  AlertTriangle,
  CheckCircle2,
  Zap,
  BookMarked
} from 'lucide-react';
import { QuestionCard } from '../components/QuestionCard';
import { Timer } from '../components/Timer';
import { JapanesePassageReader } from '../components/JapanesePassageReader';
import { JapaneseListeningPlayer } from '../components/JapaneseListeningPlayer';
import { examService } from '../lib/examService';
import { checkFillBlankAnswer } from '../lib/japaneseUtils';
import type { Exam, Question, UserAnswerReview } from '../types/exam';

interface ShuffledQuestion {
  question: Question;
  displayedOptions: string[];
  displayedCorrectIndex: number;
}

export const ExamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [exam, setExam] = useState<Exam | null>(null);
  const [originalQuestions, setOriginalQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Test session state
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({}); // index -> selected option index
  const [userTextAnswers, setUserTextAnswers] = useState<Record<number, string>>({}); // index -> user typed answer for fill_blank
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [showTimeUpBanner, setShowTimeUpBanner] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'back' | undefined>(undefined);

  // Shuffled options / questions configuration
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleOptions, setShuffleOptions] = useState(false);

  // Auto-advance timer ref
  const autoAdvanceTimerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  // Load Exam
  useEffect(() => {
    if (!id) return;
    const fetchExam = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await examService.getExamById(id);
        if (!res || !res.exam) {
          setError('Không tìm thấy bài kiểm tra này.');
        } else {
          setExam(res.exam);
          setOriginalQuestions(res.questions);
          setShuffleQuestions(Boolean(res.exam.shuffle_questions));
          setShuffleOptions(Boolean(res.exam.shuffle_options));
        }
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải bài kiểm tra.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  // Fisher-Yates shuffle
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Prepare questions for session
  const sessionQuestions: ShuffledQuestion[] = useMemo(() => {
    if (originalQuestions.length === 0) return [];

    let qList = [...originalQuestions];
    if (shuffleQuestions) {
      qList = shuffleArray(qList);
    }

    return qList.map((q) => {
      const originalOptions = [q.option_a, q.option_b, q.option_c, q.option_d];

      if (!shuffleOptions) {
        return {
          question: q,
          displayedOptions: originalOptions,
          displayedCorrectIndex: q.correct_answer
        };
      }

      const indexedOptions = originalOptions.map((text, idx) => ({ text, originalIdx: idx }));
      const shuffled = shuffleArray(indexedOptions);
      const displayedCorrectIndex = shuffled.findIndex((item) => item.originalIdx === q.correct_answer);

      return {
        question: q,
        displayedOptions: shuffled.map((item) => item.text),
        displayedCorrectIndex
      };
    });
  }, [originalQuestions, hasStarted, shuffleQuestions, shuffleOptions]);

  // Start test action
  const handleStartTest = () => {
    setHasStarted(true);
    setCurrentIndex(0);
    setUserAnswers({});
    setUserTextAnswers({});
    setStartTime(Date.now());
  };

  // Submit test action
  const handleSubmitExam = useCallback(async () => {
    if (!exam || isSubmitting) return;

    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }

    setIsSubmitting(true);
    const total = sessionQuestions.length;
    let score = 0;

    const answerReviews: UserAnswerReview[] = sessionQuestions.map((sq, idx) => {
      const qType = sq.question.question_type || 'multiple_choice';
      let isCorrect = false;
      let userSelected: number | null = null;
      let userTextAnswer: string | undefined = undefined;
      let correctTextAnswer: string | undefined = undefined;

      if (qType === 'fill_blank') {
        userTextAnswer = (userTextAnswers[idx] || '').trim();
        const acceptable: string[] = [];
        if (sq.question.answer_text) acceptable.push(sq.question.answer_text.trim());
        sq.displayedOptions.forEach((opt) => {
          if (opt && opt.trim()) acceptable.push(opt.trim());
        });
        if (acceptable.length === 0 && sq.question.correct_answer !== undefined && sq.displayedOptions[sq.question.correct_answer]) {
          acceptable.push(sq.displayedOptions[sq.question.correct_answer].trim());
        }
        correctTextAnswer = sq.question.answer_text || acceptable[0] || '';
        isCorrect = checkFillBlankAnswer(userTextAnswer, acceptable.length > 0 ? acceptable : [correctTextAnswer]);
        if (isCorrect) score += 1;
      } else {
        userSelected = userAnswers[idx] !== undefined ? userAnswers[idx] : null;
        isCorrect = userSelected === sq.displayedCorrectIndex;
        if (isCorrect) score += 1;
      }

      return {
        questionId: sq.question.id,
        question: sq.question.question,
        questionType: sq.question.question_type,
        options: sq.displayedOptions,
        userAnswer: userSelected,
        correctAnswer: sq.displayedCorrectIndex,
        userTextAnswer,
        correctTextAnswer,
        isCorrect,
        explanation: sq.question.explanation
      };
    });

    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const elapsed = Math.round((Date.now() - startTime) / 1000);

    try {
      const resultId = await examService.saveResult({
        examId: exam.id,
        score,
        total,
        percentage,
        timeSpent: elapsed,
        answers: answerReviews,
        examTitle: exam.title,
        passage: exam.passage,
        passage_translation: exam.passage_translation,
        audio_url: exam.audio_url,
        category: exam.lesson?.category,
        level: exam.level
      });

      navigate(`/result/${resultId}`, {
        state: {
          result: {
            id: resultId,
            exam_id: exam.id,
            exam_title: exam.title,
            score,
            total,
            percentage,
            time_spent: elapsed,
            answers: answerReviews,
            created_at: new Date().toISOString(),
            passage: exam.passage,
            passage_translation: exam.passage_translation,
            audio_url: exam.audio_url,
            category: exam.lesson?.category,
            level: exam.level
          }
        }
      });
    } catch (err) {
      console.error('Failed to submit:', err);
      alert('Đã xảy ra lỗi khi nộp bài. Vui lòng thử lại.');
      setIsSubmitting(false);
    }
  }, [exam, isSubmitting, sessionQuestions, userAnswers, userTextAnswers, startTime, navigate]);

  // Auto-submit on time up
  const handleTimeUp = useCallback(() => {
    setShowTimeUpBanner(true);
    handleSubmitExam();
  }, [handleSubmitExam]);

  // Selection with Auto Advance (Smooth 300ms transition)
  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));

    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }

    // Auto advance to next question after 300ms delay so user visually sees selection
    if (currentIndex < sessionQuestions.length - 1) {
      autoAdvanceTimerRef.current = setTimeout(() => {
        setSlideDirection('forward');
        setCurrentIndex((prev) => Math.min(sessionQuestions.length - 1, prev + 1));
      }, 300);
    }
  };

  const handleTextAnswerChange = (text: string) => {
    setUserTextAnswers((prev) => ({
      ...prev,
      [currentIndex]: text
    }));
  };

  const handleSubmitTextAnswer = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setSlideDirection('forward');
      setCurrentIndex((prev) => Math.min(sessionQuestions.length - 1, prev + 1));
    }
  };

  // Formatting helper
  const formatMinutes = (seconds: number | null) => {
    if (!seconds || seconds <= 0) return 'Không giới hạn';
    const mins = Math.floor(seconds / 60);
    return `${mins} phút`;
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-[3px] border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm">Đang tải thông tin bài kiểm tra...</p>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy bài thi</h2>
        <p className="text-gray-500 text-sm mb-6">{error || 'Bài thi không tồn tại hoặc đã bị xóa.'}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 1: Exam Detail / Welcome Screen before starting
  // -------------------------------------------------------------
  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto px-3.5 sm:px-6 py-8 sm:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Danh sách đề thi</span>
        </Link>

        <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-10 shadow-xs">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {exam.passage ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <BookMarked className="w-3.5 h-3.5" />
                  <span>Chuyên đề: Đọc hiểu (読解)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                  JLPT Test Mode
                </span>
              )}

              {exam.level && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gray-900 text-white">
                  Cấp độ {exam.level}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 leading-snug">
              {exam.title}
            </h1>
            {exam.description && (
              <p className="text-gray-600 text-xs sm:text-base mt-2 leading-relaxed">
                {exam.description}
              </p>
            )}

            {exam.passage && (
              <div className="mt-3.5 p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl text-xs sm:text-sm text-indigo-900 leading-relaxed">
                <p className="font-bold flex items-center gap-1.5 mb-1 text-indigo-950">
                  <BookMarked className="w-4 h-4 text-indigo-600" />
                  <span>Cấu trúc bài thi Đọc hiểu:</span>
                </p>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-indigo-800">
                  <li>Đoạn văn đọc hiểu (~500 từ) hiển thị song song khi làm bài.</li>
                  <li>Bao gồm câu hỏi điền vào chỗ trống và câu hỏi chọn đáp án tương ứng.</li>
                  <li>Hỗ trợ xem bản dịch tiếng Việt và phóng to chữ trong phòng thi.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 py-5 border-y border-gray-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-gray-500">Số lượng</p>
                <p className="text-sm sm:text-lg font-bold text-gray-900">
                  {originalQuestions.length} câu
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-gray-500">Thời gian</p>
                <p className="text-sm sm:text-lg font-bold text-gray-900">
                  {formatMinutes(exam.time_limit)}
                </p>
              </div>
            </div>
          </div>

          {/* Test Preferences */}
          <div className="space-y-3 mb-6 sm:mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
            <p className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
              Tùy chọn lần thi này:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={shuffleQuestions}
                  onChange={(e) => setShuffleQuestions(e.target.checked)}
                  className="rounded text-gray-900 focus:ring-gray-900"
                />
                <span>Xáo trộn câu hỏi</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={shuffleOptions}
                  onChange={(e) => setShuffleOptions(e.target.checked)}
                  className="rounded text-gray-900 focus:ring-gray-900"
                />
                <span>Xáo trộn đáp án</span>
              </label>
            </div>
          </div>

          {/* Start Test Action */}
          <button
            type="button"
            onClick={handleStartTest}
            className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-sm sm:text-base transition-all shadow-sm active:scale-98 cursor-pointer"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span>Bắt đầu làm bài (Start Test)</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: Active Test Taking Mode (Responsive Reading Mode)
  // -------------------------------------------------------------
  const currentQuestionData = sessionQuestions[currentIndex];
  const total = sessionQuestions.length;

  const isQuestionAnswered = (idx: number) => {
    const sq = sessionQuestions[idx];
    if (!sq) return false;
    if (sq.question.question_type === 'fill_blank') {
      return Boolean(userTextAnswers[idx]?.trim());
    }
    return userAnswers[idx] !== undefined;
  };

  const answeredCount = sessionQuestions.filter((_, idx) => isQuestionAnswered(idx)).length;
  const progressPercent = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  const isListening = exam.lesson?.category === 'listening' || Boolean(exam.audio_url);

  const renderPassagePanel = (isMobile: boolean = false) => {
    if (!exam.passage) return null;

    if (isListening) {
      return (
        <div className={isMobile ? 'mb-4' : 'sticky top-4'}>
          <JapaneseListeningPlayer
            audioUrl={exam.audio_url}
            scriptText={exam.passage}
            scriptTranslation={exam.passage_translation}
            level={exam.level}
            examTitle={exam.title}
          />
        </div>
      );
    }

    return (
      <div className={isMobile ? 'mb-4' : 'sticky top-4'}>
        <JapanesePassageReader
          passage={exam.passage}
          translation={exam.passage_translation}
          level={exam.level}
          currentQuestionIndex={currentIndex}
          onSelectQuestion={(targetIdx) => {
            if (targetIdx >= 0 && targetIdx < sessionQuestions.length) {
              setCurrentIndex(targetIdx);
            }
          }}
          isMobile={isMobile}
        />
      </div>
    );
  };

  const hasMediaPanel = Boolean(exam.passage || exam.audio_url);

  return (
    <div className={`mx-auto px-3 sm:px-6 py-4 sm:py-8 ${hasMediaPanel ? 'max-w-6xl' : 'max-w-3xl'}`}>
      {/* Mobile-only passage/audio accordion (hidden on lg screens) */}
      {hasMediaPanel && (
        <div className="lg:hidden">
          {renderPassagePanel(true)}
        </div>
      )}

      <div className={hasMediaPanel ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start' : ''}>
        {/* Desktop-only Left Column: Sticky Passage/Audio Panel */}
        {hasMediaPanel && (
          <div className="hidden lg:block lg:col-span-6 xl:col-span-6">
            {renderPassagePanel(false)}
          </div>
        )}

        {/* Questions Panel */}
        <div className={hasMediaPanel ? 'lg:col-span-6 xl:col-span-6' : ''}>
          {/* Top Test Header */}
          <div className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-4 mb-4 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                    {exam.title}
                  </h1>
                  {exam.level && (
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded flex-shrink-0">
                      {exam.level}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-gray-500">
                    Đã làm: <strong className="text-gray-900 font-bold">{answeredCount}</strong>/{total}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                    <Zap className="w-2.5 h-2.5 text-amber-600" />
                    Auto
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {exam.time_limit && exam.time_limit > 0 && (
                  <Timer
                    initialSeconds={exam.time_limit}
                    onTimeUp={handleTimeUp}
                  />
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (answeredCount < total) {
                      setShowSubmitConfirm(true);
                    } else {
                      handleSubmitExam();
                    }
                  }}
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-900 text-white hover:bg-black transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>{isSubmitting ? '...' : 'Nộp'}</span>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gray-900 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Time-up notification banner */}
          {showTimeUpBanner && (
            <div className="mb-4 p-3.5 bg-amber-50 border border-amber-300 rounded-2xl flex items-center gap-3 text-amber-900 text-xs sm:text-sm font-medium shadow-xs">
              <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Hết giờ làm bài! Đang tự động nộp bài kiểm tra...</span>
            </div>
          )}

          {/* Submit confirm inline banner */}
          {showSubmitConfirm && (
            <div className="mb-4 p-4 bg-gray-50 border border-gray-300 rounded-2xl shadow-xs">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Bạn còn <strong className="text-rose-600">{total - answeredCount}</strong> câu chưa trả lời.
              </p>
              <p className="text-xs text-gray-500 mb-3">Bạn có chắc muốn nộp bài ngay bây giờ không?</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setShowSubmitConfirm(false); handleSubmitExam(); }}
                  className="flex-1 py-2 px-3 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                >
                  Nộp bài ngay
                </button>
                <button
                  type="button"
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 py-2 px-3 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Làm tiếp
                </button>
              </div>
            </div>
          )}

          {/* Current Question Card */}
          {currentQuestionData && (
            <QuestionCard
              key={currentIndex}
              questionNumber={currentIndex + 1}
              totalQuestions={total}
              questionText={currentQuestionData.question.question}
              options={currentQuestionData.displayedOptions}
              selectedAnswer={userAnswers[currentIndex] !== undefined ? userAnswers[currentIndex] : null}
              onSelectAnswer={handleSelectOption}
              questionType={currentQuestionData.question.question_type}
              slideDirection={slideDirection}
              textAnswer={userTextAnswers[currentIndex] || ''}
              onTextAnswerChange={handleTextAnswerChange}
              onSubmitTextAnswer={handleSubmitTextAnswer}
            />
          )}

          {/* Previous / Next Actions (Thumb friendly on mobile) */}
          <div className="flex items-center justify-between gap-3 mt-4 sm:mt-6">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => {
                if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
                setSlideDirection('back');
                setCurrentIndex((prev) => Math.max(0, prev - 1));
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed active:scale-98 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Trước</span>
            </button>

            <span className="text-xs text-gray-500 font-mono font-medium px-2 flex-shrink-0">
              {currentIndex + 1} / {total}
            </span>

            {currentIndex < total - 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
                  setSlideDirection('forward');
                  setCurrentIndex((prev) => Math.min(total - 1, prev + 1));
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors active:scale-98 cursor-pointer"
              >
                <span>Tiếp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitExam}
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 rounded-xl bg-gray-900 text-white text-xs sm:text-sm font-bold hover:bg-black transition-all shadow-xs active:scale-98 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Nộp bài</span>
              </button>
            )}
          </div>
        </div>

        {/* Sidebar: Question Matrix Palette */}
        <div className="lg:w-80">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs lg:sticky lg:top-20">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Bảng câu hỏi ({answeredCount}/{total})
              </span>
              <span className="text-[11px] text-gray-400">
                {Math.round(progressPercent)}%
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {sessionQuestions.map((sq, idx) => {
                const isAnswered = isQuestionAnswered(idx);
                const isCurrent = idx === currentIndex;

                let badgeStyle = 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:bg-gray-50';
                if (isCurrent && isAnswered) {
                  badgeStyle = 'bg-gray-900 text-white border-gray-900 ring-2 ring-gray-900 ring-offset-2 font-bold shadow-sm';
                } else if (isCurrent && !isAnswered) {
                  badgeStyle = 'bg-white text-gray-900 border-2 border-gray-900 ring-2 ring-gray-900/20 font-bold';
                } else if (isAnswered) {
                  badgeStyle = 'bg-gray-900 text-white border-gray-900 font-bold shadow-xs';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
                      setSlideDirection(idx > currentIndex ? 'forward' : 'back');
                      setCurrentIndex(idx);
                    }}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border text-xs flex items-center justify-center transition-all cursor-pointer ${badgeStyle}`}
                    title={`Câu ${idx + 1}${sq.question.question_type === 'fill_blank' ? ' (Điền từ)' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
