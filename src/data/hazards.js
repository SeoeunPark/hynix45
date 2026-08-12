/**
 * HARD 모드 방해 아이콘 — 잡으면 효과 발동, 피하면 패널티 없음
 */
export const HAZARD_TYPES = {
  bomb: {
    id: 'bomb',
    emoji: '💣',
    label: '폭탄',
    bg: '#3D2024',
    border: 'rgba(226, 0, 31, 0.5)',
    gameOver: true,
    gameOverTitle: '폭탄을 받았어요!',
    gameOverSub: '방해 아이콘은 피해서 받지 마세요.',
  },
  clock: {
    id: 'clock',
    emoji: '⏱️',
    label: '시계',
    bg: '#3D2E18',
    border: 'rgba(240, 121, 29, 0.55)',
    speedMultiplier: 1.55,
    duration: 4000,
    floatText: '가속!',
  },
  dust: {
    id: 'dust',
    emoji: '💨',
    label: '먼지',
    bg: '#3A3836',
    border: 'rgba(140, 131, 128, 0.55)',
    duration: 2800,
    floatText: '시야 방해!',
  },
};

export const HAZARD_POOL = [
  { type: 'bomb', weight: 0.28 },
  { type: 'clock', weight: 0.36 },
  { type: 'dust', weight: 0.36 },
];

export function pickHazardType(pool = HAZARD_POOL) {
  const total = pool.reduce((sum, h) => sum + h.weight, 0);
  let roll = Math.random() * total;
  for (const entry of pool) {
    roll -= entry.weight;
    if (roll <= 0) return entry.type;
  }
  return pool[pool.length - 1].type;
}
