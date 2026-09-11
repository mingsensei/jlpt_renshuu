import type { Exam, Question, RawQuestionInput, Lesson } from '../types/exam';

export const SAMPLE_JSON_INPUT: RawQuestionInput[] = [
  {
    question: "「食べます」のて形はどれですか？",
    options: [
      "食べて",
      "食べた",
      "食べる",
      "食べない"
    ],
    answer: 0,
    explanation: "食べます is a group 2 verb. The て-form is 食べて."
  },
  {
    question: "日本の首都はどこですか？",
    options: [
      "大阪",
      "京都",
      "東京",
      "北海道"
    ],
    answer: 2,
    explanation: "Tokyo is the capital city of Japan."
  },
  {
    question: "日本語で「book」は何と言いますか？",
    options: [
      "本",
      "車",
      "水",
      "山"
    ],
    answer: 0,
    explanation: "「本」(ほん) means book."
  },
  {
    question: "わたしはまいあさコーヒーを＿＿＿。",
    options: [
      "のみます",
      "たべます",
      "みます",
      "ききます"
    ],
    answer: 0,
    explanation: "Drinks like coffee use のみます (to drink)."
  },
  {
    question: "きのう、ともだち＿＿えいがをみました。",
    options: [
      "に",
      "と",
      "で",
      "を"
    ],
    answer: 1,
    explanation: "Particle と indicates doing an action together with someone: ともだちと."
  }
];

export const DEMO_LESSONS: Lesson[] = [
  // Vocabulary
  {
    id: "lesson-vocab-1",
    category: "vocabulary",
    title: "Bài 1: Từ vựng Nhập môn & Chào hỏi",
    description: "Từ vựng cơ bản về chào hỏi, giới thiệu bản thân, quốc tịch và nghề nghiệp.",
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "lesson-vocab-2",
    category: "vocabulary",
    title: "Bài 2: Đồ vật & Đời sống hàng ngày",
    description: "Từ vựng đồ dùng cá nhân, đồ vật trong phòng, vị trí và giá cả.",
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "lesson-vocab-3",
    category: "vocabulary",
    title: "Bài 3: Địa điểm & Phương hướng",
    description: "Địa điểm công cộng, phương tiện giao thông và cách hỏi đường.",
    order_index: 3,
    created_at: new Date().toISOString()
  },
  // Kanji
  {
    id: "lesson-kanji-1",
    category: "kanji",
    title: "Bài 1: Chữ số & Thời gian",
    description: "Hán tự căn bản: 一, 二, 三, 四, 五, 六, 七, 八, 九, 十, 日, 月, 年, 時.",
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "lesson-kanji-2",
    category: "kanji",
    title: "Bài 2: Con người & Tự nhiên",
    description: "Hán tự chỉ người và thiên nhiên: 人, 男, 女, 子, 父, 母, 山, 川, 木.",
    order_index: 2,
    created_at: new Date().toISOString()
  },
  // Grammar
  {
    id: "lesson-grammar-1",
    category: "grammar",
    title: "Bài 1: Trợ từ căn bản & Câu khẳng định / phủ định",
    description: "Trọng điểm cấu trúc N5: N1 は N2 です / ではありません, trợ từ の, も.",
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "lesson-grammar-2",
    category: "grammar",
    title: "Bài 2: Trợ từ nơi chốn & hành động (で, に, へ, を)",
    description: "Diễn đạt hành động tại địa điểm (で), di chuyển đến đâu (へ/に), và tân ngữ (を).",
    order_index: 2,
    created_at: new Date().toISOString()
  }
];

export const DEMO_EXAMS: Exam[] = [
  {
    id: "demo-exam-1",
    lesson_id: "lesson-grammar-1",
    title: "JLPT N5 Vocabulary & Grammar Starter",
    description: "Bộ đề trắc nghiệm N5 căn bản kiểm tra ngữ pháp thể て, trợ từ và từ vựng thông dụng.",
    time_limit: 900, // 15 mins
    shuffle_questions: false,
    shuffle_options: false,
    created_at: new Date().toISOString(),
    questions_count: 5
  },
  {
    id: "demo-exam-2",
    lesson_id: "lesson-kanji-1",
    title: "JLPT N5 Kanji Quick Test (Kanji Đọc & Viết)",
    description: "Luyện tập nhận diện Hán tự căn bản cấp độ N5 với chế độ không giới hạn thời gian.",
    time_limit: null, // unlimited
    shuffle_questions: true,
    shuffle_options: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    questions_count: 3
  },
  {
    id: "demo-exam-3",
    lesson_id: "lesson-vocab-1",
    title: "Từ vựng Bài 1: Chào hỏi & Đại từ căn bản",
    description: "Kiểm tra nhanh các câu chào hỏi thường ngày và đại từ nhân xưng tiếng Nhật.",
    time_limit: 600, // 10 mins
    shuffle_questions: true,
    shuffle_options: false,
    created_at: new Date(Date.now() - 43200000).toISOString(),
    questions_count: 2
  }
];

