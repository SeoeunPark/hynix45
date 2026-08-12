import { checkCollision } from './Collision';
import { pickWord, createWordEntity } from './Spawner';
import { InputManager } from './InputManager';
import { difficultySettings, GAME_CONSTANTS } from '../data/difficulty';
import { CLEAR_TARGET } from '../data/keywords';
import { BRAND } from '../data/brandColors';
import mascotImg from '../assets/mascot.png';

let idCounter = 0;

function createParticle(x, y, color) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 1.5 + Math.random() * 2.5;
  return {
    id: idCounter++,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 1.5,
    life: GAME_CONSTANTS.particleDuration * 0.75,
    maxLife: GAME_CONSTANTS.particleDuration * 0.75,
    color,
    size: 2 + Math.random() * 2,
  };
}

function createFloatText(x, y, text, color) {
  return {
    id: idCounter++,
    x,
    y,
    text,
    color,
    life: GAME_CONSTANTS.floatTextDuration,
    maxLife: GAME_CONSTANTS.floatTextDuration,
  };
}

export class GameEngine {
  constructor(canvas, difficulty, callbacks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.difficulty = difficulty;
    this.settings = difficultySettings[difficulty];
    this.callbacks = callbacks;

    this.words = [];
    this.particles = [];
    this.floatTexts = [];
    this.running = false;
    this.paused = false;
    this.lastTime = 0;
    this.spawnTimer = 0;
    this.startTime = 0;
    this.rafId = null;

    this.correctCount = 0;
    this.currentSpeed = this.settings.initialSpeed;
    this.speedUpFlash = 0;
    this.lastWrongWord = null;

    this.basket = {
      x: 0,
      y: 0,
      width: GAME_CONSTANTS.basketWidth * this.settings.basketScale,
      height: GAME_CONSTANTS.basketHeight * this.settings.basketScale,
      visualHalfW: GAME_CONSTANTS.basketWidth * this.settings.basketScale / 2,
    };

    this.input = new InputManager(canvas, () => this.getLogicalSize());
    this._resizeObserver = null;
    this.basketImage = new Image();
    this.basketImage.src = mascotImg;
    this.basketImageLoaded = false;
    this.basketImage.onload = () => {
      this.basketImageLoaded = true;
      this.layoutBasket();
    };
    this.bgTime = 0;
    this.dpr = 1;
  }

  getLogicalSize() {
    return {
      width: this.canvas.width / this.dpr,
      height: this.canvas.height / this.dpr,
    };
  }

  getBasketVisualMetrics(basket) {
    const { basketImageScale, basketImageAnchorY } = GAME_CONSTANTS;

    if (this.basketImageLoaded && this.basketImage.width > 0) {
      const imgW = basket.width * basketImageScale;
      const imgH = imgW * (this.basketImage.height / this.basketImage.width);
      return {
        visualHalfW: imgW / 2,
        visualHalfHBelow: imgH * (1 - basketImageAnchorY),
      };
    }

    return {
      visualHalfW: basket.width / 2,
      visualHalfHBelow: basket.height / 2,
    };
  }

  layoutBasket() {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    this.basket.width = GAME_CONSTANTS.basketWidth * this.settings.basketScale;
    this.basket.height = GAME_CONSTANTS.basketHeight * this.settings.basketScale;

    let visual = this.getBasketVisualMetrics(this.basket);
    const maxVisualW = rect.width - GAME_CONSTANTS.basketSidePadding * 2;

    if (visual.visualHalfW * 2 > maxVisualW) {
      const scale = maxVisualW / (visual.visualHalfW * 2);
      this.basket.width *= scale;
      this.basket.height *= scale;
      visual = this.getBasketVisualMetrics(this.basket);
    }

    this.basket.visualHalfW = visual.visualHalfW;
    this.basket.y = rect.height - visual.visualHalfHBelow - GAME_CONSTANTS.basketBottomPadding;

    const halfW = visual.visualHalfW;
    const centerX = rect.width / 2;
    this.basket.x = Math.min(Math.max(centerX, halfW), rect.width - halfW);
  }

  getSpeed() {
    const { initialSpeed, speedIncrease, maxSpeed } = this.settings;
    return Math.min(initialSpeed + this.correctCount * speedIncrease, maxSpeed);
  }

  getSpeedLevel() {
    return Math.round(this.currentSpeed * 10) / 10;
  }

  getPlayTime() {
    if (!this.startTime) return 0;
    return Math.floor((performance.now() - this.startTime) / 1000);
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.max(1, Math.round(rect.width * this.dpr));
    this.canvas.height = Math.max(1, Math.round(rect.height * this.dpr));
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.layoutBasket();
  }

