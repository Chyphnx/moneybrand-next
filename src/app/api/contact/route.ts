import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const message = String(formData.get("message") ?? "");

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Missing name or email" },
      { status: 400 }
    );
  }

  console.log("MoneyBrand contact", { name, email, message });

  return NextResponse.redirect(new URL("/?contact=ok", req.url), {
    status: 303,
  });
}
