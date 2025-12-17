"use client";

import { useState, useEffect } from "react";

/**
 * Lab News 섹션 컴포넌트
 * Master-Detail 2컬럼 레이아웃 (전체 뷰포트 섹션)
 */

// 카테고리 타입
type NewsCategory = "academic" | "news" | "award";

// 뉴스 아이템 타입
interface AcademicPaper {
  title?: string;
  authors?: string;
  venue?: string;
  note?: string;
  paperUrl?: string | null;
  codeUrl?: string | null;
  datasetUrl?: string | null;
}

interface NewsItem {
  _id: string;
  date: string;
  category: NewsCategory;
  summary: string;
  description?: string[] | Array<{ _key?: string; value?: string }> | null;
  paperTitle?: string;
  authors?: string;
  venue?: string;
  note?: string;
  paperUrl?: string | null;
  codeUrl?: string | null;
  datasetUrl?: string | null;
  papers?: AcademicPaper[];
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  } | null;
  link?: string | null;
}

// 카테고리별 스타일
const categoryStyles: Record<NewsCategory, { bg: string; text: string; label: string }> = {
  academic: { bg: "bg-blue-100", text: "text-blue-700", label: "Academic" },
  news: { bg: "bg-emerald-100", text: "text-emerald-700", label: "News" },
  award: { bg: "bg-amber-100", text: "text-amber-700", label: "Award" },
};

