import { useEffect, useRef, useState } from 'react';
import { CLEAR_TARGET } from '../data/keywords';
import { getBestForDifficulty } from '../utils/storage';
import './HUD.css';

export default function HUD({ correctCount, difficulty, speedUpFlash }) {
  const best = getBestForDifficulty(difficulty);
  const progress = (correctCount / CLEAR_TARGET) * 100;
  const prevCount = useRef(correctCount);
  const [countPulse, setCountPulse] = useState(false);

  useEffect(() => {
    if (correctCount !== prevCount.current) {
      prevCount.current = correctCount;
      setCountPulse(true);
      const timer = setTimeout(() => setCountPulse(false), 150);
      return () => clearTimeout(timer);
    }
  }, [correctCount]);

  return (
    <div className="hud">
      <div className="hud-row">
        <div className="hud-item hud-main">
          <span className="hud-label">맞춘 개수</span>
          <span className={`hud-value ${countPulse || speedUpFlash ? 'hud-pulse' : ''}`}>
            {correctCount}
            <span className="hud-value-sub">/ {CLEAR_TARGET}</span>
          </span>
        </div>
        <div className="hud-item hud-center">
          <span className={`hud-difficulty hud-difficulty--${difficulty}`}>
            {difficulty === 'easy' ? 'EASY' : 'HARD'}
          </span>
        </div>
        <div className="hud-item hud-right">
          <span className="hud-label">BEST</span>
          <span className="hud-value">
            {best !== null ? (
              <>
                {best}
                <span className="hud-value-sub">개</span>
              </>
            ) : (
              '-'
            )}
          </span>
        </div>
      </div>
      <div className="hud-progress-track">
        <div
          className={`hud-progress-fill ${speedUpFlash ? 'progress-flash' : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
