# 진행 상황

## 현재 상태
- AI 대전 모드 확장까지 완료했다.
- 현재 프로젝트는 PvP와 AI 대전 모드를 모두 지원한다.
- AI 모드에서는 백 돌을 AI가 자동으로 두며, 사용자 입력은 AI 턴 동안 잠긴다.
- 규칙 엔진, 상태 전이, AI 의사결정 로직에 대한 자동 테스트가 준비된 상태다.

## 이번에 수행한 작업
- `package.json`을 추가해 React 및 Vite 기반 개발 환경을 구성했다.
- `vite.config.js`를 추가해 React 플러그인 기반 빌드 구성을 설정했다.
- `index.html`, `src/main.jsx`, `src/App.jsx`를 추가해 기본 애플리케이션 진입 구조를 만들었다.
- `src/styles/reset.css`, `src/styles/globals.css`를 추가해 기본 전역 스타일과 초기 UI 셸을 구성했다.
- `src/components`, `src/game`, `src/hooks`, `src/styles`, `tests/game`, `public` 디렉터리 구조를 정리했다.
- `.gitignore`를 추가해 `node_modules`와 `dist`가 버전 관리에 포함되지 않도록 했다.
- `src/game/constants.js`에 보드 크기, 플레이어 상수, 방향 벡터, 초기 배치, 상태 메시지를 정의했다.
- `src/game/board.js`에 빈 보드 생성, 초기 보드 생성, 범위 검사, 셀 읽기/쓰기 유틸리티를 추가했다.
- `src/game/rules.js`에 유효 수 판별, 뒤집기 계산, 착수 적용, 점수 계산, 종료 판정, 승자 계산을 구현했다.
- `src/game/gameState.js`에 한 턴 진행, 패스 처리, 종료 처리, 재시작 상태 생성 로직을 구현했다.
- `src/game/selectors.js`에 점수와 유효 수 같은 파생 데이터 접근 함수를 추가했다.
- `src/hooks/useOthelloGame.js`를 추가해 React 상태와 게임 상태 전이를 연결했다.
- `src/components/Board.jsx`, `Cell.jsx`, `ScoreBoard.jsx`, `StatusBar.jsx`, `RestartButton.jsx`를 추가했다.
- `src/styles/board.css`, `src/styles/ui.css`를 추가해 실제 게임 화면 레이아웃과 보드 스타일을 구성했다.
- `src/App.jsx`를 실제 게임 화면 조합 역할로 교체했다.
- `package.json`에 `vitest`와 `npm test` 스크립트를 추가했다.
- `tests/game/board.test.js`, `rules.test.js`, `gameState.test.js`를 추가해 보드 유틸리티, 규칙 엔진, 상태 전이를 검증할 수 있게 했다.
- 유효 수 하이라이트와 마지막 착수 위치 강조를 실제 UI에 반영했다.
- `memory-bank/implememtation-plan.md`에 AI 대전 확장 계획을 추가했다.
- `src/game/ai.js`를 추가해 유효 수 중 최적 수를 고르는 휴리스틱 AI를 구현했다.
- `src/game/constants.js`에 게임 모드, AI 플레이어, AI 생각 중 메시지, AI 딜레이 상수를 추가했다.
- `src/hooks/useOthelloGame.js`에 게임 모드 상태, AI 자동 턴 처리, 입력 잠금 흐름을 추가했다.
- `src/components/GameModeSelector.jsx`를 추가해 PvP/AI 모드 전환 UI를 구현했다.
- `src/components/Board.jsx`, `Cell.jsx`에 비활성화 상태를 추가해 AI 턴 입력을 막았다.
- `src/components/ScoreBoard.jsx`, `StatusBar.jsx`, `App.jsx`를 갱신해 AI 모드 정보를 표시하도록 확장했다.
- `src/styles/ui.css`, `src/styles/board.css`를 갱신해 모드 선택 UI와 비활성 보드 표현을 추가했다.
- `tests/game/ai.test.js`를 추가해 AI가 유효한 수를 고르는지와 코너를 우선하는지 검증했다.
- `vite.config.js`에 `base: './'` 설정을 추가해 GitHub Pages의 브랜치 배포 환경에서도 정적 자산 경로가 깨지지 않도록 맞췄다.
- `.github/workflows/deploy.yml`을 추가해 `main` 브랜치 푸시 또는 수동 실행 시 테스트와 빌드를 거쳐 결과물을 `deploy` 브랜치로 배포하도록 구성했다.

## 검증 결과
- `npm install` 완료
- `npm run build` 성공
- 브라우저에서 확인 가능한 최소 React 앱 셸을 준비함
- 초기 보드 기준 흑/백 유효 수 4개씩 생성되는 것을 확인했다.
- 첫 유효 착수 후 점수가 `흑 4`, `백 1`로 계산되는 것을 확인했다.
- 첫 착수 후 다음 턴이 백으로 정상 전환되는 것을 확인했다.
- 실제 UI 연결 이후에도 `npm run build`가 성공하는 것을 확인했다.
- 연속 두 수 진행 후 보드 상태와 현재 턴이 기대값과 일치하는 것을 확인했다.
- `npm test` 실행 결과 3개 테스트 파일, 10개 테스트가 모두 통과했다.
- `npm run build`가 최종 상태에서도 성공했다.
- AI 확장 후 `npm test` 결과 4개 테스트 파일, 12개 테스트가 모두 통과했다.
- AI 확장 후 `npm run build`가 성공했다.
- 초기 보드에서 백 플레이어 AI가 유효한 수를 정상적으로 선택하는 것을 확인했다.
- GitHub Pages 배포 구성을 추가한 뒤에도 `npm test` 결과 4개 테스트 파일, 12개 테스트가 모두 통과했다.
- GitHub Pages 배포 구성을 추가한 뒤에도 `npm run build`가 성공했다.

## 현재 파일 기준 요약
- `AGENTS.md`: 개발 원칙과 기술 스택 기준 문서
- `memory-bank/game-design-document.md`: 게임 기획 및 규칙 기준 문서
- `memory-bank/implememtation-plan.md`: 단계별 구현 계획 문서
- `memory-bank/progress.md`: 현재 작업 이력과 진행 상태 기록
- `memory-bank/architecture.md`: 파일 책임과 구조적 경계 설명 문서
- `src/game/constants.js`: 규칙과 상태에서 공유하는 상수 모음
- `src/game/board.js`: 보드 생성과 기본 조작 유틸리티
- `src/game/rules.js`: 오델로 핵심 규칙 계산 엔진
- `src/game/gameState.js`: 턴 전환과 패스/종료를 포함한 상태 전이 로직
- `src/game/selectors.js`: UI가 사용할 파생 데이터 계산기
- `src/game/ai.js`: AI 수 선택을 담당하는 휴리스틱 모듈
- `src/hooks/useOthelloGame.js`: React에서 사용하는 게임 상태 연결 훅
- `src/components/*`: 보드, 셀, 점수판, 상태바, 재시작 버튼 UI
- `tests/game/*`: 규칙 계층과 상태 전이에 대한 자동 검증

## 다음 단계
- AI 난이도 선택을 추가할 수 있다.
- 현재 휴리스틱 AI를 Minimax 기반으로 교체하거나 병행할 수 있다.
- 사람 선/후공 선택 기능을 추가할 수 있다.
- 필요 시 모바일 UX를 더 다듬고 애니메이션을 추가할 수 있다.
- 주요 기능을 확장할 때마다 이 문서와 `architecture.md`를 함께 갱신한다.
- 이후 주요 변경이 끝날 때마다 이 문서를 지속적으로 업데이트한다.
