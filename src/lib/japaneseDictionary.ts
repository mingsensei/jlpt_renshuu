/**
 * Japanese Dictionary & Translation Lookup Service
 * - Multi-tiered translation: Google Translate (dict-chrome-ex) + MyMemory fallback
 * - Mazii dictionary for vocabulary, Kanji details, JLPT levels, and Hán-Việt
 * - Clean text normalization (stripping furigana, tags, duplicate whitespace)
 * - In-memory caching for instant repeated lookups
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
 * Check if text contains Kanji characters
 */
export function hasKanji(text: string): boolean {
  return /[一-龯々仝〆〇]/.test(text);
}

/**
 * Check if text is pure Kana (Hiragana / Katakana / punctuation)
 */
export function isPureKana(text: string): boolean {
  return /^[\u3040-\u309F\u30A0-\u30FF\s・ー〜…「」『』、。！？]+$/.test(text);
}

/**
 * Clean Japanese text for translation & dictionary lookup
 * - Removes ruby brackets: 漢字[かんじ] -> 漢字
 * - Removes pipe ruby: [漢字|かんじ] -> 漢字
 * - Removes HTML tags
 * - Normalizes whitespaces and newlines
 */
export function cleanJapaneseTextForTranslation(rawText: string): string {
  if (!rawText) return '';
  return rawText
    .replace(/<rt>.*?<\/rt>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/([一-龯々仝〆〇]+)\[(.*?)\]/g, '$1')
    .replace(/\[([一-龯々仝〆〇]+)\|.*?\]/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Find Furigana for a word from original passage text if annotated
 */
export function findFuriganaInPassage(word: string, passageText: string): string | null {
  if (!word || !passageText) return null;
  try {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = passageText.match(new RegExp(`${escaped}\\[([^\\]]+)\\]`));
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Translate a sentence, clause, or complex phrase using Google Translate with MyMemory fallback
 */
async function translateWithFallback(text: string, signal?: AbortSignal): Promise<string> {
  const clean = cleanJapaneseTextForTranslation(text);
  if (!clean) return '';

  // 1. Tier 1: Google Translate (clients5.google.com dict-chrome-ex endpoint - accurate, fast, no limits)
  try {
    const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=ja&tl=vi&q=${encodeURIComponent(
      clean
    )}`;
    const res = await fetch(url, { signal });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        if (typeof data[0] === 'string') {
          const result = data.filter(Boolean).join(' ').trim();
          if (result) return result;
        }
        if (Array.isArray(data[0])) {
          const result = data
            .map((item) => (Array.isArray(item) ? item[0] : item))
            .filter(Boolean)
            .join(' ')
            .trim();
          if (result) return result;
        }
      }
    }
  } catch (err: any) {
    if (err.name === 'AbortError') throw err;
    // continue to fallback
  }

  // 2. Tier 2: MyMemory Translation fallback
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      clean
    )}&langpair=ja|vi`;
    const res = await fetch(url, { signal });
    if (res.ok) {
      const data = await res.json();
      const translated = data?.responseData?.translatedText;
      if (
        translated &&
        translated !== clean &&
        !translated.includes('MYMEMORY WARNING')
      ) {
        return translated.trim();
      }
    }
  } catch (err: any) {
    if (err.name === 'AbortError') throw err;
  }

  return '';
}

/**
 * Look up a Japanese word, phrase, or sentence
 * @param rawText Selected Japanese text
 * @param signal AbortSignal to cancel when deselecting
 * @param passageContext Optional passage text to extract native Furigana
 */
export async function lookupJapaneseText(
  rawText: string,
  signal?: AbortSignal,
  passageContext?: string
): Promise<JapaneseLookupResult> {
  const cleanText = cleanJapaneseTextForTranslation(rawText);
  if (!cleanText) {
    throw new Error('Văn bản trống');
  }

  // Check in-memory cache
  if (lookupCache.has(cleanText)) {
    return lookupCache.get(cleanText)!;
  }

  // Check if furigana is available in passage context
  const passageFurigana = passageContext
    ? findFuriganaInPassage(cleanText, passageContext)
    : null;

  // Determine if this is a single word or a sentence/long phrase
  // Single word: length <= 12 and no sentence-ending punctuation or commas
  const isSentenceOrClause =
    cleanText.length > 15 ||
    cleanText.includes('。') ||
    cleanText.includes('、') ||
    cleanText.includes('！') ||
    cleanText.includes('？') ||
    cleanText.includes('\n');

  // =========================================================================
  // Case 1: Single Kanji (1 character)
  // =========================================================================
  if (cleanText.length === 1 && hasKanji(cleanText)) {
    try {
      const kanjiRes = await fetch('https://mazii.net/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dict: 'javi',
          type: 'kanji',
          query: cleanText,
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
          const reading = [kun, on].filter(Boolean).join(' • ') || passageFurigana;

          const result: JapaneseLookupResult = {
            text: cleanText,
            reading: reading || null,
            meaning: firstKanji.mean || firstKanji.detail || 'Hán tự',
            hanViet: firstKanji.mean || null,
            level: firstKanji.level?.[0] || null,
            isSentence: false
          };
          lookupCache.set(cleanText, result);
          return result;
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') throw err;
    }
  }

  // =========================================================================
  // Case 2: Single Word or Short Vocabulary (length <= 15, no clause punctuation)
  // =========================================================================
  if (!isSentenceOrClause) {
    try {
      const wordRes = await fetch('https://mazii.net/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dict: 'javi',
          type: 'word',
          query: cleanText,
          page: 1
        }),
        signal
      });

      if (wordRes.ok) {
        const wordData = await wordRes.json();
        const firstWord = wordData?.data?.[0];
        if (firstWord && (firstWord.short_mean || firstWord.means?.length > 0)) {
          const cleanPhonetic =
            passageFurigana ||
            (firstWord.phonetic ? firstWord.phonetic.split(/\s+/)[0] : null) ||
            (isPureKana(cleanText) ? cleanText : null);

          const mean =
            firstWord.short_mean ||
            firstWord.means?.[0]?.mean ||
            'Không có định nghĩa ngắn';

          const result: JapaneseLookupResult = {
            text: cleanText,
            reading: cleanPhonetic,
            meaning: mean,
            hanViet: firstWord.han || null,
            level: firstWord.level?.[0] || null,
            isSentence: false
          };
          lookupCache.set(cleanText, result);
          return result;
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') throw err;
    }
  }

  // =========================================================================
  // Case 3: Sentence, Clause, or Long Phrase Translation (Google + MyMemory)
  // =========================================================================
  try {
    const translatedText = await translateWithFallback(cleanText, signal);
    if (translatedText) {
      const result: JapaneseLookupResult = {
        text: cleanText,
        reading: passageFurigana || (isPureKana(cleanText) ? cleanText : null),
        meaning: translatedText,
        hanViet: null,
        level: null,
        isSentence: true
      };
      lookupCache.set(cleanText, result);
      return result;
    }
  } catch (err: any) {
    if (err.name === 'AbortError') throw err;
  }

  // =========================================================================
  // Case 4: Pure Kana fallback
  // =========================================================================
  if (isPureKana(cleanText)) {
    const result: JapaneseLookupResult = {
      text: cleanText,
      reading: cleanText,
      meaning: `Từ/cụm từ ngữ âm: 「${cleanText}」`,
      isSentence: isSentenceOrClause
    };
    lookupCache.set(cleanText, result);
    return result;
  }

  // =========================================================================
  // Case 5: Final Fallback
  // =========================================================================
  const fallbackResult: JapaneseLookupResult = {
    text: cleanText,
    reading: passageFurigana,
    meaning: 'Không thể kết nối máy chủ dịch nghĩa. Vui lòng thử lại.',
    isSentence: isSentenceOrClause
  };
  return fallbackResult;
}
