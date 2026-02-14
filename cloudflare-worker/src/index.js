/**
 * Telegram DevOps Bot — Cloudflare Worker
 *
 * Receives Telegram webhook POSTs, validates the sender,
 * acknowledges immediately, then triggers a GitHub Actions
 * workflow via repository_dispatch.
 */

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("OK", { status: 200 });
    }

    try {
      const update = await request.json();
      const message = update.message;
      if (!message || !message.text) {
        return new Response("OK", { status: 200 });
      }

      const chatId = message.chat.id;
      const userId = String(message.from.id);

      // ── Auth: only allow the configured Telegram user ──
      if (userId !== String(env.ALLOWED_TELEGRAM_USER_ID)) {
        await sendTelegram(
          env.TELEGRAM_BOT_TOKEN,
          chatId,
          "⛔ Unauthorized user."
        );
        return new Response("OK", { status: 200 });
      }

      // ── Handle /start command ──
      if (message.text.startsWith("/start")) {
        await sendTelegram(
          env.TELEGRAM_BOT_TOKEN,
          chatId,
          "👋 DevOps Bot ready\\!\n\nSend me a message and I'll trigger a CI/CD pipeline\\."
        );
        return new Response("OK", { status: 200 });
      }

      // ── Acknowledge receipt immediately ──
      await sendTelegram(
        env.TELEGRAM_BOT_TOKEN,
        chatId,
        "⏳ Got it\\! Triggering pipeline\\.\\.\\."
      );

      // ── Trigger GitHub Actions via repository_dispatch ──
      const dispatchRes = await fetch(
        `https://api.github.com/repos/${env.GITHUB_REPO}/dispatches`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${env.GH_PAT}`,
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "telegram-devops-bot",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_type: "telegram-devops",
            client_payload: {
              message: message.text,
              chat_id: String(chatId),
            },
          }),
        }
      );

      if (!dispatchRes.ok) {
        const errBody = await dispatchRes.text();
        await sendTelegram(
          env.TELEGRAM_BOT_TOKEN,
          chatId,
          `❌ GitHub dispatch failed \\(${dispatchRes.status}\\): ${escapeMarkdownV2(errBody.slice(0, 200))}`
        );
      }

      return new Response("OK", { status: 200 });
    } catch (err) {
      // Always return 200 to Telegram to prevent retries
      console.error("Worker error:", err);
      return new Response("OK", { status: 200 });
    }
  },
};

// ── Helpers ──────────────────────────────────────────────────

async function sendTelegram(botToken, chatId, text) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "MarkdownV2",
    }),
  });
}

function escapeMarkdownV2(text) {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}
