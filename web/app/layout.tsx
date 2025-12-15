import type { Metadata } from "next";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "DLI Lab",
  description: "Research Lab Website",
};

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
