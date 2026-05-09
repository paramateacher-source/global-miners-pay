import type { VercelRequest, VercelResponse } from "@vercel/node";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
    const data = await resp.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ ok: false, error: "Failed" });
  }
}
