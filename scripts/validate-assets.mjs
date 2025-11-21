#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "products.json");
const publicDir = path.join(root, "public");

if (!fs.existsSync(productsPath)) {
  console.error("[assets] ERROR: data/products.json not found");
  process.exit(1);
}

let products;
try {
  const raw = fs.readFileSync(productsPath, "utf8");
  products = JSON.parse(raw);
  if (!Array.isArray(products)) {
    throw new Error("Expected products.json to be an array");
  }
} catch (err) {
  console.error("[assets] ERROR parsing data/products.json:", err.message);
  process.exit(1);
}

let missing = 0;

for (const p of products) {
  const sku = p.sku || "<no-sku>";
  const img = p.image;

  if (!img || typeof img !== "string") {
    console.error(`[assets] ${sku}: missing or invalid "image" field`);
    missing++;
    continue;
  }

  const imgPath = img.startsWith("/") ? img.slice(1) : img;
  const fullPath = path.join(publicDir, imgPath);

  if (!fs.existsSync(fullPath)) {
    console.error(
      `[assets] ${sku}: image missing on disk → public/${imgPath}`
    );
    missing++;
  }
}

if (missing > 0) {
  console.error(`\n[assets] FAIL – ${missing} product image(s) missing.`);
  process.exit(1);
}

console.log("[assets] OK – all listed product images exist.");
