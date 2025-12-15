export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  email?: string;
  website?: string;
  researchArea?: string;
  googleScholar?: string;
}

export default function TeamMemberCard({ name, role, bio, image, email, website, researchArea, googleScholar }: TeamMember) {
  const src = image || "/placeholder.png";
  const isProfessor = role.toLowerCase().includes("professor") || role.toLowerCase() === "faculty";

  const normalizedWebsite = website ? (website.startsWith("http") ? website : `https://${website}`) : "";
  const websiteMeta =
    website && website.toLowerCase().includes("github")
      ? { label: "GitHub", icon: "/icons/github.png", alt: "GitHub icon" }
      : website && website.toLowerCase().includes("linkedin")
      ? { label: "LinkedIn", icon: "/icons/linkedin.png", alt: "LinkedIn icon" }
      : website && website.toLowerCase().includes("weebly")
      ? { label: "Weebly", icon: "/icons/weebly.png", alt: "Weebly icon" }
      : website
      ? { label: "Website", icon: "/icons/personal_website.png", alt: "Website icon" }
      : null;

  // Professor 카드는 가로형 레이아웃 (이미지 왼쪽, 텍스트 오른쪽) - 더 크게
  if (isProfessor) {
    return (
      <div className="group w-full max-w-4xl mx-auto rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[340px]">
        {/* Left column: Image */}
        <div className="flex-shrink-0 w-full lg:w-[40%] h-56 lg:h-full lg:rounded-l-2xl overflow-hidden bg-gray-100">
          <img
            src={src}
            alt={name}
            className="w-full h-full object-contain lg:object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Right column: Content */}
        <div className="flex-1 px-7 lg:px-8 pt-7 lg:pt-8 pb-2 flex flex-col h-full">
          <div className="flex flex-col flex-1 min-h-0">
            <div className="space-y-3 flex-shrink-0">
              {/* Name, Role, and Email with consistent spacing */}
              <div className="space-y-1">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">{name}</h3>
                <span className="text-base lg:text-lg font-semibold text-blue-600">{role}</span>
                {email && (
                  <span className="text-sm lg:text-base text-gray-600 block">
                    {email}
                  </span>
                )}
              </div>
              
              {/* Divider between email and bio - always shown */}
              <div className="border-t border-gray-200"></div>
            </div>
            
            {/* Bio paragraph - fixed space, always reserved */}
            <div className="h-auto lg:h-[125px] overflow-visible lg:overflow-hidden flex items-start lg:items-center pt-3 lg:pt-0">
              {bio && (
                <p
                  className={`text-gray-600 leading-relaxed text-left whitespace-pre-line break-words ${
                    bio.length > 200 ? "text-sm" : "text-sm lg:text-base"
                  }`}
                >
                  {bio}
                </p>
              )}
            </div>
          </div>
          
          {/* Divider and social icons - fixed position at bottom */}
          <div className="space-y-3 pt-2 mt-auto">
            <div className="border-t border-gray-200"></div>
            <div className="flex items-center gap-2.5 h-10">
              {googleScholar && (
                <a
                  href={googleScholar}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  <img src="/icons/google_scholar.png" alt="Google Scholar" className="w-7 h-7" />
                </a>
              )}
              {website && (
                <a
                  href={normalizedWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  {websiteMeta && <img src={websiteMeta.icon} alt={websiteMeta.alt} className="w-7 h-7" />}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group w-full max-w-2xl mx-auto rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex h-[260px]">
      {/* Left column: Image */}
      <div className="flex-shrink-0 w-[40%] rounded-l-2xl overflow-hidden bg-gray-100">
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Right column: Content */}
      <div className="flex-1 px-5 lg:px-6 pt-5 lg:pt-6 pb-2 flex flex-col h-full">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="space-y-2.5 flex-shrink-0">
            {/* Name, Role, and Email with consistent spacing */}
            <div className="space-y-1">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">{name}</h3>
              <span className="text-sm lg:text-base text-gray-600">{role}</span>
              {email && (
                <span className="text-xs lg:text-sm text-gray-600 block">
                  {email}
                </span>
              )}
            </div>
            
            {researchArea && (
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-xs lg:text-sm text-gray-700 w-fit">
                {researchArea}
              </div>
            )}
            
            {/* Divider between email and bio - always shown */}
            <div className="border-t border-gray-200"></div>
          </div>
          
          {/* Bio paragraph - fixed space, always reserved */}
          <div className="flex-1 min-h-0 max-h-[86px] overflow-hidden flex items-center">
            {bio && (
              <p className={`text-gray-600 leading-relaxed text-left ${
                bio.length > 150 ? "text-xs" : "text-xs lg:text-sm"
              }`}>
                {bio}
              </p>
            )}
          </div>
        </div>
        
        {/* Divider and social icons - fixed position at bottom */}
        <div className="space-y-3 pt-2 mt-auto">
          <div className="border-t border-gray-200"></div>
          <div className="flex items-center gap-2.5 h-10">
            {website && (
              <a
                href={normalizedWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                {websiteMeta && <img src={websiteMeta.icon} alt={websiteMeta.alt} className="w-7 h-7" />}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