  start() {
    this.running = true;
    this.paused = false;
    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.spawnTimer = 500;
    this.input.attach();
    this.resize();

    this._resizeObserver = new ResizeObserver(() => this.resize());
    this._resizeObserver.observe(this.canvas.parentElement);

    this._onViewportResize = () => this.resize();
    window.visualViewport?.addEventListener('resize', this._onViewportResize);
    window.visualViewport?.addEventListener('scroll', this._onViewportResize);
    requestAnimationFrame(() => this.resize());

    this.rafId = requestAnimationFrame((t) => this.loop(t));
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.input.detach();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._onViewportResize) {
      window.visualViewport?.removeEventListener('resize', this._onViewportResize);
      window.visualViewport?.removeEventListener('scroll', this._onViewportResize);
      this._onViewportResize = null;
    }
  }

  loop(timestamp) {
    if (!this.running) return;

    const dt = Math.min(timestamp - this.lastTime, 50);
    this.lastTime = timestamp;

    if (!this.paused) {
      this.update(dt, timestamp);
    }
    this.render();

    this.rafId = requestAnimationFrame((t) => this.loop(t));
  }

  update(dt, timestamp) {
    const { width: w, height: h } = this.getLogicalSize();

    this.currentSpeed = this.getSpeed();
    this.bgTime += dt;
    this.input.updateBasket(this.basket, w, dt);

    // Spawn words
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0 && this.words.length < this.settings.maxWordsOnScreen) {
      const keyword = pickWord(this.settings.correctProbability, this.settings.fivePointWeight);
      const word = createWordEntity(keyword, w, this.settings.wordScale, this.ctx);
      this.words.push(word);
      this.spawnTimer = this.settings.spawnInterval * (0.7 + Math.random() * 0.6);
    }

    // Move words
    const fallSpeed = this.currentSpeed * (dt / 16);
    for (let i = this.words.length - 1; i >= 0; i--) {
      const word = this.words[i];
      word.y += fallSpeed;

      if (checkCollision(word, this.basket)) {
        this.handleCatch(word);
        this.words.splice(i, 1);
        continue;
      }

      if (word.y - word.height / 2 > h + 20) {
        this.words.splice(i, 1);
      }
    }

    // Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.life -= dt;
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    // Float texts
    for (let i = this.floatTexts.length - 1; i >= 0; i--) {
      const ft = this.floatTexts[i];
      ft.y -= 0.8;
      ft.life -= dt;
      if (ft.life <= 0) this.floatTexts.splice(i, 1);
    }

    if (this.speedUpFlash > 0) {
      this.speedUpFlash -= dt;
    }

    this.callbacks.onUpdate({
      correctCount: this.correctCount,
      speedUpFlash: this.speedUpFlash > 0,
    });
  }

  handleCatch(word) {
    if (word.correct) {
      this.correctCount += 1;

      const color = BRAND.red;
      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
        this.particles.push(createParticle(word.x, word.y, i % 2 === 0 ? BRAND.red : BRAND.orange));
      }

      this.speedUpFlash = GAME_CONSTANTS.speedUpFlashDuration;
      this.callbacks.onCorrect();

      if (this.correctCount >= CLEAR_TARGET) {
        this.paused = true;
        this.callbacks.onClear({
          correctCount: this.correctCount,
          difficulty: this.difficulty,
        });
      }
    } else {
      this.lastWrongWord = word.word;
      this.paused = true;
      this.callbacks.onWrong(word.word);
      this.callbacks.onGameOver({
        correctCount: this.correctCount,
        difficulty: this.difficulty,
        wrongWord: word.word,
        wrongExplanation: word.explanation,
        reason: 'over',
      });
    }
  }

  render() {
    const ctx = this.ctx;
    const { width: w, height: h } = this.getLogicalSize();

    this.drawBackground(ctx, w, h);

    for (const word of this.words) {
      this.drawWord(ctx, word);
    }

    this.drawBasket(ctx, this.basket);

    for (const p of this.particles) {
      const alpha = p.life / p.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    for (const ft of this.floatTexts) {
      const alpha = ft.life / ft.maxLife;
      ctx.globalAlpha = alpha;
      ctx.font = '700 22px "Pretendard", sans-serif';
      ctx.fillStyle = ft.color;
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.globalAlpha = 1;
    }

    if (this.speedUpFlash > 0) {
      const alpha = Math.min(this.speedUpFlash / 400, 1) * 0.95;
      ctx.globalAlpha = alpha;
      ctx.font = '700 15px "Pretendard", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = BRAND.red;
      ctx.fillText('SPEED UP!', w / 2, h * 0.32);
      ctx.font = '600 11px "Pretendard", sans-serif';
      ctx.fillStyle = BRAND.orange;
      ctx.fillText('속도가 빨라졌어요', w / 2, h * 0.32 + 18);
      ctx.globalAlpha = 1;
    }
  }

  drawBackground(ctx, w, h) {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.35, BRAND.bgSoft);
    grad.addColorStop(1, '#FFF6F3');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const topGlow = ctx.createRadialGradient(w * 0.5, 0, 0, w * 0.5, 0, w * 0.65);
    topGlow.addColorStop(0, 'rgba(240, 121, 29, 0.07)');
    topGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, w, h);

    const basketGlow = ctx.createRadialGradient(w * 0.5, h * 0.92, 0, w * 0.5, h * 0.92, w * 0.62);
    basketGlow.addColorStop(0, 'rgba(240, 121, 29, 0.12)');
    basketGlow.addColorStop(0.45, 'rgba(226, 0, 31, 0.04)');
    basketGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = basketGlow;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalAlpha = 0.35;
    const dotStep = 26;
    for (let x = dotStep; x < w; x += dotStep) {
      for (let y = dotStep; y < h; y += dotStep) {
        ctx.fillStyle = 'rgba(226, 0, 31, 0.06)';
        ctx.beginPath();
        ctx.arc(x, y, 0.75, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = 'rgba(243, 228, 224, 0.55)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 10]);
    for (const ratio of [0.25, 0.5, 0.75]) {
      const x = w * ratio;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.08);
      ctx.lineTo(x, h * 0.92);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.restore();

    const floorY = h * 0.9;
    const floorGrad = ctx.createLinearGradient(0, floorY - 20, 0, floorY + 24);
    floorGrad.addColorStop(0, 'transparent');
    floorGrad.addColorStop(0.5, 'rgba(240, 121, 29, 0.08)');
    floorGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, floorY - 20, w, 44);
  }

  drawWord(ctx, word) {
    const { x, y, width, height, fontSize, word: text, correct } = word;
    const radius = 18;
    const isCorrect = correct;
    const left = x - width / 2;
    const top = y - height / 2;

    ctx.save();
    ctx.shadowColor = isCorrect ? 'rgba(226, 0, 31, 0.14)' : 'rgba(80, 55, 40, 0.1)';
    ctx.shadowBlur = isCorrect ? 16 : 12;
    ctx.shadowOffsetY = 4;

    const chipGrad = ctx.createLinearGradient(x, top, x, top + height);
    chipGrad.addColorStop(0, '#FFFFFF');
    chipGrad.addColorStop(0.55, '#FFFCFA');
    chipGrad.addColorStop(1, '#F8F0EB');
    ctx.fillStyle = chipGrad;
    ctx.strokeStyle = isCorrect ? 'rgba(226, 0, 31, 0.35)' : 'rgba(243, 228, 224, 0.95)';
    ctx.lineWidth = isCorrect ? 1.5 : 1;

    ctx.beginPath();
    ctx.roundRect(left, top, width, height, radius);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    if (isCorrect) {
      const accentGrad = ctx.createLinearGradient(left, top, left, top + height);
      accentGrad.addColorStop(0, BRAND.orange);
      accentGrad.addColorStop(1, BRAND.red);
      ctx.fillStyle = accentGrad;
      ctx.beginPath();
      ctx.roundRect(left + 1.5, top + 6, 3, height - 12, 2);
      ctx.fill();
    }

    ctx.fillStyle = isCorrect ? BRAND.red : BRAND.text;
    ctx.font = `600 ${fontSize}px "Pretendard", "Noto Sans KR", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + (isCorrect ? 1 : 0), y);

    ctx.restore();
  }

  drawBasket(ctx, basket) {
    const { x, y, width, height } = basket;

    ctx.save();

    const glow = ctx.createRadialGradient(x, y + height * 0.1, 0, x, y + height * 0.1, width * 0.95);
    glow.addColorStop(0, 'rgba(240, 121, 29, 0.14)');
    glow.addColorStop(0.5, 'rgba(226, 0, 31, 0.05)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(x - width, y - height, width * 2, height * 2);

    if (this.basketImageLoaded) {
      const { basketImageScale, basketImageAnchorY } = GAME_CONSTANTS;
      const imgW = width * basketImageScale;
      const imgH = imgW * (this.basketImage.height / this.basketImage.width);
      ctx.shadowColor = 'rgba(80, 55, 40, 0.15)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;
      ctx.drawImage(
        this.basketImage,
        x - imgW / 2,
        y - imgH * basketImageAnchorY,
        imgW,
        imgH,
      );
    } else {
      ctx.fillStyle = BRAND.orange;
      ctx.strokeStyle = BRAND.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x - width / 2, y - height / 2, width, height, 12);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }
}
