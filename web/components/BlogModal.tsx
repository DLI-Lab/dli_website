"use client";

import { ReactNode, useEffect } from "react";

export interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  date: string;
  author: string;
  authorHandle?: string;
  authorAvatar?: string;
  readingTime?: string;
  category?: string;
  heroImage?: string;
   heroImageCaption?: string;
  content: ReactNode;
}

/**
 * 블로그 본문을 모달로 보여주는 컴포넌트
 * - 단일 흐름 읽기 중심
 * - 강한 타이틀, 메타, 대표 이미지, 본문/코드 블록 대비
 */
export default function BlogModal({
  isOpen,
  onClose,
  title,
  date,
  author,
  authorHandle,
  authorAvatar,
  readingTime,
  category,
  heroImage,
  heroImageCaption,
  content,
}: BlogModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 py-10 overflow-y-auto"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          aria-label="모달 닫기"
          className="absolute right-4 top-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 shadow hover:shadow-md border border-gray-200 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-all"
        >
          ×
        </button>

        <div className="p-6 lg:p-8 space-y-6">
          {/* 타이틀 + 메타 */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide">{category || "Blog"}</p>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900">{title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-base text-gray-600">
              {authorAvatar ? (
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 ring-1 ring-gray-100">
                  <img src={authorAvatar} alt={author} className="w-full h-full object-cover" />
                </div>
              ) : null}
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">
                  {author}
                  {authorHandle ? <span className="ml-1.5 text-base font-normal text-gray-500">{authorHandle}</span> : null}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{date}</span>
                  {readingTime ? (
                    <>
                      <span className="text-gray-300">•</span>
                      <span>{readingTime}</span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* 대표 이미지 - 항상 가로 중앙 정렬 */}
          {heroImage && (
            <div className="w-full flex justify-center">
              <figure className="w-full">
                <div className="w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm mx-auto">
                  <img
                    src={heroImage}
                    alt={heroImageCaption || title}
                    className="w-full max-h-[400px] object-cover"
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
          <article className="prose prose-lg blog-prose max-w-3xl mx-auto text-gray-800">
            {content}
          </article>
        </div>
      </div>
    </div>
  );
}

