import { useEffect, useState } from 'react';
import api from '../api';
import { haptic } from '../telegram';
import { formatPhone, phoneOk } from './Checkout';
import Icon from '../components/Icon';

// Admin "Ma'lumot xato kiritildi" bosgan va buyurtma hali jo'natilmagan bo'lsa
// (backend/src/models/Order.js dagi canFixAddress bilan bir xil)
export const canFixAddress = (o) =>
  Boolean(o?.addressFix) && !['SHIPPED', 'DELIVERED', 'CANCELLED'].includes(o.status);

// Manzil to'liqmi: kamida bir necha belgi va uy raqami (backend bilan bir xil)
const streetOk = (v) => v.trim().length >= 6 && /\d/.test(v);

// Botdagi "📲 Ilovada qayta kiritish" yoki «Buyurtmalarim»dan ochiladi
export default function AddressFix({ t, orderId, onBack, onDone }) {
  const [order, setOrder] = useState(null); // null — yuklanmoqda, false — topilmadi
  const [form, setForm] = useState({ customerName: '', phone: '', street: '', detail: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api
      .myOrders()
      .then((list) => {
        const o = list.find((x) => x.id === orderId);
        setOrder(o || false);
        if (o) {
          setForm({
            customerName: o.customerName || '',
            phone: formatPhone(o.phone),
            street: o.street || '',
            detail: o.detail || '',
          });
        }
      })
      .catch((e) => {
        setOrder(false);
        setError(e.message);
      });
  }, [orderId]);

  const set = (k, transform) => (e) => {
    const value = transform ? transform(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [k]: value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: '' }));
  };

  const submit = async () => {
    setError('');
    const e = {};
    if (!form.customerName.trim()) e.customerName = t.required;
    if (!phoneOk(form.phone)) e.phone = t.phoneBad;
    if (!streetOk(form.street)) e.street = t.fixStreetBad;
    setErrors(e);
    if (Object.keys(e).length) {
      haptic('error');
      return;
    }

    setBusy(true);
    try {
      const updated = await api.fixAddress(order.id, { ...form, phone: formatPhone(form.phone) });
      setOrder(updated);
      setSaved(true);
      haptic('success');
    } catch (err) {
      setError(err.message);
      haptic('error');
    } finally {
      setBusy(false);
    }
  };

  const field = (k, label, extra = {}) => (
    <div className={`field ${errors[k] ? 'bad' : ''}`}>
      <label>{label}</label>
      <input name={k} value={form[k]} onChange={set(k, extra.transform)} {...extra.input} />
      {errors[k] && <div className="err">{errors[k]}</div>}
    </div>
  );

  return (
    <div className="screen">
      <div className="screen-head">
        <button className="icon-btn" onClick={onBack} aria-label="←">
          <Icon name="back" />
        </button>
        <h1>{t.fixTitle}</h1>
      </div>

      <div className="screen-body">
        {order === null ? (
          <div className="skel" style={{ height: 320 }} />
        ) : saved ? (
          <>
            <div className="success">
              <h2>{t.fixSaved}</h2>
              <div className="no">№ {order.orderNumber}</div>
              <p>
                {order.street}
                {order.detail ? `, ${order.detail}` : ''}
              </p>
            </div>
            <button className="btn" onClick={onDone}>
              {t.done}
            </button>
          </>
        ) : !canFixAddress(order) ? (
          <div className="empty">
            <div className="em">📦</div>
            <h3>{t.fixClosed}</h3>
            {error && <p>{error}</p>}
            <button className="btn" style={{ marginTop: 16 }} onClick={onBack}>
              {t.toHome}
            </button>
          </div>
        ) : (
          <>
            <div className="fix-warn rise">
              <Icon name="info" />
              <span>
                {t.fixIntro(order.orderNumber)}
                <b>
                  {order.street}
                  {order.detail ? `, ${order.detail}` : ''}
                </b>
              </span>
            </div>

            {error && <div className="error-box">{error}</div>}

            <div className="block rise" style={{ '--i': 1 }}>
              <div className="block-title">
                <Icon name="pin" /> {t.address}
              </div>
              {field('street', t.street, { input: { placeholder: '서울 강남구 테헤란로 123' } })}
              {field('detail', t.detail, { input: { placeholder: '101동 1502호' } })}
            </div>

            <div className="block rise" style={{ '--i': 2 }}>
              <div className="block-title">
                <Icon name="user" /> {t.recipient}
              </div>
              {field('customerName', t.name, { input: { autoComplete: 'name' } })}
              {field('phone', t.phone, {
                transform: formatPhone,
                input: { placeholder: '010-1234-5678', inputMode: 'tel', autoComplete: 'tel' },
              })}
            </div>

            <button className="btn" style={{ marginTop: 6 }} onClick={submit} disabled={busy}>
              {busy ? '…' : t.fixSave}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
