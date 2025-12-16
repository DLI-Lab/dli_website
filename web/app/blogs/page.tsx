import { draftMode } from "next/headers";
import BlogsPageClient, { BlogPostForClient } from "@/components/BlogsPageClient";
import { getClient } from "@/src/sanity/client";
import { blogsQuery } from "@/src/sanity/queries";

type SanityImage = {
  asset?: {
    url?: string;
  };
  caption?: string;
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
};

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

function normalizeBlog(post: SanityBlog): BlogPostForClient | null {
  if (!post.title) return null;

  const authorName = post.authorRef?.name || "Unknown";
  const authorHandle = post.authorRef?.handle;
  
  // 아바타 표시 로직:
  // 1. hideAuthorProfileImage가 true면 아바타 표시 안함
  // 2. authorAvatarOverride가 있으면 덮어쓰기 이미지 사용
  // 3. 그 외에는 팀 멤버 이미지 사용
  let authorAvatar: string | undefined;
  if (!post.hideAuthorProfileImage) {
    authorAvatar = post.authorAvatarOverride?.asset?.url || post.authorRef?.image?.asset?.url;
  }

  return {
    id: post._id,
    slug: post.slug || "",
    title: post.title,
    description: post.excerpt || "",
    date: formatDate(post.publishedAt),
    category: post.category || "Blog",
    author: authorName,
    authorHandle,
    authorAvatar,
    readingTime: post.readingTime,
    heroImage: post.heroImage?.asset?.url,
    heroImageCaption: post.heroImage?.caption,
    thumbnail: post.thumbnail?.asset?.url,
    body: post.body || [],
  };
}

export default async function BlogsPage() {
  const draft = await draftMode();
  const client = getClient(draft.isEnabled);
  const sanityPosts = await client.fetch<SanityBlog[]>(blogsQuery);
  const posts = sanityPosts
    .map((post) => normalizeBlog(post))
    .filter((post): post is BlogPostForClient => Boolean(post));

  return <BlogsPageClient posts={posts} />;
}

