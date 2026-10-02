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
    `INSERT INTO property_queries (property_id, name, email, phone, message, created_at)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [
      Number(form.get("property_id") || 0),
      name,
      email,
      phone,
      String(form.get("message") || ""),
    ],
  );

  return Response.redirect(new URL("/thank-you", request.url), 303);
}
