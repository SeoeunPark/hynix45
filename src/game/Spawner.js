import { correctWords, incorrectWords, fivePointWords, onePointWords } from '../data/keywords';

/**
 * 단어 생성 및 랜덤 선택
 */
export function pickWord(correctProbability, fivePointWeight) {
  const isCorrect = Math.random() < correctProbability;

  if (isCorrect) {
    const useFivePoint = Math.random() < fivePointWeight;
    const pool = useFivePoint && fivePointWords.length > 0 ? fivePointWords : onePointWords;
    const idx = Math.floor(Math.random() * pool.length);
    return { ...pool[idx] };
  }

  const idx = Math.floor(Math.random() * incorrectWords.length);
  return { ...incorrectWords[idx] };
}

export function createWordEntity(keywordData, canvasWidth, wordScale, ctx) {
  const fontSize = Math.round(14 * wordScale);
  ctx.font = `600 ${fontSize}px "Pretendard", "Noto Sans KR", sans-serif`;
  const textWidth = ctx.measureText(keywordData.word).width;
  const padding = 20 * wordScale;
  const width = Math.max(textWidth + padding, 70 * wordScale);
  const height = 36 * wordScale;

  const margin = width / 2 + 8;
  const x = margin + Math.random() * (canvasWidth - margin * 2);

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    word: keywordData.word,
    correct: keywordData.correct,
    points: keywordData.points,
    explanation: keywordData.explanation ?? '',
    x,
    y: -height,
    width,
    height,
    fontSize,
  };
}

export { correctWords, incorrectWords };
