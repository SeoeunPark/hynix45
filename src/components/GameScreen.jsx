import { useEffect, useRef, useState, useCallback } from 'react';
import { GameEngine } from '../game/GameEngine';
import cheerImg from '../assets/mascot-cheer.png';
import { soundManager } from '../utils/sound';
import HUD from './HUD';
import './GameScreen.css';

export default function GameScreen({ difficulty, onGameEnd }) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [hudState, setHudState] = useState({
    correctCount: 0,
    speedUpFlash: false,
  });
  const [overlay, setOverlay] = useState(null);

  const handleUpdate = useCallback((state) => {
    setHudState({
      correctCount: state.correctCount,
      speedUpFlash: state.speedUpFlash,
    });
  }, []);

  const handleCorrect = useCallback(() => {
    soundManager.playCorrect();
  }, []);

  const handleClear = useCallback(
    (result) => {
      soundManager.playClear();
      setOverlay({ type: 'clear', ...result });
      setTimeout(() => {
        engineRef.current?.stop();
        onGameEnd({ ...result, reason: 'clear' });
      }, 900);
    },
    [onGameEnd],
  );

  const handleGameOver = useCallback(
    (result) => {
      soundManager.playWrong();
      setOverlay({ type: 'over', ...result });
      setTimeout(() => {
        engineRef.current?.stop();
        onGameEnd(result);
      }, 1100);
    },
    [onGameEnd],
  );

  useEffect(() => {
    soundManager.init();
    soundManager.playStart();

    const canvas = canvasRef.current;
    const engine = new GameEngine(canvas, difficulty, {
      onUpdate: handleUpdate,
      onCorrect: handleCorrect,
      onWrong: () => {},
      onClear: handleClear,
      onGameOver: handleGameOver,
    });

    engineRef.current = engine;
    engine.start();

    return () => {
      engine.stop();
      engineRef.current = null;
    };
  }, [difficulty, handleUpdate, handleCorrect, handleClear, handleGameOver]);

  return (
    <div className="game-screen">
      <div className="game-ambient" aria-hidden="true" />
      <HUD
        correctCount={hudState.correctCount}
        difficulty={difficulty}
        speedUpFlash={hudState.speedUpFlash}
      />
      <div className="game-area">
        <div className="game-area-glow" aria-hidden="true" />
        <canvas ref={canvasRef} className="game-canvas" />
        {overlay?.type === 'over' && (
          <div className="game-overlay overlay-over">
            {overlay.wrongWord && (
              <p className="overlay-word">{overlay.wrongWord}</p>
            )}
            <h2 className="overlay-title">SKMS에 해당하지 않는 단어에요</h2>
            {overlay.wrongExplanation && (
              <p className="overlay-explanation">{overlay.wrongExplanation}</p>
            )}
            <p className="overlay-sub">다시 도전해볼까요?</p>
          </div>
        )}
        {overlay?.type === 'clear' && (
          <div className="game-overlay overlay-clear">
            <img
              src={cheerImg}
              alt=""
              className="overlay-cheer"
              draggable={false}
              aria-hidden="true"
            />
            <p className="overlay-clear-badge">WELCOME TO ONE TEAM</p>
            <h2 className="overlay-title overlay-title-shine">
              <span className="overlay-title-line">행복한 구성원</span>
              <span className="overlay-title-line">여러분을 환영합니다!</span>
            </h2>
            <p className="overlay-clear-sub">SKMS 키워드를 모두 맞추셨어요.</p>
            <p className="overlay-sub">이제 One Team의 일원입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
