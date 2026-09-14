// 💚 UMIBUDO CHATBOT - Kịch Bản Bán Hàng

const chatbotScript = {
  colors: {
    brandGreen: '#0b6e3f',
    brandRed: '#d32f2f',
    lightGreen: '#e6f7f1',
    darkGray: '#2d3748',
    lightGray: '#f7fafc'
  },

  // ===== KỊCH BẢN CHÍNH =====
  greetingMessage: "Xin chào! 👋 Mình là chatbot của Umibudo - bán rong nho xanh từ biển Nhật Bản.\n\nChị/bạn đến để tìm hiểu rong nho cho bé hay cho gia đình ạ? Mình có thể giúp bạn lắm! 😊",

  quickOptions: [
    { id: 'baby', label: '🧒 Cho bé biếng rau', category: 'baby' },
    { id: 'eatclean', label: '👩 Muốn ăn sạch', category: 'eatclean' },
    { id: 'elderly', label: '💪 Cho người lớn tuổi', category: 'elderly' },
    { id: 'curious', label: '🤔 Chỉ tò mò', category: 'curious' }
  ],

  // Các câu hỏi thường gặp
  faqQuestions: {
    all: [
      {
        q: "Rong nho là gì? Sao tôi chưa từng nghe bao giờ?",
        a: "Haha, rất bình thường! Rong nho còn gọi là 'trứng cá hồi xanh' - là loại rau biển siêu ngon từ Nhật Bản.\n\nCái hay của nó là:\n- 🫘 Giòn tan nổ tí tách – Ngâm 3 phút nước đá là nở gấp 3 lần\n- 🧂 Không tanh chút nào – Ngâm đúng cách, hoàn toàn giòn tươi\n- 💪 Dinh dưỡng gấp 10 lần rau thường – Canxi cao hơn sữa bò!\n- ⏰ Bảo quản 12 tháng – Không cần tủ lạnh, rất tiện\n\nNhiều mẹ dùng cho bé ăn, bé yêu liền vì tiếng nhai rộp rộp ngon lắm! 😋"
      },
      {
        q: "Bé bao nhiêu tuổi mới ăn được? An toàn không?",
        a: "An toàn 100% nhé! Sản phẩm của chúng mình kiểm duyệt kỹ lưỡng, không hóa chất.\n\n👶 Bé 6-8 tháng: Có thể ăn nhưng nên bắt đầu từ 8 tháng, lượng nhỏ thôi\n🍽️ Bé 8-12 tháng: Ăn được bình thường, 1-2 muỗng cà phê, 2 lần/tuần\n🎂 Bé 1-3 tuổi: Yêu liền! Tiếng nhai 'rộp rộp' bé thích phát điên\n👨‍👩‍👧‍👦 Cả gia đình: Ai cũng ăn được, không giới hạn\n\n💚 Bé bạn bị dị ứng hải sản à? Rong nho là thực vật biển, không phải động vật, nên rủi ro rất thấp. Nhưng bạn hỏi bác sĩ trước cũng được!"
      },
      {
        q: "Rong nho tanh không? Tôi sợ bé không ăn...",
        a: "Đây là câu hỏi nhiều mẹ hỏi! Mình hiểu lo lắm.\n\n🎁 CAM KẾT CỦA CHÚNG MÌNH: KHÔNG TANH 100%!\n\nMẹo ngâm VÀNG (rất quan trọng!):\n1. Thả rong vào nước LẠNH (hoặc nước đá)\n2. Ngâm 3-5 phút, đừng khuấy liên tục\n3. Để ráo nước, trộn sốt mè rang kèm theo\n4. Ăn ngay để cảm nhận độ giòn\n\nNước nóng hay ngâm quá lâu sẽ gây tanh. Nước đá là bí quyết vàng!\n\nNếu vẫn tanh? Hoàn tiền 100%, không cần trả hàng, chỉ gửi ảnh/video. Chúng mình cam kết! 💯"
      },
      {
        q: "Giá 299k quá mắc! Mua rau thường chỉ 20-30k",
        a: "Hiểu bạn lắm! Nhưng nếu so sánh kỹ, rong nho là rẻ bạn ơi:\n\n💰 So sánh giá tiền:\n- 1 gói rong nho (20g) = 70g rau tươi thường\n- Rau tươi mua 2-3 ngày bỏ đi → Lãng phí tiền\n- Rong nho bảo quản 12 tháng → Mua 1 lần, dùng từ từ\n- 1 combo 3 hộp = 75k/lần ăn (nếu chia ra)\n\n✅ Cộng lợi ích:\n- Không cần nấu, ngâm 3 phút ăn ngay\n- Toàn bộ gia đình ăn được\n- Tặng 2 chai sốt mè Nhật (35k/chai)\n- Miễn phí ship toàn quốc\n- Cam kết hoàn tiền 100% nếu không hài lòng\n\nThật ra, nó rẻ lắm! Bé bạn táo bón, đưa đi khám bác sĩ bao nhiêu tiền? Rong nho tiết kiệm hơn lắm! 💚"
      },
      {
        q: "Cách dùng phức tạp không? Phải nấu lâu không?",
        a: "Dễ đến không tưởng bạn! Chỉ có 3 bước:\n\n🧊 BƯỚC 1: Thả rong vào nước đá (rất quan trọng!)\n⏱️ BƯỚC 2: Để 3-5 phút rong tự nở bung\n🍽️ BƯỚC 3: Trộn sốt mè, ăn ngay\n\nXong! Chỉ 5 phút, không cần nấu, không cần chuẩn bị gì phức tạp.\n\n🥗 Salad lạnh – Trộn với rau tươi + sốt mè (siêu ngon!)\n🍚 Cơm trộn – Trộn vào cơm lạnh cho bé\n🍜 Canh mát – Thêm vào nước dùng lạnh mùa hè\n🍙 Sushi cuộn – Cuốn rong nho + cơm + cá sống\n🍨 Ăn vặt giòn – Ăn trực tiếp sau khi ngâm\n\nBạn thích cách nào nhất? 😋"
      },
      {
        q: "Làm thế nào để bảo quản? Phải bỏ tủ lạnh không?",
        a: "Dễ lắm, không cần tủ lạnh! Đây là điểm hay của sản phẩm:\n\n🏠 Để ở nơi mát, thoáng khí, tránh ẩm\n❌ KHÔNG cần tủ lạnh (để nhiệt độ phòng là được)\n📦 Gói nhôm kín, không để mở hơi\n📅 Hạn dùng 12 tháng từ ngày sản xuất\n\nSau khi ngâm:\n- Tốt nhất ăn ngay trong 1-2 giờ\n- Nếu để lâu, rong sẽ mềm, mất độ giòn\n- Có thể để tủ lạnh 24 giờ nhưng độ ngon giảm\n- Chỉ ngâm lượng cần dùng ngay, tránh lãng phí\n\nTóm lại: Mua một lần, dùng từ từ trong 12 tháng, không lo bảo quản! 😊"
      },
      {
        q: "Có cam kết gì không? Nếu không hài lòng thì sao?",
        a: "Chúng mình cam kết rất rõ ràng! Không phải lời nói suông:\n\n✅ CAM KẾT KHÔNG TANH 100%\n- Làm đúng theo hướng dẫn (ngâm nước lạnh 3-5 phút)\n- Nếu vẫn tanh → Hoàn tiền 100%\n- Không cần trả hàng, chỉ gửi ảnh/video\n- Hoàn tiền trong 7 ngày\n\n✅ CÓ THỂ MỞ BƯU PHẨM KIỂM TRA TRƯỚC THANH TOÁN\n- Mở hàng, kiểm tra đúng số lượng + chất lượng\n- Nếu lỗi, từ chối thanh toán ngay\n- Chúng mình sẽ gửi cái mới\n\n✅ TẶNG 2 CHAI SỐT MÈ RANG NHẬT + MIỄN PHÍ SHIP\n✅ GIAO HÀNG HỎA TỐC (Nội thành 1-2 giờ, tỉnh xa 1-2 ngày)\n✅ HOTLINE TƯ VẤN 24/7: 0902.515.699\n\nBạn có gì để mất đâu? Cam kết rõ ràng như vậy! 💚"
      },
      {
        q: "Mua online sợ lừa, sợ hàng lỏng hỏng. Tin được không?",
        a: "Hiểu lo lắm! Online thì khó kiểm tra. Nhưng mình có những bảo đảm cụ thể:\n\n🔍 MỞ BƯU PHẨM TRƯỚC THANH TOÁN\n- Được kiểm tra hàng trước khi trả tiền\n- Nếu không ổn, từ chối COD ngay\n- Không cần trả hàng, chúng mình xử lý\n\n📱 ĐỌC REVIEW TỪ KHÁCH HÀNG THỰC\n- 100+ comment trên Facebook/Shopee\n- Toàn 5 sao, không bình luận xấu\n- Xem video unboxing từ khách → Thấy rõ chất lượng\n\n💯 HOÀN TIỀN NẾU KHÔNG HÀI LÒNG\n- 100% hoàn tiền\n- Không cần trả hàng\n- Chỉ cần gửi ảnh/video\n\nLần đầu bạn cứ mua 1 combo (3 hộp) thôi, chỉ 299k. Nếu tốt, mua tiếp. Nếu không thích → hoàn tiền liền. Rủi ro bằng 0! 💯"
      }
    ]
  },

  testimonials: [
    "Chị Hồng (Quận 10): 'Bé Tùng trước biếng rau cực kỳ, nhưng sau khi ăn rong nho = thích ngay! Bây giờ bé không biếng rau nữa!' ⭐⭐⭐⭐⭐",
    "Chị Linh (Blogger Eat Clean): 'Mình đã thử hàng loạt rong nho khác, nhưng chưa có cái nào tốt như Umibudo. Mình đã mua lần thứ 3 rồi!' ⭐⭐⭐⭐⭐",
    "Anh Khánh (Tập gym): 'Salad rong nho + cá hồi = hoàn hảo. Da căng bóng, tiêu hóa tốt. Giá 299k rất xứng đáng!' ⭐⭐⭐⭐⭐",
    "Ông Sơn (68 tuổi): 'Ăn 3 lần/tuần, sau 2 tháng huyết áp ổn định hơn, cảm thấy khỏe hơn!' ⭐⭐⭐⭐⭐"
  ],

  closingMessage: "Cảm ơn bạn đã chat với mình! 😊 Nếu bạn muốn mua hoặc cần tư vấn thêm, bạn có thể:\n\n📞 Gọi hotline: 0902.515.699\n💬 Comment trên Facebook\n📝 Điền form danh sách chờ ở dưới",

  ctaButtons: [
    { text: "📝 Đăng ký danh sách chờ", action: "register" },
    { text: "📞 Gọi hotline", action: "call" }
  ]
};

