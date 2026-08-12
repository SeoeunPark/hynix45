const STORAGE_KEY = 'skms-word-basket-best';

export function getBestScores() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      easy: data.easy ?? null,
      hard: data.hard ?? null,
      overall: data.overall ?? null,
    };
  } catch {
    return { easy: null, hard: null, overall: null };
  }
}

/** @param {number} correctCount 맞은 단어 수 (0–20) */
export function saveBestScore(difficulty, correctCount) {
  try {
    const current = getBestScores();
    const updated = { ...current };

    if (current[difficulty] === null || correctCount > current[difficulty]) {
      updated[difficulty] = correctCount;
    }
    if (current.overall === null || correctCount > current.overall) {
      updated.overall = correctCount;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getBestScores();
  }
}

export function getBestForDifficulty(difficulty) {
  const scores = getBestScores();
  return scores[difficulty];
}
