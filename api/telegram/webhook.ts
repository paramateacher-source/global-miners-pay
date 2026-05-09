import type { VercelRequest, VercelResponse } from "@vercel/node";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const update = req.body;
  if (!update) {
    res.status(400).json({ error: "No body" });
    return;
  }

  try {
    const message = update.message || update.callback_query?.message;
    const chatId = message?.chat?.id;
    const text = update.message?.text || "";

    if (!chatId) {
      res.status(200).json({ ok: true });
      return;
    }

    if (text.startsWith("/start") || text === "/mine") {
      await sendMiniAppButton(chatId);
    } else if (text === "/help") {
      await sendMessage(chatId, helpText());
    } else {
      await sendMiniAppButton(chatId);
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(200).json({ ok: true });
  }
}

async function sendMessage(chatId: number, text: string) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
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
        "🌍 Supports 50+ countries with local currency display\n" +
        "💰 Minimum withdrawal: <b>$1,000</b>\n" +
        "🔐 Secure 4-digit PIN protection\n" +
        "✅ Licensed &amp; Regulated · United States\n\n" +
        "Tap the button below to open the app 👇",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "⛏️ Open GlobalMinersPay", web_app: { url: appUrl } }],
          [{ text: "📖 Help", callback_data: "help" }],
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
    "/mine — Start mining\n" +
    "/help — Show this message\n\n" +
    "How it works:\n" +
    "1️⃣ Register with your name, phone &amp; country\n" +
    "2️⃣ Pay $50 USDT (BEP20) one-time verification fee\n" +
    "3️⃣ Mine $100 daily by tapping the mine button\n" +
    "4️⃣ Withdraw $1,000–$5,000 using your PIN\n\n" +
    "🏢 Licensed: GMP-US-2024-847392-X · USA"
  );
}
