// Mini App tashriflari: qaysi kuni nechta mijoz ilovani ochgani
import prisma from '../database/connection.js';

// Kun Koreya vaqti bo'yicha hisoblanadi: "2026-10-27"
export function dayKey(date = new Date()) {
  return date.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' });
}

// Bugun sanalganlar — ilova har ochilganda bazaga qayta yozmaslik uchun
let seenDay = '';
const seen = new Set();

export const VisitModel = {
  // Mijoz bir kunda necha marta ochsa ham bir marta sanaladi
  async track(userId) {
    const day = dayKey();
    if (day !== seenDay) {
      seenDay = day;
      seen.clear();
    }
    if (seen.has(userId)) return;
    seen.add(userId);
    try {
      await prisma.visit.createMany({ data: [{ day, userId }], skipDuplicates: true });
    } catch (err) {
      seen.delete(userId);
      throw err;
    }
  },

  // Oxirgi `days` kun, bugundan boshlab: [{ day, count }]
  async daily(days = 7) {
    const keys = [];
    for (let i = 0; i < days; i++) keys.push(dayKey(new Date(Date.now() - i * 24 * 60 * 60 * 1000)));

    const rows = await prisma.visit.groupBy({
      by: ['day'],
      where: { day: { in: keys } },
      _count: { _all: true },
    });
    const counts = Object.fromEntries(rows.map((r) => [r.day, r._count._all]));
    return keys.map((day) => ({ day, count: counts[day] || 0 }));
  },
};

export default VisitModel;
