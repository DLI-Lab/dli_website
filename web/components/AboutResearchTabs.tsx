"use client";

import { useState, useEffect } from "react";

/**
 * About & Research 탭 컴포넌트
 * 탭을 클릭하여 About과 Research 콘텐츠를 전환
 */

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

function AboutContent() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        Data &amp; Language Intelligence Lab
      </h2>
      <p className="text-lg lg:text-xl text-gray-700 font-medium leading-relaxed">
        Empowering AI with real-world data & human language insights
      </p>
      <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
        DLI Lab은...
      </p>
    </div>
  );
}

function ResearchContent({ areas }: { areas: ResearchArea[] }) {
  return (
    <div className="space-y-8 max-w-[1100px] mx-auto">
      {areas.map((area, index) => (
        <article
          key={area._id}
          className={`flex flex-col lg:flex-row gap-6 lg:gap-8 pb-8 ${
            index === areas.length - 1 ? "" : "border-b border-gray-200"
          }`}
        >
          {/* 이미지 - 이미지가 있을 때만 렌더링 */}
          {area.image?.asset?.url && (
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="w-full h-44 lg:h-48 overflow-hidden rounded-xl bg-gray-100">
                <img 
                  src={area.image.asset.url} 
                  alt={area.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          )}

          {/* 텍스트 */}
          <div className="flex-1 flex flex-col gap-3 items-start">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              {area.title}
            </h3>
            <ul className="space-y-2 text-base lg:text-lg text-gray-600 leading-relaxed">
              {normalizeTasks(area.tasks).map((task, taskIndex) => (
                <li key={taskIndex}>{`• ${task}`}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function AboutResearchTabs() {
  const [activeTab, setActiveTab] = useState<"about" | "research">("about");
  const [researchAreas, setResearchAreas] = useState<ResearchArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/research-areas")
      .then((res) => res.json())
      .then((areas: ResearchArea[]) => {
        setResearchAreas(areas);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* 탭 버튼 - 모바일에서 숨김 */}
      <div className="hidden lg:flex justify-center gap-10 mb-10">
        <button
          onClick={() => setActiveTab("about")}
          className={`pb-2 text-xl lg:text-2xl transition-all duration-300 ${
            activeTab === "about"
              ? "font-bold text-gray-900 border-b-3 border-gray-900"
              : "font-normal text-gray-600"
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab("research")}
          className={`pb-2 text-xl lg:text-2xl transition-all duration-300 ${
            activeTab === "research"
              ? "font-bold text-gray-900 border-b-3 border-gray-900"
              : "font-normal text-gray-600"
          }`}
        >
          Research
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="relative overflow-hidden pr-10 lg:pr-10 pr-0 h-[600px]">
        {/* 슬라이드 인디케이터 화살표 (우측 중앙) - 데스크탑에서만 표시 */}
        <button
          aria-label={activeTab === "about" ? "Go to Research" : "Go to About"}
          onClick={() => setActiveTab(activeTab === "about" ? "research" : "about")}
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 px-5 py-4 text-4xl text-gray-300 hover:text-gray-700 hover:scale-110 transition-all cursor-pointer"
          style={{ textShadow: "0 0 8px rgba(0,0,0,0.15)" }}
        >
          {activeTab === "about" ? ">" : "<"}
        </button>
        {/* About 콘텐츠 - 모바일에서 항상 표시 */}
        <div
          className={`lg:transition-all lg:duration-500 lg:ease-in-out ${
            activeTab === "about"
              ? "opacity-100 translate-x-0"
              : "lg:opacity-0 lg:-translate-x-8 lg:absolute lg:inset-0 lg:pointer-events-none opacity-100 translate-x-0"
          }`}
        >
          <div className="h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              <AboutContent />
            </div>
          </div>
        </div>

        {/* Research 콘텐츠 - 모바일에서 숨김 */}
        <div
          className={`hidden lg:block transition-all duration-500 ease-in-out ${
            activeTab === "research"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8 absolute inset-0 pointer-events-none"
          }`}
        >
          <div className="h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Loading...</p>
                </div>
              ) : (
                <ResearchContent areas={researchAreas} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
