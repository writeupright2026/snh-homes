import { select } from "./db";
import type {
  Agent,
  Blog,
  Career,
  Category,
  City,
  Faq,
  HolidayHome,
  Property,
  Type,
  WebsiteSettings,
} from "./types";

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  const rows = await select<WebsiteSettings[]>(
    "SELECT * FROM website_settings ORDER BY id ASC LIMIT 1",
  );

  return rows[0] || {};
}

export async function getCategories(parentId?: number) {
  const values = parentId === undefined ? [] : [parentId];
  const where = parentId === undefined ? "parent_id = 0" : "parent_id = ?";

  return select<Category[]>(
    `SELECT id, parent_id, category_id, title, image, slug
     FROM categories
     WHERE ${where} AND status = 1 AND deleted_at IS NULL
     ORDER BY sorting = 0, sorting ASC, id ASC`,
    values,
  );
}

export async function getCategory(slug: string) {
  const rows = await select<Category[]>(
    `SELECT id, parent_id, category_id, title, image, slug
     FROM categories
     WHERE slug = ? AND status = 1 AND deleted_at IS NULL
     LIMIT 1`,
    [slug],
  );

  return rows[0] || null;
}

export async function getCities() {
  return select<City[]>(
    `SELECT id, name, image, slug
     FROM cities
     WHERE status = 1
     ORDER BY sorting = 0, sorting ASC, id ASC`,
  );
}

export async function getTypes() {
  return select<Type[]>(
    `SELECT id, name, slug
     FROM types
     WHERE status = 1
     ORDER BY sorting = 0, sorting ASC, id ASC`,
  );
}

function propertySelect(table: "projects" | "holiday_homes") {
  return `SELECT p.*,
    c.name AS location_name,
    cat.title AS category_title,
    a.name AS agent_name,
    a.image AS agent_image,
    a.slug AS agent_slug,
    a.designation AS agent_designation
    FROM ${table} p
    LEFT JOIN cities c ON c.id = p.location
    LEFT JOIN categories cat ON FIND_IN_SET(cat.id, p.category_id) AND cat.deleted_at IS NULL
    LEFT JOIN testimonials a ON a.id = p.agent`;
}

export type PropertyFilters = {
  maincategory?: string;
  category?: string;
  subcategory?: string;
  type?: string;
  agent?: string;
  builder?: string;
  locations?: string[];
  bedrooms?: string[];
  bathrooms?: string[];
  minPrice?: string;
  maxPrice?: string;
};

export async function getProperties(filters: PropertyFilters = {}) {
  const where = ["p.status = 1"];
  const values: Array<string | number> = [];

  if (filters.locations?.length) {
    where.push(`p.location IN (${filters.locations.map(() => "?").join(",")})`);
    values.push(...filters.locations);
  }

  if (filters.bedrooms?.length) {
    where.push(`p.bedroom IN (${filters.bedrooms.map(() => "?").join(",")})`);
    values.push(...filters.bedrooms);
  }

  if (filters.bathrooms?.length) {
    where.push(`p.bathrooms IN (${filters.bathrooms.map(() => "?").join(",")})`);
    values.push(...filters.bathrooms);
  }

  const categoryLookups: Array<[keyof PropertyFilters, string]> = [
    ["maincategory", "p.parent_id"],
    ["category", "p.category_id"],
    ["subcategory", "p.subcategory_id"],
  ];

  for (const [filter, column] of categoryLookups) {
    const value = filters[filter] as string | undefined;
    if (value) {
      where.push(`FIND_IN_SET(?, ${column})`);
      values.push(await categoryId(value));
    }
  }

  if (filters.type) {
    where.push("p.type_id = (SELECT id FROM types WHERE slug = ? LIMIT 1)");
    values.push(filters.type);
  }

  if (filters.agent) {
    where.push("p.agent = (SELECT id FROM testimonials WHERE slug = ? LIMIT 1)");
    values.push(filters.agent);
  }

  if (filters.builder) {
    where.push("p.builder = (SELECT id FROM brands WHERE slug = ? LIMIT 1)");
    values.push(filters.builder);
  }

  if (filters.minPrice) {
    where.push("CAST(p.price AS DECIMAL(12,2)) >= ?");
    values.push(filters.minPrice);
  }

  if (filters.maxPrice) {
    where.push("CAST(p.price AS DECIMAL(12,2)) <= ?");
    values.push(filters.maxPrice);
  }

  return select<Property[]>(
    `${propertySelect("projects")}
     WHERE ${where.join(" AND ")}
     ORDER BY p.id DESC`,
    values,
  );
}

export async function getProperty(slug: string) {
  const rows = await select<Property[]>(
    `${propertySelect("projects")} WHERE p.slug = ? LIMIT 1`,
    [slug],
  );

  return rows[0] || null;
}

