"use client";

import { useState, useMemo } from "react";
import GalleryCard from "@/components/GalleryCard";
import GalleryModal from "@/components/GalleryModal";

interface GalleryImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
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

interface GalleryPageClientProps {
  galleries: Gallery[];
}

// "August 10, 2024" 형식의 날짜를 Date 객체로 파싱
function parseGalleryDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  
  // "August 10, 2024" 또는 "August 2024" 형식 처리
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  
  // 파싱 실패 시 기본값
  return new Date(0);
}

export default function GalleryPageClient({ galleries }: GalleryPageClientProps) {
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGalleryClick = (gallery: Gallery, imageIndex: number = 0) => {
    setSelectedGallery(gallery);
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGallery(null);
  };

  // 날짜순 정렬 (최신순) 후 이미지 URL 처리
  const processedGalleries = useMemo(() => {
    return [...galleries]
      .sort((a, b) => {
        const dateA = parseGalleryDate(a.date);
        const dateB = parseGalleryDate(b.date);
        return dateB.getTime() - dateA.getTime(); // 최신순 (내림차순)
      })
      .map((gallery) => ({
        ...gallery,
        imageUrls: gallery.images
          .filter((img) => img.asset?.url)
          .map((img) => img.asset.url),
      }));
  }, [galleries]);

  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {processedGalleries.map((gallery) => (
            <div
              key={gallery._id}
              onClick={() => handleGalleryClick(gallery, 0)}
              className="cursor-pointer"
            >
              <GalleryCard
                images={gallery.imageUrls}
                title={gallery.title}
                tag={gallery.tag}
                description={gallery.info}
              />
            </div>
          ))}
        </div>
      </section>

      {selectedGallery && (
        <GalleryModal
          gallery={selectedGallery}
          initialIndex={selectedImageIndex}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
