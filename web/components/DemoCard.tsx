"use client";

import { useState } from "react";

export interface DemoCardProps {
  title: string;
  venue?: string;
  year?: number;
  firstAuthor?: string;
  authorImage?: string;
  customThumbnail?: string;
  videoId: string;
  demoUrl: string;
  paperUrl?: string;
  codeUrl?: string;
  onOpen: () => void;
}

export default function DemoCard({
  title,
  venue,
  year,
  firstAuthor,
  authorImage,
  customThumbnail,
  videoId,
  demoUrl,
  paperUrl,
  codeUrl,
  onOpen,
}: DemoCardProps) {
  const ytMax = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const ytHq = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  // Fallback chain: customThumbnail → YouTube maxres → YouTube hq
  const [thumbnail, setThumbnail] = useState(customThumbnail || ytMax);

  const fallback = () => {
    if (thumbnail === customThumbnail) setThumbnail(ytMax);
    else if (thumbnail === ytMax) setThumbnail(ytHq);
  };

  const venueLabel = [venue, year].filter(Boolean).join(" ");

  return (
    <div
      onClick={onOpen}
      className="group cursor-pointer rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          onError={fallback}
          onLoad={(e) => {
            // YouTube returns a 120x90 gray placeholder when maxresdefault is missing
            if (e.currentTarget.naturalWidth <= 120) fallback();
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-rose-600 translate-x-0.5"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* External link (opens YouTube in new tab) */}
        <a
          href={demoUrl}
          target="_blank"
          rel="noreferrer noopener"
          onClick={(e) => e.stopPropagation()}
          aria-label="Open on YouTube in new tab"
          className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-gray-700 hover:text-rose-600 shadow-sm transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden
          >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        </a>
      </div>

      <div className="p-3 lg:p-4 space-y-2">
        <h3 className="text-base lg:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
          {title}
        </h3>
        {(venueLabel || paperUrl || codeUrl) && (
          <div className="flex items-center justify-between gap-2">
            {venueLabel ? (
              <span className="text-xs lg:text-sm font-semibold text-green-700">{venueLabel}</span>
            ) : (
              <span />
            )}
            {(paperUrl || codeUrl) && (
              <div className="flex items-center gap-1.5">
                {paperUrl && (
                  <a
                    href={paperUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-colors"
                  >
                    paper
                  </a>
                )}
                {codeUrl && (
                  <a
                    href={codeUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-semibold text-violet-700 hover:bg-violet-100 hover:border-violet-300 transition-colors"
                  >
                    code
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {firstAuthor && (
          <div className="flex items-center gap-2.5 pt-1">
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {authorImage ? (
                <img
                  src={authorImage}
                  alt={firstAuthor}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
            <span className="text-sm lg:text-base font-semibold text-gray-900 truncate">
              {firstAuthor}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
