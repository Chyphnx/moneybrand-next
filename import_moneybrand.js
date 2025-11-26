import fs from "fs";
import path from "path";
import axios from "axios";
import { parse } from "csv-parse/sync";
import { fileURLToPath } from "url";

// 1) Load config
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(rootDir, "config.json");

if (!fs.existsSync(configPath)) {
  console.error("[FATAL] config.json not found. Create it first.");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const storeDomain =
  process.env.SHOPIFY_STORE_DOMAIN || config.storeDomain || "";
const adminToken =
  process.env.SHOPIFY_ADMIN_TOKEN || config.adminToken || "";
const apiVersion = config.apiVersion || "2025-01";
const csvPath = config.csvPath || "moneybrand_shopify_products_sizes.csv";

if (!storeDomain || !adminToken) {
  console.error(
    "[FATAL] SHOPIFY_STORE_DOMAIN / SHOPIFY_ADMIN_TOKEN missing. " +
      "Set them in config.json or as environment variables."
  );
  process.exit(1);
}

const SHOPIFY_BASE =
  "https://" + storeDomain + "/admin/api/" + apiVersion;

// 2) Load CSV
const csvFullPath = path.join(rootDir, csvPath);
if (!fs.existsSync(csvFullPath)) {
  console.error("[FATAL] CSV file not found:", csvFullPath);
  process.exit(1);
}

const rawCsv = fs.readFileSync(csvFullPath, "utf8");
const rows = parse(rawCsv, {
  columns: true,
  skip_empty_lines: true,
});

console.log("[IMPORT] Loaded", rows.length, "rows from", csvPath);

// 3) Group rows by handle
function getHandle(row) {
  return (
    row.Handle ||
    row.handle ||
    row["Handle "] ||
    row["handle "] ||
    row.Title ||
    "moneybrand-unknown"
  );
}

const groups = {};
for (const row of rows) {
  const handle = getHandle(row);
  if (!groups[handle]) groups[handle] = [];
  groups[handle].push(row);
}

async function createProductForGroup(handle, groupRows) {
  const first = groupRows[0];

  const title = first["Title"] || first.title || handle;
  const bodyHtml = first["Body (HTML)"] || "";
  const vendor = first["Vendor"] || "Money Brand";
  const productType =
    first["Type"] || first["Product Type"] || "Apparel";
  const tagsRaw = first["Tags"] || "";
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const variants = groupRows.map((row) => {
    const size =
      row["Option1 Value"] ||
      row["Size"] ||
      row["option1_value"] ||
      null;

    const price =
      row["Variant Price"] ||
      row["Price"] ||
      row["Variant price"] ||
      "0.00";

    const sku =
      row["Variant SKU"] ||
      row["SKU"] ||
      row["Variant sku"] ||
      undefined;

    return {
      option1: size || undefined,
      price,
      sku,
      requires_shipping: true,
      taxable: true,
    };
  });

  const sizeValues = Array.from(
    new Set(
      variants
        .map((v) => v.option1)
        .filter((v) => typeof v === "string" && v.length > 0)
    )
  );

  const options = [];
  if (sizeValues.length > 0) {
    options.push({
      name: first["Option1 Name"] || "Size",
      values: sizeValues,
    });
  }

  const productPayload = {
    product: {
      title,
      body_html: bodyHtml,
      handle,
      vendor,
      product_type: productType,
      tags: tags.join(", "),
      options: options.length ? options : undefined,
      variants,
    },
  };

  const url = SHOPIFY_BASE + "/products.json";
  const headers = {
    "X-Shopify-Access-Token": adminToken,
    "Content-Type": "application/json",
  };

  console.log("[CREATE]", handle, "→", title);
  const res = await axios.post(url, productPayload, { headers });
  return res.data.product;
}

async function main() {
  console.log("[TARGET STORE]", storeDomain);
  const handles = Object.keys(groups);
  console.log("[UNIQUE PRODUCTS]", handles.length);

  for (const handle of handles) {
    const groupRows = groups[handle];
    try {
      const product = await createProductForGroup(handle, groupRows);
      console.log(
        "[OK]",
        handle,
        "→ product id",
        product && product.id
      );
    } catch (err) {
      if (err.response) {
        console.error(
          "[ERROR]",
          handle,
          err.response.status,
          JSON.stringify(err.response.data)
        );
      } else {
        console.error("[ERROR]", handle, err.message);
      }
    }
  }

  console.log("=== DONE ===");
}

main().catch((err) => {
  console.error("[FATAL] Unhandled error:", err);
  process.exit(1);
});
