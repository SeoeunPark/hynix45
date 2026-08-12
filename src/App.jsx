import { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { CLEAR_TARGET } from './data/keywords';
import { saveBestScore, getBestScores } from './utils/storage';
import { soundManager } from './utils/sound';
import './App.css';

const SCREENS = {
  START: 'start',
  PLAYING: 'playing',
  RESULT: 'result',
};

const DEV_CLEAR_PREVIEW =
  import.meta.env.DEV &&
  new URLSearchParams(window.location.search).get('preview') === 'clear';

const DEV_CLEAR_RESULT = {
  reason: 'clear',
  correctCount: CLEAR_TARGET,
  difficulty: 'easy',
  isNewBest: true,
};

export default function App() {
  const [screen, setScreen] = useState(DEV_CLEAR_PREVIEW ? SCREENS.RESULT : SCREENS.START);
  const [difficulty, setDifficulty] = useState('easy');
  const [gameResult, setGameResult] = useState(DEV_CLEAR_PREVIEW ? DEV_CLEAR_RESULT : null);

  const handleStart = useCallback((diff) => {
    soundManager.init();
    soundManager.resume();
    setDifficulty(diff);
    setGameResult(null);
    setScreen(SCREENS.PLAYING);
  }, []);

  const handleGameEnd = useCallback((result) => {
    const before = getBestScores();
    const prevBest = before[result.difficulty];
    const isNewBest = prevBest === null || result.correctCount > prevBest;
    saveBestScore(result.difficulty, result.correctCount);
    setGameResult({ ...result, isNewBest });
    setScreen(SCREENS.RESULT);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameResult(null);
    setScreen(SCREENS.PLAYING);
  }, []);

  const handleRestart = useCallback(() => {
    setGameResult(null);
    setScreen(SCREENS.START);
  }, []);

  return (
    <div className="app">
      {screen === SCREENS.START && <StartScreen onStart={handleStart} />}
      {screen === SCREENS.PLAYING && (
        <GameScreen difficulty={difficulty} onGameEnd={handleGameEnd} />
      )}
      {screen === SCREENS.RESULT && gameResult && (
        <ResultScreen
          result={gameResult}
          onRestart={handleRestart}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
