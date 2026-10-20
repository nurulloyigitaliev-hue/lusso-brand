/**
 * Yuklangan rasmlar mavjudligini tekshirish.
 *
 * Bazaga yozish joriy qilinishidan oldin yuklangan ba'zi rasmlar Render
 * diskidan o'chib ketgan — ularning havolasi bazada qolgan, fayli esa yo'q.
 * Mijozga bunday "o'lik" rasm yuborilmaydi: mahsulotning ishlaydigan rasmi
 * ko'rinadi (yoki birortasi qolmasa — ilovadagi LUSSO belgisi).
 */
import fs from 'fs';
import path from 'path';
import config from '../config/default.js';
import prisma from '../database/connection.js';

const stored = new Set(); // bazadagi fayl nomlari

export async function loadStoredUploads() {
  try {
    const rows = await prisma.uploadedFile.findMany({ select: { name: true } });
    rows.forEach((r) => stored.add(r.name));
  } catch (err) {
    console.error("⚠️  Yuklangan rasmlar ro'yxatini o'qib bo'lmadi:", err.message);
  }
}

export function rememberUpload(name) {
  stored.add(name);
}

// Serverning o'zi olgan rasmni (masalan, botga yuborilgan chekni) /uploads ga
// saqlaydi: diskka va bazaga. "/uploads/<nom>" qaytaradi.
export async function saveUpload(data, ext, mime) {
  const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
  await fs.promises.mkdir(config.uploadsDir, { recursive: true });
  await fs.promises.writeFile(path.join(config.uploadsDir, name), data);
  await prisma.uploadedFile.create({ data: { name, mime, data } });
  rememberUpload(name);
  return `/uploads/${name}`;
}

export function isImageAvailable(url) {
  if (typeof url !== 'string' || !url.startsWith('/uploads/')) return Boolean(url);
  const name = url.split('#')[0].split('?')[0].replace('/uploads/', '');
  if (stored.has(path.basename(name))) return true;
  return fs.existsSync(path.join(config.uploadsDir, name));
}

// Yuklangan fayllarni (masalan, o'chirilgan buyurtmalarning cheklarini)
// bazadan va diskdan o'chiradi. urls — "/uploads/<nom>" ko'rinishida.
export async function removeUploads(urls) {
  const names = urls
    .filter((u) => typeof u === 'string' && u.startsWith('/uploads/'))
    .map((u) => path.basename(u.split('#')[0].split('?')[0]));
  if (!names.length) return;

  await prisma.uploadedFile.deleteMany({ where: { name: { in: names } } });
  for (const name of names) {
    stored.delete(name);
    fs.promises.unlink(path.join(config.uploadsDir, name)).catch(() => {});
  }
}

// Mahsulotdan o'lik rasmlarni olib tashlaydi (bazaga tegmaydi)
export function withLiveImages(product) {
  if (!product?.images) return product;
  return { ...product, images: product.images.filter((img) => isImageAvailable(img.url)) };
}
