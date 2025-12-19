import type { Metadata } from "next";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getSiteSettings } from "@/src/sanity/seoQueries";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  const title = siteSettings?.title || 'DLI Lab - Data & Language Intelligence @ Yonsei University';
  const description = siteSettings?.description || "DLI Lab at Yonsei University empowers AI with real-world data & human language insights. We research LLM, Information Retrieval, Recommender Systems, and User Modeling.";
  
  // 키워드 처리: 문자열(콤마 구분)이든 배열이든 모두 배열로 변환
  let keywords: string[] = [
    "DLI Lab", "Yonsei University", "연세대학교", "Data & Language Intelligence",
    "Large Language Models", "LLM", "Data Mining", "Data Mining Lab",
    "Information Retrieval", "Recommender Systems", 
    "Real-world Data AI", "User Modeling","AI Agents"
  ];

  if (siteSettings?.keywords) {
    if (typeof siteSettings.keywords === 'string') {
      keywords = (siteSettings.keywords as string).split(',').map(k => k.trim());
    } else if (Array.isArray(siteSettings.keywords)) {
      keywords = siteSettings.keywords;
    }
  }

  const ogImage = siteSettings?.openGraphImage || '/team.png';

  return {
    metadataBase: new URL('https://dli.yonsei.ac.kr'),
    title: {
      template: '%s | DLI Lab',
      default: title,
    },
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: 'https://dli.yonsei.ac.kr',
      siteName: 'DLI Lab',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'DLI Lab',
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * 루트 레이아웃
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-white"
        style={{
          fontFamily:
            '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", sans-serif',
        }}
      >
        <SiteHeader />

        {/* 메인 콘텐츠 (헤더 높이만큼 상단 여백) */}
        <div className="flex-1 pt-16 md:pt-20 lg:pt-24">
          {children}
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
