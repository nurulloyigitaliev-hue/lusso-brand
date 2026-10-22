# Brend do'kon shabloni — Telegram Mini App + Bot + Admin panel

Bu shablon LUSSO BRAND KR loyihasidagi **barcha funksiyalarni** boshqa brend uchun
qayta qurish uchun. Natija: funksiyalar bir xil, lekin dizayn, matnlar va
"his-tuyg'u" **butunlay boshqa** — yangi do'kon LUSSO'ning rangi almashgan nusxasi bo'lib qolmaydi.

## Qanday ishlatiladi (3 qadam)

1. **1-qism — Anketa**ni to'ldiring: brend ma'lumotlari, kategoriyalar, ranglar, dizayn DNK.
2. **2-qism** bo'yicha brend fayllarini (logo, rasmlar, videolar) `BREND/` va `MAHSULOTLAR/` papkalariga soling.
3. Butun faylni AI'ga (Claude Code) bering va yozing:
   > `SHABLON.md bo'yicha yangi do'kon yarat. Anketa to'ldirilgan, fayllar BREND/ papkasida.`

> Bir xil anketa = bir xil natija emas. Unikallikni **1-G (Dizayn DNK)** va **3-qismdagi unikallik
> qoidalari** ta'minlaydi. Har bir yangi brend uchun DNK kombinatsiyasi oxirgi jadvalga yoziladi —
> keyingi brendlar ham bir-birini takrorlamaydi.

---

## 1-QISM. ANKETA (siz to'ldirasiz)

`{{...}}` o'rniga qiymat yozing. Bo'sh qoldirilgan maydonni AI brendga mos qilib o'zi tanlaydi.

### A. Brend

```
{{BREND_NOMI}}        = masalan: NOVA STORE KR
{{QISQA_NOM}}         = masalan: NOVA            (logo o'rni, placeholder, a'zolik kartasi)
{{SHIOR}}             = masalan: "Har kuni yangi uslub"
{{BREND_TAVSIFI}}     = 1–2 gap: nima sotadi va kim uchun
                        masalan: "Koreyadagi ayollar uchun sumka, aksessuar va kosmetika"
{{MAQSADLI_MIJOZ}}    = masalan: 18–35 yoshli ayollar, Koreyada yashovchi o'zbek/rus tilli
{{BREND_OVOZI}}       = matnlar uslubi: premium-jiddiy | do'stona-iliq | yoshlarcha-o'ynoqi | nafis-sokin
{{BUYURTMA_PREFIKS}}  = 2–3 harf, masalan: NV   → buyurtma raqami NV-251009-4821
{{AZOLIK_NOMI}}       = masalan: NOVA CLUB      (profildagi a'zolik belgisi)
```

### B. Aloqa, to'lov, kirish

```
{{BOT_USERNAME}}      = masalan: nova_store_bot   (BotFather'da yangi bot ochiladi)
{{EGA_TELEGRAM}}      = masalan: https://t.me/nova_admin
{{ALOQA_TELEFON}}     = masalan: 010-1234-5678    (WhatsApp + Telegram + qo'ng'iroq)
{{ISH_VAQTI}}         = masalan: Har kuni 10:00 — 22:00 (Koreya vaqti)
{{INSTAGRAM}}         = masalan: https://www.instagram.com/nova_store.kr/   (bo'lmasa — yo'q)
{{BANK_NOMI}}         = masalan: KB Kookmin Bank
{{HISOB_RAQAM}}       = masalan: 123456-01-234567
{{QABUL_QILUVCHI}}    = masalan: NOVA STORE   (예금주)
{{ADMIN_PAROL}}       = yangi, kamida 10 belgili parol (LUSSO parolini ishlatmang)
```

### C. Davlat, valyuta, yetkazish

Standart qiymatlar — Janubiy Koreya. Boshqa davlat bo'lsa, almashtiring.

```
{{DAVLAT}}            = Janubiy Koreya
{{VALYUTA}}           = ₩  (formatlash: toLocaleString('ko-KR'))
{{VAQT_ZONASI}}       = Asia/Seoul
{{TELEFON_FORMATI}}   = 010-XXXX-XXXX
{{MANZIL_MAYDONLARI}} = 주소 (manzil) + 상세주소 (bino, xonadon) + 우편번호 (ixtiyoriy)
{{KURYER}}            = 택배
{{KUZATUV_HAVOLASI}}  = https://m.search.naver.com/search.naver?query=<raqam> 택배조회
{{YETKAZISH}}         = "doim bepul (narxga kiritilgan)"  YOKI  "₩3,000, ₩100,000 dan bepul"
{{TILLAR}}            = uz + ru   (asosiy til: uz)
```

### D. Kategoriyalar

Har bir kategoriya uchun bitta qator. **Variant turi** — mahsulot qanday tanlanishini belgilaydi.

| slug | Nomi (uz) | Nomi (ru) | Emoji | Variant turi | Papka (MAHSULOTLAR/ ichida) |
|---|---|---|---|---|---|
| `bags` | Sumkalar | Сумки | 👜 | rang | `sumka` |
| `beauty` | Kosmetika | Косметика | 💄 | hajm-ml | `kosmetika` |
| ... | | | | | |

Variant turlari:
- `oyoq-mm` — 240…285 mm, har biridan N ta; mahsulot oynasida mm → EU/US jadvali.
- `kiyim` — XS, S, M, L, XL, XXL; mahsulot oynasida o'lcham jadvali (ko'krak/bel sm).
- `hajm-ml` — 30 / 50 / 100 ml (narx farqi bilan).
- `rang` — har rangning o'z rasmi va rang doirachasi.
- `yoq` — bitta "Standart" variant (faqat zaxira soni).

### E. Maxsus qoidalar (ixtiyoriy)

```
{{MAXSUS_BOLIM}}      = yo'q  YOKI  nomi + izoh + narx qoidasi + eng kam xarid soni
                        (LUSSO'da "Gramli atirlar": umumiy ro'yxat va tavsiyalarda ko'rinmaydi,
                         faqat o'z bo'limida; tepasida namunaviy rasmlar galereyasi + qisqa izoh;
                         10 ml asosiy narx, 20 ml qo'shimcha narx bilan; kamida 3 ta olinadi)
{{UPSELL_QOIDASI}}    = masalan: "savatda sumka bo'lsa — eng arzon aksessuarni taklif qil,
                         aks holda katalogdagi eng arzon mahsulotni"
{{KAM_QOLDI}}         = 3   (shundan kam qolsa "Faqat N ta qoldi" va admin ogohlantirishi)
```

