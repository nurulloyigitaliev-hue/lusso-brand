// Telegram bot instansiyasi (grammY)
import path from 'path';
import sharp from 'sharp';
import { Bot, InputFile, InputMediaBuilder } from 'grammy';
import config from '../config/default.js';
import { readUpload } from './uploads.js';

if (!config.botToken) {
  console.warn('⚠️  BOT_TOKEN topilmadi (.env). Bot ishga tushmaydi, faqat API ishlaydi.');
}

// Token bo'lmasa ham server yiqilmasligi uchun "bo'sh" bot yaratiladi
export const bot = config.botToken ? new Bot(config.botToken) : null;

export const hasBot = Boolean(bot);

// Botning t.me havolasi (brauzerda ochilganda "botga o'tish" tugmasi uchun)
export function botLink() {
  if (config.botUrl) return config.botUrl;
  try {
    if (bot?.botInfo?.username) return `https://t.me/${bot.botInfo.username}`;
  } catch {
    /* bot hali ishga tushmagan */
  }
  return null;
}

// Xabar yuborish (xatolik bo'lsa server to'xtamaydi). Yetib borsa true.
export async function safeSend(chatId, text, extra = {}) {
  return Boolean(await safeSendMessage(chatId, text, extra));
}

// safeSend bilan bir xil, lekin yuborilgan xabarning o'zini qaytaradi (bo'lmasa null)
export async function safeSendMessage(chatId, text, extra = {}) {
  if (!bot) return null;
  try {
    return await bot.api.sendMessage(String(chatId), text, { parse_mode: 'Markdown', ...extra });
  } catch (err) {
    console.error(`⚠️  ${chatId} ga xabar yuborilmadi: ${err.message}`);
    return null;
  }
}

// Yuborilgan rasmlarning Telegram'dagi file_id si ("/uploads/x.jpg" → file_id):
// bir rasm har bir admin va mijozga qayta-qayta yuklanmaydi
const photoIds = new Map();

// Admin paneldagi rasm ramkasi sozlamasi ("#z=1.3&x=50") faylga tegishli emas
const photoKey = (photo) => (typeof photo === 'string' ? photo.split('#')[0] : null);

function rememberPhoto(key, msg) {
  const fileId = msg?.photo?.at(-1)?.file_id;
  if (fileId && /^(\/uploads\/|https?:\/\/)/.test(key || '')) photoIds.set(key, fileId);
}

/**
 * Rasmni Telegram'ga yuborishga tayyorlaydi:
 *  - avval yuborilgan bo'lsa — file_id (eng tez)
 *  - "/uploads/xxx.jpg" — fayl diskdan, bo'lmasa bazadan o'qilib, Telegram'ga
 *    to'g'ridan-to'g'ri yuklanadi (Telegram rasmni serverdan o'zi olib kelishiga
 *    tayanmaymiz — server uxlab qolsa yoki manzil sozlanmagan bo'lsa ketmay qolardi)
 *  - "https://..." yoki file_id — o'zgarishsiz
 * Rasm topilmasa — null.
 */
async function preparePhoto(photo) {
  const key = photoKey(photo);
  if (!key) return photo || null;
  if (photoIds.has(key)) return photoIds.get(key);
  if (!key.startsWith('/uploads/')) return key;

  const data = await readUpload(key);
  if (!data) {
    console.error(`⚠️  Rasm topilmadi: ${key}`);
    return null;
  }
  return new InputFile(await telegramReady(data), path.basename(key));
}

// Telegram talabi: JPEG/PNG, eni + bo'yi 10 000 dan oshmasin. Boshqa format
// (webp, heic) yoki juda katta rasm JPEG ga o'giriladi.
async function telegramReady(data) {
  try {
    const m = await sharp(data).metadata();
    const ok = ['jpeg', 'png'].includes(m.format) && data.length < 5e6 && m.width + m.height <= 10000;
    if (ok) return data;
    return await sharp(data)
      .rotate()
      .resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();
  } catch {
    return data;
  }
}

/**
 * Rasm yuborish. photo: "/uploads/xxx.jpg", "https://..." yoki file_id.
 * Muvaffaqiyatli bo'lsa message obyektini qaytaradi.
 */
export async function safeSendPhoto(chatId, photo, caption, extra = {}) {
  if (!bot) return null;
  const key = photoKey(photo);
  try {
    const input = await preparePhoto(photo);
    if (!input) return null;
    const msg = await bot.api.sendPhoto(String(chatId), input, {
      caption,
      parse_mode: 'Markdown',
      ...extra,
    });
    rememberPhoto(key, msg);
    return msg;
  } catch (err) {
    photoIds.delete(key); // eskirgan file_id bo'lsa — keyingi safar fayldan yuklanadi
    console.error(`⚠️  ${chatId} ga rasm yuborilmadi: ${err.message}`);
    return null;
  }
}

const CAPTION_MAX = 1024;

/**
 * Mahsulot rasmlari bilan xabar yuborish (buyurtma xabarlari uchun).
 *  - 1 ta rasm va matn qisqa bo'lsa — rasm + izoh bitta xabarda
 *  - bir nechta rasm — avval albom, keyin tugmali matn
 * Rasm yuborilmasa ham matn baribir yetib boradi. Matn yetib borsa true.
 */
export async function safeSendWithPhotos(chatId, photos, text, extra = {}) {
  if (!bot) return false;
  const list = [...new Set((photos || []).map(photoKey).filter(Boolean))].slice(0, 10);

  if (list.length === 1 && text.length <= CAPTION_MAX) {
    if (await safeSendPhoto(chatId, list[0], text, extra)) return true;
  } else if (list.length === 1) {
    await safeSendPhoto(chatId, list[0], undefined);
  } else if (list.length > 1) {
    await sendAlbum(chatId, list);
  }
  return safeSend(chatId, text, extra);
}

// Albomdagi bitta rasm yaroqsiz bo'lsa Telegram butun albomni rad etadi —
// topilmagan rasmlar tashlab yuboriladi, albom baribir ketmasa rasmlar birma-bir yuboriladi
async function sendAlbum(chatId, list) {
  const ready = [];
  for (const key of list) {
    const input = await preparePhoto(key).catch(() => null);
    if (input) ready.push({ key, input });
  }

  if (ready.length < 2) {
    if (ready.length) await safeSendPhoto(chatId, ready[0].key, undefined);
    return;
  }

  try {
    const msgs = await bot.api.sendMediaGroup(
      String(chatId),
      ready.map((r) => InputMediaBuilder.photo(r.input))
    );
    msgs.forEach((m, i) => rememberPhoto(ready[i].key, m));
  } catch (err) {
    console.error(`⚠️  ${chatId} ga albom yuborilmadi: ${err.message}`);
    for (const r of ready) {
      photoIds.delete(r.key);
      await safeSendPhoto(chatId, r.key, undefined);
    }
  }
}

export default bot;
