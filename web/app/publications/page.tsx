import PublicationCard, { PublicationCardProps } from "@/components/PublicationCard";
import { client } from "@/src/sanity/client";
import { publicationsQuery } from "@/src/sanity/queries";

interface Publication {
  _id: string;
  year: number;
  title: string;
  venue: string;
  authors: string;
  tags?: string[] | null;
  image?: any;
  paperUrl?: string | null;
  codeUrl?: string | null;
  highlight?: string | null;
  presentationType?: string | null;
}

function normalizePublication(pub: Publication): PublicationCardProps {
  return {
    title: pub.title,
    venue: pub.venue,
    authors: pub.authors,
    tags: pub.tags ?? undefined,
    image: pub.image ? undefined : undefined,
    paperUrl: pub.paperUrl ?? undefined,
    codeUrl: pub.codeUrl ?? undefined,
    highlight: pub.highlight ?? undefined,
    presentationType: pub.presentationType ?? undefined,
  };
}

export default async function PublicationsPage() {
  const publicationsRaw = await client.fetch<Publication[]>(publicationsQuery);
  const publicationsByYear = publicationsRaw.reduce((acc, pub) => {
    if (!acc[pub.year]) {
      acc[pub.year] = [];
    }
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<number, Publication[]>);

  // 연도별로 정렬 (내림차순)
  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);
  
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 py-10 lg:py-12 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Publications</h1>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16 space-y-8">
        <div className="space-y-8">
          {years.map((year) => (
            <div key={year} className="space-y-4">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">{year}</h2>
              <div className="space-y-6">
                {publicationsByYear[year].map((pub, idx) => {
                  const normalized = normalizePublication(pub);
                  return (
                    <PublicationCard key={`${year}-${idx}`} {...normalized} />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

