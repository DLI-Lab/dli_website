import TeamMemberCard, { TeamMember } from "@/components/TeamMemberCard";
import { client } from "@/src/sanity/client";
import { membersQuery } from "@/src/sanity/queries";

interface SanityMember {
  _id: string;
  name: string;
  role: string;
  category: string;
  email?: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  bio?: string;
  github?: string;
  personalPage?: string;
  linkedin?: string;
  weebly?: string;
  googleScholar?: string;
}

const categoryMapping: Record<string, string> = {
  professor: 'Professor',
  phd: 'PhD',
  msPhd: 'MS/PhD',
  master: 'Master',
  undergrad: 'Undergrad',
  industryResearchers: 'Industry Researchers',
  collaborators: 'Collaborators',
  alumni: 'Alumni',
};

function groupMembersByCategory(members: SanityMember[]) {
  const grouped: Record<string, TeamMember[]> = {
    professor: [],
    phd: [],
    msPhd: [],
    master: [],
    undergrad: [],
    industryResearchers: [],
    collaborators: [],
    alumni: [],
  };

  members.forEach((member) => {
    const category = member.category;
    if (grouped[category]) {
      grouped[category].push({
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: member.image?.asset?.url,
        email: member.email,
        github: member.github,
        personalPage: member.personalPage,
        linkedin: member.linkedin,
        weebly: member.weebly,
        googleScholar: member.googleScholar,
      });
    }
  });

  return grouped;
}

export default async function TeamPage() {
  const members = await client.fetch<SanityMember[]>(membersQuery);
  const grouped = groupMembersByCategory(members);

  const { professor, phd, msPhd, master, undergrad, industryResearchers, collaborators, alumni } = grouped;

  // 모든 섹션을 하나의 배열로 통합
  const allSections: { title: string; people: TeamMember[]; isProfessor?: boolean }[] = [
    { title: "Professor", people: professor, isProfessor: true },
    { title: "PhD", people: phd },
    { title: "MS/PhD", people: msPhd },
    { title: "Master", people: master },
    { title: "Undergrad", people: undergrad },
    { title: "Industry Researchers", people: industryResearchers },
    { title: "Collaborators", people: collaborators },
    { title: "Alumni", people: alumni },
  ];

  // 각 섹션별 하이라이트 색상
  const sectionHighlightBg: Record<string, string> = {
    Professor: "bg-rose-200/70",
    PhD: "bg-sky-200/70",
    "MS/PhD": "bg-violet-200/65",
    Master: "bg-emerald-200/65",
    Undergrad: "bg-amber-200/70",
    "Industry Researchers": "bg-indigo-200/70",
    Collaborators: "bg-teal-200/70",
    Alumni: "bg-slate-200/70",
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 py-10 lg:py-12 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Team</h1>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="space-y-14">
          {/* All Sections */}
          {allSections.map(
            (section, sectionIdx) =>
              section.people.length > 0 && (
                <div
                  key={section.title}
                  className={`space-y-6 ${
                    sectionIdx < allSections.length - 1 && allSections[sectionIdx + 1]?.people.length > 0
                      ? "pb-10 border-b-2 border-gray-200"
                      : section.title === "Alumni"
                      ? "pb-10 lg:pb-14"
                      : ""
                  }`}
                >
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                    <span className="relative inline-block px-2">
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 bottom-[0.18em] h-[0.55em] rounded-sm -skew-x-12 ${
                          sectionHighlightBg[section.title] || "bg-slate-200/70"
                        }`}
                      />
                      <span className="relative">{section.title}</span>
                    </span>
                  </h2>
                  {section.isProfessor ? (
                    <div className="flex justify-center">
                      {section.people.map((m, idx) => (
                        <TeamMemberCard key={`${section.title}-${idx}`} {...m} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                      {section.people.map((m, idx) => (
                        <TeamMemberCard key={`${section.title}-${idx}`} {...m} />
                      ))}
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      </section>
    </main>
  );
}
