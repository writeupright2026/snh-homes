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
    `INSERT INTO holiday_queries
      (name, email, phone, departure_date, return_date, guests, page_name, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      name,
      email,
      phone,
      String(form.get("departure_date") || ""),
      String(form.get("return_date") || ""),
      String(form.get("guests") || ""),
      String(form.get("page_name") || "Holiday Homes"),
    ],
  );

  return Response.redirect(new URL("/thank-you", request.url), 303);
}