export const DEMO_QUESTIONS: Record<string, Question[]> = {
  "demo-exam-1": [
    {
      id: "q1",
      exam_id: "demo-exam-1",
      question: "「食べます」のて形はどれですか？",
      option_a: "食べて",
      option_b: "食べた",
      option_c: "食べる",
      option_d: "食べない",
      correct_answer: 0,
      explanation: "食べます is a group 2 verb. The て-form is 食べて.",
      order_index: 1
    },
    {
      id: "q2",
      exam_id: "demo-exam-1",
      question: "日本の首都はどこですか？",
      option_a: "大阪",
      option_b: "京都",
      option_c: "東京",
      option_d: "北海道",
      correct_answer: 2,
      explanation: "Tokyo is the capital city of Japan.",
      order_index: 2
    },
    {
      id: "q3",
      exam_id: "demo-exam-1",
      question: "日本語で「book」は何と言いますか？",
      option_a: "本",
      option_b: "車",
      option_c: "水",
      option_d: "山",
      correct_answer: 0,
      explanation: "「本」(ほん) means book.",
      order_index: 3
    },
    {
      id: "q4",
      exam_id: "demo-exam-1",
      question: "わたしはまいあさコーヒーを＿＿＿。",
      option_a: "のみます",
      option_b: "たべます",
      option_c: "みます",
      option_d: "ききます",
      correct_answer: 0,
      explanation: "Drinks like coffee use のみます (to drink).",
      order_index: 4
    },
    {
      id: "q5",
      exam_id: "demo-exam-1",
      question: "きのう、ともだち＿＿えいがをみました。",
      option_a: "に",
      option_b: "と",
      option_c: "で",
      option_d: "を",
      correct_answer: 1,
      explanation: "Particle と indicates doing an action together with someone: ともだちと.",
      order_index: 5
    }
  ],
  "demo-exam-2": [
    {
      id: "q2-1",
      exam_id: "demo-exam-2",
      question: "「水」の読み方はどれですか？",
      option_a: "みず",
      option_b: "ひ",
      option_c: "き",
      option_d: "つち",
      correct_answer: 0,
      explanation: "「水」 đọc là みず (mizu - nước).",
      order_index: 1
    },
    {
      id: "q2-2",
      exam_id: "demo-exam-2",
      question: "「先生」の読み方はどれですか？",
      option_a: "せんせい",
      option_b: "がくせい",
      option_c: "いしゃ",
      option_d: "かいしゃいん",
      correct_answer: 0,
      explanation: "「先生」 đọc là せんせい (sensei - giáo viên/thầy cô).",
      order_index: 2
    },
    {
      id: "q2-3",
      exam_id: "demo-exam-2",
      question: "「車」の読み方はどれですか？",
      option_a: "くるま",
      option_b: "でんしゃ",
      option_c: "じてんしゃ",
      option_d: "ひこうき",
      correct_answer: 0,
      explanation: "「車」 đọc là くるま (kuruma - xe hơi/ô tô).",
      order_index: 3
    }
  ],
  "demo-exam-3": [
    {
      id: "q3-1",
      exam_id: "demo-exam-3",
      question: "Buổi sáng khi gặp nhau, người Nhật thường chào là gì?",
      option_a: "おはようございます",
      option_b: "こんにちは",
      option_c: "こんばんは",
      option_d: "さようなら",
      correct_answer: 0,
      explanation: "おはようございます (Ohayou gozaimasu) là lời chào buổi sáng lịch sự.",
      order_index: 1
    },
    {
      id: "q3-2",
      exam_id: "demo-exam-3",
      question: "Đại từ nhân xưng ngôi thứ nhất 「Tôi」 trong tiếng Nhật là gì?",
      option_a: "わたし",
      option_b: "あなた",
      option_c: "あのひと",
      option_d: "だれ",
      correct_answer: 0,
      explanation: "わたし (watashi) nghĩa là Tôi (ngôi thứ nhất).",
      order_index: 2
    }
  ]
};
