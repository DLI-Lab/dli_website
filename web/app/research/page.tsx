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

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="space-y-8 max-w-[1100px] mx-auto">
          {researchAreas.map((area, idx) => (
            <article
              key={area._id}
              className={`flex flex-col lg:flex-row gap-6 lg:gap-8 pb-8 ${
                idx === researchAreas.length - 1 ? "" : "border-b border-gray-200"
              }`}
            >
              {/* 이미지 */}
              <div className="w-full lg:w-96 flex-shrink-0">
                <div className="w-full h-44 lg:h-48 overflow-hidden rounded-xl bg-gray-100">
                  <img 
                    src={area.image?.asset?.url || "/placeholder.png"} 
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
          ))}
        </div>
      </section>
    </main>
  );
}
