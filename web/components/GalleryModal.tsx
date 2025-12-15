"use client";

import { useState, useEffect } from "react";

interface GalleryImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
}

interface GalleryVideo {
  asset: {
    _id: string;
    url: string;
    mimeType: string;
    size: number;
  };
}

interface Gallery {
  _id: string;
  title: string;
  date: string;
  tag?: string;
  info?: string;
  location?: string;
  images: GalleryImage[];
  videos: GalleryVideo[];
}

interface GalleryModalProps {
  gallery: Gallery;
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryModal({
  gallery,
  initialIndex = 0,
  isOpen,
  onClose,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, gallery._id]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const imageUrls = (gallery.images || [])
    .filter((img) => img.asset?.url)
    .map((img) => img.asset.url);

  const videoUrls = (gallery.videos || [])
    .filter((video) => video.asset?.url)
    .map((video) => video.asset.url);

  const allMedia = [...imageUrls, ...videoUrls];
  const currentMedia = allMedia[currentIndex];
  const isVideo = currentIndex >= imageUrls.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4 my-8 bg-white rounded-lg overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
          aria-label="Close modal"
        >
          <span className="text-2xl text-gray-700">×</span>
        </button>

        {/* Main Image/Video Section */}
        <div className="relative flex-1 bg-gray-100 overflow-hidden">
          {allMedia.length > 0 ? (
            <>
              {isVideo ? (
                <video
                  src={currentMedia}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={currentMedia}
                  alt={gallery.title}
                  className="w-full h-full object-contain"
                />
              )}

              {/* Navigation Arrows */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors z-10"
                    aria-label="Previous"
                  >
                    <span className="text-2xl text-gray-700">‹</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors z-10"
                    aria-label="Next"
                  >
                    <span className="text-2xl text-gray-700">›</span>
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allMedia.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-white/90 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full shadow-lg">
                  {currentIndex + 1} / {allMedia.length}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No images available
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-shrink-0 overflow-y-auto max-h-[40vh]">
          <div className="p-6 lg:p-8 space-y-4">
            {/* Title and Date */}
            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {gallery.title}
              </h2>
              <p className="text-sm text-gray-500">{gallery.date}</p>
            </div>

            {/* Description */}
            {gallery.info && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                  Description
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {gallery.info}
                </p>
              </div>
            )}

            {/* Location */}
            {gallery.location && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Location: </span>
                {gallery.location}
              </div>
            )}

            {/* Thumbnails */}
            {allMedia.length > 1 && (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                  Images
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allMedia.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleThumbnailClick(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentIndex === idx
                          ? "border-emerald-500 ring-2 ring-emerald-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {idx >= imageUrls.length ? (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-xs text-gray-500">Video</span>
                        </div>
                      ) : (
                        <img
                          src={url}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
