## Next.js 프론트 수정 가이드

이 문서는 `web/` 폴더의 Next.js 프론트엔드를 수정할 때 참고용입니다.

### 주요 폴더
- `web/app`: 각 페이지 라우트 (`page.tsx`) 및 레이아웃
- `web/components`: 공용 UI 컴포넌트 (헤더, 푸터, 카드, 섹션 등)

### 자주 하는 작업 예시
- 메인 페이지 섹션 수정: `web/app/page.tsx`
- 연구 페이지 탭/내용 수정: `web/components/AboutResearchTabs.tsx`
- 뉴스/블로그 카드 스타일 변경: `web/components/NewsSection.tsx`, `web/components/BlogCard.tsx`

### 기본 워크플로우
1. 로컬 서버 실행  
   ```bash
   cd web
   npm run dev  # http://localhost:3000
   ```
2. 브라우저에서 http://localhost:3000 에 접속해 수정 사항을 실시간으로 확인합니다.  
3. 수정이 끝나면 Git에 커밋하고 GitHub에 `git push` 하면, Vercel이 자동으로 빌드·배포를 진행합니다.

