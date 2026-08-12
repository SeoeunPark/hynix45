/**
 * 난이도 설정 - 플레이 테스트를 통해 조정 가능
 */
const sharedGameplay = {
  initialSpeed: 2.8,
  speedIncrease: 0.32,
  maxSpeed: 8.5,
  spawnInterval: 1150,
  maxWordsOnScreen: 4,
  wordScale: 0.88,
  basketScale: 0.8,
  fivePointWeight: 0.15,
  hintUntilCount: 10,
};

export const difficultySettings = {
  easy: {
    ...sharedGameplay,
    correctProbability: 0.6,
    hazardsEnabled: false,
  },
  hard: {
    ...sharedGameplay,
    correctProbability: 0.48,
    hazardsEnabled: true,
    hazardSpawnInterval: 2600,
    maxHazardsOnScreen: 2,
    hazardSize: 44,
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
