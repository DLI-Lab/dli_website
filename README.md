## Yonsei DLI Lab Website Repository

- **Code**: Next.js
- **CMS**: Sanity
- **Deployment**: Vercel

### Sanity & Sanity Studio 소개
- **Sanity**: 갤러리, 멤버, 블로그, 뉴스 등 콘텐츠를 저장·관리하면, 웹에 자동 반영되는 CMS입니다.
- **Sanity Studio**: 브라우저에서 콘텐츠를 편집하는 UI
- **적용 방식**: Studio에서 초안 작성 → 퍼블리시 → 웹 자동 업데이트

### Prerequiste
```
node -v   # 18+
npm -v
```
없을 경우:  
- Node.js 설치: https://nodejs.org/ (LTS 권장)  
- macOS Homebrew: `brew install node`  # npm 포함  

### 시작하기
```
git clone https://github.com/DLI-Lab/dli_website.git
cd dli_website

# 패키지 설치
cd web && npm install
cd ../studio && npm install
```

### 환경 변수
```
cd web
cp env.local.example .env.local
# 프로젝트 환경변수는 관리자에게 문의
```

### 로컬 실행
- 웹: `cd web && npm run dev` → http://localhost:3000 (프론트 미리보기)
- 스튜디오: `cd studio && npm run dev` → http://localhost:3333 (콘텐츠 편집용 로컬 Studio)

### 컨텐츠 수정 및 관리
- 주소: https://dli-yonsei.sanity.studio/
- 주요 편집 항목: Member(랩 구성원), Research Area, News, Blog, Publication, Gallery, Sponsors 등

### UX/UI 수정 가이드
- Next.js 프론트 수정: [next-frontend](docs/next-frontend.md)
- Sanity 관리자 페이지 UX/UI 수정: [sanity-admin-ui](docs/sanity-admin-ui.md)


### 컨텐츠 스키마 수정
- 새로운 타입 추가, 기존 필드(attribute) 확장 등: [sanity-schema.md](docs/sanity-schema.md)


