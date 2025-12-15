/**
 * 연구 분야 카드 컴포넌트
 * 재사용 가능한 연구 분야 카드
 */

export interface ResearchAreaCardProps {
  /** 연구 분야 제목 */
  title: string;
  /** 세부 연구 주제 목록 */
  topics: string[];
}

export default function ResearchAreaCard({
  title,
  topics,
}: ResearchAreaCardProps) {
  return (
    <div className="py-8 border-b border-gray-200 first:border-t">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16">
        {/* 왼쪽: 제목 */}
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight lg:w-[420px] lg:flex-shrink-0">
          {title}
        </h3>

        {/* 오른쪽: 토픽 태그들 (세로 정렬) */}
        <div className="flex flex-col gap-3 flex-1">
          {topics.map((topic, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors w-fit"
            >
              {`• ${topic}`}
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

