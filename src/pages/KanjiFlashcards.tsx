import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Layers,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  Star,
  Shuffle,
  Eye,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  Search,
  BookOpen,
  Copy,
  AlertCircle,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KANJI_N3_DATA } from '../data/kanjiN3';
import type { KanjiItem } from '../data/kanjiN3';

// Storage keys
const STORAGE_KNOWN_KEY = 'jlpt_kanji_n3_known_v1';
const STORAGE_STARRED_KEY = 'jlpt_kanji_n3_starred_v1';

type ViewMode = 'flashcards' | 'known_list' | 'all_list' | 'quiz';
type CardFrontMode = 'kanji' | 'meaning';
type QuizQuestionType = 'kanji_to_hanviet' | 'kanji_to_meaning' | 'meaning_to_kanji' | 'mixed';

interface QuizQuestion {
  id: number;
  kanjiItem: KanjiItem;
  questionText: string;
  questionSubtext?: string;
  options: string[];
  correctAnswer: string;
  type: 'hanviet' | 'meaning' | 'kanji';
}

export const KanjiFlashcards: React.FC = () => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<ViewMode>('flashcards');

  // Mastered / Known Kanji IDs
  const [knownIds, setKnownIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KNOWN_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Starred Kanji IDs
  const [starredIds, setStarredIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_STARRED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Settings
  const [cardFrontMode, setCardFrontMode] = useState<CardFrontMode>('kanji');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [filterRange, setFilterRange] = useState<string>('all'); // 'all', '1-50', '51-100', ...
  const [filterSource, setFilterSource] = useState<'unlearned' | 'starred' | 'all'>('unlearned');

  // Flashcard Deck State
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
  const [copyNotification, setCopyNotification] = useState<string | null>(null);

  // Search & Filter in list tabs
  const [listSearch, setListSearch] = useState('');

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(0);
  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizQuestionCount, setQuizQuestionCount] = useState<number>(10);
  const [quizType, setQuizType] = useState<QuizQuestionType>('mixed');
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KNOWN_KEY, JSON.stringify(knownIds));
    } catch (e) {
      console.error('Error saving known kanji to localStorage', e);
    }
  }, [knownIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_STARRED_KEY, JSON.stringify(starredIds));
    } catch (e) {
      console.error('Error saving starred kanji to localStorage', e);
    }
  }, [starredIds]);

  // Text to speech for Japanese
  const speakJapanese = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }, []);

  // Filter raw data based on range
  const rangeFilteredData = useMemo(() => {
    if (filterRange === 'all') return KANJI_N3_DATA;
    const [start, end] = filterRange.split('-').map(Number);
    return KANJI_N3_DATA.filter((item) => item.id >= start && item.id <= end);
  }, [filterRange]);

  // Flashcards active study pool
  const studyDeck = useMemo(() => {
    let pool = rangeFilteredData;

    if (filterSource === 'unlearned') {
      // Exclude known cards
      pool = pool.filter((item) => !knownIds.includes(item.id));
    } else if (filterSource === 'starred') {
      // Only starred
      pool = pool.filter((item) => starredIds.includes(item.id));
    }

    if (isShuffled && shuffledOrder.length === pool.length) {
      return shuffledOrder.map((idx) => pool[idx]).filter(Boolean);
    }

    return pool;
  }, [rangeFilteredData, filterSource, knownIds, starredIds, isShuffled, shuffledOrder]);

  // Reset or adjust index if deck changes
  useEffect(() => {
    if (currentIndex >= studyDeck.length && studyDeck.length > 0) {
      setCurrentIndex(studyDeck.length - 1);
    }
    setIsFlipped(false);
  }, [studyDeck.length, currentIndex]);

  // Current Card
  const currentCard = studyDeck[currentIndex] as KanjiItem | undefined;

  // Speak when card changes or flips if autoSpeak is on
  useEffect(() => {
    if (autoSpeak && currentCard) {
      speakJapanese(currentCard.kanji);
    }
  }, [currentIndex, autoSpeak, currentCard, speakJapanese]);

  // Shuffle toggle
  const toggleShuffle = () => {
    if (!isShuffled) {
      const indices = studyDeck.map((_, i) => i);
      // Fisher-Yates shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledOrder(indices);
      setIsShuffled(true);
      setCurrentIndex(0);
      setIsFlipped(false);
    } else {
      setIsShuffled(false);
      setShuffledOrder([]);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  // Mark as Known (Đã biết -> loại khỏi flashcard)
  const handleMarkKnown = useCallback(() => {
    if (!currentCard) return;
    const cardId = currentCard.id;

    // Add to known IDs
    setKnownIds((prev) => (prev.includes(cardId) ? prev : [...prev, cardId]));

    // Trigger celebration if this is the last card
    if (studyDeck.length <= 1) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    setIsFlipped(false);
  }, [currentCard, studyDeck.length]);

  // Mark as Need Review / Unknown (Chưa biết / Cần ôn lại -> giữ lại và xem tiếp)
  const handleNeedReview = useCallback(() => {
    if (!currentCard) return;
    setIsFlipped(false);
    if (currentIndex < studyDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to start
      setCurrentIndex(0);
    }
  }, [currentCard, currentIndex, studyDeck.length]);

  // Next / Prev card
  const handleNext = () => {
    if (studyDeck.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % studyDeck.length);
  };

  const handlePrev = () => {
    if (studyDeck.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + studyDeck.length) % studyDeck.length);
  };

  // Toggle Star
  const toggleStar = useCallback((id: number) => {
    setStarredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  // Unmark a known card (chuyển lại về chưa học)
  const handleUnmarkKnown = (id: number) => {
    setKnownIds((prev) => prev.filter((item) => item !== id));
  };

  // Keyboard Shortcuts for flashcard learning
  useEffect(() => {
    if (activeTab !== 'flashcards' || !currentCard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is in an input field
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowLeft' || e.key === '1') {
        e.preventDefault();
        handleNeedReview();
      } else if (e.code === 'ArrowRight' || e.key === '2') {
        e.preventDefault();
        handleMarkKnown();
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        if (currentCard) toggleStar(currentCard.id);
      } else if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        if (currentCard) speakJapanese(currentCard.kanji);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, currentCard, handleMarkKnown, handleNeedReview, toggleStar, speakJapanese]);

  // Export / Copy known kanji list
  const handleCopyKnownList = () => {
    const knownKanji = KANJI_N3_DATA.filter((k) => knownIds.includes(k.id));
    if (knownKanji.length === 0) {
      alert('Chưa có Kanji nào trong danh sách Đã biết.');
      return;
    }

    const text = knownKanji
      .map(
        (k, idx) =>
          `${idx + 1}. ${k.kanji} (${k.hanViet}) - On: ${k.on || '-'}, Kun: ${k.kun || '-'} - Nghĩa: ${k.meaning}`
      )
      .join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopyNotification(`Đã sao chép danh sách ${knownKanji.length} Kanji đã biết vào clipboard!`);
      setTimeout(() => setCopyNotification(null), 3000);
    });
  };

  // Reset all known progress
  const handleResetProgress = () => {
    if (
      window.confirm(
        'Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ? Tất cả các Kanji đã đánh dấu "Đã biết" sẽ trở về trạng thái cần học.'
      )
    ) {
      setKnownIds([]);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  // Generate Quiz from Known Kanji
  const startQuizFromKnown = () => {
    const knownKanjiList = KANJI_N3_DATA.filter((k) => knownIds.includes(k.id));
    if (knownKanjiList.length < 4) {
      alert(
        'Bạn cần đánh dấu ít nhất 4 Kanji "Đã biết" trong thẻ Flashcard trước khi bắt đầu tạo bài trắc nghiệm!'
      );
      return;
    }

    // Pick random subset of known kanji
    const shuffled = [...knownKanjiList].sort(() => 0.5 - Math.random());
    const targetCount = Math.min(quizQuestionCount, shuffled.length);
    const selectedKanji = shuffled.slice(0, targetCount);

    const questions: QuizQuestion[] = selectedKanji.map((item, qIndex) => {
      // Determine question type
      let qType: 'hanviet' | 'meaning' | 'kanji' = 'hanviet';
      if (quizType === 'mixed') {
        const types: ('hanviet' | 'meaning' | 'kanji')[] = ['hanviet', 'meaning', 'kanji'];
        qType = types[Math.floor(Math.random() * types.length)];
      } else if (quizType === 'kanji_to_hanviet') {
        qType = 'hanviet';
      } else if (quizType === 'kanji_to_meaning') {
        qType = 'meaning';
      } else if (quizType === 'meaning_to_kanji') {
        qType = 'kanji';
      }

      // Pick 3 distractors from all kanji data
      const pool = KANJI_N3_DATA.filter((k) => k.id !== item.id);
      const distractors = [...pool].sort(() => 0.5 - Math.random()).slice(0, 3);

      let questionText = '';
      let questionSubtext = '';
      let correctAnswer = '';
      let options: string[] = [];

      if (qType === 'hanviet') {
        questionText = item.kanji;
        questionSubtext = `Nghĩa: ${item.meaning}`;
        correctAnswer = item.hanViet;
        options = [item.hanViet, ...distractors.map((d) => d.hanViet)];
      } else if (qType === 'meaning') {
        questionText = item.kanji;
        questionSubtext = `Âm Hán: ${item.hanViet}`;
        correctAnswer = item.meaning;
        options = [item.meaning, ...distractors.map((d) => d.meaning)];
      } else {
        questionText = `${item.hanViet} (${item.meaning})`;
        questionSubtext = 'Chọn chữ Hán Kanji tương ứng';
        correctAnswer = item.kanji;
        options = [item.kanji, ...distractors.map((d) => d.kanji)];
      }

      // Shuffle options
      options = options.sort(() => 0.5 - Math.random());

      return {
        id: qIndex + 1,
        kanjiItem: item,
        questionText,
        questionSubtext,
        options,
        correctAnswer,
        type: qType
      };
    });

    setQuizQuestions(questions);
    setQuizCurrentIndex(0);
    setQuizUserAnswers({});
    setQuizSubmitted(false);
    setIsQuizActive(true);
    setActiveTab('quiz');
  };

  // Handle Quiz answer select
  const handleSelectQuizAnswer = (option: string) => {
    if (quizSubmitted) return;
    setQuizUserAnswers((prev) => ({
      ...prev,
      [quizCurrentIndex]: option
    }));
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    // calculate score
    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizUserAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    if (correct / quizQuestions.length >= 0.7) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Derived Statistics
  const totalKanji = KANJI_N3_DATA.length;
  const knownCount = knownIds.length;
  const remainingCount = Math.max(0, totalKanji - knownCount);
  const masteredPercent = Math.round((knownCount / totalKanji) * 100);

  // List of known items
  const knownKanjiItems = useMemo(() => {
    return KANJI_N3_DATA.filter((k) => knownIds.includes(k.id));
  }, [knownIds]);

  // Filtered lists for list tab
  const filteredKnownList = useMemo(() => {
    if (!listSearch.trim()) return knownKanjiItems;
    const query = listSearch.toLowerCase();
    return knownKanjiItems.filter(
      (k) =>
        k.kanji.includes(query) ||
        k.hanViet.toLowerCase().includes(query) ||
        k.meaning.toLowerCase().includes(query) ||
        k.on.toLowerCase().includes(query) ||
        k.kun.toLowerCase().includes(query)
    );
  }, [knownKanjiItems, listSearch]);

  const filteredAllList = useMemo(() => {
    let list = KANJI_N3_DATA;
    if (filterRange !== 'all') {
      const [start, end] = filterRange.split('-').map(Number);
      list = list.filter((item) => item.id >= start && item.id <= end);
    }
    if (!listSearch.trim()) return list;
    const query = listSearch.toLowerCase();
    return list.filter(
      (k) =>
        k.kanji.includes(query) ||
        k.hanViet.toLowerCase().includes(query) ||
        k.meaning.toLowerCase().includes(query) ||
        k.on.toLowerCase().includes(query) ||
        k.kun.toLowerCase().includes(query)
    );
  }, [filterRange, listSearch]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Toast Notification */}
      {copyNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{copyNotification}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quizlet Mode • 370 Kanji N3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Thẻ Flashcard Kanji N3
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Ghi nhớ trọn bộ 370 chữ Hán N3 chuẩn thi JLPT. Đánh dấu đã biết để tự động loại bỏ thẻ!
          </p>
        </div>

        {/* Global Progress Widget */}
        <div className="bg-white border border-gray-200 rounded-2xl p-3.5 sm:p-4 shadow-xs flex items-center gap-4">
          <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-500 stroke-current"
                strokeWidth="3.5"
                strokeDasharray={`${masteredPercent}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-gray-800">{masteredPercent}%</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-600">{knownCount} đã thuộc</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{remainingCount} cần học</span>
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              Tổng số: {totalKanji} chữ Hán N3
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-3 gap-3 mb-6">
        <div className="flex items-center gap-1.5 p-1 bg-gray-100/80 rounded-xl">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Luyện Thẻ ({studyDeck.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('known_list')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'known_list'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Đã Biết ({knownCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('all_list')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'all_list'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span>Toàn Bộ ({totalKanji})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('quiz');
              if (!isQuizActive && knownCount >= 4) {
                startQuizFromKnown();
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Trophy className="w-4 h-4 text-indigo-600" />
            <span>Trắc Nghiệm Kanji</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {knownCount > 0 && (
            <button
              onClick={handleCopyKnownList}
              title="Sao chép danh sách Kanji đã biết"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Kanji đã biết</span>
            </button>
          )}

          {knownCount > 0 && (
            <button
              onClick={handleResetProgress}
              title="Đặt lại toàn bộ tiến độ"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: FLASHCARD PLAYER */}
      {/* ========================================================= */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6">
          {/* Deck Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-gray-200">
            {/* Filter source */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Chế độ học:</span>
              <select
                value={filterSource}
                onChange={(e) => {
                  setFilterSource(e.target.value as any);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 outline-none focus:border-gray-900 cursor-pointer"
              >
                <option value="unlearned">Chỉ từ chưa biết ({totalKanji - knownCount})</option>
                <option value="all">Tất cả ({totalKanji})</option>
                <option value="starred">Đã gắn sao ({starredIds.length})</option>
              </select>

              {/* Range filter */}
              <select
                value={filterRange}
                onChange={(e) => {
                  setFilterRange(e.target.value);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 outline-none focus:border-gray-900 cursor-pointer"
              >
                <option value="all">Tất cả STT (1-370)</option>
                <option value="1-50">STT 1 - 50</option>
                <option value="51-100">STT 51 - 100</option>
                <option value="101-150">STT 101 - 150</option>
                <option value="151-200">STT 151 - 200</option>
                <option value="201-250">STT 201 - 250</option>
                <option value="251-300">STT 251 - 300</option>
                <option value="301-370">STT 301 - 370</option>
              </select>
            </div>

            {/* Quick toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleShuffle}
                title="Trộn ngẫu nhiên thẻ"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isShuffled
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Trộn thẻ</span>
              </button>

              <button
                onClick={() => setAutoSpeak(!autoSpeak)}
                title="Tự động phát âm khi lật hoặc chuyển thẻ"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  autoSpeak
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Tự đọc âm</span>
              </button>

              <button
                onClick={() => setCardFrontMode((prev) => (prev === 'kanji' ? 'meaning' : 'kanji'))}
                title="Đổi mặt hiển thị trước"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Mặt trước: {cardFrontMode === 'kanji' ? 'Kanji' : 'Nghĩa'}</span>
              </button>
            </div>
          </div>

          {/* Flashcard Area */}
          {studyDeck.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                🎉
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Chúc mừng! Bạn đã hoàn thành tất cả các thẻ trong mục này!
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Tất cả thẻ trong bộ đã được đánh dấu là <b>Đã biết</b> ({knownCount} từ). Bạn có thể
                tạo bài kiểm tra trắc nghiệm ngay để kiểm tra độ nhớ, hoặc đặt lại để ôn lại.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    startQuizFromKnown();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-all shadow-sm cursor-pointer"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Làm Trắc Nghiệm Ngay</span>
                </button>
                <button
                  onClick={() => {
                    setFilterSource('all');
                    setCurrentIndex(0);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-800 font-semibold text-sm hover:bg-gray-200 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ôn lại toàn bộ (370 từ)</span>
                </button>
              </div>
            </div>
          ) : currentCard ? (
            <div className="max-w-xl mx-auto space-y-4">
              {/* Card Index & Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 px-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-800">
                    STT #{currentCard.id}
                  </span>
                  <span>
                    Thẻ {currentIndex + 1} / {studyDeck.length}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">Phím tắt: Space (Lật) • 1 (Chưa biết) • 2 (Đã biết)</span>
                </div>
              </div>

              {/* 3D Flashcard Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                role="button"
                tabIndex={0}
                aria-label="Lật thẻ flashcard"
                className="w-full h-80 sm:h-96 perspective-1000 cursor-pointer select-none group"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-gray-200 hover:border-gray-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakJapanese(currentCard.kanji);
                        }}
                        title="Nghe phát âm"
                        className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>

                      <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        {cardFrontMode === 'kanji' ? 'Mặt trước: Chữ Hán' : 'Mặt trước: Nghĩa'}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(currentCard.id);
                        }}
                        title="Đánh dấu sao"
                        className="p-2.5 rounded-xl hover:bg-amber-50 text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            starredIds.includes(currentCard.id)
                              ? 'text-amber-500 fill-amber-500'
                              : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Middle Content */}
                    <div className="text-center my-auto">
                      {cardFrontMode === 'kanji' ? (
                        <>
                          <div className="text-7xl sm:text-8xl font-medium font-japanese-gothic text-gray-900 tracking-wider">
                            {currentCard.kanji}
                          </div>
                          <div className="mt-4 text-xs font-medium text-gray-400">
                            Nhấp hoặc nhấn [Space] để xem nghĩa & cách đọc
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                            {currentCard.meaning}
                          </div>
                          <div className="text-lg font-bold text-indigo-600">
                            Hán Việt: {currentCard.hanViet}
                          </div>
                          <div className="mt-4 text-xs font-medium text-gray-400">
                            Nhấp để lật xem chữ Hán
                          </div>
                        </>
                      )}
                    </div>

                    {/* Bottom hint */}
                    <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Nhấp để lật mặt sau</span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-b from-gray-900 to-black text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                    {/* Top row */}
                    <div className="flex items-center justify-between text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold font-japanese-gothic text-white">
                          {currentCard.kanji}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(currentCard.kanji);
                          }}
                          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                        Mặt sau: Giải nghĩa chi tiết
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(currentCard.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            starredIds.includes(currentCard.id)
                              ? 'text-amber-400 fill-amber-400'
                              : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Middle: Details */}
                    <div className="my-auto space-y-4">
                      {/* Han-Viet Title */}
                      <div className="text-center">
                        <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1">
                          ÂM HÁN VIỆT
                        </div>
                        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                          {currentCard.hanViet}
                        </div>
                      </div>

                      {/* Meaning */}
                      <div className="bg-white/10 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-xs">
                        <div className="text-xs text-gray-300 uppercase tracking-wider mb-1 font-medium">
                          Nghĩa tiếng Việt
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-amber-300">
                          {currentCard.meaning}
                        </div>
                      </div>

                      {/* On / Kun readings */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                          <span className="text-[11px] font-semibold text-gray-400 block mb-0.5">
                            Âm On (Katakana)
                          </span>
                          <span className="text-sm sm:text-base font-bold text-sky-300 font-japanese-gothic">
                            {currentCard.on || '-'}
                          </span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                          <span className="text-[11px] font-semibold text-gray-400 block mb-0.5">
                            Âm Kun (Hiragana)
                          </span>
                          <span className="text-sm sm:text-base font-bold text-emerald-300 font-japanese-gothic">
                            {currentCard.kun || '-'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom hint */}
                    <div className="text-center text-xs text-gray-400">
                      Nhấn [Space] để lật lại • Chọn Đã biết hoặc Cần ôn
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Quizlet Style */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                {/* Need review button */}
                <button
                  onClick={handleNeedReview}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-sm sm:text-base shadow-xs active:scale-98 transition-all cursor-pointer"
                >
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>Chưa biết / Cần ôn</span>
                  <span className="hidden sm:inline-block text-[11px] font-normal text-gray-400 ml-1">
                    [Phím 1]
                  </span>
                </button>

                {/* Mastered / Known button */}
                <button
                  onClick={handleMarkKnown}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Đã biết (Ẩn thẻ)</span>
                  <span className="hidden sm:inline-block text-[11px] font-normal text-emerald-200 ml-1">
                    [Phím 2]
                  </span>
                </button>
              </div>

              {/* Navigation pagination bar */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Thẻ trước</span>
                </button>

                <div className="text-xs font-medium text-gray-400">
                  {currentIndex + 1} / {studyDeck.length} thẻ
                </div>

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <span>Thẻ sau</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: KNOWN KANJI LIST (NOTE LẠI) */}
      {/* ========================================================= */}
      {activeTab === 'known_list' && (
        <div className="space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Danh Sách Kanji Đã Ghi Nhớ ({knownCount} chữ)</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Đây là các Kanji bạn đã note là "Đã biết". Bạn có thể ôn lại, bỏ đánh dấu hoặc làm
                  trắc nghiệm ngay bên dưới.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {knownCount >= 4 ? (
                  <button
                    onClick={() => {
                      setActiveTab('quiz');
                      startQuizFromKnown();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all cursor-pointer"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Làm trắc nghiệm ({knownCount} từ)</span>
                  </button>
                ) : (
                  <span className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                    Cần ít nhất 4 từ để tạo trắc nghiệm
                  </span>
                )}

                <button
                  onClick={handleCopyKnownList}
                  disabled={knownCount === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
                placeholder="Tìm kiếm Kanji, Hán Việt, Nghĩa, On/Kun..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Grid of Known Cards */}
          {filteredKnownList.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-6 space-y-3">
              <AlertCircle className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="text-sm font-semibold text-gray-600">
                {knownCount === 0
                  ? 'Chưa có Kanji nào được đánh dấu "Đã biết".'
                  : 'Không tìm thấy Kanji phù hợp với từ khóa.'}
              </p>
              {knownCount === 0 && (
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:bg-black transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Vào học thẻ Flashcard ngay</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredKnownList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-semibold font-japanese-gothic text-gray-900">
                        {item.kanji}
                      </span>
                      <div>
                        <div className="text-base font-extrabold text-emerald-700">
                          {item.hanViet}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">#{item.id}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => speakJapanese(item.kanji)}
                        title="Nghe phát âm"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleStar(item.id)}
                        title="Đánh dấu sao"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            starredIds.includes(item.id) ? 'text-amber-500 fill-amber-500' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="font-semibold text-gray-500">Nghĩa: </span>
                      <span className="font-medium text-gray-900">{item.meaning}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-500">On: </span>
                      <span className="text-gray-700 font-japanese-gothic">{item.on || '-'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-500">Kun: </span>
                      <span className="text-gray-700 font-japanese-gothic">{item.kun || '-'}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Đã thuộc
                    </span>
                    <button
                      onClick={() => handleUnmarkKnown(item.id)}
                      title="Chuyển lại về chưa học"
                      className="text-gray-400 hover:text-rose-600 font-medium transition-colors cursor-pointer"
                    >
                      Học lại
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: ALL KANJI LIST (TOÀN BỘ 370 TỪ) */}
      {/* ========================================================= */}
      {activeTab === 'all_list' && (
        <div className="space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gray-700" />
                  <span>Bảng Tra Cứu Toàn Bộ 370 Kanji N3</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Xem toàn bộ 370 chữ Hán kèm STT, âm Hán-Việt, âm On/Kun và giải nghĩa chi tiết.
                </p>
              </div>

              {/* Range filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Lọc STT:</span>
                <select
                  value={filterRange}
                  onChange={(e) => setFilterRange(e.target.value)}
                  className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 outline-none focus:border-gray-900 cursor-pointer"
                >
                  <option value="all">Tất cả (1-370)</option>
                  <option value="1-50">1 - 50</option>
                  <option value="51-100">51 - 100</option>
                  <option value="101-150">101 - 150</option>
                  <option value="151-200">151 - 200</option>
                  <option value="201-250">201 - 250</option>
                  <option value="251-300">251 - 300</option>
                  <option value="301-370">301 - 370</option>
                </select>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
                placeholder="Tìm kiếm Kanji, Hán Việt, Nghĩa, On/Kun..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gray-900 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Grid of All Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredAllList.map((item) => {
              const isKnown = knownIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`border rounded-2xl p-4 transition-all flex flex-col justify-between space-y-3 ${
                    isKnown
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-semibold font-japanese-gothic text-gray-900">
                        {item.kanji}
                      </span>
                      <div>
                        <div
                          className={`text-base font-extrabold ${
                            isKnown ? 'text-emerald-700' : 'text-gray-900'
                          }`}
                        >
                          {item.hanViet}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">#{item.id}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => speakJapanese(item.kanji)}
                        title="Nghe phát âm"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleStar(item.id)}
                        title="Đánh dấu sao"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            starredIds.includes(item.id) ? 'text-amber-500 fill-amber-500' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="font-semibold text-gray-500">Nghĩa: </span>
                      <span className="font-medium text-gray-900">{item.meaning}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-500">On: </span>
                      <span className="text-gray-700 font-japanese-gothic">{item.on || '-'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-500">Kun: </span>
                      <span className="text-gray-700 font-japanese-gothic">{item.kun || '-'}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100/80 flex items-center justify-between text-xs">
                    {isKnown ? (
                      <>
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Đã thuộc
                        </span>
                        <button
                          onClick={() => handleUnmarkKnown(item.id)}
                          className="text-gray-400 hover:text-rose-600 font-medium transition-colors cursor-pointer"
                        >
                          Bỏ đánh dấu
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-400 font-medium">Chưa thuộc</span>
                        <button
                          onClick={() => setKnownIds((prev) => [...prev, item.id])}
                          className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors cursor-pointer"
                        >
                          + Đánh dấu đã biết
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: QUIZ MODE (TRẮC NGHIỆM KANJI ĐÃ BIẾT) */}
      {/* ========================================================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* If Quiz is NOT started */}
          {!isQuizActive ? (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Trophy className="w-7 h-7" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  Trắc Nghiệm Kiểm Tra Kanji Đã Biết
                </h2>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Tự động tạo đề thi trắc nghiệm dựa trên các chữ Hán mà bạn đã note là "Đã biết" ({knownCount} chữ).
                </p>
              </div>

              {knownCount < 4 ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 mx-auto" />
                  <p className="text-sm font-semibold text-amber-800">
                    Bạn hiện mới có {knownCount} Kanji được đánh dấu "Đã biết".
                  </p>
                  <p className="text-xs text-amber-700">
                    Vui lòng học và đánh dấu ít nhất 4 Kanji trong thẻ Flashcard để hệ thống tạo các
                    câu hỏi trắc nghiệm 4 đáp án.
                  </p>
                  <button
                    onClick={() => setActiveTab('flashcards')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Quay lại học Flashcard</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-5 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1.5">
                        Số lượng câu hỏi
                      </label>
                      <select
                        value={quizQuestionCount}
                        onChange={(e) => setQuizQuestionCount(Number(e.target.value))}
                        className="w-full text-sm font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-gray-900 cursor-pointer"
                      >
                        <option value={5}>5 câu ngắn</option>
                        <option value={10}>10 câu (Tiêu chuẩn)</option>
                        <option value={20}>20 câu</option>
                        <option value={30}>30 câu</option>
                        <option value={knownCount}>Toàn bộ ({knownCount} câu)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1.5">
                        Dạng câu hỏi
                      </label>
                      <select
                        value={quizType}
                        onChange={(e) => setQuizType(e.target.value as any)}
                        className="w-full text-sm font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-gray-900 cursor-pointer"
                      >
                        <option value="mixed">Ngẫu nhiên hỗn hợp</option>
                        <option value="kanji_to_hanviet">Kanji ➔ Âm Hán Việt</option>
                        <option value="kanji_to_meaning">Kanji ➔ Nghĩa tiếng Việt</option>
                        <option value="meaning_to_kanji">Hán Việt/Nghĩa ➔ Kanji</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={startQuizFromKnown}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>Bắt đầu làm bài kiểm tra</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ACTIVE QUIZ SCREEN */
            <div className="space-y-5">
              {/* Quiz Header & Progress */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-gray-500">
                    Câu hỏi {quizCurrentIndex + 1} / {quizQuestions.length}
                  </span>
                  <div className="w-32 sm:w-48 bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{
                        width: `${((quizCurrentIndex + 1) / quizQuestions.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (window.confirm('Bạn có muốn thoát bài trắc nghiệm này không?')) {
                        setIsQuizActive(false);
                      }
                    }}
                    className="text-xs font-semibold text-gray-400 hover:text-gray-700 px-2 py-1 cursor-pointer"
                  >
                    Thoát
                  </button>

                  {!quizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-3.5 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Nộp bài
                    </button>
                  ) : (
                    <button
                      onClick={startQuizFromKnown}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Làm đề mới</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Quiz Result Summary Banner (if submitted) */}
              {quizSubmitted && (
                <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 rounded-3xl shadow-md text-center space-y-2 animate-in fade-in duration-300">
                  <div className="text-2xl font-extrabold">
                    Kết quả:{' '}
                    {
                      quizQuestions.filter((q, idx) => quizUserAnswers[idx] === q.correctAnswer)
                        .length
                    }{' '}
                    / {quizQuestions.length} câu đúng
                  </div>
                  <p className="text-xs text-indigo-200">
                    Tỷ lệ chính xác:{' '}
                    {Math.round(
                      (quizQuestions.filter((q, idx) => quizUserAnswers[idx] === q.correctAnswer)
                        .length /
                        quizQuestions.length) *
                        100
                    )}
                    %
                  </p>
                </div>
              )}

              {/* Current Question Card */}
              {quizQuestions[quizCurrentIndex] && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                  {/* Question Prompt */}
                  <div className="text-center space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                      {quizQuestions[quizCurrentIndex].type === 'hanviet'
                        ? 'Chọn Âm Hán-Việt tương ứng'
                        : quizQuestions[quizCurrentIndex].type === 'meaning'
                        ? 'Chọn Nghĩa tiếng Việt'
                        : 'Chọn chữ Hán Kanji'}
                    </span>

                    <div className="text-5xl sm:text-6xl font-bold font-japanese-gothic text-gray-900 pt-2">
                      {quizQuestions[quizCurrentIndex].questionText}
                    </div>

                    {quizQuestions[quizCurrentIndex].questionSubtext && (
                      <div className="text-xs font-medium text-gray-500">
                        {quizQuestions[quizCurrentIndex].questionSubtext}
                      </div>
                    )}
                  </div>

                  {/* 4 Multiple Choice Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {quizQuestions[quizCurrentIndex].options.map((option, optIdx) => {
                      const isSelected = quizUserAnswers[quizCurrentIndex] === option;
                      const isCorrect = option === quizQuestions[quizCurrentIndex].correctAnswer;

                      let btnStyle =
                        'bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200 hover:border-gray-300';
                      if (isSelected) {
                        btnStyle = 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold';
                      }

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white border-rose-600 line-through';
                        } else {
                          btnStyle = 'bg-gray-50 text-gray-400 border-gray-200 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizAnswer(option)}
                          disabled={quizSubmitted}
                          className={`p-4 rounded-2xl border-2 text-center text-base sm:text-lg transition-all cursor-pointer ${btnStyle}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation if submitted */}
                  {quizSubmitted && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1">
                      <div className="font-bold text-gray-900">
                        Đáp án đúng: {quizQuestions[quizCurrentIndex].correctAnswer}
                      </div>
                      <div className="text-gray-600">
                        Kanji: {quizQuestions[quizCurrentIndex].kanjiItem.kanji} • Âm Hán:{' '}
                        {quizQuestions[quizCurrentIndex].kanjiItem.hanViet} • Nghĩa:{' '}
                        {quizQuestions[quizCurrentIndex].kanjiItem.meaning}
                      </div>
                      <div className="text-gray-500">
                        On: {quizQuestions[quizCurrentIndex].kanjiItem.on || '-'} | Kun:{' '}
                        {quizQuestions[quizCurrentIndex].kanjiItem.kun || '-'}
                      </div>
                    </div>
                  )}

                  {/* Question Navigation Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setQuizCurrentIndex((prev) => Math.max(0, prev - 1))}
                      disabled={quizCurrentIndex === 0}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Câu trước</span>
                    </button>

                    <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-xs py-1">
                      {quizQuestions.map((_, idx) => {
                        const isAnswered = quizUserAnswers[idx] !== undefined;
                        const isCurrent = idx === quizCurrentIndex;
                        return (
                          <button
                            key={idx}
                            onClick={() => setQuizCurrentIndex(idx)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-gray-900 text-white'
                                : isAnswered
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() =>
                        setQuizCurrentIndex((prev) =>
                          Math.min(quizQuestions.length - 1, prev + 1)
                        )
                      }
                      disabled={quizCurrentIndex === quizQuestions.length - 1}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 cursor-pointer"
                    >
                      <span>Câu sau</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KanjiFlashcards;
