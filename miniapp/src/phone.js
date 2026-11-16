// Koreya telefon raqami: ikki ko'rinishda ham yozish mumkin
//   010-1234-5678      (mahalliy)
//   +82 10-1234-5678   (xalqaro — iPhone avto-to'ldirishi va Telegram raqamni shunday beradi)
// Buyurtmaga doim mahalliy ko'rinishda (010-1234-5678) yoziladi — 택배 uchun shunday kerak.

// 01012345678 → 010-1234-5678
function groupLocal(d) {
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

// 1012345678 (+82 dan keyingi qism) → 10-1234-5678
function groupIntl(r) {
  if (r.length < 3) return r;
  if (r.length < 7) return `${r.slice(0, 2)}-${r.slice(2)}`;
  if (r.length === 9) return `${r.slice(0, 2)}-${r.slice(2, 5)}-${r.slice(5)}`;
  return `${r.slice(0, 2)}-${r.slice(2, 6)}-${r.slice(6)}`;
}

// Yozilayotgan raqamni chiroyli ko'rsatish (mijoz qaysi ko'rinishda yozsa — shunday qoladi)
export function formatPhone(v) {
  const s = String(v || '').trim();
  const d = s.replace(/\D/g, '');

  // Mahalliy raqam doim 0 bilan boshlanadi — "82" yoki "+" bilan boshlansa, xalqaro
  if (!s.startsWith('+') && !d.startsWith('82')) return groupLocal(d.slice(0, 11));
  if (!d.startsWith('82')) return '+' + d.slice(0, 15); // "+", "+8" — hali yozilmoqda
  const rest = d.slice(2).replace(/^0/, '').slice(0, 10); // "+82 010..." ham bo'ladi
  return rest ? `+82 ${groupIntl(rest)}` : '+82';
}

// Faqat raqamlar, mahalliy ko'rinishda: "+82 10-1234-5678" → "01012345678"
function localDigits(v) {
  const d = String(v || '').replace(/\D/g, '');
  if (d.startsWith('82')) return '0' + d.slice(2).replace(/^0+/, '');
  return d;
}

export const phoneOk = (v) => /^01[016789]\d{7,8}$/.test(localDigits(v));

// Buyurtmaga yoziladigan ko'rinish: 010-1234-5678
export const normalizePhone = (v) => groupLocal(localDigits(v));

// Avto-to'ldirish uchun (Telegram raqami, oldingi buyurtma): Koreya raqami bo'lsa —
// 010-1234-5678, boshqa davlat raqami bo'lsa — bo'sh (mijoz o'zi kiritadi)
export const prefillPhone = (v) => (phoneOk(v) ? normalizePhone(v) : '');
