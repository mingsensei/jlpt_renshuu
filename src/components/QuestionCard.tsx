import React from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  options: string[];
  selectedAnswer: number | null;
  onSelectAnswer?: (index: number) => void;
  // Review mode props (for Result / Review page)
  isReviewMode?: boolean;
  correctAnswer?: number;
  explanation?: string | null;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  options,
  selectedAnswer,
  onSelectAnswer,
  isReviewMode = false,
  correctAnswer,
  explanation
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-7 shadow-xs transition-all">
      {/* Header index */}
      <div className="flex items-center justify-between mb-3.5">
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-800 tracking-wide uppercase">
          Câu {questionNumber} / {totalQuestions}
        </span>
        {isReviewMode && selectedAnswer !== null && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
              selectedAnswer === correctAnswer
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {selectedAnswer === correctAnswer ? (
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

      {/* Options */}
      <div className="space-y-2.5 sm:space-y-3">
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = isReviewMode && correctAnswer === idx;
          const isIncorrectSelection = isReviewMode && isSelected && selectedAnswer !== correctAnswer;

          let optionStyle = 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50/60 text-gray-900';

          if (isReviewMode) {
            if (isCorrect) {
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
              onClick={() => onSelectAnswer && onSelectAnswer(idx)}
              className={`w-full text-left flex items-center sm:items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border transition-all duration-150 select-none min-h-[48px] ${optionStyle} ${
                isReviewMode ? 'cursor-default' : 'cursor-pointer active:scale-[0.985]'
              }`}
            >
              {/* Radio Indicator */}
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border text-xs font-semibold transition-colors ${
                  isReviewMode && isCorrect
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
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {isIncorrectSelection && <XCircle className="w-5 h-5 text-rose-500" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation callout */}
      {isReviewMode && explanation && (
        <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-2 font-semibold text-gray-900 mb-1">
            <Info className="w-4 h-4 text-gray-700" />
            <span>Giải thích (Explanation):</span>
          </div>
          <p className="whitespace-pre-wrap pl-6 text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
};
