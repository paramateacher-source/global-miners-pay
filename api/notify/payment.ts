import type { VercelRequest, VercelResponse } from "@vercel/node";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_TELEGRAM_ID;

function generatePin(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!ADMIN_CHAT_ID) {
    res.status(200).json({ ok: true, note: "ADMIN_TELEGRAM_ID not set" });
    return;
  }

  const { fullName, phoneNumber, country, telegramId, telegramUsername, receiptBase64 } = req.body || {};

  const pin = generatePin();
  const userChatId = telegramId || "0";
  const userName = fullName || "Unknown";

  // Callback data (must be ≤64 bytes)
  const approveData = `gmp_approve:${userChatId}:${pin}:${userName.slice(0, 10)}`;
  const rejectData = `gmp_reject:${userChatId}:${userName.slice(0, 10)}`;

  const caption =
    `💳 <b>New Payment Receipt Submitted!</b>\n\n` +
    `👤 <b>Name:</b> ${fullName || "Unknown"}\n` +
    `📱 <b>Phone:</b> ${phoneNumber || "Unknown"}\n` +
    `🌍 <b>Country:</b> ${country || "Unknown"}\n` +
    `👤 <b>Telegram:</b> ${telegramId ? `@${telegramUsername || "no_username"} (${telegramId})` : "Web user"}\n\n` +
    `💰 <b>Amount:</b> $50 USDT (BEP20)\n` +
    `🔐 <b>Pre-generated PIN:</b> <code>${pin}</code>\n\n` +
    `⏰ ${new Date().toUTCString()}\n\n` +
    `<i>Tap Approve to send PIN to user, or Reject to decline.</i>`;

  const replyMarkup = {
    inline_keyboard: [[
      { text: "✅ Approve & Send PIN", callback_data: approveData },
      { text: "❌ Reject", callback_data: rejectData },
    ]],
  };

  try {
    if (receiptBase64 && receiptBase64.length > 100) {
      // Strip base64 header (e.g. "data:image/jpeg;base64,")
      const base64Data = receiptBase64.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Build multipart form
      const boundary = "----FormBoundary" + Math.random().toString(36).slice(2);
      const parts: Buffer[] = [];

      const addField = (name: string, value: string) => {
        parts.push(Buffer.from(
          `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`
        ));
      };

      addField("chat_id", ADMIN_CHAT_ID);
      addField("caption", caption);
      addField("parse_mode", "HTML");
      addField("reply_markup", JSON.stringify(replyMarkup));

      parts.push(Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="photo"; filename="receipt.jpg"\r\nContent-Type: image/jpeg\r\n\r\n`
      ));
      parts.push(imageBuffer);
      parts.push(Buffer.from(`\r\n--${boundary}--\r\n`));

      const body = Buffer.concat(parts);

      const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` },
        body,
      });

      const result = await resp.json();
      if (!result.ok) {
        // Fallback: send as text if photo fails
        await sendTextNotification(caption, replyMarkup);
      }
    } else {
      await sendTextNotification(caption, replyMarkup);
    }

    res.status(200).json({ ok: true, pin });
  } catch {
    res.status(200).json({ ok: true });
  }
}

async function sendTextNotification(text: string, replyMarkup: any) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text,
      parse_mode: "HTML",
      reply_markup: replyMarkup,
    }),
  });
}
