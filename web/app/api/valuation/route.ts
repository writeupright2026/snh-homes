import { execute } from "@/lib/db";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();

  if (!name || !email || !phone) {
    return Response.json({ message: "Name, email, and phone are required." }, { status: 422 });
  }

  await execute(
    `INSERT INTO valuation_queries
      (name, email, phone, property_type, bedroom, address, type, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      name,
      email,
      phone,
      String(form.get("property_type") || ""),
      String(form.get("bedroom") || ""),
      String(form.get("address") || ""),
      String(form.get("type") || ""),
    ],
  );

  return Response.redirect(new URL("/thank-you", request.url), 303);
}