### F. Ranglar (o'zingiz berasiz)

Kamida 3 tasini bering — qolganini AI shulardan hosil qiladi.

```
{{URGU}}              = asosiy urg'u rangi (tugmalar, narx, faol holat)    masalan: #2f6f5e
{{URGU_2}}            = ikkinchi urg'u / gradient uchun (ixtiyoriy)         masalan: #9fd3b8
{{FON}}               = sahifa foni                                          masalan: #f4f6f3
{{KARTA}}             = kartalar foni (ixtiyoriy, odatda oq)                 masalan: #ffffff
{{MATN}}              = asosiy matn rangi (ixtiyoriy)                        masalan: #121614
{{TOQ}}               = to'q bloklar va asosiy tugmalar (ixtiyoriy)          masalan: #10221d
{{TEMA}}              = och | to'q | ikkalasi (tizim sozlamasiga qarab)
```

### G. Dizayn DNK — unikallik kaliti

Har qatordan **bitta harf** tanlang. 🚫 belgili variant — LUSSO'da ishlatilgan, uni tanlash mumkin emas.
Tanlamasangiz `AI tanlasin` deb yozing — AI tanlaydi va tanlovini README'ga yozadi.

```
{{DIZAYN_DNK}} = masalan: 1B 2C 3A 4D 5B 6A 7C 8A 9B 10A 11C 12B 13A 14B 15A
              yoki: AI tanlasin
```

