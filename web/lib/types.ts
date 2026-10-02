export type WebsiteSettings = {
  website_title?: string | null;
  logo?: string | null;
  logo_white?: string | null;
  favicon?: string | null;
  email?: string | null;
  email1?: string | null;
  phone?: string | null;
  phone1?: string | null;
  address1?: string | null;
  address2?: string | null;
  facebook_link?: string | null;
  insta_link?: string | null;
  linkedin_link?: string | null;
  youtube_link?: string | null;
  twitter_link?: string | null;
  whatsapp_link?: string | null;
};

export type Category = {
  id: number;
  parent_id: number;
  category_id: number;
  title: string | null;
  image?: string | null;
  slug: string | null;
};

export type City = {
  id: number;
  name: string | null;
  description?: string | null;
  address?: string | null;
  image?: string | null;
  slug: string | null;
};

export type Type = {
  id: number;
  name: string | null;
  slug: string | null;
};

export type Agent = {
  id: number;
  name: string | null;
  designation?: string | null;
  description?: string | null;
  locations?: string | null;
  image?: string | null;
  slug: string | null;
  phone?: string | null;
  facebook_link?: string | null;
  insta_link?: string | null;
  linkedin_link?: string | null;
  twitter_link?: string | null;
};

export type Property = {
  id: number;
  parent_id?: string | null;
  category_id?: string | null;
  subcategory_id?: string | null;
  title: string | null;
  price?: string | null;
  bedroom?: string | null;
  type_id?: string | null;
  description?: string | null;
  image?: string | null;
  area?: string | null;
  area_postfix?: string | null;
  bathrooms?: string | null;
  garage?: string | null;
  garage_area?: string | null;
  garage_postfix?: string | null;
  year_build?: string | null;
  property_id?: string | null;
  agent?: number | null;
  builder?: number | null;
  address?: string | null;
  location?: string | null;
  image2?: string | null;
  barcode_list_no?: string | null;
  barcode_list_link?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  slug: string | null;
  amenities?: string | null;
  status?: number | null;
  location_name?: string | null;
  category_title?: string | null;
  agent_name?: string | null;
  agent_image?: string | null;
  agent_slug?: string | null;
  agent_designation?: string | null;
};

export type Blog = {
  id: number;
  title: string | null;
  short_description?: string | null;
  description?: string | null;
  image?: string | null;
  slug: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  created_at?: string | Date | null;
};

export type Career = {
  id: number;
  title: string | null;
};

export type Faq = {
  id: number;
  title: string | null;
  description?: string | null;
};

export type HolidayHome = Property;
