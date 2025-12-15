import BlogCard from "@/components/BlogCard";

/**
 * /blogs 페이지
 * 홈페이지와 동일한 블로그 카드 스타일 사용
 */

const blogPosts = [
  {
    title: "The Future of Web Development",
    description: "Exploring the latest trends in frontend and backend technologies, including AI-powered tooling and modern frameworks.",
    date: "03 Dec 2024",
    thumbnail: "/placeholder.png",
    category: "Design Systems",
    author: "Lab Member",
  },
  {
    title: "Advancing Large Language Models",
    description: "How knowledge integration, reasoning, and evaluation frameworks are shaping the next generation of LLMs.",
    date: "28 Nov 2024",
    thumbnail: "/placeholder.png",
    category: "LLM",
    author: "Lab Member",
  },
  {
    title: "Real-world Data to AI: From Signals to Insights",
    description: "Building robust data pipelines and encoders that power retrieval, recommendation, and decision-making agents.",
    date: "20 Nov 2024",
    thumbnail: "/placeholder.png",
    category: "Data",
    author: "Lab Member",
  },
  {
    title: "On-device AI: Edge-ready Intelligence",
    description: "Designing lightweight, privacy-preserving models that run efficiently on edge devices without sacrificing quality.",
    date: "12 Nov 2024",
    thumbnail: "/placeholder.png",
    category: "Edge AI",
    author: "Lab Member",
  },
];

export default function BlogsPage() {
  const latestPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 py-10 lg:py-12 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Blogs</h1>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="space-y-10">
          {/* 최신 블로그 포스트 - 큰 피처 카드 */}
          <a href="/blogs" className="group block">
            <article className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-5 lg:p-6 rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              {/* 왼쪽: 이미지 */}
              <div className="w-full lg:w-[420px] flex-shrink-0">
                <div className="w-full h-64 sm:h-72 lg:h-60 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={latestPost.thumbnail || "/placeholder.png"}
                    alt={latestPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* 오른쪽: 텍스트 콘텐츠 */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-3">
                  {/* 카테고리와 날짜 */}
                  <div className="flex items-center gap-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                      {latestPost.category}
                    </span>
                    <span className="text-sm text-gray-500">{latestPost.date}</span>
                  </div>

                  {/* 제목 */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {latestPost.title}
                  </h2>

                  {/* 설명 */}
                  <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                    {latestPost.description}
                  </p>

                  {/* 작성자 정보 */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{latestPost.author}</span>
                  </div>
                </div>
              </div>
            </article>
          </a>

          {/* 나머지 블로그 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {otherPosts.map((post, index) => (
              <BlogCard
                key={index + 1}
                category={post.category}
                title={post.title}
                description={post.description}
                author={post.author}
                date={post.date}
                thumbnail={post.thumbnail}
                href="/blogs"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

