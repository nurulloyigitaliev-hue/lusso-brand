import { useEffect, useState } from 'react';
import api from '../api';
import Modal from './Modal';

const money = (n) => '₩' + Number(n || 0).toLocaleString('ko-KR');
const WAIT = 3; // 2-so'rovda "o'chirish" tugmasi shuncha soniyadan keyin bosiladi

// Savdoni to'liq tozalash. Adashib bosib yuborilmasligi uchun ikki marta so'raladi:
//   1) nima o'chishi va nima qolishi ko'rsatiladi;
//   2) yana bir bor so'raladi — tugmalar joyi almashgan, o'chirish tugmasi
//      bir necha soniya kutadi, shunda ketma-ket ikki bosish o'tib ketmaydi.
export default function ClearSales({ toast, onCleared }) {
  const [step, setStep] = useState(0); // 0 — yopiq, 1 — ma'lumot, 2 — oxirgi so'rov
  const [info, setInfo] = useState(null);
  const [wait, setWait] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (step !== 2 || wait <= 0) return;
    const id = setTimeout(() => setWait(wait - 1), 1000);
    return () => clearTimeout(id);
  }, [step, wait]);

  const close = () => {
    if (busy) return;
    setStep(0);
    setInfo(null);
  };

  const open = async () => {
    setBusy(true);
    try {
      setInfo(await api.salesSummary());
      setStep(1);
    } catch (e) {
      toast(e.message, true);
    } finally {
      setBusy(false);
    }
  };

  const askAgain = () => {
    setWait(WAIT);
    setStep(2);
  };

  const clear = async () => {
    setBusy(true);
    try {
      const { deleted } = await api.clearSales(info.maxId);
      toast(`Savdo tozalandi: ${deleted} ta buyurtma o'chirildi ✅`);
      setStep(0);
      setInfo(null);
      onCleared();
    } catch (e) {
      toast(e.message, true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="card clear-sales">
        <div>
          <b>🗑 Savdoni tozalash</b>
          <span className="muted">
            Buyurtmalar, tushum va statistika noldan boshlanadi. Mahsulotlar, ombor va mijozlar
            o'chmaydi.
          </span>
        </div>
        <button className="btn danger" onClick={open} disabled={busy}>
          {busy && !step ? 'Kuting…' : 'Tozalash'}
        </button>
      </div>

      {step === 1 && (
        <Modal title="🗑 Savdo o'chirilsinmi? (1/2)" onClose={close}>
          {info.orders === 0 ? (
            <>
              <p className="muted" style={{ marginTop: 0 }}>
                Tozalanadigan savdo yo'q — buyurtmalar ro'yxati bo'sh.
              </p>
              <button className="btn light full" onClick={close}>
                Yopish
              </button>
            </>
          ) : (
            <>
              <p style={{ marginTop: 0 }}>
                Quyidagilar <b>butunlay o'chadi</b>:
              </p>
              <div className="info-row">
                <span>Buyurtmalar</span>
                <b>{info.orders} ta</b>
              </div>
              <div className="info-row">
                <span>Shundan to'lov kutilayotgan</span>
                <b>{info.pending} ta</b>
              </div>
              <div className="info-row">
                <span>Jami tushum</span>
                <b>{money(info.revenue)}</b>
              </div>
              <div className="info-row">
                <span>To'lov cheklari (rasm)</span>
                <b>{info.receipts} ta</b>
              </div>
              <div className="info-row">
                <span>Eng ko'p sotilganlar</span>
                <b>noldan boshlanadi</b>
              </div>

              <p className="muted">
                ✅ Qoladi: mahsulotlar, ombor qoldiqlari, kategoriyalar, mijozlar va sozlamalar.
                <br />
                Mijozlarning "Buyurtmalarim" bo'limi ham bo'shaydi.
              </p>

              <div className="clear-sales-actions">
                <button className="btn light" onClick={close}>
                  Bekor qilish
                </button>
                <button className="btn danger" onClick={askAgain}>
                  Ha, davom etish
                </button>
              </div>
            </>
          )}
        </Modal>
      )}

      {step === 2 && (
        <Modal title="⚠️ Rostdan ham o'chirilsinmi? (2/2)" onClose={close}>
          <p style={{ marginTop: 0 }}>
            <b>{info.orders} ta buyurtma</b> va <b>{money(info.revenue)}</b> tushum butunlay
            o'chadi. Buni qaytarib bo'lmaydi.
          </p>

          <div className="clear-sales-actions">
            <button className="btn danger-solid" onClick={clear} disabled={wait > 0 || busy}>
              {busy ? "O'chirilmoqda…" : wait > 0 ? `Ha, o'chirish (${wait})` : "Ha, o'chirish"}
            </button>
            <button className="btn light" onClick={close} disabled={busy}>
              Yo'q, qoldirish
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
