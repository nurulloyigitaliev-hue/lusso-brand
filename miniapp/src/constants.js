// Mijozlar bilan aloqa raqami — savollarga WhatsApp va Telegram orqali javob beriladi
export const CONTACT_PHONE = '010-5790-4777';
const PHONE_INTL = '821057904777'; // +82 10-5790-4777
export const WHATSAPP_URL = `https://wa.me/${PHONE_INTL}`;
export const TELEGRAM_URL = `https://t.me/+${PHONE_INTL}`;
export const CALL_URL = `tel:+${PHONE_INTL}`;

// "Quyma atirlar" — o'z bo'limida turadi, umumiy ro'yxat va bosh sahifa
// tavsiyalariga aralashmaydi (backend/src/core/decants.js bilan bir xil)
export const DECANT_SLUG = 'quyma';
export const isDecant = (p) => p?.category?.slug === DECANT_SLUG;

// Gramli atirlar kamida 3 ta (har xil hid bo'lishi mumkin) olinadi
// (backend/src/core/decants.js dagi DECANT_MIN bilan bir xil)
export const DECANT_MIN = 3;

// Savatdagi gramli atirlar soni (mahsulot katalogdan tanib olinadi)
export function decantQty(items, products) {
  const ids = new Set(products.filter(isDecant).map((p) => p.id));
  return items.reduce((s, i) => s + (ids.has(i.productId) ? i.qty : 0), 0);
}
