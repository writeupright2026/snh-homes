import { select } from "@/lib/db";

export async function POST(request: Request) {
  const form = await request.formData();
  const categoryId = Number(form.get("category_id") || 0);

  if (!categoryId) {
    return Response.json([]);
  }

  const rows = await select<Array<{ id: number; title: string }>>(
    `SELECT id, title
     FROM categories
     WHERE category_id = ? AND parent_id <> 0 AND deleted_at IS NULL
     ORDER BY sorting = 0, sorting ASC`,
    [categoryId],
  );

  return Response.json(rows);
}