export async function getAmenities(ids: string | null | undefined) {
  const amenityIds = (ids || "")
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isInteger(value) && value > 0);

  if (!amenityIds.length) {
    return { indoor: [], outdoor: [] };
  }

  const placeholders = amenityIds.map(() => "?").join(",");
  const rows = await select<Array<{ name: string; type: number }>>(
    `SELECT name, type
     FROM amenities
     WHERE status = 1 AND id IN (${placeholders})
     ORDER BY name ASC`,
    amenityIds,
  );

  return {
    indoor: rows.filter((row) => row.type === 0).map((row) => row.name),
    outdoor: rows.filter((row) => row.type === 1).map((row) => row.name),
  };
}

export async function getPropertyImages(projectId: number) {
  return select<Array<{ image: string }>>(
    "SELECT image FROM property_images WHERE project_id = ? ORDER BY id DESC",
    [projectId],
  );
}

export async function getRecentProperties(price: string | null, slug: string) {
  if (!price) {
    return [];
  }

  return select<Property[]>(
    `${propertySelect("projects")}
     WHERE p.slug <> ? AND p.price = ?
     ORDER BY p.id DESC LIMIT 4`,
    [slug, price],
  );
}

export async function getHolidayHomes() {
  return select<HolidayHome[]>(
    `${propertySelect("holiday_homes")}
     WHERE p.status = 1
     ORDER BY p.id DESC`,
  );
}

export async function getHolidayHome(slug: string) {
  const rows = await select<HolidayHome[]>(
    `${propertySelect("holiday_homes")} WHERE p.slug = ? LIMIT 1`,
    [slug],
  );

  return rows[0] || null;
}

export async function getBlogs() {
  return select<Blog[]>(
    `SELECT id, title, short_description, description, image, slug,
      meta_title, meta_description, meta_keywords, created_at
     FROM blogs
     WHERE status = 1
     ORDER BY id DESC`,
  );
}

export async function getBlog(slug: string) {
  const rows = await select<Blog[]>(
    `SELECT id, title, short_description, description, image, slug,
      meta_title, meta_description, meta_keywords, created_at
     FROM blogs
     WHERE status = 1 AND slug = ?
     LIMIT 1`,
    [slug],
  );

  return rows[0] || null;
}

export async function getAgents() {
  return select<Agent[]>(
    `SELECT id, name, designation, description, locations, image, slug,
      phone, facebook_link, insta_link, linkedin_link, twitter_link
     FROM testimonials
     WHERE status = 1
     ORDER BY sorting = 0, sorting ASC, id ASC`,
  );
}

export async function getAgent(slug: string) {
  const rows = await select<Agent[]>(
    `SELECT id, name, designation, description, locations, image, slug,
      phone, facebook_link, insta_link, linkedin_link, twitter_link
     FROM testimonials
     WHERE status = 1 AND slug = ?
     LIMIT 1`,
    [slug],
  );

  return rows[0] || null;
}

export async function getFaqs() {
  return select<Faq[]>(
    `SELECT id, title, description
     FROM faqs
     WHERE status = 1
     ORDER BY id DESC`,
  );
}

export async function getCareers() {
  return select<Career[]>(
    `SELECT id, title FROM careers WHERE status = 1 ORDER BY id DESC`,
  );
}

export async function getCareer(id: string) {
  const rows = await select<Career[]>(
    "SELECT id, title, description, type, department, location, salary, education FROM careers WHERE id = ? LIMIT 1",
    [id],
  );

  return rows[0] || null;
}

export async function getCity(slug: string) {
  const rows = await select<City[]>(
    `SELECT id, name, description, address, image, slug
     FROM cities
     WHERE status = 1 AND slug = ?
     LIMIT 1`,
    [slug],
  );

  return rows[0] || null;
}

export async function getNews() {
  return select<Blog[]>(
    `SELECT id, title, short_desc AS short_description, description, image, slug,
      meta_title, meta_description, meta_keywords, created_at
     FROM news
     WHERE status = 1
     ORDER BY id DESC`,
  );
}

export async function getEvents() {
  return select<Blog[]>(
    `SELECT id, title, short_desc AS short_description, description, image, slug,
      meta_title, meta_description, meta_keywords, created_at
     FROM events
     WHERE status = 1
     ORDER BY id DESC`,
  );
}

export async function getNewsItem(slug: string, table: "news" | "events") {
  const rows = await select<Blog[]>(
    `SELECT id, title, short_desc AS short_description, description, image, slug,
      meta_title, meta_description, meta_keywords, created_at
     FROM ${table}
     WHERE status = 1 AND slug = ?
     LIMIT 1`,
    [slug],
  );

  return rows[0] || null;
}

async function categoryId(slug: string) {
  const rows = await select<Array<{ id: number }>>(
    "SELECT id FROM categories WHERE slug = ? LIMIT 1",
    [slug],
  );

  return rows[0]?.id || 0;
}
