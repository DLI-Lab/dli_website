import AboutResearchTabs from "@/components/AboutResearchTabs";
import SponsorBelt from "@/components/SponsorBelt";
import NewsSection from "@/components/NewsSection";
import MobileImageCarousel from "@/components/MobileImageCarousel";
import type { ReactNode } from "react";

/**
 * 메인 랜딩 페이지
 */

export default function Home() {
  const HighlightLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href} className="group relative inline-block px-1 font-medium text-blue-700 hover:text-blue-800 transition-colors">
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-[0.18em] h-[0.72em] rounded-sm -skew-x-12 bg-sky-200/70 transition-colors group-hover:bg-sky-300/70"
      />
      <span className="relative">{children}</span>
    </a>
  );

  return (
    <div>
      {/* ===== 섹션 1: 히어로 ===== */}
      <section className="relative">
        {/* 배경 그라데이션 + 패턴 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-100/40 to-indigo-100/50"></div>
          <div className="absolute top-0 left-0 right-0 h-[55%] bg-gradient-to-b from-white/70 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-[65%] h-[65%] bg-gradient-to-tl from-blue-100/50 via-purple-50/40 to-transparent"></div>
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-12 lg:pb-14">
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-2 items-center">
            {/* 왼쪽 텍스트 영역 */}
            <div className="space-y-4 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block">Data &amp; Language</span>
                <span className="block">Intelligence Lab</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-gray-500 font-semibold mt-2">@ Yonsei University</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-500 font-medium">
                Empowering AI with real-world data & human language insights
              </p>
            </div>

            {/* 오른쪽 이미지 영역 */}
            <div className="w-full">
              {/* Mobile: 스와이프 캐러셀 */}
              <div className="sm:hidden">
                <MobileImageCarousel
                  images={[
                    { src: "/team.png", alt: "연구실 모임 사진" },
                    { src: "/team2.png", alt: "연구실 단체 사진" },
                  ]}
                />
              </div>

              {/* >= sm: overlap layout */}
              <div className="hidden sm:block relative h-[500px] lg:h-[560px] ml-auto -mr-8">
                <div className="absolute -left-23 top-5 w-[62%] h-[87%] z-20 overflow-hidden flex items-center justify-center rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
                  <img src="/team.png" alt="연구실 모임 사진" className="w-full h-full object-cover" />
                </div>
                <div className="absolute right-0 bottom-0 w-[62%] h-[87%] z-10 overflow-hidden flex items-center justify-center rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
                  <img src="/team2.png" alt="연구실 단체 사진" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-6 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-60 blur-3xl -z-10" />
                <div className="absolute -bottom-16 -left-6 w-52 h-52 bg-indigo-100 rounded-full opacity-50 blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* 스폰서 로고 벨트 */}
        <div className="mt-1 lg:mt-8 max-w-[1400px] mx-auto px-6 lg:px-10">
          <SponsorBelt />
        </div>
      </section>

      {/* ===== 섹션 2: About & Research (탭) - 비활성화 =====
      <section className="relative bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-12 lg:pb-16">
          <AboutResearchTabs />
        </div>
      </section>
      */}

      {/* ===== 섹션 3: Lab News ===== */}
      <section className="relative bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-12 lg:pb-16 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] max-h-[800px] lg:max-h-[850px] overflow-y-auto lg:overflow-hidden">
          <NewsSection />
        </div>
      </section>

      {/* ===== 섹션 4: Now Hiring ===== */}
      <section className="relative bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-16 lg:pb-24">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              <span className="relative inline-block px-2">
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[0.22em] h-[0.72em] rounded-sm -skew-x-12 bg-sky-200/70"
                />
                <span className="relative">Now Hiring!</span>
              </span>
            </h2>
            
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              Our research group is currently seeking <span className="font-semibold text-gray-900">talented and passionate students (MS/PhD)</span> as well as <span className="font-semibold text-gray-900">undergraduate research interns</span> to join our team.
            </p>

            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              As a member of our team, you will have the opportunity to work on cutting-edge research projects in a collaborative and supportive environment.
            </p>

            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              If you are interested in joining our team, please refer to the <HighlightLink href="/apply">Apply</HighlightLink>{" "}
              page.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 섹션 5: FAQ + Footer ===== */}
      <section className="relative bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-12 flex-1">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              <span className="relative inline-block px-2">
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[0.22em] h-[0.72em] rounded-sm -skew-x-12 bg-amber-200/70"
                />
                <span className="relative">FAQ</span>
              </span>
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  What is your research group focused on?
                </h3>
                <p className="mt-2 text-base lg:text-lg text-gray-600 leading-relaxed">
                  Our research group is broadly focused on natural language processing (NLP) and data mining (DM), with a particular emphasis on the real-world applications of large language models (LLMs) as reasoning agents. We study how to enhance the reasoning and decision-making capabilities of LLMs, especially in information/knowledge retrieval, human-level data analysis, and personalized applications.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  Are you currently accepting new members?
                </h3>
                <p className="mt-2 text-base lg:text-lg text-gray-600 leading-relaxed">
                  Yes, we are currently accepting new members. We welcome passionate students (MS/PhD) and undergraduate research interns to join our team.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  How do I apply to join your research group?
                </h3>
                <p className="mt-2 text-base lg:text-lg text-gray-600 leading-relaxed">
                  To apply to join our research group, please refer to the <HighlightLink href="/apply">Apply</HighlightLink>{" "}
                  page.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  Do I need to have any qualifications to join your research group?
                </h3>
                <p className="mt-2 text-base lg:text-lg text-gray-600 leading-relaxed">
                  We strongly recommend individuals who are interested in joining our research group to complete a{" "}
                  <HighlightLink href="/apply">Research Internship</HighlightLink> with us before applying for a graduate research
                  position. This will give you the opportunity to learn more about our research and determine if it is the right
                  fit for you. Additionally, having relevant research experience and a passion for our research area will be
                  helpful in making a strong application.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  Can undergraduate students apply to join your research group?
                </h3>
                <p className="mt-2 text-base lg:text-lg text-gray-600 leading-relaxed">
                  Yes, undergraduate students are welcome to apply to join our research group as{" "}
                  <HighlightLink href="/apply">Research Interns</HighlightLink>. We offer opportunities for undergraduate students
                  to gain research experience and contribute to ongoing research projects.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  What kind of mentorship and guidance can I expect as a research group member?
                </h3>
                <p className="mt-2 text-base lg:text-lg text-gray-600 leading-relaxed">
                  As a research group member, you can expect mentorship and guidance from the research group leader and senior members of the group. We offer regular group meetings, one-on-one meetings, and training opportunities from the support of our members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
