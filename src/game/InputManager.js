/**
 * 키보드 / 마우스 / 터치 입력 관리
 * - 마우스: 1:1 즉시 추적 (PC)
 * - 키보드: 가속 기반 이동 (dt 보정)
 * - 터치: 부드러운 추적
 */
export class InputManager {
  constructor(canvas, getLogicalSize) {
    this.canvas = canvas;
    this.getLogicalSize = getLogicalSize;
    this.targetX = null;
    this.keys = { left: false, right: false };
    this.mode = 'none';

    this.keyVelocity = 0;
    this.keyAccel = 1.4;
    this.keyMaxSpeed = 24;
    this.keyDecel = 0.82;
    this.touchLerp = 0.42;

    this._boundHandlers = {};
  }

  toLogicalX(clientX) {
    const rect = this.canvas.getBoundingClientRect();
    const { width } = this.getLogicalSize();
    return ((clientX - rect.left) / rect.width) * width;
  }

  attach() {
    const h = this._boundHandlers;

    h.keydown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.keys.left = true;
        this.mode = 'keyboard';
        this.targetX = null;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.keys.right = true;
        this.mode = 'keyboard';
        this.targetX = null;
      }
    };

    h.keyup = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.right = false;
    };

    h.mousemove = (e) => {
      this.mode = 'mouse';
      this.targetX = this.toLogicalX(e.clientX);
    };

    h.mouseleave = () => {
      if (this.mode === 'mouse') {
        this.targetX = null;
      }
    };

    h.touchstart = (e) => {
      e.preventDefault();
      this.mode = 'touch';
      const touch = e.touches[0];
      this.targetX = this.toLogicalX(touch.clientX);
    };

    h.touchmove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.targetX = this.toLogicalX(touch.clientX);
    };

    h.touchend = () => {};

    window.addEventListener('keydown', h.keydown);
    window.addEventListener('keyup', h.keyup);
    this.canvas.addEventListener('mousemove', h.mousemove);
    this.canvas.addEventListener('mouseleave', h.mouseleave);
    this.canvas.addEventListener('touchstart', h.touchstart, { passive: false });
    this.canvas.addEventListener('touchmove', h.touchmove, { passive: false });
    this.canvas.addEventListener('touchend', h.touchend);
  }

  detach() {
    const h = this._boundHandlers;
    window.removeEventListener('keydown', h.keydown);
    window.removeEventListener('keyup', h.keyup);
    this.canvas.removeEventListener('mousemove', h.mousemove);
    this.canvas.removeEventListener('mouseleave', h.mouseleave);
    this.canvas.removeEventListener('touchstart', h.touchstart);
    this.canvas.removeEventListener('touchmove', h.touchmove);
    this.canvas.removeEventListener('touchend', h.touchend);
  }

  updateBasket(basket, canvasWidth, dt) {
    const halfW = basket.visualHalfW ?? basket.width / 2;
    const frameScale = dt / 16.67;

    if (this.mode === 'mouse' && this.targetX !== null) {
      basket.x = this.targetX;
    } else if (this.mode === 'touch' && this.targetX !== null) {
      basket.x += (this.targetX - basket.x) * this.touchLerp;
    } else if (this.mode === 'keyboard') {
      let dir = 0;
      if (this.keys.left) dir -= 1;
      if (this.keys.right) dir += 1;

      if (dir !== 0) {
        this.keyVelocity = Math.min(
          this.keyMaxSpeed,
          this.keyVelocity + this.keyAccel * frameScale,
        );
        basket.x += dir * this.keyVelocity * frameScale;
      } else {
        this.keyVelocity *= Math.pow(this.keyDecel, frameScale);
        if (Math.abs(this.keyVelocity) < 0.3) this.keyVelocity = 0;
      }
    }

    basket.x = Math.max(halfW, Math.min(canvasWidth - halfW, basket.x));
  }

  reset() {
    this.targetX = null;
    this.keys = { left: false, right: false };
    this.mode = 'none';
    this.keyVelocity = 0;
  }
}
