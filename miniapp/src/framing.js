// Rasm ramkasi: admin panelda har bir rasm uchun kattalik va joylashuv tanlanadi.
// Sozlama rasm havolasining "#" qismida saqlanadi: ".../shoe.jpg#z=1.3&x=50&y=40&fit=c"
//   z   — kattalashtirish (1 = ramkani to'liq to'ldiradi)
//   x,y — rasmning qaysi qismi markazda turadi (0–100 %)
//   fit — "c" bo'lsa rasm to'liq ko'rinadi (kesilmaydi)
// "#" qismi serverga yuborilmaydi, shuning uchun rasmning o'zi o'zgarmaydi.

export function parseFrame(url = '') {
  const [src, hash = ''] = String(url).split('#');
  const q = new URLSearchParams(hash);
  const num = (k, d) => {
    const n = parseFloat(q.get(k));
    return Number.isFinite(n) ? n : d;
  };
  return {
    src,
    z: num('z', 1),
    x: num('x', 50),
    y: num('y', 50),
    fit: q.get('fit') === 'c' ? 'contain' : 'cover',
  };
}

// Kichik rasm: serverdagi rasmga "?w=480" qo'shiladi ("#" ramka qismi saqlanadi).
// Server uni yengil WebP qilib beradi — kartochkalar tez ochiladi.
export function thumb(url, w = 480) {
  if (typeof url !== 'string' || !url.startsWith('/uploads/') || url.includes('?')) return url;
  const i = url.indexOf('#');
  return i < 0 ? `${url}?w=${w}` : `${url.slice(0, i)}?w=${w}${url.slice(i)}`;
}

// <img> uchun style: object-fit/position + kattalashtirish (--z CSS o'zgaruvchisi orqali)
export function frameStyle(url) {
  const f = parseFrame(url);
  return {
    objectFit: f.fit,
    objectPosition: `${f.x}% ${f.y}%`,
    transformOrigin: `${f.x}% ${f.y}%`,
    '--z': f.z,
  };
}
