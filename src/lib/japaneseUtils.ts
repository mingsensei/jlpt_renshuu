/**
 * Japanese text utilities for JLPT Reading passages
 * - Text-to-Speech (TTS) with Web Speech API for Japanese (ja-JP)
 * - Furigana parsing and HTML conversion
 * - Cloze marker detection and extraction
 * - Text cleaner for speech synthesis
 */

export interface ClozeMarker {
  index: number;
  label: string;
  originalText: string;
}

/**
 * Clean Japanese passage for Web Speech API & Neural TTS with natural intonation & prosody
 * - Converts `漢字[かんじ]` to `漢字`
 * - Strips HTML tags like `<ruby>`, `<rt>`, `<u>`, etc.
 * - Converts cloze numbers `( 1 )` to `1番`
 * - Retains and standardizes Japanese punctuation (`？`, `！`, `。`, `、`)
 * - Adds natural breath pauses after conjunctions (しかし、また、そのため、等)
 * - Formats dialogue speaker turns (男：, 女：) with pause commas for natural speech rhythm
 */
export function cleanJapaneseTextForTTS(rawText: string): string {
  if (!rawText) return '';

  let cleaned = rawText
    // Remove HTML tags
    .replace(/<rt>.*?<\/rt>/gi, '')
    .replace(/<[^>]+>/g, '')
    // Remove bracket furigana: 漢字[かんじ] -> 漢字
    .replace(/([一-龯々仝〆〇]+)\[(.*?)\]/g, '$1')
    // Remove pipe furigana: [漢字|かんじ] -> 漢字
    .replace(/\[([一-龯々仝〆〇]+)\|.*?\]/g, '$1')
    // Cloze markers to natural Japanese audio: （ 1 ） -> １番
    .replace(/[（(【\[]\s*(\d+)\s*[）)】\]]/g, ' $1番 ')
    // Markdown bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');

  // Enhance dialogue speaker markers for natural prosodic pause (e.g. 男：, 女：, Aさん：, 質問：)
  cleaned = cleaned.replace(/^(男|女|先生|学生|店員|客|アナウンス|[A-Za-z]+(?:さん)?)\s*[:：]\s*/gmu, '$1、');
  cleaned = cleaned.replace(/([。\n])\s*(男|女|先生|学生|店員|客|アナウンス|[A-Za-z]+(?:さん)?)\s*[:：]\s*/gmu, '$1 $2、');

  // Convert Western question mark to fullwidth Japanese ？ so the neural voice raises pitch at the end
  cleaned = cleaned.replace(/\?/g, '？');
  cleaned = cleaned.replace(/!/g, '！');
  cleaned = cleaned.replace(/,/g, '、');

  // Add natural clause pauses after common sentence-opening conjunctions if comma is omitted
  cleaned = cleaned.replace(/([。\n]|^)\s*(しかし|そのため|また|ところで|さらに|一方|例えば|つまり)(?![\s、])/gu, '$1$2、');

  // Ensure questions ending in 'か' have a question mark to trigger rising pitch contour
  cleaned = cleaned.replace(/([でま]すか|ですか|ますか|でしょうか|のかな|のか)(?=[。\n\s]|$)/gu, '$1？');

  return cleaned.trim();
}

/**
 * Split Japanese passage into sentences for sentence-by-sentence TTS
 */
export function splitJapaneseSentences(text: string): string[] {
  const cleaned = cleanJapaneseTextForTTS(text);
  if (!cleaned) return [];

  // Match sentences ending in 。, ！, ？ or newline
  const parts = cleaned.split(/([。！？\n]+)/);
  const sentences: string[] = [];

  for (let i = 0; i < parts.length; i += 2) {
    const sent = parts[i] || '';
    const punct = parts[i + 1] || '';
    const full = (sent + punct).trim();
    if (full) {
      sentences.push(full);
    }
  }

  return sentences.length > 0 ? sentences : [cleaned];
}

/**
 * Web Speech API Voice Manager
 */
let cachedJaVoice: SpeechSynthesisVoice | null = null;

