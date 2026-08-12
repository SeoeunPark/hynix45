# ONE TEAM : SKMS Word Basket

SK hynix 신입구성원 One Team Mindset 교육용 웹게임

## 실행 방법

```bash
npm install
npm run dev
```

## 빌드 및 배포

```bash
npm run build
npm run preview
```

`dist/` 폴더를 정적 웹 호스팅(Netlify, Vercel, S3 등)에 배포하면 됩니다.

## 프로젝트 구조

```
src/
├── components/     # UI 화면 (Start, Game, Result, HUD)
├── data/           # 키워드 및 난이도 설정 (수정 용이)
├── game/           # 게임 엔진, 충돌, 스폰, 입력
├── utils/          # 사운드, localStorage
└── App.jsx
```

## 단어 데이터 수정

`src/data/keywords.js` 파일에서 단어를 추가/삭제/수정할 수 있습니다.

## 난이도 조정

`src/data/difficulty.js` 파일에서 EASY/HARD 설정값을 조정할 수 있습니다.

## 조작 방법

| 입력 | 동작 |
|------|------|
| ← / → / A / D | 바구니 좌우 이동 (PC) |
| 마우스 | 바구니가 마우스 위치를 따라감 (PC) |
| 터치/드래그 | 바구니 좌우 이동 (모바일) |

## 게임 규칙

- SKMS 관련 **맞는 단어**를 받으면 점수 획득 (+1 또는 +5)
- **틀린 단어**를 받으면 즉시 GAME OVER
- 맞는 단어 **20개** 획득 시 GAME CLEAR
- 맞는 단어를 받을 때마다 낙하 속도 증가
