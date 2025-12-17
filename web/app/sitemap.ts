import { client } from "@/src/sanity/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dli.yonsei.ac.kr";

  // Sanity에서 블로그 목록 가져오기
  const blogs = await client.fetch<
    {
      slug: string;
      lastModified?: string;
    }[]
  >(`
    *[_type == "blog" && defined(slug.current) && hidden != true]{
      "slug": slug.current,
      "lastModified": coalesce(publishedAt, _updatedAt, _createdAt)
    }
  `);

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/team`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/publications`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/apply`, lastModified: new Date(), priority: 0.8 },
  ];

  // 블로그 개별 페이지
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.lastModified ? new Date(blog.lastModified) : new Date(),
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}

