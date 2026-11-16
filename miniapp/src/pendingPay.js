// To'lov kutilayotgan buyurtma shu telefonda eslab qolinadi.
//
// Mijoz to'lov oynasidan bank ilovasiga o'tib pul o'tkazadi. Shu orada Telegram
// ilovani yopib yuborishi (yoki mijozning o'zi "Keyinroq to'layman" bosishi)
// mumkin — qaytib kirganda chek yuklash oynasi yo'qolib qolmasligi uchun
// buyurtma shu yerda saqlanadi va ilova ochilganda oyna qayta ochiladi.
const KEY = 'lusso-pay';
const TTL = 3 * 24 * 60 * 60 * 1000; // 3 kundan eski buyurtma qayta ochilmaydi

export function readPendingPay() {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (p?.order?.id && Date.now() - (p.at || 0) < TTL) return p;
    if (p) localStorage.removeItem(KEY);
  } catch {
    /* localStorage yopiq yoki buzilgan yozuv */
  }
  return null;
}

export function savePendingPay(order, bank) {
  try {
    const { id, orderNumber, total, status } = order;
    localStorage.setItem(KEY, JSON.stringify({ order: { id, orderNumber, total, status }, bank, at: Date.now() }));
  } catch {
    /* ignore */
  }
}

// Chek yuborildi (yoki buyurtma endi to'lov kutmayapti) — eslab qolish shart emas
export function clearPendingPay(orderId) {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!orderId || p?.order?.id === orderId) localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
