import { useState } from 'react';
import api from '../api';
import Modal from './Modal';

const WEEKDAYS = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

// "2026-10-27" → "Seshanba, 27.10"
function dayLabel(day, i) {
  if (i === 0) return 'Bugun';
  if (i === 1) return 'Kecha';
  const [y, m, d] = day.split('-').map(Number);
  return `${WEEKDAYS[new Date(y, m - 1, d).getDay()]}, ${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}`;
}

// Boshqaruv panelidagi "Bugungi tashriflar" kartasi: Mini App'ni bugun nechta
// mijoz ochgani. Bosilsa — oxirgi 7 kun (bir mijoz kuniga bir marta sanaladi)
export default function Visits({ toast, today }) {
  const [days, setDays] = useState(null);
  const [busy, setBusy] = useState(false);

  const open = async () => {
    if (busy) return;
    setBusy(true);
    try {
      setDays((await api.visits()).days);
    } catch (e) {
      toast(e.message, true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div
        className="stat"
        role="button"
        tabIndex={0}
        style={{ cursor: 'pointer' }}
        onClick={open}
        onKeyDown={(e) => e.key === 'Enter' && open()}
      >
        <div className="t">👀 Bugungi tashriflar</div>
        <div className="v">{today ?? '—'}</div>
        <div className="s">{busy ? 'Yuklanmoqda…' : "kishi ilovani ochdi · 7 kunlik ›"}</div>
      </div>

      {days && (
        <Modal title="👀 Mini App tashriflari" onClose={() => setDays(null)}>
          <div style={{ textAlign: 'center', margin: '4px 0 18px' }}>
            <div className="muted">Bugun ilovani ochganlar</div>
            <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2 }}>{days[0].count}</div>
            <div className="muted">kishi</div>
          </div>

          {days.slice(1).map((d, i) => (
            <div className="info-row" key={d.day}>
              <span>{dayLabel(d.day, i + 1)}</span>
              <b>{d.count} kishi</b>
            </div>
          ))}

          <p className="muted" style={{ fontSize: 12.5, marginBottom: 0 }}>
            Bir mijoz kuniga necha marta ochsa ham bir marta sanaladi. Kun Koreya vaqti bilan
            hisoblanadi.
          </p>
        </Modal>
      )}
    </>
  );
}
