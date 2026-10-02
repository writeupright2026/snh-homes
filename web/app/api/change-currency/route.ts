import { cookies } from "next/headers";

export async function POST(request: Request) {
  const form = await request.formData();
  const cookieStore = await cookies();

  if (form.get("lang")) {
    cookieStore.set("lang", String(form.get("lang")), { httpOnly: true, sameSite: "lax", path: "/" });
  }

  if (form.get("unit")) {
    cookieStore.set("unit", String(form.get("unit")), { httpOnly: true, sameSite: "lax", path: "/" });
  }

  return Response.redirect(new URL("/", request.url), 303);
}
