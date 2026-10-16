// Bot matnlari: o'zbekcha va ruscha
export const texts = {
  uz: {
    chooseLanguage: 'Tilni tanlang / Выберите язык',
    // Xush kelibsiz rasmining izohi (HTML) — name oldindan zararsizlantirilgan bo'ladi
    welcome: (name) =>
      `Assalom alekum${name ? `, ${name}` : ''}🤝\n\n🙋‍♂️<b>Lusso_brand.kr</b>\nKoreyada sifatli ishonchli\nKrasofkalar👟\nAtirlar🍋‍🟩\nOchkilar😎\n\n🚚Pochtasi Bepul va Tez💨\n\n🏪Do’kondagi mahsulotlarni koring👇`,
    askPhone: "📱 Buyurtmalar bo'yicha bog'lanishimiz uchun telefon raqamingizni yuboring — pastdagi tugmani bosing 👇",
    sendPhone: '📱 Telefon raqamni yuborish',
    phoneSaved: 'Rahmat! ✅\n\nEndi do\'konni ochib, xaridni boshlashingiz mumkin 👇',
    menuShop: '🛍 Do\'konni ochish',
    menuOrders: '📦 Buyurtmalarim',
    menuContact: '📞 Aloqa',
    menuInstall: "📲 Ilovani o'rnatish",
    menuLang: '🌐 Til / Язык',
    installIphone:
      "📱 *iPhone'da o'rnatish*\n\n1️⃣ Havolani *ustiga bosib turing*\n2️⃣ «Открыть в Safari» ni tanlang\n3️⃣ Pastdagi «Ulashish» tugmasi → «На экран «Домой»» → «Добавить»",
    installAndroid:
      "🤖 *Samsung / Android'da o'rnatish*\n\n1️⃣ Havolani *ustiga bosib turing*\n2️⃣ «Открыть в Chrome» ni tanlang\n3️⃣ Yuqoridagi ⋮ → «Добавить на главный экран» → «Установить»",
    installLink: (url) =>
      `📲 *Do'konni telefoningizga ilova qilib o'rnating!*\n\n👇 Shu havolani *ustiga bosib turing* va videodagidek o'rnatib oling:\n\n${url}\n\n⚠️ Havola Telegram ichida emas — iPhone'da *Safari*, Samsung'da *Chrome* orqali ochilishi kerak. Shundan keyin LUSSO telefoningiz ekranida ilova bo'lib turadi.`,
    noOrders: 'Sizda hali buyurtma yo\'q.\n\nDo\'konni ochib, birinchi buyurtmangizni bering 🛍',
    yourOrders: '📦 *Sizning buyurtmalaringiz:*',
    contact: (phone) =>
      `📞 *Biz bilan bog'laning*\n\nMahsulot, o'lcham, to'lov yoki yetkazib berish bo'yicha savollaringiz bo'lsa — bizga yozing, mutaxassisimiz tez orada javob beradi.\n\n📱 WhatsApp / Telegram: *${phone}*\n🕙 Har kuni 10:00 — 22:00 (Koreya vaqti)`,
    openShopHint: 'Do\'konni ochish uchun pastdagi tugmani bosing 👇',
    orderCreated: (o) =>
      `✅ *Buyurtmangiz qabul qilindi!*\n\n🧾 Buyurtma: *${o.orderNumber}*\n💰 Jami: *${money(o.total)}*\n\n💳 To'lov uchun:\n\`${o.bankAccount}\`\n${o.bankName} — ${o.bankHolder}\n\n⚠️ To'lovni amalga oshirib, chek rasmini yuboring. Tasdiqlangach, buyurtmangiz jo'natiladi 📦`,
    receiptReceived: 'Chek qabul qilindi ✅\nAdmin tekshirgach sizga xabar beramiz.',
    statusCONFIRMED: (o) =>
      `✅ *To'lovingiz tasdiqlandi!*\n\n🧾 Buyurtma: ${o.orderNumber}\nBuyurtmangiz tayyorlanmoqda 📦`,
    statusSHIPPED: (o) =>
      `🚚 *Buyurtmangiz jo'natildi!*\n\n🧾 Buyurtma: ${o.orderNumber}${
        o.trackingNumber ? `\n📮 Kuzatuv raqami: \`${o.trackingNumber}\`` : ''
      }\n\n1-2 kun ichida yetib boradi.`,
    statusDELIVERED: (o) =>
      `🎉 *Buyurtmangiz yetkazildi!*\n\n🧾 ${o.orderNumber}\n\nXaridingiz muborak bo'lsin! Yana kutamiz 🖤`,
    statusCANCELLED: (o) => `❌ Buyurtma ${o.orderNumber} bekor qilindi.\n\nSavollar bo'lsa: 010-5790-4777 (WhatsApp / Telegram).`,
    askQuestionBtn: '❓ Savol berish',
    askQuestionText: "Savollaringiz bo'lsa — WhatsApp yoki Telegram orqali yozing: *010-5790-4777* 👇",
  },

  ru: {
    chooseLanguage: 'Tilni tanlang / Выберите язык',
    welcome: (name) =>
      `Здравствуйте${name ? `, ${name}` : ''}🤝\n\n🙋‍♂️<b>Lusso_brand.kr</b>\nКачественные и надёжные товары в Корее\nКроссовки👟\nПарфюм🍋‍🟩\nОчки😎\n\n🚚Доставка бесплатная и быстрая💨\n\n🏪Смотрите товары в магазине👇`,
    askPhone: '📱 Чтобы мы могли связаться с вами по заказу, отправьте номер телефона — нажмите кнопку ниже 👇',
    sendPhone: '📱 Отправить номер',
    phoneSaved: 'Спасибо! ✅\n\nТеперь можно открыть магазин 👇',
    menuShop: '🛍 Открыть магазин',
    menuOrders: '📦 Мои заказы',
    menuContact: '📞 Связь',
    menuInstall: '📲 Как установить',
    menuLang: '🌐 Til / Язык',
    installIphone:
      '📱 *Установка на iPhone*\n\n1️⃣ *Нажмите и удерживайте* ссылку\n2️⃣ Выберите «Открыть в Safari»\n3️⃣ Внизу «Поделиться» → «На экран «Домой»» → «Добавить»',
    installAndroid:
      '🤖 *Установка на Samsung / Android*\n\n1️⃣ *Нажмите и удерживайте* ссылку\n2️⃣ Выберите «Открыть в Chrome»\n3️⃣ Вверху ⋮ → «Добавить на главный экран» → «Установить»',
    installLink: (url) =>
      `📲 *Установите магазин на телефон как приложение!*\n\n👇 *Нажмите и удерживайте* эту ссылку и установите, как показано в видео:\n\n${url}\n\n⚠️ Ссылку нужно открыть не в Telegram, а в *Safari* (iPhone) или *Chrome* (Samsung). После этого LUSSO будет на экране телефона как приложение.`,
    noOrders: 'У вас пока нет заказов.\n\nОткройте магазин и сделайте первый заказ 🛍',
    yourOrders: '📦 *Ваши заказы:*',
    contact: (phone) =>
      `📞 *Связаться с нами*\n\nЕсть вопросы о товаре, размере, оплате или доставке? Напишите нам — специалист ответит в ближайшее время.\n\n📱 WhatsApp / Telegram: *${phone}*\n🕙 Ежедневно 10:00 — 22:00 (по Корее)`,
    openShopHint: 'Нажмите кнопку ниже, чтобы открыть магазин 👇',
    orderCreated: (o) =>
      `✅ *Заказ принят!*\n\n🧾 Заказ: *${o.orderNumber}*\n💰 Итого: *${money(o.total)}*\n\n💳 Для оплаты:\n\`${o.bankAccount}\`\n${o.bankName} — ${o.bankHolder}\n\n⚠️ Оплатите и отправьте скриншот чека. После подтверждения заказ будет отправлен 📦`,
    receiptReceived: 'Чек получен ✅\nМы сообщим после проверки.',
    statusCONFIRMED: (o) => `✅ *Оплата подтверждена!*\n\n🧾 Заказ: ${o.orderNumber}\nЗаказ готовится 📦`,
    statusSHIPPED: (o) =>
      `🚚 *Заказ отправлен!*\n\n🧾 Заказ: ${o.orderNumber}${
        o.trackingNumber ? `\n📮 Трек-номер: \`${o.trackingNumber}\`` : ''
      }\n\nДоставка 1-2 дня.`,
    statusDELIVERED: (o) => `🎉 *Заказ доставлен!*\n\n🧾 ${o.orderNumber}\n\nСпасибо за покупку! Ждём снова 🖤`,
    statusCANCELLED: (o) => `❌ Заказ ${o.orderNumber} отменён.\n\nПо вопросам: 010-5790-4777 (WhatsApp / Telegram).`,
    askQuestionBtn: '❓ Задать вопрос',
    askQuestionText: 'Есть вопросы — напишите в WhatsApp или Telegram: *010-5790-4777* 👇',
  },
};

export function money(n) {
  return '₩' + Number(n || 0).toLocaleString('ko-KR');
}

export function t(lang) {
  return texts[lang] || texts.uz;
}

export default texts;
