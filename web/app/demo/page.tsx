import DemoPageClient, { DemoItem } from "@/components/DemoPageClient";
import { client } from "@/src/sanity/client";
import { membersForLookupQuery, publicationsQuery } from "@/src/sanity/queries";

interface Publication {
  _id: string;
  year: number;
  title: string;
  venue: string;
  authors: string;
  demoUrl?: string | null;
  paperUrl?: string | null;
  codeUrl?: string | null;
  imageUrl?: string | null;
  demoThumbnailUrl?: string | null;
}

interface MemberLookup {
  name: string | null;
  imageUrl: string | null;
}

// Extract YouTube video ID from common URL shapes:
//   https://www.youtube.com/watch?v=ID
//   https://youtu.be/ID
//   https://www.youtube.com/embed/ID
//   https://www.youtube.com/shorts/ID
function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return u.pathname.slice(1).split("/")[0] || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return v;

      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" || parts[0] === "shorts") {
        return parts[1] || null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

export default async function DemoPage() {
  const [publications, members] = await Promise.all([
    client.fetch<Publication[]>(publicationsQuery),
    client.fetch<MemberLookup[]>(membersForLookupQuery),
  ]);

  // name (normalized) -> imageUrl
  const memberImageByName = new Map<string, string>();
  for (const m of members) {
    if (m.name && m.imageUrl) {
      memberImageByName.set(normalizeName(m.name), m.imageUrl);
    }
  }

  const demos: DemoItem[] = publications.flatMap((p) => {
    if (!p.demoUrl) return [];
    const videoId = extractYouTubeId(p.demoUrl);
    if (!videoId) return [];

    const firstAuthor =
      (p.authors ?? "")
        .replace(/[{}]/g, "")
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)[0] ?? "";
    const authorImage = firstAuthor
      ? memberImageByName.get(normalizeName(firstAuthor)) ?? null
      : null;

    return [
      {
        _id: p._id,
        title: p.title,
        venue: p.venue,
        year: p.year,
        firstAuthor: firstAuthor || undefined,
        authorImage: authorImage ?? undefined,
        customThumbnail: p.demoThumbnailUrl ?? p.imageUrl ?? undefined,
        demoUrl: p.demoUrl,
        paperUrl: p.paperUrl ?? undefined,
        codeUrl: p.codeUrl ?? undefined,
        videoId,
      },
    ];
  });

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 py-10 lg:py-12 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Demo
          </h1>
        </div>
      </section>

      <DemoPageClient demos={demos} />
    </main>
  );
}
