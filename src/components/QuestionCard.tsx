import React, { useState } from 'react';
import { CheckCircle2, XCircle, Info, Edit3 } from 'lucide-react';
import type { QuestionType } from '../types/exam';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  options: string[];
  selectedAnswer: number | null;
  onSelectAnswer?: (index: number) => void;
  // Fill-in-the-blank text props
  textAnswer?: string;
  onTextAnswerChange?: (text: string) => void;
  onSubmitTextAnswer?: () => void;
  // Review mode props (for Result / Review page)
  isReviewMode?: boolean;
  correctAnswer?: number;
  userTextAnswer?: string;
  correctTextAnswer?: string;
  isCorrect?: boolean;
  explanation?: string | null;
  questionType?: QuestionType;
  // Motion: 'forward' slides from right, 'back' slides from left, undefined = no animation
  slideDirection?: 'forward' | 'back';
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  options,
  selectedAnswer,
  onSelectAnswer,
  textAnswer,
  onTextAnswerChange,
  onSubmitTextAnswer,
  isReviewMode = false,
  correctAnswer,
  userTextAnswer,
  correctTextAnswer,
  isCorrect = false,
  explanation,
  questionType,
  slideDirection
}) => {
  const [flashedIndex, setFlashedIndex] = useState<number | null>(null);

  const isFillBlank = questionType === 'fill_blank';

  const handleSelect = (idx: number) => {
    if (!onSelectAnswer) return;
    setFlashedIndex(idx);
    // Reset after flash animation completes
    setTimeout(() => setFlashedIndex(null), 340);
    onSelectAnswer(idx);
  };

  const slideClass =
    slideDirection === 'forward' ? 'animate-slide-in-right' :
    slideDirection === 'back'    ? 'animate-slide-in-left'  : '';

  const reviewCorrect = isFillBlank ? isCorrect : selectedAnswer === correctAnswer;

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-4 sm:p-7 shadow-xs ${slideClass}`}>
      {/* Header index */}
      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-800 tracking-wide uppercase">
            Câu {questionNumber} / {totalQuestions}
          </span>
          {isFillBlank && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-900 text-white shadow-xs">
              <Edit3 className="w-3.5 h-3.5 text-white" />
              <span>Điền từ</span>
            </span>
          )}
        </div>

        {isReviewMode && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
              reviewCorrect
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {reviewCorrect ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5" /> Sai
              </>
            )}
          </span>
        )}
      </div>

      {/* Question statement */}
      <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-5 leading-snug sm:leading-relaxed whitespace-pre-wrap font-sans">
        {questionText}
      </h2>

      {/* QUESTION BODY: Fill-in-the-blank vs Multiple Choice */}
      {isFillBlank ? (
        /* Fill-in-the-blank text input */
        isReviewMode ? (
          /* Review mode: comparison between user's text and correct answer */
          <div className="space-y-3.5">
            {/* User answer card */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border flex items-start justify-between gap-3 ${
                reviewCorrect
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/70 border-rose-200 text-rose-950'
              }`}
            >
              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider block opacity-70">
                  Câu trả lời của bạn:
                </span>
                <p className="text-base sm:text-lg font-bold font-sans break-words">
                  {userTextAnswer?.trim() ? (
                    userTextAnswer
                  ) : (
                    <span className="italic text-gray-400 font-normal">(Chưa nhập câu trả lời)</span>
                  )}
                </p>
              </div>
              <div className="flex-shrink-0 mt-0.5">
                {reviewCorrect ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Chính xác
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-600 text-white">
                    <XCircle className="w-3.5 h-3.5" /> Chưa đúng
                  </span>
                )}
              </div>
            </div>

            {/* Expected correct answer card */}
            <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1.5">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Đáp án chính xác:
              </span>
              <p className="text-base sm:text-lg font-bold text-gray-900 font-sans">
                {correctTextAnswer || options[correctAnswer || 0] || options[0] || '(Không có)'}
              </p>
              {/* Alternative acceptable answers */}
              {options.filter(Boolean).length > 1 && (
                <div className="pt-2 border-t border-gray-200 text-xs text-gray-500">
                  <span>Các cách nhập được chấp nhận: </span>
                  <span className="font-semibold text-gray-800">
                    {options.filter(Boolean).join(' • ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Taking test mode: Interactive input with instant feedback */
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-700">
              Nhập câu trả lời bằng tiếng Nhật hoặc tiếng Việt:
            </label>
            <div className="relative">
              <input
                type="text"
                value={textAnswer || ''}
                onChange={(e) => onTextAnswerChange?.(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onSubmitTextAnswer?.();
                  }
                }}
                placeholder="Gõ từ cần điền vào đây (ví dụ: わたし, 先生, Xin chào...)"
                autoFocus
                className="w-full px-4 py-3.5 sm:py-4 bg-gray-50 border-2 border-gray-200 focus:border-gray-900 focus:bg-white rounded-xl text-base sm:text-lg font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 font-sans shadow-xs"
              />
              {Boolean(textAnswer) && (
                <button
                  type="button"
                  onClick={() => onTextAnswerChange?.('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 p-1 text-xs cursor-pointer"
                  title="Xóa trắng"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 flex-wrap gap-2 pt-1">
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-[11px] font-mono font-bold text-gray-700">
                  Enter
                </kbd>
                <span>hoặc nút Tiếp để lưu câu trả lời</span>
              </span>
              {Boolean(textAnswer?.trim()) && (
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Đã nhập</span>
                </span>
              )}
            </div>
          </div>
        )
      ) : (
        /* Multiple choice options */
        <div className="space-y-2.5 sm:space-y-3">
          {options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isOptCorrect = isReviewMode && correctAnswer === idx;
            const isIncorrectSelection = isReviewMode && isSelected && selectedAnswer !== correctAnswer;

            let optionStyle = 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50/60 text-gray-900';

            if (isReviewMode) {
              if (isOptCorrect) {
                optionStyle = 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-medium ring-1 ring-emerald-600';
              } else if (isIncorrectSelection) {
                optionStyle = 'border-rose-400 bg-rose-50/80 text-rose-950 line-through ring-1 ring-rose-400';
              } else {
                optionStyle = 'border-gray-200 bg-gray-50/40 text-gray-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'border-gray-900 bg-gray-900/5 text-gray-950 font-semibold ring-2 ring-gray-900 shadow-xs';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isReviewMode}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left flex items-center sm:items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border transition-all duration-150 select-none min-h-[48px] ${optionStyle} ${
                  flashedIndex === idx ? 'animate-option-flash' : ''
                } ${
                  isReviewMode ? 'cursor-default' : 'cursor-pointer active:scale-[0.985]'
                }`}
              >
                {/* Radio Indicator */}
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border text-xs font-semibold transition-colors ${
                    isReviewMode && isOptCorrect
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : isReviewMode && isIncorrectSelection
                      ? 'border-rose-500 bg-rose-500 text-white'
                      : isSelected
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}
                >
                  {OPTION_LABELS[idx]}
                </div>

                {/* Option Text */}
                <div className="flex-1 text-sm sm:text-base leading-snug sm:leading-relaxed">
                  {option}
                </div>

                {/* Status icon in review mode */}
                {isReviewMode && (
                  <div className="flex-shrink-0">
                    {isOptCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {isIncorrectSelection && <XCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Explanation callout */}
      {isReviewMode && explanation && (
        <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-2 font-semibold text-gray-900 mb-1">
            <Info className="w-4 h-4 text-gray-700" />
            <span>Giải thích:</span>
          </div>
          <p className="whitespace-pre-wrap pl-6 text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
};
