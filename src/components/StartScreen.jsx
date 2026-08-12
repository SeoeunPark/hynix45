import { getBestScores } from '../utils/storage';
import logoImg from '../assets/sk-hynix-logo.png';
import './StartScreen.css';

export default function StartScreen({ onStart }) {
  const best = getBestScores();

  return (
    <div className="start-screen">
      <div className="start-ambient" aria-hidden="true" />

      <div className="start-content">
        <div className="start-frame">
          <div className="start-frame-inner">
            <div className="start-main">
              <div className="start-top">
                <div className="start-logo-wrap">
                  <img src={logoImg} alt="SK hynix" className="start-logo" draggable={false} />
                </div>

                <header className="start-header">
                  <p className="start-brand">45조</p>
                  <h1 className="start-title">
                    <span className="title-sk">SKMS</span>
                    <span className="title-accent">행복바구니</span>
                  </h1>
                  <p className="start-subtitle">
                    SK hynix 신입구성원 · 행복한 구성원으로 거듭나기
                  </p>
                </header>
              </div>

              <div className="start-body">
                <section className="start-difficulty">
                  <h2 className="section-label">
                    <span className="section-label-line" aria-hidden="true" />
                    난이도 선택
                    <span className="section-label-line" aria-hidden="true" />
                  </h2>
                  <div className="difficulty-buttons">
                    <button
                      type="button"
                      className="btn-difficulty btn-easy"
                      onClick={() => onStart('easy')}
                    >
                      <span className="btn-label">EASY</span>
                      <span className="btn-desc">기본 개념 익히기</span>
                {best.easy !== null && (
                  <span className="btn-best">BEST {best.easy}개</span>
                )}
                    </button>
                    <button
                      type="button"
                      className="btn-difficulty btn-hard"
                      onClick={() => onStart('hard')}
                    >
                      <span className="btn-label">HARD</span>
                      <span className="btn-desc">빠른 판단 &amp; 반응</span>
                {best.hard !== null && (
                  <span className="btn-best">BEST {best.hard}개</span>
                )}
                    </button>
                  </div>
                </section>

                <section className="start-rules">
                  <h2 className="section-label">
                    <span className="section-label-line" aria-hidden="true" />
                    게임 방법
                    <span className="section-label-line" aria-hidden="true" />
                  </h2>

                  <div className="rules-panel">
                    <p className="rules-summary">
                      떨어지는 단어 중 <strong>SKMS 관련 단어</strong>만 바구니에 받으세요.
                    </p>

                    <ul className="rules-lines">
                      <li>
                        <span className="rules-dot rules-dot--ok" aria-hidden="true" />
                        맞는 단어 <em>20개</em>를 모으면 클리어
                      </li>
                      <li>
                        <span className="rules-dot rules-dot--no" aria-hidden="true" />
                        비슷해 보여도 정답이 아닌 단어를 받으면 게임 종료
                      </li>
                    </ul>

                    <p className="rules-footnote">
                      맞출수록 단어 낙하 속도가 빨라집니다.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
