"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";

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
  tags: string[];
};

export default function BlogsPageClient({ posts }: { posts: BlogPostForClient[] }) {
  const latestPost = posts[0];
  const otherPosts = useMemo(() => posts.slice(1), [posts]);

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
            <Link href={`/blogs/${latestPost.slug}`} className="group block text-left w-full">
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
                  {latestPost.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {latestPost.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {latestPost.tags.length > 3 && (
                        <span className="inline-block px-2.5 py-1 text-xs font-medium text-gray-500">
                          +{latestPost.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
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
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed line-clamp-4">
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
            </Link>
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
                  href={`/blogs/${post.slug}`}
                  tags={post.tags}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
