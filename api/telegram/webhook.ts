import type { VercelRequest, VercelResponse } from "@vercel/node";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const update = req.body;
  if (!update) { res.status(200).json({ ok: true }); return; }

  try {
    // Handle callback queries (approve/reject buttons)
    if (update.callback_query) {
      await handleCallback(update.callback_query);
      res.status(200).json({ ok: true });
      return;
    }

    const message = update.message;
    if (!message) { res.status(200).json({ ok: true }); return; }

    const chatId = message.chat.id;
    const text = message.text || "";

    if (text === "/myid" || text.startsWith("/myid@")) {
      await sendMessage(chatId,
        `🆔 <b>Your Telegram Chat ID:</b>\n\n<code>${chatId}</code>\n\nCopy this ID and add it as <b>ADMIN_TELEGRAM_ID</b> in your Vercel environment variables to receive admin notifications.`
      );
    } else if (text.startsWith("/start") || text === "/mine") {
      await sendMiniAppButton(chatId);
    } else if (text === "/help") {
      await sendMessage(chatId, helpText());
    } else {
      await sendMiniAppButton(chatId);
    }
  } catch { /* silent */ }

  res.status(200).json({ ok: true });
}

async function handleCallback(callbackQuery: any) {
  const data: string = callbackQuery.data || "";
  const queryId = callbackQuery.id;
  const adminChatId = callbackQuery.message?.chat?.id;

  // Format: gmp_approve:USERCHATID:PIN or gmp_reject:USERCHATID:NAME
  if (data.startsWith("gmp_approve:")) {
    const parts = data.split(":");
    const userChatId = parts[1];
    const pin = parts[2];
    const userName = parts.slice(3).join(":") || "User";

    // Send PIN to user
    if (userChatId && userChatId !== "0") {
      await sendMessage(parseInt(userChatId),
        `✅ <b>Payment Approved!</b>\n\n` +
        `Your withdrawal PIN has been activated:\n\n` +
        `🔐 <b>Your PIN: <code>${pin}</code></b>\n\n` +
        `Save this PIN securely. Use it to withdraw your mining earnings.\n\n` +
        `Open the app to start withdrawing: tap the button below 👇`,
        {
          inline_keyboard: [[
            { text: "💰 Open GlobalMinersPay", web_app: { url: process.env.APP_URL || "https://global-miners-pay.vercel.app/" } }
          ]]
        }
      );
    }

    // Confirm to admin
    await answerCallback(queryId, `✅ Approved! PIN ${pin} sent to ${userName}`);
    if (adminChatId) {
      await editMessageText(adminChatId, callbackQuery.message.message_id,
        callbackQuery.message.text || callbackQuery.message.caption || "",
        `✅ <b>APPROVED</b> — PIN <code>${pin}</code> sent to ${userName}`
      );
    }

  } else if (data.startsWith("gmp_reject:")) {
    const parts = data.split(":");
    const userChatId = parts[1];
    const userName = parts.slice(2).join(":") || "User";

    // Send rejection to user
    if (userChatId && userChatId !== "0") {
      await sendMessage(parseInt(userChatId),
        `❌ <b>Payment Rejected</b>\n\n` +
        `Your payment receipt could not be verified. This may be because:\n\n` +
        `• Wrong network used (must be BEP20)\n` +
        `• Wrong amount sent (must be exactly $50 USDT)\n` +
        `• Receipt was unclear or invalid\n\n` +
        `Please try again with the correct payment. Open the app to resubmit.`,
        {
          inline_keyboard: [[
            { text: "🔄 Resubmit Payment", web_app: { url: process.env.APP_URL || "https://global-miners-pay.vercel.app/" } }
          ]]
        }
      );
    }

    await answerCallback(queryId, `❌ Rejected. User notified.`);
    if (adminChatId) {
      await editMessageCaption(adminChatId, callbackQuery.message.message_id,
        `❌ <b>REJECTED</b> — ${userName} has been notified.`
      );
    }
  }
}

async function sendMessage(chatId: number, text: string, replyMarkup?: any) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      reply_markup: replyMarkup,
    }),
  });
}

async function answerCallback(callbackQueryId: string, text: string) {
  await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text, show_alert: true }),
  });
}

async function editMessageText(chatId: number, messageId: number, _oldText: string, newCaption: string) {
  await fetch(`${TELEGRAM_API}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: newCaption,
      parse_mode: "HTML",
    }),
  }).catch(() => {});
}

async function editMessageCaption(chatId: number, messageId: number, newCaption: string) {
  await fetch(`${TELEGRAM_API}/editMessageCaption`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      caption: newCaption,
      parse_mode: "HTML",
    }),
  }).catch(() => {});
}

async function sendMiniAppButton(chatId: number) {
  const appUrl = process.env.APP_URL || "https://global-miners-pay.vercel.app/";
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text:
        "⛏️ <b>Welcome to GlobalMinersPay!</b>\n\n" +
        "Mine <b>$100 every day</b> and withdraw your earnings directly to your wallet.\n\n" +
        "🌍 Supports 50+ countries · 💰 Min withdrawal $1,000\n" +
        "🔐 Secure 4-digit PIN protection\n" +
        "✅ Licensed &amp; Regulated · United States\n\n" +
        "Tap below to open the app 👇",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "⛏️ Open GlobalMinersPay", web_app: { url: appUrl } }],
          [{ text: "❓ Help", callback_data: "help" }],
        ],
      },
    }),
  });
}

function helpText(): string {
  return (
    "❓ <b>GlobalMinersPay Help</b>\n\n" +
    "Commands:\n" +
    "/start — Open the app\n" +
    "/myid — Get your Telegram chat ID\n" +
    "/help — Show this message\n\n" +
    "How it works:\n" +
    "1️⃣ Register with your name, phone &amp; country\n" +
    "2️⃣ Pay $50 USDT (BEP20) one-time fee\n" +
    "3️⃣ Mine $100 daily by tapping the button\n" +
    "4️⃣ Withdraw $1,000–$5,000 using your PIN\n\n" +
    "🏢 License: GMP-US-2024-847392-X"
  );
}
