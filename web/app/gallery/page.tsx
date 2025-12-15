import GalleryPageClient from "@/components/GalleryPageClient";
import { client } from "@/src/sanity/client";
import { galleriesQuery } from "@/src/sanity/queries";

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

export default async function GalleryPage() {
  const galleries = await client.fetch<Gallery[]>(galleriesQuery);
  
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 py-10 lg:py-12 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Gallery</h1>
        </div>
      </section>

      <GalleryPageClient galleries={galleries} />
    </main>
  );
}
