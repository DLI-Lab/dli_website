## Sanity 관리자 페이지 UX/UI 수정 가이드

이 문서는 Sanity Studio(관리자 페이지)의 화면 구성과 UX/UI를 수정할 때 참고용입니다.

### 주요 위치
- `studio/components`: 커스텀 입력 컴포넌트 및 프리뷰 컴포넌트
  - 예: `GalleryArrayInput.tsx`, `AuthorReferenceInput.tsx`, `CustomStudioLayout.tsx`
- `studio/sanity.config.ts`: Studio 전역 설정 및 플러그인 구성

### 자주 하는 작업 예시
- 갤러리 이미지를 업로드/정렬하는 입력 UI 수정: `studio/components/GalleryArrayInput.tsx`
- 블로그 저자 선택 UI 커스터마이징: `studio/components/AuthorReferenceInput.tsx`
- Studio 기본 레이아웃(사이드바, 헤더 등) 조정: `studio/components/CustomStudioLayout.tsx`

### 기본 워크플로우
1) 로컬에서 변경 사항 확인  
```bash
cd studio
npx sanity dev  # http://localhost:3333
```
브라우저에서 동작을 확인합니다.

2) 변경 사항 커밋/푸시  
```bash
git add .
git commit -m "update studio ui"
git push
```

3) Studio 배포 (호스팅 반영)  
```bash
cd studio
npx sanity deploy
```
배포 후 https://dli-yonsei.sanity.studio/ 에서 최신 UI가 적용됩니다.

