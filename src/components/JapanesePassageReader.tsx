import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Volume2,
  Play,
  Pause,
  Square,
  Eye,
  EyeOff,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { JapaneseTTS, countJapaneseCharacters, estimateReadingTimeMinutes } from '../lib/japaneseUtils';
import { lookupJapaneseText, type JapaneseLookupResult } from '../lib/japaneseDictionary';
import type { JLPTLevel } from '../types/exam';

interface JapanesePassageReaderProps {
  passage: string;
  translation?: string | null;
  level?: JLPTLevel | null;
  currentQuestionIndex?: number;
  onSelectQuestion?: (index: number) => void;
  isMobile?: boolean;
  isReviewMode?: boolean;
  defaultShowTranslation?: boolean;
  className?: string;
}

export const JapanesePassageReader: React.FC<JapanesePassageReaderProps> = ({
  passage,
  translation,
  level,
  currentQuestionIndex,
  onSelectQuestion,
  isMobile = false,
  isReviewMode: _isReviewMode = false,
  defaultShowTranslation = false,
  className = ''
}) => {
  // Appearance States
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [fontFamily, setFontFamily] = useState<'gothic' | 'mincho'>('mincho');
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(defaultShowTranslation);
  const [isExpandedMobile, setIsExpandedMobile] = useState(true);

  // Audio / TTS States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [ttsSupported, setTtsSupported] = useState(true);

  // In-place Lookup Popup State
  const [selectedText, setSelectedText] = useState<string>('');
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
    width: number;
    arrowOffset: number;
    placeBelow: boolean;
  } | null>(null);
  const [lookupData, setLookupData] = useState<JapaneseLookupResult | null>(null);
  const [isLoadingLookup, setIsLoadingLookup] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTtsSupported(JapaneseTTS.isSupported());
    return () => {
      // Cleanup TTS on unmount
      JapaneseTTS.stop();
    };
  }, []);

  // Sync translation prop when it changes
  useEffect(() => {
    if (defaultShowTranslation) {
      setShowTranslation(true);
    }
  }, [defaultShowTranslation]);

  // Dismiss popup immediately as soon as selection ends (khi het boi den)
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
          abortControllerRef.current = null;
        }
        setPopupPosition(null);
        setLookupData(null);
        setSelectedText('');
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Helper to cleanly extract text from selection Range without <rt> Furigana tags
  const getCleanTextFromRange = (range: Range): string => {
    try {
      const clone = range.cloneContents();
      // Remove all <rt> elements completely so Furigana text is never concatenated into sentences!
      clone.querySelectorAll('rt').forEach((el) => el.remove());
      let str = clone.textContent || '';
      // Remove furigana bracket notation if present: 漢字[かんじ] -> 漢字
      str = str.replace(/([一-龯々仝〆〇]+)\[(.*?)\]/g, '$1');
      str = str.replace(/\[([一-龯々仝〆〇]+)\|.*?\]/g, '$1');
      // Normalize whitespace and newlines
      str = str.replace(/\s+/g, ' ').trim();
      return str;
    } catch {
      return (window.getSelection()?.toString() || '')
        .replace(/([一-龯々仝〆〇]+)\[(.*?)\]/g, '$1')
        .replace(/\[([一-龯々仝〆〇]+)\|.*?\]/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();
    }
  };

  // Handle Text Selection within passage (Mouse or Touch)
  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setPopupPosition(null);
      setLookupData(null);
      setSelectedText('');
      return;
    }

    if (!containerRef.current) return;
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;
    if (
      (anchorNode && !containerRef.current.contains(anchorNode)) ||
      (focusNode && !containerRef.current.contains(focusNode))
    ) {
      return;
    }

    const range = selection.getRangeAt(0);
    const cleanText = getCleanTextFromRange(range);

    if (!cleanText || cleanText.length > 600) {
      setPopupPosition(null);
      setLookupData(null);
      setSelectedText('');
      return;
    }

    const rect = range.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Popup card dimensions & center calculation (wider 380px for comfortable sentence reading)
    const popupWidth = Math.min(380, containerRect.width - 24);
    const centerSelectionX = rect.left - containerRect.left + rect.width / 2;

    // Clamp horizontal position so popup stays neatly inside container bounds
    const minLeft = popupWidth / 2 + 12;
    const maxLeft = containerRect.width - popupWidth / 2 - 12;
    const clampedCenterX = Math.max(minLeft, Math.min(maxLeft, centerSelectionX));

    // Pointer arrow offset relative to popup center
    const arrowOffset = Math.max(
      -popupWidth / 2 + 20,
      Math.min(popupWidth / 2 - 20, centerSelectionX - clampedCenterX)
    );

    // If rect is close to top of container, place popup below selection; otherwise above
    const placeBelow = rect.top - containerRect.top < 160;
    const posY = placeBelow
      ? rect.bottom - containerRect.top + 8
      : rect.top - containerRect.top - 8;

    setSelectedText(cleanText);
    setPopupPosition({
      x: clampedCenterX,
      y: posY,
      width: popupWidth,
      arrowOffset,
      placeBelow
    });

    // Abort previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoadingLookup(true);
    setLookupData(null);

    lookupJapaneseText(cleanText, controller.signal, passage)
      .then((data) => {
        setLookupData(data);
        setIsLoadingLookup(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setLookupData({
            text: cleanText,
            meaning: 'Không thể tải bản dịch lúc này. Vui lòng thử lại.',
            reading: null
          });
          setIsLoadingLookup(false);
        }
      });
  }, [passage]);

  // Handle TTS Play
  const handlePlayTTS = () => {
    if (isPlaying && isPaused) {
      JapaneseTTS.resume();
      setIsPaused(false);
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);

    JapaneseTTS.speak(
      passage,
      speechRate,
      () => {
        setIsPlaying(true);
        setIsPaused(false);
      },
      () => {
        setIsPlaying(false);
        setIsPaused(false);
      },
      (err) => {
        console.warn('TTS error/interrupted:', err);
        setIsPlaying(false);
        setIsPaused(false);
      }
    );
  };

  // Handle TTS Pause
  const handlePauseTTS = () => {
    JapaneseTTS.pause();
    setIsPaused(true);
  };

  // Handle TTS Stop
  const handleStopTTS = () => {
    JapaneseTTS.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Handle Speed Change
  const handleRateChange = (rate: number) => {
    setSpeechRate(rate);
    if (isPlaying) {
      // Restart at new rate
      JapaneseTTS.stop();
      setIsPlaying(true);
      setIsPaused(false);
      JapaneseTTS.speak(
        passage,
        rate,
        undefined,
        () => {
          setIsPlaying(false);
          setIsPaused(false);
        }
      );
    }
  };

  // Speak Selected Text
  const handleSpeakSelected = () => {
    if (!selectedText) return;
    JapaneseTTS.speak(selectedText, speechRate);
  };

  // Statistics
  const characterCount = useMemo(() => countJapaneseCharacters(passage), [passage]);
  const estimatedMins = useMemo(() => estimateReadingTimeMinutes(passage), [passage]);

  /**
   * Parse passage tokens:
   * 1. Cloze markers: `（ 1 ）`, `( 1 )`, `【 1 】`, `[ 1 ]`, `①`, `②`, `③`, `④`, `⑤`, etc.
   * 2. Furigana: `漢字[かんじ]` or `[漢字|かんじ]` or `<ruby>...</ruby>`
   * 3. Underline: `<u>...</u>`
   */
  const renderedContent = useMemo(() => {
    if (!passage) return null;

    // Split passage into paragraphs
    const paragraphs = passage.split(/\n+/);

    return paragraphs.map((paragraph, pIdx) => {
      // Tokenize paragraph for Cloze markers and Furigana
      // Regex matches:
      // - Cloze: ([（(【\[]\s*(\d+|[A-Za-z])\s*[）)】\]])
      // - Furigana: ([一-龯々仝〆〇]+\[[^\]]+\]|\[[一-龯々仝〆〇]+\|[^\]]+\])
      // - Circle numbers: ([①②③④⑤⑥⑦⑧⑨⑩])
      // - Underline: (<u>.*?<\/u>)
      const tokenRegex = /([（(【[]\s*(?:\d+|[A-Za-z])\s*[）)】\]]|[①②③④⑤⑥⑦⑧⑨⑩]|[一-龯々仝〆〇]+\[[^\]]+\]|\[[一-龯々仝〆〇]+\|[^\]]+\]|<u>.*?<\/u>)/g;
      const parts = paragraph.split(tokenRegex);

      return (
        <p
          key={`p-${pIdx}`}
          className="mb-4 text-justify leading-loose"
          style={{ textIndent: pIdx === 0 ? '0' : '1em' }}
        >
          {parts.map((part, tokenIdx) => {
            if (!part) return null;

            // 1. Check if it's a Cloze Marker
            const clozeMatch = part.match(/^[（(【[]\s*(\d+|[A-Za-z])\s*[）)】\]]$/);
            const circleNumberMap: Record<string, number> = {
              '①': 1, '②': 2, '③': 3, '④': 4, '⑤': 5,
              '⑥': 6, '⑦': 7, '⑧': 8, '⑨': 9, '⑩': 10
            };

            let questionNum: number | null = null;
            if (clozeMatch) {
              const numVal = parseInt(clozeMatch[1], 10);
              if (!isNaN(numVal)) {
                questionNum = numVal;
              }
            } else if (circleNumberMap[part] !== undefined) {
              questionNum = circleNumberMap[part];
            }

            if (questionNum !== null) {
              const targetQuestionIndex = questionNum - 1;
              const isCurrentQuestion =
                currentQuestionIndex !== undefined && currentQuestionIndex === targetQuestionIndex;

              return (
                <span
                  key={`cloze-${tokenIdx}`}
                  onClick={() => {
                    if (onSelectQuestion && targetQuestionIndex >= 0) {
                      onSelectQuestion(targetQuestionIndex);
                    }
                  }}
                  className={`inline-flex items-center justify-center mx-1 px-2.5 py-0.5 rounded-full text-xs font-bold transition-all align-baseline ${
                    onSelectQuestion ? 'cursor-pointer hover:shadow-sm' : ''
                  } ${
                    isCurrentQuestion
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-1 shadow-xs scale-105 animate-pulse'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                  }`}
                  title={
                    onSelectQuestion
                      ? `Chuyển tới câu hỏi ${questionNum} (${isCurrentQuestion ? 'Đang làm' : 'Bấm để xem'})`
                      : `Chỗ trống câu hỏi ${questionNum}`
                  }
                >
                  {part}
                </span>
              );
            }

            // 2. Check if it's Furigana: 漢字[かんじ]
            const furiganaBracketMatch = part.match(/^([一-龯々仝〆〇]+)\[(.*?)\]$/);
            if (furiganaBracketMatch) {
              const kanji = furiganaBracketMatch[1];
              const kana = furiganaBracketMatch[2];
              return (
                <ruby key={`ruby-${tokenIdx}`} className="select-text px-0.5">
                  {kanji}
                  <rt className="text-indigo-600">{kana}</rt>
                </ruby>
              );
            }

            // 3. Check if it's Pipe Furigana: [漢字|かんじ]
            const furiganaPipeMatch = part.match(/^\[([一-龯々仝〆〇]+)\|(.*?)\]$/);
            if (furiganaPipeMatch) {
              const kanji = furiganaPipeMatch[1];
              const kana = furiganaPipeMatch[2];
              return (
                <ruby key={`ruby-pipe-${tokenIdx}`} className="select-text px-0.5">
                  {kanji}
                  <rt className="text-indigo-600">{kana}</rt>
                </ruby>
              );
            }

            // 4. Check if it's Underlined text: <u>...</u>
            const underlineMatch = part.match(/^<u>(.*?)<\/u>$/);
            if (underlineMatch) {
              return (
                <u
                  key={`u-${tokenIdx}`}
                  className="underline decoration-indigo-500 decoration-2 underline-offset-4 font-semibold text-indigo-950"
                >
                  {underlineMatch[1]}
                </u>
              );
            }

            // Normal text
            return <span key={`text-${tokenIdx}`}>{part}</span>;
          })}
        </p>
      );
    });
  }, [passage, currentQuestionIndex, onSelectQuestion]);

  return (
    <div
      ref={containerRef}
      onMouseUp={handleSelection}
      onTouchEnd={handleSelection}
      onKeyUp={handleSelection}
      className={`relative bg-white border border-gray-200 rounded-3xl shadow-xs overflow-hidden transition-all ${className}`}
    >
      {/* ================= Passage Toolbar Header ================= */}
      <div className="p-3.5 sm:p-4 bg-gray-50/90 border-b border-gray-200">
        {/* Top line: Badge + Stats + Mobile Accordion Button */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-100/70 text-indigo-800 text-xs font-bold border border-indigo-200/60">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Đoạn văn đọc hiểu (読解)</span>
            </span>

            {level && (
              <span className="text-[11px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-lg shadow-xs">
                JLPT {level}
              </span>
            )}

            <span className="text-[11px] text-gray-500 hidden sm:inline-block font-mono">
              {characterCount} chữ • ~{estimatedMins} phút đọc
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            {/* Vietnamese Translation Toggle */}
            {translation && (
              <button
                type="button"
                onClick={() => setShowTranslation(!showTranslation)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  showTranslation
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-indigo-700 hover:bg-indigo-50'
                }`}
                title={showTranslation ? 'Ẩn bản dịch tiếng Việt' : 'Xem bản dịch tiếng Việt'}
              >
                {showTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{showTranslation ? 'Ẩn dịch TV' : 'Dịch TV'}</span>
                <span className="sm:hidden">Dịch</span>
              </button>
            )}

            {/* Mobile collapse toggle */}
            {isMobile && (
              <button
                type="button"
                onClick={() => setIsExpandedMobile(!isExpandedMobile)}
                className="p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                title={isExpandedMobile ? 'Thu gọn bài đọc' : 'Mở rộng bài đọc'}
              >
                {isExpandedMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Second line: Audio Player & Typography Controls */}
        {(!isMobile || isExpandedMobile) && (
          <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-gray-200/60 text-xs">
            {/* Left: Native Japanese TTS Player */}
            {ttsSupported ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                {!isPlaying ? (
                  <button
                    type="button"
                    onClick={handlePlayTTS}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-colors cursor-pointer shadow-xs"
                    title="Nghe giọng đọc tiếng Nhật bản xứ (Web Speech API)"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Nghe bài đọc</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-1 bg-white border border-indigo-200 rounded-xl p-0.5 shadow-xs">
                    {isPaused ? (
                      <button
                        type="button"
                        onClick={handlePlayTTS}
                        className="p-1.5 rounded-lg text-indigo-700 hover:bg-indigo-50 cursor-pointer"
                        title="Tiếp tục nghe"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePauseTTS}
                        className="p-1.5 rounded-lg text-indigo-700 hover:bg-indigo-50 cursor-pointer"
                        title="Tạm dừng"
                      >
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleStopTTS}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                      title="Dừng phát âm"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <div className="flex items-center gap-0.5 px-1 text-[11px] font-mono font-bold text-indigo-900">
                      <Volume2 className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                      <span className="hidden sm:inline">Đang đọc</span>
                    </div>
                  </div>
                )}

                {/* Speed Rates (0.8x, 1.0x, 1.2x) */}
                <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5 text-[10px] font-semibold">
                  {[
                    { label: '0.8x', rate: 0.8, title: 'Tốc độ chậm (N5-N4)' },
                    { label: '1.0x', rate: 1.0, title: 'Tốc độ chuẩn' },
                    { label: '1.2x', rate: 1.2, title: 'Tốc độ nhanh (N2-N1)' }
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => handleRateChange(s.rate)}
                      title={s.title}
                      className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                        speechRate === s.rate
                          ? 'bg-gray-900 text-white font-bold'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-gray-400 italic">
                (Trình duyệt không hỗ trợ phát âm)
              </div>
            )}

            {/* Right: Japanese Typography Options */}
            <div className="flex items-center gap-1.5 ml-auto flex-wrap">
              {/* Furigana Toggle */}
              <button
                type="button"
                onClick={() => setShowFurigana(!showFurigana)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer border ${
                  showFurigana
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                    : 'bg-white border-gray-200 text-gray-500 hover:text-gray-800'
                }`}
                title="Bật / tắt hiển thị cách đọc Furigana (ルビ)"
              >
                ルビ {showFurigana ? 'Bật' : 'Tắt'}
              </button>

              {/* Font Family Toggle: Mincho vs Gothic */}
              <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setFontFamily('mincho')}
                  className={`px-2 py-0.5 rounded font-serif font-semibold cursor-pointer ${
                    fontFamily === 'mincho'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Phông chữ Minh Triều (Mincho - chuẩn đề thi thật)"
                >
                  明朝
                </button>
                <button
                  type="button"
                  onClick={() => setFontFamily('gothic')}
                  className={`px-2 py-0.5 rounded font-sans font-semibold cursor-pointer ${
                    fontFamily === 'gothic'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Phông chữ Gothic (Gothic - nét thẳng hiện đại)"
                >
                  ゴシック
                </button>
              </div>

              {/* Font Size Selector */}
              <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setFontSize('normal')}
                  className={`px-1.5 py-0.5 rounded font-semibold cursor-pointer ${
                    fontSize === 'normal' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Cỡ chữ tiêu chuẩn"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('large')}
                  className={`px-1.5 py-0.5 rounded font-semibold cursor-pointer ${
                    fontSize === 'large' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Cỡ chữ lớn"
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('xlarge')}
                  className={`px-1.5 py-0.5 rounded font-semibold cursor-pointer ${
                    fontSize === 'xlarge' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Cỡ chữ rất lớn"
                >
                  A++
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= In-place Lookup Popup Card (Nổi popup tương ứng: cách đọc & nghĩa) ================= */}
      {selectedText && popupPosition && (
        <div
          onMouseDown={(e) => {
            // Prevent deselecting when interacting with popup (e.g. clicking pronunciation button)
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
            width: `${popupPosition.width}px`,
            transform: `translateX(-50%) ${popupPosition.placeBelow ? '' : 'translateY(-100%)'}`
          }}
          className="absolute z-50 max-w-[calc(100vw-32px)] bg-white text-gray-900 border border-indigo-200 shadow-2xl rounded-2xl p-3.5 sm:p-4 text-xs animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Arrow Pointer */}
          <div
            style={{
              left: `calc(50% + ${popupPosition.arrowOffset}px)`
            }}
            className={`absolute w-3 h-3 bg-white border-indigo-200 rotate-45 -translate-x-1/2 ${
              popupPosition.placeBelow
                ? '-top-1.5 border-t border-l'
                : '-bottom-1.5 border-b border-r'
            }`}
          />

          {/* Header Row: Selected Text + Pronunciation Audio + Badges */}
          <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-gray-100">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="font-bold text-gray-950 text-sm sm:text-base font-japanese-mincho break-all">
                  {selectedText}
                </span>

                {lookupData?.level && (
                  <span className="text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded shadow-xs">
                    {lookupData.level}
                  </span>
                )}

                {lookupData?.hanViet && (
                  <span className="text-[10px] font-semibold bg-amber-50 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded">
                    Hán-Việt: {lookupData.hanViet}
                  </span>
                )}
              </div>
            </div>

            {/* Pronounce Button */}
            <button
              type="button"
              onClick={handleSpeakSelected}
              className="flex-shrink-0 p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-colors cursor-pointer"
              title="Phát âm tiếng Nhật (TTS)"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Body: Cách đọc (Reading) & Ý nghĩa (Meaning) */}
          <div className="pt-2.5 space-y-2">
            {isLoadingLookup ? (
              <div className="flex items-center gap-2 py-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                <span className="text-xs">Đang tra cách đọc & nghĩa...</span>
              </div>
            ) : lookupData ? (
              <>
                {/* Cách đọc */}
                {lookupData.reading && (
                  <div className="bg-indigo-50/80 border border-indigo-100/80 rounded-xl p-2">
                    <div className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider mb-0.5">
                      Cách đọc:
                    </div>
                    <div className="text-sm font-bold text-indigo-950 font-mono tracking-wide">
                      {lookupData.reading}
                    </div>
                  </div>
                )}

                {/* Ý nghĩa / Dịch nghĩa */}
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {lookupData.isSentence ? 'Dịch nghĩa câu / đoạn:' : 'Nghĩa tiếng Việt:'}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed max-h-36 overflow-y-auto">
                    {lookupData.meaning}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-xs text-gray-500 italic py-1">
                Không tìm thấy dữ liệu tra cứu.
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
            <span>💡 Bỏ bôi đen để đóng popup</span>
            <span className="font-mono">Từ điển tức thì</span>
          </div>
        </div>
      )}

      {/* ================= Main Japanese Passage Content ================= */}
      {(!isMobile || isExpandedMobile) && (
        <div className="p-4 sm:p-6 space-y-4 max-h-[55vh] lg:max-h-[calc(100vh-210px)] overflow-y-auto">
          {/* Quick Learning Tip */}
          <div className="text-[11px] text-gray-600 bg-indigo-50/50 px-3 py-1.5 rounded-xl border border-indigo-100 flex items-center justify-between flex-wrap gap-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span>Bôi đen bất kỳ từ, cụm từ hoặc câu tiếng Nhật nào để xem nhanh cách đọc và dịch nghĩa ngay tại chỗ.</span>
            </span>
            {onSelectQuestion && (
              <span className="font-semibold text-indigo-700">
                Bấm vào các ô số ( 1 ), ( 2 ) để chuyển nhanh câu hỏi.
              </span>
            )}
          </div>

          {/* Japanese Text Rendering Container */}
          <div
            className={`transition-all ${
              fontFamily === 'mincho' ? 'font-japanese-mincho' : 'font-japanese-gothic'
            } ${!showFurigana ? 'hide-furigana' : ''} ${
              fontSize === 'xlarge'
                ? 'text-lg sm:text-xl leading-loose sm:leading-[2.4]'
                : fontSize === 'large'
                ? 'text-base sm:text-lg leading-loose sm:leading-[2.2]'
                : 'text-sm sm:text-base leading-loose sm:leading-[2.0]'
            } text-gray-900 selection:bg-indigo-600 selection:text-white`}
          >
            {renderedContent}
          </div>

          {/* ================= Vietnamese Translation Section ================= */}
          {showTranslation && translation && (
            <div className="mt-4 pt-4 border-t border-indigo-100 bg-indigo-50/60 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 p-4 sm:p-6 rounded-b-3xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-indigo-950 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Bản dịch tiếng Việt tham khảo:</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTranslation(false)}
                  className="text-[11px] text-indigo-700 hover:text-indigo-900 font-semibold cursor-pointer"
                >
                  Đóng dịch
                </button>
              </div>

              <div
                className={`text-indigo-950 leading-relaxed sm:leading-loose whitespace-pre-wrap text-justify ${
                  fontSize === 'xlarge'
                    ? 'text-base sm:text-lg'
                    : fontSize === 'large'
                    ? 'text-sm sm:text-base'
                    : 'text-xs sm:text-sm'
                }`}
              >
                {translation}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
