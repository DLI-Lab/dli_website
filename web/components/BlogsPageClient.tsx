"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import BlogCard from "@/components/BlogCard";
import BlogModal from "@/components/BlogModal";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/src/sanity/client";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export type BlogPostForClient = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  authorHandle?: string;
  authorAvatar?: string;
  readingTime?: string;
  heroImage?: string;
  heroImageCaption?: string;
  thumbnail?: string;
  body: any[];
};

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
    normal: ({ children, value }) => {
      // 텍스트가 '---' 한 줄만 있는 경우 수평선으로 렌더링
      const isHorizontalRule =
        Array.isArray((value as any)?.children) &&
        (value as any).children.length === 1 &&
        typeof (value as any).children[0]?.text === "string" &&
        (value as any).children[0].text.trim() === "---";

      if (isHorizontalRule) {
        return <hr className="my-8 border-t border-gray-200" />;
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

      // Use urlFor to generate the URL with hotspot/crop applied
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

export default function BlogsPageClient({ posts }: { posts: BlogPostForClient[] }) {
  const searchParams = useSearchParams();
  const [selectedPost, setSelectedPost] = useState<BlogPostForClient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check for slug in URL query params on mount/update
  useEffect(() => {
    const slug = searchParams.get("slug");
    if (slug && posts.length > 0) {
      const post = posts.find((p) => p.slug === slug);
      if (post) {
        setSelectedPost(post);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, posts]);

  const latestPost = posts[0];
  const otherPosts = useMemo(() => posts.slice(1), [posts]);

  const openPost = (post: BlogPostForClient) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closePost = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  if (!posts.length) {
    return (
      <main className="bg-white">
        <section className="bg-slate-50 py-10 lg:py-12 border-b border-gray-200">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Blogs
            </h1>
            <p className="mt-4 text-gray-600">No blog posts yet.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="bg-slate-50 py-10 lg:py-12 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Blogs
          </h1>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="space-y-10">
          {latestPost && (
            <button onClick={() => openPost(latestPost)} className="group block text-left w-full">
              <article className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-5 lg:p-6 rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="w-full lg:w-[420px] flex-shrink-0">
                  <figure className="w-full">
                    <div className="w-full h-64 sm:h-72 lg:h-60 overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={latestPost.thumbnail || latestPost.heroImage || "/placeholder.png"}
                        alt={latestPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </figure>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                        {latestPost.category}
                      </span>
                      <span className="text-sm text-gray-500">{latestPost.date}</span>
                      {latestPost.readingTime && (
                        <span className="text-sm text-gray-500">• {latestPost.readingTime}</span>
                      )}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {latestPost.title}
                    </h2>
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                      {latestPost.description || "No description available."}
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {latestPost.authorAvatar ? (
                          <img
                            src={latestPost.authorAvatar}
                            alt={latestPost.author}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{latestPost.author}</span>
                    </div>
                  </div>
                </div>
              </article>
            </button>
          )}

          {otherPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {otherPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  category={post.category}
                  title={post.title}
                  description={post.description}
                  author={post.author}
                  authorAvatar={post.authorAvatar}
                  date={post.date}
                  thumbnail={post.thumbnail || post.heroImage}
                  onClick={() => openPost(post)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedPost && (
        <BlogModal
          isOpen={isModalOpen}
          onClose={closePost}
          title={selectedPost.title}
          date={selectedPost.date}
          author={selectedPost.author}
          authorHandle={selectedPost.authorHandle}
          authorAvatar={selectedPost.authorAvatar}
          readingTime={selectedPost.readingTime}
          category={selectedPost.category}
          heroImage={selectedPost.heroImage || selectedPost.thumbnail}
          heroImageCaption={selectedPost.heroImageCaption}
          content={<PortableText value={selectedPost.body || []} components={portableTextComponents} />}
        />
      )}
    </main>
  );
}
