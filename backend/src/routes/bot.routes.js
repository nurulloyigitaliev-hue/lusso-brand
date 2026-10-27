// Bot handlerlari — bot instansiyasiga ulanadi
import {
  onStart,
  onLanguageChosen,
  onContact,
  onText,
  onMenuAction,
  onAdminCommand,
  onPanelCommand,
  onPricesCommand,
  onIdCommand,
  onPhoto,
  onReceiptConfirm,
  onFixStart,
  onDeleteBroadcastCommand,
  onDeleteBroadcastConfirm,
  onDeleteBroadcastCancel,
} from '../controllers/botController.js';

export function registerBotHandlers(bot) {
  if (!bot) return;

  bot.command('start', onStart);

  bot.command('admin', onAdminCommand);

  bot.command('panel', onPanelCommand);

  bot.command('narxlar', onPricesCommand);

  // /o'chir — oxirgi rassilkani mijozlardan o'chirish. Apostrof bilan yozilgan
  // buyruqni Telegram "/o" deb kesadi, shuning uchun matn bo'yicha tutiladi
  // (/o'chir, /o‘chir, /o’chir, /ochir)
  bot.hears(/^\/o['‘’ʻʼ`]?chir(@\w+)?\s*$/i, onDeleteBroadcastCommand);
  bot.callbackQuery(/^bc:del:(\d+)$/, onDeleteBroadcastConfirm);
  bot.callbackQuery('bc:cancel', onDeleteBroadcastCancel);

  bot.command('id', onIdCommand);
  // Oddiy "id" deb yozilsa ham (slashsiz)
  bot.hears(/^\s*(id|айди|ид)\s*[.!?]*\s*$/i, onIdCommand);

  bot.callbackQuery(/^lang:(uz|ru)$/, onLanguageChosen);

  bot.callbackQuery(/^menu:(orders|contact|install|about|lang)$/, onMenuAction);

  // Admin: chek xabaridagi "✅ Tasdiqlash"
  bot.callbackQuery(/^rcpt:ok:(\d+)$/, onReceiptConfirm);

  // Mijoz: "✍️ Manzilni qayta kiriting"
  bot.callbackQuery(/^fix:(\d+)$/, onFixStart);

  bot.on('message:contact', onContact);

  // To'lov cheki botga rasm (yoki rasm-fayl) qilib yuborilganda
  bot.on(['message:photo', 'message:document'], onPhoto);

  bot.on('message:text', onText);

  bot.catch((err) => {
    console.error('🤖 Bot xatosi:', err.message);
  });
}

export default registerBotHandlers;
