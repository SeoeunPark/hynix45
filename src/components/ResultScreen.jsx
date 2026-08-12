import { CLEAR_TARGET } from '../data/keywords';
import { getBestScores } from '../utils/storage';
import cheerImg from '../assets/mascot-cheer.png';
import './ResultScreen.css';

function highlightSkms(text) {
  if (!text) return null;
  return text.split(/(SKMS)/g).map((part, index) =>
    part === 'SKMS' ? (
      <span key={index} className="result-skms">
        SKMS
      </span>
    ) : (
      part
    ),
  );
}

export default function ResultScreen({ result, onRestart, onPlayAgain }) {
  const best = getBestScores();
  const isClear = result.reason === 'clear';
  const diffLabel = result.difficulty === 'easy' ? 'EASY' : 'HARD';
  const currentBest = best[result.difficulty];
  const progressPct = Math.min((result.correctCount / CLEAR_TARGET) * 100, 100);

  return (
    <div className="result-screen">
      <div className="result-ambient" aria-hidden="true" />

      <div className="result-content">
        <div className="result-frame">
          <div className="result-frame-inner">
            <div className="result-scroll">
              <div className={`result-main ${isClear ? 'result-main--clear' : ''}`}>
              <header className="result-header">
                <p className="result-brand">{isClear ? 'WELCOME TO ONE TEAM' : 'GAME OVER'}</p>
                <h1 className={`result-title ${isClear ? 'result-title--clear result-title--shine' : ''}`}>
                  {isClear ? (
                    <>
                      <span className="result-title-line">행복한 구성원</span>
                      <span className="result-title-line">여러분을 환영합니다!</span>
                    </>
                  ) : (
                    <>
                      <span className="result-skms">SKMS</span>에 해당하지 않는 단어에요
                    </>
                  )}
                </h1>
                <p className="result-subtitle">
                  {isClear
                    ? 'SKMS 키워드를 모두 맞추셨어요. 이제 One Team의 일원입니다.'
                    : '다시 도전해볼까요?'}
                </p>
              </header>

              {isClear && (
                <img
                  src={cheerImg}
                  alt=""
                  className="result-cheer"
                  draggable={false}
                  aria-hidden="true"
                />
              )}

              {!isClear && (
                <section className="result-panel">
                  {result.wrongWord && (
                    <>
                      <div className="result-word-block">
                        <span className="result-word-label">선택한 단어</span>
                        <strong className="result-word-value">{result.wrongWord}</strong>
                        {result.wrongExplanation && (
                          <p className="result-explanation">{highlightSkms(result.wrongExplanation)}</p>
                        )}
                      </div>
                      <div className="result-divider" />
                    </>
                  )}

                  <div className="result-count-block">
                    <span className="result-count-label">맞춘 개수</span>
                    <p className="result-count-value">
                      {result.correctCount}
                      <span className="result-count-unit">개</span>
                    </p>
                    <p className="result-count-sub">목표 {CLEAR_TARGET}개</p>
                  </div>

                  <div
                    className="result-progress result-progress--hero"
                    role="progressbar"
                    aria-valuenow={result.correctCount}
                    aria-valuemin={0}
                    aria-valuemax={CLEAR_TARGET}
                  >
                    <div className="result-progress-fill" style={{ width: `${progressPct}%` }} />
                  </div>

                  <div className="result-divider" />

                  <div className="result-stats">
                    <div className="result-stat">
                      <span className="result-stat-label">난이도</span>
                      <span className={`result-stat-value result-stat-value--${result.difficulty}`}>
                        {diffLabel}
                      </span>
                    </div>
                    <div className="result-stat">
                      <span className="result-stat-label">{diffLabel} BEST</span>
                      <span className="result-stat-value">
                        {currentBest !== null ? `${currentBest}개` : '-'}
                      </span>
                    </div>
                  </div>

                  {result.isNewBest && (
                    <p className="result-new-best">최고 기록을 경신했어요</p>
                  )}
                </section>
              )}

              {isClear && (
                <p className="result-quote">
                  &ldquo;<span className="result-skms">SKMS</span>를 마음에 새기고, SK hynix와 함께 성장해요.&rdquo;
                </p>
              )}
              </div>
            </div>

            <div className="result-actions">
              <button type="button" className="btn-secondary" onClick={onRestart}>
                메인 화면으로
              </button>
              <button type="button" className="btn-primary" onClick={onPlayAgain}>
                다시 하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
