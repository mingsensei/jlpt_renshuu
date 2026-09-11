import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FileCode2,
  Clock,
  Shuffle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Download,
  Upload,
  Copy,
  Check,
  FolderPlus
} from 'lucide-react';
import { examService } from '../lib/examService';
import type { RawQuestionInput, Lesson, ExamCategory } from '../types/exam';
import { CATEGORY_TABS } from '../types/exam';
import { SAMPLE_JSON_INPUT } from '../data/sampleExams';

export const CreateExam: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramLessonId = searchParams.get('lessonId');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jsonString, setJsonString] = useState('');
  const [timeMode, setTimeMode] = useState<'unlimited' | 'limited'>('limited');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleOptions, setShuffleOptions] = useState(false);

  // Category and Lesson states
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory>('vocabulary');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [showNewLessonForm, setShowNewLessonForm] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDesc, setNewLessonDesc] = useState('');
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [parsedQuestions, setParsedQuestions] = useState<RawQuestionInput[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Lessons
  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await examService.getLessons();
        setAllLessons(data);

        if (paramLessonId) {
          const matched = data.find((l) => l.id === paramLessonId);
          if (matched) {
            setSelectedCategory(matched.category);
            setSelectedLessonId(matched.id);
            return;
          }
        }

        const vocabLessons = data.filter((l) => l.category === 'vocabulary');
        if (vocabLessons.length > 0) {
          setSelectedLessonId(vocabLessons[0].id);
        }
      } catch (err) {
        console.error('Error loading lessons in CreateExam:', err);
      }
    };
    loadLessons();
  }, [paramLessonId]);

  const handleCategoryChange = (cat: ExamCategory) => {
    setSelectedCategory(cat);
    const inCategory = allLessons.filter((l) => l.category === cat);
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
      const created = await examService.createLesson(
        selectedCategory,
        newLessonTitle.trim(),
        newLessonDesc.trim()
      );
      setAllLessons((prev) => [...prev, created]);
      setSelectedLessonId(created.id);
      setNewLessonTitle('');
      setNewLessonDesc('');
      setShowNewLessonForm(false);
    } catch (err: any) {
      alert('Không thể tạo bài học mới: ' + (err.message || err));
    } finally {
      setIsCreatingLesson(false);
    }
  };

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

    if (!Array.isArray(parsed)) {
      return { isValid: false, questions: null, error: 'Dữ liệu JSON phải là một mảng [] danh sách câu hỏi.' };
    }

    if (parsed.length === 0) {
      return { isValid: false, questions: null, error: 'Mảng JSON câu hỏi không được rỗng.' };
    }

    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
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

    return { isValid: true, questions: parsed as RawQuestionInput[], error: null };
  };

  const handleJsonChange = (value: string) => {
    setJsonString(value);
    if (value.trim()) {
      const result = validateJson(value);
      if (result.isValid) {
        setValidationError(null);
        setParsedQuestions(result.questions);
      } else {
        setValidationError(result.error);
        setParsedQuestions(null);
      }
    } else {
      setValidationError(null);
      setParsedQuestions(null);
    }
  };

  const handlePasteSample = () => {
    const formatted = JSON.stringify(SAMPLE_JSON_INPUT, null, 2);
    setJsonString(formatted);
    handleJsonChange(formatted);
    if (!title) {
      setTitle('JLPT N5 Ngữ pháp & Từ vựng mẫu');
    }
  };

  const handleDownloadTemplate = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SAMPLE_JSON_INPUT, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "exam_template.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(SAMPLE_JSON_INPUT, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Không thể sao chép tự động, vui lòng tải file mẫu.');
    }
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

    if (!title.trim()) {
      alert('Vui lòng nhập tên bài kiểm tra.');
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

      const newId = await examService.createExam(
        title.trim(),
        description.trim(),
        timeLimitSeconds,
        result.questions,
        shuffleQuestions,
        shuffleOptions,
        selectedLessonId || null
      );

      navigate(`/exam/${newId}`);
    } catch (err: any) {
      console.error(err);
      alert(`Đã xảy ra lỗi khi tạo bài thi: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCategoryLessons = allLessons.filter((l) => l.category === selectedCategory);

  return (
    <div className="max-w-3xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-gray-900 mb-4 sm:mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại danh sách</span>
      </button>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Tạo bài kiểm tra mới
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Chọn nhóm đề, bài học và dán chuỗi JSON câu hỏi để tạo bài thi tự động.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* 1. Category and Lesson Selection */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
              Nhóm chuyên đề <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
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
                <p className="text-xs font-bold text-gray-800">Tạo nhanh bài học mới:</p>
                <input
                  type="text"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="Tên bài học (ví dụ: Bài 4: Mua sắm & Ăn uống)"
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
            ) : currentCategoryLessons.length > 0 ? (
              <select
                value={selectedLessonId}
                onChange={(e) => setSelectedLessonId(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
              >
                {currentCategoryLessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between">
                <span>Chưa có bài học nào trong nhóm này. Hãy tạo bài học đầu tiên.</span>
                <button
                  type="button"
                  onClick={() => setShowNewLessonForm(true)}
                  className="font-bold underline ml-2"
                >
                  Tạo bài học
                </button>
              </div>
            )}
          </div>
        </div>
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

        {/* 2. JSON Input Area */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
            <label className="block text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <FileCode2 className="w-4 h-4 text-gray-700" />
              <span>Chuỗi JSON câu hỏi</span>
              <span className="text-rose-500">*</span>
            </label>

            {/* Mobile-friendly Action Toolbar */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={handlePasteSample}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Dán nhanh mẫu câu hỏi demo"
              >
                <Sparkles className="w-3.5 h-3.5 text-gray-800" />
                <span>Dán mẫu</span>
              </button>

              <button
                type="button"
                onClick={handleCopyTemplate}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Sao chép template JSON"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã chép' : 'Copy mẫu'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Tải file exam_template.json về máy"
              >
                <Download className="w-3.5 h-3.5 text-gray-700" />
                <span>Tải .json</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Tải lên file JSON từ máy tính"
              >
                <Upload className="w-3.5 h-3.5 text-gray-700" />
                <span>Tải file</span>
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
            Format: Mảng các câu hỏi với <code className="font-mono text-gray-700">question</code>,{' '}
            <code className="font-mono text-gray-700">options</code> (4 lựa chọn),{' '}
            <code className="font-mono text-gray-700">answer</code> (0..3), và{' '}
            <code className="font-mono text-gray-700">explanation</code>.
          </p>

          <div className="relative">
            <textarea
              rows={12}
              value={jsonString}
              onChange={(e) => handleJsonChange(e.target.value)}
              placeholder={`[\n  {\n    "question": "「食べます」のて形はどれですか？",\n    "options": ["食べて", "食べた", "食べる", "食べない"],\n    "answer": 0,\n    "explanation": "食べます is group 2 verb..."\n  }\n]`}
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
            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-800 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>JSON hợp lệ: Phát hiện <strong>{parsedQuestions.length} câu hỏi</strong></span>
              </div>
              <span className="text-[11px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                Sẵn sàng tạo
              </span>
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
            onClick={() => navigate('/')}
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
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang tạo bài thi...</span>
              </>
            ) : (
              <span>Tạo bài thi (Create Exam)</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
