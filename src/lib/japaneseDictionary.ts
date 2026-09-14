/**
 * Japanese Dictionary & Translation Lookup Service
 * - Fast caching for instant subsequent lookups
 * - Real-time word, phrase, and sentence lookup with pronunciation and Vietnamese meaning
 * - AbortController support for instant cancellation when deselecting
 */

export interface JapaneseLookupResult {
  text: string;
  reading?: string | null;
  meaning: string;
  hanViet?: string | null;
  level?: string | null;
  isSentence?: boolean;
}

// In-memory cache for instant responses
const lookupCache = new Map<string, JapaneseLookupResult>();

/**
 * Check if text contains Kanji
 */
export function hasKanji(text: string): boolean {
  return /[一-龯々仝〆〇]/.test(text);
}

/**
 * Check if text is pure Kana (Hiragana / Katakana)
 */
export function isPureKana(text: string): boolean {
  return /^[\u3040-\u309F\u30A0-\u30FF\s・ー]+$/.test(text);
}

/**
 * Look up a Japanese word, phrase, or sentence
 * @param rawText Selected Japanese text
 * @param signal AbortSignal to cancel when deselecting
 */
export async function lookupJapaneseText(
  rawText: string,
  signal?: AbortSignal
): Promise<JapaneseLookupResult> {
  const text = rawText.trim();
  if (!text) {
    throw new Error('Văn bản trống');
  }

  // Check cache
  if (lookupCache.has(text)) {
    return lookupCache.get(text)!;
  }

  const isLongText = text.length > 25 || text.includes('。') || text.includes('\n');

  // 1. Single Kanji Lookup
  if (text.length === 1 && hasKanji(text)) {
    try {
      const kanjiRes = await fetch('https://mazii.net/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dict: 'javi',
          type: 'kanji',
          query: text,
          page: 1
        }),
        signal
      });

      if (kanjiRes.ok) {
        const kanjiData = await kanjiRes.json();
        const firstKanji = kanjiData?.results?.[0];
        if (firstKanji) {
          const kun = firstKanji.kun ? `Kun: ${firstKanji.kun}` : '';
          const on = firstKanji.on ? `On: ${firstKanji.on}` : '';
          const reading = [kun, on].filter(Boolean).join(' • ');

          const result: JapaneseLookupResult = {
            text,
            reading: reading || null,
            meaning: firstKanji.mean || firstKanji.detail || 'Hán tự',
            hanViet: firstKanji.mean || null,
            level: firstKanji.level?.[0] || null,
            isSentence: false
          };
          lookupCache.set(text, result);
          return result;
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') throw err;
      // continue to word search fallback
    }
  }

  // 2. Word or Short Phrase Lookup via Mazii (up to 25 chars)
  if (!isLongText) {
    try {
      const wordRes = await fetch('https://mazii.net/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dict: 'javi',
          type: 'word',
          query: text,
          page: 1
        }),
        signal
      });

      if (wordRes.ok) {
        const wordData = await wordRes.json();
        const firstWord = wordData?.data?.[0];
        if (firstWord && (firstWord.short_mean || firstWord.means?.length > 0)) {
          const cleanPhonetic = firstWord.phonetic
            ? firstWord.phonetic.split(/\s+/)[0]
            : isPureKana(text)
            ? text
            : null;

          const mean =
            firstWord.short_mean ||
            firstWord.means?.[0]?.mean ||
            'Không có định nghĩa ngắn';

          const result: JapaneseLookupResult = {
            text,
            reading: cleanPhonetic,
            meaning: mean,
            hanViet: firstWord.han || null,
            level: firstWord.level?.[0] || null,
            isSentence: false
          };
          lookupCache.set(text, result);
          return result;
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') throw err;
      // continue to translation fallback
    }
  }

  // 3. Sentence or Complex Phrase Translation via MyMemory
  try {
    const cleanForTranslation = text.replace(/<[^>]+>/g, '').trim();
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      cleanForTranslation
    )}&langpair=ja|vi`;

    const transRes = await fetch(url, { signal });
    if (transRes.ok) {
      const transData = await transRes.json();
      const translatedText = transData?.responseData?.translatedText;

      if (translatedText && translatedText !== text) {
        const result: JapaneseLookupResult = {
          text,
          reading: isPureKana(text) ? text : null,
          meaning: translatedText,
          hanViet: null,
          level: null,
          isSentence: isLongText
        };
        lookupCache.set(text, result);
        return result;
      }
    }
  } catch (err: any) {
    if (err.name === 'AbortError') throw err;
  }

  // 4. Pure Kana Fallback if no translation found
  if (isPureKana(text)) {
    const result: JapaneseLookupResult = {
      text,
      reading: text,
      meaning: `Từ/cụm từ ngữ âm: 「${text}」`,
      isSentence: false
    };
    lookupCache.set(text, result);
    return result;
  }

  // 5. Default fallback
  const fallbackResult: JapaneseLookupResult = {
    text,
    reading: null,
    meaning: 'Không tìm thấy nghĩa cụ thể trong từ điển.',
    isSentence: isLongText
  };
  return fallbackResult;
}
