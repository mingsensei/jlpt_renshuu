import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  History,
  PlusCircle,
  Search,
  Clock,
  HelpCircle,
  Edit,
  Trash2,
  Play,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Calendar,
  Layers,
  RefreshCw
} from 'lucide-react';
import { examService } from '../lib/examService';
import type { Exam, ExamResult } from '../types/exam';

export const AdminManage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exams' | 'history'>('exams');

  // Exams state
  const [exams, setExams] = useState<Exam[]>([]);
  const [examSearch, setExamSearch] = useState('');
  const [isExamsLoading, setIsExamsLoading] = useState(true);

  // History state
  const [results, setResults] = useState<ExamResult[]>([]);
  const [historySearch, setHistorySearch] = useState('');
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  // Load Exams
  const loadExams = async () => {
    setIsExamsLoading(true);
    try {
      const data = await examService.getExams();
      setExams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExamsLoading(false);
    }
  };

  // Load History
  const loadHistory = async () => {
    setIsHistoryLoading(true);
    try {
      const data = await examService.getAllResults();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
    loadHistory();
  }, []);

  const handleDeleteExam = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài thi "${title}"? Tất cả câu hỏi của đề này sẽ bị xóa.`)) {
      return;
    }
    await examService.deleteExam(id);
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  const handleDeleteResult = async (id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa lịch sử bài làm này?')) {
      return;
    }
    await examService.deleteResult(id);
    setResults((prev) => prev.filter((r) => r.id !== id));
  };

  const formatTimeLimit = (seconds: number | null) => {
    if (!seconds || seconds <= 0) return 'Không giới hạn';
    const minutes = Math.floor(seconds / 60);
    return `${minutes} phút`;
  };

  const formatTimeSpent = (seconds?: number) => {
    if (!seconds || seconds <= 0) return '--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Filters
  const filteredExams = exams.filter(
    (e) =>
      e.title.toLowerCase().includes(examSearch.toLowerCase()) ||
      (e.description && e.description.toLowerCase().includes(examSearch.toLowerCase()))
  );

  const filteredResults = results.filter(
    (r) =>
      (r.exam_title && r.exam_title.toLowerCase().includes(historySearch.toLowerCase())) ||
      r.exam_id.toLowerCase().includes(historySearch.toLowerCase())
  );

  // Stats calculation for history
  const totalTests = results.length;
  const passTests = results.filter((r) => r.percentage >= 60).length;
  const avgPercentage = totalTests > 0 ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / totalTests) : 0;

  return (
    <div className="max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 mb-2">
            <Layers className="w-3.5 h-3.5 text-gray-700" />
            <span>Khu vực Quản trị viên</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Quản lý đề thi & Lịch sử
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Chỉnh sửa nội dung đề thi, cập nhật câu hỏi và theo dõi lịch sử làm bài kiểm tra.
          </p>
        </div>

        <Link
          to="/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tạo bài thi mới</span>
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('exams')}
          className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'exams'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Danh sách đề thi ({exams.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'history'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Lịch sử bài làm ({results.length})</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: QUẢN LÝ ĐỀ THI (EXAM MANAGEMENT) */}
      {/* ============================================================== */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={examSearch}
                onChange={(e) => setExamSearch(e.target.value)}
                placeholder="Tìm kiếm đề thi cần sửa..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all shadow-xs"
              />
              {examSearch && (
                <button
                  onClick={() => setExamSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 p-1 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={loadExams}
              title="Làm mới danh sách"
              className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isExamsLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Exams List Table / Cards */}
          {isExamsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse h-28"></div>
              ))}
            </div>
          ) : filteredExams.length > 0 ? (
            <div className="space-y-3">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-4 sm:p-5 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {exam.lesson && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-900 text-white px-2 py-0.5 rounded-md">
                          {exam.lesson.title}
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                        <HelpCircle className="w-3 h-3 text-gray-500" />
                        {exam.questions_count ?? 0} câu
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-gray-500" />
                        {formatTimeLimit(exam.time_limit)}
                      </span>

                      {exam.created_at && (
                        <span className="text-[11px] text-gray-400">
                          Tạo: {new Date(exam.created_at).toLocaleDateString('vi-VN')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                      {exam.title}
                    </h3>

                    {exam.description && (
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {exam.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                    <Link
                      to={`/exam/${exam.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      title="Làm bài thi thử"
                    >
                      <Play className="w-3.5 h-3.5 text-gray-700" />
                      <span className="hidden sm:inline">Làm thử</span>
                    </Link>

                    <Link
                      to={`/manage/edit/${exam.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs active:scale-95 cursor-pointer"
                      title="Chỉnh sửa đề thi và câu hỏi"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Sửa đề</span>
                    </Link>

                    <button
                      onClick={() => handleDeleteExam(exam.id, exam.title)}
                      className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Xóa đề thi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-8 text-center">
              <p className="text-gray-500 text-sm mb-3">Không tìm thấy đề thi phù hợp.</p>
              <button
                onClick={() => setExamSearch('')}
                className="text-xs font-semibold text-gray-900 hover:underline"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: LỊCH SỬ BÀI KIỂM TRA ĐÃ LÀM (HISTORY) */}
      {/* ============================================================== */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-5 text-center shadow-xs">
              <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">Tổng lượt làm</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 font-mono">{totalTests}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-5 text-center shadow-xs">
              <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">Điểm trung bình</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900 font-mono">{avgPercentage}%</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-5 text-center shadow-xs">
              <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">Số lượt đạt</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">{passTests}</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Tìm kiếm theo tên bài thi đã làm..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all shadow-xs"
              />
              {historySearch && (
                <button
                  onClick={() => setHistorySearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 p-1 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={loadHistory}
              title="Làm mới lịch sử"
              className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isHistoryLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Results List */}
          {isHistoryLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse h-24"></div>
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-3">
              {filteredResults.map((res) => {
                const isPassed = res.percentage >= 60;
                return (
                  <div
                    key={res.id}
                    className="bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-4 sm:p-5 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            isPassed
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {isPassed ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" /> ĐẠT ({res.percentage}%)
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" /> CHƯA ĐẠT ({res.percentage}%)
                            </>
                          )}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatTimeSpent(res.time_spent)}
                        </span>

                        {res.created_at && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {new Date(res.created_at).toLocaleString('vi-VN')}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-gray-900 truncate">
                        {res.exam_title || 'Bài kiểm tra tiếng Nhật'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Điểm số: <strong className="text-gray-900 font-mono font-bold">{res.score} / {res.total}</strong>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                      <Link
                        to={`/result/${res.id}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs cursor-pointer"
                      >
                        <span>Xem chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDeleteResult(res.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Xóa kết quả này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-8 text-center">
              <p className="text-gray-500 text-sm mb-3">Chưa có kết quả làm bài nào được lưu.</p>
              <Link
                to="/"
                className="text-xs font-semibold text-gray-900 hover:underline"
              >
                Vào danh sách đề thi để làm bài ngay
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
