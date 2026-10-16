import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Search,
  BookOpen,
  Sparkles,
  Layers,
  Lightbulb,
  ExternalLink,
  Video,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Download,
  X,
  FastForward
} from 'lucide-react';
import { N3_VOCAB_TOPICS } from '../data/n3VocabSlidesData';
import type { VocabTopic, VocabSlideItem } from '../data/n3VocabSlidesData';

export const VocabSlides: React.FC = () => {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slide' | 'grid' | 'video'>('slide');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Video Lecture Mode State
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState<number>(1.0);
  const [videoSubtitle, setVideoSubtitle] = useState<string>('');
  const [videoPhase, setVideoPhase] = useState<'word' | 'mnemonic' | 'example'>('word');
  const [autoAdvance, setAutoAdvance] = useState(true);

  // NotebookLM Studio Modal State
  const [isNotebookLMOpen, setIsNotebookLMOpen] = useState(false);
  const [copiedState, setCopiedState] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentTopic: VocabTopic = N3_VOCAB_TOPICS[currentTopicIndex] || N3_VOCAB_TOPICS[0];
  const currentSlide: VocabSlideItem | undefined = currentTopic.slides[currentSlideIndex];
  const totalSlides = currentTopic.slides.length;

  // Speak Japanese word
  const speakWord = useCallback((text: string, rate: number = 0.9) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ja-JP';
    utter.rate = rate;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, []);

  // Stop video lecture
  const stopVideoLecture = useCallback(() => {
    setIsVideoPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  // Video Lecture Engine Loop
  useEffect(() => {
    if (viewMode !== 'video' || !isVideoPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (!currentSlide) return;

    // Step 1: Speak word & set subtitle
    setVideoPhase('word');
    setVideoSubtitle(`🔊 ${currentSlide.word} 【${currentSlide.furigana}】: ${currentSlide.meaning_vn}`);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterWord = new SpeechSynthesisUtterance(currentSlide.word);
      utterWord.lang = 'ja-JP';
      utterWord.rate = 0.9 * videoSpeed;
      utterWord.onstart = () => setIsSpeaking(true);
      utterWord.onend = () => {
        setIsSpeaking(false);

        // Step 2: Show mnemonic & diagram
        setVideoPhase('mnemonic');
        setVideoSubtitle(
          `💡 Mẹo nhớ: ${currentSlide.mnemonic || currentSlide.diagram_caption || currentSlide.meaning_vn}`
        );

        const delay = Math.max(1400 / videoSpeed, 800);
        timerRef.current = setTimeout(() => {
          // Step 3: Speak example
          if (currentSlide.example?.sentence) {
            setVideoPhase('example');
            setVideoSubtitle(`📖 Ví dụ: ${currentSlide.example.translation}`);

            const utterEx = new SpeechSynthesisUtterance(currentSlide.example.sentence);
            utterEx.lang = 'ja-JP';
            utterEx.rate = 0.95 * videoSpeed;
            utterEx.onstart = () => setIsSpeaking(true);
            utterEx.onend = () => {
              setIsSpeaking(false);

              // Step 4: Advance to next slide
              timerRef.current = setTimeout(() => {
                if (autoAdvance) {
                  if (currentSlideIndex < totalSlides - 1) {
                    setCurrentSlideIndex((prev) => prev + 1);
                  } else if (currentTopicIndex < N3_VOCAB_TOPICS.length - 1) {
                    setCurrentTopicIndex((prev) => prev + 1);
                    setCurrentSlideIndex(0);
                  } else {
                    setIsVideoPlaying(false);
                    setVideoSubtitle('🎉 Hoàn thành xuất sắc bài giảng 20 chủ đề!');
                  }
                }
              }, Math.max(1500 / videoSpeed, 1000));
            };
            utterEx.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterEx);
          } else {
            timerRef.current = setTimeout(() => {
              if (autoAdvance && currentSlideIndex < totalSlides - 1) {
                setCurrentSlideIndex((prev) => prev + 1);
              } else {
                setIsVideoPlaying(false);
              }
            }, 1500);
          }
        }, delay);
      };
      utterWord.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterWord);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [viewMode, isVideoPlaying, currentSlideIndex, currentTopicIndex, videoSpeed, autoAdvance, currentSlide, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentSlideIndex < totalSlides - 1) {
          setCurrentSlideIndex((prev) => prev + 1);
        } else if (currentTopicIndex < N3_VOCAB_TOPICS.length - 1) {
          setCurrentTopicIndex((prev) => prev + 1);
          setCurrentSlideIndex(0);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSlideIndex > 0) {
          setCurrentSlideIndex((prev) => prev - 1);
        } else if (currentTopicIndex > 0) {
          setCurrentTopicIndex((prev) => prev - 1);
          setCurrentSlideIndex(N3_VOCAB_TOPICS[currentTopicIndex - 1].slides.length - 1);
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (viewMode === 'video') {
          setIsVideoPlaying((prev) => !prev);
        } else if (currentSlide) {
          speakWord(currentSlide.word);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides, currentTopicIndex, currentSlide, speakWord, viewMode]);

  // Copy NotebookLM Source to Clipboard
  const handleCopyNotebookLMSource = async () => {
    try {
      const topicFile = `/notebooklm_lectures/${currentTopic.topic_id}.md`;
      const res = await fetch(topicFile);
      if (res.ok) {
        const text = await res.text();
        await navigator.clipboard.writeText(text);
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2500);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Search matches across all topics
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const results: { topicIndex: number; slideIndex: number; slide: VocabSlideItem; topicTitle: string }[] = [];
    N3_VOCAB_TOPICS.forEach((t, tIdx) => {
      t.slides.forEach((s, sIdx) => {
        if (
          s.word.toLowerCase().includes(q) ||
          s.furigana.toLowerCase().includes(q) ||
          s.han_viet.toLowerCase().includes(q) ||
          s.meaning_vn.toLowerCase().includes(q) ||
          s.romaji.toLowerCase().includes(q)
        ) {
          results.push({
            topicIndex: tIdx,
            slideIndex: sIdx,
            slide: s,
            topicTitle: t.title
          });
        }
      });
    });
    return results;
  }, [searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              JLPT N3 Sơ đồ trực quan
            </span>
            <span className="text-xs text-gray-500 font-medium">20 Chủ đề • 200 Slide</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mt-1">
            20 Chủ Đề Từ Vựng N3 Minh Họa Slide
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Sơ đồ hình ảnh so sánh trực quan mô phỏng bài học sinh động, hỗ trợ Video Bài Giảng & NotebookLM.
          </p>
        </div>

        {/* View Mode Toggle & Search */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ vựng N3..."
              className="w-36 sm:w-48 pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs text-gray-400 hover:text-gray-600 font-bold"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex rounded-xl bg-gray-100 p-1 border border-gray-200/70">
            <button
              onClick={() => {
                stopVideoLecture();
                setViewMode('slide');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'slide' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Slide</span>
            </button>
            <button
              onClick={() => {
                stopVideoLecture();
                setViewMode('grid');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Lưới</span>
            </button>
            <button
              onClick={() => {
                setViewMode('video');
                setIsVideoPlaying(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'video'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video AI</span>
            </button>
          </div>

          {/* NotebookLM Studio Button */}
          <button
            onClick={() => setIsNotebookLMOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition shadow-xs"
            title="Mở tài liệu nguồn NotebookLM & Hướng dẫn tạo Video Podcast"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>NotebookLM</span>
          </button>

          {/* Standalone Viewer Link */}
          <a
            href="/n3_vocab_slides/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 transition shadow-xs"
            title="Mở giao diện Slide toàn màn hình độc lập"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Bản Offline</span>
          </a>
        </div>
      </div>

      {/* Search results dropdown if searching */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold text-gray-700 mb-2 flex items-center justify-between">
            <span>Kết quả tìm kiếm ({searchResults.length} từ phù hợp):</span>
            <span className="text-[11px] text-gray-400">Nhấp để xem thẻ</span>
          </div>
          {searchResults.length === 0 ? (
            <p className="text-xs text-gray-500 italic py-2">Không tìm thấy từ vựng nào khớp với từ khóa.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentTopicIndex(res.topicIndex);
                    setCurrentSlideIndex(res.slideIndex);
                    setSearchQuery('');
                    setViewMode('slide');
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 text-left transition"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-gray-900">{res.slide.word}</span>
                      <span className="text-xs text-indigo-600">({res.slide.furigana})</span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate max-w-[180px]">{res.slide.meaning_vn}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                    Chủ đề {res.topicIndex + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Topic Switcher Bar */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
        {N3_VOCAB_TOPICS.map((topic, idx) => (
          <button
            key={topic.topic_id}
            onClick={() => {
              setCurrentTopicIndex(idx);
              setCurrentSlideIndex(0);
              if (viewMode === 'video') {
                setIsVideoPlaying(true);
              }
            }}
            className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              idx === currentTopicIndex
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.</span>
            <span>{topic.title.replace(/^Chủ đề \d+:\s*/, '')}</span>
          </button>
        ))}
      </div>

      {/* Current Topic Hero Banner with Illustration */}
      <div className="w-full bg-white rounded-3xl border border-gray-200/90 shadow-xs p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-full sm:w-56 h-32 rounded-2xl overflow-hidden bg-slate-50 border border-gray-100 flex-shrink-0 shadow-inner group">
          <img
            src={`/images/vocab/topic_${String(currentTopicIndex + 1).padStart(2, '0')}.svg`}
            alt={currentTopic.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <div className="flex-1 w-full text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
            <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              Chủ đề {currentTopicIndex + 1 < 10 ? `0${currentTopicIndex + 1}` : currentTopicIndex + 1} / 20
            </span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {currentTopic.slides.length} Thẻ từ vựng & Sơ đồ
            </span>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
              Trình độ N3
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
            {currentTopic.title}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-indigo-600 mt-0.5">
            {currentTopic.japanese_title}
          </p>
          <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
            {currentTopic.description}
          </p>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'video' ? (
        /* Video Lecture Player Mode */
        currentSlide ? (
          <div className="w-full flex flex-col items-center">
            {/* 16:9 Video Presentation Screen */}
            <div className="w-full bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[540px] relative overflow-hidden">
              {/* Background Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Video Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isVideoPlaying ? 'bg-red-400 opacity-75' : 'hidden'}`} />
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isVideoPlaying ? 'bg-red-500' : 'bg-gray-500'}`} />
                  </span>
                  <span className="text-xs font-bold text-slate-300 tracking-wide">
                    VIDEO BÀI GIẢNG AI • {currentTopic.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-800/50">
                    Thẻ {currentSlideIndex + 1} / {totalSlides}
                  </span>
                </div>
              </div>

              {/* Video Content Stage */}
              <div className="py-6 flex flex-col items-center justify-center flex-1 relative z-10 text-center">
                {/* Speaker Indicator */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isSpeaking ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                    {isSpeaking ? '🗣️' : '👨‍🏫'}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {isSpeaking ? 'Sensei AI đang giảng giải...' : 'Tạm dừng'}
                  </span>
                </div>

                {/* Main Word Display */}
                <span className="text-base sm:text-lg font-semibold text-indigo-400 tracking-widest font-mono">
                  {currentSlide.furigana}
                </span>
                <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight mt-1 mb-2 font-mono drop-shadow-md">
                  {currentSlide.word}
                </h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-md">
                    {currentSlide.han_viet}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-lg font-bold text-slate-200">
                    {currentSlide.meaning_vn}
                  </span>
                </div>

                {/* Visual Diagram Box with Animated Glow */}
                <div className={`w-full max-w-2xl bg-slate-900/90 border rounded-2xl p-4 sm:p-5 my-2 transition-all duration-300 ${videoPhase === 'mnemonic' ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-950' : 'border-slate-800'}`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-2">
                    Sơ đồ so sánh trực quan
                  </div>
                  <pre className="font-mono text-xs sm:text-sm font-bold text-slate-200 whitespace-pre leading-relaxed overflow-x-auto custom-scrollbar">
                    {currentSlide.visual_diagram}
                  </pre>
                  {currentSlide.diagram_caption && (
                    <p className="text-xs text-slate-400 italic mt-2 border-t border-slate-800/80 pt-2">
                      {currentSlide.diagram_caption}
                    </p>
                  )}
                </div>

                {/* Subtitle Ticker Bar */}
                <div className="w-full max-w-2xl mt-4 px-4 py-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs sm:text-sm font-medium text-amber-300 min-h-[40px] flex items-center justify-center shadow-inner">
                  <span>{videoSubtitle || 'Bấm Play để bắt đầu bài giảng tự động'}</span>
                </div>
              </div>

              {/* Video Player Controller Bar */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                {/* Timeline Dots */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs">
                  {currentTopic.slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlideIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentSlideIndex ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (currentSlideIndex > 0) setCurrentSlideIndex((prev) => prev - 1);
                    }}
                    disabled={currentSlideIndex === 0}
                    className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-40 transition"
                    title="Từ trước đó"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsVideoPlaying((prev) => !prev)}
                    className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 transition active:scale-95"
                    title={isVideoPlaying ? 'Tạm dừng bài giảng' : 'Phát bài giảng video'}
                  >
                    {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => {
                      if (currentSlideIndex < totalSlides - 1) setCurrentSlideIndex((prev) => prev + 1);
                    }}
                    disabled={currentSlideIndex === totalSlides - 1}
                    className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-40 transition"
                    title="Từ tiếp theo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentSlideIndex(0);
                      setIsVideoPlaying(true);
                    }}
                    className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
                    title="Phát lại từ đầu chủ đề"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Speed & Auto-advance */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const speeds = [0.8, 1.0, 1.25];
                      const next = speeds[(speeds.indexOf(videoSpeed) + 1) % speeds.length];
                      setVideoSpeed(next);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold transition flex items-center gap-1"
                    title="Tốc độ giảng"
                  >
                    <FastForward className="w-3 h-3 text-indigo-400" />
                    <span>{videoSpeed}x</span>
                  </button>

                  <button
                    onClick={() => setAutoAdvance((prev) => !prev)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${autoAdvance ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-slate-900 text-slate-500'}`}
                    title="Tự động chuyển từ tiếp theo"
                  >
                    Auto-Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null
      ) : viewMode === 'slide' ? (
        currentSlide ? (
          <div className="flex flex-col items-center">
            {/* The Slide Card */}
            <div className="w-full bg-white rounded-3xl border border-gray-200/90 shadow-md p-6 sm:p-8 flex flex-col min-h-[500px] relative">
              {/* Slide Meta Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {currentSlide.tag || 'Từ vựng N3'}
                  </span>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {currentSlide.word_type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakWord(currentSlide.word)}
                    title="Phát âm từ vựng (phím Space)"
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition active:scale-95 ${
                      isSpeaking ? 'bg-indigo-600 text-white' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                    {currentSlideIndex + 1} / {totalSlides}
                  </span>
                </div>
              </div>

              {/* Main Word Section */}
              <div className="py-6 text-center flex flex-col items-center">
                <span className="text-sm font-semibold text-indigo-600 tracking-wider">
                  {currentSlide.furigana}
                </span>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mt-1">
                    {currentSlide.word}
                  </h2>
                  <span className="text-xs font-mono text-gray-400 self-end mb-1">
                    {currentSlide.romaji}
                  </span>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs font-bold tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {currentSlide.han_viet}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-base sm:text-lg font-bold text-gray-800">
                    {currentSlide.meaning_vn}
                  </span>
                </div>
              </div>

              {/* Visual Diagram Box */}
              <div className="my-2 bg-[#fcfcfc] border-2 border-dashed border-indigo-100 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-2.5 left-3 text-[10px] font-bold tracking-wider text-indigo-600 uppercase">
                  Sơ đồ hình ảnh trực quan
                </div>

                <pre className="font-mono text-xs sm:text-sm font-bold text-gray-800 whitespace-pre leading-relaxed py-2 max-w-full overflow-x-auto">
                  {currentSlide.visual_diagram}
                </pre>

                {currentSlide.diagram_caption && (
                  <p className="text-xs font-medium text-gray-500 mt-2 italic bg-white px-3 py-1 rounded-lg border border-gray-100">
                    {currentSlide.diagram_caption}
                  </p>
                )}
              </div>

              {/* Mnemonic Memory Hook */}
              {currentSlide.mnemonic && (
                <div className="mt-4 p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-start gap-2.5">
                  <Lightbulb className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-indigo-900">Mẹo nhớ cốt lõi: </span>
                    <span className="text-xs text-indigo-950 font-medium leading-relaxed">
                      {currentSlide.mnemonic}
                    </span>
                  </div>
                </div>
              )}

              {/* Collocations & Example Sentence */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Collocations */}
                <div className="p-3.5 bg-gray-50/80 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-700 block mb-2">
                    🔗 Cụm từ hay gặp trong đề thi (Collocations)
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {currentSlide.collocations && currentSlide.collocations.length > 0 ? (
                      currentSlide.collocations.map((c, idx) => (
                        <li key={idx} className="flex items-baseline justify-between gap-2 border-b border-gray-200/40 pb-1 last:border-0">
                          <span className="font-bold text-gray-900">{c.ja}</span>
                          <span className="text-[11px] text-gray-500">{c.vn}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400">Không có cụm từ đi kèm</li>
                    )}
                  </ul>
                </div>

                {/* Example sentence */}
                {currentSlide.example && (
                  <div className="p-3.5 bg-gray-50/80 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-700 block mb-1.5">
                        📖 Ví dụ ngữ cảnh thực tế
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-relaxed">
                        {currentSlide.example.sentence}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 font-medium italic border-t border-gray-200/60 pt-2">
                      {currentSlide.example.translation}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons and Dots */}
            <div className="w-full flex items-center justify-between gap-4 mt-6">
              <button
                onClick={() => {
                  if (currentSlideIndex > 0) {
                    setCurrentSlideIndex((prev) => prev - 1);
                  } else if (currentTopicIndex > 0) {
                    setCurrentTopicIndex((prev) => prev - 1);
                    setCurrentSlideIndex(N3_VOCAB_TOPICS[currentTopicIndex - 1].slides.length - 1);
                  }
                }}
                disabled={currentSlideIndex === 0 && currentTopicIndex === 0}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-bold shadow-sm transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Slide trước</span>
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-2">
                {currentTopic.slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlideIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentSlideIndex ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  if (currentSlideIndex < totalSlides - 1) {
                    setCurrentSlideIndex((prev) => prev + 1);
                  } else if (currentTopicIndex < N3_VOCAB_TOPICS.length - 1) {
                    setCurrentTopicIndex((prev) => prev + 1);
                    setCurrentSlideIndex(0);
                  }
                }}
                disabled={currentSlideIndex === totalSlides - 1 && currentTopicIndex === N3_VOCAB_TOPICS.length - 1}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-indigo-200 transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              >
                <span>Slide tiếp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null
      ) : (
        /* Grid View of all 10 cards in current topic */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentTopic.slides.map((slide, sIdx) => (
            <div
              key={slide.id}
              onClick={() => {
                setCurrentSlideIndex(sIdx);
                setViewMode('slide');
              }}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md cursor-pointer transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    Thẻ {sIdx + 1} • {slide.tag}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {slide.han_viet}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-2xl font-bold text-gray-900">{slide.word}</h3>
                  <span className="text-xs text-indigo-600 font-semibold">({slide.furigana})</span>
                </div>
                <p className="text-xs font-bold text-gray-700 mt-1">{slide.meaning_vn}</p>

                <pre className="font-mono text-[11px] font-bold text-gray-700 bg-gray-50 rounded-lg p-2.5 mt-3 whitespace-pre overflow-x-auto border border-gray-100">
                  {slide.visual_diagram}
                </pre>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-indigo-600 font-bold">
                <span>Nhấp để phóng to slide →</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord(slide.word);
                  }}
                  className="p-1.5 rounded-full hover:bg-indigo-50"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NotebookLM Studio Modal */}
      {isNotebookLMOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-fade-in relative">
            <button
              onClick={() => setIsNotebookLMOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
                  NotebookLM Studio • Video & Audio Overview
                </h3>
                <p className="text-xs text-gray-500">
                  Tạo podcast và bài giảng video 2 giảng viên đối thoại qua Google NotebookLM
                </p>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-950 leading-relaxed">
              <p className="font-bold text-amber-900 mb-1">💡 Hướng dẫn tạo Video/Podcast với NotebookLM:</p>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-amber-900/90">
                <li>Bấm <strong>Tải file .md</strong> hoặc <strong>Sao chép nội dung</strong> bên dưới.</li>
                <li>Mở <a href="https://notebooklm.google.com" target="_blank" rel="noreferrer" className="underline font-bold text-indigo-600">NotebookLM</a> và tạo sổ tay mới (New Notebook).</li>
                <li>Tải file nguồn lên, rồi bấm <strong>Audio Overview (Podcast)</strong> hoặc <strong>Video Overview</strong> để tạo bài giảng!</li>
              </ol>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`/notebooklm_lectures/${currentTopic.topic_id}.md`}
                download={`${currentTopic.topic_id}.md`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition"
              >
                <Download className="w-4 h-4" />
                <span>Tải .md Chủ đề {currentTopicIndex + 1}</span>
              </a>

              <a
                href="/notebooklm_lectures/n3_vocab_all_20_topics_master.md"
                download="n3_vocab_all_20_topics_master.md"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition"
              >
                <Download className="w-4 h-4" />
                <span>Tải trọn bộ 20 Chủ đề</span>
              </a>

              <button
                onClick={handleCopyNotebookLMSource}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold border border-gray-300 transition shadow-xs"
              >
                {copiedState ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                <span>{copiedState ? 'Đã chép vào Clipboard!' : 'Sao chép nguồn .md'}</span>
              </button>

              <a
                href="https://notebooklm.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm shadow-amber-200 transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Mở Google NotebookLM</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
