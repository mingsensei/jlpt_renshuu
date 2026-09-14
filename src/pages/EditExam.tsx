import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileCode2,
  Clock,
  Shuffle,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Download,
  Upload,
  Copy,
  Check,
  Save,
  Loader2,
  AlertTriangle,
  FolderPlus,
  BookMarked,
  Edit3,
  CheckSquare
} from 'lucide-react';
import { examService } from '../lib/examService';
import { JapanesePassageReader } from '../components/JapanesePassageReader';
import type { RawQuestionInput, Lesson, ExamCategory, JLPTLevel } from '../types/exam';
import { CATEGORY_TABS, JLPT_LEVELS } from '../types/exam';

export const EditExam: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jsonString, setJsonString] = useState('');
  const [timeMode, setTimeMode] = useState<'unlimited' | 'limited'>('limited');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleOptions, setShuffleOptions] = useState(false);

  // Reading-specific states
  const [passage, setPassage] = useState('');
  const [passageTranslation, setPassageTranslation] = useState('');
  const [level, setLevel] = useState<JLPTLevel>('N3');

  // Category and Lesson states
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory>('vocabulary');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [showNewLessonForm, setShowNewLessonForm] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDesc, setNewLessonDesc] = useState('');
  const [newLessonLevel, setNewLessonLevel] = useState<JLPTLevel>('N3');
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [parsedQuestions, setParsedQuestions] = useState<RawQuestionInput[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate JSON string
  const validateJson = (content: string): { isValid: boolean; questions: RawQuestionInput[] | null; error: string | null } => {
    if (!content.trim()) {
      return { isValid: false, questions: null, error: 'Vui lòng nhập chuỗi JSON danh sách câu hỏi.' };
    }

    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch (err: any) {
      return { isValid: false, questions: null, error: `Lỗi cú pháp JSON: ${err.message}` };
    }

    let questionsArray: any[];
    if (Array.isArray(parsed)) {
      questionsArray = parsed;
    } else if (parsed && typeof parsed === 'object' && Array.isArray(parsed.questions)) {
      questionsArray = parsed.questions;
    } else {
      return {
        isValid: false,
        questions: null,
        error: 'Dữ liệu JSON phải là một mảng câu hỏi [...] hoặc một đối tượng {} có trường "questions": [...]'
      };
    }

    if (questionsArray.length === 0) {
      return { isValid: false, questions: null, error: 'Mảng JSON câu hỏi không được rỗng.' };
    }

    for (let i = 0; i < questionsArray.length; i++) {
      const item = questionsArray[i];
      const qNum = i + 1;

      if (!item || typeof item !== 'object') {
        return { isValid: false, questions: null, error: `Câu số ${qNum} không phải là một object hợp lệ.` };
      }

      if (!item.question || typeof item.question !== 'string' || !item.question.trim()) {
        return { isValid: false, questions: null, error: `Câu số ${qNum} thiếu trường "question" hoặc nội dung trống.` };
      }

      if (!Array.isArray(item.options) || item.options.length !== 4) {
        return {
          isValid: false,
          questions: null,
          error: `Câu số ${qNum} phải có trường "options" là mảng đúng 4 lựa chọn.`
        };
      }

      for (let optIdx = 0; optIdx < 4; optIdx++) {
        if (typeof item.options[optIdx] !== 'string') {
          return {
            isValid: false,
            questions: null,
            error: `Câu số ${qNum}, lựa chọn thứ ${optIdx + 1} phải là chuỗi ký tự.`
          };
        }
      }

      if (
        typeof item.answer !== 'number' ||
        !Number.isInteger(item.answer) ||
        item.answer < 0 ||
        item.answer > 3
      ) {
        return {
          isValid: false,
          questions: null,
          error: `Câu số ${qNum}: trường "answer" phải là số nguyên từ 0 đến 3 (tương ứng với options[0..3]).`
        };
      }
    }

    return { isValid: true, questions: questionsArray as RawQuestionInput[], error: null };
  };

  const handleJsonChange = (value: string) => {
    setJsonString(value);
    if (value.trim()) {
      const result = validateJson(value);
      if (result.isValid) {
        setValidationError(null);
        setParsedQuestions(result.questions);

        // Auto-extract Reading attributes if user pasted full reading JSON object
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed) && typeof parsed === 'object') {
            if (parsed.passage !== undefined && typeof parsed.passage === 'string') {
              setPassage(parsed.passage);
              setSelectedCategory('reading');
            }
            if (parsed.passage_translation !== undefined && typeof parsed.passage_translation === 'string') {
              setPassageTranslation(parsed.passage_translation);
            }
            if (parsed.title && typeof parsed.title === 'string' && !title) {
              setTitle(parsed.title);
            }
            if (parsed.description && typeof parsed.description === 'string' && !description) {
              setDescription(parsed.description);
            }
            if (parsed.level && ['N5', 'N4', 'N3', 'N2', 'N1'].includes(parsed.level)) {
              setLevel(parsed.level as JLPTLevel);
            }
          }
        } catch {
          // ignore
        }
      } else {
        setValidationError(result.error);
        setParsedQuestions(null);
      }
    } else {
      setValidationError(null);
      setParsedQuestions(null);
    }
  };

  useEffect(() => {
    if (!id) {
      setLoadError('Không tìm thấy mã bài thi.');
      setIsLoading(false);
      return;
    }

    const loadExamData = async () => {
      setIsLoading(true);
      try {
        const [data, lessonsData] = await Promise.all([
          examService.getExamById(id),
          examService.getLessons()
        ]);

        if (!data || !data.exam) {
          setLoadError('Bài thi không tồn tại hoặc đã bị xóa.');
          return;
        }

        setAllLessons(lessonsData);
        const { exam, questions } = data;
        setTitle(exam.title);
        setDescription(exam.description || '');

        if (exam.passage) setPassage(exam.passage);
        if (exam.passage_translation) setPassageTranslation(exam.passage_translation);
        if (exam.level) setLevel(exam.level);

        if (exam.lesson_id) {
          setSelectedLessonId(exam.lesson_id);
          const found = lessonsData.find((l) => l.id === exam.lesson_id);
          if (found) {
            setSelectedCategory(found.category);
            if (found.level) setLevel(found.level);
          }
        } else {
          if (exam.passage) {
            setSelectedCategory('reading');
          } else {
            const vocabLessons = lessonsData.filter((l) => l.category === 'vocabulary');
            if (vocabLessons.length > 0) {
              setSelectedLessonId(vocabLessons[0].id);
            }
          }
        }

        if (exam.time_limit && exam.time_limit > 0) {
          setTimeMode('limited');
          setTimeLimitMinutes(Math.round(exam.time_limit / 60));
        } else {
          setTimeMode('unlimited');
        }

        setShuffleQuestions(!!exam.shuffle_questions);
        setShuffleOptions(!!exam.shuffle_options);

        // Convert questions to RawQuestionInput[]
        const rawList: RawQuestionInput[] = questions.map((q) => ({
          question: q.question,
          question_type: q.question_type,
          options: [q.option_a, q.option_b, q.option_c, q.option_d],
          answer: q.correct_answer,
          explanation: q.explanation || ''
        }));

        const formatted = JSON.stringify(rawList, null, 2);
        setJsonString(formatted);
        setParsedQuestions(rawList);
      } catch (err: any) {
        console.error(err);
        setLoadError(err.message || 'Không thể tải thông tin bài thi.');
      } finally {
        setIsLoading(false);
      }
    };

    loadExamData();
  }, [id]);

  const handleCategoryChange = (cat: ExamCategory) => {
    setSelectedCategory(cat);
    const inCategory = allLessons.filter((l) => {
      if (l.category !== cat) return false;
      if (cat === 'reading' && l.level && level) return l.level === level;
      return true;
    });
    if (inCategory.length > 0) {
      setSelectedLessonId(inCategory[0].id);
    } else {
      setSelectedLessonId('');
    }
  };

  const handleCreateNewLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    setIsCreatingLesson(true);
    try {
      if (selectedCategory === 'reading') {
        const newLesson = await examService.createLesson(
          'reading',
          newLessonTitle.trim(),
          newLessonDesc.trim(),
          undefined,
          newLessonLevel
        );
        setAllLessons((prev) => [...prev, newLesson]);
        setSelectedLessonId(newLesson.id);
      } else {
        const createdList = await examService.createLessonForAllCategories(
          newLessonTitle.trim(),
          newLessonDesc.trim()
        );
        setAllLessons((prev) => [...prev, ...createdList]);
        const currentCatLesson = createdList.find((l) => l.category === selectedCategory) || createdList[0];
        setSelectedLessonId(currentCatLesson.id);
      }
      setNewLessonTitle('');
      setNewLessonDesc('');
      setShowNewLessonForm(false);
    } catch (err: any) {
      alert('Không thể tạo bài học mới: ' + (err.message || err));
    } finally {
      setIsCreatingLesson(false);
    }
  };

  const handleCopyCurrent = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Không thể sao chép, vui lòng chọn và copy thủ công.');
    }
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonString);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${title || 'exam'}_questions.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setJsonString(content);
        handleJsonChange(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    if (!title.trim()) {
      alert('Vui lòng nhập tên bài kiểm tra.');
      return;
    }

    if (selectedCategory === 'reading' && !passage.trim()) {
      alert('Chuyên đề Đọc hiểu yêu cầu phải có nội dung đoạn văn (~500 từ).');
      return;
    }

    const result = validateJson(jsonString);
    if (!result.isValid || !result.questions) {
      setValidationError(result.error);
      return;
    }

    setIsSubmitting(true);
    try {
      const timeLimitSeconds =
        timeMode === 'limited' ? Math.max(1, timeLimitMinutes) * 60 : null;

      const readingOptions = selectedCategory === 'reading' ? {
        passage: passage.trim() || null,
        passage_translation: passageTranslation.trim() || null,
        level: level
      } : undefined;

      const success = await examService.updateExam(
        id,
        title.trim(),
        description.trim(),
        timeLimitSeconds,
        result.questions,
        shuffleQuestions,
        shuffleOptions,
        selectedLessonId || null,
        readingOptions
      );

      if (success) {
        alert('Cập nhật bài thi thành công!');
        navigate('/manage');
      } else {
        alert('Cập nhật thất bại. Vui lòng thử lại.');
      }
    } catch (err: any) {
      console.error(err);
      alert(`Đã xảy ra lỗi khi cập nhật bài thi: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <Loader2 className="w-8 h-8 text-gray-900 animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Đang tải thông tin đề thi...</p>
      </div>
    );
  }

  if (loadError || !id) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Lỗi tải dữ liệu</h2>
        <p className="text-gray-500 text-sm mb-6">{loadError || 'Không thể tìm thấy bài thi.'}</p>
        <button
          onClick={() => navigate('/manage')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang quản lý</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/manage')}
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-gray-900 mb-4 sm:mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại Quản lý</span>
      </button>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 mb-2">
          <span>Chỉnh sửa đề thi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Chỉnh sửa nội dung bài thi
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Cập nhật nhóm chuyên đề, bài học, tiêu đề, thời gian làm bài và danh sách câu hỏi.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Category & Lesson Selector */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
              Nhóm chuyên đề <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORY_TABS.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                    selectedCategory === cat.id
                      ? 'bg-gray-900 text-white border-gray-900 shadow-xs'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {cat.label} ({cat.kanji})
                </button>
              ))}
            </div>
          </div>

          {/* JLPT Level Selector (Specific to Reading) */}
          {selectedCategory === 'reading' && (
            <div className="pt-3 border-t border-gray-100">
              <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                Cấp độ JLPT Đọc hiểu <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {JLPT_LEVELS.map((lvl) => {
                  const isSelected = level === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => {
                        setLevel(lvl.id);
                        const matchLesson = allLessons.find(
                          (l) => l.category === 'reading' && l.level === lvl.id
                        );
                        if (matchLesson) {
                          setSelectedLessonId(matchLesson.id);
                        }
                      }}
                      className={`py-2 px-2 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-gray-900 text-white border-gray-900 shadow-xs ring-2 ring-gray-900/20'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-sm sm:text-base font-extrabold">{lvl.label}</span>
                      <span className={`text-[10px] font-normal ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                        {lvl.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs sm:text-sm font-bold text-gray-900">
                Thuộc bài học <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowNewLessonForm(!showNewLessonForm)}
                className="text-xs font-semibold text-gray-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>{showNewLessonForm ? 'Đóng tạo bài' : '+ Tạo bài học mới'}</span>
              </button>
            </div>

            {showNewLessonForm ? (
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl space-y-3 mb-3">
                <div>
                  <p className="text-xs font-bold text-gray-800">Tạo nhanh bài học mới:</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {selectedCategory === 'reading'
                      ? `✨ Tạo bài học chuyên đề Đọc hiểu cấp độ ${level}`
                      : '✨ Tự động tạo đồng bộ trên cả 3 chuyên mục (Từ vựng, Kanji, Ngữ pháp)'}
                  </p>
                </div>
                {selectedCategory === 'reading' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-700">Cấp độ bài:</span>
                    <select
                      value={newLessonLevel}
                      onChange={(e) => setNewLessonLevel(e.target.value as JLPTLevel)}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-bold"
                    >
                      {JLPT_LEVELS.map((lvl) => (
                        <option key={lvl.id} value={lvl.id}>
                          {lvl.label} - {lvl.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <input
                  type="text"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder={
                    selectedCategory === 'reading'
                      ? `Ví dụ: Đọc hiểu ${level} - Bài 1: Cuộc sống hàng ngày`
                      : 'Tên bài học (ví dụ: Bài 5: Thời gian & Lịch trình)'
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <input
                  type="text"
                  value={newLessonDesc}
                  onChange={(e) => setNewLessonDesc(e.target.value)}
                  placeholder="Mô tả tóm tắt (không bắt buộc)"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewLessonForm(false)}
                    className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    disabled={isCreatingLesson || !newLessonTitle.trim()}
                    onClick={handleCreateNewLesson}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-50 cursor-pointer"
                  >
                    {isCreatingLesson ? 'Đang tạo...' : 'Lưu bài học'}
                  </button>
                </div>
              </div>
            ) : allLessons.filter((l) => l.category === selectedCategory).length > 0 ? (
              <select
                value={selectedLessonId}
                onChange={(e) => setSelectedLessonId(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
              >
                {allLessons
                  .filter((l) => {
                    if (l.category !== selectedCategory) return false;
                    if (selectedCategory === 'reading' && l.level && level) return l.level === level;
                    return true;
                  })
                  .map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.title} {l.level ? `(${l.level})` : ''}
                    </option>
                  ))}
              </select>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between">
                <span>Chưa có bài học nào trong nhóm này. Hãy tạo bài học đầu tiên.</span>
                <button
                  type="button"
                  onClick={() => setShowNewLessonForm(true)}
                  className="font-bold underline ml-2 cursor-pointer"
                >
                  Tạo bài học
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reading Passage & Translation Input (Shown when Reading category is selected) */}
        {selectedCategory === 'reading' && (
          <div className="bg-white border-2 border-indigo-100 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <BookMarked className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Đoạn văn đọc hiểu (~500 từ)
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    Nội dung bài đọc chính bằng tiếng Nhật, phân cấp độ {level}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                  passage.length > 300 && passage.length < 1200
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {passage.length} ký tự (~{passage.trim() ? passage.trim().split(/\s+/).length : 0} từ)
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Đoạn văn tiếng Nhật (Passage) <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={9}
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
                placeholder="Dán đoạn văn tiếng Nhật khoảng 500 từ tại đây..."
                required={selectedCategory === 'reading'}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed font-sans"
              />
              <p className="text-[11px] text-gray-600 mt-2 space-y-1 bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100">
                <span className="block font-semibold text-indigo-900">💡 Hỗ trợ định dạng tiếng Nhật thông minh:</span>
                <span className="block">• <strong>Chỗ trống câu hỏi:</strong> Đánh số <code className="bg-white px-1.5 py-0.5 rounded font-mono text-indigo-800 border border-indigo-200">( 1 )</code>, <code className="bg-white px-1.5 py-0.5 rounded font-mono text-indigo-800 border border-indigo-200">( 2 )</code> hoặc <code className="bg-white px-1.5 py-0.5 rounded font-mono text-indigo-800 border border-indigo-200">（ 1 ）</code> để tự động tạo huy hiệu tương tác.</span>
                <span className="block">• <strong>Phiên âm Furigana:</strong> Viết dạng <code className="bg-white px-1.5 py-0.5 rounded font-mono text-indigo-800 border border-indigo-200">漢字[かんじ]</code> (ví dụ: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-indigo-800 border border-indigo-200">読書[どくしょ]</code>) để hỗ trợ bật/tắt furigana.</span>
                <span className="block">• <strong>Gạch chân trọng tâm:</strong> Sử dụng thẻ <code className="bg-white px-1.5 py-0.5 rounded font-mono text-indigo-800 border border-indigo-200">&lt;u&gt;văn bản&lt;/u&gt;</code> cho các câu hỏi hỏi về phần gạch chân.</span>
                <span className="block">• <strong>Giọng đọc phát âm:</strong> Tự động tích hợp Text-to-Speech (TTS) đọc bài đọc với giọng chuẩn Nhật Bản.</span>
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
                <span>Bản dịch tiếng Việt (Passage Translation)</span>
                <span className="text-[11px] font-normal text-gray-400">Hiển thị khi học viên xem giải thích hoặc tra cứu</span>
              </label>
              <textarea
                rows={6}
                value={passageTranslation}
                onChange={(e) => setPassageTranslation(e.target.value)}
                placeholder="Nhập hoặc dán bản dịch tiếng Việt của bài đọc..."
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed font-sans"
              />
            </div>
          </div>
        )}

        {/* 1. Exam Name & Description */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs">
          <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
            Tên bài kiểm tra <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ví dụ: JLPT N5 Vocabulary - Bài 1 đến 5"
            required
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm sm:text-base"
          />

          <label className="block text-xs sm:text-sm font-bold text-gray-900 mt-4 mb-2">
            Mô tả bổ sung <span className="text-gray-400 font-normal">(không bắt buộc)</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ví dụ: Kiểm tra trợ từ, thể Te và từ vựng chào hỏi hàng ngày"
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-xs sm:text-sm"
          />
        </div>

        {/* 2. JSON Questions Editor */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
            <label className="block text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <FileCode2 className="w-4 h-4 text-gray-700" />
              <span>Chuỗi JSON câu hỏi</span>
              <span className="text-rose-500">*</span>
            </label>

            {/* Action Toolbar */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={handleCopyCurrent}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Sao chép toàn bộ JSON hiện tại"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã chép' : 'Copy JSON'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadJson}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Tải câu hỏi của đề này về máy (.json)"
              >
                <Download className="w-3.5 h-3.5 text-gray-700" />
                <span>Tải .json</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Tải lên file JSON mới để thay thế câu hỏi"
              >
                <Upload className="w-3.5 h-3.5 text-gray-700" />
                <span>Tải file mới</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-500 mb-3 leading-relaxed">
            Bạn có thể trực tiếp sửa câu hỏi, loại câu hỏi (<code className="font-mono text-gray-700">question_type: "fill_blank" | "multiple_choice"</code>), đáp án đúng (<code className="font-mono text-gray-700">answer: 0..3</code>), hoặc giải thích tại đây.
          </p>

          <div className="relative">
            <textarea
              rows={14}
              value={jsonString}
              onChange={(e) => handleJsonChange(e.target.value)}
              className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all leading-relaxed"
            />
          </div>

          {/* Validation Status Preview */}
          {validationError && (
            <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-rose-700 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="flex-1">{validationError}</div>
            </div>
          )}

          {parsedQuestions && (
            <div className="mt-3 space-y-3">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-800 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    JSON hợp lệ: Đang có <strong>{parsedQuestions.length} câu hỏi</strong>
                    {selectedCategory === 'reading' && (
                      <span className="text-xs text-emerald-700 ml-1.5 font-normal">
                        ({parsedQuestions.filter((q) => (q.question_type || q.type) === 'fill_blank').length} câu điền từ,{' '}
                        {parsedQuestions.filter((q) => (q.question_type || q.type) !== 'fill_blank').length} câu chọn đáp án)
                      </span>
                    )}
                  </span>
                </div>
                <span className="text-[11px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                  Hợp lệ
                </span>
              </div>

              {/* Reading Preview Box */}
              {selectedCategory === 'reading' && passage.trim() && (
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <BookMarked className="w-4 h-4 text-indigo-600" />
                    <span>Xem trước giao diện bài đọc tiếng Nhật:</span>
                  </div>
                  <JapanesePassageReader
                    passage={passage}
                    translation={passageTranslation}
                    level={level}
                    isReviewMode={true}
                    defaultShowTranslation={false}
                  />
                </div>
              )}

              {/* Questions Preview Box */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3 text-xs sm:text-sm">
                <p className="text-xs font-bold text-gray-700">
                  Danh sách câu hỏi ({parsedQuestions.length} câu):
                </p>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {parsedQuestions.map((q, idx) => {
                    const isFillBlank = (q.question_type || q.type) === 'fill_blank';
                    return (
                      <div key={idx} className="p-2.5 bg-white border border-gray-200 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-gray-900">
                            Câu {idx + 1}: {q.question}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                            isFillBlank
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {isFillBlank ? (
                              <>
                                <Edit3 className="w-2.5 h-2.5" />
                                Điền chỗ trống
                              </>
                            ) : (
                              <>
                                <CheckSquare className="w-2.5 h-2.5" />
                                Chọn đáp án
                              </>
                            )}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-600">
                          {q.options.map((opt, optIdx) => (
                            <div
                              key={optIdx}
                              className={`px-1.5 py-0.5 rounded ${
                                optIdx === q.answer ? 'bg-emerald-50 text-emerald-800 font-bold' : ''
                              }`}
                            >
                              {['A', 'B', 'C', 'D'][optIdx]}. {opt}
                            </div>
                          ))}
                        </div>
                        {q.explanation && (
                          <p className="text-[11px] text-gray-500 italic pt-1 border-t border-gray-50">
                            💡 Giải thích: {q.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Time Mode & Advanced Settings */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-5 sm:space-y-6">
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-700" />
            <span>Chế độ thời gian làm bài</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* Unlimited Option */}
            <label
              className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                timeMode === 'unlimited'
                  ? 'border-gray-900 bg-gray-900/5 ring-1 ring-gray-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="timeMode"
                checked={timeMode === 'unlimited'}
                onChange={() => setTimeMode('unlimited')}
                className="mt-1 text-gray-900 focus:ring-gray-900"
              />
              <div>
                <span className="block text-xs sm:text-sm font-bold text-gray-900">Không giới hạn</span>
                <span className="text-xs text-gray-500">Thong thả làm bài và học giải thích</span>
              </div>
            </label>

            {/* Limited Option */}
            <label
              className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                timeMode === 'limited'
                  ? 'border-gray-900 bg-gray-900/5 ring-1 ring-gray-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="timeMode"
                checked={timeMode === 'limited'}
                onChange={() => setTimeMode('limited')}
                className="mt-1 text-gray-900 focus:ring-gray-900"
              />
              <div>
                <span className="block text-xs sm:text-sm font-bold text-gray-900">Giới hạn thời gian</span>
                <span className="text-xs text-gray-500">Mô phỏng áp lực phòng thi thật</span>
              </div>
            </label>
          </div>

          {/* Time Input if Limited */}
          {timeMode === 'limited' && (
            <div className="p-3.5 sm:p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <label className="block text-xs font-bold text-gray-700">
                Thời lượng bài thi (phút)
              </label>

              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="number"
                  min={1}
                  max={180}
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 sm:w-28 px-3 py-2 bg-white border border-gray-300 rounded-xl font-semibold text-gray-900 text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">phút</span>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 ml-auto flex-wrap">
                  {[10, 15, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setTimeLimitMinutes(mins)}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                        timeLimitMinutes === mins
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <hr className="border-gray-100" />

          {/* Advanced Features (Shuffle questions, Shuffle answers) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Shuffle className="w-3.5 h-3.5" />
              <span>Tùy chọn nâng cao</span>
            </h4>

            <div className="space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shuffleQuestions}
                  onChange={(e) => setShuffleQuestions(e.target.checked)}
                  className="w-4 h-4 rounded text-gray-900 focus:ring-gray-900"
                />
                <span className="text-xs sm:text-sm text-gray-700">
                  <strong>Xáo trộn câu hỏi</strong> (Shuffle questions khi làm bài)
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shuffleOptions}
                  onChange={(e) => setShuffleOptions(e.target.checked)}
                  className="w-4 h-4 rounded text-gray-900 focus:ring-gray-900"
                />
                <span className="text-xs sm:text-sm text-gray-700">
                  <strong>Xáo trộn đáp án</strong> (Randomize vị trí 4 phương án A/B/C/D)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => navigate('/manage')}
            className="px-4 sm:px-5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Hủy
          </button>

          <button
            type="submit"
            disabled={isSubmitting || !title || !jsonString || !!validationError}
            className="px-5 sm:px-6 py-2.5 rounded-xl bg-gray-900 text-white font-semibold text-xs sm:text-sm hover:bg-black transition-all shadow-xs active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang lưu thay đổi...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
