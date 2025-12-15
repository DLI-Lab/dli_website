/* Gallery card with simple carousel */
"use client";

import { useState } from "react";

export interface GalleryCardProps {
  images: string[];
  title?: string;
  tag?: string;
  description?: string;
}

// 태그 색상 배열 - 서로 다른 태그는 다른 색으로 표시
const TAG_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-yellow-100", text: "text-yellow-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-red-100", text: "text-red-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
];

// 태그 문자열을 해시하여 일관된 색상 할당
function getTagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % TAG_COLORS.length;
  return TAG_COLORS[index];
}

export default function GalleryCard({
  images,
  title = "EMNLP 2025",
  tag,
  description = "Exploring highlights from our recent work and collaborations.",
}: GalleryCardProps) {
  const [index, setIndex] = useState(0);
  const total = images.length || 1;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const current = images[index] || "/placeholder.png";
  const tagColor = tag ? getTagColor(tag) : null;

  return (
    <div className="group rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative w-full h-56 lg:h-60 bg-gray-100 overflow-hidden">
        <img
          src={current}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 text-gray-700 hover:text-gray-900 shadow px-2 py-1 transition-colors z-10"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 text-gray-700 hover:text-gray-900 shadow px-2 py-1 transition-colors z-10"
            >
              ›
            </button>
          </>
        )}
        <div className="absolute bottom-3 right-4 bg-white/85 text-gray-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
          {index + 1} / {total}
        </div>
      </div>
      <div className="p-3 lg:p-4 space-y-2">
        <h3 className="text-base lg:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        {tag && tagColor && (
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-block rounded-lg px-2.5 py-1 text-xs font-medium ${tagColor.bg} ${tagColor.text}`}
            >
              {tag}
            </span>
          </div>
        )}
        {description && (
          <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}

