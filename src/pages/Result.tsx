import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  Trophy,
  RotateCcw,
  Home as HomeIcon,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuestionCard } from '../components/QuestionCard';
import { JapanesePassageReader } from '../components/JapanesePassageReader';
import { examService } from '../lib/examService';
import type { ExamResult } from '../types/exam';

export const Result: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  // Try reading from navigation state first
  const stateResult = (location.state as { result?: ExamResult })?.result;

  const [result, setResult] = useState<ExamResult | null>(stateResult || null);
  const [isLoading, setIsLoading] = useState(!stateResult);
  const [activeFilter, setActiveFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  useEffect(() => {
    if (result) {
      if (result.percentage >= 70) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
      return;
    }

    if (!id) return;

    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const data = await examService.getResultById(id);
        if (data) {
          setResult(data);
          if (data.percentage >= 70) {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 }
            });
          }
        }
      } catch (err) {
        console.error('Failed to load result:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [id, result]);

  const formatTimeSpent = (seconds?: number) => {
    if (!seconds || seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} phút ${secs} giây`;
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-3 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm">Đang tải kết quả bài thi...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy kết quả</h2>
        <p className="text-gray-500 text-sm mb-6">Kết quả bài thi này không tồn tại hoặc đã bị xóa.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black"
        >
          <HomeIcon className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>
      </div>
    );
  }

  const isPassed = result.percentage >= 60;
  const answers = result.answers || [];

  const wrongCount = answers.filter((a) => !a.isCorrect).length;
  const correctCount = answers.filter((a) => a.isCorrect).length;

  const filteredAnswers = answers.filter((a) => {
    if (activeFilter === 'wrong') return !a.isCorrect;
    if (activeFilter === 'correct') return a.isCorrect;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Danh sách đề thi</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/exam/${result.exam_id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </Link>
        </div>
      </div>

      {/* Score Card Banner */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-8 shadow-xs mb-8 text-center relative overflow-hidden">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-900 font-bold">
          <Trophy className="w-6 h-6 text-amber-500" />
        </div>

        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          {result.exam_title || 'Kết quả kiểm tra tiếng Nhật'}
        </p>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-3">
          Hoàn thành bài thi!
        </h1>

        {/* Big Score Display */}
        <div className="inline-flex flex-col items-center justify-center my-2 p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200 min-w-[200px]">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Score:</span>
          <span className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight font-mono">
            {result.score} / {result.total}
          </span>
          <span
            className={`mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-xs sm:text-sm font-bold ${
              isPassed
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {result.percentage}% • {isPassed ? 'ĐẠT (PASS)' : 'CHƯA ĐẠT (CẦN ÔN THÊM)'}
          </span>
        </div>

        {/* Detailed Stats Strip */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto mt-5 pt-5 border-t border-gray-100 text-center">
          <div>
            <p className="text-[11px] sm:text-xs text-gray-400">Đúng</p>
            <p className="text-base sm:text-lg font-bold text-emerald-600 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {correctCount}
            </p>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs text-gray-400">Sai</p>
            <p className="text-base sm:text-lg font-bold text-rose-600 flex items-center justify-center gap-1">
              <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {wrongCount}
            </p>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs text-gray-400">Thời gian</p>
            <p className="text-xs sm:text-base font-semibold text-gray-800 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              {result.time_spent ? formatTimeSpent(result.time_spent) : '--'}
            </p>
          </div>
        </div>
      </div>

      {/* Reading Passage Review Box */}
      {result.passage && (
        <div className="mb-8">
          <JapanesePassageReader
            passage={result.passage}
            translation={result.passage_translation}
            level={result.level}
            isReviewMode={true}
            defaultShowTranslation={false}
          />
        </div>
      )}

      {/* Question Review Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Chi tiết câu trả lời
            </h2>
            <p className="text-xs text-gray-500">
              Xem lại câu trả lời của bạn, đáp án chính xác và lời giải thích.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto text-xs font-medium">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gray-900 text-white shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tất cả ({answers.length})
            </button>
            <button
              onClick={() => setActiveFilter('wrong')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'wrong'
                  ? 'bg-rose-600 text-white shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Câu sai ({wrongCount})
            </button>
            <button
              onClick={() => setActiveFilter('correct')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Câu đúng ({correctCount})
            </button>
          </div>
        </div>

        {/* Answers List */}
        {filteredAnswers.length > 0 ? (
          <div className="space-y-4 sm:space-y-5">
            {filteredAnswers.map((item, idx) => {
              const originalIndex = answers.findIndex((a) => a.questionId === item.questionId);
              const displayNum = originalIndex >= 0 ? originalIndex + 1 : idx + 1;

              return (
                <div key={item.questionId || idx} className="space-y-2">
                  <QuestionCard
                    questionNumber={displayNum}
                    totalQuestions={answers.length}
                    questionText={item.question}
                    options={item.options}
                    selectedAnswer={item.userAnswer}
                    isReviewMode={true}
                    correctAnswer={item.correctAnswer}
                    explanation={item.explanation}
                    questionType={item.questionType}
                  />

                  {/* Explicit text recap like in prompt: あなたの答え / Correct */}
                  <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500 font-medium">あなたの答え:</span>
                      <span
                        className={`font-bold ${
                          item.isCorrect ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {item.userAnswer !== null && item.options[item.userAnswer] !== undefined
                          ? item.options[item.userAnswer]
                          : '(Chưa chọn)'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500 font-medium">Correct:</span>
                      <span className="font-bold text-emerald-700">
                        {item.options[item.correctAnswer]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-white border border-gray-200 rounded-2xl text-gray-500 text-xs sm:text-sm">
            Không có câu hỏi nào trong mục này.
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 sm:mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to={`/exam/${result.exam_id}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm lại bài thi này</span>
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gray-900 text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all shadow-xs"
        >
          <HomeIcon className="w-4 h-4" />
          <span>Xem các bài thi khác</span>
        </Link>
      </div>
    </div>
  );
};
