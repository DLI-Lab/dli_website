/* Publication card with optional image */
"use client";

export interface PublicationCardProps {
  title: string;
  venue: string;
  authors: string;
  tags?: string[];
  image?: string | null;
  paperUrl?: string;
  codeUrl?: string;
  datasetUrl?: string;
  demoUrl?: string;
  highlight?: string | null;
  presentationType?: string | null;
}

export default function PublicationCard({
  title,
  venue,
  authors,
  tags = [],
  image,
  paperUrl,
  codeUrl,
  datasetUrl,
  demoUrl,
  highlight,
  presentationType,
}: PublicationCardProps) {
  const hasImage = Boolean(image);
  const cover = image || "/placeholder.png";

  // Parse venue to separate award information (fallback for old format)
  const awardKeywords = ["award", "prize", "honor", "recognition"];
  const hasAward = awardKeywords.some((keyword) => venue.toLowerCase().includes(keyword));
  
  let venueText = venue;
  let awardText = highlight || "";
  
  if (!highlight && hasAward) {
    // Try to split by comma if award info is after comma
    const commaIndex = venue.indexOf(",");
    if (commaIndex > 0) {
      venueText = venue.substring(0, commaIndex).trim();
      awardText = venue.substring(commaIndex + 1).trim();
    } else {
      // If no comma, check if entire venue is award-related
      if (awardKeywords.some((keyword) => venue.toLowerCase().startsWith(keyword))) {
        awardText = venue;
        venueText = "";
      }
    }
  }

  return (
    <article
      className={`group rounded-2xl border border-gray-200 bg-gray-50 shadow-sm hover:shadow-lg transition-all duration-300 p-2.5 lg:p-3 ${
        hasImage ? "lg:h-[155px]" : ""
      }`}
    >
      <div className={`flex gap-3 lg:gap-5 h-full ${hasImage ? "flex-col lg:flex-row" : "flex-col"}`}>
        {hasImage && (
          <div className="flex-shrink-0 w-full lg:w-56 h-36 sm:h-44 lg:h-full">
            <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100">
              <img
                src={cover}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0 flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {venueText && (
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                {venueText}
              </div>
            )}
            {awardText && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                <span>⭐</span>
                <span>{awardText}</span>
              </div>
            )}
            {presentationType && (
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
                {presentationType === "Oral Presentation" ? "Oral" : presentationType}
              </div>
            )}
            {(paperUrl || codeUrl || datasetUrl || demoUrl) && (
              <div className="flex flex-wrap gap-1.5">
                {paperUrl && (
                  <a
                    href={paperUrl}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    paper
                  </a>
                )}
                {codeUrl && (
                  <a
                    href={codeUrl}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-semibold text-violet-700 hover:bg-violet-100 hover:border-violet-300 transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    code
                  </a>
                )}
                {datasetUrl && (
                  <a
                    href={datasetUrl}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    dataset
                  </a>
                )}
                {demoUrl && (
                  <a
                    href={demoUrl}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 hover:bg-rose-100 hover:border-rose-300 transition-colors"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Watch demo video"
                  >
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3 w-3"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    demo
                  </a>
                )}
              </div>
            )}
          </div>
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 leading-tight">
            {title}
          </h3>
          <p className="text-xs lg:text-sm text-gray-600 leading-tight truncate" title={authors}>
            {authors}
          </p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

