import { execute } from "@/lib/db";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();

  if (!name || !email) {
    return Response.json({ message: "Name and email are required." }, { status: 422 });
  }

  await execute(
    "INSERT INTO subscribers (name, email, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
    [name, email],
  );

  return Response.redirect(new URL("/thank-you", request.url), 303);
}
