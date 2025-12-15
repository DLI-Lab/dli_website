/**
 * 블로그 카드 컴포넌트
 * 재사용 가능한 블로그 포스트 카드
 */

export interface BlogCardProps {
  /** 썸네일 이미지 URL */
  thumbnail?: string;
  /** 카테고리 */
  category: string;
  /** 제목 */
  title: string;
  /** 설명 */
  description: string;
  /** 작성자 이름 */
  author: string;
  /** 작성자 아바타 URL */
  authorAvatar?: string;
  /** 작성 날짜 */
  date: string;
  /** 링크 URL */
  href?: string;
}

export default function BlogCard({
  thumbnail,
  category,
  title,
  description,
  author,
  authorAvatar,
  date,
  href = "#",
}: BlogCardProps) {
  return (
    <a href={href} className="group block">
      <article className="h-full flex flex-col p-3 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1">
        {/* 썸네일 */}
        <div className="relative w-full h-48 sm:h-52 lg:h-48 overflow-hidden rounded-xl bg-gray-100 mb-4">
          <img
            src={thumbnail || "/placeholder.png"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* 콘텐츠 */}
        <div className="flex flex-col flex-1">
          {/* 카테고리 태그 */}
          <span className="inline-block w-fit px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full mb-2.5">
            {category}
          </span>

          {/* 제목 */}
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight mb-2.5 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* 설명 */}
          <p className="text-sm lg:text-base text-gray-600 leading-relaxed line-clamp-2 mb-3.5 flex-1">
            {description}
          </p>

          {/* 작성자 정보 */}
          <div className="flex items-center gap-3 mt-auto">
            {/* 아바타 */}
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={author}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>

            {/* 이름 & 날짜 */}
            <div className="flex flex-col">
              <span className="text-xs lg:text-sm font-semibold text-gray-900">{author}</span>
              <span className="text-xs lg:text-sm text-gray-500">{date}</span>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}

