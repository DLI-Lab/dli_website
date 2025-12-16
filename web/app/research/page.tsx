import { client } from "@/src/sanity/client";
import { researchAreasQuery } from "@/src/sanity/queries";

type TaskItem = string | { _key?: string; value?: string } | null

interface ResearchArea {
  _id: string;
  title: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  tasks: TaskItem[];
}

const normalizeTasks = (tasks: TaskItem[] = []) =>
  tasks
    .map((task) => (typeof task === "string" ? task : task?.value || ""))
    .filter((t) => t);

const HighlightTitle = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block px-2">
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-[0.22em] h-[0.72em] rounded-sm -skew-x-12 bg-amber-200/70"
    />
    <span className="relative">{children}</span>
  </span>
);

export default async function ResearchPage() {
  const researchAreas = await client.fetch<ResearchArea[]>(researchAreasQuery);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 py-10 lg:py-12 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Research</h1>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-14">
        <div className="flex flex-col items-center space-y-10">
          {researchAreas.map((area, idx) => {
            const hasImage = area.image?.asset?.url;
            
            // 이미지가 없을 때: Apply 페이지 스타일 (하이라이트 타이틀 + 중앙 정렬)
            if (!hasImage) {
              return (
                <div key={area._id} className="w-full max-w-5xl space-y-4 text-center">
                  <div className={`${idx === 0 ? "" : "border-t border-gray-200"} pt-6`}>
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                      <HighlightTitle>{area.title}</HighlightTitle>
                    </h2>
                    <ul className="space-y-3 text-base lg:text-lg text-gray-700 leading-loose text-left">
                      {normalizeTasks(area.tasks).map((task, taskIndex) => (
                        <li key={taskIndex}>{`• ${task}`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
            
            // 이미지가 있을 때: Home 페이지 Research 섹션 스타일 (나란히 배치)
            return (
              <div key={area._id} className="w-full max-w-[1100px]">
                <article
                  className={`flex flex-col lg:flex-row gap-6 lg:gap-8 pb-8 ${
                    idx === researchAreas.length - 1 ? "" : "border-b border-gray-200"
                  }`}
                >
                  {/* 이미지 */}
                  <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="w-full h-44 lg:h-48 overflow-hidden rounded-xl bg-gray-100">
                      <img 
                        src={area.image!.asset.url} 
                        alt={area.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>

                  {/* 텍스트 */}
                  <div className="flex-1 flex flex-col gap-3 items-start">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                      {area.title}
                    </h2>
                    <ul className="space-y-2 text-base lg:text-lg text-gray-600 leading-relaxed">
                      {normalizeTasks(area.tasks).map((task, taskIndex) => (
                        <li key={taskIndex}>{`• ${task}`}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
