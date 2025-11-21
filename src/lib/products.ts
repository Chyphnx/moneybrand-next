export type Product = {
  sku: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  color: string;
  image: string;
  status: "available" | "sold_out" | "preorder" | string;
  description: string;
};

export const products: Product[] = [
  {
    sku: "MB-HOOD-MET-GOLD",
    slug: "metallic-gold-hoodie",
    name: "Metallic Gold Signature Hoodie",
    category: "Hoodie",
    price: 395,
    color: "Jet Black / Metallic Gold",
    image: "/img/hoodie-metallic-gold.png",
    status: "available",
    description:
      "Heavyweight fleece hoodie with metallic gold MONEY BRAND seal on chest and full back graphic. Positioned between Psycho Bunny and Celine in weight, finish and presence."
  },
  {
    sku: "MB-HOOD-MET-SILVER",
    slug: "metallic-silver-hoodie",
    name: "Metallic Silver Signature Hoodie",
    category: "Hoodie",
    price: 375,
    color: "Jet Black / Metallic Silver",
    image: "/img/hoodie-metallic-silver.png",
    status: "available",
    description:
      "Companion to the gold hoodie with mirrored metallic silver branding. Street-luxury staple for colder nights."
  },
  {
    sku: "MB-HOOD-CURR-BENJ",
    slug: "benjamin-currency-hoodie",
    name: "Benjamin Currency Hoodie",
    category: "Hoodie",
    price: 410,
    color: "Deep Black / Currency Print",
    image: "/img/hoodie-benjamin.png",
    status: "available",
    description:
      "All-over Benjamin note artwork wrapped around our heavyweight hoodie block. Currency-as-armor for the ones who move the needle."
  },
  {
    sku: "MB-CREW-CURR-BENJ",
    slug: "benjamin-currency-crew",
    name: "Benjamin Currency Crewneck",
    category: "Crewneck",
    price: 365,
    color: "Deep Black / Currency Print",
    image: "/img/crew-benjamin.png",
    status: "available",
    description:
      "Crewneck version of the Benjamin hoodie with the same oversized central currency art. Clean neckline, aggressive print."
  },
  {
    sku: "MB-TEE-COIN-BLACK",
    slug: "black-coin-logo-tee",
    name: "Coin Emblem Tee – Black",
    category: "T-Shirt",
    price: 165,
    color: "Black / Gold Seal",
    image: "/img/tee-coin-black.png",
    status: "available",
    description:
      "Premium cotton tee with the Money Brand coin emblem at chest and micro-print at back neck. Understated from distance, loud up close."
  },
  {
    sku: "MB-TEE-WORD-WHITE",
    slug: "wordmark-white-tee",
    name: "Wordmark Tee – White",
    category: "T-Shirt",
    price: 155,
    color: "White / Black",
    image: "/img/tee-wordmark-white.png",
    status: "available",
    description:
      "Clean white tee with razor-sharp MONEY BRAND wordmark. Everyday base layer that still reads designer."
  },
  {
    sku: "MB-TEE-MET-DUAL",
    slug: "dual-metallic-tee",
    name: "Dual Metallic Logo Tee",
    category: "T-Shirt",
    price: 185,
    color: "Black / Gold & Silver",
    image: "/img/tee-metallic-dual.png",
    status: "available",
    description:
      "Signature tee featuring both metallic gold and metallic silver logo treatments. Built to sit in the same conversation as Off-White and Palm Angels."
  },
  {
    sku: "MB-BELT-CURR-BROWN",
    slug: "benjamin-currency-belt",
    name: "Benjamin Currency Belt",
    category: "Belt",
    price: 295,
    color: "Brown / Currency Print",
    image: "/img/belt-currency-brown.png",
    status: "available",
    description:
      "Full-grain leather belt with Benjamin note graphic inlay. Low-key flex when the hoodie is off."
  },
  {
    sku: "MB-BELT-SIGN-BLACK",
    slug: "signature-black-belt",
    name: "Signature Money Brand Belt – Black",
    category: "Belt",
    price: 315,
    color: "Matte Black / Gold Hardware",
    image: "/img/belt-signature-black.png",
    status: "available",
    description:
      "Matte black belt with precision-cut Money Brand buckle hardware. Made to live with the metallic hoodies and caps."
  },
  {
    sku: "MB-CAP-CLASSIC-BLACK",
    slug: "classic-black-cap",
    name: "Money Brand Classic Cap – Black",
    category: "Cap",
    price: 145,
    color: "Black / Gold",
    image: "/img/cap-classic-black.png",
    status: "available",
    description:
      "Classic black cap with Money Brand wordmark in gold. The default uniform piece for brand loyalists."
  },
  {
    sku: "MB-CAP-LUXE-GOLD",
    slug: "metallic-gold-cap",
    name: "Money Brand Metallic Gold Cap",
    category: "Cap",
    price: 175,
    color: "Metallic Gold",
    image: "/img/cap-gold.png",
    status: "available",
    description:
      "Metallic gold cap with tonal embroidery. Designed to sit between Psycho Bunny and Celine caps on both price and feel."
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function featuredProducts(): Product[] {
  return products.slice(0, 4);
}
