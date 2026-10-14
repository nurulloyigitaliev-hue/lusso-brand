/**
 * Kichik rasmlar (thumbnail).
 *
 * Kartochkalarda 1200px lik asl rasm kerak emas. "/uploads/x.jpg?w=480" so'ralsa
 * rasm 480px li WebP qilib beriladi (5–8 marta yengil). Bir marta tayyorlanib
 * diskda saqlanadi, brauzer va Vercel uni 30 kun eslab qoladi.
 * Biror sabab bilan tayyorlab bo'lmasa — asl rasm beriladi.
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import config from '../config/default.js';
import prisma from '../database/connection.js';

const SIZES = [240, 480, 720];
const THUMBS = path.join(config.uploadsDir, '_thumbs');
const pending = new Map(); // bir xil rasm bir vaqtda ikki marta tayyorlanmasin

async function readSource(rel) {
  const file = path.join(config.uploadsDir, rel);
  if (!file.startsWith(config.uploadsDir + path.sep)) return null;
  try {
    return await fs.promises.readFile(file);
  } catch {
    // Server qayta ishga tushib diskdagi fayl o'chgan bo'lsa — bazadan
    const row = await prisma.uploadedFile.findUnique({ where: { name: path.basename(rel) } });
    return row ? Buffer.from(row.data) : null;
  }
}

async function makeThumb(rel, width, out) {
  const src = await readSource(rel);
  if (!src) return false;
  const buf = await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 74 }).toBuffer();
  await fs.promises.mkdir(THUMBS, { recursive: true });
  await fs.promises.writeFile(out, buf);
  return true;
}

// app.use('/uploads', serveThumb) — express.static dan oldin ulanadi
export async function serveThumb(req, res, next) {
  const w = Number(req.query.w);
  if (!w || req.method !== 'GET') return next();

  const width = SIZES.find((s) => s >= w) || SIZES[SIZES.length - 1];
  const rel = path.normalize(decodeURIComponent(req.path)).replace(/^[\\/]+/, '');
  if (!rel || rel.startsWith('..') || rel.startsWith('_thumbs')) return next();
  const out = path.join(THUMBS, `${width}-${rel.replace(/[\\/]/g, '__')}.webp`);

  try {
    if (!fs.existsSync(out)) {
      if (!pending.has(out)) pending.set(out, makeThumb(rel, width, out).finally(() => pending.delete(out)));
      if (!(await pending.get(out))) return next();
    }
    res.set('Cache-Control', 'public, max-age=2592000, s-maxage=2592000, immutable');
    res.type('image/webp');
    res.sendFile(out);
  } catch (err) {
    console.error('⚠️  Kichik rasm tayyorlanmadi:', rel, err.message);
    next();
  }
}

export default serveThumb;
