import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Languages,
  Sparkles,
  Search,
  PlusCircle,
  Play,
  Clock,
  HelpCircle,
  AlertCircle,
  RefreshCw,
  LogIn,
  FolderPlus,
  X,
  Edit,
  Trash2
} from 'lucide-react';
import { examService } from '../lib/examService';
import { useAuth } from '../context/AuthContext';
import type { Lesson, ExamCategory, Exam } from '../types/exam';
import { CATEGORY_TABS } from '../types/exam';

export const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ExamCategory>('vocabulary');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

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

  const { user } = useAuth();

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch all lessons to get counts across all categories
      const data = await examService.getLessons();
      setAllLessons(data);
      setLessons(data.filter((l) => l.category === activeCategory));
    } catch (err: any) {
      console.error(err);
      setError('Không thể tải danh sách bài học và nhóm đề thi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter lessons when activeCategory changes
  useEffect(() => {
    setLessons(allLessons.filter((l) => l.category === activeCategory));
  }, [activeCategory, allLessons]);

  const handleCategoryChange = (category: ExamCategory) => {
    setActiveCategory(category);
    setSearchQuery('');
  };

  const handleDeleteExam = async (examId: string, examTitle: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa đề thi "${examTitle}"?`)) return;
    try {
      await examService.deleteExam(examId);
      await loadData();
    } catch (err) {
      console.error(err);
      alert('Không thể xóa đề thi này.');
    }
  };

  // Open Edit Lesson Modal
  const openEditLessonModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setEditLessonTitle(lesson.title);
    setEditLessonDesc(lesson.description || '');
    setEditLessonOrder(lesson.order_index ?? 1);
    setEditSyncAcrossAll(true);
  };

  // Handle Edit Lesson Submission
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
      await loadData();
    } catch (err: any) {
      console.error(err);
      alert('Lỗi cập nhật bài học: ' + (err.message || err));
    } finally {
      setIsUpdatingLesson(false);
    }
  };

  // Open Delete Lesson Confirmation Modal
  const openDeleteLessonModal = (lesson: Lesson) => {
    setDeletingLesson(lesson);
  };

  // Handle Delete Lesson (Single category or all 3 categories)
  const handleDeleteLesson = async (deleteAcrossAll: boolean) => {
    if (!deletingLesson) return;
    setIsDeletingLesson(true);
    try {
      if (deleteAcrossAll) {
        const matchingLessons = allLessons.filter(
          (l) => l.title.trim().toLowerCase() === deletingLesson.title.trim().toLowerCase()
        );
        const ids = matchingLessons.map((l) => l.id);
        await examService.deleteLessons(ids.length > 0 ? ids : [deletingLesson.id]);
      } else {
        await examService.deleteLesson(deletingLesson.id);
      }
      setDeletingLesson(null);
      await loadData();
    } catch (err: any) {
      console.error(err);
      alert('Lỗi khi xóa bài học: ' + (err.message || err));
    } finally {
      setIsDeletingLesson(false);
    }
  };

  // Handle Create Lesson (Automatically created in all 3 categories)
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
      await loadData();
    } catch (err: any) {
      console.error(err);
      alert('Lỗi tạo bài học mới: ' + (err.message || err));
    } finally {
      setIsCreatingLesson(false);
    }
  };

  const formatTimeLimit = (seconds: number | null) => {
    if (!seconds || seconds <= 0) return 'Không giới hạn';
    const mins = Math.floor(seconds / 60);
    return `${mins} phút`;
  };

  // Filter lessons based on search query
  const filteredLessons = lessons.filter((lesson) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchLesson =
      lesson.title.toLowerCase().includes(query) ||
      (lesson.description && lesson.description.toLowerCase().includes(query));

    const matchExam = lesson.exams?.some(
      (exam) =>
        exam.title.toLowerCase().includes(query) ||
        (exam.description && exam.description.toLowerCase().includes(query))
    );

    return matchLesson || matchExam;
  });

  // Calculate statistics for each category
  const getCategoryStats = (cat: ExamCategory) => {
    const catLessons = allLessons.filter((l) => l.category === cat);
    const totalExams = catLessons.reduce((acc, l) => acc + (l.exams?.length || l.exams_count || 0), 0);
    return { lessonsCount: catLessons.length, examsCount: totalExams };
  };

  const activeTabConfig = CATEGORY_TABS.find((t) => t.id === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10">
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
            <span>Luyện thi tiếng Nhật JLPT N5 ~ N1</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-900">
            Chuyên đề & Bài học
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Chọn nhóm đề (Từ vựng, Kanji, Ngữ pháp) và bài học để vào luyện đề kiểm tra.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={loadData}
            title="Làm mới dữ liệu"
            className="p-2 sm:p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddLessonModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-gray-300 text-gray-800 hover:bg-gray-100 transition-all active:scale-95 cursor-pointer"
                title="Tạo thêm bài học cho nhóm này"
              >
                <FolderPlus className="w-4 h-4 text-gray-700" />
                <span className="hidden sm:inline">Thêm bài học</span>
              </button>

              <Link
                to="/create"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tạo bài thi mới</span>
              </Link>
            </div>
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

      {/* ========================================================= */}
      {/* 3 CATEGORY TABS (TỪ VỰNG, KANJI, NGỮ PHÁP) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          const stats = getCategoryStats(tab.id);

          let IconComponent = BookOpen;
          if (tab.id === 'kanji') IconComponent = Languages;
          if (tab.id === 'grammar') IconComponent = Sparkles;

          return (
            <button
              key={tab.id}
              onClick={() => handleCategoryChange(tab.id)}
              className={`flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                isActive
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md ring-2 ring-gray-900/10'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isActive ? 'bg-white/15 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-base font-bold tracking-tight">
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] hidden md:inline px-1.5 py-0.2 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tab.kanji}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] block mt-0.5 ${
                      isActive ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {stats.lessonsCount} bài • {stats.examsCount} đề
                  </span>
                </div>
              </div>

              {isActive && (
                <div className="hidden sm:block">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block ring-4 ring-emerald-400/20"></span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Search Bar within Active Group */}
      <div className="relative mb-6 sm:mb-8">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Tìm kiếm bài học hoặc đề thi trong mục ${activeTabConfig?.label || ''}...`}
          className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 p-1 rounded-full text-xs cursor-pointer"
            title="Xóa tìm kiếm"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {searchQuery && (
        <div className="flex items-center justify-between mb-4 text-xs text-gray-600 px-1">
          <span>
            Tìm thấy <strong>{filteredLessons.length}</strong> bài học phù hợp trong nhóm{' '}
            <strong>{activeTabConfig?.label}</strong>
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-gray-900 font-semibold hover:underline cursor-pointer"
          >
            Xóa tìm kiếm
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* LESSONS IN RESPONSIVE GRID LAYOUT */}
      {/* ========================================================= */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-3xl p-5 animate-pulse space-y-4 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-xl"></div>
                <div className="h-5 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-3.5 bg-gray-100 rounded w-4/5"></div>
              <div className="space-y-2 pt-2">
                <div className="h-16 bg-gray-50 rounded-2xl"></div>
                <div className="h-16 bg-gray-50 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredLessons.map((lesson, lessonIdx) => {
            const lessonExams = lesson.exams || [];

            return (
              <div
                key={lesson.id}
                className="bg-white border border-gray-200 hover:border-gray-300 rounded-3xl p-4 sm:p-5 transition-all shadow-xs flex flex-col justify-between group hover:shadow-md"
              >
                <div>
                  {/* Lesson Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-3 pb-3 border-b border-gray-100">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-gray-900 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                        {lesson.order_index ?? lessonIdx + 1}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-base font-bold text-gray-900 leading-snug line-clamp-1" title={lesson.title}>
                          {lesson.title}
                        </h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            {activeTabConfig?.label}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-[11px] text-gray-500 font-medium">
                            {lessonExams.length} đề thi
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Admin Actions on Lesson */}
                    {user && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => openEditLessonModal(lesson)}
                          className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          title="Sửa bài học này"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openDeleteLessonModal(lesson)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Xóa bài học này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {lesson.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3.5 leading-relaxed">
                      {lesson.description}
                    </p>
                  )}

                  {/* Exams inside Lesson Card */}
                  <div className="space-y-2.5">
                    {lessonExams.length > 0 ? (
                      lessonExams.map((exam: Exam) => (
                        <div
                          key={exam.id}
                          className="bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/80 rounded-2xl p-3 transition-all flex flex-col justify-between gap-2.5"
                        >
                          <div>
                            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
                                <HelpCircle className="w-3 h-3 text-gray-400" />
                                {exam.questions_count ?? 0} câu
                              </span>

                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
                                <Clock className="w-3 h-3 text-gray-400" />
                                {formatTimeLimit(exam.time_limit)}
                              </span>
                            </div>

                            <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                              {exam.title}
                            </h3>

                            {exam.description && (
                              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                {exam.description}
                              </p>
                            )}
                          </div>

                          {/* Exam action buttons */}
                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-200/60">
                            {user ? (
                              <div className="flex items-center gap-1">
                                <Link
                                  to={`/manage/edit/${exam.id}`}
                                  className="p-1 text-gray-400 hover:text-gray-900 rounded-lg transition-colors"
                                  title="Chỉnh sửa đề"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  onClick={() => handleDeleteExam(exam.id, exam.title)}
                                  className="p-1 text-gray-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                                  title="Xóa đề"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div></div>
                            )}

                            <Link
                              to={`/exam/${exam.id}`}
                              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-gray-900 text-white hover:bg-black text-xs font-semibold transition-all shadow-xs active:scale-95 ml-auto"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Làm bài</span>
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-50/70 border border-dashed border-gray-200 rounded-2xl p-4 text-center">
                        <p className="text-xs text-gray-400 mb-1.5">
                          Chưa có đề thi nào trong bài này
                        </p>
                        {user && (
                          <Link
                            to={`/create?lessonId=${lesson.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 hover:underline"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>Tạo đề thi cho bài này</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Lesson Card Footer: Admin add exam button */}
                {user && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-end">
                    <Link
                      to={`/create?lessonId=${lesson.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Thêm đề vào bài này</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State for category */
        <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto mt-4">
          <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-3 text-gray-500">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
            {searchQuery
              ? 'Không tìm thấy bài học phù hợp'
              : `Chưa có bài học nào trong nhóm ${activeTabConfig?.label}`}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mb-5 max-w-sm mx-auto leading-relaxed">
            {searchQuery
              ? 'Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.'
              : user
              ? 'Bạn có thể bấm "Thêm bài học" để tạo bài học đầu tiên (tự động tạo đồng bộ cho cả 3 chuyên mục).'
              : 'Nội dung bài tập đang được biên soạn.'}
          </p>
          {user && (
            <button
              onClick={() => setIsAddLessonModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Thêm bài học mới (đồng bộ 3 chuyên mục)</span>
            </button>
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
                <strong>Tự động đồng bộ 3 chuyên mục:</strong> Bài học tạo mới sẽ được tạo đồng thời trên cả 3 nhóm: <strong>Từ vựng</strong>, <strong>Kanji</strong> và <strong>Ngữ pháp</strong>.
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
                Chỉ xóa trong chuyên mục {activeTabConfig?.label}
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
