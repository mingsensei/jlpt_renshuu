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
  Layers,
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

  // Quick Create Lesson Modal state for logged in user
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDesc, setNewLessonDesc] = useState('');
  const [newLessonOrder, setNewLessonOrder] = useState<number>(1);
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);

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

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) {
      alert('Vui lòng nhập tên bài học.');
      return;
    }

    setIsCreatingLesson(true);
    try {
      await examService.createLesson(
        activeCategory,
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
      {/* LESSONS LIST & THEIR EXAMS */}
      {/* ========================================================= */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 animate-pulse space-y-4 shadow-xs"
            >
              <div className="h-5 bg-gray-100 rounded w-1/3"></div>
              <div className="h-3.5 bg-gray-100 rounded w-2/3"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="h-20 bg-gray-50 rounded-2xl"></div>
                <div className="h-20 bg-gray-50 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredLessons.length > 0 ? (
        <div className="space-y-6">
          {filteredLessons.map((lesson, lessonIdx) => {
            const lessonExams = lesson.exams || [];

            return (
              <div
                key={lesson.id}
                className="bg-white border border-gray-200 hover:border-gray-300 rounded-3xl p-4 sm:p-6 transition-all shadow-xs space-y-4"
              >
                {/* Lesson Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3.5">
                  <div className="flex items-start sm:items-center gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gray-100 text-gray-900 font-black text-xs sm:text-sm flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      {lesson.order_index ?? lessonIdx + 1}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                        {lesson.title}
                      </h2>
                      {lesson.description && (
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {lesson.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                      <Layers className="w-3 h-3 text-gray-500" />
                      <span>{lessonExams.length} đề thi</span>
                    </span>

                    {user && (
                      <Link
                        to={`/create?lessonId=${lesson.id}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-100 px-2.5 py-1 rounded-lg transition-colors"
                        title="Tạo đề thi mới cho bài này"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Thêm đề</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Exams inside Lesson */}
                {lessonExams.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {lessonExams.map((exam: Exam) => (
                      <div
                        key={exam.id}
                        className="bg-gray-50/70 hover:bg-gray-50 border border-gray-200/80 hover:border-gray-300 rounded-2xl p-4 transition-all flex flex-col justify-between gap-3 group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
                              <HelpCircle className="w-3 h-3 text-gray-500" />
                              {exam.questions_count ?? 0} câu
                            </span>

                            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
                              <Clock className="w-3 h-3 text-gray-500" />
                              {formatTimeLimit(exam.time_limit)}
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1 group-hover:text-black">
                            {exam.title}
                          </h3>

                          {exam.description && (
                            <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                              {exam.description}
                            </p>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100">
                          {user ? (
                            <div className="flex items-center gap-1">
                              <Link
                                to={`/manage/edit/${exam.id}`}
                                className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg transition-colors"
                                title="Chỉnh sửa đề"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => handleDeleteExam(exam.id, exam.title)}
                                className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
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
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gray-900 text-white hover:bg-black text-xs font-semibold transition-all shadow-xs active:scale-95 ml-auto"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Bắt đầu làm bài</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-5 text-center">
                    <p className="text-xs text-gray-500 mb-2">
                      Chưa có đề thi nào trong bài học này.
                    </p>
                    {user ? (
                      <Link
                        to={`/create?lessonId=${lesson.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 hover:underline"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Tạo đề thi cho bài này ngay</span>
                      </Link>
                    ) : (
                      <span className="text-[11px] text-gray-400">
                        Đang cập nhật nội dung bài tập...
                      </span>
                    )}
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
              ? 'Bạn có thể bấm "Thêm bài học" để tạo bài học đầu tiên cho nhóm này.'
              : 'Nội dung bài tập đang được biên soạn.'}
          </p>
          {user && (
            <button
              onClick={() => setIsAddLessonModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-all shadow-xs cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Thêm bài học cho {activeTabConfig?.label}</span>
            </button>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* QUICK CREATE LESSON MODAL */}
      {/* ========================================================= */}
      {isAddLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-gray-800" />
                <h3 className="font-bold text-base sm:text-lg text-gray-900">
                  Thêm bài học mới ({activeTabConfig?.label})
                </h3>
              </div>
              <button
                onClick={() => setIsAddLessonModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
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
                  placeholder="Ví dụ: Trọng tâm từ vựng món ăn, giá tiền, số đếm vật phẩm..."
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
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isCreatingLesson || !newLessonTitle.trim()}
                  className="px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black disabled:opacity-50"
                >
                  {isCreatingLesson ? 'Đang tạo...' : 'Tạo bài học'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
