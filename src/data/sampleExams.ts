import type { Exam, Question, RawQuestionInput } from '../types/exam';

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

export const DEMO_EXAMS: Exam[] = [
  {
    id: "demo-exam-1",
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
    title: "JLPT N5 Kanji Quick Test (Kanji Đọc & Viết)",
    description: "Luyện tập nhận diện Hán tự căn bản cấp độ N5 với chế độ không giới hạn thời gian.",
    time_limit: null, // unlimited
    shuffle_questions: true,
    shuffle_options: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    questions_count: 3
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
  ]
};
