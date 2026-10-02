import { select } from "@/lib/db";

export async function POST(request: Request) {
  const form = await request.formData();
  const keyword = String(form.get("keyword") || "").trim();

  if (!keyword) {
    return Response.json([]);
  }

  const rows = await select<Array<{ id: number; name: string }>>(
    `SELECT id, name
     FROM cities
     WHERE name LIKE ? AND status = 1
     ORDER BY sorting = 0, sorting ASC
     LIMIT 6`,
    [`%${keyword}%`],
  );

  return Response.json(rows);
}
