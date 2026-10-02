import { execute } from "@/lib/db";

export async function POST(request: Request) {
  const form = await request.formData();
  const blogId = Number(form.get("blog_id") || 0);
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const comment = String(form.get("comment") || "").trim();

  if (!blogId || !name || !email || !comment) {
    return Response.json({ message: "Blog, name, email, and comment are required." }, { status: 422 });
  }

  await execute(
    `INSERT INTO blog_comments (blog_id, name, email, comment, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, 0, NOW(), NOW())`,
    [blogId, name, email, comment],
  );

  return Response.redirect(new URL("/thank-you", request.url), 303);
}
