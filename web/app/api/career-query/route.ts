import { execute } from "@/lib/db";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();

  if (!name || !email || !phone || !form.get("job_id")) {
    return Response.json({ message: "Please complete the required fields." }, { status: 422 });
  }

  const resume = form.get("resume");
  const resumeName = resume instanceof File ? resume.name : "";

  await execute(
    `INSERT INTO career_queries
      (job_id, name, email, phone, nationality, language, cover_letter, resume, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      Number(form.get("job_id")),
      name,
      email,
      phone,
      String(form.get("nationality") || ""),
      String(form.get("language") || ""),
      String(form.get("cover_letter") || ""),
      resumeName,
    ],
  );

  return Response.redirect(new URL("/career", request.url), 303);
}
