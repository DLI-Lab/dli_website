"use client";

import { useState } from "react";
import DemoCard from "@/components/DemoCard";
import DemoModal from "@/components/DemoModal";

export interface DemoItem {
  _id: string;
  title: string;
  venue?: string;
  year?: number;
  firstAuthor?: string;
  authorImage?: string;
  customThumbnail?: string;
  demoUrl: string;
  videoId: string;
}

interface DemoPageClientProps {
  demos: DemoItem[];
}

export default function DemoPageClient({ demos }: DemoPageClientProps) {
  const [selected, setSelected] = useState<DemoItem | null>(null);

  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        {demos.length === 0 ? (
          <p className="text-center text-gray-500">No demos available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {demos.map((demo) => (
              <DemoCard
                key={demo._id}
                title={demo.title}
                venue={demo.venue}
                year={demo.year}
                firstAuthor={demo.firstAuthor}
                authorImage={demo.authorImage}
                customThumbnail={demo.customThumbnail}
                videoId={demo.videoId}
                demoUrl={demo.demoUrl}
                onOpen={() => setSelected(demo)}
              />
            ))}
          </div>
        )}
      </section>

      {selected && (
        <DemoModal
          videoId={selected.videoId}
          title={selected.title}
          isOpen={true}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
