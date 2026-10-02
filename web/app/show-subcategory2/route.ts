import { select } from "@/lib/db";

export async function POST(request: Request) {
  const form = await request.formData();
  const categoryIds = form.getAll("category_id").map((value) => Number(value)).filter(Boolean);

  if (!categoryIds.length) {
    return new Response("", { headers: { "Content-Type": "text/html" } });
  }

  const placeholders = categoryIds.map(() => "?").join(",");
  const rows = await select<Array<{ id: number; title: string; parent_id: number }>>(
    `SELECT id, title, parent_id
     FROM categories
     WHERE category_id = 0 AND parent_id IN (${placeholders}) AND deleted_at IS NULL
     ORDER BY sorting ASC`,
    categoryIds,
  );

  const html = rows.map((row) => `<option value="${row.id}">${row.title}</option>`).join("");
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
