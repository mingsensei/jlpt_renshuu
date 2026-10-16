// Auto-generated 20 N3 Vocabulary Topics with Visual Diagrams
export interface VocabCollocation {
  ja: string;
  furigana: string;
  vn: string;
}

export interface VocabExample {
  sentence: string;
  translation: string;
}

export interface VocabSlideItem {
  id: number;
  slide_number: number;
  word: string;
  furigana: string;
  romaji: string;
  han_viet: string;
  meaning_vn: string;
  word_type: string;
  tag: string;
  visual_diagram: string;
  diagram_caption?: string;
  mnemonic?: string;
  collocations: VocabCollocation[];
  example?: VocabExample;
}

export interface VocabTopic {
  topic_id: string;
  title: string;
  japanese_title: string;
  description: string;
  level: string;
  slides: VocabSlideItem[];
}

export const N3_VOCAB_TOPICS: VocabTopic[] = [
  {
    "topic_id": "topic_01_tim_phong_chuyen_nha",
    "title": "Chủ đề 01: Tìm phòng & Thuê nhà",
    "japanese_title": "部屋探し・賃貸・引っ越しの語彙",
    "description": "Bộ từ vựng và sơ đồ slide trực quan về chi phí ban đầu, hợp đồng thuê nhà và chuyển dọn chỗ ở tại Nhật.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "敷金",
        "furigana": "しききん",
        "romaji": "shikikin",
        "han_viet": "PHU KIM",
        "meaning_vn": "Tiền cọc thuê nhà (được hoàn lại phần dư)",
        "word_type": "Danh từ",
        "tag": "Chi phí thuê nhà",
        "visual_diagram": "         🏠 不動産契約 (Hợp đồng thuê nhà)\n                   │\n       ┌───────────┴───────────┐\n       ▼                       ▼\n   💰 敷金 (しききん)         🎁 礼金 (れいきん)\n     (được hoàn lại)         (mất trắng)",
        "diagram_caption": "Sơ đồ phân biệt 2 khoản phí ban đầu quan trọng nhất khi thuê nhà ở Nhật",
        "mnemonic": "Chữ PHU (敷) là 'trải ra làm nền'. Tiền cọc lót nền đảm bảo cho chủ nhà, trừ chi phí sửa chữa còn dư sẽ nhận lại.",
        "collocations": [
          {
            "ja": "敷金を納める",
            "furigana": "しききんをおさめる",
            "vn": "Nộp tiền đặt cọc"
          },
          {
            "ja": "敷金の返還",
            "furigana": "しききんのへんかん",
            "vn": "Hoàn trả lại tiền cọc"
          },
          {
            "ja": "敷金ゼロ物件",
            "furigana": "しききんゼロぶっけん",
            "vn": "Nhà thuê không cần cọc"
          }
        ],
        "example": {
          "sentence": "退去[たいきょ]の際[さい]、部屋[へや]を綺麗[きれい]に使[つか]っていれば敷金[しききん]が返[かえ]ってくる。",
          "translation": "Khi trả phòng, nếu giữ gìn phòng sạch sẽ thì tiền cọc sẽ được hoàn trả lại."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "礼金",
        "furigana": "れいきん",
        "romaji": "reikin",
        "han_viet": "LỄ KIM",
        "meaning_vn": "Tiền lễ cảm ơn chủ nhà (mất trắng không hoàn lại)",
        "word_type": "Danh từ",
        "tag": "Chi phí thuê nhà",
        "visual_diagram": "   🙋‍♂️ 入居者 (Người thuê) ──🎁 礼金──▶ 👨‍💼 大家さん (Chủ nhà)\n                    │\n                    └──▶ (❌ 原則戻らない - Không bao giờ trả lại)",
        "diagram_caption": "Tiền lễ là khoản biếu tặng cảm ơn chủ nhà cho thuê, mất trắng 100%",
        "mnemonic": "LỄ (礼) trong 'lễ nghĩa, quà cảm ơn'. Đã là quà biếu chủ nhà thì không có chuyện đòi lại.",
        "collocations": [
          {
            "ja": "礼金を支払う",
            "furigana": "れいきんをしはらう",
            "vn": "Thanh toán tiền lễ"
          },
          {
            "ja": "礼金なし",
            "furigana": "れいきんなし",
            "vn": "Miễn tiền lễ"
          },
          {
            "ja": "家賃の1ヶ月分",
            "furigana": "やちんのいっかげつぶん",
            "vn": "Tương đương 1 tháng tiền nhà"
          }
        ],
        "example": {
          "sentence": "最近[さいきん]は若者[わかもの]向[む]けに礼金[れいきん]が不要[ふよう]な物件[ぶっけん]も増[ふ]えている。",
          "translation": "Gần đây những căn nhà không cần tiền lễ dành cho giới trẻ cũng đang tăng lên."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "間取り",
        "furigana": "まどり",
        "romaji": "madori",
        "han_viet": "GIAN THỦ",
        "meaning_vn": "Sơ đồ bố cục phòng (1R, 1K, 1DK, 1LDK)",
        "word_type": "Danh từ",
        "tag": "Chọn phòng",
        "visual_diagram": "   [1R]:  🚪──▶ [🛏️ Phòng ngủ + 🍳 Bếp chung 1 không gian]\n   [1K]:  🚪──▶ [🍳 Bếp] ──cửa ngăn──▶ [🛏️ Phòng ngủ]\n   [1DK]: 🚪──▶ [🍽️ Bếp + Bàn ăn] ──▶ [🛏️ Phòng ngủ]\n   [1LDK]:🚪──▶ [🛋️ Phòng khách + Bếp rộng] ──▶ [🛏️]",
        "diagram_caption": "Sự khác biệt các ký hiệu sơ đồ nhà trọ Nhật Bản: R = Room, K = Kitchen, D = Dining, L = Living",
        "mnemonic": "間 (gian - không gian, phòng) + 取り (thủ - sắp đặt, bố trí) = Cách bố trí mặt bằng căn nhà.",
        "collocations": [
          {
            "ja": "間取り図を確認する",
            "furigana": "まどりずをかくにんする",
            "vn": "Kiểm tra bản vẽ sơ đồ phòng"
          },
          {
            "ja": "一人暮らし向けの間取り",
            "furigana": "ひとりぐらしむけのまどり",
            "vn": "Bố cục phòng phù hợp sống một mình"
          },
          {
            "ja": "南向きの間取り",
            "furigana": "みなみむきのまどり",
            "vn": "Phòng hướng nam đón nắng"
          }
        ],
        "example": {
          "sentence": "不動産[ふどうさん]のサイトで自分[じぶん]の希望[きぼう]に合[あ]った間取[まど]りを探[さが]す。",
          "translation": "Tìm sơ đồ phòng phù hợp với nguyện vọng của mình trên trang web bất động sản."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "徒歩",
        "furigana": "とほ",
        "romaji": "toho",
        "han_viet": "ĐỒ BỘ",
        "meaning_vn": "Đi bộ (quy ước: 80m = 1 phút đi bộ)",
        "word_type": "Danh từ",
        "tag": "Vị trí & Đi lại",
        "visual_diagram": "   🚉 最寄り駅 (Ga gần nhất)\n      │\n      │ 🚶 徒歩5分 (~400m - Rất gần, giá cao)\n      │ 🚶 徒歩15分 (~1.2km - Đi bộ xa, giá rẻ hơn)\n      ▼\n   🏠 我が家 (Nhà mình)",
        "diagram_caption": "Quy chuẩn bất động sản Nhật: Cứ 80 mét đường bằng = 1 phút đi bộ",
        "mnemonic": "ĐỒ (徒 - người đi bộ) + BỘ (歩 - bước chân) = Đi bộ bằng chính đôi chân mình.",
        "collocations": [
          {
            "ja": "駅から徒歩10分",
            "furigana": "えきからとほじゅっぷん",
            "vn": "Đi bộ 10 phút từ nhà ga"
          },
          {
            "ja": "徒歩圏内",
            "furigana": "とほけんない",
            "vn": "Trong phạm vi đi bộ được"
          },
          {
            "ja": "徒歩で通う",
            "furigana": "とほでかよう",
            "vn": "Đi bộ đi làm/đi học hàng ngày"
          }
        ],
        "example": {
          "sentence": "最寄[もよ]り駅[えき]から徒歩[とほ]５分[ごふん]の近[ちか]い物件[ぶっけん]を選[えら]んだ。",
          "translation": "Tôi đã chọn một căn nhà gần ga nhất, chỉ mất 5 phút đi bộ."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "家賃",
        "furigana": "やちん",
        "romaji": "yachin",
        "han_viet": "GIA THẢM",
        "meaning_vn": "Tiền thuê nhà hàng tháng",
        "word_type": "Danh từ",
        "tag": "Chi phí thuê nhà",
        "visual_diagram": "   📅 毎月末 (Cuối mỗi tháng)\n      │\n      └──💸 家賃 (Tiền thuê nhà) ──▶ 🏦 口座引き落とし (Trừ tự động)\n      └──🏢 管理費 (Phí quản lý chung)",
        "diagram_caption": "Tiền nhà thường đóng vào ngày 25 hoặc cuối tháng qua trừ tài khoản ngân hàng",
        "mnemonic": "GIA (家 - ngôi nhà) + THẢM/TIỀN (賃 - tiền công, tiền thuê) = Tiền trả để ở trong nhà.",
        "collocations": [
          {
            "ja": "家賃を滞納する",
            "furigana": "やちんをたいのうする",
            "vn": "Chậm / nợ tiền nhà (rất kỵ ở Nhật)"
          },
          {
            "ja": "家賃相場",
            "furigana": "やちんそうば",
            "vn": "Mức giá thuê trung bình của khu vực"
          },
          {
            "ja": "手頃な家賃",
            "furigana": "てごろなやちん",
            "vn": "Mức tiền nhà vừa túi tiền"
          }
        ],
        "example": {
          "sentence": "毎月[まいつき]の家賃[やちん]は給料[きゅうりょう]の三分[さんぶん]の一[いち]以内[いない]に抑[おさ]えるべきだ。",
          "translation": "Tiền nhà hàng tháng nên kiềm chế trong mức 1/3 tiền lương."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "仲介手数料",
        "furigana": "ちゅうかいてすうりょう",
        "romaji": "chuukai tesuuryou",
        "han_viet": "TRỌNG GIỚI THỦ SỐ LIỆU",
        "meaning_vn": "Phí môi giới (trả cho công ty bất động sản)",
        "word_type": "Danh từ",
        "tag": "Chi phí thuê nhà",
        "visual_diagram": "   🙋‍♂️ Người thuê ───🤝─── 👨‍💼 Chủ nhà\n              ▲\n              │ 💼 不動産会社 (Công ty môi giới)\n              └──💵 仲介手数料 (Thường = 0.5 ~ 1 tháng nhà)",
        "diagram_caption": "Phí trung gian kết nối giữa người thuê và chủ nhà cho bên môi giới",
        "mnemonic": "TRỌNG GIỚI (仲介 - làm mối, trung gian) + THỦ TỤC LIỆU (手数料 - tiền công hoa hồng).",
        "collocations": [
          {
            "ja": "仲介手数料を払う",
            "furigana": "ちゅうかいてすうりょうをはらう",
            "vn": "Thanh toán phí môi giới"
          },
          {
            "ja": "仲介手数料半額",
            "furigana": "ちゅうかいてすうりょうはんがく",
            "vn": "Giảm nửa giá phí môi giới"
          }
        ],
        "example": {
          "sentence": "仲介[ちゅうかい]手数料[てすうりょう]として、家賃[やちん]一[いち]ヶ月[かげつ]分[ぶん]を不動産[ふどうさん]に支払[しはら]った。",
          "translation": "Tôi đã trả 1 tháng tiền nhà làm phí môi giới cho công ty bất động sản."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "契約",
        "furigana": "けいやく",
        "romaji": "keiyaku",
        "han_viet": "KHẾ ƯỚC",
        "meaning_vn": "Hợp đồng, ký kết thỏa thuận pháp lý",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Thủ tục giấy tờ",
        "visual_diagram": "   📄 賃貸契約書 (Hợp đồng thuê)\n   ├── ✍️ 署名 (Ký tên)\n   ├── 🔴 捺印 (Đóng dấu cá nhân)\n   └── ⏱️ 契約期間: 2年間 (Thời hạn hợp đồng 2 năm)",
        "diagram_caption": "Hợp đồng thuê nhà ở Nhật có giá trị pháp lý cao, thường có thời hạn 2 năm",
        "mnemonic": "KHẾ (契 - ràng buộc chặt chẽ) + ƯỚC (約 - ước hẹn, giao kèo) = Hợp đồng cam kết thực hiện.",
        "collocations": [
          {
            "ja": "契約を結ぶ",
            "furigana": "けいやくをむすぶ",
            "vn": "Ký kết hợp đồng"
          },
          {
            "ja": "契約を解除する / 解約",
            "furigana": "けいやくをかいじょする / かいやく",
            "vn": "Hủy bỏ / thanh lý hợp đồng"
          },
          {
            "ja": "契約違反",
            "furigana": "けいやくいはん",
            "vn": "Vi phạm điều khoản hợp đồng"
          }
        ],
        "example": {
          "sentence": "契約書[けいやくしょ]の内容[ないよう]を隅々[すみずみ]までよく読[よ]んでからサインする。",
          "translation": "Đọc kỹ từng điều khoản trong bản hợp đồng rồi mới ký tên."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "更新料",
        "furigana": "こうしんりょう",
        "romaji": "koushinryou",
        "han_viet": "CANH TÂN LIỆU",
        "meaning_vn": "Phí gia hạn hợp đồng (sau mỗi 2 năm)",
        "word_type": "Danh từ",
        "tag": "Chi phí thuê nhà",
        "visual_diagram": "   📅 Hết hạn 2 năm ──▶ Bạn muốn ở tiếp?\n                        ├── Có: 💵 Đóng 更新料 (1 tháng nhà)\n                        └── Không: 📦 Dọn nhà (退去)",
        "diagram_caption": "Đặc trưng ở Tokyo/vùng Kanto: Khi hợp đồng 2 năm kết thúc, phải đóng phí để gia hạn",
        "mnemonic": "CANH TÂN (更新 - làm mới lại hợp đồng) + LIỆU (料 - tiền phí) = Phí tiếp tục gia hạn hợp đồng.",
        "collocations": [
          {
            "ja": "契約を更新する",
            "furigana": "けいやくをこうしんする",
            "vn": "Gia hạn hợp đồng"
          },
          {
            "ja": "更新料の請求",
            "furigana": "こうしんりょうのせいきゅう",
            "vn": "Giấy yêu cầu đóng tiền gia hạn"
          }
        ],
        "example": {
          "sentence": "二年[にねん]ごとに家賃[やちん]一[いち]ヶ月[かげつ]分[ぶん]の更新料[こうしんりょう]がかかる。",
          "translation": "Cứ mỗi 2 năm lại tốn một khoản phí gia hạn bằng một tháng tiền nhà."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "退去",
        "furigana": "たいきょ",
        "romaji": "taikyo",
        "han_viet": "THOÁI KHỨ",
        "meaning_vn": "Rời đi, trả phòng, chấm dứt thuê",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Chuyển nhà",
        "visual_diagram": "   🏃‍♂️ 退去 (Trả phòng)  ◀─── đối lập ───▶  🧳 入居 (Dọn vào ở)\n            │\n            ├── 📢 Thông báo trước 1 tháng (退去予告)\n            ├── 🧹 Dọn phòng sạch sẽ (原状回復)\n            └── 🔑 Trả lại chìa khóa (鍵の返却)",
        "diagram_caption": "Quy trình trả phòng: Phải báo trước ít nhất 1 tháng và cùng chủ nhà nghiệm thu",
        "mnemonic": "THOÁI (退 - rút lui) + KHỨ (去 - rời đi) = Rời khỏi căn phòng chuyển sang nơi khác.",
        "collocations": [
          {
            "ja": "退去の手続き",
            "furigana": "たいきょのてつづき",
            "vn": "Thủ tục trả phòng"
          },
          {
            "ja": "退去費用",
            "furigana": "たいきょひよう",
            "vn": "Chi phí dọn dẹp sửa chữa khi trả phòng"
          },
          {
            "ja": "期日までに退去する",
            "furigana": "きじつまでにあるたいきょする",
            "vn": "Rời đi trước thời hạn quy định"
          }
        ],
        "example": {
          "sentence": "アパートを退去[たいきょ]する際[さい]は、一[いち]ヶ月[かげつ]前[まえ]に連絡[れんらく]しなければならない。",
          "translation": "Khi muốn trả phòng căn hộ, bắt buộc phải liên lạc thông báo trước một tháng."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "物件",
        "furigana": "ぶっけん",
        "romaji": "bukken",
        "han_viet": "VẬT KIỆN",
        "meaning_vn": "Căn phòng, bất động sản cần cho thuê hoặc bán",
        "word_type": "Danh từ",
        "tag": "Tìm nhà",
        "visual_diagram": "   🏢 物件 (Căn hộ / Bất động sản)\n   ├── 🌟 優良物件 (Căn hộ xịn xò, giá tốt)\n   ├── 📉 築年数 (Số năm tuổi của tòa nhà: 築浅 vs 築古)\n   └── 📐 専有面積 (Diện tích sử dụng riêng tính theo m² hoặc 畳)",
        "diagram_caption": "Từ chuyên môn ngành BĐS chỉ căn phòng, ngôi nhà được đưa ra thị trường",
        "mnemonic": "VẬT (物 - đồ vật) + KIỆN (件 - sự việc, hồ sơ) = Món tài sản nhà đất được niêm yết.",
        "collocations": [
          {
            "ja": "条件に合う物件",
            "furigana": "じょうけんにあうぶっけん",
            "vn": "Căn nhà phù hợp với các tiêu chí"
          },
          {
            "ja": "物件を下見する / 内見",
            "furigana": "ぶっけんをしたみする / ないけん",
            "vn": "Đi xem trực tiếp căn phòng trước khi thuê"
          },
          {
            "ja": "人気物件",
            "furigana": "にんきぶっけん",
            "vn": "Căn phòng hot nhiều người tranh thuê"
          }
        ],
        "example": {
          "sentence": "ネットの写真[しゃしん]だけでなく、実際[じっさい]に物件[ぶっけん]を見[み]に行[い]って決[き]める。",
          "translation": "Không chỉ nhìn ảnh trên mạng mà nên trực tiếp đến xem tận mắt căn phòng rồi mới quyết định."
        }
      }
    ]
  },
  {
    "topic_id": "topic_02_rac_thai_chung_cu",
    "title": "Chủ đề 02: Rác thải sinh hoạt & Chung cư",
    "japanese_title": "ゴミ分別・マンション生活の語彙",
    "description": "Các quy tắc phân loại rác khắt khe tại Nhật Bản và phép lịch sự trong đời sống tập thể chung cư.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "燃えるゴミ",
        "furigana": "もえるごみ",
        "romaji": "moeru gomi",
        "han_viet": "NHIÊN TRẦN",
        "meaning_vn": "Rác cháy được (rác thực phẩm, giấy vụn, lá cây)",
        "word_type": "Danh từ",
        "tag": "Phân loại rác",
        "visual_diagram": "   🔥 燃えるゴミ (Cháy được)    vs    ❄️ 燃えないゴミ (Không cháy)\n   ┌──────────────────────┐          ┌──────────────────────┐\n   │ 🍌 Thức ăn thừa       │          │ 🔨 Kim loại, chảo cũ │\n   │ 🧻 Giấy lau, vỏ hộp  │          │ 🏺 Thủy tinh vỡ, gốm │\n   │ 🍂 Lá cây, cành nhỏ  │          │ 💡 Bóng đèn huỳnh quang│\n   └──────────────────────┘          └──────────────────────┘",
        "diagram_caption": "Hai nhóm rác cơ bản nhất tại mọi gia đình Nhật, lịch vứt khác nhau",
        "mnemonic": "NHIÊN (燃) = LỬA (火) + NHIÊN (然). Đốt lên cháy thành tro là 燃えるゴミ.",
        "collocations": [
          {
            "ja": "燃えるゴミの日",
            "furigana": "もえるごみのひ",
            "vn": "Ngày thu gom rác cháy được (thường tuần 2 lần)"
          },
          {
            "ja": "生ゴミ",
            "furigana": "なまごみ",
            "vn": "Rác nhà bếp / đồ tươi sống"
          },
          {
            "ja": "ゴミ袋に入れる",
            "furigana": "ごみぶくろにいれる",
            "vn": "Bỏ vào túi đựng rác chỉ định của quận"
          }
        ],
        "example": {
          "sentence": "火曜日[かようび]と金曜日[きんようび]の朝[あさ]八時[はちじ]までに燃[も]えるゴミを出[だ]してください。",
          "translation": "Xin hãy vứt rác cháy được trước 8 giờ sáng vào các ngày thứ Ba và thứ Sáu."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "燃えないゴミ",
        "furigana": "もえないごみ",
        "romaji": "moenai gomi",
        "han_viet": "BẤT NHIÊN TRẦN",
        "meaning_vn": "Rác không cháy được (kim loại, gốm sứ, đồ điện nhỏ)",
        "word_type": "Danh từ",
        "tag": "Phân loại rác",
        "visual_diagram": "   🚫 Không cháy được (不燃ゴミ・燃えないゴミ)\n   ├── 🍽️ Đĩa sành vỡ ── gói giấy báo và dán chữ: 「キケン」(Nguy hiểm)\n   ├── 🔋 Pin, ắc quy ── bỏ thùng gom riêng tại cửa hàng tiện lợi / ga\n   └── 🍳 Chảo cũ, dao kéo ── mang ra đúng ngày quy định",
        "diagram_caption": "Rác nguy hiểm như dao, thủy tinh phải bọc giấy báo cẩn thận để tránh làm nhân viên vệ sinh bị thương",
        "mnemonic": "Thêm phủ định ない: 燃えない = Không thể đốt cháy được bằng nhiệt độ lò thiêu thường.",
        "collocations": [
          {
            "ja": "不燃ゴミ",
            "furigana": "ふねんごみ",
            "vn": "Từ Hán Việt đồng nghĩa: Bất nhiên trần"
          },
          {
            "ja": "月二回回収",
            "furigana": "つきにかいかいしゅう",
            "vn": "Thu gom 2 lần mỗi tháng"
          }
        ],
        "example": {
          "sentence": "割[わ]れたコップは新聞紙[しんぶんし]に包[つつ]んで、燃[も]えないゴミとして出[だ]す。",
          "translation": "Cốc bị vỡ thì hãy bọc trong giấy báo rồi mới vứt như rác không cháy được."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "粗大ゴミ",
        "furigana": "そだいごみ",
        "romaji": "sodai gomi",
        "han_viet": "THÔ ĐẠI TRẦN",
        "meaning_vn": "Rác khổ lớn (bàn ghế, đệm, xe đạp - phải mua tem dán)",
        "word_type": "Danh từ",
        "tag": "Phân loại rác",
        "visual_diagram": "   🛋️ 粗大ゴミ (Rác cồng kềnh dài > 30cm)\n   ├── 1. 📞 Gọi điện / Đăng ký qua web Ủy ban quận (粗大ゴミ受付センター)\n   ├── 2. 🏪 Mua tem dán tại Konbini (粗大ゴミ処理券: ~400円 - 2000円)\n   └── 3. 🏷️ Dán tem lên đồ và đặt trước cửa đúng ngày hẹn",
        "diagram_caption": "Không được tự ý vứt rác to ra bãi rác, bắt buộc phải trả phí xử lý và hẹn ngày",
        "mnemonic": "THÔ (粗 - thô ráp, to) + ĐẠI (大 - lớn). Bất kỳ đồ vật nào có cạnh dài hơn 30cm đều là Thô Đại rác.",
        "collocations": [
          {
            "ja": "粗大ゴミを申し込む",
            "furigana": "そだいごみをもうしこむ",
            "vn": "Đăng ký xử lý rác cồng kềnh"
          },
          {
            "ja": "処理手数料券",
            "furigana": "しょりてすうりょうけん",
            "vn": "Tem phí xử lý rác cồng kềnh"
          }
        ],
        "example": {
          "sentence": "引[ひ]っ越[こ]しで不要[ふよう]になった机[つくえ]を粗大[そだい]ゴミとして処分[しょぶん]した。",
          "translation": "Tôi đã vứt chiếc bàn học không dùng nữa do chuyển nhà theo diện rác cồng kềnh."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "資源ゴミ",
        "furigana": "しげんごみ",
        "romaji": "shigen gomi",
        "han_viet": "TƯ NGUYÊN TRẦN",
        "meaning_vn": "Rác tái chế (chai nhựa PET, lon, chai thủy tinh, giấy báo)",
        "word_type": "Danh từ",
        "tag": "Phân loại rác",
        "visual_diagram": "   ♻️ 資源ゴミ (Rác tái chế) ── Quy tắc 3 bước với chai nhựa:\n   1. 🏷️ Bóc màng bọc nilon (ラベルをはがす)\n   2. 🔘 Tháo nắp nhựa (キャップをはずす)\n   3. 💧 Rửa sạch nước bên trong & Giẫm bẹp (中を洗って潰す)",
        "diagram_caption": "Quy tắc vứt chai nước khoáng PET chuẩn mực tại Nhật Bản",
        "mnemonic": "TƯ NGUYÊN (資源) là tài nguyên. Rác nhưng là nguồn tài nguyên tái chế được.",
        "collocations": [
          {
            "ja": "資源ゴミを分別する",
            "furigana": "しげんごみをぶんべつする",
            "vn": "Phân loại rác tái chế"
          },
          {
            "ja": "ペットボトルと缶",
            "furigana": "ペットボトルとかん",
            "vn": "Chai nhựa PET và lon nhôm/thiếc"
          }
        ],
        "example": {
          "sentence": "ペットボトルは中[なか]を水[みず]で洗[あら]ってから、資源[しげん]ゴミの箱[はこ]に入[い]れてください。",
          "translation": "Chai nhựa PET hãy tráng sạch bên trong bằng nước rồi mới bỏ vào thùng rác tái chế."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "分別",
        "furigana": "ぶんべつ",
        "romaji": "bunbetsu",
        "han_viet": "PHÂN BIỆT",
        "meaning_vn": "Phân loại rác đúng chủng loại",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Hành động",
        "visual_diagram": "   🗑️ ゴミ (Rác tổng hợp)\n       ├── 🔴 燃える (Cháy)\n       ├── 🔵 燃えない (Không cháy)\n       └── 🟢 資源 (Tái chế)\n       ==▶ Phân loại chính xác = 分別 (ぶんべつ)",
        "diagram_caption": "Phân loại rác là nét văn hóa bắt buộc thể hiện ý thức công dân tại Nhật Bản",
        "mnemonic": "PHÂN (分 - chia nhỏ) + BIỆT (別 - riêng biệt) = Tách riêng từng nhóm rác ra.",
        "collocations": [
          {
            "ja": "ゴミを正しく分別する",
            "furigana": "ごみをただしくぶんべつする",
            "vn": "Phân loại rác chính xác"
          },
          {
            "ja": "分別のルールを守る",
            "furigana": "ぶんべつのルールをまもる",
            "vn": "Tuân thủ quy định phân loại rác"
          }
        ],
        "example": {
          "sentence": "日本[にほん]では地域[ちいき]によってゴミの分別[ぶんべつ]方法[ほうほう]が異[こと]なる。",
          "translation": "Tại Nhật Bản, tùy vào từng khu vực mà cách phân loại rác sẽ khác nhau."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "収集日",
        "furigana": "しゅうしゅうび",
        "romaji": "shuushuubi",
        "han_viet": "THU TẬP NHẬT",
        "meaning_vn": "Ngày thu gom rác theo lịch của phường",
        "word_type": "Danh từ",
        "tag": "Lịch sinh hoạt",
        "visual_diagram": "   📅 ゴミ収集カレンダー (Lịch thu rác):\n   ├── Thứ 2: 🥫 Lon, chai thủy tinh (缶・ビン)\n   ├── Thứ 3: 🔥 Rác cháy được (可燃ゴミ)\n   ├── Thứ 4: 📦 Bìa carton, giấy báo (古紙)\n   └── Thứ 6: 🔥 Rác cháy được (可燃ゴミ)",
        "diagram_caption": "Chỉ được đem rác ra bãi tập kết vào sáng sớm đúng ngày thu gom (trước 8:00)",
        "mnemonic": "THU (収 - thu vào) + TẬP (集 - gom lại) + NHẬT (日 - ngày). Ngày xe gom rác tới lấy.",
        "collocations": [
          {
            "ja": "収集日を守る",
            "furigana": "しゅうしゅうびをまもる",
            "vn": "Tuân thủ ngày thu gom rác"
          },
          {
            "ja": "指定の収集場所",
            "furigana": "していのしゅうしゅうばしょ",
            "vn": "Điểm tập kết rác được chỉ định"
          }
        ],
        "example": {
          "sentence": "収集日[しゅうしゅうび]以外[いがい]の曜日[ようび]にゴミを出[だ]してはいけません。",
          "translation": "Tuyệt đối không được vứt rác vào những ngày khác ngoài ngày thu gom quy định."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "管理人",
        "furigana": "かんりにん",
        "romaji": "kanrinin",
        "han_viet": "QUẢN LÝ NHÂN",
        "meaning_vn": "Người quản lý tòa nhà chung cư",
        "word_type": "Danh từ",
        "tag": "Người phụ trách",
        "visual_diagram": "   🏢 マンション (Chung cư)\n        │\n        └── 👨‍🦳 管理人さん (Bác quản lý)\n            ├── 🧹 Dọn dẹp hành lang, khu để xe\n            ├── 📬 Quản lý hòm thư & bưu phẩm thất lạc\n            └── ⚠️ Nhắc nhở nếu cư dân làm ồn / vứt sai rác",
        "diagram_caption": "Khi gặp rắc rối thiết bị hỏng hay thắc mắc về tòa nhà, hãy tìm gặp bác quản lý",
        "mnemonic": "QUẢN (管 - trông nom) + LÝ (理 - xử lý công việc) + NHÂN (人 - con người).",
        "collocations": [
          {
            "ja": "管理人に相談する",
            "furigana": "かんりにんにそうだんする",
            "vn": "Thảo luận / hỏi ý kiến người quản lý"
          },
          {
            "ja": "管理費を納める",
            "furigana": "かんりひをおさめる",
            "vn": "Đóng phí quản lý chung cư"
          }
        ],
        "example": {
          "sentence": "鍵[かぎ]をなくした時[とき]は、すぐにアパートの管理人[かんりにん]に連絡[れんらく]した。",
          "translation": "Khi bị mất chìa khóa, tôi đã liên lạc ngay lập tức cho bác quản lý căn hộ."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "騒音",
        "furigana": "そうおん",
        "romaji": "souon",
        "han_viet": "TAO ÂM",
        "meaning_vn": "Tiếng ồn gây khó chịu, phiền toái",
        "word_type": "Danh từ",
        "tag": "Đời sống chung cư",
        "visual_diagram": "   🔊 騒音 (Tiếng ồn phiền hà) ── Bị hàng xóm phàn nàn (苦情):\n   ├── 👣 Giậm chân thình thịch đêm khuya\n   ├── 📺 Bật tivi / loa đài quá lớn\n   └── 🍻 Tụ tập nhậu nhẹt cười đùa ồn ào sau 22h",
        "diagram_caption": "Nguyên nhân hàng đầu dẫn đến xích mích giữa cư dân chung cư tại Nhật",
        "mnemonic": "TAO (騒 - náo động, tao loạn) + ÂM (音 - âm thanh). Tiếng kêu làm náo động không gian.",
        "collocations": [
          {
            "ja": "騒音トラブル",
            "furigana": "そうおんトラブル",
            "vn": "Xích mích rắc rối vì tiếng ồn"
          },
          {
            "ja": "近所に迷惑をかける",
            "furigana": "きんじょにめいわくをかける",
            "vn": "Gây phiền toái cho hàng xóm láng giềng"
          }
        ],
        "example": {
          "sentence": "夜遅[よるおそ]くの洗濯[せんたく]や掃除[そうじ]は、騒音[そうおん]の原因[げんいん]になるので控[ひか]える。",
          "translation": "Giặt giũ hay hút bụi vào đêm muộn là nguyên nhân gây tiếng ồn nên hãy hạn chế."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "共同",
        "furigana": "きょうどう",
        "romaji": "kyoudou",
        "han_viet": "CỘNG ĐỒNG",
        "meaning_vn": "Dùng chung, cùng nhau (khu vực công cộng)",
        "word_type": "Danh từ / Mang tính bổ nghĩa",
        "tag": "Không gian sinh hoạt",
        "visual_diagram": "   🏢 Không gian trong chung cư:\n   ├── 🚪 専有部分 (Không gian riêng trong phòng bạn: tùy ý sinh hoạt)\n   └── 🌿 共同部分 (Không gian chung: hành lang, cầu thang, sân phơi)\n         ▲\n         └── 🚫 Không để giày dép rác bừa bãi ra lối đi chung",
        "diagram_caption": "CỘNG ĐỒNG trong tiếng Nhật nghĩa là dùng chung tài sản hoặc tiện ích tập thể",
        "mnemonic": "CỘNG (共 - cùng chung) + ĐỒNG (同 - giống nhau) = Cùng chung quyền sử dụng.",
        "collocations": [
          {
            "ja": "共同玄関",
            "furigana": "きょうどうげんかん",
            "vn": "Sảnh vào dùng chung"
          },
          {
            "ja": "共同生活",
            "furigana": "きょうどうせいかつ",
            "vn": "Đời sống tập thể / sống chung"
          }
        ],
        "example": {
          "sentence": "共同[きょうどう]スペースの廊下[ろうか]には私物[しぶつ]を置[お]かないでください。",
          "translation": "Xin đừng để đồ đạc cá nhân ở hành lang là không gian dùng chung."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "苦情",
        "furigana": "くじょう",
        "romaji": "kujou",
        "han_viet": "KHỔ TÌNH",
        "meaning_vn": "Lời phàn nàn, khiếu nại bức xúc",
        "word_type": "Danh từ",
        "tag": "Giao tiếp xã hội",
        "visual_diagram": "   😠 Hàng xóm ── bức xúc ──▶ 📝 苦情 (Khiếu nại) ──▶ 👨‍💼 Quản lý tòa nhà\n                                                    │\n                                                    ▼ Gửi thư cảnh cáo\n                                              🙇‍♂️ Người gây ồn",
        "diagram_caption": "Người Nhật hiếm khi gõ cửa cãi nhau trực tiếp mà thường báo lên quản lý để gửi thư phàn nàn",
        "mnemonic": "KHỔ (苦 - đau khổ, bức bối) + TÌNH (情 - cảm xúc, sự tình) = Bày tỏ bức xúc vì bị làm phiền.",
        "collocations": [
          {
            "ja": "苦情が来る / 苦情が入る",
            "furigana": "くじょうがくる / くじょうがはいる",
            "vn": "Bị nhận lời phàn nàn khiếu nại"
          },
          {
            "ja": "苦情を言う",
            "furigana": "くじょうをいう",
            "vn": "Đưa ra lời khiếu nại"
          }
        ],
        "example": {
          "sentence": "夜中[よなか]に音楽[おんがく]を大[おお]きな音[おと]で鳴[な]らしていたら、隣[となり]から苦情[くじょう]が来[き]た。",
          "translation": "Bật nhạc to giữa đêm nên tôi đã bị phòng bên cạnh khiếu nại phàn nàn."
        }
      }
    ]
  },
  {
    "topic_id": "topic_03_giao_thong_tau_xe",
    "title": "Chủ đề 03: Giao thông & Đi lại tàu xe",
    "japanese_title": "交通機関・電車・バスの語彙",
    "description": "Các loại tàu điện, vé tháng, chuyển tuyến và quy tắc đi lại an toàn tiện lợi tại Nhật Bản.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "各駅停車",
        "furigana": "かくえきていしゃ",
        "romaji": "kakuekiteisha",
        "han_viet": "CÁC DỊCH ĐÌNH XA",
        "meaning_vn": "Tàu đỗ ở mọi ga (tàu thường, đi chậm nhất)",
        "word_type": "Danh từ",
        "tag": "Loại tàu",
        "visual_diagram": "   🚉 CÁC LOẠI TÀU ĐIỆN NHẬT BẢN:\n   ├── 🐌 各駅停車 (Đỗ tất cả mọi ga trên đường: ●-●-●-●-●-●)\n   ├── 🚅 快速 (Bỏ qua ga nhỏ, chỉ đỗ ga nhỡ: ●---●---●---●)\n   └── 🚄 特急 (Tốc hành, chỉ đỗ ga trung tâm lớn: ●-------●-------●)",
        "diagram_caption": "So sánh 3 cấp độ tàu hỏa phổ biến trên mạng lưới đường sắt Nhật Bản",
        "mnemonic": "CÁC (各 - mỗi) + DỊCH (駅 - nhà ga) + ĐÌNH XA (停車 - dừng tàu) = Tàu dừng ở từng ga một.",
        "collocations": [
          {
            "ja": "各停 (viết tắt)",
            "furigana": "かくてい",
            "vn": "Tên gọi tắt hiển thị trên bảng điện tử ga"
          },
          {
            "ja": "各駅停車に乗る",
            "furigana": "かくえきていしゃにのる",
            "vn": "Lên chuyến tàu dừng mọi ga"
          }
        ],
        "example": {
          "sentence": "次[つぎ]の小[ちい]さな駅[えき]には快速[かいそく]は止[と]まらないので、各駅[かくえき]停車[ていしゃ]を利用[りよう]する。",
          "translation": "Vì tàu nhanh không dừng ở ga nhỏ tiếp theo nên tôi chuyển sang đi tàu thường dừng mọi ga."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "快速",
        "furigana": "かいそく",
        "romaji": "kaisoku",
        "han_viet": "KHOÁI TỐC",
        "meaning_vn": "Tàu nhanh (bỏ qua một số ga nhỏ, cùng giá vé thường)",
        "word_type": "Danh từ",
        "tag": "Loại tàu",
        "visual_diagram": "   🎫 GIÁ VÉ:\n   ├── 各駅停車 (Tàu thường) ──▶ Giá vé thường\n   ├── 快速 (Tàu nhanh)       ──▶ Giá vé thường (Không mất thêm phí!)\n   └── 特急 (Tàu đặc biệt)   ──▶ Vé thường + Vé đặc biệt (特急券)",
        "diagram_caption": "Đi tàu 快速 giúp tiết kiệm thời gian mà hoàn toàn không mất thêm phụ phí vé",
        "mnemonic": "KHOÁI (快 - sảng khoái, mượt mà) + TỐC (速 - tốc độ). Đi nhanh chóng không dừng vặt.",
        "collocations": [
          {
            "ja": "快速電車",
            "furigana": "かいそくでんしゃ",
            "vn": "Chuyến tàu điện nhanh"
          },
          {
            "ja": "通勤快速",
            "furigana": "つうきんかいそく",
            "vn": "Tàu nhanh giờ cao điểm đi làm"
          }
        ],
        "example": {
          "sentence": "快速[かいそく]を使[つか]えば、目的地[もくてきち]まで三十分[さんじゅっぷん]も早[はや]く到着[とうちゃく]できる。",
          "translation": "Nếu đi tàu nhanh thì có thể đến nơi sớm hơn tận 30 phút."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "特急",
        "furigana": "とっきゅう",
        "romaji": "tokkyuu",
        "han_viet": "ĐẶC CẤP",
        "meaning_vn": "Tàu tốc hành đặc biệt (phải mua thêm vé特急券)",
        "word_type": "Danh từ",
        "tag": "Loại tàu",
        "visual_diagram": "   🎫 BẮT BUỘC CÓ 2 LOẠI VÉ ĐỂ ĐI TÀU ĐẶC CẤP (特急):\n   [🎫 乗車券 - Vé thường (trả theo số km di chuyển)]\n         +\n   [🎫 特急券 - Vé phụ phí tốc hành và đặt số ghế]",
        "diagram_caption": "Nếu chỉ quẹt thẻ IC thường mà lên tàu 特急 sẽ bị nhân viên soát vé phạt hoặc thu thêm tiền",
        "mnemonic": "ĐẶC (特 - đặc biệt) + CẤP (急 - khẩn cấp). Cực kỳ nhanh và phục vụ dịch vụ đặc biệt.",
        "collocations": [
          {
            "ja": "特急券を購入する",
            "furigana": "とっきゅうけんをこうにゅうする",
            "vn": "Mua vé phụ phí tàu đặc cấp"
          },
          {
            "ja": "全席指定",
            "furigana": "ぜんせきしてい",
            "vn": "Toàn bộ là ghế đặt trước"
          }
        ],
        "example": {
          "sentence": "出張[しゅっちょう]で遠[とお]くへ行[い]くため、特急[とっきゅう]の指定席[していせき]を予約[よやく]した。",
          "translation": "Vì đi công tác xa nên tôi đã đặt trước ghế ngồi chỉ định của tàu tốc hành."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "乗り換え",
        "furigana": "のりかえ",
        "romaji": "norikae",
        "han_viet": "THỪA HOÁN",
        "meaning_vn": "Chuyển tàu / đổi tuyến",
        "word_type": "Danh từ / Động từ nhóm 2",
        "tag": "Hành trình",
        "visual_diagram": "   [Tuyến JR Yamanote 🟢] ──(xuống ga Shinjuku)──▶ [Tuyến Chuo 🟠]\n                                │\n                                └── 🔄 乗り換え (Thời gian đi bộ: 3 phút)",
        "diagram_caption": "Ứng dụng tra cứu tàu ở Nhật (như Jorudan/Navitime) luôn chỉ rõ sân ga để chuyển tuyến",
        "mnemonic": "THỪA (乗 - lên xe) + HOÁN (換 - thay đổi) = Đổi từ xe/tàu này sang xe/tàu khác.",
        "collocations": [
          {
            "ja": "乗り換え案内アプリ",
            "furigana": "のりかえあんないアプリ",
            "vn": "Ứng dụng chỉ đường tàu điện"
          },
          {
            "ja": "乗り換えなしで直通",
            "furigana": "のりかえなしでちょくつう",
            "vn": "Đi thẳng không cần đổi tàu"
          }
        ],
        "example": {
          "sentence": "新宿駅[しんじゅくえき]で地下鉄[ちかてつ]に乗り換[のりか]える必要[ひつよう]がある。",
          "translation": "Cần phải chuyển sang tuyến tàu điện ngầm tại ga Shinjuku."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "定期券",
        "furigana": "ていきけん",
        "romaji": "teikiken",
        "han_viet": "ĐỊNH KỲ KHOÁN",
        "meaning_vn": "Vé tháng tàu xe tuyến cố định (tiết kiệm 30-50%)",
        "word_type": "Danh từ",
        "tag": "Vé tàu",
        "visual_diagram": "   🏠 Ga nhà (A) ═══════════════════════════════▶ 🏫 Ga trường/cty (B)\n   │                                          │\n   └── 💳 定期券: Trong đoạn từ A đến B, lên xuống bao nhiêu lần cũng MIỄN PHÍ!",
        "diagram_caption": "Vé tháng cho phép bạn xuống ở bất kỳ ga nào nằm giữa chặng mà không tốn thêm xu nào",
        "mnemonic": "ĐỊNH KỲ (定期 - thời hạn cố định 1/3/6 tháng) + KHOÁN (券 - tấm vé).",
        "collocations": [
          {
            "ja": "通学定期 / 通勤定期",
            "furigana": "つうがくていき / つうきんていき",
            "vn": "Vé tháng đi học / đi làm"
          },
          {
            "ja": "定期券を更新する",
            "furigana": "ていきけんをこうしんする",
            "vn": "Gia hạn thêm hạn dùng của vé tháng"
          }
        ],
        "example": {
          "sentence": "学校[がっこう]までの通学[つうがく]定期券[ていきけん]を買[か]うと、学生[がくせい]割引[わりびき]がきく。",
          "translation": "Khi mua vé tháng đi học đến trường, học sinh sinh viên sẽ được giảm giá đặc biệt."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "往復",
        "furigana": "おうふく",
        "romaji": "oufuku",
        "han_viet": "VÃNG PHỤC",
        "meaning_vn": "Khứ hồi, đi và về cả hai chiều",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Lộ trình",
        "visual_diagram": "   🎫 往復 (Khứ hồi):  A ──────Đi──────▶ B\n                       A ◀─────Về────── B\n                       vs\n   🎫 片道 (Một chiều): A ──────Đi──────▶ B (かたみち)",
        "diagram_caption": "Mua vé khứ hồi đường dài (trên 600km) ở Nhật thường được giảm 10%",
        "mnemonic": "VÃNG (往 - đi) + PHỤC (復 - quay trở lại). Vãng phục là đi rồi lại trở về chốn cũ.",
        "collocations": [
          {
            "ja": "往復切符",
            "furigana": "おうふくきっぷ",
            "vn": "Vé khứ hồi cả 2 chiều"
          },
          {
            "ja": "往復葉書",
            "furigana": "おうふくはがき",
            "vn": "Bưu thiếp khứ hồi (có sẵn tem để hồi đáp)"
          }
        ],
        "example": {
          "sentence": "新幹線[しんかんせん]の往復[おうふく]チケットをあらかじめネットで予約[よやく]した。",
          "translation": "Tôi đã đặt trước vé khứ hồi tàu Shinkansen qua mạng internet."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "片道",
        "furigana": "かたみち",
        "romaji": "katamichi",
        "han_viet": "PHIẾN ĐẠO",
        "meaning_vn": "Một chiều, chuyến đi một lượt",
        "word_type": "Danh từ",
        "tag": "Lộ trình",
        "visual_diagram": "   🏃‍♂️ A ──────────▶ B (Chỉ đi 1 chiều: 片道)\n   (Nếu về bằng phương tiện khác thì chỉ cần mua vé 片道)",
        "diagram_caption": "Đối lập hoàn toàn với 往復 (khứ hồi)",
        "mnemonic": "PHIẾN (片 - một nửa, một bên) + ĐẠO (道 - con đường). Chỉ đi một nửa lượt đường.",
        "collocations": [
          {
            "ja": "片道切符",
            "furigana": "かたみちきっぷ",
            "vn": "Vé một chiều"
          },
          {
            "ja": "片道一時間かかる",
            "furigana": "かたみちいちじかんかかる",
            "vn": "Một chiều đi mất 1 tiếng đồng hồ"
          }
        ],
        "example": {
          "sentence": "会社[かいしゃ]まで片道[かたみち]で一[いち]時間[じかん]半[はん]ほどかかる。",
          "translation": "Một chiều đi từ nhà đến công ty mất khoảng một tiếng rưỡi."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "終電",
        "furigana": "しゅうでん",
        "romaji": "shuuden",
        "han_viet": "CHUNG ĐIỆN",
        "meaning_vn": "Chuyến tàu cuối cùng trong ngày (chuyến chót)",
        "word_type": "Danh từ",
        "tag": "Lịch chạy tàu",
        "visual_diagram": "   ⏰ 23:55 ── 🏃‍♂️💨 Chạy hớt hải bắt tàu!\n        │\n        └── 🚄 終電 (Chuyến chót)\n             ├── ⭕ Bắt kịp ──▶ Về nhà ngủ an toàn\n             └── ❌ Bỏ lỡ ──▶ Tốn tiền taxi / ngủ tiệm net manga / chờ sáng mai",
        "diagram_caption": "Tại Nhật, bỏ lỡ chuyến tàu chót đồng nghĩa với việc phát sinh chi phí đắt đỏ qua đêm",
        "mnemonic": "CHUNG (終 - kết thúc) + ĐIỆN (電 - tàu điện). Chuyến tàu khép lại ngày hôm đó.",
        "collocations": [
          {
            "ja": "終電を逃す",
            "furigana": "しゅうでんをのがす",
            "vn": "Bỏ lỡ chuyến tàu cuối cùng"
          },
          {
            "ja": "終電に間に合う",
            "furigana": "しゅうでんにまにあう",
            "vn": "Kịp chuyến tàu chót"
          }
        ],
        "example": {
          "sentence": "飲[の]み会[かい]が盛[もり]あがっていたが、終電[しゅうでん]の時間を気[き]にして早[はや]めに帰[かえ]った。",
          "translation": "Bữa tiệc nhậu đang rất sôi nổi nhưng lo chuyến tàu chót nên tôi đã về sớm."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "踏切",
        "furigana": "ふみきり",
        "romaji": "fumikiri",
        "han_viet": "ĐẠP THIẾT",
        "meaning_vn": "Rào chắn đường ray xe lửa, điểm giao cắt",
        "word_type": "Danh từ",
        "tag": "An toàn đường ray",
        "visual_diagram": "   🚧 ĐÈN CHỚP ĐỎ & TIẾNG BÁO DỒN DẬP (カンカンカン)\n      ▼\n   ⛔ Rào chắn hạ xuống ──▶ BẮT BUỘC DỪNG LẠI TUYỆT ĐỐI\n      ▼\n   🚄 Tàu vụt qua",
        "diagram_caption": "Luật giao thông Nhật: Người và xe cộ phải dừng hẳn trước rào chắn, nhìn trái phải rồi mới qua",
        "mnemonic": "ĐẠP (踏 - giẫm bước) + THIẾT (切 - cắt ngang qua). Điểm cắt ngang đường ray.",
        "collocations": [
          {
            "ja": "踏切を渡る",
            "furigana": "ふみきりをわたる",
            "vn": "Băng qua rào chắn đường tàu"
          },
          {
            "ja": "開かずの踏切",
            "furigana": "あかずのふみきり",
            "vn": "Rào chắn kẹt cứng không mở trong giờ cao điểm"
          }
        ],
        "example": {
          "sentence": "警報機[けいほうき]が鳴[な]り始[はじ]めたら、踏切[ふみきり]の中[なか]に入[はい]ってはいけない。",
          "translation": "Khi chuông cảnh báo đã bắt đầu reo thì tuyệt đối không được đi vào trong rào chắn."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "運賃",
        "furigana": "うんちん",
        "romaji": "unchin",
        "han_viet": "VẬN THẢM",
        "meaning_vn": "Cước phí vận chuyển, tiền vé tàu xe",
        "word_type": "Danh từ",
        "tag": "Chi phí đi lại",
        "visual_diagram": "   🎟️ SO SÁNH CÁC TỪ CHỈ CHI PHÍ TIẾNG NHẬT:\n   ├── 運賃 (うんちん): Tiền cước vé tàu xe, máy bay, taxi\n   ├── 家賃 (やちん): Tiền thuê nhà\n   └── 授業料 (じゅぎょうりょう): Tiền học phí",
        "diagram_caption": "Tất cả các từ có đuôi 賃 (THẢM) đều chỉ chi phí thuê mướn hoặc dịch vụ vận chuyển",
        "mnemonic": "VẬN (運 - vận chuyển) + THẢM (賃 - tiền công). Tiền trả cho việc chở mình đi.",
        "collocations": [
          {
            "ja": "運賃を精算する",
            "furigana": "うんちんをせいさんする",
            "vn": "Nạp thêm tiền trả cước thiếu tại máy ga"
          },
          {
            "ja": "運賃表",
            "furigana": "うんちんひょう",
            "vn": "Bảng cước giá vé tàu treo trên cao ở ga"
          }
        ],
        "example": {
          "sentence": "切符[きっぷ]の残高[ざんだか]が足[た]りなかったので、出口[でぐち]で運賃[うんちん]を精算[せいさん]した。",
          "translation": "Vì số dư vé không đủ tiền nên tôi đã điều chỉnh thanh toán cước phí ở cửa ra."
        }
      }
    ]
  },
  {
    "topic_id": "topic_04_baito_phong_van",
    "title": "Chủ đề 04: Đi làm thêm & Phỏng vấn",
    "japanese_title": "アルバイト・面接・仕事探しの語彙",
    "description": "Các thuật ngữ cốt lõi khi nộp hồ sơ xin việc, phỏng vấn xin việc và chế độ làm thêm của du học sinh tại Nhật.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "履歴書",
        "furigana": "りれきしょ",
        "romaji": "rirekisho",
        "han_viet": "LÝ LỊCH THƯ",
        "meaning_vn": "Sơ yếu lý lịch, bản CV xin việc",
        "word_type": "Danh từ",
        "tag": "Hồ sơ xin việc",
        "visual_diagram": "   📄 履歴書 (Bản lý lịch tiêu chuẩn):\n   ├── 📸 Ảnh thẻ dán góc phải (chụp áo vest, lịch sự)\n   ├── 🎓 学歴 (Quá trình học vấn: Tiểu học ──▶ Đại học)\n   ├── 💼 職歴 (Kinh nghiệm làm việc từ trước đến nay)\n   └── ✍️ 志望動機 (Lý do vì sao muốn vào làm việc ở đây)",
        "diagram_caption": "Bản khai báo bắt buộc phải mang theo khi đi phỏng vấn việc làm thêm hoặc công ty tại Nhật",
        "mnemonic": "LÝ (履 - trải qua) + LỊCH (歴 - năm tháng lịch sử) + THƯ (書 - văn bản sách vở). Giấy ghi lại lịch sử bản thân.",
        "collocations": [
          {
            "ja": "履歴書を送付する",
            "furigana": "りれきしょをそうふする",
            "vn": "Gửi bưu điện bản lý lịch"
          },
          {
            "ja": "履歴書を持参する",
            "furigana": "りれきしょをじさんする",
            "vn": "Mang theo sơ yếu lý lịch khi đi phỏng vấn"
          }
        ],
        "example": {
          "sentence": "アルバイトの面接[めんせつ]のために、丁寧[ていねい]な字[じ]で履歴書[りれきしょ]を書[か]いた。",
          "translation": "Để chuẩn bị cho buổi phỏng vấn việc làm thêm, tôi đã viết bản lý lịch bằng nét chữ nắn nót cẩn thận."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "面接",
        "furigana": "めんせつ",
        "romaji": "mensetsu",
        "han_viet": "DIỆN TIẾP",
        "meaning_vn": "Phỏng vấn trực tiếp",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Thi tuyển",
        "visual_diagram": "   🚪 GÕ CỬA 3 TIẾNG: ✊✊✊ (Kon-kon-kon)\n   ├── 「どうぞ」(Mời vào)\n   ├── 🙇‍♂️ 「失礼します」(Xin phép thất lễ)\n   ├── 🚶 Đi đến cạnh ghế và đứng thẳng chờ mời ngồi\n   └── 🗣️ 面接 (Phỏng vấn hỏi đáp tự tin, rõ ràng)",
        "diagram_caption": "Quy tắc tác phong chuẩn mực khi bước vào phòng phỏng vấn ở Nhật",
        "mnemonic": "DIỆN (面 - mặt đối mặt) + TIẾP (接 - tiếp xúc). Tiếp xúc mặt đối mặt để vấn đáp.",
        "collocations": [
          {
            "ja": "面接を受ける",
            "furigana": "めんせつをうける",
            "vn": "Tham gia buổi phỏng vấn"
          },
          {
            "ja": "面接官",
            "furigana": "めんせつかん",
            "vn": "Người phỏng vấn / giám khảo"
          }
        ],
        "example": {
          "sentence": "緊張[きんちょう]したが、面接[めんせつ]では自分[じぶん]の熱意[ねついて]をしっかり伝[つた]えられた。",
          "translation": "Dù rất hồi hộp nhưng trong buổi phỏng vấn tôi đã truyền tải được lòng nhiệt huyết của mình."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "志望動機",
        "furigana": "しぼうどうき",
        "romaji": "shiboudouki",
        "han_viet": "CHÍ VỌNG ĐỘNG CƠ",
        "meaning_vn": "Lý do và động lực muốn ứng tuyển vào công việc",
        "word_type": "Danh từ",
        "tag": "Nội dung phỏng vấn",
        "visual_diagram": "   🎯 志望動機 (Lý do chọn công ty):\n   ├── ❓ Tại sao lại là công ty này mà không phải nơi khác?\n   ├── 🌟 Mình có điểm mạnh gì đóng góp được cho quán/cty?\n   └── 🚀 Mong muốn học hỏi và gắn bó lâu dài.",
        "diagram_caption": "Câu hỏi số một 100% người phỏng vấn sẽ hỏi: 'Bạn hãy nêu lý do ứng tuyển?'",
        "mnemonic": "CHÍ VỌNG (志望 - nguyện vọng mong muốn) + ĐỘNG CƠ (動機 - lý do thúc đẩy hành động).",
        "collocations": [
          {
            "ja": "志望動機を述べる",
            "furigana": "しぼうどうきをのべる",
            "vn": "Trình bày lý do ứng tuyển"
          },
          {
            "ja": "明確な志望動機",
            "furigana": "めいかくなしぼうどうき",
            "vn": "Động cơ ứng tuyển rõ ràng, thuyết phục"
          }
        ],
        "example": {
          "sentence": "面接[めんせつ]で最も重視[じゅうし]されるのは、説得力[せっとくりょく]のある志望動機[しぼうどうき]だ。",
          "translation": "Điều được coi trọng nhất trong buổi phỏng vấn chính là một lý do ứng tuyển có sức thuyết phục."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "シフト",
        "furigana": "シフト",
        "romaji": "shifuto",
        "han_viet": "CA LÀM VIỆC",
        "meaning_vn": "Ca làm việc, lịch phân công theo tuần/tháng",
        "word_type": "Danh từ",
        "tag": "Chế độ làm việc",
        "visual_diagram": "   📅 BẢNG PHÂN CA (シフト表):\n   ├── 🌅 早番 (Ca sáng: 08:00 - 14:00)\n   ├── 🌇 遅番 (Ca chiều tối: 14:00 - 22:00)\n   └── 🌙 夜勤 (Ca đêm: 22:00 - 06:00 - Lương tăng 25%)",
        "diagram_caption": "Làm thêm ở Nhật thường đăng ký ca làm (シフト希望) trước 2 tuần hoặc đầu tháng",
        "mnemonic": "Bắt nguồn từ tiếng Anh 'Shift' (ca kíp làm việc luân phiên).",
        "collocations": [
          {
            "ja": "シフトに入る",
            "furigana": "シフトにはいる",
            "vn": "Đến lượt vào ca làm việc"
          },
          {
            "ja": "シフトを提出する",
            "furigana": "シフトをていしゅつする",
            "vn": "Nộp lịch đăng ký ca làm"
          }
        ],
        "example": {
          "sentence": "来週[らいしゅう]は試験[しけん]があるので、アルバイトのシフトを少[すく]なめにした。",
          "translation": "Vì tuần sau có kỳ thi nên tôi đã xin giảm bớt ca làm thêm."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "時給",
        "furigana": "じきゅう",
        "romaji": "jikyuu",
        "han_viet": "THỜI CẤP",
        "meaning_vn": "Lương theo giờ",
        "word_type": "Danh từ",
        "tag": "Thu nhập",
        "visual_diagram": "   ⏱️ 1 時間 (1 giờ làm việc) ──▶ 💰 時給 (Ví dụ: 1,200円)\n   [So sánh]:\n   ├── ⏱️ 時給 (Lương giờ - Baito)\n   ├── 📅 日給 (Lương ngày - Việc ngắn hạn)\n   └── 📆 月給 (Lương tháng - Nhân viên chính thức)",
        "diagram_caption": "Mỗi tỉnh thành ở Nhật có mức lương tối thiểu (最低賃金) do chính phủ quy định",
        "mnemonic": "THỜI (時 - thời gian, giờ) + CẤP (給 - cấp phát, tiền lương). Tiền trả theo từng giờ.",
        "collocations": [
          {
            "ja": "時給が高い",
            "furigana": "じきゅうがたかい",
            "vn": "Lương theo giờ cao"
          },
          {
            "ja": "時給がアップする",
            "furigana": "じきゅうがあっぷする",
            "vn": "Được tăng lương giờ (do làm lâu, chăm chỉ)"
          }
        ],
        "example": {
          "sentence": "深夜[しんや]の時間帯[じかんたい]は、通常[つうじょう]の時給[じきゅう]より二割[にわり]五分[ごぶ]高[たか]くなる。",
          "translation": "Khung giờ đêm khuya thì mức lương giờ sẽ cao hơn 25% so với bình thường."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "交通費支給",
        "furigana": "こうつうひしきゅう",
        "romaji": "koutsuuhi shikyuu",
        "han_viet": "GIAO THÔNG PHÍ CHI CẤP",
        "meaning_vn": "Được thanh toán / chi trả toàn bộ tiền vé đi lại",
        "word_type": "Cụm danh từ",
        "tag": "Quyền lợi",
        "visual_diagram": "   🏠 Nhà bạn ──(Tàu điện 500円/ngày)──▶ 🏪 Quán làm việc\n       │\n       └── 🎁 交通費全額支給: Quán trả lại toàn bộ tiền tàu xe cho bạn cuối tháng!",
        "diagram_caption": "Điểm cộng lớn khi tìm việc làm thêm: Được hỗ trợ tiền tàu xe đi lại",
        "mnemonic": "GIAO THÔNG PHÍ (tiền đi lại) + CHI CẤP (cung cấp, thanh toán).",
        "collocations": [
          {
            "ja": "交通費全額支給",
            "furigana": "こうつうひぜんがくしきゅう",
            "vn": "Chi trả toàn bộ 100% tiền đi lại"
          },
          {
            "ja": "交通費上限あり",
            "furigana": "こうつうひじょうげんあり",
            "vn": "Có mức trần tối đa (ví dụ 10.000 yên/tháng)"
          }
        ],
        "example": {
          "sentence": "この職場[しょくば]は交通費[こうつうひ]が全額[ぜんがく]支給[しきゅう]されるので助[たす]かる。",
          "translation": "Chỗ làm việc này hỗ trợ trả toàn bộ tiền đi lại nên rất đỡ tiền cho tôi."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "採用",
        "furigana": "さいよう",
        "romaji": "saiyou",
        "han_viet": "THẢI DỤNG",
        "meaning_vn": "Tuyển dụng, trúng tuyển (được nhận vào làm)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Kết quả phỏng vấn",
        "visual_diagram": "   🎉 採用 (Trúng tuyển, được nhận)\n         vs\n   😢 不採用 (Trượt, không được nhận ── Nhận thư cảm ơn お祈りメール)",
        "diagram_caption": "Khi trúng tuyển quán sẽ gọi điện báo trong vòng 3-7 ngày làm việc",
        "mnemonic": "THẢI (採 - chọn lọc hái lấy) + DỤNG (用 - sử dụng). Lựa chọn người tài vào làm việc.",
        "collocations": [
          {
            "ja": "採用が決まる",
            "furigana": "さいようがきまる",
            "vn": "Đã có quyết định trúng tuyển"
          },
          {
            "ja": "採用通知書",
            "furigana": "さいようつうちしょ",
            "vn": "Giấy thông báo trúng tuyển"
          }
        ],
        "example": {
          "sentence": "厳[きび]しい面接[めんせつ]の結果[けっか]、無事[ぶじ]に採用[さいよう]が決[き]まった。",
          "translation": "Sau buổi phỏng vấn gắt gao, tôi đã thuận lợi được nhận vào làm việc."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "不採用",
        "furigana": "ふさいよう",
        "romaji": "fusaiyou",
        "han_viet": "BẤT THẢI DỤNG",
        "meaning_vn": "Không trúng tuyển, bị từ chối",
        "word_type": "Danh từ",
        "tag": "Kết quả phỏng vấn",
        "visual_diagram": "   ✉️ KHẨU HIỆU TỪ CHỐI KINH ĐIỂN CỦA NHẬT:\n   「誠に残念ながら、今回はご希望に添えない結果となりました。」\n   (Rất lấy làm tiếc, lần này chúng tôi chưa thể đáp ứng nguyện vọng của bạn)",
        "diagram_caption": "Dù trượt cũng gửi thư xin lỗi từ chối vô cùng lịch sự và nhã nhặn",
        "mnemonic": "Thêm tiền tố 不 (BẤT - không): 不採用 = Không được tuyển dụng.",
        "collocations": [
          {
            "ja": "不採用の通知",
            "furigana": "ふさいようのつうち",
            "vn": "Thông báo không trúng tuyển"
          },
          {
            "ja": "不採用の理由",
            "furigana": "ふさいようのりゆう",
            "vn": "Lý do không được nhận"
          }
        ],
        "example": {
          "sentence": "もし不採用[ふさいよう]になっても、落[お]ち込[こ]まずに次[つぎ]の面接[めんせつ]に挑戦[ちょうせん]する。",
          "translation": "Dù có bị từ chối đi chăng nữa, tôi cũng không nản lòng mà sẽ thử sức tiếp ở buổi phỏng vấn sau."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "研修",
        "furigana": "けんしゅう",
        "romaji": "kenshuu",
        "han_viet": "NGHIÊN TU",
        "meaning_vn": "Đào tạo, tập huấn, thời gian thử việc",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Bắt đầu công việc",
        "visual_diagram": "   🔰 新人 (Người mới vào làm)\n        │\n        └── 📚 研修期間 (Giai đoạn tập huấn 1-3 tháng)\n            ├── Học cách chào hỏi & Cúi đầu (お辞儀)\n            ├── Học sử dụng máy tính tiền (レジ操作)\n            └── Luôn có tiền bối (先輩) đứng bên cạnh chỉ dẫn",
        "diagram_caption": "Tại Nhật, dù là việc làm thêm rửa bát hay phụ bếp cũng đều được đào tạo bài bản",
        "mnemonic": "NGHIÊN (研 - mài giũa) + TU (修 - rèn luyện tu bổ) = Rèn luyện kỹ năng cho thành thục.",
        "collocations": [
          {
            "ja": "研修期間",
            "furigana": "けんしゅうきかん",
            "vn": "Thời gian thử việc đào tạo"
          },
          {
            "ja": "研修を受ける",
            "furigana": "けんしゅうをうける",
            "vn": "Tham gia khóa huấn luyện"
          }
        ],
        "example": {
          "sentence": "最初[さいしょ]の二週間[にしゅうかん]は研修[けんしゅう]期間[きかん]として、先輩[せんぱい]から仕事[しごと]を教[おそ]わった。",
          "translation": "Hai tuần đầu tiên là thời gian tập huấn, tôi đã được các anh chị tiền bối chỉ bảo công việc."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "問い合わせ",
        "furigana": "といあわせ",
        "romaji": "toiawase",
        "han_viet": "VẤN HỢP",
        "meaning_vn": "Liên hệ hỏi thăm thông tin, thắc mắc",
        "word_type": "Danh từ / Động từ nhóm 2",
        "tag": "Giao tiếp xin việc",
        "visual_diagram": "   📞 CÂU THẦN CHÚ KHI GỌI ĐIỆN XIN VIỆC:\n   「求人募集を拝見してお電話いたしました。今、お時間よろしいでしょうか。」\n   (Tôi thấy tin tuyển dụng nên xin phép gọi điện tới. Lúc này quý quán có tiện không ạ?)",
        "diagram_caption": "Gọi điện hỏi việc tránh các khung giờ ăn trưa (11:30 - 13:30) của quán ăn vì rất bận",
        "mnemonic": "VẤN (問 - hỏi) + HỢP (合 - đối chiếu, so khớp) = Gọi điện trao đổi đối chiếu thông tin.",
        "collocations": [
          {
            "ja": "電話で問い合わせる",
            "furigana": "でんわでといあわせる",
            "vn": "Hỏi thông tin qua điện thoại"
          },
          {
            "ja": "お問い合わせ窓口",
            "furigana": "おといあわせまどぐち",
            "vn": "Bộ phận tiếp nhận giải đáp thắc mắc"
          }
        ],
        "example": {
          "sentence": "求人[きゅうじん]広告[こうこく]を見[み]て、募集[ぼしゅう]条件[じょうけん]について電話[でんわ]で問[と]い合[あ]わせた。",
          "translation": "Nhìn thấy quảng cáo tuyển dụng, tôi đã gọi điện hỏi thăm chi tiết về điều kiện ứng tuyển."
        }
      }
    ]
  },
  {
    "topic_id": "topic_05_van_phong_hourenso",
    "title": "Chủ đề 05: Văn hóa công sở & Hourensou",
    "japanese_title": "ビジネスマナー・報連相・業務の語彙",
    "description": "Bộ quy tắc ứng xử kinh điển trong doanh nghiệp Nhật, kỹ năng báo cáo - liên lạc - thảo luận và kính ngữ công sở.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "報告",
        "furigana": "ほうこく",
        "romaji": "houkoku",
        "han_viet": "BÁO CÁO",
        "meaning_vn": "Báo cáo kết quả và tiến độ công việc cho cấp trên",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Hourensou (報連相)",
        "visual_diagram": "   🥦 HOURENSOU (Quy tắc vàng công sở Nhật):\n   ├── 📢 報 (ほう - 報告 - Báo cáo): Việc xong phải báo cấp trên ngay\n   ├── 💬 連 (れん - 連絡 - Liên lạc): Có biến đổi thông tin phải báo đồng đội\n   └── 🤝 相 (そう - 相談 - Thảo luận): Gặp chuyện khó đừng tự ý làm, hãy xin ý kiến",
        "diagram_caption": "Ba chữ cái đầu ghép lại thành 'Horenso' (ほうれん草 - rau bina), phép chơi chữ kinh điển của giới văn phòng Nhật",
        "mnemonic": "BÁO (報 - thông báo) + CÁO (告 - tỏ bày). Chủ động trình bày kết quả cho cấp trên.",
        "collocations": [
          {
            "ja": "進捗を報告する",
            "furigana": "しんちょくをほうこくする",
            "vn": "Báo cáo tiến độ đang làm tới đâu"
          },
          {
            "ja": "中間報告",
            "furigana": "ちゅうかんほうこく",
            "vn": "Báo cáo giữa chừng khi dự án chưa xong"
          }
        ],
        "example": {
          "sentence": "仕事[しごと]が終[お]わったら、すぐに上司[じょうし]に結果[けっか]を報告[ほうこく]しなければならない。",
          "translation": "Sau khi công việc kết thúc, phải lập tức báo cáo kết quả cho cấp trên."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "連絡",
        "furigana": "れんらく",
        "romaji": "renraku",
        "han_viet": "LIÊN LẠC",
        "meaning_vn": "Liên lạc, cập nhật và chia sẻ thông tin cho các bên",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Hourensou (報連相)",
        "visual_diagram": "   🏃‍♂️ ĐẾN MUỘN?\n   ├── ❌ Im lặng chạy đến ──▶ Bị đánh giá thiếu trách nhiệm trầm trọng\n   └── ⭕ Gọi điện trước giờ làm: 「電車の遅延で15分遅れます」 ──▶ Được thông cảm",
        "diagram_caption": "Bất kỳ sự cố nào xảy ra làm lệch giờ giấc, bắt buộc phải liên lạc ngay lập tức",
        "mnemonic": "LIÊN (連 - kết nối) + LẠC (絡 - ràng buộc mạng lưới). Giữ cho mạng lưới thông tin luôn thông suốt.",
        "collocations": [
          {
            "ja": "事前連絡",
            "furigana": "じぜんれんらく",
            "vn": "Liên lạc báo trước khi sự việc diễn ra"
          },
          {
            "ja": "連絡を取り合う",
            "furigana": "れんらくをとりあう",
            "vn": "Giữ liên lạc thường xuyên qua lại"
          }
        ],
        "example": {
          "sentence": "体調[たいちょう]が悪[わる]くて休[やす]む時[とき]は、始業[しぎょう]前[まえ]に会社[かいしゃ]へ連絡[れんらく]する。",
          "translation": "Khi bị ốm phải nghỉ thì hãy liên lạc đến công ty trước giờ bắt đầu làm việc."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "相談",
        "furigana": "そうだん",
        "romaji": "soudan",
        "han_viet": "TƯƠNG ĐÀM",
        "meaning_vn": "Thảo luận, xin lời khuyên / ý kiến của người khác",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Hourensou (報連相)",
        "visual_diagram": "   🤔 TỰ Ý QUYẾT ĐỊNH (勝手な判断) ──▶ NGUY HIỂM LỚN TRONG CÔNG TY NHẬT!\n   │\n   └── 🤝 相談する: Gặp điều chưa rõ, đến hỏi tiền bối:\n       「今、少しご相談のお時間をいただけますでしょうか。」",
        "diagram_caption": "Xin ý kiến tiền bối không phải là yếu kém, mà là sự cẩn trọng bảo đảm chất lượng công việc",
        "mnemonic": "TƯƠNG (相 - lẫn nhau) + ĐÀM (談 - đàm luận trò chuyện). Cùng nhau đàm đạo để tìm ra giải pháp.",
        "collocations": [
          {
            "ja": "上司に相談を持ちかける",
            "furigana": "じょうしにそうだんをもちかける",
            "vn": "Mở lời xin ý kiến sếp"
          },
          {
            "ja": "相談に乗る",
            "furigana": "そうだんにのる",
            "vn": "Lắng nghe và cho lời khuyên"
          }
        ],
        "example": {
          "sentence": "自分[じぶん]一人[ひとり]で悩[なや]まずに、経験[けいけん]の豊富[ほうふ]な先輩[せんぱい]に相談[そうだん]する。",
          "translation": "Đừng ôm phiền não một mình mà hãy xin lời khuyên từ các tiền bối giàu kinh nghiệm."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "承知",
        "furigana": "しょうち",
        "romaji": "shouchi",
        "han_viet": "THỪA TRI",
        "meaning_vn": "Hiểu rõ, tiếp nhận yêu cầu (Kính ngữ công sở: 承知いたしました)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Kính ngữ thương mại",
        "visual_diagram": "   🙅‍♂️ 了解しました (Chỉ dùng với bạn bè, đồng cấp hoặc cấp dưới)\n   🙆‍♂️ 承知いたしました (Kính ngữ chuẩn mực tuyệt đối với sếp & khách hàng)\n   🙆‍♂️ かしこまりました (Đồng nghĩa cực kỳ lịch sự)",
        "diagram_caption": "Bẫy kính ngữ N3 cực kỳ phổ biến: Nói '了解です' với sếp là bị chê thất lễ!",
        "mnemonic": "THỪA (承 - nhận lãnh) + TRI (知 - thấu hiểu). Đã hiểu rõ và xin nhận lãnh chỉ thị.",
        "collocations": [
          {
            "ja": "承知いたしました",
            "furigana": "しょうちいたしました",
            "vn": "Tôi đã hiểu rõ yêu cầu (rất lịch sự)"
          },
          {
            "ja": "ご承知のとおり",
            "furigana": "ごしょうちのとおり",
            "vn": "Như quý vị đã biết rõ"
          }
        ],
        "example": {
          "sentence": "「この資料[しりょう]を明日[あす]までにコピーしておいて」「はい、承知[しょうち]いたしました」",
          "translation": "'Hãy photo tài liệu này trước ngày mai nhé.' - 'Vâng, tôi đã hiểu rõ và sẽ làm ngay ạ.'"
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "恐れ入ります",
        "furigana": "おそれいります",
        "romaji": "osoreirimasu",
        "han_viet": "KHỦNG NHẬP",
        "meaning_vn": "Xin phép làm phiền / Vô cùng cảm kích (lời mở đầu lịch sự)",
        "word_type": "Cụm kính ngữ",
        "tag": "Kính ngữ giao tiếp",
        "visual_diagram": "   🙇‍♂️ CUSHION WORDS (Lời đệm mềm mại trước khi nhờ vả):\n   ├── 「恐れ入りますが、お名前を伺えますでしょうか」\n   ├── 「お忙しいところ恐縮ですが...」\n   └── 「ご面倒をおかけしますが...」",
        "diagram_caption": "Giúp câu nói giảm bớt tính áp đặt, tạo cảm giác vô cùng tôn trọng đối phương",
        "mnemonic": "KHỦNG (恐 - e sợ, ngần ngại) + NHẬP (入 - đi vào). Cảm thấy ngại ngùng khi phiền người khác.",
        "collocations": [
          {
            "ja": "恐れ入りますが",
            "furigana": "おそれいりますが",
            "vn": "Xin thứ lỗi làm phiền nhưng..."
          },
          {
            "ja": "大変恐れ入ります",
            "furigana": "たいへんおそれいります",
            "vn": "Vô cùng cảm kích và áy náy"
          }
        ],
        "example": {
          "sentence": "恐[おそ]れ入[い]りますが、少々[しょうしょう]お待[ま]ちいただけますでしょうか。",
          "translation": "Xin thứ lỗi làm phiền, nhưng quý khách có thể vui lòng đợi một chút được không ạ?"
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "担当",
        "furigana": "たんとう",
        "romaji": "tantou",
        "han_viet": "ĐẢM ĐƯƠNG",
        "meaning_vn": "Đảm trách, phụ trách một mảng công việc hoặc khách hàng",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Phân công công việc",
        "visual_diagram": "   🏢 BỘ PHẬN CÔNG TY (部署):\n   ├── 👨‍💼 担当者 (Người trực tiếp xử lý dự án)\n   └── 📞 Gọi điện: 「担当の山田様はいらっしゃいますでしょうか」\n       (Cho tôi xin phép gặp anh Yamada người phụ trách mảng này ạ)",
        "diagram_caption": "Tại Nhật, mỗi khách hàng hoặc hạng mục đều có một người chịu trách nhiệm trực tiếp",
        "mnemonic": "ĐẢM (担 - gánh vác) + ĐƯƠNG (当 - gánh nhận). Gánh vác trọng trách việc được giao.",
        "collocations": [
          {
            "ja": "担当者",
            "furigana": "たんとうしゃ",
            "vn": "Người phụ trách trực tiếp"
          },
          {
            "ja": "営業を担当する",
            "furigana": "えいぎょうをたんとうする",
            "vn": "Phụ trách mảng kinh doanh"
          }
        ],
        "example": {
          "sentence": "新規[しんき]プロジェクトの進行[しんこう]を担当[たんとう]することになった。",
          "translation": "Tôi đã được giao nhiệm vụ phụ trách tiến độ của dự án mới."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "議事録",
        "furigana": "ぎじろく",
        "romaji": "gijiroku",
        "han_viet": "NGHỊ SỰ LỤC",
        "meaning_vn": "Biên bản cuộc họp (ghi lại quyết định và ai làm gì)",
        "word_type": "Danh từ",
        "tag": "Tài liệu văn phòng",
        "visual_diagram": "   📝 議事録 (Nội dung cốt lõi của biên bản họp):\n   ├── 📅 Thời gian, địa điểm, thành viên tham gia\n   ├── 💡 Những nội dung chính đã thống nhất (決定事項)\n   └── 📌 Kế hoạch hành động tiếp theo: Ai làm việc gì, hạn chót ngày nào (TODO / Action items)",
        "diagram_caption": "Nhiệm vụ đầu tiên của lính mới sau các buổi họp: Soạn biên bản và gửi toàn công ty trong ngày",
        "mnemonic": "NGHỊ SỰ (議事 - chuyện bàn bạc trong cuộc họp) + LỤC (録 - ghi chép lại).",
        "collocations": [
          {
            "ja": "議事録を作成する",
            "furigana": "ぎじろくをさくせいする",
            "vn": "Soạn thảo biên bản cuộc họp"
          },
          {
            "ja": "議事録を共有する",
            "furigana": "ぎじろくをきょうゆうする",
            "vn": "Chia sẻ biên bản cho toàn bộ thành viên"
          }
        ],
        "example": {
          "sentence": "会議[かいぎ]が終[お]わったら、当日[とうじつ]中[ちゅう]に議事録[ぎじろく]を関係者[かんけいしゃ]にメールで送[おく]る。",
          "translation": "Sau khi cuộc họp kết thúc, hãy soạn và gửi biên bản họp qua email cho các bên liên quan ngay trong ngày."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "納期",
        "furigana": "のうき",
        "romaji": "nouki",
        "han_viet": "NẠP KỲ",
        "meaning_vn": "Hạn giao hàng, hạn chót bàn giao sản phẩm",
        "word_type": "Danh từ",
        "tag": "Tiến độ công việc",
        "visual_diagram": "   ⏰ 納期 (DEADLINE GIAO HÀNG):\n   ├── ⭕ 納期厳守 (Tuyệt đối tuân thủ kỳ hạn - Nguyên tắc sống còn)\n   └── ❌ 納期遅延 (Trễ hạn - Mất uy tín, bồi thường thiệt hại)",
        "diagram_caption": "Chữ TÍN số 1 của doanh nghiệp Nhật Bản: Giao hàng đúng hẹn từng phút từng giây",
        "mnemonic": "NẠP (納 - nộp, giao nạp) + KỲ (期 - kỳ hạn, thời hạn). Hạn cuối phải nộp sản phẩm.",
        "collocations": [
          {
            "ja": "納期に間に合わせる",
            "furigana": "のうきにまにあわせる",
            "vn": "Làm kịp đúng hạn bàn giao"
          },
          {
            "ja": "納期を延期する",
            "furigana": "のうきをえんきする",
            "vn": "Xin gia hạn ngày giao hàng"
          }
        ],
        "example": {
          "sentence": "チーム全員[ぜんいん]で協力[きょうりょく]して、何[なん]とか納期[のうき]に間[ま]に合[あ]わせた。",
          "translation": "Cả đội đã đồng lòng hợp tác và bằng mọi giá đã kịp hạn chót bàn giao."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "打ち合わせ",
        "furigana": "うちあわせ",
        "romaji": "uchiawase",
        "han_viet": "ĐẢ HỢP",
        "meaning_vn": "Họp trao đổi sơ bộ, bàn bạc sắp xếp trước",
        "word_type": "Danh từ / Động từ nhóm 2",
        "tag": "Cuộc họp",
        "visual_diagram": "   ☕ 打ち合わせ (Họp ngắn, trao đổi ý tưởng nhanh, không quá trang trọng)\n        vs\n   👔 会議 (Họp hội nghị lớn, đưa ra quyết định chính thức cấp phòng/công ty)",
        "diagram_caption": "Uchiawase thường diễn ra khoảng 15-30 phút để chốt kế hoạch trước khi bắt tay làm",
        "mnemonic": "ĐẢ (打 - gõ) + HỢP (合 - khớp nhau). Khớp ý nhau trước để cùng nhịp điệu.",
        "collocations": [
          {
            "ja": "打ち合わせを行う",
            "furigana": "うちあわせをおこなう",
            "vn": "Tiến hành buổi họp trao đổi"
          },
          {
            "ja": "事前打ち合わせ",
            "furigana": "じぜんうちあわせ",
            "vn": "Họp trù bị từ trước"
          }
        ],
        "example": {
          "sentence": "午後[ごご]から取引先[とりひきさき]と新[あたら]しい案件[あんけん]の打[う]ち合[あ]わせがある。",
          "translation": "Chiều nay tôi có buổi họp trao đổi với đối tác về dự án mới."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "恐縮",
        "furigana": "きょうしゅく",
        "romaji": "kyoushuku",
        "han_viet": "KHỦNG SÚC",
        "meaning_vn": "Vô cùng áy náy và biết ơn (dùng khi được giúp hoặc phiền ai)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Kính ngữ trang trọng",
        "visual_diagram": "   🙇‍♂️「大変恐縮でございますが、ご確認のほどよろしくお願い申し上げます。」\n   (Tôi cảm thấy vô cùng áy náy làm phiền quý vị, nhưng kính mong quý vị kiểm tra giúp cho ạ)",
        "diagram_caption": "Cụm từ xuất hiện dày đặc trong email công việc của người Nhật",
        "mnemonic": "KHỦNG (恐 - sợ sệt) + SÚC (縮 - co rúm lại). Ngại ngùng co người lại vì được đối phương quá đỗi ưu ái.",
        "collocations": [
          {
            "ja": "お忙しいところ恐縮ですが",
            "furigana": "おいそがしいところきょうしゅくですが",
            "vn": "Biết anh/chị rất bận tôi rất áy náy nhưng..."
          },
          {
            "ja": "恐縮至極",
            "furigana": "きょうしゅくしごく",
            "vn": "Vô cùng cảm kích và áy náy"
          }
        ],
        "example": {
          "sentence": "私[わたし]のような者のためにわざわざお越[こ]しいただき、恐縮[きょうしゅく]しております。",
          "translation": "Vì một người như tôi mà quý vị đã cất công tới tận đây, tôi thật sự cảm thấy vô cùng áy náy và biết ơn."
        }
      }
    ]
  },
  {
    "topic_id": "topic_06_thu_tuc_hanh_chinh",
    "title": "Chủ đề 06: Thủ tục hành chính & Giấy tờ quận",
    "japanese_title": "行政手続き・市役所・書類の語彙",
    "description": "Thủ tục đăng ký cư trú, giấy tờ tùy thân, đóng dấu và giải quyết hồ sơ tại Tòa thị chính (Shyakusho).",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "市役所",
        "furigana": "しやくしょ",
        "romaji": "shiyakusho",
        "han_viet": "THỊ DỊCH SỞ",
        "meaning_vn": "Ủy ban nhân dân / Tòa thị chính thành phố",
        "word_type": "Danh từ",
        "tag": "Cơ quan hành chính",
        "visual_diagram": "   🏛️ 市役所 (Tòa thị chính thành phố) / 区役所 (Ủy ban quận)\n   ├── 🏢 Tầng 1: Quầy làm thẻ cư trú, bảo hiểm y tế\n   ├── 🏢 Tầng 2: Thuế thị dân, phúc lợi xã hội\n   └── 🎫 Lấy số thứ tự (番号札) và ngồi chờ gọi tên",
        "diagram_caption": "Nơi người nước ngoài phải tới đầu tiên khi đặt chân đến Nhật hoặc chuyển nhà",
        "mnemonic": "THỊ (市 - thành phố) + DỊCH (役 - công vụ nhà nước) + SỞ (所 - nơi chốn). Trụ sở hành chính công vụ của thành phố.",
        "collocations": [
          {
            "ja": "市役所の窓口",
            "furigana": "しやくしょのまどぐち",
            "vn": "Quầy làm việc tại tòa thị chính"
          },
          {
            "ja": "区役所へ行く",
            "furigana": "くやくしょへいく",
            "vn": "Đi lên ủy ban quận"
          }
        ],
        "example": {
          "sentence": "引[ひ]っ越[こ]したら十四日[じゅうよっか]以内[いない]に市役所[しやくしょ]へ行[い]かなければならない。",
          "translation": "Sau khi chuyển nhà, trong vòng 14 ngày bắt buộc phải đến tòa thị chính làm thủ tục."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "住民票",
        "furigana": "じゅうみんひょう",
        "romaji": "juuminhyou",
        "han_viet": "TRÚ DÂN PHIẾU",
        "meaning_vn": "Phiếu đăng ký cư trú (giấy chứng nhận nơi ở hợp pháp)",
        "word_type": "Danh từ",
        "tag": "Giấy tờ tùy thân",
        "visual_diagram": "   📄 住民票 (Phiếu cư dân ghi rõ):\n   ├── 👤 Họ tên, ngày tháng năm sinh\n   ├── 🏠 Địa chỉ nhà hiện tại đang sinh sống\n   ├── 🌐 Quốc tịch & Tư cách lưu trú (Visa)\n   └── 🏧 Dùng làm hồ sơ: Mở tài khoản ngân hàng, mua xe, thuê nhà, xin visa",
        "diagram_caption": "Có thể in trực tiếp phiếu cư dân tại máy in ở Konbini bằng thẻ My Number",
        "mnemonic": "TRÚ (住 - sinh sống) + DÂN (民 - người dân) + PHIẾU (票 - tờ phiếu). Giấy tờ xác nhận là cư dân sinh sống tại địa phương.",
        "collocations": [
          {
            "ja": "住民票の写しを取得する",
            "furigana": "じゅうみんひょうのうつしをしゅとくする",
            "vn": "Xin cấp bản sao phiếu cư trú"
          },
          {
            "ja": "住民票を提出する",
            "furigana": "じゅうみんひょうをていしゅつする",
            "vn": "Nộp phiếu cư trú cho trường/công ty"
          }
        ],
        "example": {
          "sentence": "銀行[ぎんこう]口座[こうざ]を開設[かいせつ]するために、住民票[じゅうみんひょう]のコピーを取[と]ってきた。",
          "translation": "Để mở tài khoản ngân hàng, tôi đã đi xin bản sao phiếu cư trú."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "転入届",
        "furigana": "てんにゅうとどけ",
        "romaji": "tennyuutodoke",
        "han_viet": "CHUYỂN NHẬP GIỚI",
        "meaning_vn": "Giấy thông báo chuyển đến nơi ở mới (báo nhập cư)",
        "word_type": "Danh từ",
        "tag": "Thủ tục chuyển nhà",
        "visual_diagram": "   QUY TRÌNH CHUYỂN ĐỊA CHỈ TẠI NHẬT:\n   1. 🏛️ Quận cũ: Nộp 転出届 (Báo chuyển đi) ──▶ Nhận 転出証明書\n   2. 🚚 Dọn đồ sang nhà mới\n   3. 🏛️ Quận mới: Nộp 転入届 (Báo chuyển đến) + Nộp 転出証明書",
        "diagram_caption": "Bắt buộc làm trong vòng 14 ngày kể từ khi dọn đến nhà mới",
        "mnemonic": "CHUYỂN (転 - chuyển) + NHẬP (入 - vào) + GIỚI (届 - đơn thông báo). Đơn báo chuyển vào ở.",
        "collocations": [
          {
            "ja": "転入届を出す",
            "furigana": "てんにゅうとどけをだす",
            "vn": "Nộp đơn thông báo chuyển đến"
          },
          {
            "ja": "転入の手続き",
            "furigana": "てんにゅうのてつづき",
            "vn": "Thủ tục nhập hộ tịch"
          }
        ],
        "example": {
          "sentence": "新[あたら]しい街[まち]に引っ越した翌日[よくじつ]、市役所[しやくしょ]に転入届[てんにゅうとどけ]を提出[ていしゅつ]した。",
          "translation": "Ngày hôm sau sau khi chuyển tới thị trấn mới, tôi đã nộp giấy báo chuyển đến tại tòa thị chính."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "転出届",
        "furigana": "てんしゅつとどけ",
        "romaji": "tenshutsutodoke",
        "han_viet": "CHUYỂN XUẤT GIỚI",
        "meaning_vn": "Giấy thông báo chuyển đi khỏi nơi ở cũ",
        "word_type": "Danh từ",
        "tag": "Thủ tục chuyển nhà",
        "visual_diagram": "   🏃‍♂️ Rời khỏi quận cũ ──▶ 🏛️ Nộp 転出届 (Giấy chuyển đi)\n                                │\n                                └── Nhận giấy 転出証明書 (Cầm sang quận mới)",
        "diagram_caption": "Không làm thủ tục này bạn sẽ bị tính thuế và tiền bảo hiểm ở cả hai nơi",
        "mnemonic": "CHUYỂN (転 - dời) + XUẤT (出 - ra ngoài) + GIỚI (届 - đơn thông báo). Báo chuyển đi nơi khác.",
        "collocations": [
          {
            "ja": "転出証明書",
            "furigana": "てんしゅつしょうめいしょ",
            "vn": "Giấy chứng nhận chuyển đi"
          },
          {
            "ja": "転出の手続きを行う",
            "furigana": "てんしゅつのてつづきをおこなう",
            "vn": "Tiến hành thủ tục chuyển đi"
          }
        ],
        "example": {
          "sentence": "引[ひ]っ越[こ]しの前[まえ]に、前[まえ]の区役所[くやくしょ]で転出届[てんしゅつとどけ]を済[す]ませておく。",
          "translation": "Trước khi dọn nhà, hãy hoàn tất thủ tục thông báo chuyển đi tại ủy ban quận cũ."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "身分証明書",
        "furigana": "みぶんしょうめいしょ",
        "romaji": "mibun shoumeisho",
        "han_viet": "THÂN PHÂN CHỨNG MINH THƯ",
        "meaning_vn": "Giấy tờ tùy thân (Thẻ ngoại kiều, bằng lái xe, hộ chiếu)",
        "word_type": "Danh từ",
        "tag": "Giấy tờ pháp lý",
        "visual_diagram": "   🪪 身分証明書 (Các loại giấy tờ tùy thân hợp lệ):\n   ├── 🛂 在留カード (Thẻ ngoại kiều - Người nước ngoài luôn phải mang bên người)\n   ├── 🚗 運転免許証 (Bằng lái xe - Giấy tờ uy tín nhất tại Nhật)\n   └── 📕 パスポート (Hộ chiếu)",
        "diagram_caption": "Tại Nhật Bản, không mang thẻ ngoại kiều bên người khi ra đường có thể bị cảnh sát phạt",
        "mnemonic": "THÂN PHÂN (身分 - danh tính bản thân) + CHỨNG MINH (証明 - làm chứng) + THƯ (書 - giấy tờ).",
        "collocations": [
          {
            "ja": "身分証明書を提示する",
            "furigana": "みぶんしょうめいしょをていじする",
            "vn": "Xuất trình giấy tờ tùy thân"
          },
          {
            "ja": "顔写真付きの身分証明書",
            "furigana": "かおじゃしんつきのみぶんしょうめいしょ",
            "vn": "Giấy tờ tùy thân có dán ảnh chụp khuôn mặt"
          }
        ],
        "example": {
          "sentence": "本人[ほんにん]確認[かくにん]のため、窓口[まどぐち]で身分[みぶん]証明書[しょうめいしょ]の提示[ていじ]を求[もと]められた。",
          "translation": "Để xác nhận danh tính, tôi đã được yêu cầu xuất trình giấy tờ tùy thân tại quầy giao dịch."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "申請",
        "furigana": "しんせい",
        "romaji": "shinsei",
        "han_viet": "THÂN THỈNH",
        "meaning_vn": "Làm đơn xin phép, đệ trình thỉnh cầu lên cơ quan",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Hành chính",
        "visual_diagram": "   📝 Người dân làm đơn ──(申請 - Thân thỉnh)──▶ 🏛️ Cơ quan chức năng\n                                                    │\n                                                    └── Xét duyệt (審査) ──▶ Cấp phép (許可)",
        "diagram_caption": "Dùng trong xin gia hạn visa, xin cấp giấy tờ, xin trợ cấp thất nghiệp...",
        "mnemonic": "THÂN (申 - trình bày khiêm nhường) + THỈNH (請 - cầu xin, đề nghị). Trình đơn xin cấp quyền.",
        "collocations": [
          {
            "ja": "ビザの更新を申請する",
            "furigana": "ビザのこうしんをしんせいする",
            "vn": "Nộp đơn xin gia hạn visa"
          },
          {
            "ja": "申請書に記入する",
            "furigana": "しんせいしょにきにゅうする",
            "vn": "Điền vào đơn xin cấp phép"
          }
        ],
        "example": {
          "sentence": "在留[ざいりゅう]資格[しかく]の変更[へんこう]を申請[しんせい]するために、入国[にゅうこく]管理局[かんりきょく]へ行[い]った。",
          "translation": "Tôi đã đến Cục Quản lý Xuất nhập cảnh để nộp đơn xin thay đổi tư cách lưu trú."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "手続き",
        "furigana": "てつづき",
        "romaji": "tetsuzuki",
        "han_viet": "THỦ TỤC",
        "meaning_vn": "Các bước thực hiện thủ tục hồ sơ giấy tờ",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Quy trình",
        "visual_diagram": "   📋 QUY TRÌNH THỦ TỤC (手続きの流れ):\n   Bước 1: 📄 Chuẩn bị đầy đủ giấy tờ (書類の準備)\n   Bước 2: ✍️ Điền đơn tại quầy (記入)\n   Bước 3: 🔍 Kiểm tra xét duyệt (確認・審査)\n   Bước 4: 🏷️ Đóng dấu hoàn tất (完了)",
        "diagram_caption": "Nhiều thủ tục ở Nhật đòi hỏi độ chính xác tuyệt đối, sai một chữ cũng phải viết lại",
        "mnemonic": "THỦ (手 - bàn tay) + TỤC (続 - nối tiếp nhau). Các bước thực hiện bằng tay nối tiếp nhau theo trình tự.",
        "collocations": [
          {
            "ja": "手続きを踏む",
            "furigana": "てつづきをふむ",
            "vn": "Thực hiện theo đúng các bước thủ tục"
          },
          {
            "ja": "複雑な手続き",
            "furigana": "ふくざつなてつづき",
            "vn": "Thủ tục phức tạp, rườm rà"
          }
        ],
        "example": {
          "sentence": "携帯[けいたい]電話[でんわ]の解約[かいやく]手続き[てつづき]は、思[おも]ったより簡単[かんたん]だった。",
          "translation": "Thủ tục hủy hợp đồng điện thoại di động đơn giản hơn tôi nghĩ."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "窓口",
        "furigana": "まどぐち",
        "romaji": "madoguchi",
        "han_viet": "SONG KHẨU",
        "meaning_vn": "Quầy giao dịch, nơi tiếp nhận và xử lý hồ sơ",
        "word_type": "Danh từ",
        "tag": "Địa điểm giao dịch",
        "visual_diagram": "   🎫 BẤM LẤY SỐ (番号札をお取りください)\n        │\n        └── 🪑 Chờ màn hình hiện: [Số 104 ──▶ Quầy số 3 (3番窓口)]\n        │\n        └── 💁‍♀️ Nhân viên tiếp nhận xử lý hồ sơ",
        "diagram_caption": "Tại ngân hàng, bưu điện hay tòa thị chính, nơi ngồi tiếp khách gọi là 窓口",
        "mnemonic": "SONG (窓 - cửa sổ nhỏ) + KHẨU (口 - cửa mở ra). Ô cửa sổ nhỏ để giao dịch tiếp dân.",
        "collocations": [
          {
            "ja": "窓口で相談する",
            "furigana": "まどぐちでそうだんする",
            "vn": "Trao đổi hỏi han trực tiếp tại quầy"
          },
          {
            "ja": "総合窓口",
            "furigana": "そうごうまどぐち",
            "vn": "Quầy giao dịch hướng dẫn tổng hợp"
          }
        ],
        "example": {
          "sentence": "何[なに]番[ばん]の窓口[まどぐち]へ行[い]けばいいか分[わ]からず、案内係[あんないがかり]に尋[たず]ねた。",
          "translation": "Không biết phải đến quầy số mấy nên tôi đã hỏi người hướng dẫn."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "有効期限",
        "furigana": "ゆうこうきげん",
        "romaji": "yuukoukigen",
        "han_viet": "HỮU HIỆU KỲ HẠN",
        "meaning_vn": "Thời hạn hiệu lực, hạn dùng giấy tờ",
        "word_type": "Danh từ",
        "tag": "Thời hạn",
        "visual_diagram": "   📅 有効期限: 2026年12月31日まで\n   ├── ⏳ Còn hạn: Có giá trị pháp lý đầy đủ\n   └── ⚠️ Hết hạn (期限切れ): Không thể sử dụng, vi phạm luật (Quá hạn visa = Bất hợp pháp)",
        "diagram_caption": "Luôn kiểm tra hạn thẻ lưu trú ít nhất 3 tháng trước khi hết hạn để làm thủ tục gia hạn kịp thời",
        "mnemonic": "HỮU HIỆU (有効 - có hiệu lực) + KỲ HẠN (期限 - thời hạn chót).",
        "collocations": [
          {
            "ja": "有効期限が切れる",
            "furigana": "ゆうこうきげんがきれる",
            "vn": "Hết thời hạn hiệu lực"
          },
          {
            "ja": "有効期限を延長する",
            "furigana": "ゆうこうきげんをえんちょうする",
            "vn": "Kéo dài thời hạn sử dụng"
          }
        ],
        "example": {
          "sentence": "パスポートの有効[ゆうこう]期限[きげん]が迫[せま]っているので、更新[こうしん]しなければならない。",
          "translation": "Thời hạn hiệu lực của hộ chiếu sắp hết nên tôi phải đi gia hạn lại."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "印鑑",
        "furigana": "いんかん",
        "romaji": "inkan",
        "han_viet": "ẤN GIÁM",
        "meaning_vn": "Con dấu cá nhân (thay thế cho chữ ký tại Nhật)",
        "word_type": "Danh từ",
        "tag": "Văn hóa pháp lý",
        "visual_diagram": "   🔴 3 LOẠI CON DẤU TẠI NHẬT BẢN:\n   ├── 🖊️ 認印 (Con dấu thường: nhận bưu phẩm, ký việc vặt ở cty)\n   ├── 🏦 銀行印 (Dấu ngân hàng: dùng mở và rút tiền tài khoản)\n   └── 📜 実印 (Dấu pháp lý đăng ký ủy ban: dùng mua nhà, mua xe hơi)",
        "diagram_caption": "Văn hóa dùng con dấu (Hanko) là nét đặc thù lâu đời của nền hành chính Nhật Bản",
        "mnemonic": "ẤN (印 - con dấu đóng) + GIÁM (鑑 - soi chiếu làm gương). Dấu ấn làm bằng chứng pháp lý.",
        "collocations": [
          {
            "ja": "印鑑を押す / 捺印する",
            "furigana": "いんかんをおす / なついんする",
            "vn": "Đóng con dấu lên văn bản"
          },
          {
            "ja": "印鑑登録証明書",
            "furigana": "いんかんとうろくしょうめいしょ",
            "vn": "Giấy chứng nhận đăng ký con dấu tại quận"
          }
        ],
        "example": {
          "sentence": "契約書[けいやくしょ]の指定[してい]された場所[ばしょ]に、認印[みとめいん]を押[お]してください。",
          "translation": "Xin vui lòng đóng con dấu vào đúng vị trí được chỉ định trên bản hợp đồng."
        }
      }
    ]
  },
  {
    "topic_id": "topic_07_kham_benh_uong_thuoc",
    "title": "Chủ đề 07: Khám bệnh & Y tế & Uống thuốc",
    "japanese_title": "病院・診察・症状・処方箋の語彙",
    "description": "Từ vựng đi bệnh viện, miêu tả triệu chứng bệnh, bảo hiểm y tế và cách dùng thuốc đúng chỉ định tại Nhật.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "保険証",
        "furigana": "ほけんしょう",
        "romaji": "hokenshou",
        "han_viet": "BẢO HIỂM CHỨNG",
        "meaning_vn": "Thẻ bảo hiểm y tế quốc dân (giảm 70% viện phí)",
        "word_type": "Danh từ",
        "tag": "Giấy tờ y tế",
        "visual_diagram": "   🏥 VIỆN PHÍ TẠI NHẬT:\n   ├── ❌ Không có thẻ: BẠN TRẢ 100% (Khám cảm cúm ~ 10,000円)\n   └── ⭕ Có thẻ 保険証: BẠN TRẢ 30% (Chỉ tốn ~ 3,000円, 70% nhà nước chi trả)",
        "diagram_caption": "Vật bất ly thân khi đi khám bệnh tại bất kỳ bệnh viện hay phòng khám nào",
        "mnemonic": "BẢO HIỂM (保険 - giữ gìn phòng hiểm họa) + CHỨNG (証 - bằng chứng). Thẻ chứng nhận đã đóng bảo hiểm y tế.",
        "collocations": [
          {
            "ja": "健康保険証を提示する",
            "furigana": "けんこうほけんしょうをていじする",
            "vn": "Xuất trình thẻ bảo hiểm y tế"
          },
          {
            "ja": "国民健康保険",
            "furigana": "こくみんけんこうほけん",
            "vn": "Bảo hiểm y tế quốc dân cho du học sinh"
          }
        ],
        "example": {
          "sentence": "初[はじ]めての病院[びょういん]を受診[じゅしん]する際[さい]は、必[かなら]ず保険証[ほけんしょう]を持参[じさん]する。",
          "translation": "Khi đến khám bệnh tại bệnh viện lần đầu, nhất định phải mang theo thẻ bảo hiểm."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "診察券",
        "furigana": "しんさつけん",
        "romaji": "shinsatsuken",
        "han_viet": "CHẨN SÁT KHOÁN",
        "meaning_vn": "Thẻ khám bệnh riêng của từng bệnh viện/phòng khám",
        "word_type": "Danh từ",
        "tag": "Thẻ y tế",
        "visual_diagram": "   🏥 PHÂN BIỆT 2 LOẠI THẺ KHI ĐI KHÁM:\n   ├── 💳 保険証: Thẻ bảo hiểm chung do nhà nước cấp (dùng ở mọi bệnh viện)\n   └── 🔖 診察券: Thẻ riêng của viện cấp lần đầu (ghi mã số bệnh nhân của viện đó)",
        "diagram_caption": "Mỗi bệnh viện bạn đến lần đầu sẽ cấp cho bạn một tấm 診察券 bằng nhựa hoặc bìa cứng",
        "mnemonic": "CHẨN SÁT (診察 - bác sĩ thăm khám bệnh) + KHOÁN (券 - tấm vé, chiếc thẻ).",
        "collocations": [
          {
            "ja": "診察券を出す",
            "furigana": "しんさつけんをだす",
            "vn": "Nộp thẻ khám bệnh khi tới tái khám"
          },
          {
            "ja": "診察券を再発行する",
            "furigana": "しんさつけんをさいはっこうする",
            "vn": "Cấp lại thẻ khám bệnh bị mất"
          }
        ],
        "example": {
          "sentence": "再診[さいしん]の時[とき]は、受付[うけつけ]で診察券[しんさつけん]と保険証[ほけんしょう]を一緒[いっしょ]に出[だ]す。",
          "translation": "Khi đi tái khám, hãy nộp cùng lúc thẻ khám bệnh và thẻ bảo hiểm tại quầy tiếp tân."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "処方箋",
        "furigana": "しょほうせん",
        "romaji": "shohousen",
        "han_viet": "XỨ PHƯƠNG TIÊM",
        "meaning_vn": "Đơn thuốc do bác sĩ kê",
        "word_type": "Danh từ",
        "tag": "Lấy thuốc",
        "visual_diagram": "   🏥 Bệnh viện (Khám bệnh xong) ──▶ Nhận đơn 処方箋 (Giấy kê toa)\n                                           │\n                                           ▼ Mang sang\n   💊 薬局 (Hiệu thuốc kê đơn bên ngoài) ──▶ Dược sĩ bốc thuốc và hướng dẫn",
        "diagram_caption": "Tại Nhật, bệnh viện chỉ khám bệnh, thuốc phải mang đơn ra hiệu thuốc riêng biệt để lấy",
        "mnemonic": "XỨ PHƯƠNG (処方 - phương thuốc điều trị) + TIÊM (箋 - tờ giấy ghi chú). Bản kê toa thuốc.",
        "collocations": [
          {
            "ja": "処方箋をもらう",
            "furigana": "しょほうせんをもらう",
            "vn": "Nhận đơn thuốc từ bác sĩ"
          },
          {
            "ja": "処方箋薬局",
            "furigana": "しょほうせんやっきょく",
            "vn": "Hiệu thuốc chuyên bốc theo đơn bác sĩ"
          }
        ],
        "example": {
          "sentence": "医師[いし]からもらった処方箋[しょほうせん]を持[も]って、近[ちか]くの薬局[やっきょく]へ行[い]った。",
          "translation": "Tôi cầm đơn thuốc bác sĩ đưa đến hiệu thuốc gần đó để lấy thuốc."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "症状",
        "furigana": "しょうじょう",
        "romaji": "shoujou",
        "han_viet": "CHỨNG TRẠNG",
        "meaning_vn": "Triệu chứng bệnh (sốt, đau họng, chóng mặt...)",
        "word_type": "Danh từ",
        "tag": "Khám bệnh",
        "visual_diagram": "   🤒 CÁC TRIỆU CHỨNG PHỔ BIẾN BẰNG TIẾNG NHẬT:\n   ├── 🌡️ 熱がある (Sốt cao)\n   ├── 🤧 鼻水・くしゃみ (Sổ mũi, hắt hơi)\n   ├── 🗣️ 咳が出る・喉が痛い (Ho, đau rát cổ họng)\n   ├── 😵 めまいがする (Chóng mặt, hoa mắt)\n   └── 🤢 吐き気がする (Buồn nôn)",
        "diagram_caption": "Bác sĩ sẽ luôn hỏi câu đầu tiên: 'Hôm nay bạn có triệu chứng thế nào?' (どんな症状ですか)",
        "mnemonic": "CHỨNG (症 - chứng bệnh) + TRẠNG (状 - tình trạng, biểu hiện). Tình trạng biểu hiện của căn bệnh.",
        "collocations": [
          {
            "ja": "症状が治まる",
            "furigana": "しょうじょうがおさまる",
            "vn": "Triệu chứng thuyên giảm, đỡ hẳn"
          },
          {
            "ja": "症状が悪化する",
            "furigana": "しょうじょうがあっかする",
            "vn": "Triệu chứng bệnh chuyển biến xấu đi"
          }
        ],
        "example": {
          "sentence": "風邪[かぜ]の初期[しょき]症状[しょうじょう]が現[あらわ]れたので、早[はや]めに薬[くすり]を飲[の]んで休[やす]んだ。",
          "translation": "Vì xuất hiện triệu chứng cảm cúm ban đầu nên tôi đã uống thuốc sớm rồi đi nghỉ ngơi."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "副作用",
        "furigana": "ふくさよう",
        "romaji": "fukusayou",
        "han_viet": "PHÓ TÁC DỤNG",
        "meaning_vn": "Tác dụng phụ không mong muốn của thuốc",
        "word_type": "Danh từ",
        "tag": "Cảnh báo dùng thuốc",
        "visual_diagram": "   💊 TÁC DỤNG CỦA THUỐC:\n   ├── 🎯 主作用 (Tác dụng chính: Giảm đau, hạ sốt, diệt khuẩn)\n   └── ⚠️ 副作用 (Tác dụng phụ: Buồn ngủ cực độ, khô họng, đau bụng)\n         ▲\n         └── 🚫 Uống thuốc cảm xong KHÔNG ĐƯỢC LÁI XE (運転禁止)",
        "diagram_caption": "Bao bì thuốc ở Nhật luôn in rất rõ các tác dụng phụ có thể gặp phải",
        "mnemonic": "PHÓ (副 - thứ yếu, phụ bên cạnh) + TÁC DỤNG (作用 - hiệu quả). Tác động đi kèm bên cạnh tác dụng chính.",
        "collocations": [
          {
            "ja": "副作用が出る",
            "furigana": "ふくさようがでる",
            "vn": "Xuất hiện tác dụng phụ"
          },
          {
            "ja": "強い副作用",
            "furigana": "つよいふくさよう",
            "vn": "Tác dụng phụ mạnh"
          }
        ],
        "example": {
          "sentence": "この風邪薬[かぜぐすり]は眠気[ねむけ]の副作用[ふくさよう]があるため、運転[うんてん]前[まえ]の服用[ふくよう]は避[さ]ける。",
          "translation": "Loại thuốc cảm này có tác dụng phụ gây buồn ngủ nên tránh uống trước khi lái xe."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "食前・食後",
        "furigana": "しょくぜん・しょくご",
        "romaji": "shokuzen / shokugo",
        "han_viet": "THỰC TIỀN / THỰC HẬU",
        "meaning_vn": "Trước bữa ăn / Sau bữa ăn (chỉ định thời gian uống thuốc)",
        "word_type": "Danh từ / Trạng từ",
        "tag": "Hướng dẫn dùng thuốc",
        "visual_diagram": "   ⏰ THỜI ĐIỂM UỐNG THUỐC:\n   ├── 🥣 食前 (しょくぜん - Trước bữa ăn ~30 phút, khi bụng đói)\n   ├── 🍽️ 食間 (しょっかん - Giữa hai bữa ăn, cách ăn 2 tiếng, KHÔNG PHẢI trong khi ăn!)\n   └── 🍲 食後 (しょくご - Sau bữa ăn ~30 phút, bảo vệ dạ dày)",
        "diagram_caption": "Bẫy từ vựng N3: 食間 (thực gian) là GIỮA 2 BỮA ĂN (khi bụng đói), không phải vừa ăn vừa uống thuốc!",
        "mnemonic": "TIỀN (前 - trước) vs HẬU (後 - sau). Nhìn chữ Hán nhận diện ngay thời điểm.",
        "collocations": [
          {
            "ja": "食後に服用する",
            "furigana": "しょくごにふくようする",
            "vn": "Uống thuốc sau bữa ăn"
          },
          {
            "ja": "毎食後",
            "furigana": "まいしょくご",
            "vn": "Sau mỗi bữa ăn hàng ngày"
          }
        ],
        "example": {
          "sentence": "胃[い]を痛[いた]めないように、この抗生[こうせい]物質[ぶっしつ]は必[かなら]ず食後[しょくご]に飲[の]んでください。",
          "translation": "Để không làm hại dạ dày, kháng sinh này nhất định phải uống sau bữa ăn."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "内科・外科",
        "furigana": "ないか・げか",
        "romaji": "naika / geka",
        "han_viet": "NỘI KHOA / NGOẠI KHOA",
        "meaning_vn": "Khoa nội (chữa bằng thuốc) / Khoa ngoại (chữa bằng phẫu thuật, bó bột)",
        "word_type": "Danh từ",
        "tag": "Chuyên khoa bệnh viện",
        "visual_diagram": "   🏥 CHỌN ĐÚNG PHÒNG KHÁM:\n   ├── 🩺 内科 (Nội khoa): Cảm sốt, đau bụng, tim mạch, huyết áp\n   ├── 🩹 外科 (Ngoại khoa): Gãy xương, chấn thương, vết rách chảy máu\n   ├── 👁️ 眼科 (Khoa mắt)\n   ├── 🦷 歯科 (Khoa răng nha khoa)\n   └── 👂 耳鼻科 (Tai mũi họng)",
        "diagram_caption": "Tại Nhật có các phòng khám tư nhân (クリニック) phân theo từng chuyên khoa ở khắp các ga",
        "mnemonic": "NỘI (内 - bên trong cơ thể) vs NGOẠI (外 - vết thương ngoài da hoặc phẫu thuật).",
        "collocations": [
          {
            "ja": "内科のクリニック",
            "furigana": "ないかのクリニック",
            "vn": "Phòng khám chuyên khoa nội"
          },
          {
            "ja": "外科手術",
            "furigana": "げかしゅじゅつ",
            "vn": "Phẫu thuật ngoại khoa"
          }
        ],
        "example": {
          "sentence": "熱[ねつ]が高[たか]く腹痛[ふくつう]もあるので、駅前[えきまえ]の内科[ないか]を受診[じゅしん]した。",
          "translation": "Vì sốt cao và đau bụng nên tôi đã đến khám ở khoa nội trước nhà ga."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "問診票",
        "furigana": "もんしんひょう",
        "romaji": "monshinhyou",
        "han_viet": "VẤN CHẨN PHIẾU",
        "meaning_vn": "Phiếu khảo sát tiền sử bệnh (điền khi vừa tới viện)",
        "word_type": "Danh từ",
        "tag": "Thủ tục khám bệnh",
        "visual_diagram": "   📋 問診票 (Phiếu bệnh sử):\n   ├── ❓ Bị đau từ lúc nào? (いつから?)\n   ├── ❓ Mức độ đau thế nào? (ズキズキ, チクチク, ガンガン)\n   ├── ⚠️ Có bị dị ứng thuốc nào không? (アレルギーの有無)\n   └── 🤰 Có đang mang thai hoặc uống thuốc gì khác không?",
        "diagram_caption": "Điền trung thực để bác sĩ chẩn đoán chính xác và tránh kê thuốc gây dị ứng sốc phản vệ",
        "mnemonic": "VẤN (問 - hỏi han) + CHẨN (診 - chẩn đoán) + PHIẾU (票 - tờ phiếu). Phiếu trả lời câu hỏi khảo sát y tế.",
        "collocations": [
          {
            "ja": "問診票に記入する",
            "furigana": "もんしんひょうにきにゅうする",
            "vn": "Điền vào phiếu khảo sát bệnh sử"
          },
          {
            "ja": "問診票を提出する",
            "furigana": "もんしんひょうをていしゅつする",
            "vn": "Nộp phiếu lại cho quầy tiếp tân"
          }
        ],
        "example": {
          "sentence": "受付[うけつけ]で渡[わた]された問診票[もんしんひょう]に、今[いま]の症状[しょうじょう]を詳[くわ]しく書[か]いた。",
          "translation": "Tôi đã viết chi tiết các triệu chứng hiện tại vào phiếu bệnh sử được phát tại quầy tiếp tân."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "安静",
        "furigana": "あんせい",
        "romaji": "ansei",
        "han_viet": "AN TĨNH",
        "meaning_vn": "Nghỉ ngơi yên tĩnh, tĩnh dưỡng phục hồi",
        "word_type": "Danh từ / Tính từ đuôi な",
        "tag": "Hồi phục sức khỏe",
        "visual_diagram": "   🛌 安静 (Tĩnh dưỡng đúng cách):\n   ├── 🛏️ Nằm nghỉ trên giường, không làm việc nặng\n   ├── 📱 Tắt điện thoại, hạn chế nhìn màn hình\n   └── 🍵 Uống đủ nước ấm và ngủ đủ giấc\n   ==▶ 「お大事にどうぞ、安静にしてください」(Bác sĩ dặn dò)",
        "diagram_caption": "Lời dặn quen thuộc nhất của bác sĩ Nhật: 'Hãy về nhà nghỉ ngơi tĩnh dưỡng' (安静にしてください)",
        "mnemonic": "AN (安 - bình an, an lành) + TĨNH (静 - yên tĩnh, không xáo động). Giữ yên tĩnh để mau lành bệnh.",
        "collocations": [
          {
            "ja": "絶対安静",
            "furigana": "ぜったいあんせい",
            "vn": "Tuyệt đối phải nằm bất động nghỉ ngơi"
          },
          {
            "ja": "安静を保つ",
            "furigana": "あんせいをたもつ",
            "vn": "Duy trì trạng thái nghỉ ngơi tĩnh dưỡng"
          }
        ],
        "example": {
          "sentence": "高熱[こうねつ]が出[で]ている間[あいだ]は無理[むり]に出勤[しゅっきん]せず、家[いえ]で安静[あんせい]にしている。",
          "translation": "Trong khi đang sốt cao thì đừng cố đi làm mà hãy ở nhà nghỉ ngơi tĩnh dưỡng."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "アレルギー",
        "furigana": "アレルギー",
        "romaji": "arerugii",
        "han_viet": "DỊ ỨNG",
        "meaning_vn": "Dị ứng (phấn hoa, hải sản, lông chó mèo, thuốc)",
        "word_type": "Danh từ",
        "tag": "Y tế dự phòng",
        "visual_diagram": "   🤧 CÁC DẠNG DỊ ỨNG PHỔ BIẾN TẠI NHẬT:\n   ├── 🌲 花粉症 (Dị ứng phấn hoa tuyết tùng vào mùa xuân: Hắt hơi, đỏ mắt)\n   ├── 🦐 食物アレルギー (Dị ứng thực phẩm: Tôm cua, đậu phộng, trứng)\n   └── 💊 薬物アレルギー (Dị ứng thuốc kháng sinh)",
        "diagram_caption": "Bắt nguồn từ tiếng Đức 'Allergie'. Trên menu nhà hàng Nhật luôn ghi chú các chất gây dị ứng",
        "mnemonic": "Từ mượn tiếng Đức Allergie. Nhớ biểu tượng cây tùng mùa xuân của Nhật Bản.",
        "collocations": [
          {
            "ja": "アレルギー反応",
            "furigana": "アレルギーはんのう",
            "vn": "Phản ứng dị ứng"
          },
          {
            "ja": "花粉症",
            "furigana": "かふんしょう",
            "vn": "Bệnh dị ứng phấn hoa (đặc sản mùa xuân Nhật)"
          }
        ],
        "example": {
          "sentence": "エビやカニに対[たい]するアレルギーがあるので、外食[がいしょく]の時[とき]は注意[ちゅうい]している。",
          "translation": "Vì bị dị ứng với tôm cua nên khi đi ăn ngoài tôi luôn hết sức cẩn thận."
        }
      }
    ]
  },
  {
    "topic_id": "topic_08_mua_sam_giao_hang",
    "title": "Chủ đề 08: Mua sắm & Đặt hàng online & Giao hàng",
    "japanese_title": "買い物・ネット通販・宅配便の語彙",
    "description": "Từ vựng mua hàng thương mại điện tử, dịch vụ chuyển phát nhanh Yamato/Sagawa và xử lý giấy báo vắng nhà.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "通販",
        "furigana": "つうはん",
        "romaji": "tsuuhan",
        "han_viet": "THÔNG PHIẾN",
        "meaning_vn": "Mua sắm từ xa / Bán hàng qua mạng (viết tắt của 通信販売)",
        "word_type": "Danh từ",
        "tag": "Thương mại điện tử",
        "visual_diagram": "   🛒 通信販売 (つうしんはんばい) ──▶ Viết tắt: 通販 (つうはん)\n   ├── 📱 Đặt hàng trên app (Amazon, Rakuten, Yahoo Shopping)\n   ├── 💳 Thanh toán thẻ / chuyển khoản / trả sau combini\n   └── 📦 Hàng giao tận cửa nhà bằng xe tải chuyển phát",
        "diagram_caption": "Phương thức mua sắm chiếm ưu thế tuyệt đối trong đời sống hiện đại tại Nhật Bản",
        "mnemonic": "THÔNG (通 - giao thông, thông thương) + PHIẾN (販 - buôn bán). Buôn bán kết nối từ xa.",
        "collocations": [
          {
            "ja": "通販サイト",
            "furigana": "つうはんサイト",
            "vn": "Trang web mua sắm trực tuyến"
          },
          {
            "ja": "ネット通販を利用する",
            "furigana": "ネットつうはんをりようする",
            "vn": "Sử dụng dịch vụ mua hàng online"
          }
        ],
        "example": {
          "sentence": "最近[さいきん]は重[おも]い日用品[にちようひん]もお米[こめ]もすべて通販[つうはん]で買[か]っている。",
          "translation": "Dạo gần đây ngay cả đồ dùng hàng ngày nặng nề hay gạo tôi cũng đều mua qua mạng."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "宅配便",
        "furigana": "たくはいびん",
        "romaji": "takuhaibin",
        "han_viet": "TRẠCH PHỐI TIỆN",
        "meaning_vn": "Dịch vụ chuyển phát nhanh tận nhà (Yamato, Sagawa, Bưu điện)",
        "word_type": "Danh từ",
        "tag": "Vận chuyển",
        "visual_diagram": "   🚚 CÁC HÃNG CHUYỂN PHÁT LỚN TẠI NHẬT:\n   ├── 🐱 ヤマト運輸 (Yamato Kuroneko - Logo mèo đen ngậm mèo con)\n   ├── 🏃 佐川急便 (Sagawa Express - Chuyên hàng nặng/công ty)\n   └── 📮 日本郵便 (Bưu điện Nhật Bản - Yu-Pack)\n   ==▶ Giao đúng đến từng khung giờ hẹn (時間帯指定)",
        "diagram_caption": "Dịch vụ chuyển phát ở Nhật cực kỳ chuyên nghiệp và chính xác đến từng phút",
        "mnemonic": "TRẠCH (宅 - nhà ở cá nhân) + PHỐI (配 - phân phối, giao tận nơi) + TIỆN (便 - chuyến xe). Chuyến xe giao đồ đến tận nhà.",
        "collocations": [
          {
            "ja": "宅配便で荷物を送る",
            "furigana": "たくはいびんでにもつをおくる",
            "vn": "Gửi đồ qua dịch vụ chuyển phát nhanh"
          },
          {
            "ja": "宅配ボックス",
            "furigana": "たくはいボックス",
            "vn": "Tủ nhận hàng tự động trước sảnh chung cư"
          }
        ],
        "example": {
          "sentence": "実家[じっか]から野菜[やさい]が詰[つ]まったダンボールが宅配便[たくはいびん]で届[とど]いた。",
          "translation": "Thùng carton đầy ắp rau củ từ quê nhà đã được gửi chuyển phát nhanh tới nơi."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "不在票",
        "furigana": "ふざいひょう",
        "romaji": "fuzaihyou",
        "han_viet": "BẤT TẠI PHIẾU",
        "meaning_vn": "Giấy báo vắng nhà (shipper để lại hòm thư khi bạn vắng)",
        "word_type": "Danh từ",
        "tag": "Giao nhận hàng",
        "visual_diagram": "   🚪 Shipper bấm chuông: ピンポーン ── (Không ai mở cửa)\n        │\n        └── 📬 Shipper nhét vào hòm thư: 🎫 不在票 (Giấy báo vắng nhà)\n            ├── Ghi mã bưu phẩm (伝票番号)\n            └── Có mã QR quét yêu cầu giao lại (再配達)",
        "diagram_caption": "Đừng vội lo lắng khi thấy tờ giấy này trong hòm thư, chỉ cần quét mã QR hẹn giờ giao lại",
        "mnemonic": "BẤT (不 - không) + TẠI (在 - có mặt tại nhà) + PHIẾU (票 - tờ giấy). Tờ phiếu báo người nhận không có nhà.",
        "collocations": [
          {
            "ja": "不在票が入っている",
            "furigana": "ふざいひょうがはいっている",
            "vn": "Có giấy báo vắng nhà trong hòm thư"
          },
          {
            "ja": "不在連絡票",
            "furigana": "ふざいれんらくひょう",
            "vn": "Tên gọi đầy đủ: Giấy liên lạc khi vắng nhà"
          }
        ],
        "example": {
          "sentence": "ポストに宅配便[たくはいびん]の不在票[ふざいひょう]が入[はい]っていたので、スマホで再配達[さいはいたつ]を頼[たの]んだ。",
          "translation": "Trong hòm thư có giấy báo vắng nhà nên tôi đã dùng điện thoại đặt lịch giao lại."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "再配達",
        "furigana": "さいはいたつ",
        "romaji": "saihaitatsu",
        "han_viet": "TÁI PHỐI ĐẠT",
        "meaning_vn": "Giao lại hàng theo giờ hẹn",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Giao nhận hàng",
        "visual_diagram": "   📲 ĐẶT LỊCH GIAO LẠI (再配達の手順):\n   1. Quét mã QR trên giấy 不在票\n   2. Chọn khung giờ rảnh ở nhà:\n      ├── 🌅 Sáng: 8h - 12h\n      ├── 🌇 Chiều: 14h - 16h / 16h - 18h\n      └── 🌙 Tối: 19h - 21h (Phù hợp sau giờ làm việc)\n   3. 📦 Shipper mang hàng đến đúng giờ hẹn",
        "diagram_caption": "Dịch vụ giao lại hoàn toàn miễn phí tại Nhật Bản",
        "mnemonic": "TÁI (再 - lại lần nữa) + PHỐI ĐẠT (配達 - giao phát hàng). Giao hàng lại lần hai.",
        "collocations": [
          {
            "ja": "再配達を依頼する",
            "furigana": "さいはいたつをいらいする",
            "vn": "Yêu cầu shipper giao lại hàng"
          },
          {
            "ja": "再配達の希望日時",
            "furigana": "さいはいたつのきぼうにちじ",
            "vn": "Ngày giờ mong muốn được giao lại"
          }
        ],
        "example": {
          "sentence": "今夜[こんや]は家[いえ]にいるので、十九時[じゅうくじ]以降[いこう]に再配達[さいはいたつ]してもらうよう指定[してい]した。",
          "translation": "Tối nay tôi có ở nhà nên đã chỉ định giao lại vào khung giờ sau 19h."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "領収書",
        "furigana": "りょうしゅうしょ",
        "romaji": "ryoushuusho",
        "han_viet": "LÃNH THU THƯ",
        "meaning_vn": "Biên lai thu tiền / Hóa đơn thanh toán (dùng thanh toán công ty)",
        "word_type": "Danh từ",
        "tag": "Thanh toán",
        "visual_diagram": "   🧾 PHÂN BIỆT 2 LOẠI HÓA ĐƠN:\n   ├── 🧾 レシート (Hóa đơn mua lẻ siêu thị, in nhiệt bình thường)\n   └── 📜 領収書 (Biên lai chính thức có ghi tên công ty宛名, dùng để công ty thanh toán lại tiền chi phí)",
        "diagram_caption": "Khi đi tiếp khách hoặc mua sắm công vụ, nhân viên luôn nói: 'Xin cho tôi hóa đơn đỏ' (領収書をください)",
        "mnemonic": "LÃNH (領 - nhận lấy) + THU (収 - thu tiền) + THƯ (書 - giấy tờ). Giấy chứng nhận đã nhận tiền.",
        "collocations": [
          {
            "ja": "領収書を発行する",
            "furigana": "りょうしゅうしょをはっこうする",
            "vn": "Xuất biên lai thanh toán"
          },
          {
            "ja": "領収書の宛名",
            "furigana": "りょうしゅうしょのあてな",
            "vn": "Tên người/tên công ty đứng tên trên hóa đơn"
          }
        ],
        "example": {
          "sentence": "会社[かいしゃ]の経費[けいひ]で落[お]とすため、店員[てんいん]に領収書[りょうしゅうしょ]を求[もと]めた。",
          "translation": "Để tính vào chi phí công ty, tôi đã yêu cầu nhân viên xuất hóa đơn biên lai."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "返品・交換",
        "furigana": "へんぴん・こうかん",
        "romaji": "hempin / koukan",
        "han_viet": "PHẢN PHẨM / GIAO HOÁN",
        "meaning_vn": "Trả lại hàng lấy lại tiền / Đổi lấy món khác cùng loại",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Chính sách mua hàng",
        "visual_diagram": "   📦 HÀNG HÓA CÓ VẤN ĐỀ (Bị rách, sai size):\n   ├── ↩️ 返品 (Phản phẩm - Trả đồ lại cho cửa hàng và nhận lại tiền)\n   └── 🔄 交換 (Giao hoán - Đổi lấy một sản phẩm mới tinh khác)",
        "diagram_caption": "Tại Nhật, muốn đổi trả đồ bắt buộc phải còn nguyên tem mác (タグ) và hóa đơn (レシート)",
        "mnemonic": "PHẢN (返 - trả lại) + PHẨM (品 - món đồ). GIAO (交 - giao lưu) + HOÁN (換 - thay đổi).",
        "collocations": [
          {
            "ja": "返品を受け付ける",
            "furigana": "へんぴんをうけつける",
            "vn": "Chấp nhận cho trả lại hàng"
          },
          {
            "ja": "初期不良による交換",
            "furigana": "しょきふりょうによるこうかん",
            "vn": "Đổi sản phẩm do lỗi từ nhà sản xuất"
          }
        ],
        "example": {
          "sentence": "服[ふく]のサイズが合[あ]わなかったので、レシートを持[も]って店[みせ]で交換[こうかん]してもらった。",
          "translation": "Vì kích cỡ quần áo không vừa nên tôi đã cầm theo hóa đơn đến cửa hàng xin đổi sản phẩm."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "送料無料",
        "furigana": "そうりょうむりょう",
        "romaji": "souryou muryou",
        "han_viet": "TỐNG LIỆU VÔ LIỆU",
        "meaning_vn": "Miễn phí vận chuyển (Freeship)",
        "word_type": "Cụm từ",
        "tag": "Khuyến mãi",
        "visual_diagram": "   🚚 送料 (Cước vận chuyển: Thường 500円 - 1000円/lần)\n       │\n       └── 🎉 送料無料: Mua đơn hàng trên 3,000円 ──▶ Phí ship = 0円!",
        "diagram_caption": "Chiêu kích cầu mua sắm kinh điển của các trang thương mại điện tử",
        "mnemonic": "TỐNG LIỆU (送料 - cước phí gửi đi) + VÔ LIỆU (無料 - không mất tiền).",
        "collocations": [
          {
            "ja": "送料無料キャンペーン",
            "furigana": "そうりょうむりょうキャンペーン",
            "vn": "Chương trình khuyến mãi miễn phí ship"
          },
          {
            "ja": "全国一律送料無料",
            "furigana": "ぜんこくいちりつそうりょうむりょう",
            "vn": "Miễn phí ship đồng giá toàn quốc"
          }
        ],
        "example": {
          "sentence": "三千円[さんぜんえん]以上[いじょう]買[か]い物[もの]をすると、送料[そうりょう]無料[むりょう]になる。",
          "translation": "Nếu mua sắm đơn hàng từ 3,000 yên trở lên sẽ được miễn phí vận chuyển."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "決済",
        "furigana": "けっさい",
        "romaji": "kessai",
        "han_viet": "QUYẾT TẾ",
        "meaning_vn": "Thanh toán giao dịch tài chính",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Thanh toán số",
        "visual_diagram": "   💳 CÁC HÌNH THỨC THANH TOÁN (決済方法):\n   ├── 💳 クレジットカード決済 (Thanh toán qua thẻ tín dụng Visa/JCB)\n   ├── 📱 キャッシュレス決済 (Thanh toán không tiền mặt: PayPay, Suica)\n   ├── 🏪 コンビニ決済 (Thanh toán tại quầy cửa hàng tiện lợi)\n   └── 💵 代金引換 (COD - Giao hàng trả tiền mặt cho shipper)",
        "diagram_caption": "Thị trường thanh toán không tiền mặt (Cashless) đang bùng nổ mạnh mẽ tại Nhật",
        "mnemonic": "QUYẾT (決 - quyết định) + TẾ (済 - hoàn tất xong xuôi). Hoàn tất thanh toán dứt điểm giao dịch.",
        "collocations": [
          {
            "ja": "クレジットカードで決済する",
            "furigana": "クレジットカードでけっさいする",
            "vn": "Thanh toán bằng thẻ tín dụng"
          },
          {
            "ja": "キャッシュレス決済",
            "furigana": "キャッシュレスけっさい",
            "vn": "Thanh toán không dùng tiền mặt"
          }
        ],
        "example": {
          "sentence": "スマホアプリを使[つか]えば、指先[ゆびさき]一[ひと]つで簡単[かんたん]に決済[けっさい]が完了[かんりょう]する。",
          "translation": "Chỉ cần dùng ứng dụng điện thoại là có thể hoàn tất thanh toán dễ dàng trong tích tắc."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "配送状況",
        "furigana": "はいそうじょうきょう",
        "romaji": "haisou joukyou",
        "han_viet": "PHỐI TỐNG TRẠNG HUỐNG",
        "meaning_vn": "Tình trạng vận chuyển đơn hàng (tracking)",
        "word_type": "Danh từ",
        "tag": "Theo dõi đơn hàng",
        "visual_diagram": "   📦 THEO DÕI HÀNH TRÌNH ĐƠN HÀNG:\n   [Xuất kho 🏭] ──▶ [Đang vận chuyển 🚚] ──▶ [Đang đi giao 🏃‍♂️] ──▶ [Đã nhận hàng 🏠]",
        "diagram_caption": "Nhập mã vận đơn (お問合せ番号) lên web để xem kiện hàng đang nằm ở bưu cục nào",
        "mnemonic": "PHỐI TỐNG (配送 - vận chuyển phân phát) + TRẠNG HUỐNG (状況 - tình hình, trạng thái).",
        "collocations": [
          {
            "ja": "配送状況を確認する",
            "furigana": "はいそうじょうきょうをかくにんする",
            "vn": "Kiểm tra tiến độ đơn hàng"
          },
          {
            "ja": "配送中",
            "furigana": "はいそうちゅう",
            "vn": "Hàng đang trên đường vận chuyển"
          }
        ],
        "example": {
          "sentence": "ネットで配送[はいそう]状況[じょうきょう]を追跡[ついせき]したら、今日[きょう]の午後[ごご]届[とど]く予定[よてい]だった。",
          "translation": "Kiểm tra theo dõi tình trạng vận chuyển trên mạng, đơn hàng dự kiến sẽ đến vào chiều nay."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "品切れ",
        "furigana": "しなぎれ",
        "romaji": "shinagire",
        "han_viet": "PHẨM THIẾT",
        "meaning_vn": "Hết hàng, cháy hàng tạm thời",
        "word_type": "Danh từ",
        "tag": "Trạng thái kho",
        "visual_diagram": "   🏷️ TRẠNG THÁI MUA HÀNG TRÊN MẠNG:\n   ├── ⭕ 在庫あり (ざいこあり - Còn hàng trong kho)\n   ├── ⚠️ 残りわずか (Chỉ còn lại vài cái cuối cùng)\n   └── ❌ 品切れ中 / 完売 (Hết hàng tạm thời / Bán sạch bách)",
        "diagram_caption": "Khi hết hàng, bạn có thể đăng ký nhận thông báo khi có hàng lại (再入荷通知)",
        "mnemonic": "PHẨM (品 - hàng phẩm) + THIẾT (切 - đứt đoạn, hết sạch). Hàng hóa đã đứt đoạn hết sạch trong kho.",
        "collocations": [
          {
            "ja": "大人気で品切れになる",
            "furigana": "だいにんきでしなぎれになる",
            "vn": "Vì quá hot nên cháy hàng"
          },
          {
            "ja": "品切れのお詫び",
            "furigana": "しなぎれのおわび",
            "vn": "Thư xin lỗi vì hết hàng"
          }
        ],
        "example": {
          "sentence": "買[か]おうと思[おも]っていた限定[げんてい]スニーカーは、残念[ざんねん]ながら品切[しなぎ]れだった。",
          "translation": "Đôi giày sneaker bản giới hạn tôi định mua rất tiếc là đã hết hàng."
        }
      }
    ]
  },
  {
    "topic_id": "topic_09_hoc_tap_deadline",
    "title": "Chủ đề 09: Học tập & Thi cử & Deadline báo cáo",
    "japanese_title": "学校・授業・レポート・締め切りの語彙",
    "description": "Cuộc sống giảng đường đại học/trường tiếng Nhật: bài tập, tín chỉ, chạy deadline và phương pháp ôn thi hiệu quả.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "課題",
        "furigana": "かだい",
        "romaji": "kadai",
        "han_viet": "KHÓA ĐỀ",
        "meaning_vn": "Bài tập về nhà, đề tài nghiên cứu được giao",
        "word_type": "Danh từ",
        "tag": "Học tập",
        "visual_diagram": "   👨‍🏫 Giảng viên giao ──▶ 📚 課題 (Khóa đề / Bài tập lớn)\n                              ├── Làm bài tập ngữ pháp, bài đọc\n                              ├── Viết báo cáo nghiên cứu (レポート)\n                              └── Thuyết trình nhóm (プレゼン)",
        "diagram_caption": "Tại các trường Nhật, hoàn thành đầy đủ 課題 quyết định 40-50% điểm tổng kết môn",
        "mnemonic": "KHÓA (課 - bài khóa, nhiệm vụ) + ĐỀ (題 - chủ đề câu hỏi). Nhiệm vụ học tập được giao phó.",
        "collocations": [
          {
            "ja": "課題に取り組む",
            "furigana": "かだいにとりくむ",
            "vn": "Bắt tay vào thực hiện bài tập"
          },
          {
            "ja": "山のような課題",
            "furigana": "やまのようなかだい",
            "vn": "Bài tập nhiều chất đống như núi"
          }
        ],
        "example": {
          "sentence": "週末[しゅうまつ]は先生[せんせい]から出[だ]された大量[たいりょう]の課題[かだい]を片付[かたづ]けた。",
          "translation": "Cuối tuần tôi đã giải quyết xong lượng bài tập khổng lồ mà thầy giáo giao."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "提出",
        "furigana": "ていしゅつ",
        "romaji": "teishutsu",
        "han_viet": "ĐỀ XUẤT",
        "meaning_vn": "Nộp bài, trình nộp giấy tờ hồ sơ",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Học vụ",
        "visual_diagram": "   👨‍🎓 Sinh viên làm xong bài ──(提出 - Nộp bài)──▶ 👨‍🏫 Giáo viên chấm điểm\n   ├── Nộp trực tiếp trên lớp (窓口・教室)\n   └── Nộp online qua hệ thống trường (オンライン提出)",
        "diagram_caption": "Nộp bài đúng giờ là đức tính được rèn luyện khắt khe từ bậc tiểu học ở Nhật",
        "mnemonic": "ĐỀ (提 - giơ lên, đưa ra) + XUẤT (出 - đưa ra ngoài). Đưa bài tập nộp ra cho thầy cô.",
        "collocations": [
          {
            "ja": "期限までに提出する",
            "furigana": "きげんまでにていしゅつする",
            "vn": "Nộp bài trước thời hạn quy định"
          },
          {
            "ja": "提出物",
            "furigana": "ていしゅつぶつ",
            "vn": "Vật/bài cần phải nộp"
          }
        ],
        "example": {
          "sentence": "レポートの提出[ていしゅつ]期限[きげん]は、金曜日[きんようび]の夕方[ゆうがた]五時[ごじ]までだ。",
          "translation": "Hạn nộp báo cáo là trước 5 giờ chiều ngày thứ Sáu."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "締め切り",
        "furigana": "しめきり",
        "romaji": "shimekiri",
        "han_viet": "ĐẾ THIẾT",
        "meaning_vn": "Hạn chót, ngày giờ cuối cùng được phép nộp (Deadline)",
        "word_type": "Danh từ",
        "tag": "Thời hạn",
        "visual_diagram": "   ⏰ 締め切り: 23:59:59\n   ├── 23:59:58 ──⭕ Nộp kịp ──▶ Được chấm điểm bình thường\n   └── 00:00:01 ──❌ Quá hạn (遅れ) ──▶ Nhận 0 điểm, hệ thống khóa nộp",
        "diagram_caption": "Một giây trôi qua sau hạn chót cũng bị coi là quá hạn và không được chấp nhận",
        "mnemonic": "ĐẾ (締 - siết chặt, thắt nút) + THIẾT (切 - cắt đứt). Siết chặt cánh cửa cắt đứt quyền nộp.",
        "collocations": [
          {
            "ja": "締め切りに追われる",
            "furigana": "しめきりにおわれる",
            "vn": "Bị deadline đuổi sát nút (rất căng thẳng)"
          },
          {
            "ja": "締め切りを守る",
            "furigana": "しめきりをまもる",
            "vn": "Tuân thủ đúng hạn chót"
          }
        ],
        "example": {
          "sentence": "締め切り[しめきり]直前[ちょくぜん]になって慌[あわ]てないよう、計画的[けいかくてき]に進[すす]める。",
          "translation": "Hãy tiến hành có kế hoạch để không bị cuống cuồng vào sát giờ hạn chót."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "延期",
        "furigana": "えんき",
        "romaji": "enki",
        "han_viet": "DUYÊN KỲ",
        "meaning_vn": "Hoãn lại, dời ngày hẹn sang một dịp khác",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Điều chỉnh thời gian",
        "visual_diagram": "   📅 Ngày hẹn cũ: Thứ Tư (10/10) ──(Có bão lớn 🌀)──▶ Dời sang: Tuần sau (17/10)\n   ==▶ Hành động dời ngày này gọi là 延期 (えんき)",
        "diagram_caption": "Khác với 中止 (hủy hẳn bỏ cuộc), 延期 là hoãn lại để làm vào một ngày khác",
        "mnemonic": "DUYÊN (延 - kéo dài ra) + KỲ (期 - kỳ hạn). Kéo dài kỳ hạn dời về phía sau.",
        "collocations": [
          {
            "ja": "試験の日程を延期する",
            "furigana": "しけんのにっていをえんきする",
            "vn": "Dời ngày thi sang hôm khác"
          },
          {
            "ja": "雨天延期",
            "furigana": "うてんえんき",
            "vn": "Trời mưa nên hoãn lại"
          }
        ],
        "example": {
          "sentence": "台風[たいふう]の接近[せっきん]により、明日[あす]の期末[きまつ]試験[しけん]は来週[らいしゅう]に延期[えんき]された。",
          "translation": "Do bão áp sát, kỳ thi cuối kỳ ngày mai đã được hoãn lại sang tuần sau."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "単位",
        "furigana": "たんい",
        "romaji": "tani",
        "han_viet": "ĐƠN VỊ",
        "meaning_vn": "Tín chỉ học phần đại học / Đơn vị đo lường",
        "word_type": "Danh từ",
        "tag": "Học phần",
        "visual_diagram": "   🎓 ĐỦ ĐIỀU KIỆN TỐT NGHIỆP:\n   ├── Cần tích lũy: 124 単位 (Tín chỉ)\n   ├── ⭕ 単位を取る / 修得する (Qua môn, đỗ tín chỉ)\n   └── ❌ 単位を落とす (Rớt môn, trượt tín chỉ - Nỗi ác mộng sinh viên)",
        "diagram_caption": "Sinh viên nghỉ học quá 1/3 số buổi sẽ bị đánh trượt tín chỉ không được thi",
        "mnemonic": "ĐƠN VỊ (単位) là đơn vị cân đo, trong trường học là đơn vị tích lũy môn học.",
        "collocations": [
          {
            "ja": "単位を落とす",
            "furigana": "たんいをおとす",
            "vn": "Trượt môn / rớt tín chỉ"
          },
          {
            "ja": "必要な単位数を満たす",
            "furigana": "ひつようなたんいすうをみたす",
            "vn": "Tích lũy đủ số tín chỉ quy định"
          }
        ],
        "example": {
          "sentence": "毎日[まいにち]真面目[まじめ]に出席[しゅっせき]したおかげで、全[すべ]ての単位[たんい]を取得[しゅとく]できた。",
          "translation": "Nhờ ngày nào cũng đi học chăm chỉ, tôi đã đạt được toàn bộ số tín chỉ."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "履修",
        "furigana": "りしゅう",
        "romaji": "rishuu",
        "han_viet": "LÝ TU",
        "meaning_vn": "Đăng ký học môn học, theo học môn",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Đăng ký môn",
        "visual_diagram": "   💻 ĐẦU KỲ HỌC MỚI:\n   ├── Xem sổ tay môn học (シラバス - Syllabus)\n   ├── Chọn môn phù hợp chuyên ngành & thời gian biểu\n   └── Đăng ký trực tuyến ──▶ 履修登録 (Đăng ký tín chỉ)",
        "diagram_caption": "Việc lựa chọn môn học đầu kỳ quyết định trực tiếp đến lịch thi và thời gian đi làm thêm",
        "mnemonic": "LÝ (履 - trải qua theo đuổi) + TU (修 - rèn luyện tu học). Theo học một môn.",
        "collocations": [
          {
            "ja": "履修登録",
            "furigana": "りしゅうとうろく",
            "vn": "Đăng ký môn học đầu kỳ"
          },
          {
            "ja": "必修科目",
            "furigana": "ひっしゅうかもく",
            "vn": "Môn học bắt buộc phải học"
          }
        ],
        "example": {
          "sentence": "卒業[そつぎょう]要件[ようけん]を確認[かくにん]しながら、来学期[らいがっき]の履修[りしゅう]登録[とうろく]を行[おこな]う。",
          "translation": "Vừa đối chiếu các điều kiện tốt nghiệp, tôi vừa tiến hành đăng ký môn học cho kỳ tới."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "奨学金",
        "furigana": "しょうがくきん",
        "romaji": "shougakukin",
        "han_viet": "TƯỞNG HỌC KIM",
        "meaning_vn": "Học bổng hỗ trợ học tập",
        "word_type": "Danh từ",
        "tag": "Hỗ trợ tài chính",
        "visual_diagram": "   💰 PHÂN BIỆT 2 LOẠI HỌC BỔNG Ở NHẬT:\n   ├── 🎁 給付型 (きゅうふがた - Học bổng cho đứt: Không phải hoàn trả lại tiền!)\n   └── 🏦 貸与型 (たいよがた - Học bổng cho vay ưu đãi: Tốt nghiệp đi làm phải trả nợ dần)",
        "diagram_caption": "Sinh viên quốc tế tại Nhật có nhiều cơ hội xin học bổng JASSO hoặc các quỹ doanh nghiệp",
        "mnemonic": "TƯỞNG (奨 - khích lệ khen ngợi) + HỌC (学 - học tập) + KIM (金 - tiền). Tiền thưởng khích lệ tinh thần học tập.",
        "collocations": [
          {
            "ja": "奨学金に応募する",
            "furigana": "しょうがくきんにおうぼする",
            "vn": "Nộp đơn ứng tuyển học bổng"
          },
          {
            "ja": "奨学金をもらう / 受給する",
            "furigana": "しょうがくきんをもらう / じゅきゅうする",
            "vn": "Nhận tiền học bổng hàng tháng"
          }
        ],
        "example": {
          "sentence": "成績[せいせき]優秀[ゆうしゅう]者[しゃ]として認[みと]められ、毎月[まいつき]五万円[ごまんえん]の奨学金[しょうがくきん]を受給[じゅきゅう]している。",
          "translation": "Được công nhận là sinh viên có thành tích xuất sắc, tôi nhận học bổng 50,000 yên mỗi tháng."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "復習・予習",
        "furigana": "ふくしゅう・よしゅう",
        "romaji": "fukushuu / yoshuu",
        "han_viet": "PHỤC TẬP / DỰ TẬP",
        "meaning_vn": "Ôn lại bài cũ sau buổi học / Chuẩn bị bài mới trước buổi học",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Phương pháp học",
        "visual_diagram": "   ⏰ TRÌNH TỰ HỌC TẬP HIỆU QUẢ:\n   [🏠 Trước khi lên lớp] ──▶ 📖 予習 (Dự tập: Đọc trước bài, tra từ mới)\n            │\n   [🏫 Trong giờ học]    ──▶ 👨‍🏫 Nghe giảng, hỏi điều chưa hiểu\n            │\n   [🏠 Sau khi về nhà]   ──▶ ✍️ 復習 (Phục tập: Làm lại bài tập, ghi nhớ sâu)",
        "diagram_caption": "Hai bước quan trọng nhất để đạt điểm cao trong mọi kỳ thi tiếng Nhật",
        "mnemonic": "DỰ (予 - chuẩn bị sẵn từ trước) vs PHỤC (復 - lặp lại xem lại lần nữa).",
        "collocations": [
          {
            "ja": "予習と復習を怠らない",
            "furigana": "よしゅうとふくしゅうをおこたらない",
            "vn": "Không lơ là việc soạn bài và ôn bài"
          },
          {
            "ja": "授業の復習をする",
            "furigana": "じゅぎょうのふくしゅうをする",
            "vn": "Ôn lại bài học trên lớp"
          }
        ],
        "example": {
          "sentence": "授業[じゅぎょう]の内容[ないよう]をしっかり身[み]につけるには、その日[ひ]のうちの復習[ふくしゅう]が効果的[こうかてき]だ。",
          "translation": "Để nắm vững chắc nội dung bài học, ôn tập lại ngay trong ngày là cách hiệu quả nhất."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "徹夜",
        "furigana": "てつや",
        "romaji": "tetsuya",
        "han_viet": "TRIỆT DẠ",
        "meaning_vn": "Thức trắng cả đêm không ngủ (chạy deadline, ôn thi)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Sinh hoạt",
        "visual_diagram": "   🌙 22:00 ──▶ ☕ Uống cà phê / Bò húc tăng lực\n   ⏰ 03:00 ──▶ 💻 Mắt díp lại nhưng tay vẫn gõ phím\n   🌅 06:00 ──▶ 🥱 Trời sáng bảnh mắt, hoàn thành bài\n   ==▶ Trải qua một đêm thức trắng = 徹夜 (てつや)",
        "diagram_caption": "Thức đêm chạy bài dù hoàn thành được việc nhưng rất hại cho sức khỏe và trí nhớ",
        "mnemonic": "TRIỆT (徹 - thấu suốt từ đầu đến cuối) + DẠ (夜 - ban đêm). Thức xuyên suốt cả màn đêm.",
        "collocations": [
          {
            "ja": "徹夜で勉強する",
            "furigana": "てつやでべんきょうする",
            "vn": "Thức trắng đêm để học bài"
          },
          {
            "ja": "徹夜明け",
            "furigana": "てつやあけ",
            "vn": "Buổi sáng sau đêm thức trắng (rất phờ phạc)"
          }
        ],
        "example": {
          "sentence": "試験[しけん]の前日[ぜんじつ]に徹夜[てつや]をしたため、本番[ほんばん]で頭[あたま]が働[はたら]かなかった。",
          "translation": "Vì đã thức trắng đêm trước ngày thi nên vào phòng thi đầu óc tôi chẳng hoạt động nổi."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "集中",
        "furigana": "しゅうちゅう",
        "romaji": "shuuchuu",
        "han_viet": "TẬP TRUNG",
        "meaning_vn": "Dồn toàn bộ sự chú ý và tinh lực vào một việc",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Kỹ năng học tập",
        "visual_diagram": "   📱 Cất điện thoại vào ngăn kéo\n   🎧 Đeo tai nghe chống ồn\n   📖 Mắt chỉ nhìn vào trang sách\n   ==▶ 🧠 集中力 (Khả năng tập trung cao độ tạo ra hiệu suất gấp 3 lần)",
        "diagram_caption": "Bí quyết học 1 tiếng hiệu quả bằng 5 tiếng ngồi lướt mạng xã hội",
        "mnemonic": "TẬP (集 - thu gom lại) + TRUNG (中 - vào điểm chính giữa). Gom toàn bộ tinh thần vào một tâm điểm.",
        "collocations": [
          {
            "ja": "集中力を高める",
            "furigana": "しゅうちゅうりょくをたかめる",
            "vn": "Nâng cao năng lực tập trung"
          },
          {
            "ja": "勉強に集中する",
            "furigana": "べんきょうにしゅうちゅうする",
            "vn": "Dồn hết tâm trí vào việc học"
          }
        ],
        "example": {
          "sentence": "静[しず]かな図書館[としょかん]に行[い]くと、周[まわ]りの雑音[ざつおん]を気[き]にせず勉強[べんきょう]に集中[しゅうちゅう]できる。",
          "translation": "Khi đến thư viện yên tĩnh, tôi có thể dồn hết tâm trí học tập mà không bị tiếng ồn xung quanh làm phiền."
        }
      }
    ]
  },
  {
    "topic_id": "topic_10_clb_le_hoi_truong",
    "title": "Chủ đề 10: Câu lạc bộ & Lễ hội trường",
    "japanese_title": "サークル活動・学園祭・イベントの語彙",
    "description": "Đời sống thanh xuân đại học tại Nhật: câu lạc bộ sinh viên, chuẩn bị lễ hội trường và các bữa tiệc giao lưu.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "サークル",
        "furigana": "サークル",
        "romaji": "saakuru",
        "han_viet": "CÂU LẠC BỘ",
        "meaning_vn": "Câu lạc bộ sinh viên (thể thao, âm nhạc, văn hóa, giao lưu)",
        "word_type": "Danh từ",
        "tag": "Đời sống sinh viên",
        "visual_diagram": "   🏫 HOẠT ĐỘNG ĐOÀN THỂ Ở TRƯỜNG ĐẠI HỌC NHẬT:\n   ├── 🥋 部活動 (ぶかつ - Câu lạc bộ thể thao chuyên nghiệp, kỷ luật thép, thi đấu giải)\n   └── 🎸 サークル (Câu lạc bộ theo sở thích, không khí vui vẻ, giao lưu kết bạn)",
        "diagram_caption": "Bắt nguồn từ tiếng Anh 'Circle' (vòng tròn bạn bè). Nơi tốt nhất để kết bạn người Nhật",
        "mnemonic": "Từ mượn Circle (vòng tròn bè bạn kết nối với nhau).",
        "collocations": [
          {
            "ja": "サークルに入る / 加入する",
            "furigana": "サークルにはいる / かにゅうする",
            "vn": "Gia nhập câu lạc bộ"
          },
          {
            "ja": "サークルの合宿",
            "furigana": "サークルのがっしゅく",
            "vn": "Chuyến đi cắm trại tập huấn hè của CLB"
          }
        ],
        "example": {
          "sentence": "日本語[にほんご]の会話[かいわ]力[りょく]を上[あ]げるために、国際[こくさい]交流[こうりゅう]サークルに入[はい]った。",
          "translation": "Để nâng cao khả năng giao tiếp tiếng Nhật, tôi đã tham gia vào câu lạc bộ giao lưu quốc tế."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "学園祭",
        "furigana": "がくえんさい",
        "romaji": "gakuensai",
        "han_viet": "HỌC VIÊN TẾ",
        "meaning_vn": "Lễ hội trường thường niên (vào mùa thu tháng 10-11)",
        "word_type": "Danh từ",
        "tag": "Sự kiện văn hóa",
        "visual_diagram": "   🎪 学園祭 (Lễ hội trường Nhật Bản):\n   ├── 🍢 Hàng chục quầy đồ ăn ngoài trời (屋台)\n   ├── 🎤 Sân khấu biểu diễn ca nhạc, nhảy múa (ステージ発表)\n   └── 🎈 Mở cửa tự do đón phụ huynh và người dân bên ngoài vào vui chơi",
        "diagram_caption": "Sự kiện văn hóa sôi động và đáng nhớ nhất trong năm của sinh viên Nhật",
        "mnemonic": "HỌC VIÊN (学園 - khuôn viên trường học) + TẾ (祭 - lễ hội tưng bừng). Lễ hội lớn của toàn trường.",
        "collocations": [
          {
            "ja": "学園祭を開催する",
            "furigana": "がくえんさいをかいさいする",
            "vn": "Tổ chức lễ hội trường"
          },
          {
            "ja": "大学祭",
            "furigana": "だいがくさい",
            "vn": "Tên gọi khác: Lễ hội đại học"
          }
        ],
        "example": {
          "sentence": "秋[あき]の学園祭[がくえんさい]には、地域[ちいき]の住民[じゅうみん]や高校生[こうこうせい]も大勢[おおぜい]訪[おとず]れる。",
          "translation": "Vào lễ hội trường mùa thu, rất đông cư dân địa phương và học sinh cấp 3 cũng đến tham quan."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "屋台",
        "furigana": "やたい",
        "romaji": "yatai",
        "han_viet": "ỐC THAI",
        "meaning_vn": "Quầy hàng ăn, gian hàng lưu động bán đồ ăn ngoài trời",
        "word_type": "Danh từ",
        "tag": "Ẩm thực lễ hội",
        "visual_diagram": "   🎪 QUẦY HÀNG ĂN LỄ HỘI (屋台):\n   ├── 🐙 たこ焼き (Bánh bạch tuộc nướng)\n   ├── 🥢 焼きそば (Mì xào thơm lừng)\n   ├── 🍡 団子・チョコバナナ (Bánh dango, chuối phủ chocolate)\n   └── 🇻🇳 Gian hàng sinh viên Việt Nam: Nem rán, Phở bò",
        "diagram_caption": "Các câu lạc bộ tự phân công nấu nướng và bán hàng kiếm quỹ hoạt động",
        "mnemonic": "ỐC (屋 - quán xá) + THAI (台 - cái kệ, bục dựng). Quầy sạp dựng tạm ngoài trời để buôn bán.",
        "collocations": [
          {
            "ja": "屋台を出す / 出店する",
            "furigana": "やたいをだす / しゅってんする",
            "vn": "Mở quầy gian hàng bán đồ"
          },
          {
            "ja": "屋台で焼きそばを買う",
            "furigana": "やたいでやきそばをかう",
            "vn": "Mua mì xào ở quầy ăn ngoài trời"
          }
        ],
        "example": {
          "sentence": "留学生[りゅうがくせい]サークルで屋台[やたい]を出[だ]して、母国[ぼこく]の伝統[でんとう]料理[りょうり]を販売[はんばい]した。",
          "translation": "CLB du học sinh của chúng tôi đã mở một quầy hàng bán các món ăn truyền thống của quê hương."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "準備",
        "furigana": "じゅんび",
        "romaji": "jumbi",
        "han_viet": "CHUẨN BỊ",
        "meaning_vn": "Chuẩn bị, sắp đặt trước mọi việc chu tất",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Tổ chức sự kiện",
        "visual_diagram": "   🎯 準備 (Chuẩn bị kỹ lưỡng ── 80% thành công của sự kiện):\n   ├── 🎨 Vẽ áp phích quảng cáo (ポスター作り)\n   ├── 🛒 Đi siêu thị mua nguyên liệu làm món ăn\n   └── 🎪 Dựng lều bạt và kiểm tra bình gas an toàn",
        "diagram_caption": "Khâu chuẩn bị kéo dài hàng tuần trước lễ hội gắn kết tình bạn sâu sắc",
        "mnemonic": "CHUẨN (準 - tiêu chuẩn căn cứ) + BỊ (備 - sẵn sàng phòng bị). Chuẩn bị sẵn sàng theo đúng kế hoạch.",
        "collocations": [
          {
            "ja": "準備を進める",
            "furigana": "じゅんびをすすめる",
            "vn": "Đẩy mạnh tiến độ chuẩn bị"
          },
          {
            "ja": "準備万端",
            "furigana": "じゅんびばんたん",
            "vn": "Chuẩn bị chu đáo hoàn hảo mọi mặt"
          }
        ],
        "example": {
          "sentence": "学園祭[がくえんさい]の本番[ほんばん]に向けて、夜遅[よるおそ]くまで看板[かんばん]の準備[じゅんび]をした。",
          "translation": "Hướng tới ngày chính thức của lễ hội trường, chúng tôi đã chuẩn bị biển hiệu đến tận đêm muộn."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "歓迎会",
        "furigana": "かんげいかい",
        "romaji": "kangeikai",
        "han_viet": "HOAN NGHÊNH HỘI",
        "meaning_vn": "Buổi tiệc chào đón thành viên mới gia nhập",
        "word_type": "Danh từ",
        "tag": "Tiệc giao lưu",
        "visual_diagram": "   🎉 歓迎会 (Tiệc chào đón người mới vào tháng 4 đầu năm học)\n        vs\n   👋 送別会 (そうべつかい - Tiệc tiễn chia tay người rời đi vào tháng 3 cuối năm)",
        "diagram_caption": "Hai bữa tiệc giao lưu quan trọng nhất đánh dấu khởi đầu và kết thúc một chu kỳ",
        "mnemonic": "HOAN NGHÊNH (歓迎 - chào mừng nồng nhiệt) + HỘI (会 - buổi gặp mặt liên hoan).",
        "collocations": [
          {
            "ja": "新入生歓迎会",
            "furigana": "しんにゅうせいかんげいかい",
            "vn": "Tiệc chào đón tân sinh viên khóa mới"
          },
          {
            "ja": "歓迎会を開く",
            "furigana": "かんげいかいをひらく",
            "vn": "Mở tiệc chào đón"
          }
        ],
        "example": {
          "sentence": "サークルの新入生[しんにゅうせい]歓迎会[かんげいかい]で、たくさんの先輩[せんぱい]と話[はな]すことができた。",
          "translation": "Tại buổi tiệc chào đón tân sinh viên của CLB, tôi đã có thể trò chuyện với rất nhiều anh chị tiền bối."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "打ち上げ",
        "furigana": "うちあげ",
        "romaji": "uchiage",
        "han_viet": "ĐẢ THƯỢNG",
        "meaning_vn": "Tiệc liên hoan ăn mừng tổng kết sau khi xong sự kiện/dự án",
        "word_type": "Danh từ",
        "tag": "Tiệc tùng",
        "visual_diagram": "   🎪 Lễ hội kết thúc ──▶ 🧹 Thu dọn sạch sẽ rác rến\n        │\n        └── 🍻 打ち上げ (Tiệc tổng kết công sức):\n            ├── Cùng nhau nâng ly: 「かんぱーい！」(Cạn chén chúc mừng)\n            └── Khen ngợi nhau: 「お疲れ様でした！」(Ai cũng vất vả hết mình rồi)",
        "diagram_caption": "Bữa tiệc giải tỏa mọi căng thẳng mệt nhọc sau những ngày dốc sức",
        "mnemonic": "ĐẢ (打 - bắn lên) + THƯỢNG (上 - lên cao). Giống như bắn pháo hoa ăn mừng thành công trọn vẹn.",
        "collocations": [
          {
            "ja": "打ち上げをする",
            "furigana": "うちあげをする",
            "vn": "Tổ chức tiệc liên hoan ăn mừng"
          },
          {
            "ja": "打ち上げに参加する",
            "furigana": "うちあげにさんかする",
            "vn": "Tham gia tiệc ăn mừng tổng kết"
          }
        ],
        "example": {
          "sentence": "イベントが無事[ぶじ]に大成功[だいせいこう]で終[お]わったので、みんなで居酒屋[いざかや]で打ち上[うちあ]げをした。",
          "translation": "Vì sự kiện đã kết thúc đại thành công suôn sẻ nên mọi người cùng đi quán nhậu ăn mừng."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "役割",
        "furigana": "やくわり",
        "romaji": "yakuwari",
        "han_viet": "DỊCH CÁT",
        "meaning_vn": "Vai trò, trách nhiệm được phân công",
        "word_type": "Danh từ",
        "tag": "Phân công tổ chức",
        "visual_diagram": "   🤝 PHÂN CHIA TRÁCH NHIỆM TRONG NHÓM (役割分担):\n   ├── 👑 リーダー (Trưởng nhóm: Điều phối chung)\n   ├── 💰 会計 (Thủ quỹ: Quản lý tiền nong chi tiêu)\n   ├── 📢 広報 (Truyền thông: Đăng bài PR lên mạng xã hội)\n   └── 🍳 調理 (Hậu cần: Nấu nướng chế biến món ăn)",
        "diagram_caption": "Tính tập thể của người Nhật: Mỗi người làm tốt vai trò của mình thì cả nhóm mới thành công",
        "mnemonic": "DỊCH (役 - công việc đảm nhận) + CÁT (割 - chia phần). Chia phần công việc cho từng thành viên.",
        "collocations": [
          {
            "ja": "役割を果たす",
            "furigana": "やくわりをはたす",
            "vn": "Hoàn thành trọn vẹn vai trò được giao"
          },
          {
            "ja": "役割分担を決める",
            "furigana": "やくわりぶんたんをきめる",
            "vn": "Phân chia cụ thể nhiệm vụ của từng người"
          }
        ],
        "example": {
          "sentence": "チーム内[ない]でそれぞれ自分[じぶん]の役割[やくわり]をしっかり果[は]たした。",
          "translation": "Mỗi người trong đội đều đã hoàn thành trọn vẹn vai trò nhiệm vụ của bản thân."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "交流",
        "furigana": "こうりゅう",
        "romaji": "kouryuu",
        "han_viet": "GIAO LƯU",
        "meaning_vn": "Giao lưu, trò chuyện kết nối và hiểu biết lẫn nhau",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Mối quan hệ",
        "visual_diagram": "   🇯🇵 Người bản xứ ◀──🤝 Giao lưu kết nối ──▶ 🌐 Bạn bè quốc tế\n   ├── Trao đổi văn hóa, ẩm thực, ngôn ngữ\n   └── Xóa bỏ định kiến, thắt chặt tình hữu nghị",
        "diagram_caption": "Mục đích lớn nhất khi tham gia các hoạt động ngoại khóa tại Nhật",
        "mnemonic": "GIAO (交 - giao cắt gặp gỡ) + LƯU (流 - dòng chảy). Dòng chảy tình cảm và tư tưởng giao thoa hòa quyện.",
        "collocations": [
          {
            "ja": "異文化交流",
            "furigana": "いぶんかこうりゅう",
            "vn": "Giao lưu văn hóa đa quốc gia"
          },
          {
            "ja": "交流を深める",
            "furigana": "こうりゅうをふかめる",
            "vn": "Làm sâu sắc thêm mối quan hệ giao lưu"
          }
        ],
        "example": {
          "sentence": "学園祭[がくえんさい]は、他[ほか]の学部[がくぶ]の学生[がくせい]や地域[ちいき]の人々と交流[こうりゅう]する絶好[ぜっこう]の機会[きかい]だ。",
          "translation": "Lễ hội trường là cơ hội tuyệt hảo để giao lưu kết nối với sinh viên khoa khác và người dân địa phương."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "募集",
        "furigana": "ぼしゅう",
        "romaji": "boshuu",
        "han_viet": "MỘ TẬP",
        "meaning_vn": "Chiêu mộ, tuyển thành viên mới tham gia",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Tuyển thành viên",
        "visual_diagram": "   📢 新メンバー大募集 (TUYỂN THÀNH VIÊN MỚI!):\n   ├── 🌟 Không cần kinh nghiệm, người mới bắt đầu cũng OK!\n   ├── 📅 Thời gian hoạt động: Chiều thứ 4 hàng tuần\n   └── 💬 Hãy đến tham quan trải nghiệm thử (体験見学大歓迎)",
        "diagram_caption": "Vào tháng 4 hàng năm, sân trường đại học Nhật ngập tràn các tờ rơi tuyển mộ thành viên",
        "mnemonic": "MỘ (募 - kêu gọi chiêu mộ) + TẬP (集 - gom lại). Kêu gọi mọi người cùng tập hợp lại.",
        "collocations": [
          {
            "ja": "ボランティアを募集する",
            "furigana": "ボランティアをぼしゅうする",
            "vn": "Tuyển tình nguyện viên"
          },
          {
            "ja": "募集要項",
            "furigana": "ぼしゅうようこう",
            "vn": "Bản quy định điều kiện tuyển mộ"
          }
        ],
        "example": {
          "sentence": "ポスターを貼[は]って、学園祭[がくえんさい]の実行[じっこう]委員[いいん]スタッフを募集[ぼしゅう]した。",
          "translation": "Chúng tôi đã dán áp phích để chiêu mộ nhân viên cho ban tổ chức lễ hội trường."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "記念",
        "furigana": "きねん",
        "romaji": "kinen",
        "han_viet": "KỶ NIỆM",
        "meaning_vn": "Kỷ niệm, lưu giữ khoảnh khắc đáng nhớ",
        "word_type": "Danh từ / Mang tính bổ nghĩa",
        "tag": "Ký ức",
        "visual_diagram": "   📸 記念写真 (Ảnh kỷ niệm chụp chung toàn đội cuối ngày hội)\n        │\n        └── 💭 Nhìn lại sau này: Ký ức thanh xuân tươi đẹp thời sinh viên",
        "diagram_caption": "Kỷ niệm đẹp sau những ngày cùng nhau nỗ lực vượt qua khó khăn",
        "mnemonic": "KỶ (紀 - ghi chép kỷ cương) + NIỆM (念 - nghĩ ngợi tâm tưởng). Ghi khắc vào tâm trí để không quên.",
        "collocations": [
          {
            "ja": "記念写真を撮る",
            "furigana": "きねんしゃしんをとる",
            "vn": "Chụp bức ảnh kỷ niệm"
          },
          {
            "ja": "一生の記念になる",
            "furigana": "いっしょうのきねんになる",
            "vn": "Trở thành kỷ niệm suốt đời"
          }
        ],
        "example": {
          "sentence": "ステージ発表[はっぴょう]の最後[さいご]に、みんなで笑顔[えがお]で記念[きねん]撮影[さつえい]をした。",
          "translation": "Vào phần cuối của buổi biểu diễn sân khấu, mọi người đã cùng nhau nở nụ cười chụp bức ảnh kỷ niệm."
        }
      }
    ]
  },
  {
    "topic_id": "topic_11_du_lich_dat_phong",
    "title": "Chủ đề 11: Du lịch & Đặt phòng khách sạn",
    "japanese_title": "旅行・宿泊予約・観光の語彙",
    "description": "Từ vựng khám phá các danh lam thắng cảnh, văn hóa tắm onsen, đặt phòng ryokan và xử lý đổi lịch hủy chuyến.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "観光",
        "furigana": "かんこう",
        "romaji": "kankou",
        "han_viet": "QUAN QUANG",
        "meaning_vn": "Tham quan, du lịch ngắm cảnh",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Du lịch",
        "visual_diagram": "   🌸 観光地 (Địa điểm du lịch nổi tiếng tại Nhật):\n   ├── ⛩️ 京都 (Kyoto: Đền chùa cổ kính, phố geisha Gion)\n   ├── 🗻 富士山 (Núi Phú Sĩ: Biểu tượng thiên nhiên hùng vĩ)\n   └── 🗼 東京 (Tokyo: Tháp truyền hình, khu phố công nghệ hiện đại)",
        "diagram_caption": "Ngành du lịch là trụ cột kinh tế văn hóa lớn của đất nước mặt trời mọc",
        "mnemonic": "QUAN (観 - quan sát ngắm nhìn) + QUANG (光 - ánh sáng, cảnh sắc tươi đẹp). Ngắm nhìn cảnh sắc tươi đẹp của đất nước.",
        "collocations": [
          {
            "ja": "観光名所",
            "furigana": "かんこうめいしょ",
            "vn": "Danh lam thắng cảnh du lịch nổi tiếng"
          },
          {
            "ja": "観光客",
            "furigana": "かんこうきゃく",
            "vn": "Khách du lịch trong và ngoài nước"
          }
        ],
        "example": {
          "sentence": "連休[れんきゅう]を利用[りよう]して、古[ふる]い歴史[れきし]のある街[まち]を観光[かんこう]した。",
          "translation": "Tranh thủ kỳ nghỉ dài ngày, tôi đã đi tham quan thị trấn cổ kính có bề dày lịch sử."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "宿泊",
        "furigana": "しゅくはく",
        "romaji": "shukuhaku",
        "han_viet": "TÚC BẠC",
        "meaning_vn": "Trú trọ, nghỉ lại qua đêm tại khách sạn/nhà nghỉ",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Khách sạn",
        "visual_diagram": "   🏨 CÁC LOẠI HÌNH NGHỈ TRỌ TẠI NHẬT:\n   ├── 🏨 ホテル (Khách sạn hiện đại kiểu phương Tây)\n   ├── 🍵 旅館 (Ryokan - Nhà trọ truyền thống chiếu tatami, áo yukata)\n   └── 🛏️ ゲストハウス (Guesthouse / Homestay giá rẻ cho du khách bụi)",
        "diagram_caption": "Nghỉ trọ tại Ryokan truyền thống kèm bữa ăn Kaiseki là trải nghiệm không thể bỏ qua",
        "mnemonic": "TÚC (宿 - nhà trọ) + BẠC (泊 - đỗ bến thuyền, ngủ lại đêm). Ngủ lại qua đêm ở trọ.",
        "collocations": [
          {
            "ja": "一泊二日",
            "furigana": "いっぱくふつか",
            "vn": "Chuyến đi 2 ngày 1 đêm"
          },
          {
            "ja": "宿泊施設",
            "furigana": "しゅくはくしせつ",
            "vn": "Cơ sở lưu trú nghỉ dưỡng"
          }
        ],
        "example": {
          "sentence": "温泉[おんせん]付[つ]きの伝統的[でんとうてき]な旅館[りょかん]に二泊[にはく]宿泊[しゅくはく]する予定[よてい]だ。",
          "translation": "Tôi dự định sẽ nghỉ lại 2 đêm tại một quán trọ truyền thống có suối nước nóng."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "予約",
        "furigana": "よやく",
        "romaji": "yoyaku",
        "han_viet": "DỰ ƯỚC",
        "meaning_vn": "Đặt trước (phòng ở, vé tàu xe, bàn ăn)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Kế hoạch chuyến đi",
        "visual_diagram": "   📅 予約 (Quy tắc đi du lịch mùa cao điểm tại Nhật):\n   ├── 🌸 Mùa hoa anh đào (Tháng 4) ──▶ Đặt trước 2-3 tháng\n   ├── 🍁 Mùa lá đỏ (Tháng 11)      ──▶ Đặt trước 2-3 tháng\n   └── Nếu không đặt trước ──▶ Hết sạch phòng hoặc giá tăng gấp đôi!",
        "diagram_caption": "Mọi kế hoạch du lịch tại Nhật đều nên đặt chỗ trước qua các trang Agoda/Jalan/Rakuten Travel",
        "mnemonic": "DỰ (予 - trước từ sớm) + ƯỚC (約 - ước hẹn). Giao hẹn trước từ sớm.",
        "collocations": [
          {
            "ja": "予約を取り消す / キャンセルする",
            "furigana": "よやくをとりけす",
            "vn": "Hủy chỗ đã đặt trước"
          },
          {
            "ja": "事前予約",
            "furigana": "じぜんよやく",
            "vn": "Đặt trước chỗ từ sớm"
          }
        ],
        "example": {
          "sentence": "人気[にんき]のあるレストランなので、一[いち]ヶ月[かげつ]前[まえ]から予約[よやく]を入[い]れておいた。",
          "translation": "Vì là nhà hàng rất được ưa chuộng nên tôi đã đặt bàn trước từ cách đây một tháng."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "キャンセル料",
        "furigana": "キャンセルりょう",
        "romaji": "kyanseruryou",
        "han_viet": "PHÍ HỦY BỎ",
        "meaning_vn": "Phí phạt khi hủy đặt chỗ sát ngày",
        "word_type": "Danh từ",
        "tag": "Quy định dịch vụ",
        "visual_diagram": "   ⚠️ BIỂU PHÍ PHẠT HỦY PHÒNG THÔNG THƯỜNG:\n   ├── Trước 7 ngày: Miễn phí (無料)\n   ├── Trước 3 ngày: Mất 20% tiền phòng\n   ├── Trước 1 ngày: Mất 50% tiền phòng\n   └── Hủy đúng ngày (当日) hoặc Không đến (無断): MẤT 100% TIỀN!",
        "diagram_caption": "Tại Nhật hành vi 'bùng phòng' không báo trước bị coi là vô cùng thất lễ và vẫn bị trừ thẻ",
        "mnemonic": "Từ mượn Cancel (hủy) + 料 (tiền phí dịch vụ). Tiền đền bù khi đơn phương hủy giao kèo.",
        "collocations": [
          {
            "ja": "キャンセル料が発生する",
            "furigana": "キャンセルりょうがはっせいする",
            "vn": "Phát sinh phí phạt hủy chỗ"
          },
          {
            "ja": "直前キャンセル",
            "furigana": "ちょくぜんキャンセル",
            "vn": "Hủy phòng sát giờ chót"
          }
        ],
        "example": {
          "sentence": "体調[たいちょう]を崩[くず]して旅行[りょこう]を断念[だんねん]したが、前日[ぜんじつ]だったためキャンセル料[りょう]を支払[しはら]った。",
          "translation": "Bị ốm nên tôi đành từ bỏ chuyến đi, nhưng vì hủy sát ngày hôm trước nên phải trả phí hủy phòng."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "満室・空室",
        "furigana": "まんしつ・くうしつ",
        "romaji": "manshitsu / kuushitsu",
        "han_viet": "MÃN THẤT / KHÔNG THẤT",
        "meaning_vn": "Hết sạch phòng trống / Còn phòng trống",
        "word_type": "Danh từ",
        "tag": "Tình trạng phòng",
        "visual_diagram": "   🏨 BẢNG BÁO TRẠNG THÁI KHÁCH SẠN:\n   ├── 🈵 満室 (Đỏ: Toàn bộ các phòng đã có người ở kín, không nhận thêm khách)\n   └── 🈳 空室 (Xanh: Vẫn còn phòng trống, khách có thể thuê ngay)",
        "diagram_caption": "Hai ký tự Hán tự kinh điển 🈵 và 🈳 xuất hiện dày đặc trên các biển hiệu đèn LED ở Nhật",
        "mnemonic": "MÃN (満 - tràn đầy) vs KHÔNG (空 - trống rỗng). Mãn thất là kín phòng, Không thất là phòng trống.",
        "collocations": [
          {
            "ja": "ゴールデンウィークで満室だ",
            "furigana": "ゴールデンウィークでまんしつだ",
            "vn": "Kỳ nghỉ Tuần Lễ Vàng nên hết sạch phòng"
          },
          {
            "ja": "空室状況を確認する",
            "furigana": "くうしつじょうきょうをかくにんする",
            "vn": "Kiểm tra xem còn phòng trống hay không"
          }
        ],
        "example": {
          "sentence": "連休[れんきゅう]中[ちゅう]はどのホテルも満室[まんしつ]で、宿[やど]を探[さが]すのに苦労[くろう]した。",
          "translation": "Trong kỳ nghỉ dài khách sạn nào cũng kín phòng nên tôi đã rất vất vả mới tìm được chỗ nghỉ."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "チェックイン・チェックアウト",
        "furigana": "チェックイン・チェックアウト",
        "romaji": "chekkuin / chekkuauto",
        "han_viet": "NHẬN PHÒNG / TRẢ PHÒNG",
        "meaning_vn": "Thủ tục nhận phòng khách sạn / Trả phòng kết thúc chuyến ở",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Thủ tục khách sạn",
        "visual_diagram": "   🕒 GIỜ GIẤC TIÊU CHUẨN KHÁCH SẠN NHẬT:\n   ├── 🏨 チェックイン: Thường từ 15:00 chiều trở đi (Nhận chìa khóa 🔑)\n   └── 🧳 チェックアウト: Thường trước 10:00 hoặc 11:00 sáng hôm sau (Trả khóa 🔑)",
        "diagram_caption": "Nếu đến sớm trước giờ nhận phòng, bạn hoàn toàn có thể gửi hành lý miễn phí ở quầy lễ tân",
        "mnemonic": "Từ mượn tiếng Anh Check-in / Check-out.",
        "collocations": [
          {
            "ja": "荷物を預けてチェックインを待つ",
            "furigana": "にもつをあずけてチェックインをまつ",
            "vn": "Gửi hành lý và chờ đến giờ nhận phòng"
          },
          {
            "ja": "チェックアウトを済ませる",
            "furigana": "チェックアウトをすませる",
            "vn": "Hoàn tất thủ tục trả phòng"
          }
        ],
        "example": {
          "sentence": "ホテルにチェックインした後[あと]、すぐに浴衣[ゆかた]に着替[きが]えて温泉[おんせん]へ向[む]かった。",
          "translation": "Sau khi làm thủ tục nhận phòng khách sạn, tôi lập tức thay áo yukata và đi đến suối nước nóng."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "温泉",
        "furigana": "おんせん",
        "romaji": "onsen",
        "han_viet": "ÔN TUYỀN",
        "meaning_vn": "Suối nước nóng thiên nhiên giàu khoáng chất",
        "word_type": "Danh từ",
        "tag": "Văn hóa Nhật Bản",
        "visual_diagram": "   ♨️ QUY TẮC TẮM ONSEN CHUẨN VĂN HÓA NHẬT:\n   1. 🚿 Phải tắm và gội đầu thật sạch tại khu vòi sen trước khi xuống bồn nước nóng\n   2. 🚫 Tuyệt đối không nhúng khăn tắm hay mặc đồ bơi xuống bể nước nóng\n   3. 🤫 Giữ yên tĩnh thư giãn, không bơi lội quẫy đạp làm bắn nước\n   4. 🥛 Uống một chai sữa tươi mát lạnh sau khi tắm xong",
        "diagram_caption": "Biểu tượng suối nước nóng ♨️ là một trong những nét văn hóa đặc trưng nhất thế giới của Nhật Bản",
        "mnemonic": "ÔN (温 - ấm áp, nóng) + TUYỀN (泉 - dòng suối ngầm phun trào). Dòng suối nước ấm tự nhiên.",
        "collocations": [
          {
            "ja": "温泉に浸かる",
            "furigana": "おんせんにつかる",
            "vn": "Ngâm mình trong làn suối nước nóng"
          },
          {
            "ja": "露天風呂",
            "furigana": "ろてんぶろ",
            "vn": "Bể tắm suối nước nóng ngoài trời hòa mình vào thiên nhiên"
          }
        ],
        "example": {
          "sentence": "雪景色[ゆきげしき]を眺[なが]めながら露天[ろてん]風呂[ぶろ]の温泉[おんせん]に浸[つ]かるのは最高[さいこう]の贅沢[ぜいたく]だ。",
          "translation": "Vừa ngắm cảnh tuyết rơi vừa ngâm mình trong suối nước nóng ngoài trời là sự xa xỉ tuyệt vời nhất."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "名物",
        "furigana": "めいぶつ",
        "romaji": "meibutsu",
        "han_viet": "DANH VẬT",
        "meaning_vn": "Đặc sản nổi tiếng, món ngon trứ danh của địa phương",
        "word_type": "Danh từ",
        "tag": "Ẩm thực địa phương",
        "visual_diagram": "   🍜 ĐẶC SẢN CÁC VÙNG MIỀN NHẬT BẢN:\n   ├── 🐙 大阪: たこ焼き (Bánh bạch tuộc)\n   ├── 🍜 北海道: 札幌味噌ラーメン (Mì ramen Miso Sapporo)\n   ├── 🥩 神戸: 神戸牛 (Bò Kobe thượng hạng)\n   └── 🍵 静岡: 静岡茶 (Trà xanh Shizuoka)",
        "diagram_caption": "Người Nhật đi du lịch đến bất cứ đâu việc đầu tiên là tìm ăn món đặc sản 名物 của vùng đó",
        "mnemonic": "DANH (名 - danh tiếng vang dội) + VẬT (物 - sản vật món ăn). Sản vật nổi danh khắp vùng.",
        "collocations": [
          {
            "ja": "地元の名物料理",
            "furigana": "じもとのめいぶつりょうり",
            "vn": "Món ăn đặc sản địa phương"
          },
          {
            "ja": "名産品",
            "furigana": "めいさんひん",
            "vn": "Sản vật địa phương nổi tiếng làm quà"
          }
        ],
        "example": {
          "sentence": "北海道[ほっかいどう]を訪[おとず]れた際[さい]、新鮮[しんせん]な海鮮丼[かいせんどん]という名物[めいぶつ]を味[あじ]わった。",
          "translation": "Khi đến thăm Hokkaido, tôi đã thưởng thức món đặc sản trứ danh là cơm hải sản tươi sống."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "日帰り",
        "furigana": "ひがえり",
        "romaji": "higaeri",
        "han_viet": "NHẬT QUY",
        "meaning_vn": "Chuyến đi về trong ngày (không nghỉ qua đêm)",
        "word_type": "Danh từ / Mang tính bổ nghĩa",
        "tag": "Hình thức du lịch",
        "visual_diagram": "   🌅 Sáng: Bắt tàu đi chơi ngoại ô ngắm cảnh (Hakone, Kamakura)\n        │\n        ├── 🍜 Ăn trưa đặc sản, ngâm onsen\n        ▼\n   🌇 Tối: Bắt tàu trở về nhà ngủ trên giường quen thuộc\n   ==▶ Chuyến đi trong ngày = 日帰り (ひがえり)",
        "diagram_caption": "Tiết kiệm tiền thuê khách sạn và phù hợp với những người có ít ngày nghỉ",
        "mnemonic": "NHẬT (日 - một ngày) + QUY (帰 - trở về). Đi và về trọn vẹn trong một ngày.",
        "collocations": [
          {
            "ja": "日帰り温泉旅行",
            "furigana": "ひがえりおんせんりょこう",
            "vn": "Chuyến đi tắm suối nước nóng đi về trong ngày"
          },
          {
            "ja": "日帰りで出かける",
            "furigana": "ひがえりででかける",
            "vn": "Đi chơi và về ngay trong ngày"
          }
        ],
        "example": {
          "sentence": "週末[しゅうまつ]に友達[ともだち]と鎌倉[かまくら]へ日帰[ひがえ]り旅行[りょこう]に出[で]かけた。",
          "translation": "Vào cuối tuần tôi đã cùng bạn bè đi một chuyến du lịch đi về trong ngày đến Kamakura."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "旅程",
        "furigana": "りょてい",
        "romaji": "ryotei",
        "han_viet": "LỮ TRÌNH",
        "meaning_vn": "Lịch trình chuyến đi, kế hoạch lộ trình từng ngày",
        "word_type": "Danh từ",
        "tag": "Kế hoạch",
        "visual_diagram": "   🗺️ BẢN LỮ TRÌNH (旅程表):\n   ├── Ngày 1: Bay đến Osaka ── Check-in ── Ăn tối Dotonbori\n   ├── Ngày 2: Đi tàu sang Kyoto ngắm chùa Vàng Kinkaku-ji\n   └── Ngày 3: Mua sắm đặc sản làm quà ── Bắt tàu trở về Tokyo",
        "diagram_caption": "Lập lữ trình chi tiết giúp tối ưu hóa thời gian di chuyển và không bị trễ các chuyến tàu quan trọng",
        "mnemonic": "LỮ (旅 - chuyến du lịch) + TRÌNH (程 - lộ trình hành trình). Lộ trình từng bước của chuyến du lịch.",
        "collocations": [
          {
            "ja": "旅程を組む / 立てる",
            "furigana": "りょていをつむ / たてる",
            "vn": "Lên lịch trình cho chuyến đi"
          },
          {
            "ja": "旅程表",
            "furigana": "りょていひょう",
            "vn": "Bảng lịch trình chi tiết"
          }
        ],
        "example": {
          "sentence": "時間[じかん]を有効[ゆうこう]に使[つか]うため、あらかじめ無理[むり]のない旅程[りょてい]を立[た]てておく。",
          "translation": "Để sử dụng thời gian hiệu quả, hãy lên trước một lịch trình chuyến đi hợp lý không quá dồn dập."
        }
      }
    ]
  },
  {
    "topic_id": "topic_12_moi_truong_rac_thai",
    "title": "Chủ đề 12: Môi trường & Tái chế & Tiết kiệm năng lượng",
    "japanese_title": "環境問題・リサイクル・省エネの語彙",
    "description": "Chủ đề thời sự xuất hiện dày đặc trong đề đọc hiểu và nghe hiểu JLPT N3: biến đổi khí hậu, năng lượng xanh và bảo vệ sinh thái.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "地球温暖化",
        "furigana": "ちきゅうおんだんか",
        "romaji": "chikyuu ondanka",
        "han_viet": "ĐỊA CẦU ÔN NOÃN HÓA",
        "meaning_vn": "Sự nóng lên toàn cầu, biến đổi khí hậu Trái Đất",
        "word_type": "Danh từ",
        "tag": "Khủng hoảng khí hậu",
        "visual_diagram": "   🏭 Khí thải CO2 (二酸化炭素) ──▶ Hiệu ứng nhà kính (温室効果)\n        │\n        └── 🌡️ 地球温暖化 (Nhiệt độ toàn cầu tăng lên)\n             ├── 🧊 Băng ở 2 cực tan chảy (氷が溶ける)\n             ├── 🌊 Nước biển dâng cao (海面の上昇)\n             └── 🌪️ Bão lũ cực đoan bất thường gia tăng",
        "diagram_caption": "Chủ đề 'tủ' 90% xuất hiện trong các bài đọc luận văn JLPT N3/N2",
        "mnemonic": "ĐỊA CẦU (地球 - quả đất) + ÔN NOÃN (温暖 - ấm áp nóng lên) + HÓA (化 - biến hóa trở thành).",
        "collocations": [
          {
            "ja": "地球温暖化を防ぐ",
            "furigana": "ちきゅうおんだんかをふせぐ",
            "vn": "Ngăn chặn hiện tượng nóng lên toàn cầu"
          },
          {
            "ja": "温暖化対策",
            "furigana": "おんだんかたいさく",
            "vn": "Các biện pháp đối phó biến đổi khí hậu"
          }
        ],
        "example": {
          "sentence": "地球[ちきゅう]温暖化[おんだんか]を食[く]い止[と]めるため、世界[せかい]規模[きぼ]で温室[おんしつ]効果[こうか]ガスの削減[さくげん]が求[もと]められている。",
          "translation": "Để ngăn chặn sự nóng lên toàn cầu, việc cắt giảm khí nhà kính đang được yêu cầu trên quy mô toàn thế giới."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "リサイクル",
        "furigana": "リサイクル",
        "romaji": "risaikuru",
        "han_viet": "TÁI CHẾ",
        "meaning_vn": "Tái chế đồ cũ và rác thải thành nguyên liệu mới",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Bảo vệ tài nguyên",
        "visual_diagram": "   ♻️ NGUYÊN TẮC 3R TRONG BẢO VỆ MÔI TRƯỜNG NHẬT BẢN:\n   1. 🔻 Reduce (リデュース): Giảm bớt lượng rác thải sinh hoạt\n   2. 🔄 Reuse (リユース): Tái sử dụng đồ cũ nhiều lần\n   3. ♻️ Recycle (リサイクル): Tái chế rác thành sản phẩm mới (Áo may từ vỏ chai nhựa)",
        "diagram_caption": "Tại Nhật Bản, tỷ lệ tái chế chai nhựa PET thuộc hàng cao nhất thế giới (trên 85%)",
        "mnemonic": "Từ mượn tiếng Anh Recycle. Nhớ biểu tượng 3 mũi tên tạo thành vòng tròn ♻️.",
        "collocations": [
          {
            "ja": "資源をリサイクルする",
            "furigana": "しげんをリサイクルする",
            "vn": "Tái chế tài nguyên"
          },
          {
            "ja": "リサイクルショップ",
            "furigana": "リサイクルショップ",
            "vn": "Cửa hàng bán đồ cũ/đồ thanh lý giá rẻ"
          }
        ],
        "example": {
          "sentence": "回収[かいしゅう]されたペットボトルは、服[ふく]や文房具[ぶんぼうぐ]としてリサイクルされる。",
          "translation": "Những chai nhựa PET được thu gom sẽ được tái chế thành quần áo và đồ dùng văn phòng phẩm."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "省エネ",
        "furigana": "しょうエネ",
        "romaji": "shouene",
        "han_viet": "TỈNH NĂNG",
        "meaning_vn": "Tiết kiệm năng lượng (viết tắt của 省エネルギー)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Đời sống xanh",
        "visual_diagram": "   💡 HÀNH ĐỘNG TIẾT KIỆM NĂNG LƯỢNG (省エネ):\n   ├── 🔌 Rút phích cắm khi không dùng đồ điện\n   ├── ❄️ Đặt điều hòa mùa hè 28°C (Chiến dịch Cool Biz)\n   ├── 💡 Thay bóng đèn sợi đốt bằng bóng đèn LED tiết kiệm điện\n   └── 🚗 Đi phương tiện công cộng thay vì lái xe ô tô",
        "diagram_caption": "Phong trào toàn dân tại Nhật nhằm giảm tải áp lực cho mạng lưới điện quốc gia",
        "mnemonic": "TỈNH (省 - giảm thiểu, tiết kiệm) + NĂNG (エネ - viết tắt của Energy). Tiết kiệm năng lượng.",
        "collocations": [
          {
            "ja": "省エネ家電",
            "furigana": "しょうエネかでん",
            "vn": "Đồ gia dụng tiết kiệm điện có nhãn sao năng lượng"
          },
          {
            "ja": "省エネに取り組む",
            "furigana": "しょうエネにとりくむ",
            "vn": "Nỗ lực thực hành tiết kiệm năng lượng"
          }
        ],
        "example": {
          "sentence": "電気代[でんきだい]を節約[せつやく]するだけでなく、環境[かんきょう]のためにも省[しょう]エネを心[こころ]がけている。",
          "translation": "Không chỉ để tiết kiệm tiền điện mà vì môi trường tôi cũng luôn chú ý tiết kiệm năng lượng."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "排出",
        "furigana": "はいしゅつ",
        "romaji": "haishutsu",
        "han_viet": "BÀI XUẤT",
        "meaning_vn": "Thải ra, xả ra môi trường (khí thải, nước thải, rác)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Ô nhiễm",
        "visual_diagram": "   🏭 Nhà máy công nghiệp ──▶ Thải khói đen vào bầu trời\n   🚗 Xe hơi chạy xăng dầu ──▶ Thải khí carbon từ ống bô\n   ==▶ Hành vi xả thải độc hại này gọi là 排出 (はいしゅつ)",
        "diagram_caption": "Từ vựng chuyên ngành thường xuyên đối chiếu với từ 'cắt giảm' (削減)",
        "mnemonic": "BÀI (排 - đẩy ra ngoài) + XUẤT (出 - đi ra). Đẩy các chất thải đi ra môi trường.",
        "collocations": [
          {
            "ja": "二酸化炭素の排出量",
            "furigana": "にさんかたんそのはいしゅつりょう",
            "vn": "Lượng phát thải khí CO2"
          },
          {
            "ja": "排気ガス",
            "furigana": "はいきガス",
            "vn": "Khí thải động cơ xe cộ"
          }
        ],
        "example": {
          "sentence": "工場[こうじょう]から排出[はいしゅつ]される有害[ゆうがい]なガスが、大気[たいき]を汚染[おせん]している。",
          "translation": "Khí gas độc hại thải ra từ các nhà máy đang làm ô nhiễm bầu khí quyển."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "削減",
        "furigana": "さくげん",
        "romaji": "sakugen",
        "han_viet": "TƯỚC GIẢM",
        "meaning_vn": "Cắt giảm bớt về số lượng hoặc chi phí",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Chính sách môi trường",
        "visual_diagram": "   📈 Mức phát thải cũ: 100% ───────┐\n                                    │ CẮT GIẢM (削減)\n   📉 Mục tiêu năm 2030: 50% ◀──────┘",
        "diagram_caption": "Chính phủ Nhật đặt mục tiêu cắt giảm lượng phát thải carbon về 0 (Net Zero) vào năm 2050",
        "mnemonic": "TƯỚC (削 - gọt đẽo bớt đi) + GIẢM (減 - bớt đi). Gọt bớt đi cho số lượng ít lại.",
        "collocations": [
          {
            "ja": "ゴミの排出量を削減する",
            "furigana": "ごみのはいしゅつりょうをさくげんする",
            "vn": "Cắt giảm lượng xả rác thải"
          },
          {
            "ja": "コスト削減",
            "furigana": "コストさくげん",
            "vn": "Cắt giảm chi phí trong doanh nghiệp"
          }
        ],
        "example": {
          "sentence": "プラスチックゴミを削減[さくげん]するために、レジ袋[ぶくろ]の有料化[ゆうりょうか]が始[はじ]まった。",
          "translation": "Để cắt giảm rác thải nhựa, chính sách tính tiền túi nilon ở quầy thanh toán đã được bắt đầu."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "汚染",
        "furigana": "おせん",
        "romaji": "osen",
        "han_viet": "Ô NHIỄM",
        "meaning_vn": "Ô nhiễm (nguồn nước, không khí, đất đai)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Khủng hoảng môi trường",
        "visual_diagram": "   ☣️ CÁC DẠNG Ô NHIỄM NGUY HẠI:\n   ├── 🌫️ 大気汚染 (たいきおせん - Ô nhiễm không khí, bụi mịn PM2.5)\n   ├── 🐟 水質汚染 (すいしつおせん - Ô nhiễm nguồn nước, cá chết hàng loạt)\n   └── 🌱 土壌汚染 (どじょうおせん - Ô nhiễm đất đai do hóa chất công nghiệp)",
        "diagram_caption": "Nhật Bản từng trải qua nhiều bài học đắt giá về ô nhiễm trong thời kỳ bùng nổ công nghiệp thế kỷ 20",
        "mnemonic": "Ô (汚 - dơ bẩn vấy bẩn) + NHIỄM (染 - ngấm vào lây lan). Chất bẩn ngấm vào môi trường trong lành.",
        "collocations": [
          {
            "ja": "海洋汚染",
            "furigana": "かいようおせん",
            "vn": "Ô nhiễm biển do rác thải nhựa"
          },
          {
            "ja": "汚染物質を取り除く",
            "furigana": "おせんぶっしつをとりのぞく",
            "vn": "Loại bỏ các chất độc hại gây ô nhiễm"
          }
        ],
        "example": {
          "sentence": "海[うみ]に流[なが]れ出[で]たプラスチックゴミによる海洋[かいよう]汚染[おせん]が深刻[しんこく]な問題[もんだい]になっている。",
          "translation": "Ô nhiễm đại dương do rác thải nhựa trôi dạt ra biển đang trở thành vấn đề vô cùng nghiêm trọng."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "エコバッグ",
        "furigana": "エコバッグ",
        "romaji": "ekobaggu",
        "han_viet": "TÚI MÔI TRƯỜNG",
        "meaning_vn": "Túi vải dùng nhiều lần khi đi mua sắm (thay túi nilon)",
        "word_type": "Danh từ",
        "tag": "Thói quen sinh hoạt",
        "visual_diagram": "   🏪 ĐI SIÊU THỊ / KONBINI:\n   ├── ❌ Lấy túi nilon dùng 1 lần ──▶ Tốn 3円 - 5円/túi & Thải rác nhựa\n   └── ⭕ Tự mang エコバッグ ──▶ Tiết kiệm tiền & Thân thiện môi trường\n         ▲\n         └── 🗣️ Thu ngân: 「レジ袋はご利用ですか」「いいえ、エコバッグがあります」",
        "diagram_caption": "Vật dụng quen thuộc luôn nằm gọn trong balo của người dân sinh sống tại Nhật",
        "mnemonic": "Ghép từ Ecology (sinh thái môi trường) + Bag (chiếc túi xách).",
        "collocations": [
          {
            "ja": "エコバッグを持参する",
            "furigana": "エコバッグをじさんする",
            "vn": "Tự mang theo túi môi trường khi đi chợ"
          },
          {
            "ja": "マイバッグ",
            "furigana": "マイバッグ",
            "vn": "Tên gọi tương đương: Túi riêng của tôi"
          }
        ],
        "example": {
          "sentence": "買[か]い物[もの]に行[い]く際[さい]は、必[かなら]ずカバンの中[なか]にエコバッグを入[い]れて持[も]ち歩[ある]く。",
          "translation": "Khi đi mua sắm, tôi luôn bỏ sẵn túi vải môi trường trong túi xách mang theo bên mình."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "自然保護",
        "furigana": "しぜんほご",
        "romaji": "shizen hogo",
        "han_viet": "TỰ NHIÊN BẢO HỘ",
        "meaning_vn": "Bảo tồn thiên nhiên, bảo vệ rừng và động thực vật",
        "word_type": "Danh từ",
        "tag": "Sinh thái",
        "visual_diagram": "   🌲 TỰ NHIÊN HOANG DÃ (Rừng nguyên sinh, rạn san hô, suối nguồn)\n        │\n        └── 🛡️ 自然保護 (Bảo vệ giữ gìn):\n            ├── 🚫 Nghiêm cấm chặt phá rừng bừa bãi\n            └── 🦅 Thiết lập các vườn quốc gia bảo tồn loài quý hiếm",
        "diagram_caption": "Nhật Bản có hơn 67% diện tích lãnh thổ là rừng núi được bảo tồn cẩn mật",
        "mnemonic": "TỰ NHIÊN (自然 - đất trời tạo hóa) + BẢO HỘ (保護 - che chở gìn giữ). Giữ gìn nguyên vẹn mẹ thiên nhiên.",
        "collocations": [
          {
            "ja": "自然保護区",
            "furigana": "しぜんほごく",
            "vn": "Khu bảo tồn thiên nhiên quốc gia"
          },
          {
            "ja": "自然保護活動に参加する",
            "furigana": "しぜんほごかつどうにさんかする",
            "vn": "Tham gia phong trào bảo vệ môi trường"
          }
        ],
        "example": {
          "sentence": "美[うつく]しい山[やま]の自然[しぜん]を未来[みらい]の世代[せだい]に残[のこ]すため、自然[しぜん]保護[ほご]活動[かつどう]が行[おこな]われている。",
          "translation": "Để để lại vẻ đẹp thiên nhiên núi rừng cho thế hệ tương lai, các hoạt động bảo tồn thiên nhiên đang được tiến hành."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "太陽光発電",
        "furigana": "たいようこうはつでん",
        "romaji": "taiyoukou hatsuden",
        "han_viet": "THÁI DƯƠNG QUANG PHÁT ĐIỆN",
        "meaning_vn": "Điện mặt trời, quang điện năng lượng sạch",
        "word_type": "Danh từ",
        "tag": "Năng lượng tái tạo",
        "visual_diagram": "   ☀️ 太陽 (Mặt trời)\n      ↓\n      ↓ (Ánh nắng rọi xuống)\n   🟦 太陽光パネル (Tấm pin năng lượng trên mái nhà)\n      ↓\n   ⚡ Điện sinh hoạt sạch, không phát thải CO2",
        "diagram_caption": "Sơ đồ chuyển hóa quang năng thành điện năng sạch cực kỳ phổ biến trên mái nhà ở Nhật",
        "mnemonic": "THÁI DƯƠNG (太陽 - mặt trời) + QUANG (光 - ánh sáng) + PHÁT ĐIỆN (発電 - sinh ra dòng điện).",
        "collocations": [
          {
            "ja": "太陽光パネルを設置する",
            "furigana": "たいようこうパネルをせっちする",
            "vn": "Lắp đặt tấm pin năng lượng mặt trời"
          },
          {
            "ja": "再生可能エネルギー",
            "furigana": "さいせいかのうエネルギー",
            "vn": "Năng lượng tái tạo xanh"
          }
        ],
        "example": {
          "sentence": "自宅[じたく]の屋根[やね]に太陽[たいよう]光[こう]発電[はつでん]パネルを設置[せっち]して、環境[かんきょう]に優[やさ]しい生活[せいかつ]を送[おく]る。",
          "translation": "Lắp đặt các tấm pin điện mặt trời trên mái nhà riêng để hướng tới một lối sống thân thiện với môi trường."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "資源",
        "furigana": "しげん",
        "romaji": "shigen",
        "han_viet": "TƯ NGUYÊN",
        "meaning_vn": "Tài nguyên thiên nhiên (dầu mỏ, khoáng sản, nước ngọt)",
        "word_type": "Danh từ",
        "tag": "Địa lý & Kinh tế",
        "visual_diagram": "   🗾 ĐẶC TRƯNG TÀI NGUYÊN NHẬT BẢN:\n   ├── ❌ 天然資源 (Tài nguyên khoáng sản: Cực kỳ nghèo nàn, phải nhập khẩu 99% dầu mỏ)\n   └── ⭕ 人材・技術資源 (Tài nguyên con người & công nghệ: Rất dồi dào, phát triển hàng đầu)",
        "diagram_caption": "Chính vì khan hiếm tài nguyên tự nhiên nên người Nhật cực kỳ trân trọng từng mẩu giấy, giọt nước",
        "mnemonic": "TƯ (資 - của cải của trời) + NGUYÊN (源 - đầu nguồn suối chảy). Nguồn cội của mọi của cải vật chất.",
        "collocations": [
          {
            "ja": "限りある資源を大切にする",
            "furigana": "かぎりあるしげんをたいせつにする",
            "vn": "Trân trọng nguồn tài nguyên có hạn"
          },
          {
            "ja": "天然資源に乏しい",
            "furigana": "てんねんしげんにとぼしい",
            "vn": "Nghèo nàn tài nguyên thiên nhiên"
          }
        ],
        "example": {
          "sentence": "日本[にほん]は資源[しげん]の少[すく]ない国[くに]だからこそ、リサイクルや省[しょう]エネの技術[ぎじゅつ]が発達[はったつ]した。",
          "translation": "Chính vì Nhật Bản là một quốc gia ít tài nguyên nên các công nghệ tái chế và tiết kiệm năng lượng mới phát triển vượt bậc."
        }
      }
    ]
  },
  {
    "topic_id": "topic_13_thien_tai_cuu_ho",
    "title": "Chủ đề 13: Thiên tai & Cứu hộ & Sơ tán",
    "japanese_title": "自然災害・地震・防災・避難の語彙",
    "description": "Các biện pháp ứng phó động đất, sóng thần, bão lũ và kỹ năng sinh tồn thiết yếu tại Nhật Bản.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "地震",
        "furigana": "じしん",
        "romaji": "jishin",
        "han_viet": "ĐỊA CHẤN",
        "meaning_vn": "Động đất, rung chấn mặt đất",
        "word_type": "Danh từ",
        "tag": "Thiên tai",
        "visual_diagram": "   🚨 KHI CÓ CHUÔNG BÁO ĐỘNG ĐẤT KHẨN CẤP (緊急地震速報):\n   ├── 1. 🪑 Chui ngay xuống gầm bàn chắc chắn, bảo vệ vùng đầu (頭を守る)\n   ├── 2. 🚪 Mở hé cửa ra vào để tránh cửa bị biến dạng kẹt không thoát được\n   └── 3. 🔥 Tắt bếp ga, ngắt cầu dao sau khi hết đợt rung lắc mạnh",
        "diagram_caption": "3 thao tác sống còn người dân Nhật Bản được huấn luyện từ trường mẫu giáo",
        "mnemonic": "ĐỊA (地 - mặt đất) + CHẤN (震 - rung chuyển sấm sét). Mặt đất rung chuyển dữ dội.",
        "collocations": [
          {
            "ja": "地震が発生する",
            "furigana": "じしんがはっせいする",
            "vn": "Xảy ra một trận động đất"
          },
          {
            "ja": "震度5強",
            "furigana": "しんどごきょう",
            "vn": "Cường độ rung chấn cấp 5 mạnh theo thang Nhật"
          }
        ],
        "example": {
          "sentence": "大[おお]きな地震[じしん]が起[お]きたら、まず頭[あたま]を守[まも]るために机[つくえ]の下[した]に入[はい]る。",
          "translation": "Khi có trận động đất lớn xảy ra, trước hết hãy chui xuống gầm bàn để bảo vệ phần đầu."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "津波",
        "furigana": "つなみ",
        "romaji": "tsunami",
        "han_viet": "TÂN BA",
        "meaning_vn": "Sóng thần (do động đất dưới đáy biển tạo ra)",
        "word_type": "Danh từ",
        "tag": "Thiên tai",
        "visual_diagram": "   🌊 QUY TẮC PHÒNG SÓNG THẦN:\n   [Động đất ven biển ──▶ Rung lắc lâu trên 1 phút]\n       │\n       └── 🏃‍♂️ Chạy NGAY LẬP TỨC lên vùng đồi cao (高台へ避難)\n           ├── ❌ Không đứng lại xem nước biển rút\n           └── ❌ Không quay lại lấy đồ đạc tài sản!",
        "diagram_caption": "Từ gốc tiếng Nhật 'Tsunami' đã trở thành từ vựng quốc tế của toàn nhân loại",
        "mnemonic": "TÂN (津 - bến cảng) + BA (波 - ngọn sóng lớn). Ngọn sóng khổng lồ ập thẳng vào cảng biển.",
        "collocations": [
          {
            "ja": "大津波警報が発令される",
            "furigana": "おおつなみけいほうにはつれいされる",
            "vn": "Phát lệnh cảnh báo sóng thần khẩn cấp"
          },
          {
            "ja": "津波避難ビル",
            "furigana": "つなみひなんビル",
            "vn": "Tòa nhà cao tầng kiên cố chỉ định tránh sóng thần"
          }
        ],
        "example": {
          "sentence": "海岸[かいがん]付近[ふきん]で強[つよ]い揺[ゆ]れを感[かん]じたら、津波[つなみ]を警戒[けいかい]して高台[たかだい]へ逃[に]げる。",
          "translation": "Nếu cảm thấy rung lắc mạnh ở gần bờ biển, hãy đề phòng sóng thần và tháo chạy ngay lên đồi cao."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "避難所",
        "furigana": "ひなんじょ",
        "romaji": "hinanjo",
        "han_viet": "TỴ NẠN SỞ",
        "meaning_vn": "Nơi sơ tán khẩn cấp (thường là trường học, nhà thi đấu)",
        "word_type": "Danh từ",
        "tag": "Cứu nạn",
        "visual_diagram": "   🏫 避難所 (Địa điểm sơ tán an toàn trong quận):\n   ├── 🏫 Nhà thi đấu trường tiểu học / cấp 2 (体育館)\n   ├── 🏛️ Nhà văn hóa cộng đồng (公民館)\n   └── Được cấp phát: Chăn ấm, nước uống, mì gói, sạc pin khẩn cấp",
        "diagram_caption": "Mỗi người dân khi đến Nhật đều cần tra cứu bản đồ xem điểm sơ tán gần nhà mình nhất ở đâu",
        "mnemonic": "TỴ (避 - lánh đi) + NẠN (難 - hoạn nạn) + SỞ (所 - địa điểm). Nơi tạm lánh hoạn nạn an toàn.",
        "collocations": [
          {
            "ja": "避難所へ移動する",
            "furigana": "ひなんじょへいどうする",
            "vn": "Di chuyển đến nơi sơ tán"
          },
          {
            "ja": "避難生活を送る",
            "furigana": "ひなんせいかつをおくる",
            "vn": "Tạm sống những ngày sơ tán ở nhà cộng đồng"
          }
        ],
        "example": {
          "sentence": "家[いえ]が倒壊[とうかい]する危険[きけん]があったため、近[ちか]くの小学校[しょうがっこう]の避難所[ひなんじょ]へ向[む]かった。",
          "translation": "Vì có nguy cơ sập nhà nên tôi đã hướng đến nơi sơ tán là trường tiểu học gần đó."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "警戒",
        "furigana": "けいかい",
        "romaji": "keikai",
        "han_viet": "CẢNH GIỚI",
        "meaning_vn": "Cảnh giác, đề phòng, mức độ cảnh báo trước nguy hiểm",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Cảnh báo an toàn",
        "visual_diagram": "   ⚠️ 5 CẤP ĐỘ CẢNH BÁO THIÊN TAI (警戒レベル):\n   ├── Cấp 1: Nâng cao ý thức (早期注意)\n   ├── Cấp 2: Kiểm tra đường sơ tán (注意報)\n   ├── Cấp 3: Người già sơ tán trước (高齢者等避難)\n   ├── Cấp 4: Toàn dân sơ tán ngay (全員避難 - Rất nguy cấp!)\n   └── Cấp 5: Thảm họa khẩn cấp, bảo toàn tính mạng bằng mọi giá (緊急安全確保)",
        "diagram_caption": "Khi điện thoại hú vang báo '警戒レベル4' có nghĩa là bắt buộc phải rời nhà ngay lập tức",
        "mnemonic": "CẢNH (警 - cảnh báo) + GIỚI (戒 - răn đe, phòng ngừa). Luôn ở trạng thái đề phòng nghiêm ngặt.",
        "collocations": [
          {
            "ja": "土砂崩れを警戒する",
            "furigana": "どしゃくずれをけいかいする",
            "vn": "Cảnh giác cao độ trước nguy cơ sạt lở đất"
          },
          {
            "ja": "警戒態勢に入る",
            "furigana": "けいかいたいせいにはいる",
            "vn": "Bước vào trạng thái báo động khẩn cấp"
          }
        ],
        "example": {
          "sentence": "大型[おおがた]の台風[たいふう]が近[ちか]づいているため、河川[かせん]の氾濫[はんらん]に厳重[げんじゅう]な警戒[けいかい]が必要[ひつよう]だ。",
          "translation": "Vì cơn bão lớn đang tới gần nên cần phải cảnh giác cao độ trước nguy cơ ngập lụt sông ngòi."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "停電・断水",
        "furigana": "ていでん・だんすい",
        "romaji": "teiden / dansui",
        "han_viet": "ĐÌNH ĐIỆN / ĐOẠN THỦY",
        "meaning_vn": "Mất điện sinh hoạt / Mất nước máy sinh hoạt",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Sự cố cơ sở hạ tầng",
        "visual_diagram": "   🌪️ KHI BÃO LỚN HOẶC ĐỘNG ĐẤT:\n   ├── 🔌 停電 (Đình điện): Cúp điện, tủ lạnh không chạy, bóng đèn tắt ngóm\n   └── 🚰 断水 (Đoạn thủy): Cúp nước máy, bồn cầu không xả được, không có nước nấu ăn\n         ▲\n         └── 🔦 Cần sẵn: Đèn pin + 20 lít nước sạch tích trữ trong nhà tắm",
        "diagram_caption": "Hai sự cố hạ tầng phổ biến nhất sau thảm họa thiên tai",
        "mnemonic": "ĐÌNH (停 - dừng lại) + ĐIỆN. ĐOẠN (断 - cắt đứt) + THỦY. Điện dừng nước đứt.",
        "collocations": [
          {
            "ja": "停電が復旧する",
            "furigana": "ていでんがふっきゅうする",
            "vn": "Điện sinh hoạt được khôi phục lại"
          },
          {
            "ja": "断水に備えて水を汲む",
            "furigana": "だんすいにそなえてみずをくむ",
            "vn": "Hứng sẵn nước đề phòng mất nước"
          }
        ],
        "example": {
          "sentence": "地震[じしん]の直後[ちょくご]に停電[ていでん]と断水[だんすい]が発生[はっせい]し、生活[せいかつ]が極[きわ]めて不便[ふべん]になった。",
          "translation": "Ngay sau động đất đã xảy ra tình trạng mất điện và mất nước khiến sinh hoạt trở nên vô cùng bất tiện."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "非常食",
        "furigana": "ひじょうしょく",
        "romaji": "hijoushoku",
        "han_viet": "PHI THƯỜNG THỰC",
        "meaning_vn": "Lương thực thực phẩm khẩn cấp trữ phòng nạn (để được 3-5 năm)",
        "word_type": "Danh từ",
        "tag": "Dự trữ sinh tồn",
        "visual_diagram": "   🥫 THỰC PHẨM CỨU NẠN TIÊU CHUẨN CẦN ĐỦ CHO 3 NGÀY:\n   ├── 💧 Nước lọc đóng chai hạn 5 năm (3 lít/người/ngày)\n   ├── 🍚 Cơm sấy khô Alpha (Chỉ cần đổ nước nóng hoặc nước nguội là ăn được)\n   ├── 🥫 Thịt cá đóng hộp nắp giật (bò hầm, cá thu sốt miso)\n   └── 🍫 Bánh quy khô calo cao, kẹo ngậm",
        "diagram_caption": "Người Nhật có văn hóa 'Rolling Stock' - ăn đồ cũ gần hết hạn rồi mua bổ sung đồ mới liên tục",
        "mnemonic": "PHI THƯỜNG (非常 - lúc khẩn cấp dị thường) + THỰC (食 - đồ ăn). Đồ ăn dành riêng cho lúc nguy nan.",
        "collocations": [
          {
            "ja": "非常食を備蓄する",
            "furigana": "ひじょうしょくをびちくする",
            "vn": "Tích trữ lương khô khẩn cấp"
          },
          {
            "ja": "賞味期限が長い非常食",
            "furigana": "しょうみきげんがながいひじょうしょく",
            "vn": "Thực phẩm cứu nạn có hạn dùng nhiều năm"
          }
        ],
        "example": {
          "sentence": "万一[まんいつ]の災害[さいがい]に備[そな]えて、家族[かぞく]三人[さんにん]分[ぶん]の非常食[ひじょうしょく]を倉庫[そうこ]に用意[ようい]した。",
          "translation": "Đề phòng thảm họa bất trắc, tôi đã chuẩn bị sẵn lượng lương khô khẩn cấp đủ cho 3 người trong gia đình."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "防災グッズ",
        "furigana": "ぼうさいグッズ",
        "romaji": "bousai guzzu",
        "han_viet": "PHÒNG TAI ĐỒ DÙNG",
        "meaning_vn": "Balo / Bộ đồ nghề phòng chống thiên tai",
        "word_type": "Danh từ",
        "tag": "Dụng cụ cứu hộ",
        "visual_diagram": "   🎒 BALO PHÒNG CHỐNG THIÊN TAI (防災リュック):\n   ├── 🔦 Đèn pin và pin tiểu dự phòng\n   ├── 📻 Radio quay tay bắt sóng dự báo thời tiết khẩn\n   ├── 🧻 Giấy vệ sinh khẩn cấp và túi đựng chất thải\n   ├── 🩹 Hộp băng gạc y tế sơ cứu mini\n   └── 🧤 Găng tay len dày và còi cứu hộ thổi khi bị kẹt",
        "diagram_caption": "Nên đặt chiếc balo này ở ngay cạnh cửa ra vào để xách chạy bất cứ lúc nào",
        "mnemonic": "PHÒNG TAI (防災 - phòng chống tai họa thiên nhiên) + GOODS (dụng cụ đồ đạc).",
        "collocations": [
          {
            "ja": "防災リュック",
            "furigana": "ぼうさいリュック",
            "vn": "Balo phòng chống thiên tai đặt sẵn góc nhà"
          },
          {
            "ja": "防災訓練",
            "furigana": "ぼうさいくんれん",
            "vn": "Buổi diễn tập phòng chống thảm họa tại trường/cty"
          }
        ],
        "example": {
          "sentence": "玄関[げんかん]の近[ちか]くに防災[ぼうさい]グッズをまとめたリュックを置[お]いてある。",
          "translation": "Tôi đặt sẵn chiếc balo đựng dụng cụ phòng chống thiên tai ở ngay gần cửa ra vào."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "余震",
        "furigana": "よしん",
        "romaji": "yoshin",
        "han_viet": "DƯ CHẤN",
        "meaning_vn": "Dư chấn, các đợt rung chấn nhỏ tiếp sau trận động đất chính",
        "word_type": "Danh từ",
        "tag": "Hiện tượng địa chất",
        "visual_diagram": "   💥 本震 (Đợt rung chấn chính: Mạnh nhất, gây đổ sập nhà)\n        │\n        └── 〰️〰️ 余震 (Các đợt dư chấn kéo dài hàng tuần sau đó):\n             ├── Có thể làm những bức tường đã nứt sập hẳn\n             └── Tuyệt đối không được chủ quan quay lại nhà nguy hiểm",
        "diagram_caption": "Sau trận động đất lớn, nguy cơ xuất hiện dư chấn mạnh trong vòng 1 tuần là cực cao",
        "mnemonic": "DƯ (余 - phần dư sót lại) + CHẤN (震 - rung lắc). Đợt rung lắc còn sót lại.",
        "collocations": [
          {
            "ja": "余震が続く",
            "furigana": "よしんがつづく",
            "vn": "Các đợt dư chấn liên tục tiếp diễn"
          },
          {
            "ja": "余震への警戒",
            "furigana": "よしんへのけいかい",
            "vn": "Cảnh giác cao trước các đợt dư chấn tiếp theo"
          }
        ],
        "example": {
          "sentence": "大[おお]きな本震[ほんしん]の後[あと]も、何日[なんにち]にもわたって大[おお]きな余震[よしん]が続[つづ]いた。",
          "translation": "Ngay cả sau trận động đất chính lớn, những đợt dư chấn mạnh vẫn tiếp tục kéo dài suốt nhiều ngày."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "救助",
        "furigana": "きゅうじょ",
        "romaji": "kyuujo",
        "han_viet": "CỨU TRỢ",
        "meaning_vn": "Giải cứu, cứu hộ người gặp nạn",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Cứu hộ cứu nạn",
        "visual_diagram": "   🏚️ Nhà sập, ngập lụt chia cắt ──▶ Người dân mắc kẹt kêu cứu\n        │\n        └── 🚒 救助隊 (Đội cứu hộ, lính cứu hỏa, lực lượng phòng vệ SDF)\n            ├── 🚁 Trực thăng thả dây cứu người từ nóc nhà\n            └── 🐕 Chó nghiệp vụ đánh hơi tìm người dưới đống đổ nát",
        "diagram_caption": "Số điện thoại cứu hộ khẩn cấp ở Nhật: 119 (Cứu hỏa/Cấp cứu), 118 (Cứu hộ trên biển)",
        "mnemonic": "CỨU (救 - giải cứu, cứu mạng) + TRỢ (助 - giúp đỡ). Ra tay ứng cứu giúp đỡ người nguy nan.",
        "collocations": [
          {
            "ja": "救助活動を行う",
            "furigana": "きゅうじょかつどうをおこなう",
            "vn": "Tiến hành hoạt động tìm kiếm cứu hộ"
          },
          {
            "ja": "倒壊した建物から救助される",
            "furigana": "とうかいしたたてものからきゅうじょされる",
            "vn": "Được cứu thoát ra từ tòa nhà đổ sập"
          }
        ],
        "example": {
          "sentence": "自衛隊[じえいたい]や消防[しょうぼう]が全力[ぜんりょく]で被災者[ひさいしゃ]の救助[きゅうじょ]に当[あ]たった。",
          "translation": "Lực lượng phòng vệ và lính cứu hỏa đã dốc toàn lực thực hiện công tác cứu hộ những người bị nạn."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "安否確認",
        "furigana": "あんぴかくにん",
        "romaji": "anpi kakunin",
        "han_viet": "AN PHỦ XÁC NHẬN",
        "meaning_vn": "Xác nhận tình trạng an toàn của người thân sau thiên tai",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "An toàn sinh mạng",
        "visual_diagram": "   📱 HỘP THƯ TIN NHẮN KHẨN KHI ĐIỆN THOẠI NGHẼN MẠNG:\n   ├── ☎️ Bấm 171 (災害用伝言ダイヤル): Ghi âm giọng nói báo 'Tôi vẫn bình an'\n   └── 🌐 Web171: Nhập số điện thoại để người nhà tra cứu biết mình an toàn",
        "diagram_caption": "Phương tiện truyền tin sống còn khi toàn bộ mạng di động bị nghẽn sau thảm họa",
        "mnemonic": "AN PHỦ (安否 - bình an hay có chuyện gì) + XÁC NHẬN (確認 - kiểm tra cho rõ). Xác minh sự an toàn.",
        "collocations": [
          {
            "ja": "家族の安否を確認する",
            "furigana": "かぞくのあんぴをかくにんする",
            "vn": "Xác minh người nhà có bình an không"
          },
          {
            "ja": "安否情報",
            "furigana": "あんぴじょうほう",
            "vn": "Thông tin về sự an nguy của các nạn nhân"
          }
        ],
        "example": {
          "sentence": "災害[さいがい]用[よう]の伝言[でんごん]ダイヤルを利用[りよう]して、遠[とお]く離[はな]れた家族[かぞく]の安否[あんぴ]を確認[かくにん]した。",
          "translation": "Tôi đã sử dụng hộp thư thoại cứu nạn thiên tai để xác nhận tình trạng an toàn của gia đình ở nơi xa."
        }
      }
    ]
  },
  {
    "topic_id": "topic_14_tap_tinh_dong_vat",
    "title": "Chủ đề 14: Động vật & Sinh thái thiên nhiên",
    "japanese_title": "動物の生態・自然・習性の語彙",
    "description": "Thế giới hoang dã, tập tính sinh tồn, chuỗi thức ăn và các loài sinh vật thích nghi với môi trường sống khắc nghiệt.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "生態",
        "furigana": "せいたい",
        "romaji": "seitai",
        "han_viet": "SINH THÁI",
        "meaning_vn": "Tập tính sinh hoạt và cách sinh tồn của sinh vật",
        "word_type": "Danh từ",
        "tag": "Sinh thái học",
        "visual_diagram": "   🌿 HỆ SINH THÁI (生態系 - Ecosystem):\n   ☀️ Ánh sáng mặt trời ──▶ 🌾 Thực vật (Sản xuất)\n                              │\n                              ▼\n   🦌 Thú ăn cỏ ──────────▶ 🐺 Thú săn mồi (Tiêu thụ)\n                              │\n                              ▼\n   🍄 Nấm & Vi sinh vật phân hủy chất thải trở về với đất mẹ",
        "diagram_caption": "Bài đọc N3 thường giải thích tập tính kỳ lạ của một loài chim hay côn trùng",
        "mnemonic": "SINH (生 - sự sống sinh tồn) + THÁI (態 - hình thái, dáng vẻ). Dáng vẻ sinh tồn của muôn loài.",
        "collocations": [
          {
            "ja": "野生動物の生態を研究する",
            "furigana": "やせいどうぶつのせいたいをけんきゅうする",
            "vn": "Nghiên cứu tập tính sinh thái của động vật hoang dã"
          },
          {
            "ja": "生態系を乱す",
            "furigana": "せいたいけいをみだす",
            "vn": "Làm rối loạn cán cân hệ sinh thái"
          }
        ],
        "example": {
          "sentence": "深海[しんかい]に生息[せいそく]する珍[めずら]しい生物[せいぶつ]の生態[せいたい]は、まだ多[おお]くが謎[なぞ]に包[つつ]まれている。",
          "translation": "Tập tính sinh thái của các sinh vật quý hiếm sống ở biển sâu phần lớn vẫn còn chìm trong bức màn bí ẩn."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "繁殖",
        "furigana": "はんしょく",
        "romaji": "hanshoku",
        "han_viet": "PHỒN THỰC",
        "meaning_vn": "Sinh sản, duy trì và phát triển nòi giống",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Sinh sản",
        "visual_diagram": "   🌸 Mùa xuân ấm áp (春) ──▶ MÙA SINH SẢN (繁殖期):\n   ├── 🐦 Chim hót khoe mẽ, tìm bạn đời (求愛行動)\n   ├── 🪺 Đẻ trứng và ấp con trong tổ an toàn\n   └── 🐣 Nuôi con non khôn lớn tiếp nối thế hệ",
        "diagram_caption": "Bản năng mạnh mẽ nhất của mọi sinh vật trên Trái đất",
        "mnemonic": "PHỒN (繁 - phồn thịnh dồi dào) + THỰC (殖 - sinh sôi nảy nở). Sinh sôi nảy nở ngày càng đông đúc.",
        "collocations": [
          {
            "ja": "繁殖期を迎える",
            "furigana": "はんしょくきをむかえる",
            "vn": "Bước vào mùa sinh sản"
          },
          {
            "ja": "細菌が繁殖する",
            "furigana": "さいきんがはんしょくする",
            "vn": "Vi khuẩn sinh sôi nảy nở (trong điều kiện ẩm mốc)"
          }
        ],
        "example": {
          "sentence": "渡[わた]り鳥[どり]たちは暖[あたた]かい春[はる]になると、繁殖[はんしょく]のために北[きた]へ飛[と]び立[た]つ。",
          "translation": "Những đàn chim di cư khi mùa xuân ấm áp đến sẽ bay về phương bắc để sinh sản."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "絶滅",
        "furigana": "ぜつめつ",
        "romaji": "zetsumetsu",
        "han_viet": "TUYỆT DIỆT",
        "meaning_vn": "Tuyệt chủng, bị xóa sổ hoàn toàn khỏi Trái Đất",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Bảo tồn",
        "visual_diagram": "   🦖 KHỦNG LONG (恐竜) ──(Thiên thạch va chạm ☄️)──▶ 絶滅 (Tuyệt diệt)\n   📉 NGUY CƠ HIỆN NAY:\n   ├── 🐼 Gấu trúc, Hổ Siberia, Rùa biển\n   └── ⚠️ 絶滅危惧種 (Loài có nguy cơ tuyệt chủng trong Sách Đỏ)",
        "diagram_caption": "Tác động của con người đang làm tốc độ tuyệt chủng tăng gấp hàng trăm lần bình thường",
        "mnemonic": "TUYỆT (絶 - dứt tuyệt đoạn hẳn) + DIỆT (滅 - tiêu diệt tan biến). Dứt tuyệt không còn một cá thể nào.",
        "collocations": [
          {
            "ja": "絶滅の危機に瀕している",
            "furigana": "ぜつめつのききにひんしている",
            "vn": "Đang đứng trước bờ vực tuyệt chủng"
          },
          {
            "ja": "絶滅危惧種",
            "furigana": "ぜつめつきぐしゅ",
            "vn": "Loài sinh vật quý hiếm có nguy cơ tuyệt chủng"
          }
        ],
        "example": {
          "sentence": "森林[しんりん]伐採[ばっさい]による生息[せいそく]地[ち]の減少[げんしょう]が、多[おお]くの野生[やせい]動物[どうぶつ]を絶滅[ぜつめつ]へと追[お]い込[こ]んでいる。",
          "translation": "Môi trường sống bị thu hẹp do chặt phá rừng đang đẩy nhiều loài động vật hoang dã đến bờ vực tuyệt chủng."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "獲物",
        "furigana": "えもの",
        "romaji": "emono",
        "han_viet": "HOẠCH VẬT",
        "meaning_vn": "Con mồi bị săn bắt",
        "word_type": "Danh từ",
        "tag": "Chuỗi thức ăn",
        "visual_diagram": "   🦁 THÚ SĂN MỒI (捕食者) ────── Đuổi bắt ──────▶ 🦌 獲物 (Con mồi)\n        │                                           │\n        └── Răng nanh, móng vuốt nhọn               └── Chạy nhanh, ngụy trang giấu mình",
        "diagram_caption": "Cuộc rượt đuổi sinh tồn không hồi kết trong tự nhiên",
        "mnemonic": "HOẠCH (獲 - săn bắt được, thu hoạch) + VẬT (物 - con vật). Con vật bị bắt được.",
        "collocations": [
          {
            "ja": "獲物を狙う",
            "furigana": "えものをねらう",
            "vn": "Rình rập nhắm vào con mồi"
          },
          {
            "ja": "獲物を捕らえる",
            "furigana": "えものをつかまえる",
            "vn": "Vồ bắt trọn con mồi"
          }
        ],
        "example": {
          "sentence": "ライオンは草[くさ]むらに隠[かく]れ、静[しず]かに獲物[えもの]に近[ちか]づいていった。",
          "translation": "Con sư tử ẩn mình trong lùm cỏ, lặng lẽ tiến lại gần con mồi."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "捕食",
        "furigana": "ほしょく",
        "romaji": "hoshoku",
        "han_viet": "BỘ THỰC",
        "meaning_vn": "Săn bắt và ăn thịt con mồi",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Hành vi săn mồi",
        "visual_diagram": "   🦉 Cú mèo ──(Bắt và xơi tái con chuột 🐭)──▶ Hành vi này gọi là 捕食 (ほしょく)",
        "diagram_caption": "Giúp kiểm soát số lượng các loài bên dưới, giữ cân bằng sinh thái",
        "mnemonic": "BỘ (捕 - bắt giữ) + THỰC (食 - ăn thịt). Bắt lấy rồi ăn thịt.",
        "collocations": [
          {
            "ja": "小魚を捕食する",
            "furigana": "こざかなをほしょくする",
            "vn": "Săn bắt cá nhỏ làm thức ăn"
          },
          {
            "ja": "捕食動物",
            "furigana": "ほしょくどうぶつ",
            "vn": "Động vật ăn thịt săn mồi"
          }
        ],
        "example": {
          "sentence": "猛禽[もうきん]類[るい]のワシは、上空[じょうくう]から地表[ちひょう]の小[ちい]さな動物[どうぶつ]を見[み]つけて捕食[ほしょく]する。",
          "translation": "Loài chim săn mồi đại bàng phát hiện động vật nhỏ trên mặt đất từ trên cao rồi lao xuống bắt ăn thịt."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "縄張り",
        "furigana": "なわばり",
        "romaji": "nawabari",
        "han_viet": "THẰNG TRƯƠNG",
        "meaning_vn": "Lãnh thổ riêng, địa bàn con vật đánh dấu để bảo vệ",
        "word_type": "Danh từ",
        "tag": "Hành vi động vật",
        "visual_diagram": "   🐾 ĐÁNH DẤU LÃNH THỔ (縄張り):\n   ├── 🐕 Chó mèo: Đi tiểu hoặc cọ mùi cơ thể lên góc cây (マーキング)\n   ├── 🐅 Hổ báo: Cào móng lên thân cây to để dọa đối thủ\n   └── ⛔ Kẻ lạ xâm phạm ──▶ Tấn công quyết liệt bảo vệ địa bàn!",
        "diagram_caption": "Cũng dùng trong đời sống con người nghĩa bóng: 'Địa bàn hoạt động của một băng nhóm/cửa hàng'",
        "mnemonic": "THẰNG (縄 - dây thừng) + TRƯƠNG (張 - chăng ra). Như giăng dây thừng khoanh vùng đất cấm.",
        "collocations": [
          {
            "ja": "縄張りを主張する",
            "furigana": "なわばりをしゅちょうする",
            "vn": "Tuyên bố chủ quyền lãnh thổ"
          },
          {
            "ja": "縄張りを争う",
            "furigana": "なわばりをあらそう",
            "vn": "Tranh giành địa bàn lãnh thổ"
          }
        ],
        "example": {
          "sentence": "オス猫[ねこ]は自分[じぶん]の縄張[なわば]りを守[まも]るために、周囲[しゅうい]の壁[かべ]ににおいを残[のこ]す。",
          "translation": "Mèo đực đánh dấu mùi hương lên các bức tường xung quanh để bảo vệ lãnh thổ của mình."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "越冬",
        "furigana": "えっとう",
        "romaji": "ettou",
        "han_viet": "VIỆT ĐÔNG",
        "meaning_vn": "Trú đông, vượt qua mùa đông giá rét (ngủ đông hoặc di cư)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Thích nghi thời tiết",
        "visual_diagram": "   ❄️ MÙA ĐÔNG GIÁ LẠNH KHẮC NGHIỆT:\n   ├── 🐻 冬眠 (とうみん - Gấu ngủ đông trong hang suốt 4 tháng không ăn)\n   └── 🦆 渡り鳥 (わたりどり - Đàn vịt trời bay về phương Nam ấm áp trú đông)",
        "diagram_caption": "Chiến lược sinh tồn phi thường của muôn loài trước cái lạnh âm độ",
        "mnemonic": "VIỆT (越 - vượt qua) + ĐÔNG (冬 - mùa đông). Vượt qua mùa đông lạnh giá an toàn.",
        "collocations": [
          {
            "ja": "南の島で越冬する",
            "furigana": "みなみのしまでえっとうする",
            "vn": "Tránh rét qua mùa đông tại đảo phương nam"
          },
          {
            "ja": "越冬用の食料",
            "furigana": "えっとうようのしょくりょう",
            "vn": "Lương thực tích trữ để ăn qua mùa đông"
          }
        ],
        "example": {
          "sentence": "クマは秋[あき]のうちに木[き]の実[み]を大量[たいりょう]に食[た]べて脂肪[しぼう]を蓄[たくわ]え、洞窟[どうくつ]で越冬[えっとう]する。",
          "translation": "Loài gấu vào mùa thu ăn lượng lớn quả hạch để tích mỡ, rồi chui vào hang trú đông."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "飼育",
        "furigana": "しいく",
        "romaji": "shiiku",
        "han_viet": "TỰ DỤC",
        "meaning_vn": "Chăm sóc, nuôi dưỡng động vật (thú cưng, vật nuôi, sở thú)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Nuôi dưỡng",
        "visual_diagram": "   🏠 NUÔI DƯỠNG (飼育):\n   ├── 🐶 Nuôi chó mèo cưng trong nhà (ペットの飼育)\n   └── 🦒 Chăm sóc thú trong sở thú (動物園の飼育員さん: Cho ăn, dọn chuồng, chữa bệnh)",
        "diagram_caption": "Tại Nhật Bản muốn nuôi chó mèo phải đăng ký mã chip điện tử gắn dưới da",
        "mnemonic": "TỰ (飼 - cho ăn, chăn nuôi) + DỤC (育 - nuôi nấng dạy dỗ). Chăm sóc cho ăn và nuôi khôn lớn.",
        "collocations": [
          {
            "ja": "動物園の飼育員",
            "furigana": "どうぶつえんのしいくいん",
            "vn": "Nhân viên chăm sóc động vật ở sở thú"
          },
          {
            "ja": "ペットの正しい飼育方法",
            "furigana": "ペットのただしいしいくほうほう",
            "vn": "Phương pháp nuôi thú cưng đúng cách"
          }
        ],
        "example": {
          "sentence": "このマンションでは、近隣[きんりん]への配慮[はいりょ]から大型[おおがた]ペットの飼育[しいく]が禁止[きんし]されている。",
          "translation": "Tại chung cư này, để tránh làm phiền hàng xóm xung quanh, việc nuôi thú cưng kích thước lớn bị nghiêm cấm."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "野生",
        "furigana": "やせい",
        "romaji": "yasei",
        "han_viet": "DÃ SINH",
        "meaning_vn": "Hoang dã, tự nhiên (không được thuần hóa)",
        "word_type": "Danh từ / Mang tính bổ nghĩa",
        "tag": "Tự nhiên",
        "visual_diagram": "   🌲 野生 (Hoang dã ngoài rừng)    vs    🏠 飼育 (Được nuôi nhốt trong nhà)\n   ├── Tự kiếm ăn độc lập              ├── Được con người cho ăn đồ hộp\n   └── Bản năng sinh tồn nhạy bén      └── Mất dần khả năng săn mồi",
        "diagram_caption": "Động vật hoang dã Nhật Bản như khỉ tuyết onsen hay hươu Nara rất nổi tiếng",
        "mnemonic": "DÃ (野 - đồng hoang ngoài đồng) + SINH (生 - sinh sôi). Sinh trưởng tự do ngoài chốn đồng hoang dã.",
        "collocations": [
          {
            "ja": "野生動物",
            "furigana": "やせいどうぶつ",
            "vn": "Động vật hoang dã"
          },
          {
            "ja": "野生に戻す",
            "furigana": "やせいにもどす",
            "vn": "Thả động vật sau khi cứu chữa về lại tự nhiên hoang dã"
          }
        ],
        "example": {
          "sentence": "長野県[ながのけん]の山奥[やまおく]では、温泉[おんせん]に浸[つ]かる野生[やせい]のサルを観察[かんさつ]できる。",
          "translation": "Sâu trong núi rừng tỉnh Nagano, bạn có thể quan sát đàn khỉ hoang dã ngâm mình trong suối nước nóng."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "習性",
        "furigana": "しゅうせい",
        "romaji": "shuusei",
        "han_viet": "TẬP TÍNH",
        "meaning_vn": "Thói quen bản năng tự nhiên theo loài",
        "word_type": "Danh từ",
        "tag": "Bản năng",
        "visual_diagram": "   💡 VÍ DỤ TẬP TÍNH BẢN NĂNG (習性):\n   ├── 🐱 Mèo có tập tính thích chui vào hộp giấy chật hẹp\n   ├── 🦇 Dơi có tập tính treo ngược thân mình ngủ ban ngày\n   └── 🐝 Ong có tập tính múa vòng số 8 để báo vị trí hoa mật",
        "diagram_caption": "Không cần ai dạy, sinh ra đã có sẵn trong gen di truyền của loài",
        "mnemonic": "TẬP (習 - lặp đi lặp lại thành thói quen) + TÍNH (性 - tính chất bẩm sinh). Tính nết bản năng tự nhiên.",
        "collocations": [
          {
            "ja": "動物の習性を利用する",
            "furigana": "どうぶつのしゅうせいをりようする",
            "vn": "Vận dụng tập tính bản năng của con vật"
          },
          {
            "ja": "夜行性の習性",
            "furigana": "やこうせいのしゅうせい",
            "vn": "Tập tính hoạt động săn mồi về đêm"
          }
        ],
        "example": {
          "sentence": "鳥[とり]が太陽[たいよう]や星座[せいざ]の位置[いち]を手[て]がかりに飛[と]ぶのは、生[う]まれ持[も]った習性[しゅうせい]である。",
          "translation": "Việc loài chim dựa vào vị trí mặt trời và các chòm sao để định hướng bay là tập tính bản năng bẩm sinh."
        }
      }
    ]
  },
  {
    "topic_id": "topic_15_suc_khoe_phong_benh",
    "title": "Chủ đề 15: Sức khỏe & Thể dục & Phòng bệnh",
    "japanese_title": "健康管理・予防・運動・生活習慣の語彙",
    "description": "Bí quyết sống thọ của người Nhật: phòng chống bệnh tật, duy trì chế độ dinh dưỡng cân bằng và giải tỏa căng thẳng.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "予防",
        "furigana": "よぼう",
        "romaji": "yobou",
        "han_viet": "DỰ PHÒNG",
        "meaning_vn": "Phòng ngừa, phòng bệnh hơn chữa bệnh",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Y tế dự phòng",
        "visual_diagram": "   🛡️ 予防 (Phòng bệnh ── Đơn giản và rẻ tiền hơn chữa bệnh rất nhiều!):\n   ├── 🧼 Rửa tay bằng xà phòng (手洗い)\n   ├── 🚰 Súc họng bằng nước muối (うがい)\n   ├── 😷 Đeo khẩu trang nơi đông người (マスク着用)\n   └── 💉 Tiêm vắc xin cúm mùa thu (インフルエンザ予防接種)",
        "diagram_caption": "Khẩu hiệu quốc dân tại Nhật: 'Te-arai & Ugai' (Rửa tay và súc họng) ngay khi bước chân về nhà",
        "mnemonic": "DỰ (予 - từ trước từ sớm) + PHÒNG (防 - phòng thủ ngăn ngừa). Ngăn chặn mầm mống từ sớm trước khi phát bệnh.",
        "collocations": [
          {
            "ja": "病気を予防する",
            "furigana": "びょうきをよぼうする",
            "vn": "Phòng ngừa bệnh tật"
          },
          {
            "ja": "予防接種を受ける",
            "furigana": "よぼうせっしゅをうける",
            "vn": "Đi tiêm phòng vắc-xin"
          }
        ],
        "example": {
          "sentence": "風邪[かぜ]の予防[よぼう]には、帰宅[きたく]後[ご]の手洗[てあら]いとうがいが最も効果的[こうかてき]だ。",
          "translation": "Để phòng ngừa cảm cúm, rửa tay và súc họng sau khi về nhà là biện pháp hiệu quả nhất."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "免疫力",
        "furigana": "めんえきりょく",
        "romaji": "men'ekiryoku",
        "han_viet": "MIỄN DỊCH LỰC",
        "meaning_vn": "Khả năng miễn dịch, sức đề kháng chống lại mầm bệnh",
        "word_type": "Danh từ",
        "tag": "Sức khỏe sinh học",
        "visual_diagram": "   🛡️ 免疫力 (LÁ CHẮN ĐỀ KHÁNG CỦA CƠ THỂ):\n   ├── 📈 Tăng sức đề kháng: Ngủ đủ 8h, ăn sữa chua/miso lên men, tập thể thao\n   └── 📉 Suy giảm đề kháng: Thức khuya, căng thẳng triền miên ──▶ Vi khuẩn tấn công ngã bệnh ngay!",
        "diagram_caption": "Hệ miễn dịch khỏe mạnh giúp tiêu diệt virus từ khi mới chớm xâm nhập",
        "mnemonic": "MIỄN (免 - miễn trừ) + DỊCH (疫 - dịch bệnh) + LỰC (力 - sức mạnh). Năng lực miễn trừ mọi dịch bệnh.",
        "collocations": [
          {
            "ja": "免疫力を高める",
            "furigana": "めんえきりょくをたかめる",
            "vn": "Nâng cao sức đề kháng cơ thể"
          },
          {
            "ja": "免疫力が低下する",
            "furigana": "めんえきりょくがていかする",
            "vn": "Hệ miễn dịch bị suy giảm sút"
          }
        ],
        "example": {
          "sentence": "栄養[えいよう]のある食事[しょくじ]と十分[じゅうぶん]な睡眠[すいみん]をとることで、免疫力[めんえきりょく]を高[たか]める。",
          "translation": "Bằng việc ăn uống đủ chất dinh dưỡng và ngủ đủ giấc, chúng ta sẽ nâng cao được sức đề kháng."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "睡眠不足",
        "furigana": "すいみんぶそく",
        "romaji": "suimin busoku",
        "han_viet": "THỤY MIÊN BẤT TÚC",
        "meaning_vn": "Thiếu ngủ, ngủ không đủ giấc",
        "word_type": "Danh từ",
        "tag": "Thói quen xấu",
        "visual_diagram": "   🥱 Ngủ dưới 5 tiếng/ngày (睡眠不足):\n   ├── 🧠 Đầu óc lờ đờ, không thể tập trung làm việc hay học hành\n   ├── 🤕 Hay đau đầu chóng mặt\n   └── 📉 Giảm hiệu suất lao động nghiêm trọng",
        "diagram_caption": "Nhật Bản thuộc nhóm quốc gia có thời lượng ngủ trung bình thấp nhất thế giới do làm việc nhiều",
        "mnemonic": "THỤY MIÊN (睡眠 - giấc ngủ ngon) + BẤT TÚC (不足 - không đầy đủ, thiếu hụt).",
        "collocations": [
          {
            "ja": "睡眠不足が続く",
            "furigana": "すいみんぶそくがつづく",
            "vn": "Tình trạng thiếu ngủ kéo dài liên miên"
          },
          {
            "ja": "睡眠不足を解消する",
            "furigana": "すいみんぶそくをかいしょうする",
            "vn": "Giải quyết tình trạng thiếu ngủ bằng giấc ngủ bù sâu"
          }
        ],
        "example": {
          "sentence": "連日[れんじつ]の残業[ざんぎょう]で睡眠[すいみん]不足[ぶそく]になり、電車[でんしゃ]の中[なか]で居眠[いねむ]りしてしまった。",
          "translation": "Vì tăng ca nhiều ngày liên tiếp bị thiếu ngủ nên tôi đã ngủ gật luôn trên tàu điện."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "栄養バランス",
        "furigana": "えいようバランス",
        "romaji": "eiyou baransu",
        "han_viet": "VINH DƯỠNG CÂN BẰNG",
        "meaning_vn": "Cân bằng dinh dưỡng trong khẩu phần ăn",
        "word_type": "Cụm danh từ",
        "tag": "Dinh dưỡng",
        "visual_diagram": "   🍱 BỮA CƠM CHUẨN NHẬT: 一汁三菜 (1 bát canh + 3 món ăn kèm):\n   ├── 🍚 Tinh bột: Cơm gạo lứt/gạo trắng (炭水化物)\n   ├── 🐟 Đạm: Cá hồi nướng / đậu phụ / thịt nạc (タンパク質)\n   ├── 🥗 Vitamin & Khoáng: Rau củ luộc, salad rong biển\n   └── 🍲 Canh Miso bổ sung lợi khuẩn đường ruột",
        "diagram_caption": "Bí quyết giúp người Nhật Bản có tuổi thọ trung bình cao nhất thế giới",
        "mnemonic": "VINH DƯỠNG (栄養) + BALANCE (cân bằng). Cân đối đầy đủ các nhóm chất.",
        "collocations": [
          {
            "ja": "栄養バランスを考える",
            "furigana": "えいようバランスをかんがえる",
            "vn": "Cân nhắc cân đối dinh dưỡng khi nấu ăn"
          },
          {
            "ja": "栄養が偏る",
            "furigana": "えいようがかたよる",
            "vn": "Dinh dưỡng bị lệch (chỉ ăn mì tôm, thiếu rau)"
          }
        ],
        "example": {
          "sentence": "外食[がいしょく]ばかりだと栄養[えいよう]バランスが崩[くず]れやすいので、自炊[じすい]を増[ふ]やしている。",
          "translation": "Nếu chỉ toàn ăn ngoài thì rất dễ mất cân bằng dinh dưỡng nên tôi đang tăng cường tự nấu ăn ở nhà."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "運動不足",
        "furigana": "うんどうぶそく",
        "romaji": "undou busoku",
        "han_viet": "VẬN ĐỘNG BẤT TÚC",
        "meaning_vn": "Lười vận động, thiếu rèn luyện thể chất",
        "word_type": "Danh từ",
        "tag": "Thể chất",
        "visual_diagram": "   🪑 Sáng ngồi văn phòng ── Chiều ngồi tàu ── Tối nằm xem điện thoại\n   ==▶ 運動不足 (Thiếu vận động) ──▶ Lên cân, đau mỏi lưng vai gáy\n   GIẢI PHÁP:\n   🚶 Đi bộ 8,000 bước mỗi ngày / Đi cầu thang bộ thay thang máy",
        "diagram_caption": "Căn bệnh thời đại của dân văn phòng IT và học sinh thi cử",
        "mnemonic": "VẬN ĐỘNG (運動 - thể dục thể thao) + BẤT TÚC (不足 - thiếu thốn).",
        "collocations": [
          {
            "ja": "運動不足を解消する",
            "furigana": "うんどうぶそくをかいしょうする",
            "vn": "Giải tỏa tình trạng lười vận động bằng việc tập gym/chạy bộ"
          },
          {
            "ja": "日頃の運動不足",
            "furigana": "ひごろのうんどうぶそく",
            "vn": "Sự thiếu vận động thường ngày"
          }
        ],
        "example": {
          "sentence": "最近[さいきん]太[ふと]ってきたのは、明[あき]らかに日頃[ひごろ]の運動[うんどう]不足[ぶそく]が原因[げんいん]だ。",
          "translation": "Gần đây tôi bị béo lên rõ ràng là do nguyên nhân lười vận động thường ngày."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "疲労回復",
        "furigana": "ひろうかいふく",
        "romaji": "hirou kaifuku",
        "han_viet": "BÌ LAO HỒI PHỤC",
        "meaning_vn": "Hồi phục thể lực, giải tỏa mệt mỏi sau ngày dài",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Phục hồi năng lượng",
        "visual_diagram": "   🔋 THỂ LỰC CẠN KIỆT (0%) ──(PHỤC HỒI THỂ LỰC)──▶ ĐẦY PIN (100%)\n   ├── 🛁 Ngâm bồn nước ấm 40°C trong 15 phút (湯船に浸かる)\n   ├── 🍋 Bổ sung vitamin C và axit citric (nước chanh, mơ ngâm umeboshi)\n   └── 🛌 Đi ngủ sớm trước 23h trong phòng tối mát mẻ",
        "diagram_caption": "Ngâm bồn nước ấm mỗi tối là cách người Nhật phục hồi thể lực sau ngày làm việc căng thẳng",
        "mnemonic": "BÌ LAO (疲労 - mệt mỏi lao lực) + HỒI PHỤC (回復 - lấy lại trạng thái ban đầu).",
        "collocations": [
          {
            "ja": "疲労回復に効果がある",
            "furigana": "ひろうかいふくにこうかがある",
            "vn": "Có hiệu quả hồi phục thể lực tốt"
          },
          {
            "ja": "疲労が蓄積する",
            "furigana": "ひろうがちくせきする",
            "vn": "Mệt mỏi tích tụ dồn nén lâu ngày"
          }
        ],
        "example": {
          "sentence": "熱[あつ]いお風呂[ふろ]にゆっくり浸[つ]かることは、疲労[ひろう]回復[かいふく]にとても役立[やくだ]つ。",
          "translation": "Ngâm mình thong thả trong bồn tắm nước ấm rất có ích cho việc hồi phục thể lực giải tỏa mệt mỏi."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "健康診断",
        "furigana": "けんこうしんだん",
        "romaji": "kenkou shindan",
        "han_viet": "KIỆN KHANG CHẨN ĐOÁN",
        "meaning_vn": "Khám sức khỏe tổng quát định kỳ (hàng năm)",
        "word_type": "Danh từ",
        "tag": "Kiểm tra định kỳ",
        "visual_diagram": "   📋 CÁC HẠNG MỤC KHÁM SỨC KHỎE ĐỊNH KỲ TẠI NHẬT:\n   ├── 📏 Chiều cao, cân nặng, thị lực, thính lực\n   ├── 🩸 Xét nghiệm máu, nước tiểu (đường huyết, mỡ máu)\n   ├── 🩻 Chụp X-quang phổi (胸部レントゲン)\n   └── 💓 Đo huyết áp và điện tâm đồ",
        "diagram_caption": "Theo luật lao động Nhật, mọi trường học và công ty bắt buộc phải tổ chức khám định kỳ 1 năm 1 lần",
        "mnemonic": "KIỆN KHANG (健康 - sức khỏe an khang) + CHẨN ĐOÁN (診断 - khám xét đánh giá).",
        "collocations": [
          {
            "ja": "定期健康診断を受ける",
            "furigana": "ていきけんこうしんだんをうける",
            "vn": "Tham gia khám sức khỏe định kỳ"
          },
          {
            "ja": "健診結果",
            "furigana": "けんしんけっか",
            "vn": "Phiếu kết quả khám sức khỏe gửi về nhà"
          }
        ],
        "example": {
          "sentence": "会社[かいしゃ]の健康[けんこう]診断[しんだん]で血圧[けつあつ]が高[たか]いと指摘[してき]され、生活[せいかつ]を見直[みなお]した。",
          "translation": "Trong đợt khám sức khỏe của công ty bị nhắc nhở là huyết áp cao nên tôi đã xem lại thói quen sinh hoạt."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "改善",
        "furigana": "かいぜん",
        "romaji": "kaizen",
        "han_viet": "CẢI THIỆN",
        "meaning_vn": "Cải thiện, làm cho tốt hơn (thói quen, quy trình, kết quả)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Phát triển",
        "visual_diagram": "   ❌ Thói quen xấu: Ăn đêm, lười thể dục, thức khuya\n        │\n        └── 🚀 改善 (Cải thiện liên tục từng bước nhỏ mỗi ngày):\n            └── ⭕ Thói quen tốt: Ăn đúng bữa, đi bộ mỗi ngày, ngủ sớm dậy sớm",
        "diagram_caption": "Triết lý 'KAIZEN' nổi tiếng toàn cầu của tập đoàn Toyota: Luôn cải tiến để tốt hơn mỗi ngày",
        "mnemonic": "CẢI (改 - sửa đổi) + THIỆN (善 - tốt đẹp hơn). Sửa đổi cho ngày càng hướng đến điều tốt đẹp.",
        "collocations": [
          {
            "ja": "生活習慣を改善する",
            "furigana": "せいかつしゅうかんをかいぜんする",
            "vn": "Cải thiện thói quen sinh hoạt hàng ngày"
          },
          {
            "ja": "体質の改善",
            "furigana": "たいしつのかいぜん",
            "vn": "Cải thiện thể chất cơ địa"
          }
        ],
        "example": {
          "sentence": "食生活[しょくせいかつ]を改善[かいぜん]したところ、体調[たいちょう]が劇的[げきてき]に良[よ]くなった。",
          "translation": "Sau khi cải thiện thói quen ăn uống, tình trạng sức khỏe của tôi đã tốt lên một cách rõ rệt."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "維持",
        "furigana": "いじ",
        "romaji": "iji",
        "han_viet": "DUY TRÌ",
        "meaning_vn": "Duy trì, giữ vững phong độ ổn định không để tụt dốc",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Phong độ",
        "visual_diagram": "   🏆 Đạt được vóc dáng chuẩn / Sức khỏe tốt (50kg)\n        │\n        └── 🔒 維持する (Duy trì đều đặn):\n            └── Ngày nào cũng ăn uống điều độ để giữ nguyên mức cân lý tưởng",
        "diagram_caption": "Đạt được thành quả đã khó, nhưng duy trì giữ vững nó lâu dài còn đòi hỏi kỷ luật cao hơn",
        "mnemonic": "DUY (維 - giềng mối dây buộc) + TRÌ (持 - giữ chặt). Buộc chặt giữ vững không để lung lay.",
        "collocations": [
          {
            "ja": "健康を維持する",
            "furigana": "けんこうをいじする",
            "vn": "Duy trì giữ gìn sức khỏe dẻo dai"
          },
          {
            "ja": "現状を維持する",
            "furigana": "げんじょうをいじする",
            "vn": "Duy trì hiện trạng ổn định"
          }
        ],
        "example": {
          "sentence": "年齢[ねんれい]を重[かさ]ねても若[わか]々しさを維持[いじ]するために、毎日[まいにち]の筋[きん]トレを欠[か]かさない。",
          "translation": "Để duy trì sự trẻ trung dù tuổi tác tăng lên, tôi không bao giờ bỏ tập thể hình mỗi ngày."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "ストレス解消",
        "furigana": "ストレスかいしょう",
        "romaji": "sutoresu kaishou",
        "han_viet": "XẢ STRESS / GIẢI TỎA CĂNG THẲNG",
        "meaning_vn": "Giải tỏa căng thẳng áp lực tinh thần một cách lành mạnh",
        "word_type": "Cụm danh từ / Động từ nhóm 3",
        "tag": "Sức khỏe tinh thần",
        "visual_diagram": "   🤯 STRESS TÍCH TỤ ĐẦY ĐẦU (ストレス蓄積):\n   ├── 🎤 Hát Karaoke hét thật to xả hơi (カラオケで熱唱)\n   ├── 🏃 Chạy bộ toát mồ hôi giải phóng endorphin\n   ├── 🌲 Đi dạo công viên hít thở không khí cây xanh\n   └── 🍰 Thưởng thức một món bánh ngọt yêu thích cuối tuần",
        "diagram_caption": "Kỹ năng sống còn để cân bằng công việc và cuộc sống (Work-Life Balance) tại Nhật",
        "mnemonic": "Stress (áp lực thần kinh) + GIẢI TIÊU (解消 - giải trừ làm biến mất).",
        "collocations": [
          {
            "ja": "ストレスを発散する",
            "furigana": "ストレスをはっさんする",
            "vn": "Xả bỏ bung tỏa bớt căng thẳng"
          },
          {
            "ja": "ストレスが溜まる",
            "furigana": "ストレスがたまる",
            "vn": "Căng thẳng áp lực bị dồn ứ lại trong người"
          }
        ],
        "example": {
          "sentence": "休[やす]みの日に趣味[しゅみ]のドライブに出[で]かけることが、最高[さいこう]のストレス解消[かいしょう]法[ほう]だ。",
          "translation": "Vào ngày nghỉ được lái xe đi hóng gió theo sở thích chính là phương pháp giải tỏa stress tuyệt vời nhất của tôi."
        }
      }
    ]
  },
  {
    "topic_id": "topic_16_nau_an_han_thuc_pham",
    "title": "Chủ đề 16: Nấu ăn & Nguyên liệu & An toàn thực phẩm",
    "japanese_title": "料理・調味料・賞味期限・食品安全の語彙",
    "description": "Phân biệt 2 loại hạn sử dụng trên bao bì thực phẩm Nhật, kỹ thuật chế biến món ăn và văn hóa ẩm thực truyền thống.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "賞味期限",
        "furigana": "しょうみきげん",
        "romaji": "shoumikigen",
        "han_viet": "THƯỞNG VỊ KỲ HẠN",
        "meaning_vn": "Hạn ngon nhất (quá hạn vài ngày vẫn ăn được nếu bảo quản tốt)",
        "word_type": "Danh từ",
        "tag": "Hạn sử dụng",
        "visual_diagram": "   🏷️ SO SÁNH 2 LOẠI HẠN DÙNG TRÊN HÀNG HÓA NHẬT:\n   ├── 😋 賞味期限 (THƯỞNG VỊ: Đảm bảo độ ngon chuẩn nhất ── Hết hạn vẫn ăn an toàn: mì gói, đồ hộp, bánh kẹo)\n   └── ⚠️ 消費期限 (TIÊU PHÍ: Đảm bảo an toàn vệ sinh ── HẾT HẠN PHẢI VỨT NGAY: cơm hộp, sushi, thịt cá tươi)",
        "diagram_caption": "Bẫy từ vựng đọc hiểu N3 kinh điển: Đừng nhầm lẫn giữa hạn 'Ngon nhất' và hạn 'An toàn'",
        "mnemonic": "THƯỞNG VỊ (賞味 - thưởng thức vị ngon) + KỲ HẠN (期限). Hạn thưởng thức trọn vẹn hương vị.",
        "collocations": [
          {
            "ja": "賞味期限が切れる",
            "furigana": "しょうみきげんがきれる",
            "vn": "Hết hạn thưởng vị"
          },
          {
            "ja": "賞味期限間近で割引",
            "furigana": "しょうみきげんまぢかでわりびき",
            "vn": "Giảm giá mạnh do gần hết hạn thưởng vị"
          }
        ],
        "example": {
          "sentence": "缶詰[かんづめ]は賞味[しょうみ]期限[きげん]が切[き]れても、すぐ食[た]べられなくなるわけではない。",
          "translation": "Đồ hộp dù có quá hạn thưởng vị đi chăng nữa cũng không hẳn là lập tức không thể ăn được."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "消費期限",
        "furigana": "しょうひきげん",
        "romaji": "shouhikigen",
        "han_viet": "TIÊU PHÍ KỲ HẠN",
        "meaning_vn": "Hạn dùng an toàn (quá hạn tuyệt đối không được ăn vì nguy hiểm)",
        "word_type": "Danh từ",
        "tag": "An toàn thực phẩm",
        "visual_diagram": "   🍱 BENTO SIÊU THỊ / THỊT CÁ TƯƠI:\n   ├── In dòng chữ: 「消費期限 2026.10.16 23:00」\n   └── 🚫 Quá giờ quy định ──▶ Vi khuẩn sinh sôi, nguy cơ ngộ độc thực phẩm cao, BẮT BUỘC VỨT BỎ!",
        "diagram_caption": "Dành riêng cho các thực phẩm tươi sống dễ ôi thiu trong vòng dưới 5 ngày",
        "mnemonic": "TIÊU PHÍ (消費 - tiêu thụ dùng hết) + KỲ HẠN (期限). Hạn chót bắt buộc phải tiêu thụ xong.",
        "collocations": [
          {
            "ja": "消費期限を守る",
            "furigana": "しょうひきげんをまもる",
            "vn": "Tuân thủ nghiêm ngặt hạn dùng an toàn"
          },
          {
            "ja": "食中毒を防ぐ",
            "furigana": "しょくちゅうどくをふせぐ",
            "vn": "Phòng chống ngộ độc thực phẩm"
          }
        ],
        "example": {
          "sentence": "生魚[なまざかな]やお弁当[べんとう]は傷[いた]みやすいので、消費[しょうひ]期限[きげん]内[ない]に食[た]べ切[き]る。",
          "translation": "Cá tươi và cơm hộp rất dễ ôi hỏng nên hãy ăn hết trong thời hạn sử dụng an toàn."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "調味料",
        "furigana": "ちょうみりょう",
        "romaji": "choumiryou",
        "han_viet": "ĐIỀU VỊ LIỆU",
        "meaning_vn": "Gia vị nêm nếm khi nấu ăn",
        "word_type": "Danh từ",
        "tag": "Gia vị ẩm thực",
        "visual_diagram": "   🧂 QUY TẮC NÊM GIA VỊ KINH ĐIỂN CỦA ĐẦU BẾP NHẬT: 「さ・し・す・せ・そ」\n   ├── さ: 🍬 砂糖 (さとう - Đường: Cho vào đầu tiên để ngấm ngọt)\n   ├── し: 🧂 塩 (しお - Muối: Hút bớt nước, làm săn chắc)\n   ├── す: 🍶 酢 (す - Giấm: Tạo độ chua thanh)\n   ├── せ: 🫘 醤油 (しょうゆ - Xì dầu: Giữ hương thơm đậu nành)\n   └── そ: 🍲 味噌 (みそ - Tương Miso: Cho vào cuối cùng để không bay mùi)",
        "diagram_caption": "Mẹo nhớ thần thánh 5 chữ cái tiếng Nhật về thứ tự nêm gia vị chuẩn truyền thống",
        "mnemonic": "ĐIỀU (調 - điều hòa, nêm nếm) + VỊ (味 - mùi vị) + LIỆU (料 - nguyên liệu). Nguyên liệu để điều hòa hương vị.",
        "collocations": [
          {
            "ja": "調味料を加える",
            "furigana": "ちょうみりょうをくわえる",
            "vn": "Thêm gia vị vào món ăn"
          },
          {
            "ja": "基本の調味料",
            "furigana": "きほんのちょうみりょう",
            "vn": "Các loại gia vị cơ bản trong gian bếp"
          }
        ],
        "example": {
          "sentence": "日本[にほん]料理[りょうり]の味付[あじつ]けには、醤油[しょうゆ]やみりんなどの調味料[ちょうみりょう]が欠[か]かせない。",
          "translation": "Để nêm nếm cho các món ăn Nhật Bản, những gia vị như xì dầu hay rượu mirin là không thể thiếu."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "煮る・焼く・炒める・蒸す",
        "furigana": "にる・やく・いため・むす",
        "romaji": "niru / yaku / itameru / musu",
        "han_viet": "CHỬ / THIÊU / SAO / CHƯNG",
        "meaning_vn": "4 phương pháp nấu nướng: Kho ninh / Nướng / Xào / Hấp",
        "word_type": "Động từ",
        "tag": "Kỹ thuật nấu nướng",
        "visual_diagram": "   🍳 4 CÁCH CHẾ BIẾN NẤU NƯỚNG:\n   ├── 🍲 煮る (Kho, ninh trong nước canh: Thịt kho khoai tây 肉じゃが)\n   ├── 🥩 焼く (Nướng trên lửa/chảo: Cá nướng 焼き魚, thịt nướng 焼肉)\n   ├── 🥢 炒める (Xào nhanh đảo đều với ít dầu: Rau xào 野菜炒め)\n   └── 🥟 蒸す (Hấp cách thủy bằng hơi nước: Bánh bao hấp 中華まん)",
        "diagram_caption": "Bộ 4 động từ xuất hiện liên tục trong đề thi phần hướng dẫn công thức nấu ăn",
        "mnemonic": "CHỬ (ninh kho ngập nước) - THIÊU (đốt nướng lửa) - SAO (xào đảo chảo) - CHƯNG (hấp hơi nước bốc lên).",
        "collocations": [
          {
            "ja": "弱火でじっくり煮る",
            "furigana": "よわびでじっくりにる",
            "vn": "Ninh kỹ liu riu bằng lửa nhỏ"
          },
          {
            "ja": "強火で手早く炒める",
            "furigana": "つよびでてばやくいためる",
            "vn": "Xào nhanh tay bằng lửa to"
          }
        ],
        "example": {
          "sentence": "野菜[やさい]とお肉[にく]を強火[つよび]でサッと炒[いた]めてから、調味料[ちょうみりょう]を入れて弱火[よわび]で煮[に]る。",
          "translation": "Xào nhanh rau củ và thịt bằng lửa to, sau đó cho gia vị vào rồi ninh bằng lửa nhỏ."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "保存方法",
        "furigana": "ほぞんほうほう",
        "romaji": "hozon houhou",
        "han_viet": "BẢO TỒN PHƯƠNG PHÁP",
        "meaning_vn": "Cách thức bảo quản thực phẩm (nơi mát, ngăn mát, ngăn đá)",
        "word_type": "Danh từ",
        "tag": "Chỉ dẫn nhãn mác",
        "visual_diagram": "   ❄️ CÁC CÁCH BẢO QUẢN IN TRÊN BAO BÌ:\n   ├── 🛖 常温保存 (Bảo quản nhiệt độ phòng, nơi thoáng mát tránh ánh nắng trực tiếp)\n   ├── 🧊 冷蔵保存 (10°C以下 - Bảo quản trong ngăn mát tủ lạnh)\n   └── ❄️ 冷凍保存 (-18°C以下 - Bảo quản trong ngăn đá đông lạnh)",
        "diagram_caption": "Bảo quản đúng cách giúp giữ trọn vitamin và hương vị tươi ngon",
        "mnemonic": "BẢO TỒN (保存 - giữ nguyên tồn tại) + PHƯƠNG PHÁP (方法 - cách thức). Cách thức gìn giữ đồ đạc thực phẩm.",
        "collocations": [
          {
            "ja": "直射日光を避けて保存する",
            "furigana": "ちょくしゃにっこうをさけてほぞんする",
            "vn": "Bảo quản tránh ánh nắng rọi trực tiếp"
          },
          {
            "ja": "開封後は要冷蔵",
            "furigana": "かいふうごはようれいぞう",
            "vn": "Sau khi mở nắp bắt buộc phải để ngăn mát tủ lạnh"
          }
        ],
        "example": {
          "sentence": "パッケージに書[か]かれた保存[ほぞん]方法[ほうほう]に従[したが]って、冷蔵庫[れいぞうこ]の野菜室[やさいしつ]に入[い]れた。",
          "translation": "Theo đúng cách thức bảo quản ghi trên bao bì, tôi đã để nó vào ngăn rau củ của tủ lạnh."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "原材料",
        "furigana": "げんざいりょう",
        "romaji": "genzairyou",
        "han_viet": "NGUYÊN TÀI LIỆU",
        "meaning_vn": "Nguyên liệu thành phần làm nên sản phẩm",
        "word_type": "Danh từ",
        "tag": "Thành phần sản phẩm",
        "visual_diagram": "   🏷️ BẢNG THÀNH PHẦN NGUYÊN LIỆU (原材料名):\n   ├── 🌾 Lúa mì (小麦 - Thành phần nhiều nhất ghi đầu tiên)\n   ├── 🧈 Bơ sữa, đường, trứng gà\n   └── 🧪 Phụ gia thực phẩm an toàn (Chất tạo màu, hương liệu)",
        "diagram_caption": "Quy định luật pháp Nhật: Nguyên liệu nào chiếm tỷ trọng lớn nhất bắt buộc phải in đầu tiên",
        "mnemonic": "NGUYÊN (原 - gốc gác) + TÀI LIỆU (材料 - vật liệu). Nguồn gốc vật liệu ban đầu.",
        "collocations": [
          {
            "ja": "国産の原材料にこだわる",
            "furigana": "こくさんのげんざいりょうにこだわる",
            "vn": "Kỹ tính chỉ sử dụng nguyên liệu sản xuất nội địa Nhật"
          },
          {
            "ja": "原材料表示を確認する",
            "furigana": "げんざいりょうひょうじをかくにんする",
            "vn": "Kiểm tra bảng niêm yết thành phần nguyên liệu"
          }
        ],
        "example": {
          "sentence": "健康[けんこう]を気[き]にして、買[か]う前[まえ]に必[かなら]ずお菓子[かし]の原材料[げんざいりょう]名[めい]を確[たし]かめる。",
          "translation": "Để ý đến sức khỏe nên trước khi mua tôi luôn kiểm tra kỹ tên các nguyên liệu thành phần của bánh kẹo."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "腐る",
        "furigana": "くさる",
        "romaji": "kusaru",
        "han_viet": "HỦ",
        "meaning_vn": "Ôi thiu, thối rữa, biến chất bốc mùi",
        "word_type": "Động từ nhóm 1",
        "tag": "Hư hỏng thực phẩm",
        "visual_diagram": "   ☀️ Mùa hè nóng ẩm (夏) ── Để đồ ăn thừa ngoài bàn 1 đêm:\n   ├── 🤢 Bốc mùi chua thối khó chịu\n   ├── 🦠 Mốc trắng mốc xanh sinh sôi nảy nở\n   └── ❌ Đã bị 腐る (くさる - Hỏng thiu) ──▶ Ăn vào sẽ bị ngộ độc nhập viện!",
        "diagram_caption": "Vào mùa hè nóng ẩm Nhật Bản, thức ăn thừa bắt buộc phải cất ngay vào tủ lạnh",
        "mnemonic": "HỦ (腐) trong 'hủ bại, mục nát'. Thịt cá để lâu ngày bị phân hủy biến chất.",
        "collocations": [
          {
            "ja": "食べ物が腐る",
            "furigana": "たべものがくさる",
            "vn": "Đồ ăn bị thiu hỏng"
          },
          {
            "ja": "腐りやすい食品",
            "furigana": "くさりやすいしょくひん",
            "vn": "Thực phẩm rất dễ bị ôi thiu"
          }
        ],
        "example": {
          "sentence": "夏場[なつば]は気温[きおん]が高[たか]く料理[りょうり]が腐[くさ]りやすいので、すぐに冷蔵庫[れいぞうこ]へ仕舞[しま]う。",
          "translation": "Vào mùa hè nhiệt độ cao món ăn rất dễ bị ôi thiu nên hãy cất ngay vào tủ lạnh."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "解凍",
        "furigana": "かいとう",
        "romaji": "kaitou",
        "han_viet": "GIẢI ĐỐNG",
        "meaning_vn": "Rã đông đồ ăn đông lạnh",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Sơ chế món ăn",
        "visual_diagram": "   🧊 ĐỒ ĐÔNG LẠNH ĐÓNG BĂNG (-18°C)\n        │\n        └── 💧 解凍 (Rã đông):\n            ├── 📻 Cho vào lò vi sóng bấm chế độ: 「解凍モード」\n            └── 🧊 Chuyển từ ngăn đá xuống ngăn mát để tan đá từ từ (Giữ thịt ngọt ngon nhất)",
        "diagram_caption": "Nút '解凍' (Rã đông) xuất hiện trên 100% các bảng điều khiển lò vi sóng ở Nhật",
        "mnemonic": "GIẢI (解 - giải tỏa cởi mở) + ĐỐNG (凍 - đông đá). Cởi bỏ lớp băng đông đá để mềm ra.",
        "collocations": [
          {
            "ja": "電子レンジで解凍する",
            "furigana": "でんしレンジでかいとうする",
            "vn": "Rã đông bằng lò vi sóng"
          },
          {
            "ja": "自然解凍",
            "furigana": "しぜんかいとう",
            "vn": "Rã đông tự nhiên ở nhiệt độ phòng"
          }
        ],
        "example": {
          "sentence": "冷凍[れいとう]庫[こ]から出[だ]したお肉[にく]を、電子[でんし]レンジの解凍[かいとう]機能[きのう]で温[あたた]めた。",
          "translation": "Tôi đã dùng tính năng rã đông của lò vi sóng để làm mềm miếng thịt lấy từ ngăn đá ra."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "刻む",
        "furigana": "きざむ",
        "romaji": "kizamu",
        "han_viet": "KHẮC",
        "meaning_vn": "Thái nhỏ, băm nhỏ rau củ (thái hành, băm tỏi)",
        "word_type": "Động từ nhóm 1",
        "tag": "Kỹ thuật sơ chế",
        "visual_diagram": "   🔪 CÁC CÁCH CẮT GỌT RAU CỦ TRONG BẾP:\n   ├── 🧅 刻む (きざむ - Thái nhỏ băm vụn: Hành hoa tây, tỏi ớt)\n   ├── 🥕 乱切り (らんぎり - Cắt xéo khúc to hầm canh)\n   └── 🥔 千切り (せんぎり - Thái sợi mỏng làm salad bắp cải)",
        "diagram_caption": "Thái hành hoa mỏng bỏ lên tô mì ramen là hình ảnh quen thuộc",
        "mnemonic": "KHẮC (刻 - khắc ghi, băm thái nhuyễn). Lưỡi dao băm nhuyễn liên hồi trên thớt gỗ.",
        "collocations": [
          {
            "ja": "ネギを細かく刻む",
            "furigana": "ネギをこまかくきざむ",
            "vn": "Thái hành hoa thật nhỏ nhuyễn"
          },
          {
            "ja": "心に刻む",
            "furigana": "こころにきざむ",
            "vn": "Nghĩa bóng: Khắc cốt ghi tâm lời dạy"
          }
        ],
        "example": {
          "sentence": "まな板[いた]の上[うえ]で包丁[ほうちょう]を使[つか]って、薬味[やくみ]のネギを細[こま]かく刻[きざ]んだ。",
          "translation": "Dùng dao thái trên thớt, tôi đã băm thật nhỏ rau hành gia vị."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "レシピ",
        "furigana": "レシピ",
        "romaji": "reshipi",
        "han_viet": "CÔNG THỨC NẤU ĂN",
        "meaning_vn": "Công thức nấu ăn, các bước hướng dẫn làm món",
        "word_type": "Danh từ",
        "tag": "Học nấu ăn",
        "visual_diagram": "   📱 BẢN CÔNG THỨC NẤU ĂN (レシピ - Cookpad / Kurashiru):\n   ├── 🥩 材料 (Nguyên liệu: Thịt 200g, hành tây 1 củ)\n   ├── 🧂 調味料 (Gia vị: 2 thìa xì dầu, 1 thìa đường)\n   └── 👨‍🍳 作り方 (Quy trình: Bước 1 ── Bước 2 ── Bước 3)",
        "diagram_caption": "Bắt nguồn từ tiếng Anh Recipe. Giúp người vụng về cũng nấu được món ngon chuẩn vị",
        "mnemonic": "Từ mượn Recipe (công thức món ăn).",
        "collocations": [
          {
            "ja": "レシピ通りに作る",
            "furigana": "レシピどおりにつくる",
            "vn": "Nấu chuẩn xác y hệt theo công thức"
          },
          {
            "ja": "人気のレシピサイト",
            "furigana": "にんきのレシピサイト",
            "vn": "Trang web chia sẻ công thức nấu ăn được yêu thích"
          }
        ],
        "example": {
          "sentence": "初[はじ]めて作[つく]る日本[にほん]料理[りょうり]だったので、アプリのレシピをよく見[み]ながら作[つく]った。",
          "translation": "Vì là lần đầu tiên nấu món ăn Nhật nên tôi vừa xem kỹ công thức trên ứng dụng vừa làm."
        }
      }
    ]
  },
  {
    "topic_id": "topic_17_smartphone_song_so",
    "title": "Chủ đề 17: Smartphone & Mạng xã hội & Đời sống số",
    "japanese_title": "スマホ・SNS・デジタル技術の語彙",
    "description": "Các thao tác điện thoại thông minh, bảo mật thông tin cá nhân, mạng xã hội và lối sống số tại Nhật.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "充電",
        "furigana": "じゅうでん",
        "romaji": "juuden",
        "han_viet": "SUNG ĐIỆN",
        "meaning_vn": "Sạc pin điện thoại, nạp điện",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Thiết bị điện tử",
        "visual_diagram": "   🪫 Pin yếu 5% (バッテリー残量わずか)\n        │\n        └── 🔌 Cắm dây cáp 充電器 (Củ sạc) ──▶ 🔋 Đầy pin 100% (充電完了)",
        "diagram_caption": "Tại quán cà phê và tàu Shinkansen ở Nhật luôn có sẵn ổ cắm sạc pin miễn phí",
        "mnemonic": "SUNG (充 - lấp đầy, sung túc) + ĐIỆN (電 - dòng điện). Nạp điện đầy ắp vào pin.",
        "collocations": [
          {
            "ja": "スマホを充電する",
            "furigana": "スマホをじゅうでんする",
            "vn": "Sạc pin điện thoại thông minh"
          },
          {
            "ja": "モバイルバッテリー",
            "furigana": "モバイルバッテリー",
            "vn": "Cục sạc dự phòng mang theo người"
          }
        ],
        "example": {
          "sentence": "外出[がいしゅつ]先[さき]でバッテリーが切[き]れないように、前[まえ]の晩[ばん]にしっかり充電[じゅうでん]しておく。",
          "translation": "Để không bị hết pin khi ra ngoài, tôi đã sạc đầy điện thoại từ tối hôm trước."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "画面",
        "furigana": "がめん",
        "romaji": "gamen",
        "han_viet": "HỌA DIỆN",
        "meaning_vn": "Màn hình (điện thoại, máy tính bảng, tivi)",
        "word_type": "Danh từ",
        "tag": "Giao diện máy",
        "visual_diagram": "   📱 MÀN HÌNH ĐIỆN THOẠI (画面):\n   ├── 👆 画面をタッチする (Chạm vuốt màn hình cảm ứng)\n   ├── 💥 画面が割れる (Rơi từ trên cao xuống làm nứt vỡ kính màn hình)\n   └── 📱 画面保護フィルム (Dán miếng kính cường lực bảo vệ)",
        "diagram_caption": "Bảo vệ màn hình là việc đầu tiên người dùng làm sau khi mua máy mới",
        "mnemonic": "HỌA (画 - bức tranh, hình ảnh) + DIỆN (面 - bề mặt). Bề mặt hiển thị hình ảnh.",
        "collocations": [
          {
            "ja": "画面が割れる / ヒビが入る",
            "furigana": "がめんがわれる / ヒビがはいる",
            "vn": "Màn hình bị nứt vỡ"
          },
          {
            "ja": "画面の明るさを調整する",
            "furigana": "がめんのあかるさをちょうせいする",
            "vn": "Điều chỉnh độ sáng màn hình"
          }
        ],
        "example": {
          "sentence": "歩[ある]きスマホをしていて手[て]が滑[すべ]り、画面[がめん]を割[わ]ってしまった。",
          "translation": "Vừa đi bộ vừa bấm điện thoại trượt tay làm rơi vỡ toang màn hình."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "不具合",
        "furigana": "ふぐあい",
        "romaji": "fuguai",
        "han_viet": "BẤT CỤ HỢP",
        "meaning_vn": "Lỗi kỹ thuật, trục trặc, phần mềm bị đơ/giật lag",
        "word_type": "Danh từ",
        "tag": "Sự cố công nghệ",
        "visual_diagram": "   📱 MÁY ĐANG DÙNG BỖNG NHIÊN:\n   ├── 🥶 Đơ màn hình không bấm được (フリーズする)\n   ├── 🚫 Ứng dụng tự động văng ra ngoài (アプリが落ちる)\n   └── ⚠️ Hệ thống báo: 「不具合が発生しました」(Đã phát sinh sự cố lỗi)",
        "diagram_caption": "Thuật ngữ chuyên ngành IT và dịch vụ hỗ trợ khách hàng tại Nhật",
        "mnemonic": "BẤT (不 - không) + CỤ HỢP (具合 - tình trạng). Tình trạng máy móc không được suôn sẻ.",
        "collocations": [
          {
            "ja": "システムに不具合が生じる",
            "furigana": "システムにふぐあいがしょうじる",
            "vn": "Phát sinh lỗi kỹ thuật trong hệ thống"
          },
          {
            "ja": "不具合を修正する",
            "furigana": "ふぐあいをしゅうせいする",
            "vn": "Sửa lỗi phần mềm (Fix bug)"
          }
        ],
        "example": {
          "sentence": "アプリの不具合[ふぐあい]を直[なお]すためのアップデートが配信[はいしん]された。",
          "translation": "Bản cập nhật để sửa chữa lỗi kỹ thuật của ứng dụng đã được phát hành."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "接続",
        "furigana": "せつぞく",
        "romaji": "setsuzoku",
        "han_viet": "TIẾP TỤC",
        "meaning_vn": "Kết nối (mạng Wi-Fi, thiết bị Bluetooth)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Mạng viễn thông",
        "visual_diagram": "   📱 Smartphone ──(Sóng vô tuyến)──▶ 📶 Free Wi-Fi Ga tàu\n        │\n        └── 🔗 接続 (Kết nối thành công ──▶ Lướt mạng thả ga)",
        "diagram_caption": "Tại các nhà ga và chuỗi cửa hàng tiện lợi Nhật Bản đều có Wi-Fi công cộng miễn phí",
        "mnemonic": "TIẾP (接 - tiếp xúc, gắn vào) + TỤC (続 - nối tiếp nhau). Gắn nối thông suốt với nhau.",
        "collocations": [
          {
            "ja": "Wi-Fiに接続する",
            "furigana": "Wi-Fiにせつぞくする",
            "vn": "Kết nối vào mạng Wi-Fi"
          },
          {
            "ja": "インターネット接続が切断される",
            "furigana": "インターネットせつぞくがせつだんされる",
            "vn": "Bị ngắt kết nối internet"
          }
        ],
        "example": {
          "sentence": "カフェのフリーWi-Fiに接続[せつぞく]して、パソコンで課題[かだい]のレポートを書[か]いた。",
          "translation": "Kết nối vào Wi-Fi miễn phí của quán cà phê, tôi đã dùng máy tính viết bài báo cáo."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "個人情報",
        "furigana": "こじんじょうほう",
        "romaji": "kojin jouhou",
        "han_viet": "CÁ NHÂN TÌNH BÁO",
        "meaning_vn": "Thông tin cá nhân riêng tư (cần bảo mật tuyệt đối)",
        "word_type": "Danh từ",
        "tag": "Bảo mật",
        "visual_diagram": "   🔒 DỮ LIỆU CÁ NHÂN NHẠY CẢM (個人情報):\n   ├── 👤 Họ tên, ngày sinh, địa chỉ nhà riêng\n   ├── 📞 Số điện thoại cá nhân\n   ├── 💳 Số thẻ ngân hàng, số thẻ tín dụng\n   └── ⚠️ Cảnh báo: Rò rỉ thông tin (情報漏洩 - じょうほうろうえい) là vi phạm pháp luật nặng",
        "diagram_caption": "Luật bảo vệ thông tin cá nhân của Nhật Bản cực kỳ nghiêm ngặt",
        "mnemonic": "CÁ NHÂN (個人 - riêng từng người) + TÌNH BÁO (情報 - tin tức thông tin). Thông tin riêng tư của cá nhân.",
        "collocations": [
          {
            "ja": "個人情報を保護する",
            "furigana": "こじんじょうほうをほごする",
            "vn": "Bảo vệ thông tin cá nhân"
          },
          {
            "ja": "個人情報が流出する",
            "furigana": "こじんじょうほうがりゅうしゅつする",
            "vn": "Bị rò rỉ lộ thông tin cá nhân ra ngoài"
          }
        ],
        "example": {
          "sentence": "見知[みし]らぬ怪[あや]しいサイトには、決[けっ]して個人[こじん]情報[じょうほう]を入力[にゅうりょく]してはならない。",
          "translation": "Tuyệt đối không bao giờ được nhập thông tin cá nhân vào các trang web lạ có dấu hiệu khả nghi."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "設定",
        "furigana": "せってい",
        "romaji": "settei",
        "han_viet": "THIẾT ĐỊNH",
        "meaning_vn": "Cài đặt tùy chỉnh hệ thống (Settings)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Thao tác máy móc",
        "visual_diagram": "   ⚙️ CÀI ĐẶT TRONG ĐIỆN THOẠI (設定アプリ):\n   ├── 🌐 言語設定 (Đổi ngôn ngữ máy sang tiếng Nhật để luyện học từ)\n   ├── 🔔 通知設定 (Bật/tắt chuông thông báo làm phiền)\n   └── 🤫 マナーモード (Chuyển sang chế độ rung khi lên tàu điện)",
        "diagram_caption": "Tại Nhật khi lên tàu bắt buộc phải cài đặt chế độ rung lịch sự (Manner Mode)",
        "mnemonic": "THIẾT (設 - thiết lập xây dựng) + ĐỊNH (定 - cố định quy định). Thiết lập thông số cố định.",
        "collocations": [
          {
            "ja": "初期設定を行う",
            "furigana": "しょきせっていをおこなう",
            "vn": "Cài đặt ban đầu khi mới mua máy"
          },
          {
            "ja": "パスワードを再設定する",
            "furigana": "パスワードをさいせっていする",
            "vn": "Đặt lại mật khẩu mới"
          }
        ],
        "example": {
          "sentence": "電車[でんしゃ]に乗[の]る際[さい]は、音[おと]が鳴[な]らないようにマナーモードに設定[せってい]しておく。",
          "translation": "Khi lên tàu điện, hãy cài đặt chế độ rung im lặng để chuông không kêu làm phiền mọi người."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "制限",
        "furigana": "せいげん",
        "romaji": "seigen",
        "han_viet": "CHẾ HẠN",
        "meaning_vn": "Giới hạn, hạn chế (dung lượng 4G, thời gian dùng app)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Quy định dung lượng",
        "visual_diagram": "   📊 GÓI CƯỚC 4G: 20GB/tháng\n        │\n        └── 🚫 Xem quá nhiều video TikTok ──▶ Hết dung lượng tốc độ cao!\n            └── 🐌 Bị bóp băng thông (通信速度制限) ──▶ Mạng chậm như rùa bò",
        "diagram_caption": "Cơn ác mộng cuối tháng của giới trẻ khi bị bóp băng thông mạng (ギガ死)",
        "mnemonic": "CHẾ (制 - kiểm soát kìm chế) + HẠN (限 - giới hạn ranh giới). Khống chế trong một ranh giới nhất định.",
        "collocations": [
          {
            "ja": "通信速度制限がかかる",
            "furigana": "つうしんそくどせいげんがかかる",
            "vn": "Bị áp đặt giới hạn tốc độ truyền tải mạng"
          },
          {
            "ja": "年齢制限",
            "furigana": "ねんれいせいげん",
            "vn": "Giới hạn độ tuổi xem phim/chơi game"
          }
        ],
        "example": {
          "sentence": "月末[げつまつ]にデータ通信[つうしん]量[りょう]が上限[じょうげん]を超[こ]えてしまい、速度[そくど]制限[せいげん]がかかった。",
          "translation": "Cuối tháng dung lượng dữ liệu mạng vượt quá mức trần nên máy tôi đã bị bóp tốc độ."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "パスワード",
        "furigana": "パスワード",
        "romaji": "pasuwaado",
        "han_viet": "MẬT KHẨU",
        "meaning_vn": "Mật khẩu bảo vệ tài khoản",
        "word_type": "Danh từ",
        "tag": "Bảo mật",
        "visual_diagram": "   🔑 MẬT KHẨU BẢO MẬT AN TOÀN:\n   ├── ❌ Mật khẩu yếu: 123456, ngày tháng năm sinh (Dễ bị hack mất tiền)\n   └── ⭕ Mật khẩu mạnh: Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (@#$)\n         ▲\n         └── 🛡️ Kích hoạt xác thực 2 bước (二段階認証)",
        "diagram_caption": "Bắt nguồn từ tiếng Anh Password",
        "mnemonic": "Từ mượn Password (mã khóa thông hành).",
        "collocations": [
          {
            "ja": "パスワードを入力する",
            "furigana": "パスワードをにゅうりょくする",
            "vn": "Nhập mật khẩu đăng nhập"
          },
          {
            "ja": "パスワードを忘れる",
            "furigana": "パスワードをわすれる",
            "vn": "Quên mất mật khẩu"
          }
        ],
        "example": {
          "sentence": "セキュリティを高[たか]めるため、定期的[ていきてき]にパスワードを変更[へんこう]する。",
          "translation": "Để nâng cao tính bảo mật an ninh, tôi định kỳ đổi mật khẩu mới."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "検索",
        "furigana": "けんさく",
        "romaji": "kensaku",
        "han_viet": "KIỂM TÁC",
        "meaning_vn": "Tra cứu, tìm kiếm thông tin trên internet",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Tìm kiếm thông tin",
        "visual_diagram": "   🔍 TÌM KIẾM GOOGLE (ググる):\n   ├── ⌨️ Nhập từ khóa: 「N3 語彙 スライド」\n   ├── 🔍 検索 (Tìm kiếm trong 0.2 giây)\n   └── 📄 Hàng triệu kết quả bài viết hữu ích hiện ra",
        "diagram_caption": "Kỹ năng tra cứu thông tin nhanh là vũ khí quan trọng nhất trong thời đại số",
        "mnemonic": "KIỂM (検 - kiểm tra rà soát) + TÁC (索 - tìm kiếm lùng sục). Rà soát lùng sục thông tin.",
        "collocations": [
          {
            "ja": "キーワードで検索する",
            "furigana": "キーワードでけんさくする",
            "vn": "Tìm kiếm bằng từ khóa"
          },
          {
            "ja": "検索エンジン",
            "furigana": "けんさくエンジン",
            "vn": "Công cụ tìm kiếm (Google, Yahoo)"
          }
        ],
        "example": {
          "sentence": "分[わ]からない単語[たんご]があれば、すぐにスマホの辞書[じしょ]アプリで検索[けんさく]する習慣[しゅうかん]をつける。",
          "translation": "Hãy tạo thói quen nếu gặp từ mới không hiểu thì lập tức tra cứu ngay trên ứng dụng từ điển điện thoại."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "通知",
        "furigana": "つうち",
        "romaji": "tsuuchi",
        "han_viet": "THÔNG TRI",
        "meaning_vn": "Thông báo tin nhắn, chuông báo ứng dụng",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Tin nhắn",
        "visual_diagram": "   🔔 THÔNG BÁO TỪ ỨNG DỤNG (アプリの通知):\n   ├── 💬 Tin nhắn mới trên LINE (新着メッセージ)\n   ├── 📧 Email công việc quan trọng gửi tới\n   └── 🔴 Dấu chấm đỏ hiện trên góc biểu tượng ứng dụng",
        "diagram_caption": "Người Nhật chuộng dùng ứng dụng nhắn tin LINE thay cho Messenger hay Zalo",
        "mnemonic": "THÔNG (通 - truyền đi thông đạt) + TRI (知 - cho biết). Truyền tin cho đối phương biết.",
        "collocations": [
          {
            "ja": "通知が届く",
            "furigana": "つうちがとどく",
            "vn": "Có thông báo gửi tới"
          },
          {
            "ja": "プッシュ通知をオフにする",
            "furigana": "プッシュつうちをオフにする",
            "vn": "Tắt thông báo đẩy để không bị làm phiền khi học bài"
          }
        ],
        "example": {
          "sentence": "勉強[べんきょう]中[ちゅう]にスマホの通知[つうち]が鳴[な]ると気[き]が散[ち]るので、音[おと]を切[き]っておく。",
          "translation": "Trong khi học nếu chuông thông báo điện thoại kêu sẽ làm phân tâm nên tôi đã tắt tiếng đi."
        }
      }
    ]
  },
  {
    "topic_id": "topic_18_giao_tiep_tu_choi_xin_loi",
    "title": "Chủ đề 18: Kỹ năng giao tiếp: Từ chối khéo & Xin lỗi",
    "japanese_title": "断り方・お詫び・対人マナーの語彙",
    "description": "Nghệ thuật ứng xử tinh tế của người Nhật: từ chối gián tiếp giữ thể diện và các mức độ xin lỗi chuẩn văn hóa.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "遠慮",
        "furigana": "えんりょ",
        "romaji": "enryo",
        "han_viet": "VIỄN LỰ",
        "meaning_vn": "Khách khí, ngại ngùng, khéo léo từ chối giữ ý tứ",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Giao tiếp tinh tế",
        "visual_diagram": "   🍶 ĐƯỢC MỜI RƯỢU / MỜI ĂN:\n   ├── 「どうぞ食べてください」(Xin mời bạn cứ ăn tự nhiên)\n   ├── 🙆‍♂️ 「それでは、遠慮なくいただきます」(Vậy tôi xin phép không khách khí nữa ạ)\n   └── 🙅‍♂️ 「せっかくですが、今回はご遠慮させていただきます」(Rất tiếc nhưng lần này tôi xin phép khéo từ chối ạ)",
        "diagram_caption": "Chữ 'Khách khí giữ ý' thể hiện đỉnh cao sự tinh tế trong văn hóa giao tiếp Nhật Bản",
        "mnemonic": "VIỄN (遠 - nhìn xa trông rộng) + LỰ (慮 - suy xét đắn đo). Suy nghĩ sâu xa giữ kẽ cho người khác.",
        "collocations": [
          {
            "ja": "遠慮なくどうぞ",
            "furigana": "えんりょなくどうぞ",
            "vn": "Xin đừng khách khí, cứ tự nhiên nhé"
          },
          {
            "ja": "遠慮深い人",
            "furigana": "えんりょぶかいひと",
            "vn": "Người biết giữ ý tứ, không suồng sã"
          }
        ],
        "example": {
          "sentence": "「お茶[ちゃ]をもう一杯[いっぱい]いかがですか」「ありがとうございます、もう十分[じゅうぶん]ですのでご遠慮[えんりょ]いたします」",
          "translation": "'Bạn có muốn uống thêm tách trà nữa không?' - 'Cảm ơn bạn, tôi đã uống đủ rồi nên xin phép thôi ạ.'"
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "辞退",
        "furigana": "じたい",
        "romaji": "jitai",
        "han_viet": "TỪ THOÁI",
        "meaning_vn": "Xin rút lui, từ chối chính thức (nhận giải thưởng, chức vụ, lời mời phỏng vấn)",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Từ chối trang trọng",
        "visual_diagram": "   🏆 Được trao tặng chức vụ / Đậu phỏng vấn nhưng không muốn đi làm\n        │\n        └── 🙇‍♂️ 辞退する (Trang trọng gửi thư xin phép rút lui):\n            「一身上の都合により、今回は内定を辞退させていただきます」",
        "diagram_caption": "Trang trọng hơn 遠慮, mang tính pháp lý và thông báo chính thức",
        "mnemonic": "TỪ (辞 - từ giã lời từ biệt) + THOÁI (退 - rút lui). Lời xin rút lui chính thức.",
        "collocations": [
          {
            "ja": "内定を辞退する",
            "furigana": "ないていをじたいする",
            "vn": "Từ chối lời mời nhận việc của công ty"
          },
          {
            "ja": "候補を辞退する",
            "furigana": "こうほをじたいする",
            "vn": "Xin rút tên khỏi danh sách ứng cử"
          }
        ],
        "example": {
          "sentence": "他[ほか]の第一[だいいち]志望[しぼう]の企業[きぎょう]から内定[ないてい]をもらったので、こちらの会社[かいしゃ]は辞退[じたい]した。",
          "translation": "Vì đã nhận được lời mời làm việc từ công ty nguyện vọng 1 nên tôi đã xin rút lui tại công ty này."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "お詫び",
        "furigana": "おわび",
        "romaji": "owabi",
        "han_viet": "SỰ TẠ LỖI",
        "meaning_vn": "Lời xin lỗi chân thành sâu sắc trong công việc/thương mại",
        "word_type": "Danh từ",
        "tag": "Xin lỗi chuẩn mực",
        "visual_diagram": "   🙇‍♂️ CÁC CẤP ĐỘ XIN LỖI TRONG TIẾNG NHẬT:\n   ├── 👦 ごめん (Bạn bè thân thiết xuề xòa)\n   ├── 🤝 すみません (Xã giao đời thường khi lỡ dẫm chân)\n   ├── 👔 申し訳ありません (Trang trọng nơi công sở)\n   └── 🙇‍♂️ お詫び申し上げます (Đỉnh cao tạ lỗi khi công ty làm sai sót lớn)",
        "diagram_caption": "Góc cúi đầu khi nói お詫び phải gập người 45 độ giữ nguyên trong 3 giây",
        "mnemonic": "Từ động từ 詫びる (わびる - tạ lỗi nhận khuyết điểm).",
        "collocations": [
          {
            "ja": "心よりお詫び申し上げます",
            "furigana": "こころよりおわびもうしあげます",
            "vn": "Xin chân thành gửi lời tạ lỗi từ tận đáy lòng"
          },
          {
            "ja": "お詫びの手紙",
            "furigana": "おわびのてがみ",
            "vn": "Thư viết tạ lỗi khách hàng"
          }
        ],
        "example": {
          "sentence": "商品[しょうひん]の発送[はっそう]が遅[おく]れてしまい、お客様[きゃくさま]に深[ふか]くお詫[わ]びを申[もう]し上[あ]げた。",
          "translation": "Vì việc gửi hàng bị chậm trễ nên tôi đã gửi lời xin lỗi sâu sắc tới quý khách hàng."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "都合が悪い",
        "furigana": "つごうがわるい",
        "romaji": "tsugou ga warui",
        "han_viet": "ĐÔ HỢP BẤT TIỆN",
        "meaning_vn": "Không tiện thời gian, bận việc bận lịch",
        "word_type": "Cụm tính từ",
        "tag": "Từ chối khéo",
        "visual_diagram": "   🍻 Bạn rủ: 「今週の土曜日、飲みに行かない？」(Thứ 7 này đi nhậu không?)\n   ├── ❌ Người Nhật KHÔNG BAO GIỜ nói: 「行かない」(Tôi không đi - Rất thô lỗ!)\n   └── ⭕ Luôn nói khéo: 「あいにくその日はちょっと都合が悪くて...」(Tiếc quá hôm đó tôi lại bận việc mất rồi...)",
        "diagram_caption": "Cách từ chối chuẩn mực không làm phật lòng bất kỳ ai",
        "mnemonic": "ĐÔ HỢP (都合 - sự tiện lợi thu xếp thời gian) + BẤT TIỆN (悪い - xấu, kẹt). Kẹt lịch không thu xếp được.",
        "collocations": [
          {
            "ja": "ご都合はいかがでしょうか",
            "furigana": "ごつごうはいかがでしょうか",
            "vn": "Hỏi lịch đối phương: Thời gian đó có tiện cho anh/chị không ạ?"
          },
          {
            "ja": "都合をつける",
            "furigana": "つごうをつける",
            "vn": "Cố gắng thu xếp sắp xếp thời gian để tham gia"
          }
        ],
        "example": {
          "sentence": "来週[らいしゅう]の月曜日[げつようび]は都合[つごう]が悪[わる]いので、火曜日[かようび]に変更[へんこう]していただけますか。",
          "translation": "Thứ Hai tuần tới tôi không tiện thời gian nên có thể vui lòng đổi sang thứ Ba giúp tôi được không ạ?"
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "結構です",
        "furigana": "けっこうです",
        "romaji": "kekkou desu",
        "han_viet": "KẾT CẤU",
        "meaning_vn": "Tôi đủ rồi / Xin thôi (từ chối nhẹ nhàng khi được mời chào)",
        "word_type": "Cụm từ",
        "tag": "Từ chối lịch sự",
        "visual_diagram": "   🏪 Thu ngân siêu thị: 「レジ袋はお付けしますか」(Quý khách có lấy túi nilon không ạ?)\n        │\n        └── ✋ Vẫy tay nhẹ: 「あ、結構です」(Dạ, tôi đủ rồi, không cần đâu ạ)\n        (Ý nghĩa: 'Tôi đã thấy đủ và ổn rồi, không cần thêm nữa')",
        "diagram_caption": "Bẫy ngữ nghĩa N3: 結構 vừa có nghĩa là 'Rất tốt' (結構美味しい), vừa có nghĩa là 'Xin từ chối' (結構です)",
        "mnemonic": "KẾT CẤU (結構). Nghĩa cổ là 'xây dựng đã hoàn thành mỹ mãn'. Đã đủ đẹp rồi không cần thêm nữa.",
        "collocations": [
          {
            "ja": "もう結構です",
            "furigana": "もうけっこうです",
            "vn": "Tôi đã no/đủ rồi, xin không lấy thêm"
          },
          {
            "ja": "結構な品",
            "furigana": "けっこうなしな",
            "vn": "Món quà tặng rất trang trọng tuyệt vời"
          }
        ],
        "example": {
          "sentence": "「レシートはお使[つか]いになりますか」「いえ、結構[けっこう]です」",
          "translation": "'Quý khách có dùng hóa đơn không ạ?' - 'Dạ không, tôi không cần đâu ạ.'"
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "申し訳ありません",
        "furigana": "もうしわけありません",
        "romaji": "moushiwake arimasen",
        "han_viet": "THÂN DỊCH",
        "meaning_vn": "Vô cùng xin lỗi, không có lời nào biện minh cho sai lầm",
        "word_type": "Cụm kính ngữ",
        "tag": "Kính ngữ xin lỗi",
        "visual_diagram": "   🙇‍♂️ NGUYÊN NGHĨA SÂU XA CỦA 申し訳ありません:\n   ├── 申す (もうす - Lời nói phân trần)\n   ├── 訳 (わけ - Lý do, lý lẽ thanh minh)\n   └── 無い (ない - Hoàn toàn không có)\n   ==▶ 'Tôi hoàn toàn không có một lời lý lẽ nào để bào chữa cho lỗi lầm của mình!'",
        "diagram_caption": "Lời nhận lỗi hạ mình tuyệt đối trong văn hóa doanh nghiệp Nhật Bản",
        "mnemonic": "Lời nói thanh minh (申し訳) hoàn toàn không có (ありません). Hoàn toàn nhận trách nhiệm về mình.",
        "collocations": [
          {
            "ja": "大変申し訳ございません",
            "furigana": "たいへんもうしわけございません",
            "vn": "Cấp độ kính ngữ cao nhất"
          },
          {
            "ja": "申し訳ない気持ちでいっぱいだ",
            "furigana": "もうしわけないきもちでいっぱいだ",
            "vn": "Trong lòng ngập tràn cảm giác áy náy khôn nguôi"
          }
        ],
        "example": {
          "sentence": "私[わたし]の確認[かくにん]不足[ぶそく]でご迷惑[めいわく]をおかけし、大変[たいへん]申[もう]し訳[わけ]ありませんでした。",
          "translation": "Do sự thiếu sót trong khâu kiểm tra của tôi đã làm phiền quý vị, tôi vô cùng xin lỗi."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "配慮",
        "furigana": "はいりょ",
        "romaji": "hairyo",
        "han_viet": "PHỐI LỰ",
        "meaning_vn": "Sự quan tâm chu đáo, tinh tế để ý đến cảm xúc người khác",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Tinh tế ứng xử",
        "visual_diagram": "   🤝 VÍ DỤ SỰ TINH TẾ (配慮 - はいりょ):\n   ├── 🤫 Đi lại nhẹ nhàng đêm khuya để người tầng dưới ngủ ngon\n   ├── 🥗 Chuẩn bị sẵn món chay khi biết trong đoàn có người ăn chay\n   └── 🚪 Giữ cửa thang máy chờ người đi sau bước vào",
        "diagram_caption": "Giá trị cốt lõi làm nên sự văn minh và trật tự tuyệt vời của xã hội Nhật",
        "mnemonic": "PHỐI (配 - phân phối san sẻ) + LỰ (慮 - suy nghĩ thấu đáo). San sẻ sự suy nghĩ thấu đáo đến mọi người xung quanh.",
        "collocations": [
          {
            "ja": "周囲に配慮する",
            "furigana": "しゅういにはいりょする",
            "vn": "Để ý quan tâm đến mọi người xung quanh"
          },
          {
            "ja": "温かいご配慮",
            "furigana": "あたたかいごはいりょ",
            "vn": "Sự quan tâm chăm sóc vô cùng ấm áp"
          }
        ],
        "example": {
          "sentence": "体調[たいちょう]の悪[わる]い同僚[どうりょう]に対[たい]して、仕事[しごと]の負担[ふたん]を減[へ]らす配慮[はいりょ]をした。",
          "translation": "Đối với người đồng nghiệp đang bị mệt, tôi đã tinh tế san sẻ giảm bớt gánh nặng công việc cho anh ấy."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "失礼",
        "furigana": "しつれい",
        "romaji": "shitsurei",
        "han_viet": "THẤT LỄ",
        "meaning_vn": "Thất lễ, xin phép bước vào/rời đi (失礼します / 失礼いたします)",
        "word_type": "Danh từ / Tính từ đuôi な / Động từ nhóm 3",
        "tag": "Nghi thức",
        "visual_diagram": "   🚪 CÂU NÓI CỬA MIỆNG HÀNG NGÀY TẠI CÔNG SỞ:\n   ├── 🚶 Khi bước vào phòng sếp: 「失礼します」(Tôi xin phép bước vào)\n   └── 🏃‍♂️ Khi tan làm về trước đồng nghiệp: 「お先に失礼します」(Tôi xin phép về trước mọi người ạ)",
        "diagram_caption": "Từ vựng có tần suất nói nhiều nhất trong một ngày làm việc của người Nhật",
        "mnemonic": "THẤT (失 - làm mất đi) + LỄ (礼 - lễ nghĩa). Tạm gác lại lễ nghĩa xin phép thực hiện hành động.",
        "collocations": [
          {
            "ja": "お先に失礼します",
            "furigana": "おさきにしつれいします",
            "vn": "Câu chào khi tan làm về trước"
          },
          {
            "ja": "失礼な態度",
            "furigana": "しつれいなたいど",
            "vn": "Thái độ bất lịch sự vô phép tắc"
          }
        ],
        "example": {
          "sentence": "面接[めんせつ]の部屋[へや]を出[で]る時[とき]は、深[ふか]く一礼[いちれい]して「失礼[しつれい]いたしました」と言[い]う。",
          "translation": "Khi rời khỏi phòng phỏng vấn, hãy cúi đầu thật sâu và nói 'Tôi xin phép thất lễ ạ'."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "承諾",
        "furigana": "しょうだく",
        "romaji": "shoudaku",
        "han_viet": "THỪA NẶC",
        "meaning_vn": "Đồng ý, chấp thuận lời đề nghị hoặc điều kiện",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Đồng thuận",
        "visual_diagram": "   🤝 HAI TRẠNG THÁI PHẢN HỒI LỜI MỜI:\n   ├── ⭕ 承諾 (Đồng thuận, nhận lời vui vẻ hợp tác)\n   └── ❌ 拒否・辞退 (Từ chối, không đồng ý điều khoản)",
        "diagram_caption": "Từ mang sắc thái trang trọng trong hợp đồng và thư từ kinh doanh",
        "mnemonic": "THỪA (承 - nhận lấy) + NẶC (諾 - ưng thuận đồng ý). Nhận lấy và ưng thuận yêu cầu.",
        "collocations": [
          {
            "ja": "依頼を快く承諾する",
            "furigana": "いらいをこころよくしょうだくする",
            "vn": "Sẵn sàng vui vẻ nhận lời nhờ vả"
          },
          {
            "ja": "ご承諾いただく",
            "furigana": "ごしょうだくいただく",
            "vn": "Nhận được sự chấp thuận của đối phương"
          }
        ],
        "example": {
          "sentence": "無理[むり]なお願[ねが]いにもかかわらず、先輩[せんぱい]は引[ひ]き受[う]けることを承諾[しょうだく]してくれた。",
          "translation": "Dù là một lời nhờ vả quá sức nhưng anh tiền bối vẫn sẵn lòng đồng ý nhận giúp."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "見合わせる",
        "furigana": "みあわせる",
        "romaji": "miawaseru",
        "han_viet": "KIẾN HỢP",
        "meaning_vn": "Tạm hoãn, chưa thực hiện để nhìn nhận tình hình",
        "word_type": "Động từ nhóm 2",
        "tag": "Quyết định thận trọng",
        "visual_diagram": "   🚄 BẢNG THÔNG BÁO TÀU ĐIỆN KHI BÃO LỚN:\n   「強風のため、全線で運転を見合わせております」\n   (Do gió giật mạnh, chúng tôi xin tạm hoãn các chuyến tàu để theo dõi tình hình an toàn)",
        "diagram_caption": "Gặp liên tục trên loa phát thanh nhà ga khi thời tiết xấu hoặc có sự cố tai nạn",
        "mnemonic": "KIẾN (見 - nhìn ngắm) + HỢP (合 - đối chiếu). Nhìn ngắm đối chiếu tình hình rồi mới quyết định tiếp.",
        "collocations": [
          {
            "ja": "運転を見合わせる",
            "furigana": "うんてんをみあわせる",
            "vn": "Tạm dừng chạy tàu xe để theo dõi sự cố"
          },
          {
            "ja": "計画の実行を見合わせる",
            "furigana": "けいかくのじっこうをみあわせる",
            "vn": "Tạm hoãn thực thi kế hoạch"
          }
        ],
        "example": {
          "sentence": "大雨[おおあめ]の影響[えいきょう]で安全[あんぜん]の確認[かくにん]が取[と]れないため、電車[でんしゃ]の運行[うんこう]を見合[みあ]わせている。",
          "translation": "Do ảnh hưởng của mưa to chưa thể xác nhận an toàn nên các chuyến tàu đang tạm hoãn hoạt động."
        }
      }
    ]
  },
  {
    "topic_id": "topic_19_qua_tang_omiyage",
    "title": "Chủ đề 19: Quà tặng & Phong tục Omiyage",
    "japanese_title": "お土産・贈り物・お中元・お歳暮の語彙",
    "description": "Văn hóa biếu quà tinh tế của người Nhật: quà lưu niệm chuyến đi Omiyage, quà tri ân hè - đông và phong tục đáp lễ.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "お土産",
        "furigana": "おみやげ",
        "romaji": "omiyage",
        "han_viet": "THỔ SẢN",
        "meaning_vn": "Quà lưu niệm đặc sản mua về chia cho mọi người sau chuyến đi",
        "word_type": "Danh từ",
        "tag": "Văn hóa quà biếu",
        "visual_diagram": "   🧳 ĐI DU LỊCH VỀ ──▶ 🎁 Mua hộp bánh Omiyage đến văn phòng:\n   ├── 🍪 Hộp chia sẵn từng gói nhỏ riêng biệt (個包装 - Tiện chia từng bàn)\n   ├── 🙇‍♂️ Nói lời cảm ơn: 「お休みをいただきありがとうございました」(Cảm ơn mọi người đã gánh việc hộ trong lúc tôi nghỉ)\n   └── Đặt lên bàn phòng trà cho đồng nghiệp cùng ăn",
        "diagram_caption": "Nét văn hóa giao tiếp công sở không thể thiếu: Đi chơi về phải luôn có quà bánh cho cả phòng",
        "mnemonic": "THỔ (土 - đất đai vùng miền) + SẢN (産 - sản vật). Sản vật được làm ra từ chính vùng đất bạn ghé thăm.",
        "collocations": [
          {
            "ja": "お土産を買う",
            "furigana": "おみやげをかう",
            "vn": "Mua quà lưu niệm đặc sản"
          },
          {
            "ja": "お土産話",
            "furigana": "おみやげばなし",
            "vn": "Những câu chuyện trải nghiệm thú vị kể lại sau chuyến đi"
          }
        ],
        "example": {
          "sentence": "旅行[りょこう]から戻[もど]った翌日[よくじつ]、会社[かいしゃ]の同僚[どうりょう]にお土産[みやげ]のお菓子[かし]を配[くば]った。",
          "translation": "Ngày hôm sau sau khi đi du lịch về, tôi đã phát bánh quà lưu niệm cho các đồng nghiệp trong công ty."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "お中元・お歳暮",
        "furigana": "おちゅうげん・おせいぼ",
        "romaji": "ochuugen / oseibo",
        "han_viet": "TRUNG NGUYÊN / TUẾ MỘ",
        "meaning_vn": "Quà tri ân giữa năm (Tháng 7) / Quà tri ân cuối năm (Tháng 12)",
        "word_type": "Danh từ",
        "tag": "Nghi lễ truyền thống",
        "visual_diagram": "   📅 2 MÙA TẶNG QUÀ TRI ÂN LỚN NHẤT TRONG NĂM TẠI NHẬT:\n   ├── 🌻 お中元 (Tháng 7 mùa hè: Tặng bia lạnh, nước ép hoa quả, mì Somen giải nhiệt)\n   └── ❄️ お歳暮 (Tháng 12 cuối năm: Tặng giăm bông, thịt bò, hải sản cảm ơn vì cả năm đã giúp đỡ)",
        "diagram_caption": "Gửi tới đối tác kinh doanh, thầy cô giáo cũ hoặc cấp trên để thắt chặt tình nghĩa",
        "mnemonic": "TRUNG NGUYÊN (tháng 7 âm) vs TUẾ MỘ (tuế = năm, mộ = chiều tối cuối cùng -> cuối năm).",
        "collocations": [
          {
            "ja": "お中元を贈る",
            "furigana": "おちゅうげんをおくる",
            "vn": "Gửi quà tặng tri ân mùa hè"
          },
          {
            "ja": "お歳暮の品を選ぶ",
            "furigana": "おせいぼのしなをえらぶ",
            "vn": "Lựa chọn món quà tri ân cuối năm ở trung tâm thương mại"
          }
        ],
        "example": {
          "sentence": "日頃[ひごろ]お世話[せわ]になっている恩師[おんし]に、感謝[かんしゃ]の気持ちを込[こ]めてお歳暮[せいぼ]を贈[おく]った。",
          "translation": "Tôi đã gửi quà tri ân cuối năm gói trọn tấm lòng biết ơn tới người thầy đã luôn giúp đỡ tôi thường ngày."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "熨斗",
        "furigana": "のし",
        "romaji": "noshi",
        "han_viet": "ỦY",
        "meaning_vn": "Giấy dán trang trí trang trọng bọc bên ngoài hộp quà biếu",
        "word_type": "Danh từ",
        "tag": "Quy tắc gói quà",
        "visual_diagram": "   🎁 PHÂN BIỆT DÂY BUỘC NƠ TRÊN GIẤY NOSHI (水引 - Mizuhiki):\n   ├── 🎀 Nơ cánh bướm (蝶結び - Cởi ra buộc lại dễ dàng): Dùng cho chuyện vui lặp lại (Sinh con, đỗ đại học)\n   └── 🎗️ Nơ thắt nút chặt (結び切り - Không bao giờ cởi ra): Dùng cho chuyện chỉ xảy ra 1 lần (Đám cưới, viếng tang)",
        "diagram_caption": "Bẫy văn hóa nghiêm trọng: Dùng sai loại nơ thắt trong đám cưới sẽ bị coi là trù ẻo ly hôn!",
        "mnemonic": "Tờ giấy trắng in hình dây nơ màu đỏ-trắng trang trọng dán trên hộp quà.",
        "collocations": [
          {
            "ja": "熨斗紙をつける",
            "furigana": "のしがみをつける",
            "vn": "Dán giấy gói quà trang trọng Noshi"
          },
          {
            "ja": "外のし・内のし",
            "furigana": "そとのし / うちのし",
            "vn": "Dán giấy Noshi bên ngoài hay bên trong lớp bọc"
          }
        ],
        "example": {
          "sentence": "結婚[けっこん]祝[いわ]いのプレゼントには、結[むす]び切[き]りの水引[みずひき]が描[えが]かれた熨斗[のし]紙[がみ]を使[つか]う。",
          "translation": "Đối với quà mừng đám cưới, người ta sử dụng giấy dán Noshi vẽ hình nơ thắt nút chặt không tháo rời."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "包装",
        "furigana": "ほうそう",
        "romaji": "housou",
        "han_viet": "BAO TRANG",
        "meaning_vn": "Bọc gói hàng hóa, giấy gói quà",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Nghệ thuật gói quà",
        "visual_diagram": "   🎁 NGHỆ THUẬT GÓI HÀNG TẠI NHẬT (包装):\n   ├── Nhân viên quầy bách hóa gói hộp quà vuông vức chỉ trong 30 giây\n   ├── Không để lộ bất kỳ nếp gấp nhăn nhúm hay mép băng dính thừa\n   └── 「プレゼント用にお願いします」(Làm ơn gói giúp tôi thành quà tặng ạ)",
        "diagram_caption": "Người Nhật coi trọng lớp vỏ bọc bên ngoài chu đáo không kém gì giá trị món quà bên trong",
        "mnemonic": "BAO (包 - bao bọc) + TRANG (装 - trang hoàng làm đẹp). Bọc gói trang hoàng đẹp mắt.",
        "collocations": [
          {
            "ja": "きれいに包装する",
            "furigana": "きれいにほうそうする",
            "vn": "Bọc gói quà thật đẹp đẽ"
          },
          {
            "ja": "過剰包装",
            "furigana": "かじょうほうそう",
            "vn": "Bọc gói quá mức nhiều tầng lớp (gây lãng phí rác)"
          }
        ],
        "example": {
          "sentence": "デパートの店員[てんいん]さんが、手際[てぎわ]よくプレゼントを美[うつく]しい紙[かみ]で包装[ほうそう]してくれた。",
          "translation": "Nhân viên trung tâm thương mại đã nhanh thoăn thoắt bọc món quà bằng giấy gói tuyệt đẹp."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "お返し",
        "furigana": "おかえし",
        "romaji": "okaeshi",
        "han_viet": "QUÀ ĐÁP LỄ",
        "meaning_vn": "Quà tặng đáp lễ lại cho người đã tặng quà cho mình",
        "word_type": "Danh từ",
        "tag": "Có qua có lại",
        "visual_diagram": "   🎁 Người khác tặng quà cho bạn\n        │\n        └── 🤝 BẮT BUỘC ĐÁP LỄ (お返し):\n            ├── Tặng lại món quà có giá trị bằng khoảng 1/3 đến 1/2 món quà nhận được\n            └── Ví dụ: Ngày Valentine Trắng 14/3 con trai tặng lại bánh kẹo cho con gái",
        "diagram_caption": "Nguyên tắc 'Có qua có lại' (半返し) khắc sâu trong tâm thức người Nhật để không mắc nợ ai",
        "mnemonic": "Từ động từ 返す (かえす - trả lại). Món quà gửi trả lại để cảm ơn.",
        "collocations": [
          {
            "ja": "お返しを贈る",
            "furigana": "おかえしをおくる",
            "vn": "Gửi quà đáp lễ"
          },
          {
            "ja": "お返しの品",
            "furigana": "おかえしのしな",
            "vn": "Món đồ chọn để đáp lễ"
          }
        ],
        "example": {
          "sentence": "出産[しゅっさん]祝[いわ]いをいただいた親戚[しんせき]に、感謝[かんしゃ]を込[こ]めて内祝[うちいわ]いのお返[かえ]しを送[おく]った。",
          "translation": "Đối với họ hàng đã gửi quà mừng sinh con, tôi đã gửi quà đáp lễ tạ ơn chan chứa sự cảm kích."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "遠慮なく",
        "furigana": "えんりょなく",
        "romaji": "enryonaku",
        "han_viet": "XIN ĐỪNG KHÁCH KHÍ",
        "meaning_vn": "Xin đừng khách sáo, hãy nhận lấy và tự nhiên",
        "word_type": "Trạng từ",
        "tag": "Lời mời ấm áp",
        "visual_diagram": "   🎁「ほんの気持ちですから、どうぞ遠慮なくお受け取りください」\n   (Chỉ là chút tấm lòng của tôi, xin anh/chị đừng khách sáo mà hãy vui lòng nhận lấy ạ)",
        "diagram_caption": "Câu nói kinh điển của chủ nhà khi trao tặng quà để người nhận không bị ngại",
        "mnemonic": "VIỄN LỰ (遠慮 - khách khí) + KHÔNG (なく - không có). Hoàn toàn không cần phải giữ kẽ ngại ngùng.",
        "collocations": [
          {
            "ja": "遠慮なくいただく",
            "furigana": "えんりょなくいただく",
            "vn": "Xin phép nhận lấy mà không khách sáo"
          },
          {
            "ja": "遠慮なくおっしゃってください",
            "furigana": "えんりょなくおっしゃってください",
            "vn": "Xin cứ thoải mái nói đừng ngại ngùng"
          }
        ],
        "example": {
          "sentence": "「好物[こうぶつ]のフルーツですから、どうぞ遠慮[えんりょ]なく召[め]し上[あ]がってください」",
          "translation": "'Đây là món trái cây khoái khẩu nên xin mời bác cứ ăn tự nhiên đừng khách sáo ạ.'"
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "気持ち",
        "furigana": "きもち",
        "romaji": "kimochi",
        "han_viet": "KHÍ TRÌ",
        "meaning_vn": "Tấm lòng thơm thảo, chút thành ý",
        "word_type": "Danh từ",
        "tag": "Ý nghĩa quà tặng",
        "visual_diagram": "   🍵 CÂU NÓI KHI TRAO QUÀ CỦA NGƯỜI NHẬT:\n   ├── ❌ Không khoe: 'Món này đắt tiền lắm đấy!'\n   └── ⭕ Luôn khiêm tốn: 「ほんの気持ちですが...」(Chỉ là chút lòng thành của em thôi ạ...)",
        "diagram_caption": "Trọng ở tấm lòng người tặng chứ không đặt nặng giá trị vật chất phô trương",
        "mnemonic": "KHÍ (気 - tâm trí, tinh thần) + TRÌ (持 - gìn giữ). Cảm xúc tấm lòng gìn giữ trong tim gửi gắm qua món quà.",
        "collocations": [
          {
            "ja": "ほんの気持ちですが",
            "furigana": "ほんのきもちですが",
            "vn": "Chỉ là chút tấm lòng mọn của tôi nhưng..."
          },
          {
            "ja": "感謝の気持ちを伝える",
            "furigana": "かんしゃのきもちをつたえる",
            "vn": "Bày tỏ truyền tải tấm lòng biết ơn"
          }
        ],
        "example": {
          "sentence": "つまらないものですが、日頃[ひごろ]の感謝[かんしゃ]の気持ち[きもち]ですのでお受[う]け取[と]りください。",
          "translation": "Dù chỉ là món đồ mọn không đáng là bao, nhưng đây là tấm lòng biết ơn thường ngày nên xin người nhận giúp."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "礼儀",
        "furigana": "れいぎ",
        "romaji": "reigi",
        "han_viet": "LỄ NGHI",
        "meaning_vn": "Lễ phép, phép tắc lịch sự trong đối nhân xử thế",
        "word_type": "Danh từ",
        "tag": "Quy tắc xã hội",
        "visual_diagram": "   🙇‍♂️ PHÉP TẮC KHI NHẬN QUÀ TẠI NHẬT (礼儀作法):\n   ├── 🤲 Luôn dùng cả HAI TAY để nhận quà (両手で受け取る)\n   ├── 🚫 Không tự ý xé giấy gói mở quà ngay trước mặt người tặng (trừ khi họ yêu cầu mở)\n   └── 💬 Cúi đầu cảm ơn chân thành ngay tại chỗ và nhắn tin cảm ơn lại lần nữa khi về nhà",
        "diagram_caption": "Tuân thủ phép tắc lễ nghi giúp tạo dựng sự tin tưởng và thiện cảm lâu bền",
        "mnemonic": "LỄ (礼 - lễ nghĩa cung kính) + NGHI (儀 - nghi thức tác phong). Phép tắc nghi lễ đoan trang.",
        "collocations": [
          {
            "ja": "礼儀正しい",
            "furigana": "れいぎただしい",
            "vn": "Cực kỳ lễ phép, chuẩn mực phép tắc"
          },
          {
            "ja": "礼儀をわきまえる",
            "furigana": "れいぎをわきまえる",
            "vn": "Thấu hiểu và hành xử đúng mực lễ nghĩa"
          }
        ],
        "example": {
          "sentence": "目上[めうえ]の人[ひと]から物[もの]をいただく際[さい]は、両手[りょうて]で受[う]け取[と]るのが日本[にほん]の礼儀[れいぎ]だ。",
          "translation": "Khi nhận đồ từ người bề trên, dùng cả hai tay đỡ lấy chính là phép tắc lễ nghi của Nhật Bản."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "風習",
        "furigana": "ふうしゅう",
        "romaji": "fuushuu",
        "han_viet": "PHONG TẬP",
        "meaning_vn": "Phong tục tập quán văn hóa lâu đời",
        "word_type": "Danh từ",
        "tag": "Truyền thống",
        "visual_diagram": "   🎎 CÁC PHONG TỤC TẬP QUÁN ĐỘC ĐÁO CỦA NHẬT (日本の風習):\n   ├── 🧧 お年玉 (Tiền lì xì đựng trong phong bao nhỏ cho trẻ con ngày Tết)\n   ├── 👹 節分 (Ném đậu đuổi quỷ, ăn cuộn sushi Ehomaki đầu xuân)\n   └── 🎁 お中元・お歳暮 (Tặng quà tri ân hè thu theo mùa)",
        "diagram_caption": "Nét đẹp truyền thống được truyền từ đời này sang đời khác của người Nhật",
        "mnemonic": "PHONG (風 - gió bay, phong tục) + TẬP (習 - tập quán thói quen). Thói quen tập tục lan tỏa như ngọn gió mát.",
        "collocations": [
          {
            "ja": "昔からの風習が残る",
            "furigana": "むかしからのふうしゅうがのこる",
            "vn": "Vẫn còn lưu giữ phong tục tập quán từ ngàn xưa"
          },
          {
            "ja": "地域の風習に従う",
            "furigana": "ちいきのふうしゅうにしたがう",
            "vn": "Tuân theo phong tục tập quán của địa phương"
          }
        ],
        "example": {
          "sentence": "お正月[しょうがつ]に子[こ]どもたちにお年玉[としだま]をあげるのは、日本[にほん]の古[ふる]くからの風習[ふうしゅう]だ。",
          "translation": "Tặng tiền mừng tuổi lì xì cho trẻ nhỏ vào dịp Tết là một phong tục tập quán có từ lâu đời của Nhật Bản."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "お見舞い",
        "furigana": "おみまい",
        "romaji": "omimai",
        "han_viet": "THĂM HỎI NGƯỜI BỆNH",
        "meaning_vn": "Đi thăm người ốm, người nằm viện hoặc người gặp nạn",
        "word_type": "Danh từ",
        "tag": "Thăm hỏi",
        "visual_diagram": "   🏥 ĐI THĂM BỆNH NHÂN NẰM VIỆN (お見舞い):\n   ├── 🚫 CẤM KỴ: Không tặng hoa có chậu trồng đất (鉢植え - ngụ ý bám rễ nằm viện mãi)\n   ├── 🚫 CẤM KỴ: Không tặng hoa màu trắng/hoa cúc (gợi tang tóc)\n   └── ⭕ NÊN TẶNG: Trái cây tươi ngon cắt sẵn hoặc phong bì tiền thăm bệnh (お見舞い金)",
        "diagram_caption": "Kiêng kỵ văn hóa cực kỳ quan trọng khi đi thăm người ốm ở Nhật",
        "mnemonic": "KIẾN (見 - nhìn ngắm) + VŨ (舞 - nhảy múa, lượn quanh). Đến tận nơi ngắm nhìn xem người bệnh thế nào.",
        "collocations": [
          {
            "ja": "お見舞いに行く",
            "furigana": "おみまいにいく",
            "vn": "Đi đến bệnh viện thăm người ốm"
          },
          {
            "ja": "お見舞い品",
            "furigana": "おみまいひん",
            "vn": "Món quà mang theo khi đi thăm bệnh"
          }
        ],
        "example": {
          "sentence": "入院[にゅういん]している友人[ゆうじん]のお見舞[みま]いに行[い]き、元気[げんき]づけた。",
          "translation": "Tôi đã đến bệnh viện thăm người bạn đang nằm viện và động viên khích lệ anh ấy."
        }
      }
    ]
  },
  {
    "topic_id": "topic_20_quan_ly_thoi_gian",
    "title": "Chủ đề 20: Quản lý thời gian & Lập kế hoạch",
    "japanese_title": "時間管理・スケジュール・計画性の語彙",
    "description": "Kỹ năng quản lý thời gian đỉnh cao của người Nhật: sắp xếp thứ tự ưu tiên, loại bỏ trì hoãn và hoàn thành mục tiêu.",
    "level": "N3",
    "slides": [
      {
        "id": 1,
        "slide_number": 1,
        "word": "優先順位",
        "furigana": "ゆうせんじゅんい",
        "romaji": "yuusenjun'i",
        "han_viet": "ƯU TIÊN THUẬN VỊ",
        "meaning_vn": "Thứ tự ưu tiên (việc quan trọng khẩn cấp làm trước)",
        "word_type": "Danh từ",
        "tag": "Kỹ năng công việc",
        "visual_diagram": "   📊 MA TRẬN QUẢN LÝ THỜI GIAN EISENHOWER:\n   ├── 1. 🚨 Quan trọng & Khẩn cấp ──▶ LÀM NGAY LẬP TỨC (Deadline hôm nay, sự cố sập web)\n   ├── 2. 🌟 Quan trọng & Không khẩn ──▶ LÊN LỊCH LÀM ĐỀU ĐẶN (Học N3, rèn luyện sức khỏe)\n   ├── 3. ⚡ Không quan trọng & Khẩn ──▶ Nhờ người khác ủy thác\n   └── 4. 🗑️ Không quan trọng & Không khẩn ──▶ VỨT BỎ (Lướt mạng vô bổ)",
        "diagram_caption": "Bí quyết giúp người bận rộn xử lý khối lượng công việc khổng lồ mà không bị quá tải",
        "mnemonic": "ƯU TIÊN (優先 - xếp lên trước) + THUẬN VỊ (順位 - thứ tự xếp hạng). Thứ bậc xếp theo mức độ ưu tiên.",
        "collocations": [
          {
            "ja": "優先順位をつける / 決める",
            "furigana": "ゆうせんじゅんいをつける / きめる",
            "vn": "Xác định thứ tự việc nào làm trước việc nào sau"
          },
          {
            "ja": "優先順位が高い仕事",
            "furigana": "ゆうせんじゅんいがたかいしごと",
            "vn": "Công việc có độ ưu tiên hàng đầu"
          }
        ],
        "example": {
          "sentence": "タスクに優先[ゆうせん]順位[じゅんい]をつけて、最も重要[じゅうよう]な仕事[しごと]から順[じゅん]に着手[ちゃくしゅ]する。",
          "translation": "Đặt thứ tự ưu tiên cho các nhiệm vụ và bắt tay thực hiện lần lượt từ công việc quan trọng nhất."
        }
      },
      {
        "id": 2,
        "slide_number": 2,
        "word": "効率",
        "furigana": "こうりつ",
        "romaji": "kouritsu",
        "han_viet": "HIỆU SUẤT",
        "meaning_vn": "Hiệu suất, hiệu quả (tốn ít thời gian công sức mà kết quả tối đa)",
        "word_type": "Danh từ",
        "tag": "Năng suất",
        "visual_diagram": "   ⏱️ CÙNG 1 MỤC TIÊU (Học 20 từ vựng N3):\n   ├── ❌ 効率が悪い (Kém hiệu quả): Ngồi chép phạt từ 3 tiếng, vừa học vừa xem Youtube\n   └── ⭕ 効率が良い (Hiệu quả cao): Học bằng slide hình ảnh trực quan 20 phút là thuộc lòng!",
        "diagram_caption": "Người Nhật luôn tìm cách cải tiến quy trình để nâng cao tối đa hiệu suất 効率化",
        "mnemonic": "HIỆU (効 - hiệu quả công hiệu) + SUẤT (率 - tỷ lệ). Tỷ lệ sinh ra công hiệu trên mỗi giờ bỏ ra.",
        "collocations": [
          {
            "ja": "効率よく勉強する",
            "furigana": "こうりつよくべんきょうする",
            "vn": "Học tập một cách đầy hiệu suất thông minh"
          },
          {
            "ja": "業務効率化",
            "furigana": "ぎょうむこうりつか",
            "vn": "Nâng cao hiệu suất hóa quy trình nghiệp vụ"
          }
        ],
        "example": {
          "sentence": "パソコンのショートカットキーを覚[おぼ]えると、作業[さぎょう]効率[こうりつ]が格段[かくだん]にアップする。",
          "translation": "Khi ghi nhớ các phím tắt máy tính, hiệu suất làm việc sẽ tăng lên một cách vượt bậc."
        }
      },
      {
        "id": 3,
        "slide_number": 3,
        "word": "スケジュール",
        "furigana": "スケジュール",
        "romaji": "sukejuuru",
        "han_viet": "LỊCH TRÌNH",
        "meaning_vn": "Lịch trình, thời gian biểu công việc",
        "word_type": "Danh từ",
        "tag": "Thời gian biểu",
        "visual_diagram": "   📓 CUỐN SỔ TAY LỊCH TRÌNH CỦA NGƯỜI NHẬT (手帳 - Techou):\n   ├── 📅 Khung giờ chia chi tiết từ 07:00 sáng đến 22:00 tối\n   ├── Ghi rõ địa điểm gặp đối tác và thời gian bắt tàu điện\n   └── Luôn trừ hao 15 phút đi sớm phòng tắc tàu",
        "diagram_caption": "Bắt nguồn từ tiếng Anh Schedule",
        "mnemonic": "Từ mượn Schedule (thời gian biểu kế hoạch).",
        "collocations": [
          {
            "ja": "スケジュールを管理する",
            "furigana": "スケジュールをかんりする",
            "vn": "Quản lý lịch trình khoa học"
          },
          {
            "ja": "スケジュールが過密だ",
            "furigana": "スケジュールがかみつだ",
            "vn": "Lịch trình dày đặc kín mít không có kẽ hở"
          }
        ],
        "example": {
          "sentence": "カレンダーアプリに予定[よてい]を入[い]れて、日々[ひび]のスケジュールをしっかり管理[かんり]している。",
          "translation": "Tôi nhập dự định vào ứng dụng lịch để quản lý chặt chẽ lịch trình mỗi ngày."
        }
      },
      {
        "id": 4,
        "slide_number": 4,
        "word": "目標設定",
        "furigana": "もくひょうせってい",
        "romaji": "mokuhyou settei",
        "han_viet": "MỤC TIÊU THIẾT ĐỊNH",
        "meaning_vn": "Thiết lập mục tiêu cụ thể rõ ràng",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Chiến lược",
        "visual_diagram": "   🎯 NGUYÊN TẮC THIẾT LẬP MỤC TIÊU SMART:\n   ├── ❌ Mục tiêu mơ hồ: 'Tôi muốn giỏi tiếng Nhật'\n   └── ⭕ Mục tiêu rõ ràng: 'Đạt 130 điểm JLPT N3 vào kỳ thi tháng 7 tới, mỗi ngày học 20 từ vựng và 2 bài đọc!'",
        "diagram_caption": "Có đích đến rõ ràng là ngọn hải đăng soi sáng cho mọi nỗ lực hàng ngày",
        "mnemonic": "MỤC TIÊU (目標 - đích ngắm) + THIẾT ĐỊNH (設定 - dựng đặt). Dựng lên cái đích ngắm cụ thể để bắn trúng.",
        "collocations": [
          {
            "ja": "明確な目標設定",
            "furigana": "めいかくなもくひょうせってい",
            "vn": "Thiết lập mục tiêu rõ ràng rành mạch"
          },
          {
            "ja": "高い目標を掲げる",
            "furigana": "たかいもくひょうをかかげる",
            "vn": "Đề ra mục tiêu cao lớn đầy thử thách"
          }
        ],
        "example": {
          "sentence": "適切[てきせつ]な目標[もくひょう]設定[せってい]をすることが、モチベーションを保[たも]ち続[つづ]ける秘訣[ひけつ]だ。",
          "translation": "Thiết lập mục tiêu phù hợp chính là bí quyết để duy trì động lực bền bỉ mỗi ngày."
        }
      },
      {
        "id": 5,
        "slide_number": 5,
        "word": "計画",
        "furigana": "けいかく",
        "romaji": "keikaku",
        "han_viet": "KẾ HOẠCH",
        "meaning_vn": "Kế hoạch từng bước thực hiện",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Lộ trình",
        "visual_diagram": "   🗺️ VÒNG LẶP PDCA NỔI TIẾNG:\n   1. 📝 Plan (計画 - Lập kế hoạch chi tiết)\n   2. 🏃 Do (実行 - Bắt tay vào hành động)\n   3. 🔍 Check (評価 - Đo lường kiểm tra kết quả)\n   4. 🚀 Action (改善 - Điều chỉnh cải tiến tốt hơn)",
        "diagram_caption": "Kế hoạch không nằm trên giấy mà là kim chỉ nam cho hành động thực tế",
        "mnemonic": "KẾ (計 - tính toán cân đo) + HOẠCH (画 - vẽ ra bức tranh). Cân đo tính toán vẽ ra lộ trình.",
        "collocations": [
          {
            "ja": "計画を立てる",
            "furigana": "けいかくをたてる",
            "vn": "Lên kế hoạch lộ trình"
          },
          {
            "ja": "計画通りに進む",
            "furigana": "けいかくどおりにすすむ",
            "vn": "Tiến triển đúng y hệt theo kế hoạch"
          }
        ],
        "example": {
          "sentence": "無理[むり]のない学習[がくしゅう]計画[けいかく]を立[た]てて、毎日[まいにち]コツコツと勉強[べんきょう]を重[かさ]ねる。",
          "translation": "Lên một kế hoạch học tập hợp lý vừa sức và tích lũy học tập đều đặn mỗi ngày."
        }
      },
      {
        "id": 6,
        "slide_number": 6,
        "word": "先延ばし",
        "furigana": "さきのばし",
        "romaji": "sakinobashi",
        "han_viet": "TIÊN DUYÊN",
        "meaning_vn": "Thói quen trì hoãn, dời việc hôm nay lại ngày mai",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Kẻ thù thời gian",
        "visual_diagram": "   😈 THÓI TRÌ HOÃN (先延ばしの罠):\n   ├── Hôm nay: 'Thôi mệt quá để mai làm...'\n   ├── Ngày mai: 'Hôm nay bận quá để cuối tuần làm...'\n   └── Đến sát deadline: Cuống cuồng thức trắng đêm, làm ẩu, kết quả tồi tệ!",
        "diagram_caption": "Kẻ cắp thời gian lớn nhất của con người. Quy tắc 5 giây: Đếm 5-4-3-2-1 là bật dậy làm ngay",
        "mnemonic": "TIÊN (先 - phía trước sau này) + DUYÊN (延ばし - kéo dài ra). Kéo dài việc dời về phía tương lai.",
        "collocations": [
          {
            "ja": "仕事を先延ばしにする",
            "furigana": "しごとをさきのばしにする",
            "vn": "Trì hoãn công việc lùi lại sau"
          },
          {
            "ja": "先延ばし癖を直す",
            "furigana": "さきのばしぐせをなおす",
            "vn": "Sửa tật xấu hay trì hoãn công việc"
          }
        ],
        "example": {
          "sentence": "面倒[めんどう]な課題[かだい]を先延[さきの]ばしにしていると、後[あと]で自分[じぶん]が苦[くる]しむことになる。",
          "translation": "Nếu cứ trì hoãn những bài tập phiền phức thì sau này chính bản thân mình sẽ phải chịu khổ sở."
        }
      },
      {
        "id": 7,
        "slide_number": 7,
        "word": "時間配分",
        "furigana": "じかんはいぶん",
        "romaji": "jikan haibun",
        "han_viet": "THỜI GIAN PHỐI PHÂN",
        "meaning_vn": "Phân bổ thời gian hợp lý (trong phòng thi JLPT)",
        "word_type": "Danh từ",
        "tag": "Kỹ năng làm bài thi",
        "visual_diagram": "   ⏱️ CHIẾN LƯỢC PHÂN BỔ THỜI GIAN PHẦN THI ĐỌC HIỂU N3 (70 phút):\n   ├── 📄 Đoản văn 短文 (4 bài): 12 phút (3 phút/bài)\n   ├── 📑 Trung văn 中文 (2 bài): 18 phút (9 phút/bài)\n   ├── 📜 Trường văn 長文 (1 bài): 12 phút\n   ├── 🔍 Tìm kiếm thông tin 情報検索: 8 phút\n   └── ⏱️ Thời gian dư soát lại đáp án: 10 phút",
        "diagram_caption": "Phân bổ thời gian chuẩn xác quyết định 50% khả năng đỗ trượt trong phòng thi",
        "mnemonic": "THỜI GIAN + PHỐI (配 - phân chia) + PHÂN (分 - chia nhỏ). Chia nhỏ quỹ thời gian cho từng phần.",
        "collocations": [
          {
            "ja": "試験の時間配分に気をつける",
            "furigana": "しけんのじかんはいぶんにきをつける",
            "vn": "Chú ý phân bổ thời gian hợp lý khi làm bài thi"
          },
          {
            "ja": "適切な時間配分",
            "furigana": "てきせつなじかんはいぶん",
            "vn": "Sự phân chia thời gian thỏa đáng"
          }
        ],
        "example": {
          "sentence": "読解[どっかい]の試験[しけん]では、時間[じかん]配分[はいぶん]を誤[あやま]ると最後[さいご]の問題[もんだい]まで解[と]き切[き]れなくなる。",
          "translation": "Trong bài thi đọc hiểu, nếu phân bổ thời gian sai lầm thì sẽ không kịp làm hết đến câu hỏi cuối cùng."
        }
      },
      {
        "id": 8,
        "slide_number": 8,
        "word": "余裕",
        "furigana": "よゆう",
        "romaji": "yoyuu",
        "han_viet": "DƯ DỤ",
        "meaning_vn": "Khoảng dư dả thong dong (thời gian, tiền bạc, tâm lý)",
        "word_type": "Danh từ",
        "tag": "Tâm lý thoải mái",
        "visual_diagram": "   ⏱️ ĐI ĐẾN ĐIỂM HẸN:\n   ├── 🏃 Sát giờ mới đi: Tàu chỉ cần chậm 2 phút là trễ hẹn, tim đập thình thịch\n   └── 🚶 Xuất phát sớm 15 phút ──▶ 余裕を持つ (Có thời gian dư dả, tâm lý ung dung bình tĩnh)",
        "diagram_caption": "Nguyên tắc '5分前行動' (Đến trước 5 phút) là chuẩn mực lịch sự tối thiểu của xã hội Nhật",
        "mnemonic": "DƯ (余 - dư dả) + DỤ (裕 - rộng rãi thong dong). Trạng thái rộng rãi dư dả không bị gò bó.",
        "collocations": [
          {
            "ja": "時間に余裕を持つ",
            "furigana": "じかんによゆうをもつ",
            "vn": "Dành ra khoảng thời gian dư dả thong dong"
          },
          {
            "ja": "心に余裕がない",
            "furigana": "こころによゆうがない",
            "vn": "Tâm trí rối bời không còn chỗ trống để thảnh thơi"
          }
        ],
        "example": {
          "sentence": "電車[でんしゃ]の遅延[ちえん]があっても焦[あせ]らないように、余裕[よゆう]を持[も]って家[いえ]を出[で]る。",
          "translation": "Để không bị cuống dù tàu điện có bị chậm chuyến, tôi luôn ra khỏi nhà với thời gian dư dả."
        }
      },
      {
        "id": 9,
        "slide_number": 9,
        "word": "達成",
        "furigana": "たっせい",
        "romaji": "tassei",
        "han_viet": "ĐẠT THÀNH",
        "meaning_vn": "Hoàn thành đạt được mục tiêu thành quả đề ra",
        "word_type": "Danh từ / Động từ nhóm 3",
        "tag": "Thành công",
        "visual_diagram": "   🎯 目標: ĐỖ KỲ THI JLPT N3 ──▶ 📚 6 tháng kiên trì học tập mỗi ngày\n        │\n        └── 🏆 達成 (ĐẠT THÀNH VANG DỘI! 🎉):\n            ├── Cảm giác tự hào và tự tin vào chính mình\n            └── Bước đệm vững chắc mở ra cơ hội công việc mức lương cao",
        "diagram_caption": "Cảm giác sung sướng tột cùng khi hái được quả ngọt sau những chuỗi ngày nỗ lực",
        "mnemonic": "ĐẠT (達 - đi đến nơi) + THÀNH (成 - thành công trọn vẹn). Đi đến đích và thành công trọn vẹn.",
        "collocations": [
          {
            "ja": "目標を達成する",
            "furigana": "もくひょうをたっせいする",
            "vn": "Đạt được mục tiêu đã đề ra"
          },
          {
            "ja": "達成感を味わう",
            "furigana": "たっせいかんをあじわう",
            "vn": "Tận hưởng cảm giác thành tựu thỏa mãn"
          }
        ],
        "example": {
          "sentence": "毎日[まいにち]の地道[じみち]な努力[どりょく]が実[み]を結[むす]び、JLPT N3合格[ごうかく]の目標[もくひょう]を見事[みごと]に達成[たっせい]した。",
          "translation": "Những nỗ lực bền bỉ mỗi ngày đã đơm hoa kết trái, tôi đã xuất sắc đạt được mục tiêu đỗ JLPT N3."
        }
      },
      {
        "id": 10,
        "slide_number": 10,
        "word": "振り返り",
        "furigana": "ふりかえり",
        "romaji": "furikaeri",
        "han_viet": "CHẤN PHẢN",
        "meaning_vn": "Nhìn nhận đánh giá lại quá trình, rút kinh nghiệm",
        "word_type": "Danh từ / Động từ nhóm 1",
        "tag": "Tổng kết phát triển",
        "visual_diagram": "   📅 TỔNG KẾT CUỐI TUẦN (振り返り):\n   ├── ⭕ Những việc đã làm tốt: Duy trì học 2 tiếng/ngày ──▶ Tiếp tục phát huy\n   ├── ⚠️ Những việc chưa tốt: Còn lướt điện thoại nhiều sau 22h ──▶ Cần khắc phục\n   └── 🚀 Lên mục tiêu tuần tiếp theo tiến bộ hơn",
        "diagram_caption": "Học tập không chỉ là cắm đầu chạy, mà cần biết dừng lại nhìn lại để đi đúng hướng hơn",
        "mnemonic": "CHẤN (振 - ngoảnh lại) + PHẢN (返 - quay đầu). Ngoảnh đầu nhìn lại chặng đường đã qua.",
        "collocations": [
          {
            "ja": "過去の失敗を振り返る",
            "furigana": "かこのしっぱいをふりかえる",
            "vn": "Nhìn lại những thất bại trong quá khứ để rút kinh nghiệm"
          },
          {
            "ja": "一週間の振り返りを行う",
            "furigana": "いっしゅうかんのふりかえりをおこなう",
            "vn": "Tiến hành tổng kết đánh giá lại một tuần vừa qua"
          }
        ],
        "example": {
          "sentence": "模擬[もぎ]試験[しけん]を受[う]けた後[あと]は、間違[まちが]えた問題[もんだい]をしっかり振[ふ]り返[かえ]ることが大切[たいせつ]だ。",
          "translation": "Sau khi thi thử, việc xem lại kỹ lưỡng các câu làm sai để rút kinh nghiệm là vô cùng quan trọng."
        }
      }
    ]
  }
];
