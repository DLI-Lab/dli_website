import { defineQuery } from "next-sanity";
import { client } from "./client";

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    title,
    description,
    keywords,
    "openGraphImage": openGraphImage.asset->url
  }
`);

export const pageMetaQuery = defineQuery(`
  *[_type == "pageMeta" && path == $path][0]{
    seo {
      metaTitle,
      metaDescription,
      keywords,
      "openGraphImage": openGraphImage.asset->url
    }
  }
`);

export interface SiteSettings {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraphImage?: string;
}

export interface PageMeta {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string; // Changed from string[] to string
    openGraphImage?: string;
  };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return await client.fetch(siteSettingsQuery);
}

export async function getPageMeta(path: string): Promise<PageMeta | null> {
  return await client.fetch(pageMetaQuery, { path });
}
