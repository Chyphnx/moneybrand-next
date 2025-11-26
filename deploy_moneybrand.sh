#!/usr/bin/env bash
set -euo pipefail

MSG="${1:-deploy: moneybrand update}"

echo "==============================="
echo " MoneyBrand Deploy"
echo "==============================="
echo "Message : $MSG"
echo "Dir     : $(pwd)"
echo "==============================="

# 1) Env bootstrap
if [ -f ".env.local" ]; then
  echo "[ENV] Using existing .env.local"
elif [ -f ".env.deploy" ]; then
  echo "[ENV] No .env.local found. Copying from .env.deploy"
  cp .env.deploy .env.local
elif [ -f ".env.example" ]; then
  echo "[ENV] No .env.local found. Copying from .env.example"
  cp .env.example .env.local
  echo "[ENV] -> Edit .env.local with real values (Shopify, URLs, etc.)."
else
  echo "[ENV] No .env.local / .env.deploy / .env.example found."
  echo "      Create .env.local with at least:"
  echo "        NEXT_PUBLIC_SITE_URL=https://moneybrandclothing.com"
  echo "        NEXT_PUBLIC_SHOP_URL=YOUR_SHOPIFY_URL"
  echo "      Aborting."
  exit 1
fi

# 2) Dependencies
if [ ! -d "node_modules" ]; then
  echo "[NODE] node_modules missing, running npm install..."
  npm install
else
  echo "[NODE] node_modules present, skipping install (delete node_modules to force reinstall)."
fi

# 3) Build
echo "[BUILD] Running npm run build..."
npm run build

# 4) Git init / remote wiring
if [ ! -d ".git" ]; then
  echo "[GIT] No .git folder found. Initializing repo."
  git init
  git branch -M main
else
  echo "[GIT] Existing git repo detected."
fi

# If origin not set, try to add it from env
if ! git remote get-url origin >/dev/null 2>&1; then
  if [ -n "${GIT_REMOTE_URL:-}" ]; then
    echo "[GIT] Adding remote origin: $GIT_REMOTE_URL"
    git remote add origin "$GIT_REMOTE_URL" || true
  else
    echo "[GIT] No remote 'origin' set and GIT_REMOTE_URL is empty."
    echo "      Set GIT_REMOTE_URL in .env.local or manually add remote:"
    echo "        git remote add origin git@github.com:YOUR-ORG/moneybrand-site.git"
  fi
else
  echo "[GIT] Remote 'origin' already configured."
fi

# 5) Commit + push
echo "[GIT] Staging and committing..."
git add -A
git commit -m "$MSG" || echo "[GIT] No changes to commit."

if git remote get-url origin >/dev/null 2>&1; then
  echo "[GIT] Pushing to origin main..."
  git push -u origin main || echo "[GIT] Push failed. Check SSH keys / token."
else
  echo "[GIT] No remote 'origin' configured. Skipping push."
fi

echo "==============================="
echo " Deploy script complete."
echo " - Local build completed"
echo " - Git repo updated (if remote configured)"
echo "==============================="

echo ""
echo "[NEXT STEP] Cloudflare Pages:"
echo " - In Cloudflare, create a Pages project pointing at this GitHub repo"
echo " - Set env vars (NEXT_PUBLIC_* etc.) to match .env.local"
echo " - Attach moneybrandclothing.com as the custom domain"
echo ""
echo "Once that’s wired, every ./deploy_moneybrand.sh run will push changes,"
echo "and Cloudflare will auto-build + deploy MoneyBrand live."

