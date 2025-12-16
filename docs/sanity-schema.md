## Sanity 타입(스키마) 추가/수정 가이드

이 문서는 Sanity에서 관리하는 데이터 타입(스키마)을 추가하거나 수정할 때 참고용입니다.

### 주요 위치
- `studio/schemaTypes`: 모든 커스텀 스키마 정의
  - 예: `blogType.ts`, `memberType.ts`, `newsType.ts`, `galleryType.ts`, `researchAreaType.ts`, `publicationType.ts`
- `studio/schemaTypes/index.ts`: 위 스키마들을 모아 Studio에 등록하는 엔트리 파일

### 타입 추가/수정 기본 흐름 (UI 수정과 동일)
1) 로컬 확인  
```bash
cd studio
npx sanity dev  # http://localhost:3333
```
스키마 변경 후 로컬 Studio에서 에러/필드 노출을 확인합니다.

2) 커밋 및 푸시  
```bash
git add .
git commit -m "update sanity schema"
git push
```

3) 스키마 배포  
```bash
cd studio
npx sanity deploy
```
배포 후 https://dli-yonsei.sanity.studio/ 에 반영되며, `web/`은 Sanity API로 최신 필드를 가져옵니다.

