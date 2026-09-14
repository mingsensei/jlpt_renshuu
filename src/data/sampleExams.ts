import type { Exam, Question, RawQuestionInput, Lesson, RawReadingExamInput } from '../types/exam';

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

export const SAMPLE_READING_JSON_INPUT: RawReadingExamInput = {
  title: "JLPT N3 Đọc hiểu: Giá trị của việc đọc sách trong thời đại số",
  description: "Bài đọc hiểu chuẩn cấp độ N3 dài ~500 từ về thói quen đọc sách và tư duy phản biện. Gồm câu hỏi điền vào chỗ trống và chọn đáp án phù hợp kèm bản dịch tiếng Việt.",
  level: "N3",
  time_limit: 1200,
  passage: "読書[どくしょ]は、単[たん]に知識[ちしき]を得[え]るためだけのものではない。昔[むかし]の偉大[いだい]な思想家[しそうか]や作家[さっか]たちが、人生[じんせい]の長[なが]い時間[じかん]をかけて考[かんが]え抜[ぬ]いた結晶[けっしょう]を、私[わたし]たちは本[ほん]を通[つう]じてわずか数時間[すうじかん]で追体験[ついたいけん]することができる。特に現代[げんだい]のように変化[へんか]が激[はげ]しい時代[じだい]においては、日々[ひび]の仕事[しごと]や生活[せいかつ]に追[お]われ、自分[じぶん]を見失[みうしな]いがちになる。そのようなとき、本を開[ひら]くことで、日常[にちじょう]の喧騒[けんそう]から離[はな]れ、静[しず]かに自己[じこ]と向[む]き合[あ]う貴重[きちょう]な時間を持つことができるのである。\n\n最近[さいきん]の調査[ちょうさ]によると、若[わか]い世代[せだい]の「読書離れ」が進[すす]んでいると言[い]われている。スマートフォンやSNSの普及[ふきゅう]により、短時間[たんじかん]で手軽[てがる]に刺激的[しげきてき]な情報[じょうほう]を手に入れることができるようになったため、長文[ちょうぶん]を読む集中力[しゅうちゅうりょく]が低下[ていか]しているという指摘[してき]もある。しかし、（ 1 ）、短時間で消費[しょうひ]される情報と、本をじっくり読むことで得られる深[ふか]い洞察[どうさつ]は、本質的[ほんしつてき]に異[こと]なるものである。\n\n本を読むということは、著者[ちょしゃ]との「対話[たいわ]」である。ページをめくりながら、「なぜ著者はこのように考えたのだろうか」「自分ならどう判断[はんだん]するだろうか」と問[と]いかけることで、受け身ではない（ 2 ）思考力[しこうりょく]が養[やしな]われる。また、異なる視点[してん]や価値観[かちかん]に触[ふ]れることで、自分の狭[せま]い視野[しや]を広[ひろ]げ、多様[たよう]な人々に対する寛容[かんよう]さを身につけることができるのだ。\n\nしたがって、忙[いそが]しい日常の中でも、意識[いしき]して本を読む時間を確保[かくほ]することが重要[じゅうよう]である。（ 3 ）、移動時間[いどうじかん]や寝[ね]る前[まえ]のわずか十五分[じゅうごふん]でも構[かま]わない。日々の小[ちい]さな積[つ]み重[かさ]ねが、やがて豊[ゆた]かな人間性[にんげんせい]を育[はぐく]み、困難[こんなん]な状況[じょうきょう]に直面[ちょくめん]した際[さい]の大[おお]きな支[ささ]えとなるだろう。読書を通じて培[つちか]われた深い思考力と豊かな感受性[かんじゅせい]は、どんな時代になっても色[いろ]あせることのない、かけがえのない財産[ざいさん]となるに違[ちが]いない。",
  passage_translation: "Đọc sách không đơn thuần chỉ là để tiếp thu kiến thức. Thông qua những trang sách, chúng ta có thể trải nghiệm lại chỉ trong vài giờ những kết tinh tư tưởng mà các triết gia, tác giả vĩ đại ngày xưa đã dành cả cuộc đời chiêm nghiệm. Đặc biệt trong thời đại biến đổi chóng mặt như hiện nay, con người rất dễ bị cuốn theo công việc, cuộc sống thường nhật mà đánh mất chính mình. Những lúc như vậy, việc mở một cuốn sách ra sẽ giúp ta tạm rời xa sự ồn ào của đời thường, có được khoảng thời gian quý báu để tĩnh tâm và đối thoại với chính bản thân mình.\n\nTheo các khảo sát gần đây, hiện tượng 'xa rời thói quen đọc sách' ở giới trẻ đang ngày càng gia tăng. Do sự phổ biến của điện thoại thông minh và mạng xã hội, người ta có thể tiếp cận thông tin kích thích một cách nhanh chóng, dẫn đến việc giảm khả năng tập trung khi đọc văn bản dài. Tuy nhiên, rõ ràng là thông tin tiêu thụ chớp nhoáng và sự thấu suốt sâu sắc đạt được nhờ việc nghiền ngẫm một cuốn sách có bản chất hoàn toàn khác nhau.\n\nĐọc sách chính là một 'cuộc đối thoại' với tác giả. Khi vừa lật giở từng trang vừa tự hỏi: 'Tại sao tác giả lại nghĩ như thế này?', 'Nếu là mình thì sẽ phán đoán ra sao?', ta sẽ rèn luyện được năng lực tư duy chủ động chứ không hề thụ động. Hơn nữa, việc tiếp xúc với những góc nhìn và hệ giá trị khác nhau sẽ giúp mở rộng tầm nhìn hạn hẹp của bản thân, đồng thời nuôi dưỡng lòng bao dung với sự đa dạng của mọi người xung quanh.\n\nDo đó, dù trong nhịp sống bận rộn, việc chủ động dành thời gian đọc sách là vô cùng quan trọng. Ví dụ, chỉ cần 15 phút trên đường đi lại hay trước khi đi ngủ cũng là đủ. Sự tích lũy nhỏ bé mỗi ngày đó sẽ dần nuôi dưỡng một nhân cách phong phú, trở thành điểm tựa vững chắc khi ta đối mặt với khó khăn. Năng lực tư duy sâu sắc cùng sự nhạy cảm phong phú được bồi đắp qua việc đọc sách chắc chắn sẽ là tài sản vô giá không bao giờ phai nhạt dù thời đại có đổi thay thế nào.",
  questions: [
    {
      type: "fill_blank",
      question: "（ 1 ）に入る最も適当なものはどれですか？",
      options: [
        "明らかに",
        "めったに",
        "決して",
        "おそらく"
      ],
      answer: 0,
      explanation: "Trước đó tác giả nêu việc thông tin mạng nhanh, nhưng đằng sau khẳng định chắc chắn 2 loại thông tin này về bản chất hoàn toàn khác nhau. Từ phù hợp nhất là 「明らかに」(rõ ràng là, hiển nhiên là)."
    },
    {
      type: "fill_blank",
      question: "（ 2 ）に入る最も適当なものはどれですか？",
      options: [
        "主体的（しゅたいてき）な",
        "受動的（じゅどうてき）な",
        "消極的（しょうきょくてき）な",
        "一時的（いちじてき）な"
      ],
      answer: 0,
      explanation: "Vế trước có '受け身ではない' (không phải là thụ động), từ đối nghĩa tương thích để diễn tả tư duy tích cực, tự mình chủ động chất vấn là '主体的な' (mang tính chủ động)."
    },
    {
      type: "multiple_choice",
      question: "筆者によると、読書をすることの利点として述べられていないものはどれですか？",
      options: [
        "偉大な思想家の考えを短時間で追体験できること",
        "受け身ではない主体的な思考力が養われること",
        "SNSで多くのフォロワーを獲得し有名になれること",
        "多様な人々に対する寛容さを身につけられること"
      ],
      answer: 2,
      explanation: "Trong bài không hề nhắc đến việc đọc sách để tăng lượt follow hay nổi tiếng trên mạng xã hội. Các ý 1, 2, 4 đều được tác giả nêu rõ trong bài đọc."
    },
    {
      type: "multiple_choice",
      question: "筆者がこの文章で最も伝えたいことは何ですか？",
      options: [
        "スマートフォンやSNSの使用を今すぐ完全に禁止するべきだ。",
        "忙しい日常の中でも、意識して本を読む時間を確保することが大切だ。",
        "昔の思想家の本だけを読み、現代の新しい本は読まない方がよい。",
        "十五分以上本を読むと集中力が切れるため、短い読書で済ませるべきだ。"
      ],
      answer: 1,
      explanation: "Ở đoạn cuối, tác giả tóm gọn thông điệp chính: '忙しい日常の中でも、意識して本を読む時間を確保することが重要である' (dù trong nhịp sống bận rộn, việc chủ động dành thời gian đọc sách là vô cùng quan trọng)."
    }
  ]
};

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
  },
  // Reading (chia theo các cấp độ N5 - N1)
  {
    id: "lesson-reading-n5",
    category: "reading",
    title: "Đọc hiểu N5: Thông báo & Đời sống hàng ngày",
    description: "Đoạn văn ngắn chuẩn N5 về sinh hoạt thường nhật, thông báo và thời khóa biểu.",
    level: "N5",
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "lesson-reading-n4",
    category: "reading",
    title: "Đọc hiểu N4: Thư từ & Email trao đổi",
    description: "Luyện đọc hiểu email, tin nhắn công việc và hướng dẫn sinh hoạt đời thường.",
    level: "N4",
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "lesson-reading-n3",
    category: "reading",
    title: "Đọc hiểu N3: Văn hóa & Phong cách sống",
    description: "Đoạn văn trung văn (~500 từ) về tư duy, đời sống và các chủ đề văn hóa xã hội.",
    level: "N3",
    order_index: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "lesson-reading-n2",
    category: "reading",
    title: "Đọc hiểu N2: Xã hội hiện đại & Khoa học",
    description: "Luyện đọc văn bản nghị luận, xã luận phân tích nguyên nhân và giải pháp.",
    level: "N2",
    order_index: 4,
    created_at: new Date().toISOString()
  },
  {
    id: "lesson-reading-n1",
    category: "reading",
    title: "Đọc hiểu N1: Luận điểm & Triết học đời sống",
    description: "Các bài đọc dài, trừu tượng đòi hỏi khả năng nắm bắt tư tưởng tác giả sâu sắc.",
    level: "N1",
    order_index: 5,
    created_at: new Date().toISOString()
  }
];

