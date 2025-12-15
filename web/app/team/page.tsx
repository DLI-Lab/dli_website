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
  website?: string;
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
        website: member.website,
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

  const studentSections: { title: string; people: TeamMember[] }[] = [
    { title: "PhD", people: phd },
    { title: "MS/PhD", people: msPhd },
    { title: "Master", people: master },
    { title: "Undergrad", people: undergrad },
  ];

  const otherSections: { title: string; people: TeamMember[] }[] = [
    { title: "Industry Researchers", people: industryResearchers },
    { title: "Collaborators", people: collaborators },
    { title: "Alumni", people: alumni },
  ];

  const studentSectionHighlightBg: Record<string, string> = {
    PhD: "bg-sky-200/70",
    "MS/PhD": "bg-violet-200/65",
    Master: "bg-emerald-200/65",
    Undergrad: "bg-amber-200/70",
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
          {/* Professor Section */}
          {professor.length > 0 && (
            <div className="space-y-5 pb-10 border-b-2 border-gray-200">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-6">Professor</h2>
              <div className="flex justify-center">
                {professor.map((m, idx) => (
                  <TeamMemberCard key={`professor-${idx}`} {...m} />
                ))}
              </div>
            </div>
          )}

          {/* Students Section */}
          <div className="space-y-10 pt-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-6">Students</h2>
            {studentSections.map(
              (section) =>
                section.people.length > 0 && (
                  <div key={section.title} className="space-y-6">
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
                      <span className="relative inline-block px-2">
                        <span
                          aria-hidden
                          className={`absolute inset-x-0 bottom-[0.22em] h-[0.72em] rounded-sm -skew-x-12 ${
                            studentSectionHighlightBg[section.title] || "bg-slate-200/70"
                          }`}
                        />
                        <span className="relative">{section.title}</span>
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                      {section.people.map((m, idx) => (
                        <TeamMemberCard key={`${section.title}-${idx}`} {...m} />
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>

          {/* Other Sections */}
          {otherSections.map(
            (section) =>
              section.people.length > 0 && (
                <div
                  key={section.title}
                  className={`space-y-6 ${section.title === "Alumni" ? "pb-10 lg:pb-14" : ""}`}
                >
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">{section.title}</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {section.people.map((m, idx) => (
                      <TeamMemberCard key={`${section.title}-${idx}`} {...m} />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </section>
    </main>
  );
}
