import React from 'react'
import type {LayoutProps} from 'sanity'

const wideFormStyles = `
  /* Field actions "..." 버튼 숨기기 */
  [data-ui="FieldActionsMenu"],
  [data-testid="field-actions"],
  button[aria-label="Open field actions"],
  button[aria-label="Field actions"] {
    display: none !important;
  }

  /* 문서 편집기 내부 form과 모든 부모 컨테이너 너비 확장 */
  [id^="documentEditor-"] form,
  [id^="documentEditor-"] form > div,
  [id^="documentEditor-"] > div > div > div > div > div > div > div > div > div > form {
    max-width: 100% !important;
    width: 100% !important;
  }

  /* form의 부모 컨테이너들 (styled-components) */
  [id^="documentEditor-"] > div > div > div > div > div > div,
  [id^="documentEditor-"] > div > div > div > div > div > div > div,
  [id^="documentEditor-"] > div > div > div > div > div > div > div > div,
  [id^="documentEditor-"] > div > div > div > div > div > div > div > div > div {
    max-width: 100% !important;
    width: 100% !important;
  }

  /* FormBuilderInput 컨테이너 너비 확장 */
  [data-ui="FormBuilderInput"],
  [data-ui="FormFieldSet"] {
    max-width: 100% !important;
  }

  /* 폼 전체 컨테이너 */
  [data-testid="document-panel-scroller"] > div > div,
  [data-testid="document-panel-scroller"] form {
    max-width: 100% !important;
  }

  /* 입력 필드들의 직접적인 컨테이너 */
  [data-testid="document-panel-scroller"] [data-ui="Card"] {
    max-width: 100% !important;
  }

  /* 스택/그리드 레이아웃 */
  [data-testid="document-panel-scroller"] [data-ui="Stack"][data-as="div"] {
    max-width: 100% !important;
  }

  /* Portable Text 에디터 너비 확장 */
  [data-testid="pt-editor"],
  [data-testid="pt-editor"] > div,
  [data-slate-editor="true"],
  [data-slate-node="element"],
  .pt-editable,
  [data-ui="TextBlock"],
  [data-ui="TextBlock"] > div {
    max-width: 100% !important;
    width: 100% !important;
  }

  /* Body Portable Text 세로 높이 여유 있게 확보 */
  [data-testid="field-body"] [data-slate-editor="true"],
  [data-testid="field-body"] .pt-editable {
    min-height: 320px !important; /* 대략 8~10줄 정도 높이 */
  }

  /* Portable Text 컨테이너 */
  [data-testid="field-body"] > div,
  [data-testid="field-body"] [data-ui="Card"],
  [data-testid="field-body"] [data-ui="Stack"] {
    max-width: 100% !important;
    width: 100% !important;
  }

  /* Array input (body 필드) 컨테이너 */
  [data-testid="input-body"],
  [data-testid="input-body"] > div {
    max-width: 100% !important;
    width: 100% !important;
  }

  /* Body Portable Text 안의 이미지 블록을 컴팩트하게 표시 */
  /* 에디터 본문 안의 이미지만 숨기고, 별도 이미지 편집 모달의 이미지는 그대로 두기 위해 input-body 범위로 한정 */
  [data-testid="input-body"] [data-slate-editor="true"] img {
    display: none !important;
  }

  /* 이미지/코드 박스가 입력란 너비를 넘지 않도록 제한 */
  [data-testid="input-body"] [data-slate-editor="true"] [contenteditable="false"] {
    max-width: 90% !important;
    width: 90% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    box-sizing: border-box !important;
  }
  
  /* 내부 카드 요소도 너비 제한 */
  [data-testid="input-body"] [data-slate-editor="true"] [data-ui="Card"] {
    max-width: 100% !important;
    width: 100% !important;
    padding-top: 4px !important;
    padding-bottom: 4px !important;
    min-height: 0 !important;
    box-sizing: border-box !important;
  }
`

export function CustomStudioLayout(props: LayoutProps) {
  const {renderDefault} = props

  return (
    <>
      <style>{wideFormStyles}</style>
      <div
        style={{
          // Sanity 내부 패널/리스트가 부모 높이를 기준으로 flex/stretch 되기 때문에
          // 최상위 래퍼는 반드시 뷰포트 높이를 잡아줘야 함.
          // (height가 없으면 리스트 영역이 내용 높이만큼만 렌더되어 하단이 비어 보일 수 있음)
          height: '100dvh',
          minHeight: '100vh',
          maxWidth: '100%',
          margin: '0 auto',
          width: '100%',
          padding: '0 16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          // flex 자식의 스크롤 영역이 잘리지 않게
          // (Safari/Chromium에서 min-height 기본값 때문에 스크롤이 깨지는 케이스 방지)
          // 참고: minHeight는 위에서 이미 '100vh'로 잡고 있으므로 여기선 지정하지 않음
        }}
      >
        {renderDefault(props)}
      </div>
    </>
  )
}

