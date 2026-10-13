import { useRef, useState } from 'react';
import api from '../api';
import FrameEditor from './FrameEditor';
import { frameStyle } from '../framing';

// Rasm yuklash: galereyadan tanlash, sudrab tashlash yoki havola qo'yish.
// autoFrame — rasm qo'yilishi bilan ramka muharriri ochiladi (kattalashtirish, surish).
// single — faqat bitta rasm (yangisi eskisining o'rniga tushadi), aspect — ramka nisbati.
export default function ImageUploader({ images = [], onChange, onError, autoFrame = false, single = false, aspect }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [url, setUrl] = useState('');
  const [editing, setEditing] = useState(null); // ramkasi tahrirlanayotgan rasm indeksi

  const uploadFiles = async (files) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/')).slice(0, single ? 1 : undefined);
    if (!list.length) return;
    setBusy(true);
    const added = [];
    for (const file of list) {
      try {
        const res = await api.upload(file);
        added.push(res.url);
      } catch (e) {
        onError?.(e.message);
      }
    }
    const base = single && added.length ? [] : images;
    onChange([...base, ...added]);
    setBusy(false);
    if (autoFrame && added.length) setEditing(base.length);
  };

  const onPick = (e) => {
    uploadFiles(e.target.files);
    e.target.value = '';
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    uploadFiles(e.dataTransfer.files);
  };

  const addUrl = () => {
    const value = url.trim();
    if (!value) return;
    const base = single ? [] : images;
    onChange([...base, value]);
    setUrl('');
    if (autoFrame) setEditing(base.length);
  };

  const remove = (i) => onChange(images.filter((_, idx) => idx !== i));

  const makeMain = (i) => {
    if (i === 0) return;
    const copy = [...images];
    const [item] = copy.splice(i, 1);
    onChange([item, ...copy]);
  };

  return (
    <div>
      {images.length > 0 && (
        <div className="img-list">
          {images.map((src, i) => (
            <div className="img-item" key={src + i} title={single ? undefined : 'Asosiy qilish uchun bosing'}>
              <img src={src} alt="" style={frameStyle(src)} onClick={() => makeMain(i)} />
              <button type="button" className="del" onClick={() => remove(i)}>
                ✕
              </button>
              <button type="button" className="frame-btn" title="Kattalik va joylashuv" onClick={() => setEditing(i)}>
                ⤢
              </button>
              {i === 0 && !single && <div className="main-tag">ASOSIY</div>}
            </div>
          ))}
        </div>
      )}
      {images.length > 0 && (
        <div className="hint img-hint">
          {single ? '' : "Rasmni bossangiz — asosiy bo'ladi. "}⤢ — ramkaga moslash (kattalashtirish, surish)
        </div>
      )}

      <div
        className={`uploader ${drag ? 'drag' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={!single}
          style={{ display: 'none' }}
          onChange={onPick}
        />

        <button type="button" className="btn" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? '⏳ Yuklanmoqda...' : single && images.length ? '🖼 Boshqa rasm tanlash' : '🖼 Galereyadan rasm tanlash'}
        </button>

        <div className="hint">yoki rasmni shu yerga sudrab tashlang{single ? '' : " (bir nechta bo'lishi mumkin)"}</div>
      </div>

      {editing !== null && images[editing] && (
        <FrameEditor
          url={images[editing]}
          aspect={aspect}
          onClose={() => setEditing(null)}
          onSave={(next) => {
            onChange(images.map((u, idx) => (idx === editing ? next : u)));
            setEditing(null);
          }}
        />
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <input
          className="input"
          placeholder="yoki rasm havolasi (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrl())}
        />
        <button type="button" className="btn light" onClick={addUrl}>
          Qo'shish
        </button>
      </div>
    </div>
  );
}
