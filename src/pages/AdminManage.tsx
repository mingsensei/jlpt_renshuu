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
  RefreshCw,
  FolderPlus,
  X,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { examService } from '../lib/examService';
import type { Exam, ExamResult, Lesson, ExamCategory } from '../types/exam';
import { CATEGORY_TABS } from '../types/exam';

export const AdminManage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exams' | 'lessons' | 'history'>('exams');

  // Exams state
  const [exams, setExams] = useState<Exam[]>([]);
  const [examSearch, setExamSearch] = useState('');
  const [isExamsLoading, setIsExamsLoading] = useState(true);

  // Lessons state
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonCategoryFilter, setLessonCategoryFilter] = useState<'all' | ExamCategory>('all');
  const [lessonSearch, setLessonSearch] = useState('');
  const [isLessonsLoading, setIsLessonsLoading] = useState(true);

  // Quick Create Lesson Modal state (creates for all 3 categories)
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDesc, setNewLessonDesc] = useState('');
  const [newLessonOrder, setNewLessonOrder] = useState<number>(1);
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);

  // Edit Lesson Modal state
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState('');
  const [editLessonDesc, setEditLessonDesc] = useState('');
  const [editLessonOrder, setEditLessonOrder] = useState<number>(1);
  const [editSyncAcrossAll, setEditSyncAcrossAll] = useState(true);
  const [isUpdatingLesson, setIsUpdatingLesson] = useState(false);

  // Delete Lesson Modal state
  const [deletingLesson, setDeletingLesson] = useState<Lesson | null>(null);
  const [isDeletingLesson, setIsDeletingLesson] = useState(false);

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

  // Load Lessons
  const loadLessons = async () => {
    setIsLessonsLoading(true);
    try {
      const data = await examService.getLessons();
      setLessons(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLessonsLoading(false);
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
    loadLessons();
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

  // Lesson Handlers
  const openEditLessonModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setEditLessonTitle(lesson.title);
    setEditLessonDesc(lesson.description || '');
    setEditLessonOrder(lesson.order_index ?? 1);
    setEditSyncAcrossAll(true);
  };

  const handleUpdateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLesson || !editLessonTitle.trim()) {
      alert('Vui lòng nhập tên bài học.');
      return;
    }

    setIsUpdatingLesson(true);
    try {
      if (editSyncAcrossAll) {
        await examService.updateLessonAcrossCategories(editingLesson.title, {
          title: editLessonTitle.trim(),
          description: editLessonDesc.trim() || undefined,
          order_index: editLessonOrder
        });
      } else {
        await examService.updateLesson(editingLesson.id, {
          title: editLessonTitle.trim(),
          description: editLessonDesc.trim() || undefined,
          order_index: editLessonOrder
        });
      }
      setEditingLesson(null);
      await loadLessons();
      await loadExams();
    } catch (err: any) {
      console.error(err);
      alert('Lỗi cập nhật bài học: ' + (err.message || err));
    } finally {
      setIsUpdatingLesson(false);
    }
  };

  const openDeleteLessonModal = (lesson: Lesson) => {
    setDeletingLesson(lesson);
  };

  const handleDeleteLesson = async (deleteAcrossAll: boolean) => {
    if (!deletingLesson) return;
    setIsDeletingLesson(true);
    try {
      if (deleteAcrossAll) {
        const matching = lessons.filter(
          (l) => l.title.trim().toLowerCase() === deletingLesson.title.trim().toLowerCase()
        );
        const ids = matching.map((l) => l.id);
        await examService.deleteLessons(ids.length > 0 ? ids : [deletingLesson.id]);
      } else {
        await examService.deleteLesson(deletingLesson.id);
      }
      setDeletingLesson(null);
      await loadLessons();
      await loadExams();
    } catch (err: any) {
      console.error(err);
      alert('Lỗi khi xóa bài học: ' + (err.message || err));
    } finally {
      setIsDeletingLesson(false);
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) {
      alert('Vui lòng nhập tên bài học.');
      return;
    }

    setIsCreatingLesson(true);
    try {
      await examService.createLessonForAllCategories(
        newLessonTitle.trim(),
        newLessonDesc.trim(),
        newLessonOrder
      );
      setNewLessonTitle('');
      setNewLessonDesc('');
      setIsAddLessonModalOpen(false);
      await loadLessons();
      await loadExams();
    } catch (err: any) {
      console.error(err);
      alert('Lỗi tạo bài học mới: ' + (err.message || err));
    } finally {
      setIsCreatingLesson(false);
    }
  };

  // Filters
  const filteredExams = exams.filter(
    (e) =>
      e.title.toLowerCase().includes(examSearch.toLowerCase()) ||
      (e.description && e.description.toLowerCase().includes(examSearch.toLowerCase()))
  );

  const filteredLessons = lessons.filter((l) => {
    const matchCat = lessonCategoryFilter === 'all' || l.category === lessonCategoryFilter;
    const matchSearch =
      !lessonSearch.trim() ||
      l.title.toLowerCase().includes(lessonSearch.toLowerCase()) ||
      (l.description && l.description.toLowerCase().includes(lessonSearch.toLowerCase()));
    return matchCat && matchSearch;
  });

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
            Quản lý đề thi & Bài học
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Chỉnh sửa đề thi, quản lý bài học chuyên mục và theo dõi lịch sử làm bài kiểm tra.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsAddLessonModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-gray-300 text-gray-800 hover:bg-gray-100 transition-all active:scale-95 cursor-pointer"
            title="Thêm bài học đồng bộ cho cả 3 chuyên mục"
          >
            <FolderPlus className="w-4 h-4 text-gray-700" />
            <span>Thêm bài học</span>
          </button>

          <Link
            to="/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo bài thi mới</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('exams')}
          className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'exams'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Danh sách đề thi ({exams.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'lessons'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <FolderPlus className="w-4 h-4" />
          <span>Quản lý bài học ({lessons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
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
                      {exam.passage && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md">
                          <BookMarked className="w-3 h-3 text-indigo-600" />
                          Đọc hiểu
                        </span>
                      )}

                      {exam.level && (
                        <span className="inline-flex items-center text-[11px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded-md">
                          {exam.level}
                        </span>
                      )}

                      {exam.lesson && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md">
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
      {/* TAB 2: QUẢN LÝ BÀI HỌC (LESSON MANAGEMENT) */}
      {/* ============================================================== */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          {/* Category Filter Pills & Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl overflow-x-auto">
              <button
                onClick={() => setLessonCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  lessonCategoryFilter === 'all'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tất cả ({lessons.length})
              </button>
              {CATEGORY_TABS.map((tab) => {
                const count = lessons.filter((l) => l.category === tab.id).length;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setLessonCategoryFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      lessonCategoryFilter === tab.id
                        ? 'bg-white text-gray-900 shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label} ({count})
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsAddLessonModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Thêm bài học mới</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={lessonSearch}
                onChange={(e) => setLessonSearch(e.target.value)}
                placeholder="Tìm kiếm bài học theo tên hoặc mô tả..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all shadow-xs"
              />
              {lessonSearch && (
                <button
                  onClick={() => setLessonSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 p-1 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={loadLessons}
              title="Làm mới danh sách bài học"
              className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLessonsLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Lessons List Table / Cards */}
          {isLessonsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse h-24"></div>
              ))}
            </div>
          ) : filteredLessons.length > 0 ? (
            <div className="space-y-3">
              {filteredLessons.map((lesson) => {
                const catConfig = CATEGORY_TABS.find((t) => t.id === lesson.category);
                const examsCount = lesson.exams?.length || lesson.exams_count || 0;

                return (
                  <div
                    key={lesson.id}
                    className="bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-4 sm:p-5 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded-md">
                          #{lesson.order_index ?? 1}
                        </span>

                        {lesson.level && (
                          <span className="inline-flex items-center text-[11px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-md">
                            {lesson.level}
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-md">
                          {catConfig?.label || lesson.category}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-md">
                          <Layers className="w-3 h-3 text-gray-400" />
                          {examsCount} đề thi
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                        {lesson.title}
                      </h3>

                      {lesson.description && (
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {lesson.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                      <Link
                        to={`/create?lessonId=${lesson.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        title="Tạo đề thi cho bài này"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-gray-700" />
                        <span className="hidden sm:inline">Thêm đề</span>
                      </Link>

                      <button
                        onClick={() => openEditLessonModal(lesson)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs active:scale-95 cursor-pointer"
                        title="Chỉnh sửa bài học"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Sửa bài</span>
                      </button>

                      <button
                        onClick={() => openDeleteLessonModal(lesson)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Xóa bài học"
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
              <p className="text-gray-500 text-sm mb-3">Không tìm thấy bài học nào phù hợp.</p>
              {lessonSearch ? (
                <button
                  onClick={() => setLessonSearch('')}
                  className="text-xs font-semibold text-gray-900 hover:underline"
                >
                  Xóa tìm kiếm
                </button>
              ) : (
                <button
                  onClick={() => setIsAddLessonModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gray-900 text-white hover:bg-black cursor-pointer"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Tạo bài học mới</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: LỊCH SỬ BÀI KIỂM TRA ĐÃ LÀM (HISTORY) */}
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

                        {res.passage && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md">
                            <BookMarked className="w-3 h-3 text-indigo-600" />
                            Đọc hiểu
                          </span>
                        )}

                        {res.level && (
                          <span className="inline-flex items-center text-[11px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded-md">
                            {res.level}
                          </span>
                        )}

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

      {/* ========================================================= */}
      {/* QUICK CREATE LESSON MODAL (AUTOMATICALLY 3 CATEGORIES) */}
      {/* ========================================================= */}
      {isAddLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-gray-800" />
                <h3 className="font-bold text-base sm:text-lg text-gray-900">
                  Thêm bài học mới
                </h3>
              </div>
              <button
                onClick={() => setIsAddLessonModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-900 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notification explaining the automatic 3 categories generation */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl flex items-start gap-2.5 text-xs text-gray-600">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Tự động đồng bộ 3 chuyên mục:</strong> Bài học mới sẽ được tạo đồng thời trên cả 3 chuyên mục: <strong>Từ vựng</strong>, <strong>Kanji</strong> và <strong>Ngữ pháp</strong>.
              </p>
            </div>

            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Tên bài học <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="Ví dụ: Bài 4: Mua sắm & Ăn uống"
                  required
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mô tả bài học <span className="text-gray-400 font-normal">(không bắt buộc)</span>
                </label>
                <input
                  type="text"
                  value={newLessonDesc}
                  onChange={(e) => setNewLessonDesc(e.target.value)}
                  placeholder="Ví dụ: Trọng tâm từ vựng món ăn, giá tiền, ngữ pháp mua sắm..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Thứ tự bài học (Order index)
                </label>
                <input
                  type="number"
                  min={1}
                  value={newLessonOrder}
                  onChange={(e) => setNewLessonOrder(parseInt(e.target.value) || 1)}
                  className="w-24 px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-center font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddLessonModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isCreatingLesson || !newLessonTitle.trim()}
                  className="px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black disabled:opacity-50 cursor-pointer"
                >
                  {isCreatingLesson ? 'Đang tạo...' : 'Tạo bài học (cả 3 nhóm)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* EDIT LESSON MODAL */}
      {/* ========================================================= */}
      {editingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-gray-800" />
                <h3 className="font-bold text-base sm:text-lg text-gray-900">
                  Chỉnh sửa bài học
                </h3>
              </div>
              <button
                onClick={() => setEditingLesson(null)}
                className="p-1 text-gray-400 hover:text-gray-900 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Tên bài học <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={editLessonTitle}
                  onChange={(e) => setEditLessonTitle(e.target.value)}
                  placeholder="Tên bài học"
                  required
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mô tả bài học
                </label>
                <input
                  type="text"
                  value={editLessonDesc}
                  onChange={(e) => setEditLessonDesc(e.target.value)}
                  placeholder="Mô tả bài học"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Thứ tự bài học (Order index)
                </label>
                <input
                  type="number"
                  min={1}
                  value={editLessonOrder}
                  onChange={(e) => setEditLessonOrder(parseInt(e.target.value) || 1)}
                  className="w-24 px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-center font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Checkbox to sync across all categories */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editSyncAcrossAll}
                    onChange={(e) => setEditSyncAcrossAll(e.target.checked)}
                    className="w-4 h-4 rounded text-gray-900 focus:ring-gray-900 cursor-pointer"
                  />
                  <span className="text-xs font-medium text-gray-700">
                    Đồng bộ thay đổi tên & thứ tự cho cả 3 chuyên mục (Từ vựng, Kanji, Ngữ pháp)
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingLesson(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingLesson || !editLessonTitle.trim()}
                  className="px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black disabled:opacity-50 cursor-pointer"
                >
                  {isUpdatingLesson ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DELETE LESSON CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {deletingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 text-rose-600">
                <Trash2 className="w-5 h-5" />
                <h3 className="font-bold text-base sm:text-lg text-gray-900">
                  Xác nhận xóa bài học
                </h3>
              </div>
              <button
                onClick={() => setDeletingLesson(null)}
                className="p-1 text-gray-400 hover:text-gray-900 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Bạn có chắc chắn muốn xóa bài học{' '}
              <strong className="text-gray-900">"{deletingLesson.title}"</strong>? Các đề thi thuộc bài học này sẽ không bị xóa mà được chuyển về trạng thái không thuộc bài học nào.
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleDeleteLesson(true)}
                disabled={isDeletingLesson}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa ở cả 3 chuyên mục (Từ vựng, Kanji, Ngữ pháp)</span>
              </button>

              <button
                onClick={() => handleDeleteLesson(false)}
                disabled={isDeletingLesson}
                className="w-full py-2 px-4 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Chỉ xóa trong chuyên mục này
              </button>

              <button
                onClick={() => setDeletingLesson(null)}
                disabled={isDeletingLesson}
                className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
