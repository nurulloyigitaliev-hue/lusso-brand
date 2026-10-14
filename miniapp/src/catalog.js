// Katalogni telefonning o'zida filtrlash va saralash (serverdagi bilan bir xil qoidalar).
// Server butun ro'yxatni "nechta qolgani" bo'yicha tartiblab beradi — standart tartibda
// shu tartib saqlanadi.
export function filterCatalog(list, { category, search, sort, brand } = {}) {
  let out = list;

  if (category && category !== 'all') out = out.filter((p) => p.category?.slug === category);
  if (brand && brand !== 'all') out = out.filter((p) => p.brand === brand);

  const q = (search || '').trim().toLowerCase();
  if (q) {
    out = out.filter((p) =>
      [p.nameUz, p.nameRu, p.brand].some((s) => s && s.toLowerCase().includes(q))
    );
  }

  if (sort === 'price_asc') out = [...out].sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') out = [...out].sort((a, b) => b.price - a.price);
  else if (sort === 'new') out = [...out].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return out;
}
