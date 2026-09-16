import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Eye,
  EyeOff,
  Headphones,
  Sparkles,
  FileText
} from 'lucide-react';
import { japaneseAIPlayer, type VoiceMode } from '../lib/japaneseAITTS';
import type { JLPTLevel } from '../types/exam';

interface JapaneseListeningPlayerProps {
  audioUrl?: string | null;
  scriptText?: string | null;
  scriptTranslation?: string | null;
  level?: JLPTLevel | null;
  isReviewMode?: boolean;
  examTitle?: string;
  className?: string;
}

export const JapaneseListeningPlayer: React.FC<JapaneseListeningPlayerProps> = ({
  audioUrl,
  scriptText,
  scriptTranslation,
  level,
  isReviewMode = false,
  examTitle,
  className = ''
}) => {
  // Mode: 'file' (using native HTML5 audio element) or 'ai' (using japaneseAIPlayer)
  const isFileAudio = Boolean(audioUrl && audioUrl.trim());

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [voiceMode] = useState<VoiceMode>('ai');
  const [showScript, setShowScript] = useState(isReviewMode);
  const [showTranslation, setShowTranslation] = useState(isReviewMode);
  const [isMuted, setIsMuted] = useState(false);

  // AI TTS playback states
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);
  const [totalSentences, setTotalSentences] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize AI player with script if no direct audio file
  useEffect(() => {
    if (!isFileAudio && scriptText) {
      const sents = japaneseAIPlayer.loadPassage(scriptText);
      setTotalSentences(sents.length);
      setActiveSentenceIndex(null);
    }
    return () => {
      if (!isFileAudio) {
        japaneseAIPlayer.stop();
      }
    };
  }, [isFileAudio, scriptText]);

  // Sync AI player events
  useEffect(() => {
    if (isFileAudio) return;

    japaneseAIPlayer.onSentenceChange = (idx, total) => {
      setActiveSentenceIndex(idx);
      setTotalSentences(total);
    };

    japaneseAIPlayer.onStatusChange = (playing) => {
      setIsPlaying(playing);
      if (!playing) {
        setActiveSentenceIndex(null);
      }
    };

    japaneseAIPlayer.onEnd = () => {
      setIsPlaying(false);
      setActiveSentenceIndex(null);
    };

    return () => {
      japaneseAIPlayer.stop();
    };
  }, [isFileAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      japaneseAIPlayer.stop();
    };
  }, []);

  // Update speech rate
  useEffect(() => {
    if (isFileAudio && audioRef.current) {
      audioRef.current.playbackRate = speechRate;
    } else if (!isFileAudio) {
      japaneseAIPlayer.setRate(speechRate);
      japaneseAIPlayer.setVoiceMode(voiceMode);
    }
  }, [speechRate, voiceMode, isFileAudio]);

  const handleTogglePlay = () => {
    if (isFileAudio) {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    } else {
      if (isPlaying) {
        japaneseAIPlayer.pause();
      } else {
        japaneseAIPlayer.setVoiceMode(voiceMode);
        japaneseAIPlayer.setRate(speechRate);
        japaneseAIPlayer.play();
      }
    }
  };

  const handleStop = () => {
    if (isFileAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        setIsPlaying(false);
      }
    } else {
      japaneseAIPlayer.stop();
      setIsPlaying(false);
      setActiveSentenceIndex(null);
    }
  };

  const handleSkip = (seconds: number) => {
    if (isFileAudio && audioRef.current) {
      const nextTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    } else if (!isFileAudio) {
      if (seconds > 0) {
        japaneseAIPlayer.nextSentence();
      } else {
        japaneseAIPlayer.prevSentence();
      }
    }
  };

  const handleRateChange = (rate: number) => {
    setSpeechRate(rate);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 shadow-xs ${className}`}>
      {/* Top badge & header */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Bài thi Nghe hiểu (Choukai)
              </span>
              {level && (
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                  {level}
                </span>
              )}
            </div>
            {examTitle && (
              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                {examTitle}
              </p>
            )}
          </div>
        </div>

        {/* Audio Mode Badge */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-xl">
          {isFileAudio ? (
            <span className="inline-flex items-center gap-1 font-semibold text-gray-800">
              <FileText className="w-3.5 h-3.5 text-gray-500" />
              <span>Audio gốc (MP3)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 font-semibold text-gray-800">
              <Sparkles className="w-3.5 h-3.5 text-gray-600" />
              <span>Giọng đọc AI (Chuẩn ngữ điệu)</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Player Surface */}
      <div className="bg-gray-50 border border-gray-200/90 rounded-2xl p-4 sm:p-5">
        {/* Hidden native audio element if audioUrl is present */}
        {isFileAudio && (
          <audio
            ref={audioRef}
            src={audioUrl || ''}
            preload="metadata"
            onTimeUpdate={() => {
              if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
            }}
            onLoadedMetadata={() => {
              if (audioRef.current) setDuration(audioRef.current.duration || 0);
            }}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
          />
        )}

        {/* Timeline Slider for File Mode */}
        {isFileAudio && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-1.5">
              <span>{formatSeconds(currentTime)}</span>
              <span>{formatSeconds(duration)}</span>
            </div>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-gray-900 rounded-full transition-all"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {/* AI Sentence Indicator for AI Mode */}
        {!isFileAudio && scriptText && (
          <div className="mb-4 flex items-center justify-between text-xs text-gray-600 px-1">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
              <span className="font-semibold text-gray-900">
                {isPlaying ? `Đang phát câu ${(activeSentenceIndex ?? 0) + 1}/${totalSentences}` : `Sẵn sàng phát (${totalSentences} câu)`}
              </span>
            </div>
            <span className="text-[11px] text-gray-500 hidden sm:inline">
              Giọng phát chuẩn Tokyo với ngữ điệu ngắt nghỉ tự nhiên
            </span>
          </div>
        )}

        {/* Playback Controls Row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Left: Transport Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSkip(-5)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200 transition-colors cursor-pointer"
              title="Lùi 5 giây"
            >
              <Rewind className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleTogglePlay}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-black font-semibold text-sm transition-all shadow-xs active:scale-95 cursor-pointer min-w-[120px]"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Tạm dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Phát bài nghe</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSkip(5)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200 transition-colors cursor-pointer"
              title="Tua 5 giây"
            >
              <FastForward className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleStop}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white border border-gray-200 transition-colors cursor-pointer"
              title="Dừng và quay lại đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Speed Rates & Controls */}
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <div className="inline-flex rounded-xl border border-gray-200 bg-white p-0.5 text-xs font-semibold shadow-2xs">
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
                  className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                    speechRate === s.rate
                      ? 'bg-gray-900 text-white font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Mute button for File mode */}
            {isFileAudio && (
              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200 transition-colors cursor-pointer"
                title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Script & Translation Accordion (Hidden during exam by default to mimic real JLPT test) */}
      {scriptText && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
            <button
              type="button"
              onClick={() => setShowScript(!showScript)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-gray-900 py-1 cursor-pointer"
            >
              {showScript ? <EyeOff className="w-3.5 h-3.5 text-gray-500" /> : <Eye className="w-3.5 h-3.5 text-gray-500" />}
              <span>{showScript ? 'Ẩn kịch bản lời thoại' : 'Xem kịch bản lời thoại (Transcript)'}</span>
            </button>

            {showScript && scriptTranslation && (
              <button
                type="button"
                onClick={() => setShowTranslation(!showTranslation)}
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                {showTranslation ? 'Ẩn bản dịch' : 'Hiện bản dịch tiếng Việt'}
              </button>
            )}
          </div>

          {showScript && (
            <div className="p-4 bg-gray-50/90 rounded-2xl border border-gray-200/80 text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
              <div>
                <p className="font-bold text-gray-900 mb-1">Lời thoại tiếng Nhật:</p>
                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {scriptText}
                </div>
              </div>

              {showTranslation && scriptTranslation && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="font-bold text-gray-900 mb-1">Bản dịch tiếng Việt:</p>
                  <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                    {scriptTranslation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
