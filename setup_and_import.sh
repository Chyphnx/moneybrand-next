#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ZIP_NAME="moneybrand_shopify_upload_bundle.zip"
TMP_DIR="$ROOT_DIR/.mb_tmp"

echo "[INFO] Root: $ROOT_DIR"

# 1) Check ZIP exists
if [ ! -f "$ROOT_DIR/$ZIP_NAME" ]; then
  echo "[FATAL] $ZIP_NAME not found in $ROOT_DIR"
  echo "        Put moneybrand_shopify_upload_bundle.zip in $ROOT_DIR and re-run."
  exit 1
fi

# 2) Clean temp + unzip
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
echo "[INFO] Unzipping $ZIP_NAME..."
unzip -q "$ROOT_DIR/$ZIP_NAME" -d "$TMP_DIR"

# 3) Ensure data/images directories
mkdir -p "$ROOT_DIR/data" "$ROOT_DIR/images"

# 4) Copy CSV + images into project
if [ -f "$TMP_DIR/data/moneybrand_shopify_products_sizes.csv" ]; then
  cp "$TMP_DIR/data/moneybrand_shopify_products_sizes.csv" "$ROOT_DIR/data/"
  echo "[INFO] Copied moneybrand_shopify_products_sizes.csv into data/"
else
  echo "[FATAL] CSV not found inside bundle at data/moneybrand_shopify_products_sizes.csv"
  exit 1
fi

if ls "$TMP_DIR/images"/* >/dev/null 2>&1; then
  cp "$TMP_DIR/images/"* "$ROOT_DIR/images/"
  echo "[INFO] Copied images into images/"
else
  echo "[WARN] No images found in bundle /images"
fi

# 5) Build config.json from environment variables
STORE_DOMAIN="${SHOPIFY_STORE_DOMAIN:-}"
ADMIN_TOKEN="${SHOPIFY_ADMIN_TOKEN:-}"

if [ -z "$STORE_DOMAIN" ] || [ -z "$ADMIN_TOKEN" ]; then
  echo "[FATAL] You must set SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_TOKEN env vars before running."
  echo "        Example:"
  echo "          export SHOPIFY_STORE_DOMAIN='your-store.myshopify.com'"
  echo "          export SHOPIFY_ADMIN_TOKEN='shpat_xxx'"
  exit 1
fi

cat > "$ROOT_DIR/config.json" <<EOF
{
  "storeDomain": "$STORE_DOMAIN",
  "adminToken": "$ADMIN_TOKEN",
  "apiVersion": "2024-01",
  "csvPath": "./data/moneybrand_shopify_products_sizes.csv",
  "imagesDir": "./images"
}
EOF

echo "[INFO] Wrote config.json with storeDomain=$STORE_DOMAIN"

# 6) Sanity check import script exists
if [ ! -f "$ROOT_DIR/import_moneybrand.js" ]; then:
  echo "[FATAL] import_moneybrand.js not found in $ROOT_DIR"
  echo "        Make sure the importer script is here."
  exit 1
fi

# 7) Run importer
cd "$ROOT_DIR"
echo "[INFO] Running node import_moneybrand.js..."
node import_moneybrand.js

