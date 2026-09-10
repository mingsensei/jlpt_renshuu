import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Sparkles, BookOpen, AlertCircle, RefreshCw, LogIn } from 'lucide-react';
import { ExamCard } from '../components/ExamCard';
import { examService } from '../lib/examService';
import { useAuth } from '../context/AuthContext';
import type { Exam } from '../types/exam';

export const Home: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const loadExams = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await examService.getExams();
      setExams(data);
    } catch (err: any) {
      console.error(err);
      setError('Không thể tải danh sách bài thi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleDelete = async (id: string) => {
    await examService.deleteExam(id);
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredExams = exams.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.description && e.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10">
      {error && (
        <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-700 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Hero / Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gray-700" />
            <span>Ôn luyện JLPT N5 ~ N1</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Danh sách bài kiểm tra
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Học viên có thể chọn bài làm ngay miễn phí. Đăng nhập để tạo thêm đề mới.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadExams}
            title="Làm mới"
            className="p-2 sm:p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {user ? (
            <Link
              to="/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tạo bài thi mới</span>
            </Link>
          ) : (
            <Link
              to="/login?redirect=/create"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-gray-300 text-gray-800 hover:bg-gray-100 transition-all active:scale-95 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập để tạo đề</span>
            </Link>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 sm:mb-8">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm bài thi..."
          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all shadow-xs"
        />
      </div>

      {/* Exam Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse h-40 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="h-3.5 bg-gray-100 rounded w-1/3"></div>
                <div className="h-5 bg-gray-100 rounded w-3/4"></div>
                <div className="h-3.5 bg-gray-100 rounded w-full"></div>
              </div>
              <div className="h-7 bg-gray-100 rounded w-20 self-end"></div>
            </div>
          ))}
        </div>
      ) : filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} onDelete={user ? handleDelete : undefined} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto mt-4">
          <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-3 text-gray-500">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
            {searchQuery ? 'Không tìm thấy bài thi phù hợp' : 'Chưa có bài kiểm tra nào'}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mb-5 max-w-sm mx-auto leading-relaxed">
            {searchQuery
              ? 'Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.'
              : user
              ? 'Hãy dán chuỗi JSON câu hỏi để tạo bài kiểm tra đầu tiên.'
              : 'Đăng nhập tài khoản để bắt đầu tạo bài kiểm tra mới.'}
          </p>
          {user ? (
            <Link
              to="/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tạo bài thi ngay</span>
            </Link>
          ) : (
            <Link
              to="/login?redirect=/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập để tạo đề</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
