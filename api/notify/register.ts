import type { VercelRequest, VercelResponse } from "@vercel/node";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_TELEGRAM_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!ADMIN_CHAT_ID) {
    res.status(200).json({ ok: true, note: "ADMIN_TELEGRAM_ID not set" });
    return;
  }

  const { fullName, phoneNumber, country, telegramId, telegramUsername } = req.body || {};

  const tgInfo = telegramId
    ? `\n👤 Telegram: ${telegramUsername ? "@" + telegramUsername : "no username"} (ID: <code>${telegramId}</code>)`
    : "\n👤 Telegram: Not via Telegram (web user)";

  const text =
    `🆕 <b>New User Registered!</b>\n\n` +
    `👤 <b>Name:</b> ${fullName || "Unknown"}\n` +
    `📱 <b>Phone:</b> ${phoneNumber || "Unknown"}\n` +
    `🌍 <b>Country:</b> ${country || "Unknown"}` +
    tgInfo + `\n\n` +
    `⏰ ${new Date().toUTCString()}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });
    res.status(200).json({ ok: true });
  } catch {
    res.status(200).json({ ok: true });
  }
}
