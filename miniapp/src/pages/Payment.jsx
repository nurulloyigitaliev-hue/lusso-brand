import { useRef, useState } from 'react';
import { money } from '../i18n';
import api from '../api';
import { haptic, closeApp, isTelegram } from '../telegram';
import { openContact } from '../components/ContactSheet';
import Icon from '../components/Icon';

function SuccessMark() {
  return (
    <div className="success-mark">
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="okg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f1d58a" />
            <stop offset=".5" stopColor="#d6ae51" />
            <stop offset="1" stopColor="#a8822e" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#okg)" strokeWidth="3" />
        <path d="M31 51 l13 13 l26 -28" fill="none" stroke="url(#okg)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {Array.from({ length: 14 }).map((_, i) => (
        <i
          key={i}
          className="confetti"
          style={{ '--a': `${(360 / 14) * i}deg`, background: i % 2 ? '#f1d58a' : '#a8822e' }}
        />
      ))}
    </div>
  );
}

// resumed — oyna qayta ochilgan (ilovaga qaytib kirilganda yoki «Buyurtmalarim»dan):
// tabrik o'rniga "chekni yuboring" ko'rinadi va tugma ilovani yopmaydi
export default function Payment({ t, order, bank, resumed = false, from = null, onUploaded, onDone }) {
  const [copied, setCopied] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  const copy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* eski brauzerlar */
    }
    haptic('success');
    setCopied(key);
    setTimeout(() => setCopied(''), 1600);
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      await api.uploadReceipt(order.id, file);
      setUploaded(true);
      onUploaded?.();
      haptic('success');
    } catch (err) {
      alert(err.message);
      haptic('error');
    } finally {
      setBusy(false);
      // Xuddi shu rasmni qayta tanlasa ham onChange ishlasin
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const tg = isTelegram();
  const leaveLabel = uploaded ? t.done : resumed ? (from ? t.back : t.toHome) : tg ? t.laterPay : t.toHome;
  const leave = () => {
    haptic('success');
    onDone();
    // Yangi buyurtmadan keyin Telegram'da ilova yopiladi — mijoz botda xabarni ko'radi
    if (tg && !resumed) closeApp();
  };

  const CopyBtn = ({ value, k }) => (
    <button className={`copy ${copied === k ? 'ok' : ''}`} onClick={() => copy(value, k)}>
      <Icon name={copied === k ? 'check' : 'copy'} />
      {copied === k ? t.copied : t.copy}
    </button>
  );

  return (
    <div className="screen">
      <div className="screen-body" style={{ paddingTop: 24 }}>
        <div className="steps">
          <span className="on" />
          <span className="on" />
          <span className="on" />
        </div>

        <div className="success">
          {resumed ? (
            <div className="pay-resume-ic">
              <Icon name="receipt" />
            </div>
          ) : (
            <SuccessMark />
          )}
          <h2>{resumed ? t.payResumeTitle : t.paySuccess}</h2>
          <div className="no">№ {order.orderNumber}</div>
          <p>{resumed ? t.payResumeText : t.payText}</p>
        </div>

        <div className="bank-card">
          <div className="bank-top">
            <b className="gold-text">{bank?.name}</b>
            <span className="chip-ic" />
          </div>
          <div className="bank-acc">
            <span>{bank?.account}</span>
            <CopyBtn value={bank?.account || ''} k="acc" />
          </div>
          <div className="bank-meta">
            <div>
              {t.holder}
              <b>{bank?.holder}</b>
            </div>
            <div style={{ textAlign: 'right' }}>
              {t.amount}
              <b className="gold-text" style={{ fontSize: 20 }}>
                {money(order.total)}
              </b>
            </div>
          </div>
        </div>

        <button className="btn dark" style={{ height: 48, fontSize: 13.5 }} onClick={() => copy(String(order.total), 'sum')}>
          <Icon name={copied === 'sum' ? 'check' : 'copy'} /> {t.copyAmount}
        </button>

        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />

        <div className={`upload ${uploaded ? 'done' : ''}`} onClick={uploaded || busy ? undefined : () => fileRef.current?.click()}>
          {busy ? (
            '⏳ …'
          ) : uploaded ? (
            <>
              <Icon name="check" /> {t.receiptSent}
            </>
          ) : (
            <>
              <Icon name="camera" /> {t.uploadReceipt}
            </>
          )}
        </div>

        <button className="btn" style={{ marginTop: 16 }} onClick={leave}>
          {leaveLabel}
        </button>

        <div className="note">{tg ? (uploaded ? t.afterPayTg : t.payLaterTg) : t.afterPayWeb}</div>

        <button
          type="button"
          className="link-btn"
          style={{ marginTop: 12 }}
          onClick={openContact}
        >
          <Icon name="chat" /> {t.supportAfterOrder}
        </button>
      </div>
    </div>
  );
}