export default function NewsSection() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data: NewsItem[]) => {
        setNewsData(data);
        setLoading(false);
        if (data.length > 0) {
          setSelectedId(data[0]._id);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleNewsClick = (id: string) => {
    setSelectedId(id);
    // 모바일(lg 미만)일 경우 모달 열기
    if (window.innerWidth < 1024) {
      setIsMobileModalOpen(true);
    }
  };

  const closeModal = () => setIsMobileModalOpen(false);

  const selectedNews = newsData.find((n: NewsItem) => n._id === selectedId);

  const renderDescription = (
    description?: string[] | Array<{ _key?: string; value?: string }> | null
  ) => {
    if (!description || description.length === 0) return null;

    const normalized =
      Array.isArray(description) && description.length > 0
        ? description.map((item) =>
            typeof item === "string" ? item : item?.value || ""
          )
        : [];

    if (normalized.length === 0) return null;

    return (
      <div className="space-y-3">
        {normalized.map((para: string, idx: number) => (
          <p key={idx} className="text-base lg:text-lg text-gray-600 leading-relaxed">
            {para.split(/(\*\*.*?\*\*)/g).map((part: string, i: number) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={i} className="font-semibold text-gray-900">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        ))}
      </div>
    );
  };

  // 상세 내용을 렌더링하는 함수 (데스크탑/모바일 공용)
  const renderNewsDetail = (news: NewsItem, options?: { hideCategory?: boolean }) => (
    <div className="space-y-4">
      {/* 카테고리 뱃지 (옵션에 따라 숨김) */}
      {!options?.hideCategory && (
      <div className="mb-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            categoryStyles[news.category].bg
          } ${categoryStyles[news.category].text}`}
        >
          {categoryStyles[news.category].label}
        </span>
      </div>
      )}

      {/* 날짜 */}
      <p className="text-sm text-gray-400 mb-3">{news.date}</p>

      {/* 이미지 */}
      {news.image?.asset?.url && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img
            src={news.image.asset.url}
            alt={news.summary}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Academic 타입 */}
      {news.category === "academic" && (
        <div className="space-y-4">
          {news.papers && news.papers.length > 0 ? (
            <>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 leading-snug">
                {news.summary}
              </h3>
              <div className="divide-y divide-gray-200">
                {news.papers.map((paper: AcademicPaper, idx: number) => (
                  <div
                    key={`${news._id}-paper-${idx}`}
                    className="py-4"
                  >
                    <h4 className="text-base lg:text-lg font-semibold text-gray-900 leading-snug">
                      {paper.title}
                    </h4>
                    {paper.authors && (
                      <p className="text-base lg:text-lg text-gray-600 mt-2">
                        {paper.authors}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {paper.venue && (
                        <span className="text-sm lg:text-base text-gray-700 font-medium">
                          {paper.venue}
                        </span>
                      )}
                      {paper.note && (
                        <span className="text-sm lg:text-base text-red-600 font-medium">
                          ({paper.note})
                        </span>
                      )}
                      {(paper.paperUrl || paper.codeUrl || paper.datasetUrl) && (
                        <div className="flex flex-wrap gap-1.5">
                          {paper.paperUrl && (
                            <a
                              href={paper.paperUrl}
                              className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs lg:text-sm font-semibold text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-colors"
                              target="_blank"
                              rel="noreferrer"
                            >
                              paper
                            </a>
                          )}
                          {paper.codeUrl && (
                            <a
                              href={paper.codeUrl}
                              className="inline-flex items-center px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs lg:text-sm font-semibold text-violet-700 hover:bg-violet-100 hover:border-violet-300 transition-colors"
                              target="_blank"
                              rel="noreferrer"
                            >
                              code
                            </a>
                          )}
                          {paper.datasetUrl && (
                            <a
                              href={paper.datasetUrl}
                              className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs lg:text-sm font-semibold text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-colors"
                              target="_blank"
                              rel="noreferrer"
                            >
                              dataset
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {renderDescription(news.description)}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 leading-snug">
                  {news.paperTitle}
                </h3>
                <p className="text-base lg:text-lg text-gray-600">
                  {news.authors}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base lg:text-lg text-gray-700 font-medium">
                    {news.venue}
                  </p>
                  {news.note && (
                    <span className="text-base lg:text-lg text-red-600 font-medium">
                      ({news.note})
                    </span>
                  )}
                </div>
                {(news.paperUrl || news.codeUrl || news.datasetUrl) && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {news.paperUrl && (
                      <a
                        href={news.paperUrl}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs lg:text-sm font-semibold text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        paper
                      </a>
                    )}
                    {news.codeUrl && (
                      <a
                        href={news.codeUrl}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs lg:text-sm font-semibold text-violet-700 hover:bg-violet-100 hover:border-violet-300 transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        code
                      </a>
                    )}
                    {news.datasetUrl && (
                      <a
                        href={news.datasetUrl}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs lg:text-sm font-semibold text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        dataset
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* News / Award 타입 */}
      {(news.category === "news" || news.category === "award") && (
        <div className="space-y-3">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 leading-snug">
            {news.summary}
          </h3>
          {renderDescription(news.description)}
          <div className="flex flex-wrap items-center gap-2 justify-end">
            {news.paperUrl && (
              <a
                href={news.paperUrl}
                className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs lg:text-sm font-semibold text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                paper
              </a>
            )}
            {news.link && (
              <a
                href={news.link}
                className="inline-flex items-center px-4 py-2 rounded-full bg-sky-50 border border-sky-200 text-sm font-semibold text-sky-700 hover:bg-sky-100 hover:border-sky-300 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Read the full story
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Loading news...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden">
      {/* lg에서는: 제목(좌) + 상세(우) 상단 정렬 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto,1fr] gap-6 lg:gap-10 h-full min-h-0">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 lg:mb-0 lg:col-start-1 lg:row-start-1">
          <span className="relative inline-block px-2">
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-[0.22em] h-[0.72em] rounded-sm -skew-x-12 bg-emerald-200/70"
            />
            <span className="relative">Lab News</span>
          </span>
        </h2>

        {/* 왼쪽: 뉴스 목록 (스크롤 가능) */}
        <div className="lg:col-start-1 lg:row-start-2 lg:overflow-y-auto lg:min-h-0 overflow-y-auto max-h-[60vh] lg:max-h-none">
          <ul className="pr-2 divide-y-2 divide-gray-300">
            {newsData.map((item: NewsItem) => {
              const style = categoryStyles[item.category];
              const isSelected = item._id === selectedId;

              return (
                <li key={item._id} className="py-2">
                  <button
                    onClick={() => handleNewsClick(item._id)}
                    aria-selected={isSelected}
                    className={`relative w-full text-left px-4 py-4 rounded-none transition-colors duration-200 flex items-center gap-4 group cursor-pointer ${
                      isSelected ? "bg-transparent" : "bg-transparent"
                    }`}
                  >
                    {/* 선택 상태 표시 바 */}
                    <span
                      className={`absolute inset-y-2 left-2 w-0.5 rounded-full transition-all ${
                        isSelected ? style.bg.replace("100", "400") : "bg-transparent"
                      }`}
                    />

                    <div className="flex flex-col gap-1 pl-2 flex-1">
                      <div className="flex items-center gap-3">
                        {/* 날짜 */}
                        <span className="text-sm lg:text-base tracking-wide text-gray-500 font-medium tabular-nums shrink-0">
                          {item.date}
                        </span>

                        {/* 카테고리 태그 */}
                        <span
                          className={`shrink-0 px-3 py-1 rounded-full text-[13px] font-semibold ${style.bg} ${style.text}`}
                        >
                          {style.label}
                        </span>
                      </div>

                      {/* 요약 */}
                      <span
                        className={`text-base lg:text-lg leading-relaxed transition-colors line-clamp-2 ${
                          isSelected
                            ? "text-gray-900 font-semibold"
                            : "text-gray-700 group-hover:text-gray-900"
                        }`}
                      >
                        {item.summary}
                      </span>
                    </div>

                    {/* 클릭 가능 아이콘 */}
                    <div className="flex-shrink-0 self-center">
                      <svg
                        className={`w-5 h-5 transition-all duration-200 ${
                          isSelected
                            ? "text-gray-900 translate-x-1"
                            : "text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 오른쪽: 상세 패널 (데스크탑) */}
        <div className="hidden lg:flex lg:col-start-2 lg:row-start-1 lg:row-span-2 items-start min-h-0">
          {selectedNews && (
            <div className="px-5 pb-5 pt-2 lg:px-7 lg:pb-7 lg:pt-3 w-full lg:h-full lg:overflow-y-auto lg:min-h-0">
              {renderNewsDetail(selectedNews)}
            </div>
          )}
        </div>
      </div>

      {/* 모바일 모달 */}
      {isMobileModalOpen && selectedNews && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-[90vw] !max-w-[90vw] lg:max-w-lg max-h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
            style={{ width: "90vw", maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 내용 (스크롤 가능) */}
            <div className="px-4 pb-3 pt-3 overflow-y-auto flex-1">
              {/* 카테고리 + 닫기 버튼 한 줄 */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    categoryStyles[selectedNews.category].bg
                  } ${categoryStyles[selectedNews.category].text}`}
                >
                  {categoryStyles[selectedNews.category].label}
                </span>
                <button
                  onClick={closeModal}
                  className="p-2 -mr-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {renderNewsDetail(selectedNews, { hideCategory: true })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
