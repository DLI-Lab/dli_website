import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getClient } from "@/src/sanity/client";
import { blogBySlugQuery } from "@/src/sanity/queries";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/src/sanity/client";
import Link from "next/link";
import type { Metadata } from "next";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

type SanityImage = {
  asset?: {
    url?: string;
    _ref?: string;
  };
  caption?: string;
  alt?: string;
};

type SanityBlog = {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  category?: string;
  readingTime?: string;
  authorRef?: {
    _id?: string;
    name?: string;
    handle?: string;
    image?: SanityImage;
  };
  hideAuthorProfileImage?: boolean;
  authorAvatarOverride?: SanityImage;
  heroImage?: SanityImage;
  thumbnail?: SanityImage;
  body?: any[];
  tags?: string | string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string; // 콤마로 구분된 키워드
    openGraphImage?: {
      asset?: {
        url?: string;
      };
    };
  };
};

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

function normalizeKeywordsFromSeo(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((k) => k.trim())
    .map((k) => (k.startsWith("#") ? k.slice(1) : k))
    .filter(Boolean);
}

function normalizeKeywordsFromTags(tags?: string | string[]): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) {
    return tags
      .map((k) => k.trim())
      .map((k) => (k.startsWith("#") ? k.slice(1) : k))
      .filter(Boolean);
  }
  return tags
    .split(",")
    .map((k) => k.trim())
    .map((k) => (k.startsWith("#") ? k.slice(1) : k))
    .filter(Boolean);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(false);
  const post = await client.fetch<SanityBlog | null>(blogBySlugQuery, { slug });

  if (!post || !post.title) {
    return {};
  }

  // 1) 제목: seo.metaTitle > title
  const title = post.seo?.metaTitle?.trim() || post.title.trim();

  // 2) 설명: seo.metaDescription > excerpt > body 첫 문단
  let description = post.seo?.metaDescription?.trim() || post.excerpt?.trim() || "";

  if (!description && Array.isArray(post.body)) {
    const firstBlock = post.body.find(
      (b: any) => b._type === "block" && Array.isArray(b.children)
    );
    const firstText = firstBlock?.children?.map((c: any) => c.text).join(" ");
    if (firstText) {
      description = firstText.slice(0, 160);
    }
  }

  // 3) 키워드: seo.keywords(콤마, #허용) > tags(콤마 or 배열, #허용)
  let keywords: string[] | undefined;

  const seoKeywords = normalizeKeywordsFromSeo(post.seo?.keywords);
  const tagKeywords = normalizeKeywordsFromTags(post.tags);

  if (seoKeywords.length > 0) {
    keywords = seoKeywords;
  } else if (tagKeywords.length > 0) {
    keywords = tagKeywords;
  }

  // 4) OG 이미지: seo.openGraphImage > heroImage > thumbnail > (없으면 layout 기본값 사용)
  const ogFromSeo = post.seo?.openGraphImage?.asset?.url;
  const ogFromHero = post.heroImage?.asset?.url;
  const ogFromThumb = post.thumbnail?.asset?.url;

  const ogImage = ogFromSeo || ogFromHero || ogFromThumb;

  return {
    title,
    description: description || undefined,
    keywords,
    openGraph: {
      title,
      description: description || undefined,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
  };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-12 mb-5 text-3xl font-bold text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-semibold text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-gray-900">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-gray-900">{children}</h4>
    ),
    normal: ({ children, value }) => {
      const isHorizontalRule =
        Array.isArray((value as any)?.children) &&
        (value as any).children.length === 1 &&
        typeof (value as any).children[0]?.text === "string" &&
        (value as any).children[0].text.trim() === "---";

      if (isHorizontalRule) {
        return <hr className="my-8 border-t border-gray-200" />;
      }

      const textContent = (value as any)?.children?.[0]?.text;
      if (typeof textContent === "string") {
        if (textContent.startsWith("# ")) {
          let content = children;
          if (Array.isArray(children) && typeof children[0] === "string") {
            content = [children[0].replace(/^#\s+/, ""), ...children.slice(1)];
          } else if (typeof children === "string") {
            content = children.replace(/^#\s+/, "");
          }
          return <h1 className="mt-12 mb-5 text-3xl font-bold text-gray-900">{content}</h1>;
        }
        if (textContent.startsWith("## ")) {
          let content = children;
          if (Array.isArray(children) && typeof children[0] === "string") {
            content = [children[0].replace(/^##\s+/, ""), ...children.slice(1)];
          } else if (typeof children === "string") {
            content = children.replace(/^##\s+/, "");
          }
          return <h2 className="mt-10 mb-4 text-2xl font-semibold text-gray-900">{content}</h2>;
        }
        if (textContent.startsWith("### ")) {
          let content = children;
          if (Array.isArray(children) && typeof children[0] === "string") {
            content = [children[0].replace(/^###\s+/, ""), ...children.slice(1)];
          } else if (typeof children === "string") {
            content = children.replace(/^###\s+/, "");
          }
          return <h3 className="mt-8 mb-3 text-xl font-semibold text-gray-900">{content}</h3>;
        }
      }

      return <p className="leading-[2] mb-6 text-gray-800">{children}</p>;
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sky-200 pl-4 text-gray-700 leading-[1.9] my-6 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 my-5 leading-[1.9] marker:text-gray-500">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 my-5 leading-[1.9] marker:text-gray-500">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noreferrer noopener" : undefined}
        className="text-blue-600 underline underline-offset-4 hover:text-blue-800"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded-md text-sm font-mono">{children}</code>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref && !value?.asset?.url) return null;

      const imageUrl = value.asset?._ref ? urlFor(value).url() : value.asset?.url;

      if (!imageUrl) return null;

      return (
        <div className="w-full flex justify-center my-8">
          <figure className="w-full">
            <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm mx-auto">
              <img
                src={imageUrl}
                alt={value.alt || value.caption || ""}
                className="w-full max-h-[400px] object-cover"
              />
            </div>
            {(value.caption || value.alt) && (
              <figcaption className="mt-2 text-sm text-gray-600 text-center">
                {value.caption || value.alt}
              </figcaption>
            )}
          </figure>
        </div>
      );
    },
    code: ({ value }) => (
      <pre className="rounded-xl bg-slate-900 text-slate-100 p-5 text-sm leading-[1.8] overflow-x-auto shadow-inner my-6">
        <code>{value?.code}</code>
      </pre>
    ),
  },
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const draft = await draftMode();
  const sanityClient = getClient(draft.isEnabled);
  const post = await sanityClient.fetch<SanityBlog | null>(blogBySlugQuery, { slug });

  if (!post || !post.title) {
    notFound();
  }

  const authorName = post.authorRef?.name || "Unknown";
  const authorHandle = post.authorRef?.handle;
  
  let authorAvatar: string | undefined;
  if (!post.hideAuthorProfileImage) {
    authorAvatar = post.authorAvatarOverride?.asset?.url || post.authorRef?.image?.asset?.url;
  }

  const date = formatDate(post.publishedAt);
  const category = post.category || "Blog";
  const heroImage = post.heroImage?.asset?.url;
  const heroImageCaption = post.heroImage?.caption;
  const tags = normalizeKeywordsFromTags(post.tags);

  return (
    <main className="bg-white min-h-screen">
      {/* 상단 네비게이션 */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Blogs</span>
        </Link>
      </div>

      {/* 블로그 본문 */}
      <article className="max-w-4xl mx-auto px-6 lg:px-8 py-10">
        <div className="space-y-6">
          {/* 타이틀 + 메타 */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide">{category}</p>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900">{post.title}</h1>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-4 text-base text-gray-600">
              {authorAvatar ? (
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 ring-1 ring-gray-100">
                  <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
                </div>
              ) : null}
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">
                  {authorName}
                  {authorHandle ? <span className="ml-1.5 text-base font-normal text-gray-500">{authorHandle}</span> : null}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{date}</span>
                  {post.readingTime ? (
                    <>
                      <span className="text-gray-300">•</span>
                      <span>{post.readingTime}</span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* 대표 이미지 */}
          {heroImage && (
            <div className="w-full flex justify-center">
              <figure className="w-full">
                <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm mx-auto">
                  <img
                    src={heroImage}
                    alt={heroImageCaption || post.title}
                    className="w-full max-h-[500px] object-cover"
                  />
                </div>
                {heroImageCaption && (
                  <figcaption className="mt-2 text-sm text-gray-600 text-center">
                    {heroImageCaption}
                  </figcaption>
                )}
              </figure>
            </div>
          )}

          {/* 본문 */}
          <div className="prose prose-lg blog-prose max-w-none text-gray-800">
            <PortableText value={post.body || []} components={portableTextComponents} />
          </div>
        </div>
      </article>
    </main>
  );
}
