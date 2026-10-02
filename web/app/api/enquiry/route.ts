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
    `INSERT INTO queries
      (name, email, phone, property_type, page_name, address, message, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      name,
      email,
      phone,
      String(form.get("property_type") || ""),
      String(form.get("page_name") || "Website"),
      String(form.get("address") || ""),
      String(form.get("message") || ""),
    ],
  );

  return Response.redirect(new URL("/thank-you", request.url), 303);
}