| # | O'q | Variantlar |
|---|---|---|
| 1 | **Kayfiyat** | 🚫 sokin premium (qaymoq fon + oltin) · **A** editorial/jurnal (katta sarlavhalar, ko'p bo'sh joy) · **B** yorqin-yoshlarcha (qalin shakllar, stikerlar) · **C** minimal-texnik (ingichka chiziqlar, setka) · **D** yumshoq-organik (to'lqinli shakllar, pastel) · **E** to'q "night" (qora fon, yorqin urg'u) |
| 2 | **Shrift** (kirill + lotin shart) | 🚫 Onest · **A** Manrope · **B** Unbounded + Inter · **C** Playfair Display + Manrope · **D** Montserrat · **E** Golos Text · **F** Cormorant Garamond + Jost · **G** Rubik · **H** Comfortaa + Nunito |
| 3 | **Burchaklar** | 🚫 12/20/28 yumaloq · **A** o'tkir 2–6 px · **B** o'rta 10–14 px · **C** pill tugmalar + 16 px kartalar · **D** aralash (kartalar to'g'ri, tugmalar yumaloq) |
| 4 | **Bosh sahifa tepasi** | 🚫 gradient yoy + orbita halqalari + ✦ · **A** to'liq kenglikdagi brend banneri (rasm ustida sarlavha) · **B** bento-grid (1 katta + 2 kichik blok) · **C** katta tipografik sarlavha + kategoriya chiplari · **D** ustma-ust turgan mahsulot kartalari "stack" · **E** sokin animatsiyali CSS fon |
| 5 | **Navigatsiya** | 🚫 suzuvchi dock, 5 ikonka · **A** to'liq kenglikdagi tab bar (yozuvlar bilan) · **B** 4 tugma + o'rtada katta savat tugmasi · **C** faqat ikonkalar, tanlangani yozuv bilan "pill"ga kengayadi · **D** tepada bo'lim tablari + pastda suzuvchi savat |
| 6 | **Mahsulot kartasi** | 🚫 4:5 rasm, ma'lumot rasm ostida · **A** 1:1 rasm, narx rasm ustida teg · **B** 3:4, ma'lumot rasm ichida gradient ustida · **C** katalogda grid ↔ ro'yxat almashtirgich · **D** rangli "plita" fon, mahsulot markazda |
| 7 | **Kategoriyalar** | 🚫 2 ustunli plitkalar (rasm + soni) · **A** doira ikonkalar tasmasi · **B** to'liq kenglikdagi katta kartalar · **C** gorizontal karusel · **D** bento (birinchisi katta) |
| 8 | **"Savatga qo'shildi" effekti** | 🚫 rasm yoy bo'ylab savatga uchadi · **A** tugma ✓ ga aylanadi + pastdan mini-savat paneli · **B** savat raqami sakraydi + zarrachalar · **C** karta ustida "+1" suzib chiqadi · **D** yon tomondan rasmli bildirishnoma |
| 9 | **Story** | 🚫 Instagram doirachalari · **A** yumaloq burchakli vertikal mini-kartalar (9:16) · **B** kvadrat plitkalar + progress halqa · **C** bitta katta "Bugun" kartasi |
| 10 | **Splash + tanishtiruv** | 🚫 logo + 3 ta matnli slayd · **A** logo chizilib chiqadi + 3 ta rasmli slayd · **B** bitta ekran: 3 ta afzallik ikonkalar bilan · **C** tanishtiruv yo'q, bosh sahifada yopiladigan "Xush kelibsiz" kartasi |
| 11 | **Bezak motivi** | 🚫 ✦ yulduzcha + orbitalar · **A** logotipdan olingan naqsh · **B** grain/noise tekstura · **C** geometrik chiziqlar · **D** to'lqinlar · **E** bezaksiz, toza |
| 12 | **Ikonkalar** | 🚫 hozirgi ingichka chiziqli to'plam · **A** to'ldirilgan (filled) · **B** duotone (urg'u rangida ikkinchi qatlam) · **C** qalin 2 px, yumaloq uchlar |
| 13 | **Animatsiya xarakteri** | 🚫 "spring" sakrash + pastdan ko'tarilish · **A** yumshoq fade/blur · **B** tez va keskin (120–180 ms) · **C** scroll parallax · **D** minimal (deyarli harakatsiz) |
| 14 | **To'lov sahifasi** | 🚫 bank kartasi ko'rinishidagi blok · **A** qog'oz chek ko'rinishi (tishli qirra) · **B** 1-2-3 qadamli yo'riqnoma ro'yxati |
| 15 | **Profil a'zolik kartasi** | 🚫 "LUSSO MEMBER" yozuvli belgi · **A** a'zolik kartasi (ism + mijoz raqami) · **B** xaridlar soniga qarab daraja (Bronze/Silver/Gold — faqat ko'rinish) · **C** avatar + statistika (buyurtmalar, sevimlilar) |

---

## 2-QISM. BREND FAYLLARI

```
BREND/
├── logo.png              shaffof fon, kamida 1024×1024 (splash, bosh sahifa, bot)
├── logo-oq.png           ixtiyoriy — to'q fon ustida ishlatish uchun
├── xush-kelibsiz.jpg     botdagi /start banneri (gorizontal, ~1280×720, logo bilan)
├── ikonka.png            kvadrat 1024×1024 — 64/180/192/512 px ikonkalar shundan yasaladi
├── story/                1080×1920, 3–6 ta (birinchi storylar)
├── kategoriya/<slug>.jpg ixtiyoriy — kategoriya plitkasi (bo'lmasa birinchi mahsulot rasmi)
├── tanishtiruv/1-3.jpg   ixtiyoriy — DNK 10A tanlansa
└── video/
    ├── iphone.mp4        "Ilovani o'rnatish" videosi (yangi do'kon manzili bilan qayta yoziladi)
    └── samsung.mp4

MAHSULOTLAR/
├── <kategoriya papkasi>/ "Mahsulot nomi - narx - eski narx (1).jpg"
│                         bir xil nomli rasmlar = bitta mahsulot; "89k" ham bo'ladi
└── tavsiflar.json        { "Mahsulot nomi": { brand, descUz, descRu, variants } }
```

Rasmlar: JPG/PNG (HEIC emas), mahsulot uchun kamida 1000 px, bir xil fon va yorug'lik — do'kon
professional ko'rinadi.

---

## 3-QISM. AI UCHUN TOPSHIRIQ

> Shu qismdan pastgacha — AI uchun ko'rsatma. 1–2-qismdagi qiymatlar `{{...}}` o'rniga qo'yiladi.

### 3.0. Qanday qurish kerak

Yangi do'kon **alohida papka va alohida git repo**da quriladi. Ikki yo'l bor — **A tavsiya qilinadi**:

**A) LUSSO kodini funksional asos qilib olish.** Repodan nusxa olinadi, keyin:
- **Funksional qatlam saqlanadi** (mantiq, API, baza, bot oqimi): `backend/src/` (controllers, models,
  middlewares, routes, core/cache, core/thumbs, core/uploads), `miniapp/src/store.js`, `api.js`,
  `telegram.js`, `catalog.js`, `framing.js`, admin sahifalarining mantiqi.
- **Dizayn qatlami noldan yoziladi** — eski fayl ustiga tahrir emas, yangi fayl:
  `miniapp/src/styles.css`, `miniapp/index.html` (splash), `Home.jsx`, `ProductCard.jsx`,
  `BottomNav.jsx`, `Onboarding.jsx`, `StoryViewer.jsx` ko'rinishi, `Icon.jsx` (yangi ikonkalar),
  `Payment.jsx` va `Profile.jsx` ko'rinishi, `fx.js` (yangi effekt), `admin/src/styles.css`,
  admin Login/splash.
- **Brend qatlami to'liq almashtiriladi** — 4-qismdagi jadvaldagi har bir joy.
- LUSSO'ga xos fayllar olib tashlanadi yoki anketaga moslanadi: `core/decants.js`,
  `core/categoryNames.js`, `core/prices.js` jadvali, `prisma/seed.js` mahsulotlari,
  `prisma/import.js` dagi brendlar ro'yxati va o'lchamlar, `.vercel/`, `dist/`, `uploads/` ichidagi fayllar.

**B) Noldan yozish** — quyidagi 3.2–3.7 spetsifikatsiya bo'yicha.

### 3.1. Unikallik qoidalari (majburiy)

1. Dizayn `{{DIZAYN_DNK}}` bo'yicha quriladi. 🚫 variantlardan birortasi ham ishlatilmaydi.
   "AI tanlasin" bo'lsa — kayfiyat (1) `{{BREND_OVOZI}}` va `{{MAQSADLI_MIJOZ}}`ga qarab tanlanadi,
   qolganlari unga mos; tanlov `README.md` boshida "Dizayn DNK" bo'lib yoziladi.
2. Ranglar faqat `{{URGU}}`, `{{FON}}` va boshqa berilgan ranglardan. Yetishmaganlari
   (hover, soft fon, gradient, ustidagi yozuv rangi, chegara chiziqlari) shulardan hosil qilinadi.
   Matn/fon kontrasti kamida 4.5:1 (WCAG AA) — tekshiriladi va kerak bo'lsa to'qlashtiriladi.
3. CSS o'zgaruvchilari neytral nomlanadi: `--accent`, `--accent-2`, `--accent-soft`, `--on-accent`,
   `--surface`, `--ink`... (`--gold`, `gold-text` kabi LUSSO nomlari yo'q).
4. **Barcha matnlar `{{BREND_OVOZI}}` uslubida qaytadan yoziladi** — mini ilova, bot, admin.
   LUSSO iboralari so'zma-so'z olinmaydi ("Savatga qo'shildi ✦", "LUSSO MEMBER",
   "bugun nima tanlaymiz?", "Maxsus takliflar", "Eng ko'p sotilgan" va h.k.).
   Bosh sahifa bo'limlari nomlari brendga xos bo'ladi va kamida 2 ta bo'limning tartibi almashadi.
5. Bot salomlashuvi, menyu emojilari, status xabarlari — yangi brend ovozida.
6. Texnik izlar ham yangi: `localStorage` kalitlari `{{QISQA_NOM}}` kichik harfda prefiks bilan
   (`nova-cart`, `nova-fav`, `nova-lang`, `nova-onboarded`, `nova-guest-id`, `nova-admin-token`),
   oyna hodisasi nomi (`nova:contact`), paket nomlari, JWT_SECRET, admin parol,
   buyurtma prefiksi, Render/Vercel loyiha nomlari.
7. Placeholder rasm (rasm ochilmasa) — `{{QISQA_NOM}}` yozuvli, yangi uslubdagi SVG.
8. Yakuniy tekshiruv: yangi repoda `LUSSO|Lusso|lusso|Onest|#a87f26|d6ae51|f2f0eb` qidiruvi
   **0 natija** berishi shart.

### 3.2. Texnologiya

```
loyiha/
├── backend/   Node.js (ESM) + Express + grammY (bot) + Prisma + PostgreSQL (Neon) + sharp
├── miniapp/   React 18 + Vite 6 + zustand — mijozlar uchun Telegram Mini App (port 5173)
└── admin/     React 18 + Vite 6 — admin panel (port 5174), Telegram ichida ham, brauzerda ham
```

- Kod izohlari va admin interfeysi — o'zbek tilida. Mini ilova va bot — `{{TILLAR}}` (ikki tilli).
- Valyuta `{{VALYUTA}}`, vaqt zonasi `{{VAQT_ZONASI}}`.
- UI kutubxonasi yo'q — sof CSS; barcha ranglar faqat `:root` o'zgaruvchilarida;
  `prefers-reduced-motion` hurmat qilinadi; shrift Google Fonts'dan (DNK 2).

### 3.3. Ma'lumotlar bazasi (Prisma)

- **User**: telegramId (unique; brauzer mijozlari `web_<id>`), firstName, lastName, username, phone,
  language, isBlocked, isAdmin, createdAt.
- **Address**: title, zipCode, city, street, detail, isDefault (`{{MANZIL_MAYDONLARI}}`).
- **Category**: slug, nameUz, nameRu, emoji, sortOrder, isActive, imageUrl (plitka rasmi, bo'sh bo'lsa
  birinchi mahsulot rasmi), gallery[] (kategoriya tepasidagi namunaviy rasmlar), noteUz, noteRu.
  Boshlang'ich kategoriyalar — 1-D jadvalidan.
- **Product**: nameUz, nameRu, brand, descUz, descRu (har qator — alohida band), price, oldPrice,
  categoryId, isActive, isNew, sortOrder, createdAt, updatedAt.
- **ProductImage**: url, sortOrder (birinchisi asosiy).
- **ProductVariant**: label, stock, extraPrice, color (HEX, ixtiyoriy), sortOrder.
- **UploadedFile**: name, mime, data (Bytes) — yuklangan rasmlarning asl nusxasi bazada
  (bepul serverda disk vaqtinchalik; disk faqat kesh).
- **Order**: orderNumber (`{{BUYURTMA_PREFIKS}}-YYMMDD-XXXX`), items (JSON: productId, variantId,
  name, variant, price, qty, image), subtotal, deliveryFee, total, status, customerName, phone,
  manzil maydonlari, comment, receiptUrl, trackingNumber, adminNote, addressFix (admin "Ma'lumot
  xato kiritildi" bosgan — mijozdan to'g'ri manzil kutilmoqda).
- **OrderStatus**: PENDING_PAYMENT → RECEIPT_SENT → CONFIRMED → SHIPPED → DELIVERED, yoki CANCELLED.
- **Story**: imageUrl, titleUz, titleRu, link (`product:<id>`, kategoriya yoki URL), isActive, sortOrder.
- **Broadcast**: text, imageUrl, buttonText, buttonUrl, sentCount, failCount.
- **Setting** (bitta qator): shopName, deliveryFee, freeDeliveryFrom, bankName, bankAccount,
  bankHolder, supportUsername, webAppUrl, adminUrl, panelPassword, aboutUz, aboutRu, isOpen,
  stockVisible (mijozga "omborda N ta bor" ko'rinsinmi).

### 3.4. Backend

- Tuzilma: `config/`, `core/` (bot, cache, prices, thumbs, uploads), `database/`, `models/`,
  `controllers/` (bot, cart, admin), `routes/` (client, admin, bot), `middlewares/` (auth, upload,
  ratelimit, async), `locales/` (bot matnlari).
- **Mijoz API** (`/api/...`): `GET /access` (himoyasiz — brauzer ruxsati va bot havolasi); qolganlari
  Telegram `initData` HMAC tekshiruvi bilan: auth, language, catalog, products/:id, stories,
  bestsellers (buyurtmalar `items` JSON'idan), settings (faqat ochiq maydonlar — parol va xizmat
  manzillarisiz), orders (yaratish, mening buyurtmalarim, chek yuklash, `orders/:id/address` —
  admin so'ragan buyurtmaga to'g'ri manzil kiritish), addresses.
- **Katalog** butunligicha bir marta beriladi va **qolgan zaxira bo'yicha** tartiblanadi (ko'pi tepada,
  tugaganlar pastda); filtr/saralash/qidiruv telefonning o'zida.
- **Buyurtma**: narxlar serverda qayta hisoblanadi (mijoz yuborgan narxga ishonilmaydi); zaxira
  yetarliligi tekshiriladi va kamaytiriladi; `{{MAXSUS_BOLIM}}` eng kam soni yetmasa buyurtma
  qabul qilinmaydi; telefon va manzil saqlanadi; yetkazish `{{YETKAZISH}}`.
- **Manzilni qayta kiritish** faqat `addressFix` belgilangan va hali jo'natilmagan (SHIPPED /
  DELIVERED / CANCELLED emas) buyurtmada mumkin; manzil to'liqligi tekshiriladi (kamida 6 belgi
  va uy raqami); mijozga tasdiq, adminlarga eski va yangi manzil bilan xabar.
- **Admin API** (`/api/admin/...`): health (serverni uyg'otish), login, keyin JWT bilan: stats,
  orders (ro'yxat / bitta / holat / `request-fix` — "Ma'lumot xato kiritildi", mijozga bot orqali
  yetib bordimi-yo'qmi qaytariladi), sales summary + savdoni tozalash, products CRUD (+ kategoriyadagi
  o'rni), stock (ko'p variant qoldig'ini birdan yangilash), categories CRUD, stories, users (qidiruv),
  broadcast (+ tarix), settings, upload (multer, faqat rasm, 8 MB).
- Admin har qanday o'zgartirish kiritsa — mijozlar uchun xotira keshi darhol tozalanadi.
- **Admin kirishi**: (1) Telegram ichida — initData orqali parolsiz, faqat adminlar
  (`/admin PAROL` qilganlar + `ADMIN_IDS`); (2) brauzerdan — parol (Setting.panelPassword,
  bo'sh bo'lsa `.env` ADMIN_PASSWORD). Parol bilan kirish: 5 xato → IP 15 daqiqaga blok
  (Telegram orqali kirishga ta'sir qilmaydi).
- **Brauzerdan buyurtma**: bitta IP'dan buyurtmalar soni cheklanadi (Telegram buyurtmalariga ta'sir yo'q).
- `features.json` → `browserAccess`: do'kon va panelni Telegramsiz brauzerda ochish ruxsati
  (GitHub Actions workflow bilan yoqiladi/o'chiriladi). O'chiq bo'lsa — "botni oching" ekrani.
- `TELEGRAM_ORDERS=false` — Mini App ichida buyurtma berilmaydi, savat `#cart=...` havolasi bilan
  brauzerda ochiladi. `SKIP_INITDATA_CHECK=true` — faqat localhost'dan test rejimi.
- **Tezlik**: JSON javoblar siqiladi (compression); `/uploads/x.jpg?w=240|480|720` — sharp bilan
  WebP thumbnail (bir marta yasaladi, diskda saqlanadi); rasmlar uzoq muddatli cache header bilan;
  diskda yo'q fayl bazadan tiklanadi; o'chib ketgan rasm mijozga yuborilmaydi.
- Bepul serverda uxlab qolmaslik uchun har 10 daqiqada o'ziga yengil so'rov.
- `core/prices.js` — narxlar jadvali `[nomi, narxi, eski narxi]`; `applyPrices({dryRun})` faqat narxni yangilaydi.
- `{{MAXSUS_BOLIM}}` bo'lsa — server ishga tushganda kategoriya yo'q bo'lsa yaratiladi.
- Skriptlar: `db:push`, `db:seed`, `db:prices`, `db:studio`, `db:import` (`MAHSULOTLAR/` papkalaridan
  mahsulot yaratish: rasmlarni kichraytiradi, `uploads/` ga qo'yadi, bazaga yozadi, `_yuklangan/` ga
  olib qo'yadi; variantlar 1-D dagi variant turiga qarab avtomatik; `tavsiflar.json` dan tavsif).
- `tunnel.js` — cloudflare/ngrok tunnel ochib, manzillarni bazaga va bot menyu tugmasiga yozadi.

### 3.5. Telegram bot (grammY)

- `/start` → **bitta xabar**: `BREND/xush-kelibsiz.jpg` banneri + salomlashish (ism bilan, brend
  tavsifi, yetkazish sharti; HTML, ism zararsizlantiriladi) + asosiy menyu tugmalari. Yangi mijozning
  tili Telegram tilidan olinadi (ru → ruscha, aks holda uz). Telefon saqlanmagan bo'lsa — alohida
  xabarda pastki "Telefon raqamni yuborish" (request_contact) tugmasi bilan so'raladi.
- Asosiy menyu — **faqat inline tugmalar** (pastki web_app klaviaturasi iOS'da initData'ni bo'sh
  yuborishi mumkin): Do'konni ochish (web_app) · **Ilovani o'rnatish** (iPhone va Samsung videolari +
  bosib turiladigan do'kon havolasi) · Buyurtmalarim | Aloqa · Instagram (`{{INSTAGRAM}}`) · UZ | RU.
  Til tugmasi **o'sha xabarning o'zini** yangi tilga o'giradi (yangi xabar yubormaydi).
- Aloqa: `{{ALOQA_TELEFON}}`, `{{ISH_VAQTI}}`, WhatsApp / Telegram / Instagram tugmalari.
- Banner va video Telegram'ga bir marta fayldan yuklanadi, keyin `file_id` keshidan; `file_id`
  eskirsa fayldan qayta; rasm ketmasa menyu matn holida yuboriladi.
- **Chek botga**: mijoz chekni ilovaga emas, botga rasm (yoki rasm-fayl) qilib yuborsa — eng oxirgi
  to'lanmagan buyurtmasiga biriktiriladi (fayl disk + bazaga saqlanadi); buyurtma topilmasa —
  aloqa ma'lumoti bilan javob.
- **Chekni botda tasdiqlash**: chek (ilovadan ham, botdan ham) adminlarga **rasm bilan** keladi —
  buyurtma qisqacha + "✅ Tasdiqlash" tugmasi. Bosilsa: status CONFIRMED, mijozga xabar, admin
  xabaridagi tugma olinib "Tasdiqlandi — <admin ismi>" yoziladi. Buyurtma allaqachon boshqa holatda
  bo'lsa — joriy holat ko'rsatiladi. Tugma faqat adminlar uchun ishlaydi.
- **Manzilni qayta kiritish**: admin "Ma'lumot xato kiritildi" bossa mijozga xabar — kiritilgan
  manzil va ikki tugma: "Manzilni qayta kiriting" (botga bitta xabar qilib yozadi, misol bilan;
  to'liq bo'lmasa qayta so'raladi; 1 soat kutiladi, server qayta ishga tushsa bot xabariga
  reply orqali topiladi) va "Ilovada qayta kiritish" (Mini App `?fix=<id>` bilan ochiladi).
- Admin buyruqlari: `/admin PAROL` (o'zini admin qilish), `/panel` (panelni web_app tugmasi bilan
  ochish; `/panel https://...` — manzilni almashtirish), `/narxlar` (farqni ko'rsatish) va
  `/narxlar ha` (yozish), `/id`.
- Buyurtma yaratilganda: mijozga — raqam, summa, bank rekvizitlari; adminlarga — mijoz, telefon,
  manzil, mahsulotlar, summa + "Admin panelni ochish" tugmasi. Chek yuklanganda — mijozga
  "chek qabul qilindi" (buyurtma raqami bilan), adminlarga — quyidagi tasdiqlash xabari.
- Status o'zgarganda mijozga avtomatik xabar (tasdiqlandi / jo'natildi + kuzatuv raqami /
  yetkazildi / bekor qilindi) + "Savol berish" tugmasi (`{{EGA_TELEGRAM}}`).
- Rassilka — barcha bloklanmagan Telegram mijozlariga (web_ mijozlarga emas), rasm va tugma bilan.

### 3.6. Mini App — funksiyalar

> Bu yerda **nima** bo'lishi yozilgan. **Qanday ko'rinishi** — faqat `{{DIZAYN_DNK}}` va ranglardan.

- **Splash** (index.html ichida logo) — kamida ~1 s, ko'pi bilan 5 s; birinchi ma'lumot kelgach yopiladi.
- **Tanishtiruv** (faqat birinchi marta, DNK 10): do'kon kimligi → qanday buyurtma qilinadi
  (tanlash → buyurtma → bank o'tkazmasi → `{{KURYER}}`) → yetkazish sharti. O'tkazib yuborish mumkin.
- **Navigatsiya** (DNK 5): Asosiy, Katalog, Sevimlilar, Savat (soni bilan), Profil.
- **Bosh sahifa**: `{{VAQT_ZONASI}}` bo'yicha salomlashish (ism bilan), til almashtirgich, logo;
  qidiruv maydoni (bosilsa katalogga o'tib fokus); storylar (DNK 9); afzalliklar yo'lagi
  (yetkazish, to'lov, o'z tilida yordam); kategoriyalar (DNK 7, mahsulotlar soni bilan);
  avtomatik aylanuvchi takliflar karuseli (eng katta chegirmalar, har kategoriyadan aralash);
  eng ko'p sotilganlar; yangi kelganlar; chegirmalar grid'i. `{{MAXSUS_BOLIM}}` mahsulotlari
  tavsiyalarga aralashmaydi.
- **Mahsulot kartasi** (DNK 6): lenta/belgi (−%, NEW, Tugagan), sevimli tugmasi, tezkor "+"
  (bitta variant — darhol savatga, ko'p — oyna ochadi), brend, nom, narx va eski narx, rang
  doirachalari yoki variantlar soni, `stockVisible` bo'lsa qoldiq. Rasm yuklanguncha skeleton;
  rasm ochilmasa keyingi rasmi, birortasi bo'lmasa — `{{QISQA_NOM}}` placeholder.
  Kartalarda thumbnail (`?w=480`), oynada katta rasm.
- **Savatga qo'shish** (DNK 8) + toast + haptic.
- **Katalog**: kategoriya tanlagich (tanlangani ko'rinmasa tasma o'sha tomonga suriladi), joriy
  kategoriyadagi brend filtrlari, qidiruv (350 ms debounce), saralash (Tavsiya / Yangi / Arzon /
  Qimmat), bo'sh holat. Ro'yxat bo'lak-bo'lak chiziladi (avval 24 ta, pastga tushgan sari yana).
  Kategoriyada `gallery` bo'lsa — tepada namunaviy rasmlar va izoh.
- **Mahsulot oynasi** (pastdan chiquvchi): sudraladigan galereya, to'liq ekran ko'rish (pinch-zoom,
  surish, ikki marta bosish), brend, nom, narx, tejash summasi, variant tanlash (1-D turi bo'yicha,
  `oyoq-mm`/`kiyim` uchun o'lcham jadvali), rang variantida har rangning o'z rasmi (rasmlar soni =
  variantlar soni), "Faqat N ta qoldi" (`{{KAM_QOLDI}}`), tavsif ro'yxat ko'rinishida, "Savatga qo'shish".
  `{{MAXSUS_BOLIM}}` mahsulotida eng kam xarid soni haqida eslatma.
- **Variant rangi**: admin tanlagan HEX, bo'lmasa nomidan taxmin (uz/ru/en/ko rang so'zlari).
- **Rasm ramkasi**: URL oxiridagi `#z=1.3&x=50&y=40&fit=c` dan kattalik/joylashuv — admin tanlagan
  kadr hamma joyda bir xil.
- **Sevimlilar** — telefonda saqlanadi (zustand persist).
- **Savat**: miqdor +/−, o'chirish, yetkazish sharti (`{{YETKAZISH}}`; chegara bo'lsa progress),
  **upsell** (`{{UPSELL_QOIDASI}}`, bitta bosish bilan qo'shish/olib tashlash), jami, "Rasmiylashtirish".
  Savatda `{{MAXSUS_BOLIM}}` mahsulotlari eng kam sondan oz bo'lsa — rasmiylashtirish tugmasi o'chadi
  va "kamida N ta xarid qilishingiz kerak" yozuvi chiqadi.
  `TELEGRAM_ORDERS=false` bo'lsa — "Saytda buyurtma berish".
- **Checkout**: bosqich indikatori; ism, telefon (`{{TELEFON_FORMATI}}` avtomatik formatlanadi va
  tekshiriladi), manzil (`{{MANZIL_MAYDONLARI}}`), "Manzilni eslab qolish", izoh, yetkazish haqida
  eslatma, "Tasdiqlash", aloqa havolasi.
- **To'lov** (DNK 14): muvaffaqiyat animatsiyasi, buyurtma raqami, bank, hisob raqam, qabul qiluvchi,
  summa — har biri nusxa olish tugmasi bilan; chek skrinshotini yuklash; "Keyinroq to'layman".
- **Buyurtmalarim**: status, 4 qadamli jarayon (To'lov → Tasdiq → Jo'natildi → Yetdi), mahsulot
  rasmlari, kuzatuv raqami + "Kuzatish" (`{{KUZATUV_HAVOLASI}}`), "Yana olish" (hammasini savatga qaytaradi).
  Admin manzilni qayta so'ragan buyurtmada — "Manzil xato kiritilgan — qayta kiriting" ogohlantirishi va tugma.
- **Manzilni to'g'rilash ekrani**: botdagi "Ilovada qayta kiritish" (`?fix=<id>` — ilova to'g'ridan-to'g'ri
  shu ekranda ochiladi) yoki Buyurtmalarim'dan. Ism, telefon (`{{TELEFON_FORMATI}}`), manzil
  (`{{MANZIL_MAYDONLARI}}`) eski qiymatlar bilan to'ldirilgan; saqlangach muvaffaqiyat holati.
  Buyurtma jo'natilgan/bekor qilingan bo'lsa — "endi o'zgartirib bo'lmaydi".
- **Profil** (DNK 15): ism, `{{AZOLIK_NOMI}}`, Buyurtmalarim, Sevimlilar (soni), til, aloqa,
  yetkazish va to'lov ma'lumoti, "Biz haqimizda", versiya.
- **Aloqa oynasi** (ilovaning istalgan joyidan ochiladi): WhatsApp, Telegram, qo'ng'iroq,
  raqamni nusxalash, `{{ISH_VAQTI}}`.
- **Story ko'ruvchi**: to'liq ekran, progress chiziqlar (5 s), chap/o'ng bosish, bosib turish = pauza,
  "Xarid qilish" (mahsulot yoki kategoriyani ochadi).
- **Brauzer rejimi**: Telegramsiz ochilsa mehmon ID yaratiladi; `browserAccess` o'chiq bo'lsa
  "botni oching" ekrani.
- Telegram integratsiyasi: `expand()`, BackButton (story → ekran → oyna → tab tartibida yopadi),
  haptic, `openLink`; tab almashganda tepaga scroll; ilovaga qaytilganda katalog jimgina yangilanadi.
- PWA manifest va ikonkalar (64/180/192/512) — "Ilovani o'rnatish" uchun.

### 3.7. Admin panel

Uslub — mini ilova ranglari va shriftida, lekin ish quroli sifatida sodda va zich. Kompyuterda chap
sidebar (logo + `{{BREND_NOMI}}`), telefonda/Telegramda pastki menyu. Splash, PWA manifest.

Bo'limlar: Boshqaruv · Buyurtmalar (kutilayotganlar soni, har 20 s yangilanadi) · Mahsulotlar ·
Ombor · Story / Kategoriya · Mijozlar · Rassilka · Sozlamalar · Chiqish (Telegramda — Yopish).

- **Login**: Telegram ichida avtomatik (server uxlayotgan bo'lsa qayta urinadi), aks holda parol;
  brauzer kirishi o'chiq bo'lsa "faqat bot ichida" ekrani.
- **Boshqaruv**: jami/bugungi buyurtmalar, kutilayotganlar, mijozlar, umumiy va bugungi tushum;
  eng ko'p sotilgan 5 ta; tugayotgan zaxira; bank rekvizitlari hali test qiymatda bo'lsa ogohlantirish;
  statistika kelmasa avtomatik qayta urinish. **Savdoni tozalash** — ikki bosqichli tasdiq
  (nima o'chishi ko'rsatiladi; ikkinchi so'rovda tugmalar joyi almashadi va o'chirish tugmasi
  3 s kutadi; faqat ko'rsatilgan oxirgi buyurtmagacha o'chadi; mahsulot, zaxira, mijozlarga tegilmaydi).
- **Buyurtmalar**: status filtri; modalda mijoz, telefon, manzil, mahsulotlar (rasmni kattalashtirish),
  chek rasmi, kuzatuv raqami maydoni, holatni o'zgartirish (mijozga avtomatik xabar).
  **"Ma'lumot xato kiritildi"** tugmasi (jo'natilmagan buyurtmalarda; tasdiq so'raladi) — mijozga
  manzilni qayta kiritish so'rovi ketadi; ro'yxatda "Manzil kutilmoqda" belgisi, modalda eslatma.
  Mijozga bot orqali yetib bormasa (saytdan buyurtma bergan yoki botni bloklagan) — "telefon qiling:
  <raqam>" ogohlantirishi.
- **Mahsulotlar**: ro'yxat + yaratish/tahrirlash: rasmlar (bir nechtasini tanlash, sudrab tartiblash,
  havola qo'yish, asosiy qilish, har rasm uchun **ramka muharriri** — ramkada surish + kattalik +
  "to'liq ko'rinsin"), nomi uz/ru, brend, kategoriya va undagi o'rni, narx, eski narx, Faol, NEW,
  tavsif uz/ru, variantlar (label, stock, extraPrice, rang doirachasi). Tezkor tugmalar — 1-D variant
  turlari bo'yicha (masalan o'lchamlar qatori yoki 30/50/100 ml).
- **Ombor**: barcha variantlar qoldig'i bitta jadvalda; kategoriya, qidiruv, "kam qolgan" /
  "tugagan" filtrlari; +/− va qo'lda kiritish; o'zgarganlar ajralib ko'rinadi va birdan saqlanadi;
  "mijozga qoldiq ko'rinsin" (`stockVisible`) kaliti.
- **Story / Kategoriya**: story qo'shish (rasm yoki mavjud mahsulotdan — qidirib, uning birinchi
  rasmi olinadi, "Xarid qilish" shu mahsulotni ochadi), sarlavha uz/ru; kategoriyalar: slug, emoji,
  nomi uz/ru, plitka rasmi, gallery rasmlari, izoh uz/ru, tartib, faol.
- **Mijozlar**: ism/telefon/username bo'yicha qidiruv, buyurtmalar soni.
- **Rassilka**: matn, rasm, tugma matni va havolasi, "Hammaga yuborish", tarix (yuborildi/xato).
- **Sozlamalar**: panelga kirish (manzil + parol, birga nusxalash — Telegramda clipboard ishlamasa
  zaxira usul), yetkazish narxi va chegarasi, bank rekvizitlari, do'kon nomi, yordam username,
  do'kon ochiq/yopiq, "Biz haqimizda" uz/ru, Mini App va admin manzillari.

### 3.8. Ishga tushirish, deploy, hujjatlar

- Windows `.bat` fayllar: `1-BACKEND`, `2-MINIAPP`, `3-ADMIN`, `4-TUNNEL`, `5-NARXLARNI-YANGILASH`,
  `6-MAHSULOT-YUKLASH` (sarlavhalarida `{{QISQA_NOM}}`).
- Deploy: backend → Render (`render.yaml`, region singapore, build'da `npx prisma db push`);
  miniapp va admin → Vercel (`vercel.json` `/api` va `/uploads` ni backend'ga proksi qiladi);
  baza → Neon. GitHub Actions: Vercel deploy + "Brauzer kirishi" workflow.
- `.env.example`: DATABASE_URL, BOT_TOKEN, ADMIN_IDS, ADMIN_PASSWORD, JWT_SECRET, WEB_APP_URL,
  ADMIN_PANEL_URL, ADMIN_MINIAPP_URL, BOT_URL, OWNER_CONTACT_URL, TELEGRAM_ORDERS, PORT,
  PUBLIC_URL, SKIP_INITDATA_CHECK, DEV_TELEGRAM_ID.
- O'zbek tilida `README.md` (boshida Dizayn DNK; ishga tushirish, admin bo'lish, panelni telefondan
  ochish, mahsulot yuklash, narxlarni yangilash, buyurtma jarayoni, muammolar) va `DEPLOY.md`.
- `MAHSULOTLAR/QOLLANMA.txt` — yangi kategoriya papkalari bilan.

### 3.9. Buyurtma jarayoni

1. Mijoz mahsulot → variant → savat.
2. Ism, telefon, manzil → Tasdiqlash.
3. Bank rekvizitlari → bank o'tkazmasi → chek rasmini ilovada yuklaydi **yoki botga tashlaydi** (RECEIPT_SENT).
4. Bot: mijozga raqam va rekvizitlar, adminga yangi buyurtma; chek kelganda adminga chek rasmi + "✅ Tasdiqlash".
5. Admin botda (yoki panelda) Tasdiqlaydi → kuzatuv raqamini kiritib Jo'natildi qiladi → mijozga avtomatik xabar.
6. Manzil xato bo'lsa: admin "Ma'lumot xato kiritildi" → mijoz botda yoki ilovada to'g'ri manzilni
   kiritadi → adminga eski/yangi manzil bilan xabar.

### 3.10. Topshirishdan oldin tekshiruv

Funksiyalar:
- [ ] `/start` → banner + menyu bitta xabarda; til tugmasi shu xabarni o'giradi; telefon alohida
      so'raladi; "Ilovani o'rnatish" videolari va Instagram tugmasi ishlaydi.
- [ ] Chek botga rasm qilib tashlansa buyurtmaga biriktiriladi; adminga rasm + "Tasdiqlash" keladi,
      bosilganda mijozga xabar ketadi.
- [ ] "Ma'lumot xato kiritildi" → mijoz manzilni botda ham, ilovada ham kirita oladi; admin xabar oladi.
- [ ] `{{MAXSUS_BOLIM}}` eng kam soni: savatda ham, serverda ham tekshiriladi.
- [ ] Katalog: kategoriya, brend, qidiruv, saralash; zaxira bo'yicha tartib.
- [ ] Mahsulot oynasi: variant, rang rasmi, o'lcham jadvali, to'liq ekran zoom.
- [ ] Savat → upsell → checkout → to'lov → chek yuklash; bot xabarlari mijozga va adminga.
- [ ] Admin: Telegram'dan parolsiz kirish, brauzerdan parol; 5 xato → blok.
- [ ] Admin: mahsulot + ramka muharriri, ombor, story mahsulotdan, status → mijozga xabar,
      savdoni tozalash ikki bosqichda.
- [ ] Brauzer rejimi: `browserAccess` yoqiq/o'chiq ikkala holat.

Unikallik:
- [ ] `LUSSO|Lusso|lusso|Onest|#a87f26|d6ae51|f2f0eb` qidiruvi — 0 natija.
- [ ] Hech bir DNK o'qida 🚫 variant ishlatilmagan; README'da DNK yozilgan.
- [ ] Bosh sahifa, mahsulot kartasi, navigatsiya, to'lov va profil ekranlari LUSSO bilan yonma-yon
      qo'yilganda boshqa do'kon ekani birinchi qarashda seziladi (skrinshot bilan solishtiriladi).
- [ ] Barcha matnlar yangi; kontrast 4.5:1 dan kam joy yo'q.

---

## 4-QISM. LUSSO'DA BREND SOZLAMALARI QAYERDA TURADI

A yo'li bilan qurilganda shu joylarning **hammasi** yangi brendga almashtiriladi.

| Nima | Fayl |
|---|---|
| Do'kon nomi, standart parol, standart panel manzili, ega Telegram, JWT kaliti | `backend/src/config/default.js` |
| Bazadagi standart sozlamalar (nom, bank, "Biz haqimizda") | `backend/prisma/schema.prisma` → `Setting`, `backend/prisma/seed.js` |
| Boshlang'ich mahsulotlar va kategoriyalar | `backend/prisma/seed.js`, `backend/src/core/categoryNames.js` |
| Maxsus bo'lim (gramli atirlar) va eng kam soni | `backend/src/core/decants.js` (`DECANT_MIN`), `miniapp/src/constants.js` (`DECANT_SLUG`, `DECANT_MIN`) |
| Buyurtma raqami prefiksi (`LS-`) | `backend/src/models/Order.js` (yaratish), `backend/src/controllers/botController.js` (`ORDER_NO`) |
| Narxlar jadvali | `backend/src/core/prices.js` |
| Papkadan yuklash (brendlar ro'yxati, o'lchamlar, zaxira) | `backend/prisma/import.js`, `MAHSULOTLAR/QOLLANMA.txt`, `MAHSULOTLAR/tavsiflar.json` |
| Bot matnlari, Instagram havolasi | `backend/src/locales/index.js` (`INSTAGRAM_URL`; matnlar ichida aloqa raqami ham bor) |
| Botdagi aloqa raqami | `backend/src/controllers/botController.js` (`CONTACT_PHONE`, `PHONE_INTL`) |
| /start banneri | `backend/assets/welcome/banner.jpg` |
| "Ilovani o'rnatish" videolari | `backend/assets/install/iphone.mp4`, `samsung.mp4` |
| Muhit o'zgaruvchilari namunasi | `backend/.env.example` |
| Aloqa telefoni, WhatsApp/Telegram havolalari | `miniapp/src/constants.js` |
| Mini App matnlari (uz/ru) | `miniapp/src/i18n.js` |
| Ranglar va shrift | `miniapp/src/styles.css` (`:root`), `admin/src/styles.css` (`:root`), `miniapp/index.html` va `admin/index.html` (splash, `theme-color`, Google Fonts) |
| Nom va sarlavhalar | `miniapp/index.html`, `admin/index.html`, ikkala `public/manifest.webmanifest`, `Profile.jsx`, `BotOnly.jsx`, `Onboarding.jsx`, `Home.jsx`, `admin/src/App.jsx`, `admin/src/pages/Login.jsx` |
| Logo va ikonkalar | `miniapp/public/` va `admin/public/` (`logo.png`, `icon-64/180/192/512.png`) |
| Placeholder rasm (SVG) | `miniapp/src/components/ProductCard.jsx`, `admin/src/pages/OrdersPage.jsx` |
| localStorage kalitlari, hodisa nomi | `miniapp/src/store.js`, `telegram.js`, `App.jsx`, `components/ContactSheet.jsx`, `admin/src/api.js` |
| Admin maydonlardagi namuna matnlar | `admin/src/pages/SettingsPage.jsx`, `BroadcastPage.jsx` |
| Server manzillari | `miniapp/vercel.json`, `admin/vercel.json`, `miniapp/vite.config.js`, `render.yaml`, `.github/workflows/vercel-deploy.yml`, `.claude/launch.json` |
| Paket nomlari | `backend/`, `miniapp/`, `admin/` ichidagi `package.json` |
| `.bat` sarlavhalari | `1-…6-*.bat` |
| Fayllar ichidagi izohlar | `backend/src/index.js`, `schema.prisma`, `styles.css` boshidagi "LUSSO BRAND KR" |

Nusxa olinganda **ko'chirilmaydi**: `node_modules/`, `dist/`, `.vercel/`, `backend/uploads/` ichidagi
LUSSO rasmlari, `MAHSULOTLAR/_yuklangan/`, `.env`.

---

## Ishlatilgan DNK kombinatsiyalari

Har yangi brenddan keyin qator qo'shing — keyingi brend kamida 8 ta o'qda farq qilishi kerak.

| Brend | Sana | Dizayn DNK |
|---|---|---|
| LUSSO BRAND KR | — | asl (barcha 🚫 variantlar) |
