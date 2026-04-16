export default function ApplyPage() {
  const HighlightTitle = ({ children }: { children: React.ReactNode }) => (
    <span className="relative inline-block px-2">
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-[0.22em] h-[0.72em] rounded-sm -skew-x-12 bg-amber-200/70"
      />
      <span className="relative">{children}</span>
    </span>
  );

  const HighlightLabel = ({
    children,
    bgClassName,
  }: {
    children: React.ReactNode;
    bgClassName: string;
  }) => (
    <span className="relative inline-block px-1">
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-[0.18em] h-[0.62em] rounded-sm -skew-x-12 ${bgClassName}`}
      />
      <span className="relative">{children}</span>
    </span>
  );

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 py-10 lg:py-12 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            DLI Research Internship Program
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-14">
        <div className="flex flex-col items-center space-y-10">
          {/* Internship Info */}
          <div className="w-full max-w-5xl space-y-4 text-center">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                <HighlightTitle>Internship Info</HighlightTitle>
              </h3>

              <p className="mt-3 text-base lg:text-lg text-gray-700 leading-loose text-left">
                Our internship program is designed for individuals passionate about ML/AI research in cutting-edge fields.
                If you are eager to learn, contribute, and grow in a collaborative environment, we welcome you to apply!
              </p>

              <div className="mt-4 grid gap-2 text-base lg:text-lg text-gray-700 leading-loose text-left">
                <p className="font-semibold">✉️ Contact</p>
                <div className="flex flex-col gap-1">
                  <span>
                    <span className="font-semibold text-gray-900">
                      <HighlightLabel bgClassName="bg-sky-200/70">Group Leader</HighlightLabel>:
                    </span>{" "}
                    donalee@yonsei.ac.kr
                  </span>
                  <span>
                    <span className="font-semibold text-gray-900">
                      <HighlightLabel bgClassName="bg-emerald-200/70">HR Admin</HighlightLabel>:
                    </span>{" "}
                    salee@yonsei.ac.kr
                  </span>
                </div>
                <p className="font-semibold text-gray-700">
                  Please make sure to copy the HR Admin when sending any contact emails.
                </p>
              </div>
            </div>
          </div>

          {/* Program Overview */}
          <div className="w-full max-w-5xl space-y-4 text-center">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                <HighlightTitle>Program Overview</HighlightTitle>
              </h3>
              <p className="mt-3 text-base lg:text-lg text-gray-700 leading-loose text-left">
                DLI Internship Program is designed to empower participants to <strong>take the lead in developing
                their own research projects</strong>, <strong>with group members and leader providing support and guidance</strong>.
                Throughout the program, participants will engage in the <strong>full research cycle</strong>, from formulating
                hypotheses to conducting experiments, analyzing data, and synthesizing results. The program’s ultimate
                goal is for each participant to reach a level of research quality that enables them to submit their
                work as the first author to a top-tier conference.
              </p>
            </div>
          </div>

          {/* Required Documents */}
          <div className="w-full max-w-5xl space-y-4 text-center">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                <HighlightTitle>Required Documents for Application</HighlightTitle>
              </h3>
              <p className="mt-3 text-base lg:text-lg text-gray-700 leading-loose">
                Please submit the following documents along with your application via email:
              </p>
              <ul className="mt-4 space-y-3 text-base lg:text-lg text-gray-700 leading-loose text-left">
                <li>
                  <strong>Academic Transcript</strong>
                  <div className="text-gray-600">A copy of your undergraduate academic transcript.</div>
                </li>
                <li>
                  <strong>Curriculum Vitae (CV)</strong>
                  <div className="text-gray-600">Your updated CV detailing your education, research experience, and skills.</div>
                </li>
                <li>
                  <strong>Personal Statement (Optional)</strong>
                  <div className="text-gray-600">A brief introduction about yourself, your academic and career goals, and your motivation for joining our lab.</div>
                </li>
                <li>
                  <strong>GitHub or Personal Page (Optional)</strong>
                  <div className="text-gray-600">A link to your GitHub profile, personal website, or blog about your work, projects, and learning journey.</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Application Process */}
          <div className="w-full max-w-5xl space-y-4 text-center">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                <HighlightTitle>Application Process</HighlightTitle>
              </h3>
              <p className="mt-3 text-base lg:text-lg text-gray-700 leading-loose">
                We prefer applicants who are considering joining our lab as future graduate students.
              </p>
              <ol className="mt-4 space-y-3 text-base lg:text-lg text-gray-700 leading-loose list-decimal list-inside text-left">
                <li>
                  <strong>Application Screening</strong>
                  <div className="text-gray-600">
                    Our team will carefully review all submitted applications, including academic transcripts, CVs,
                    and optional materials such as GitHub profiles or personal statements. This step allows us to assess
                    each applicant&apos;s background, research experiences, and alignment with our lab&apos;s goals.
                  </div>
                </li>
                <li>
                  <strong>Interview and Discussion</strong>
                  <div className="text-gray-600">
                    Selected applicants will be invited for an interview. During the interview, you will have the opportunity
                    to discuss your academic and research experiences, as well as your aspirations. Candidates may also be
                    asked to engage in a discussion about a research paper to evaluate their analytical abilities and foundational
                    knowledge in CS/AI.
                  </div>
                </li>
                <li>
                  <strong>Final Decision and Matching</strong>
                  <div className="text-gray-600">
                    Successful candidates will receive notification of their acceptance into the program within 2 weeks.
                    Upon selection, each intern will be matched with a graduate student mentor who will support them
                    throughout the research project.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

