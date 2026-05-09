// Utility to set up the Telegram bot webhook from the frontend
// Call this once after deployment to register your webhook URL

export async function setupBotWebhook(webhookUrl: string): Promise<{ ok: boolean; description?: string }> {
  try {
    const res = await fetch("/api/telegram/set-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ webhookUrl }),
    });
    return await res.json();
  } catch {
    return { ok: false, description: "Network error" };
  }
}

export async function getBotInfo(): Promise<{ ok: boolean; result?: { username: string; first_name: string } }> {
  try {
    const res = await fetch("/api/telegram/bot-info");
    return await res.json();
  } catch {
    return { ok: false };
  }
}

export async function getWebhookInfo(): Promise<{ ok: boolean; result?: { url: string; has_custom_certificate: boolean; pending_update_count: number } }> {
  try {
    const res = await fetch("/api/telegram/webhook-info");
    return await res.json();
  } catch {
    return { ok: false };
  }
}
