/**
 * SKMS / One Team Mindset 키워드 데이터
 * 교육 담당자가 단어를 추가/삭제/수정할 수 있도록 분리 관리
 */
export const keywords = [
  // 정답 — 핵심 (스폰 가중치용)
  { word: 'VWBE', correct: true, points: 5, explanation: 'SKMS 핵심 키워드' },
  { word: 'SUPEX', correct: true, points: 5, explanation: 'SKMS 핵심 키워드' },
  { word: 'One team', correct: true, points: 5, explanation: 'SKMS 핵심 키워드' },
  { word: '행복', correct: true, points: 5, explanation: 'SKMS 핵심 키워드' },
  { word: '지속적인 행복', correct: true, points: 5, explanation: 'SKMS 핵심 키워드' },
  { word: '따로 또 같이', correct: true, points: 5, explanation: 'SKMS 핵심 키워드' },

  // 정답 — 일반
  { word: '소통', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '협업', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '신속', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '초기술', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '자발적', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '의욕적', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '자율감', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '유대감', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '관계감', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '패기', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '안전', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '절차준수', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '표준화', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '원칙', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '솔직', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '피드백', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '검증', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: 'Data', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '경청', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '신뢰', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '존중', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '배려', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '과감', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '공유', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: '완결성', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: 'Bar Raising', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: 'AI Driven', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },
  { word: 'Customer Focus', correct: true, points: 1, explanation: 'SKMS 관련 키워드' },

  // 오답 — 정답과 헷갈리기 쉬운 유사 단어·오타
  { word: 'SUPE', correct: false, points: 0, explanation: 'SUPEX의 오타예요. SKMS 핵심 키워드는 SUPEX입니다.' },
  { word: 'SUPREX', correct: false, points: 0, explanation: 'SUPEX의 오타예요. SKMS 핵심 키워드는 SUPEX입니다.' },
  { word: 'VBWE', correct: false, points: 0, explanation: 'VWBE의 철자가 바뀐 표현이에요. SKMS 핵심 키워드는 VWBE입니다.' },
  { word: 'One Time', correct: false, points: 0, explanation: 'One team과 비슷하지만 다른 표현이에요. SKMS 핵심 키워드는 One team입니다.' },
  { word: 'Won Team', correct: false, points: 0, explanation: 'One team의 철자가 바뀐 표현이에요. SKMS 핵심 키워드는 One team입니다.' },
  { word: 'Bar Rising', correct: false, points: 0, explanation: 'Bar Raising과 비슷하지만 다른 표현이에요. SKMS 키워드는 Bar Raising입니다.' },
  { word: 'AI Drive', correct: false, points: 0, explanation: 'AI Driven과 비슷하지만 다른 표현이에요. SKMS 키워드는 AI Driven입니다.' },
  { word: 'Customer First', correct: false, points: 0, explanation: 'Customer Focus와 비슷하지만 다른 표현이에요. SKMS 키워드는 Customer Focus입니다.' },
  { word: 'Date', correct: false, points: 0, explanation: 'Data와 헷갈리기 쉬운 단어예요. SKMS 키워드는 Data입니다.' },
  { word: '협력', correct: false, points: 0, explanation: '협업과 비슷하지만 SKMS 키워드는 협업입니다.' },
  { word: '지속적 행복', correct: false, points: 0, explanation: '지속적인 행복과 표현이 달라요. SKMS 키워드는 지속적인 행복입니다.' },

  // 오답 — 부정적·해로운 행동·감정
  { word: '포기', correct: false, points: 0, explanation: '포기는 적극적·자발적 SKMS 태도와 맞지 않아요.' },
  { word: '좌절', correct: false, points: 0, explanation: '좌절은 의욕적·패기 있는 SKMS 자세와 맞지 않아요.' },
  { word: '외면', correct: false, points: 0, explanation: '외면은 소통·피드백·솔직한 문화와 맞지 않아요.' },
  { word: '묵인', correct: false, points: 0, explanation: '묵인은 공유·검증하는 SKMS 문화와 맞지 않아요.' },
  { word: '절망', correct: false, points: 0, explanation: '절망은 지속적인 행복과 One Team 마인드와 맞지 않아요.' },
  { word: '고립', correct: false, points: 0, explanation: '고립은 협업·One Team 정신과 맞지 않아요.' },
  { word: '은폐', correct: false, points: 0, explanation: '은폐는 솔직·공유·검증 문화와 맞지 않아요.' },
  { word: '낙담', correct: false, points: 0, explanation: '낙담은 의욕적·패기 있는 SKMS 자세와 맞지 않아요.' },
  { word: '두려움', correct: false, points: 0, explanation: '두려움은 과감·신속한 SKMS 행동과 맞지 않아요.' },
  { word: '고통', correct: false, points: 0, explanation: '고통은 SKMS 키워드가 아니에요.' },
  { word: '후회', correct: false, points: 0, explanation: 'SKMS는 후회보다 검증하고 앞으로 나아가요.' },
  { word: '성희롱', correct: false, points: 0, explanation: '성희롱은 존중·배려·안전 문화와 정면으로 맞지 않아요.' },
  { word: '지각', correct: false, points: 0, explanation: '지각은 신속·절차준수·원칙 준수와 맞지 않아요.' },
  { word: '불안', correct: false, points: 0, explanation: '불안은 자발적·의욕적 SKMS 자세와 맞지 않아요.' },
  { word: '괴롭힘', correct: false, points: 0, explanation: '괴롭힘은 존중·배려·안전 문화와 정면으로 맞지 않아요.' },
  { word: '갑질', correct: false, points: 0, explanation: '갑질은 존중·배려·One Team 문화와 맞지 않아요.' },
  { word: '걱정', correct: false, points: 0, explanation: '걱정은 과감·패기 있는 SKMS 자세와 맞지 않아요.' },
  { word: '비난', correct: false, points: 0, explanation: '비난은 솔직한 피드백·존중 문화와 다릅니다.' },
  { word: '갈등', correct: false, points: 0, explanation: '갈등은 SKMS 키워드가 아니에요.' },
  { word: '분노', correct: false, points: 0, explanation: '분노는 경청·존중·배려와 맞지 않아요.' },
  { word: '질책', correct: false, points: 0, explanation: '질책은 건설적 피드백·존중 문화와 맞지 않아요.' },
  { word: '차별', correct: false, points: 0, explanation: '차별은 존중·배려·One Team 정신과 맞지 않아요.' },
  { word: '탈락', correct: false, points: 0, explanation: '탈락은 SKMS 키워드가 아니에요.' },
  { word: '지옥', correct: false, points: 0, explanation: '지옥은 지속적인 행복과 맞지 않아요.' },
  { word: '무시', correct: false, points: 0, explanation: '무시는 경청·존중·배려와 맞지 않아요.' },
  { word: '파산', correct: false, points: 0, explanation: '파산은 SKMS 키워드가 아니에요.' },
  { word: '번아웃', correct: false, points: 0, explanation: '번아웃은 지속적인 행복·안전 문화와 맞지 않아요.' },
  { word: '실패', correct: false, points: 0, explanation: '실패는 SKMS 키워드가 아니에요.' },
  { word: '배신', correct: false, points: 0, explanation: '배신은 신뢰·One Team·관계감과 맞지 않아요.' },
];

export const CLEAR_TARGET = 20;

export const correctWords = keywords.filter((k) => k.correct);
export const incorrectWords = keywords.filter((k) => !k.correct);
export const fivePointWords = keywords.filter((k) => k.correct && k.points === 5);
export const onePointWords = keywords.filter((k) => k.correct && k.points === 1);
