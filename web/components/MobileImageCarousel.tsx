"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileImageCarouselProps {
  images: { src: string; alt: string }[];
}

export default function MobileImageCarousel({ images }: MobileImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentIndex(newIndex);
  };

  const goTo = (index: number) => {
    containerRef.current?.scrollTo({
      left: index * (containerRef.current?.clientWidth || 0),
      behavior: "smooth",
    });
  };

  const goPrev = () => {
    if (currentIndex > 0) goTo(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex < images.length - 1) goTo(currentIndex + 1);
  };

  return (
    <div className="w-full">
      {/* 이미지 컨테이너 */}
      <div className="relative">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full h-140 overflow-x-auto snap-x snap-mandatory flex rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.08)] ring-1 ring-black/5 bg-gray-100"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 snap-center"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* 좌측 화살표 */}
        {currentIndex > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-opacity"
            aria-label="이전 이미지"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* 우측 화살표 */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-opacity"
            aria-label="다음 이미지"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* 점 인디케이터 */}
      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index
                ? "bg-gray-800"
                : "bg-gray-300"
            }`}
            aria-label={`이미지 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}