export const DEMO_EXAMS: Exam[] = [
  {
    id: "demo-exam-reading-n3",
    lesson_id: "lesson-reading-n3",
    title: "JLPT N3 Đọc hiểu: Giá trị của việc đọc sách trong thời đại số",
    description: "Bài đọc hiểu chuẩn cấp độ N3 dài ~500 từ về thói quen đọc sách và tư duy phản biện. Gồm câu hỏi điền vào chỗ trống và chọn đáp án phù hợp kèm bản dịch tiếng Việt.",
    level: "N3",
    time_limit: 1200, // 20 mins
    shuffle_questions: false,
    shuffle_options: false,
    passage: SAMPLE_READING_JSON_INPUT.passage,
    passage_translation: SAMPLE_READING_JSON_INPUT.passage_translation,
    created_at: new Date().toISOString(),
    questions_count: 4
  },
  {
    id: "demo-exam-reading-n5",
    lesson_id: "lesson-reading-n5",
    title: "JLPT N5 Đọc hiểu: Một ngày của bạn Tanaka ở Tokyo",
    description: "Đoạn văn chuẩn N5 về sinh hoạt, học tập và làm thêm của du học sinh tại Tokyo, có câu hỏi điền từ và câu hỏi đọc hiểu.",
    level: "N5",
    time_limit: 900, // 15 mins
    shuffle_questions: false,
    shuffle_options: false,
    passage: "田中[たなか]さんはベトナムからの留学生[りゅうがくせい]です。去年[きょねん]の四月[しがつ]に日本[にほん]へ来[き]ました。いま東京[とうきょう]の日本語学校[にほんごがっこう]で勉強[べんきょう]しています。田中さんのアパートは学校[がっこう]の近[ちか]くにありますから、毎朝[まいあさ]歩[ある]いて学校へ行[い]きます。学校は午前九時[ごぜんくじ]から午後一時[ごごいちじ]までです。教室[きょうしつ]で日本語の文法[ぶんぽう]や漢字[かんじ]を勉強します。\n\n午後[ごご]は週[しゅう]に三日[みっか]、コンビニでアルバイトをしています。コンビニの仕事[しごと]は少[すこ]し大変[たいへん]ですが、店[みせ]の人[ひと]たちも親切[しんせつ]で、日本[にほん]の生活[せいかつ]についていろいろ教[おし]えてくれます。アルバイトのときは（ 1 ）日本語を話[はな]しますから、会話[かいわ]のいい練習[れんしゅう]になります。\n\n週末[しゅうまつ]は、友達[ともだち]と一緒[いっしょ]に公園[こうえん]へ散歩[さんぽ]に行ったり、図書館[としょかん]で本[ほん]を借[か]りたりします。先週[せんしゅう]の日曜日[にちようび]は友達と浅草[あさくさ]へ行きました。古[ふる]いお寺[てら]を見[み]て、おいしい天ぷらを食[た]べました。とても楽[たの]しかったです。田中さんは（ 2 ）、日本の生活に慣[な]れて、毎日[まいにち]充実[じゅうじつ]しています。\n\n将来[しょうらい]、田中さんは日本のIT会社[かいしゃ]で働[はたら]きたいと思[おも]っています。そのために、毎晩[まいばん]アパートで二時間[にじかん]ぐらい熱心[ねっしん]に復習[ふくしゅう]をしています。来年[らいねん]の夏[なつ]には日本語能力試験[にほんごのうりょくしけん]のN2に合格[ごうかく]したいと考[かんが]えています。夢[ゆめ]を叶[かな]えるために、田中さんはこれからも一生懸命[いっしょうけんめい]頑張[がんば]るつもりです。",
    passage_translation: "Bạn Tanaka là du học sinh đến từ Việt Nam. Bạn ấy đã đến Nhật Bản vào tháng 4 năm ngoái. Hiện tại bạn đang học tại một trường tiếng Nhật ở Tokyo. Căn hộ của Tanaka ở gần trường nên mỗi sáng bạn đều đi bộ đến trường. Trường học bắt đầu từ 9 giờ sáng đến 1 giờ chiều. Trong lớp, bạn học ngữ pháp và chữ Hán tiếng Nhật.\n\nBuổi chiều, mỗi tuần 3 ngày, bạn làm thêm tại một cửa hàng tiện lợi. Công việc ở cửa hàng tiện lợi tuy có hơi vất vả nhưng mọi người trong quán rất tốt bụng và chỉ dạy cho bạn nhiều điều về cuộc sống ở Nhật. Khi làm thêm, bạn nói tiếng Nhật liên tục/rất nhiều nên đây là cơ hội luyện tập hội thoại rất tốt.\n\nCuối tuần, bạn cùng bạn bè đi dạo công viên hoặc đến thư viện mượn sách. Chủ nhật tuần trước, bạn đã cùng bạn bè đi Asakusa. Mọi người đã ngắm ngôi chùa cổ và thưởng thức món tempura ngon lành. Chuyến đi vô cùng vui vẻ. Giờ đây, bạn Tanaka đã quen với cuộc sống ở Nhật và mỗi ngày đều trôi qua thật ý nghĩa.\n\nTrong tương lai, Tanaka muốn làm việc tại một công ty IT của Nhật Bản. Vì mục tiêu đó, mỗi tối bạn đều chăm chỉ ôn bài khoảng 2 tiếng tại căn hộ. Bạn dự định sẽ đỗ kỳ thi Năng lực Nhật ngữ N2 vào mùa hè năm sau. Để biến ước mơ thành hiện thực, Tanaka dự định sẽ tiếp tục nỗ lực hết mình từ nay về sau.",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    questions_count: 4
  },
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
  "demo-exam-reading-n3": [
    {
      id: "q-rn3-1",
      exam_id: "demo-exam-reading-n3",
      question_type: "fill_blank",
      question: "（ 1 ）に入る最も適当なものはどれですか？",
      option_a: "明らかに",
      option_b: "めったに",
      option_c: "決して",
      option_d: "おそらく",
      correct_answer: 0,
      explanation: "Trước đó tác giả nêu việc thông tin mạng nhanh, nhưng đằng sau khẳng định chắc chắn 2 loại thông tin này về bản chất hoàn toàn khác nhau. Từ phù hợp nhất là 「明らかに」(rõ ràng là, hiển nhiên là).",
      order_index: 1
    },
    {
      id: "q-rn3-2",
      exam_id: "demo-exam-reading-n3",
      question_type: "fill_blank",
      question: "（ 2 ）に入る最も適当なものはどれですか？",
      option_a: "主体的（しゅたいてき）な",
      option_b: "受動的（じゅどうてき）な",
      option_c: "消極的（しょうきょくてき）な",
      option_d: "一時的（いちじてき）な",
      correct_answer: 0,
      explanation: "Vế trước có '受け身ではない' (không phải là thụ động), từ đối nghĩa tương thích để diễn tả tư duy tích cực, tự mình chủ động chất vấn là '主体的な' (mang tính chủ động).",
      order_index: 2
    },
    {
      id: "q-rn3-3",
      exam_id: "demo-exam-reading-n3",
      question_type: "multiple_choice",
      question: "筆者によると、読書をすることの利点として述べられていないものはどれですか？",
      option_a: "偉大な思想家の考えを短時間で追体験できること",
      option_b: "受け身ではない主体的な思考力が養われること",
      option_c: "SNSで多くのフォロワーを獲得し有名になれること",
      option_d: "多様な人々に対する寛容さを身につけられること",
      correct_answer: 2,
      explanation: "Trong bài không hề nhắc đến việc đọc sách để tăng lượt follow hay nổi tiếng trên mạng xã hội. Các ý khác đều được tác giả nêu rõ trong bài đọc.",
      order_index: 3
    },
    {
      id: "q-rn3-4",
      exam_id: "demo-exam-reading-n3",
      question_type: "multiple_choice",
      question: "筆者がこの文章で最も伝えたいことは何ですか？",
      option_a: "スマートフォンやSNSの使用を今すぐ完全に禁止するべきだ。",
      option_b: "忙しい日常の中でも、意識して本を読む時間を確保することが大切だ。",
      option_c: "昔の思想家の本だけを読み、現代の新しい本は読まない方がよい。",
      option_d: "十五分以上本を読むと集中力が切れるため、短い読書で済ませるべきだ。",
      correct_answer: 1,
      explanation: "Ở đoạn cuối, tác giả tóm gọn thông điệp chính: '忙しい日常の中でも、意識して本を読む時間を確保することが重要である' (dù trong nhịp sống bận rộn, việc chủ động dành thời gian đọc sách là vô cùng quan trọng).",
      order_index: 4
    }
  ],
  "demo-exam-reading-n5": [
    {
      id: "q-rn5-1",
      exam_id: "demo-exam-reading-n5",
      question_type: "fill_blank",
      question: "（ 1 ）に入る最も適当なものはどれですか？",
      option_a: "たくさん",
      option_b: "あまり",
      option_c: "ぜんぜん",
      option_d: "すこし",
      correct_answer: 0,
      explanation: "Làm thêm ở konbini là cơ hội tốt để luyện giao tiếp vì được nói tiếng Nhật rất nhiều (たくさん). Các từ あまり/ぜんぜん đi với thể phủ định nên không phù hợp.",
      order_index: 1
    },
    {
      id: "q-rn5-2",
      exam_id: "demo-exam-reading-n5",
      question_type: "fill_blank",
      question: "（ 2 ）に入る最も適当なものはどれですか？",
      option_a: "いまでは",
      option_b: "きのうは",
      option_c: "あしたは",
      option_d: "むかしは",
      correct_answer: 0,
      explanation: "Nói về hiện tại sau một thời gian đã quen với cuộc sống ở Nhật: 'いまでは' (giờ đây, hiện nay thì).",
      order_index: 2
    },
    {
      id: "q-rn5-3",
      exam_id: "demo-exam-reading-n5",
      question_type: "multiple_choice",
      question: "田中さんは毎朝どうやって学校へ行きますか？",
      option_a: "歩いて行きます",
      option_b: "電車で行きます",
      option_c: "バスで行きます",
      option_d: "自転車で行きます",
      correct_answer: 0,
      explanation: "Trong bài viết rõ: '田中さんのアパートは学校の近くにありますから、毎朝歩いて学校へ行きます' (vì nhà gần nên đi bộ).",
      order_index: 3
    },
    {
      id: "q-rn5-4",
      exam_id: "demo-exam-reading-n5",
      question_type: "multiple_choice",
      question: "田中さんの将来の夢は何ですか？",
      option_a: "日本のIT会社で働くことです",
      option_b: "コンビニの店長になることです",
      option_c: "ベトナムにすぐ帰ることです",
      option_d: "日本語学校の先生になることです",
      correct_answer: 0,
      explanation: "Đoạn cuối bài viết: '将来、田中さんは日本のIT会社で働きたいと思っています' (muốn làm việc tại công ty IT của Nhật Bản).",
      order_index: 4
    }
  ],
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
