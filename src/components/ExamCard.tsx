import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, HelpCircle, ArrowRight, Trash2 } from 'lucide-react';
import type { Exam } from '../types/exam';

interface ExamCardProps {
  exam: Exam;
  onDelete?: (id: string) => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, onDelete }) => {
  const formatTimeLimit = (seconds: number | null) => {
    if (!seconds || seconds <= 0) return 'Không giới hạn';
    const minutes = Math.floor(seconds / 60);
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMins = minutes % 60;
      return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours} giờ`;
    }
    return `${minutes} phút`;
  };

  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-400 rounded-2xl p-4 sm:p-6 transition-all duration-200 hover:shadow-xs flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
              <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
              {exam.questions_count !== undefined ? `${exam.questions_count} câu` : 'Bài thi'}
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              {formatTimeLimit(exam.time_limit)}
            </span>
          </div>

          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm(`Bạn có chắc chắn muốn xóa bài thi "${exam.title}"?`)) {
                  onDelete(exam.id);
                }
              }}
              title="Xóa bài thi"
              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-black">
          {exam.title}
        </h3>

        {/* Description */}
        {exam.description && (
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
            {exam.description}
          </p>
        )}
      </div>

      {/* Footer Action */}
      <div className="pt-3 sm:pt-4 border-t border-gray-100 mt-3 sm:mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {exam.created_at
            ? new Date(exam.created_at).toLocaleDateString('vi-VN')
            : 'Mới tạo'}
        </span>

        <Link
          to={`/exam/${exam.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-900 hover:bg-black text-white transition-all shadow-xs active:scale-95"
        >
          <span>Start</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