function findJapaneseVoice(): SpeechSynthesisVoice | null {
  if (!('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // 1. Exact ja-JP match
  const jaJP = voices.find((v) => v.lang === 'ja-JP' || v.lang === 'ja_JP');
  if (jaJP) return jaJP;

  // 2. Starts with ja
  const ja = voices.find((v) => v.lang.toLowerCase().startsWith('ja'));
  if (ja) return ja;

  // 3. Name contains Japanese / Kyoko / Otoya / etc.
  const jaByName = voices.find(
    (v) =>
      v.name.toLowerCase().includes('japan') ||
      v.name.toLowerCase().includes('kyoko') ||
      v.name.toLowerCase().includes('otoya')
  );
  if (jaByName) return jaByName;

  return null;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedJaVoice = findJapaneseVoice();
  };
}

export interface TTSController {
  speak: (
    text: string,
    rate?: number,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isSupported: () => boolean;
  isPlaying: () => boolean;
  isPaused: () => boolean;
}

let currentIsPlaying = false;
let currentIsPaused = false;

export const JapaneseTTS: TTSController = {
  isSupported: () => {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  },

  isPlaying: () => currentIsPlaying,
  isPaused: () => currentIsPaused,

  speak: (text, rate = 1.0, onStart, onEnd, onError) => {
    if (!JapaneseTTS.isSupported()) {
      if (onError) onError(new Error('Trình duyệt không hỗ trợ Web Speech API.'));
      return;
    }

    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }

    const ttsText = cleanJapaneseTextForTTS(text);
    if (!ttsText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.lang = 'ja-JP';
    utterance.rate = Math.max(0.5, Math.min(2.0, rate));
    utterance.pitch = 1.0;

    const voice = cachedJaVoice || findJapaneseVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      currentIsPlaying = true;
      currentIsPaused = false;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      currentIsPlaying = false;
      currentIsPaused = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      // Chrome fires 'interrupted' or 'canceled' when user clicks stop
      currentIsPlaying = false;
      currentIsPaused = false;
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        if (onError) onError(e);
      } else {
        if (onEnd) onEnd();
      }
    };

    currentIsPlaying = true;
    currentIsPaused = false;

    window.speechSynthesis.speak(utterance);
  },

  pause: () => {
    if (!JapaneseTTS.isSupported()) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      currentIsPaused = true;
    }
  },

  resume: () => {
    if (!JapaneseTTS.isSupported()) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      currentIsPaused = false;
    }
  },

  stop: () => {
    if (!JapaneseTTS.isSupported()) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
    currentIsPlaying = false;
    currentIsPaused = false;
  }
};

/**
 * Count Japanese characters (excluding whitespaces and punctuation)
 */
export function countJapaneseCharacters(text: string): number {
  if (!text) return 0;
  // Strip whitespace and tags
  const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, '');
  return clean.length;
}

/**
 * Estimate Japanese reading time (JLPT standard is ~350 characters/min)
 */
export function estimateReadingTimeMinutes(text: string): number {
  const chars = countJapaneseCharacters(text);
  if (chars <= 0) return 0;
  return Math.max(1, Math.ceil(chars / 350));
}

/**
 * Normalize an answer string (Japanese / Vietnamese / Romaji) for fair comparison
 * Removes trailing/leading spaces, standardizes punctuation, lowercases
 */
export function normalizeAnswer(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    // remove common punctuation: commas, periods, question marks, fullwidth/halfwidth spaces
    .replace(/[\s\u3000。、.,?!？！/\\()（）[\]「」『』"']/g, '');
}

/**
 * Check if user's text answer matches any of the acceptable answers
 * Supports multi-answers separated by /, ,, ;, | in acceptable answers list
 */
export function checkFillBlankAnswer(
  userInput: string | undefined | null,
  acceptableAnswers: string[]
): boolean {
  if (!userInput || !userInput.trim()) return false;
  const cleanInput = normalizeAnswer(userInput);
  if (!cleanInput) return false;

  for (const ans of acceptableAnswers) {
    if (!ans) continue;
    // An answer might have multiple variations separated by slash, comma, semicolon, newline or pipe
    // e.g. "私 / わたし / watashi" or "xin chào, chào"
    const variants = ans.split(/[\/,;|\n]+/).map(normalizeAnswer).filter(Boolean);
    if (variants.includes(cleanInput)) {
      return true;
    }
  }
  return false;
}
