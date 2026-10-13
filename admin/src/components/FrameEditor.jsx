import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { parseFrame, buildFrame, frameStyle } from '../framing';

const MIN_Z = 0.5;
const MAX_Z = 3;
const clampZ = (z) => Math.max(MIN_Z, Math.min(MAX_Z, z));
const clamp100 = (n) => Math.max(0, Math.min(100, n));

// Rasmni ramkaga qo'lda joylashtirish: bir barmoq bilan surish, ikki barmoq bilan
// kattalashtirish/kichraytirish (telefondagi galereyadek), slayder va sichqoncha g'ildiragi.
// Ramka nisbati mini-ilovadagi mahsulot kartasi bilan bir xil (4:5).
export default function FrameEditor({ url, onSave, onClose }) {
  const init = parseFrame(url);
  const [f, setF] = useState({ z: init.z, x: init.x, y: init.y, fit: init.fit });
  const fRef = useRef(f);
  fRef.current = f;
  const pointers = useRef(new Map()); // ekranga tegib turgan barmoqlar
  const gesture = useRef(null);
  const frameRef = useRef(null);

  const preview = buildFrame(init.src, f);

  // Barmoqlar soni o'zgarganda harakat qaytadan boshlanadi — rasm sakramaydi
  const startGesture = () => {
    const pts = [...pointers.current.values()];
    const s = fRef.current;
    if (pts.length >= 2) {
      const [a, b] = pts;
      gesture.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        mx: (a.x + b.x) / 2,
        my: (a.y + b.y) / 2,
        z: s.z,
        x: s.x,
        y: s.y,
      };
    } else if (pts.length === 1) {
      gesture.current = { px: pts[0].x, py: pts[0].y, x: s.x, y: s.y };
    } else {
      gesture.current = null;
    }
  };

  const onDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    startGesture();
  };

  const onMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;
    const r = frameRef.current.getBoundingClientRect();
    const pts = [...pointers.current.values()];

    if (pts.length >= 2 && g.dist) {
      // Ikki barmoq: oraliq masofasi — kattalik, o'rtasi — surish
      const [a, b] = pts;
      const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      const z = clampZ(g.z * (dist / g.dist));
      const k = 100 / Math.max(z, 1);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      setF((s) => ({
        ...s,
        z: +z.toFixed(3),
        x: clamp100(g.x - ((mx - g.mx) / r.width) * k),
        y: clamp100(g.y - ((my - g.my) / r.height) * k),
      }));
      return;
    }

    // Bitta barmoq / sichqoncha: rasm barmoq ortidan yuradi
    const k = 100 / Math.max(fRef.current.z, 1);
    setF((s) => ({
      ...s,
      x: clamp100(g.x - ((e.clientX - g.px) / r.width) * k),
      y: clamp100(g.y - ((e.clientY - g.py) / r.height) * k),
    }));
  };

  const onUp = (e) => {
    pointers.current.delete(e.pointerId);
    startGesture();
  };

  const onWheel = (e) => {
    setF((s) => ({ ...s, z: clampZ(s.z - e.deltaY * 0.002) }));
  };

  // Mahsulot oynasi ichidan ochiladi — body ga chiqaramiz, aks holda u oynani ham yopib yuboradi
  return createPortal(
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 150 }}>
      <div className="modal frame-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Rasmni joylashtirish</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="frame-wrap">
          <div
            ref={frameRef}
            className="frame-box"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onWheel={onWheel}
          >
            <img src={preview} alt="" draggable={false} style={frameStyle(preview)} />
            <div className="frame-grid" />
          </div>
          <div className="hint" style={{ textAlign: 'center', marginTop: 8 }}>
            Bir barmoq — surish, ikki barmoq — kattalashtirish / kichraytirish
          </div>
        </div>

        <label className="label" style={{ marginTop: 14 }}>
          Kattalik: <b>{Math.round(f.z * 100)}%</b>
        </label>
        <div className="frame-zoom">
          <button
            type="button"
            className="btn light sm"
            onClick={() => setF((s) => ({ ...s, z: clampZ(+(s.z - 0.1).toFixed(2)) }))}
          >
            −
          </button>
          <input
            type="range"
            min={MIN_Z}
            max={MAX_Z}
            step="0.01"
            value={f.z}
            onChange={(e) => setF((s) => ({ ...s, z: Number(e.target.value) }))}
          />
          <button
            type="button"
            className="btn light sm"
            onClick={() => setF((s) => ({ ...s, z: clampZ(+(s.z + 0.1).toFixed(2)) }))}
          >
            +
          </button>
        </div>

        <label className="frame-check">
          <input
            type="checkbox"
            checked={f.fit === 'contain'}
            onChange={(e) => setF((s) => ({ ...s, fit: e.target.checked ? 'contain' : 'cover' }))}
          />
          Rasmni to'liq ko'rsatish (kesmasdan, yonlarida fon qoladi)
        </label>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button type="button" className="btn light" onClick={() => setF({ z: 1, x: 50, y: 50, fit: 'cover' })}>
            ↺ Asl holat
          </button>
          <button type="button" className="btn" style={{ flex: 1 }} onClick={() => onSave(preview)}>
            Saqlash
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
