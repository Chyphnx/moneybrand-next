import fs from "fs";
import path from "path";
import { products } from "@/lib/products";

export const dynamic = "force-static";

type AssetRow = {
  sku: string;
  name: string;
  imagePath: string;
  exists: boolean;
};

export default function AssetsAdminPage() {
  const publicDir = path.join(process.cwd(), "public");

  const rows: AssetRow[] = products.map((p) => {
    const imagePath = p.image.startsWith("/") ? p.image : `/${p.image}`;
    const onDisk = path.join(publicDir, imagePath);
    const exists = fs.existsSync(onDisk);

    return {
      sku: p.sku,
      name: p.name,
      imagePath,
      exists,
    };
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-wide">
          Asset Check – Money Brand
        </h1>
        <p className="mt-3 max-w-xl text-sm text-neutral-400">
          For each product, this shows whether the image file actually exists
          under <code className="text-[11px] bg-neutral-900 px-1 py-0.5 rounded">
            public/
          </code>{" "}
          so you know what still needs to be dropped in from your renders.
        </p>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-900 bg-neutral-950">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-neutral-900 text-neutral-400">
              <tr>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Image path</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.sku}
                  className="border-t border-neutral-900 text-neutral-200"
                >
                  <td className="px-4 py-2">
                    {r.exists ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        ● OK
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                        ● MISSING
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 font-mono text-[11px]">
                    {r.sku}
                  </td>
                  <td className="px-4 py-2 text-xs">{r.name}</td>
                  <td className="px-4 py-2 text-[11px] text-neutral-400">
                    {r.imagePath}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[11px] text-neutral-500">
          Rule: for any row marked MISSING, take the correct image, rename it to
          exactly the path shown here (under <code>public/</code>), drop it into{" "}
          <code>public/img</code>, and refresh this page.
        </p>
      </section>
    </main>
  );
}
