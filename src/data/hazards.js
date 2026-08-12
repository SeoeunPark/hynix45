/**
 * HARD 모드 방해 아이콘 — 잡으면 효과 발동, 피하면 패널티 없음
 */
import bombImg from '../assets/hazard-bomb.svg';
import clockImg from '../assets/hazard-clock.svg';
import dustImg from '../assets/hazard-dust.svg';

export const HAZARD_TYPES = {
  bomb: {
    id: 'bomb',
    label: '폭탄',
    image: bombImg,
    gameOver: true,
    gameOverTitle: '폭탄을 받았어요!',
    gameOverSub: '방해 아이콘은 피해서 받지 마세요.',
  },
  clock: {
    id: 'clock',
    label: '시계',
    image: clockImg,
    speedMultiplier: 1.55,
    duration: 4000,
    floatText: '가속!',
  },
  dust: {
    id: 'dust',
    label: '먼지',
    image: dustImg,
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
