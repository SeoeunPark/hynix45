/**
 * 난이도 설정 - 플레이 테스트를 통해 조정 가능
 */
export const difficultySettings = {
  easy: {
    initialSpeed: 2.8,
    speedIncrease: 0.32,
    maxSpeed: 8.5,
    spawnInterval: 1150,
    maxWordsOnScreen: 4,
    correctProbability: 0.6,
    wordScale: 0.94,
    basketScale: 0.82,
    fivePointWeight: 0.15,
    hintUntilCount: 10,
  },
  hard: {
    initialSpeed: 3.6,
    speedIncrease: 0.38,
    maxSpeed: 9,
    spawnInterval: 980,
    maxWordsOnScreen: 5,
    correctProbability: 0.48,
    wordScale: 0.78,
    basketScale: 0.76,
    fivePointWeight: 0.15,
    hintUntilCount: 0,
  },
};

export const GAME_CONSTANTS = {
  basketWidth: 100,
  basketHeight: 34,
  basketImageScale: 1.42,
  basketImageAnchorY: 0.26,
  basketBottomPadding: 12,
  basketSidePadding: 12,
  wordMinWidth: 70,
  wordHeight: 36,
  speedUpFlashDuration: 800,
  particleCount: 12,
  particleDuration: 600,
  floatTextDuration: 900,
};