// ===== CHATBOT LOGIC =====
class UmibugoChatbot {
  constructor() {
    this.isOpen = false;
    this.currentStep = 'greeting';
    this.selectedCategory = null;
    this.init();
  }

  init() {
    this.createWidget();
    this.attachEventListeners();
  }

  createWidget() {
    // Tạo button floating
    const floatingBtn = document.createElement('div');
    floatingBtn.id = 'chatbot-floating-btn';
    floatingBtn.className = 'chatbot-floating-btn';
    floatingBtn.innerHTML = `
      <div class="chatbot-btn-content">
        <span class="chatbot-btn-icon">💬</span>
        <span class="chatbot-btn-badge">1</span>
      </div>
    `;

    // Tạo chatbot window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';
    chatWindow.className = 'chatbot-window chatbot-hidden';
    chatWindow.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-content">
          <h3>🌿 Umibudo Bot</h3>
          <p>Trợ lý ảo của bạn</p>
        </div>
        <button class="chatbot-close-btn">✕</button>
      </div>
      
      <div class="chatbot-messages" id="chatbot-messages">
        <!-- Messages will be added here -->
      </div>
      
      <div class="chatbot-input">
        <input type="text" id="chatbot-input" placeholder="Nhập câu hỏi..." />
        <button id="chatbot-send-btn">➤</button>
      </div>
    `;

    document.body.appendChild(floatingBtn);
    document.body.appendChild(chatWindow);

    // Thêm greeting message
    this.addMessage(chatbotScript.greetingMessage, 'bot');
    setTimeout(() => {
      this.showQuickOptions();
    }, 500);
  }

  attachEventListeners() {
    const floatingBtn = document.getElementById('chatbot-floating-btn');
    const chatWindow = document.getElementById('chatbot-window');
    const closeBtn = document.querySelector('.chatbot-close-btn');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const input = document.getElementById('chatbot-input');

    floatingBtn.addEventListener('click', () => this.toggleChat());
    closeBtn.addEventListener('click', () => this.toggleChat());
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggleChat() {
    const chatWindow = document.getElementById('chatbot-window');
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      chatWindow.classList.remove('chatbot-hidden');
      chatWindow.classList.add('chatbot-visible');
      document.getElementById('chatbot-input').focus();
    } else {
      chatWindow.classList.remove('chatbot-visible');
      chatWindow.classList.add('chatbot-hidden');
    }
  }

  addMessage(text, sender = 'bot') {
    const messagesDiv = document.getElementById('chatbot-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `chatbot-message chatbot-message-${sender}`;
    messageEl.innerHTML = `<div class="chatbot-message-text">${text}</div>`;
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  showQuickOptions() {
    const messagesDiv = document.getElementById('chatbot-messages');
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'chatbot-quick-options';
    
    chatbotScript.quickOptions.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'chatbot-quick-btn';
      btn.textContent = option.label;
      btn.onclick = () => this.handleQuickOption(option.category);
      optionsDiv.appendChild(btn);
    });
    
    messagesDiv.appendChild(optionsDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  handleQuickOption(category) {
    this.selectedCategory = category;
    document.querySelector('.chatbot-quick-options').remove();
    this.addMessage(`Bạn chọn: ${chatbotScript.quickOptions.find(o => o.category === category).label}`, 'user');
    
    setTimeout(() => {
      this.showFAQQuestions();
    }, 300);
  }

  showFAQQuestions() {
    const messagesDiv = document.getElementById('chatbot-messages');
    const faqDiv = document.createElement('div');
    faqDiv.className = 'chatbot-faq-options';
    
    this.addMessage("Bạn muốn biết gì thêm?", 'bot');
    
    chatbotScript.faqQuestions.all.forEach((faq, idx) => {
      const btn = document.createElement('button');
      btn.className = 'chatbot-faq-btn';
      btn.textContent = `${idx + 1}. ${faq.q}`;
      btn.onclick = () => this.handleFAQClick(idx, faq.q, faq.a);
      faqDiv.appendChild(btn);
    });

    // Thêm nút "Muốn mua" và "Khác"
    const buyBtn = document.createElement('button');
    buyBtn.className = 'chatbot-faq-btn chatbot-faq-buy';
    buyBtn.textContent = '🛒 Mình muốn mua ngay!';
    buyBtn.onclick = () => this.handleBuyClick();
    faqDiv.appendChild(buyBtn);

    const otherBtn = document.createElement('button');
    otherBtn.className = 'chatbot-faq-btn';
    otherBtn.textContent = '📝 Khác';
    otherBtn.onclick = () => this.resetChat();
    faqDiv.appendChild(otherBtn);
    
    messagesDiv.appendChild(faqDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  handleFAQClick(idx, question, answer) {
    this.addMessage(question, 'user');
    setTimeout(() => {
      this.addMessage(answer, 'bot');
      setTimeout(() => {
        this.showFollowUpOptions();
      }, 500);
    }, 300);
  }

  showFollowUpOptions() {
    const messagesDiv = document.getElementById('chatbot-messages');
    const followUpDiv = document.createElement('div');
    followUpDiv.className = 'chatbot-followup-options';
    
    const buttons = [
      { text: '❓ Câu hỏi khác', action: 'faq' },
      { text: '🛒 Muốn mua', action: 'buy' },
      { text: '🏠 Về trang chủ', action: 'home' }
    ];

    buttons.forEach(btn => {
      const btnEl = document.createElement('button');
      btnEl.className = 'chatbot-followup-btn';
      btnEl.textContent = btn.text;
      btnEl.onclick = () => this.handleFollowUp(btn.action);
      followUpDiv.appendChild(btnEl);
    });

    messagesDiv.appendChild(followUpDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  handleFollowUp(action) {
    if (action === 'faq') {
      document.querySelector('.chatbot-followup-options').remove();
      this.showFAQQuestions();
    } else if (action === 'buy') {
      this.handleBuyClick();
    } else if (action === 'home') {
      this.toggleChat();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  handleBuyClick() {
    this.addMessage("Mình muốn mua ngay!", 'user');
    setTimeout(() => {
      this.addMessage("Tuyệt vời! 🎉\n\n**Combo Mua 3 Tặng 1 - Giá: 299.000₫**\n✅ Tặng 2 chai sốt mè rang Nhật\n✅ Miễn phí ship toàn quốc\n✅ Cam kết hoàn tiền 100% nếu không hài lòng\n\nBạn có thể:\n1. Điền form danh sách chờ để nhận tư vấn\n2. Gọi hotline: 0902.515.699\n3. Nhắn tin trực tiếp", 'bot');
      setTimeout(() => {
        this.showCTAButtons();
      }, 500);
    }, 300);
  }

  showCTAButtons() {
    const messagesDiv = document.getElementById('chatbot-messages');
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'chatbot-cta-buttons';
    
    const registerBtn = document.createElement('button');
    registerBtn.className = 'chatbot-cta-btn chatbot-cta-primary';
    registerBtn.textContent = '📝 Đăng ký danh sách chờ';
    registerBtn.onclick = () => {
      this.addMessage("Bạn bấm 'Đăng ký danh sách chờ'", 'user');
      this.toggleChat();
      document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const callBtn = document.createElement('button');
    callBtn.className = 'chatbot-cta-btn chatbot-cta-secondary';
    callBtn.textContent = '📞 Gọi hotline: 0902.515.699';
    callBtn.onclick = () => {
      window.location.href = 'tel:0902515699';
    };

    ctaDiv.appendChild(registerBtn);
    ctaDiv.appendChild(callBtn);
    messagesDiv.appendChild(ctaDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  handleBuyNowClick() {
    this.addMessage("Tuyệt vời! Mình sẽ dẫn bạn đến form đăng ký nhé! 😊", 'bot');
    setTimeout(() => {
      this.toggleChat();
      document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }

  resetChat() {
    this.addMessage("Bạn chọn 'Khác'", 'user');
    setTimeout(() => {
      this.selectedCategory = null;
      this.addMessage("Cứ hỏi mình bất cứ điều gì về rong nho nhé! Hoặc bạn có thể:", 'bot');
      setTimeout(() => {
        this.showFAQQuestions();
      }, 300);
    }, 300);
  }

  sendMessage() {
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if (!text) return;

    this.addMessage(text, 'user');
    input.value = '';

    // Tìm FAQ tương ứng với từ khóa
    const matchedFaq = chatbotScript.faqQuestions.all.find(faq =>
      faq.q.toLowerCase().includes(text.toLowerCase()) ||
      text.toLowerCase().includes(faq.q.substring(0, 20).toLowerCase())
    );

    setTimeout(() => {
      if (matchedFaq) {
        this.addMessage(matchedFaq.a, 'bot');
        setTimeout(() => {
          this.showFollowUpOptions();
        }, 300);
      } else if (text.toLowerCase().includes('mua') || text.toLowerCase().includes('đặt hàng')) {
        this.handleBuyClick();
      } else {
        this.addMessage("Xin lỗi, mình không hiểu hết. Bạn có thể hỏi một trong những câu dưới đây hoặc gọi hotline 0902.515.699 nhé! 😊", 'bot');
        setTimeout(() => {
          this.showFAQQuestions();
        }, 300);
      }
    }, 300);
  }
}

// ===== KHỞI ĐỘNG CHATBOT =====
document.addEventListener('DOMContentLoaded', () => {
  window.umibugoChatbot = new UmibugoChatbot();
});
