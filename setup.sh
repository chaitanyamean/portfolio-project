#!/bin/bash
# ═══════════════════════════════════════════════════════════
# Telegram DevOps Bot - One-Time Setup Script
# ═══════════════════════════════════════════════════════════
#
# This script:
# 1. Sets Cloudflare Worker secrets
# 2. Deploys the Cloudflare Worker
# 3. Sets up the Telegram webhook
#
# Prerequisites:
#   - npm install -g wrangler
#   - wrangler login
#   - A Telegram bot token from @BotFather
#   - A GitHub Personal Access Token

set -e

echo "═══════════════════════════════════════════════════"
echo "  🤖 Telegram DevOps Bot - Setup"
echo "═══════════════════════════════════════════════════"
echo ""

# ─── Collect Info ──────────────────────────────────────────
read -p "📱 Telegram Bot Token (from @BotFather): " TELEGRAM_BOT_TOKEN
read -p "👤 Your Telegram User ID: " ALLOWED_TELEGRAM_USER_ID
read -p "🔑 GitHub Personal Access Token (repo + workflow scope): " GH_PAT
echo ""

# ─── Set Cloudflare Secrets ────────────────────────────────
echo "📡 Setting Cloudflare Worker secrets..."
cd cloudflare-worker

echo "$TELEGRAM_BOT_TOKEN" | npx wrangler secret put TELEGRAM_BOT_TOKEN
echo "$ALLOWED_TELEGRAM_USER_ID" | npx wrangler secret put ALLOWED_TELEGRAM_USER_ID
echo "$GH_PAT" | npx wrangler secret put GH_PAT

# ─── Deploy Worker ─────────────────────────────────────────
echo ""
echo "🚀 Deploying Cloudflare Worker..."
npx wrangler deploy

# Get the worker URL
WORKER_URL=$(npx wrangler deployments list 2>&1 | grep -o 'https://[^ ]*' | head -1)

if [ -z "$WORKER_URL" ]; then
  echo ""
  echo "⚠️  Could not auto-detect Worker URL."
  read -p "📡 Enter your Worker URL (e.g. https://telegram-devops-bot.YOUR_SUBDOMAIN.workers.dev): " WORKER_URL
fi

cd ..

# ─── Set Telegram Webhook ─────────────────────────────────
echo ""
echo "🔗 Setting Telegram webhook..."
WEBHOOK_RESPONSE=$(curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${WORKER_URL}")
echo "Response: $WEBHOOK_RESPONSE"

# ─── Verify ────────────────────────────────────────────────
echo ""
echo "🔍 Verifying webhook..."
WEBHOOK_INFO=$(curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo")
echo "Webhook info: $WEBHOOK_INFO"

# ─── Done ──────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✅ Setup Complete!"
echo "═══════════════════════════════════════════════════"
echo ""
echo "  Worker URL:  $WORKER_URL"
echo "  Webhook:     Set ✓"
echo ""
echo "  Next steps:"
echo "  1. Add these secrets to your GitHub repo(s):"
echo "     - ANTHROPIC_API_KEY (your Claude API key)"
echo "     - TELEGRAM_BOT_TOKEN ($TELEGRAM_BOT_TOKEN)"
echo "     - TELEGRAM_CHAT_ID (same as user ID for private chat)"
echo "     - GH_PAT (the token you just entered)"
echo "     - VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID (if using Vercel)"
echo ""
echo "  2. Copy .github/workflows/telegram-devops.yml into your project repo"
echo ""
echo "  3. Send a message to your bot on Telegram!"
echo ""
