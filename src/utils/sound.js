/**
 * Web Audio API 기반 효과음 (외부 파일 없이 동작)
 */
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.enabled = true;
    } catch {
      this.enabled = false;
    }
  }

  resume() {
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration, type = 'sine', volume = 0.15) {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playCorrect() {
    this.playTone(523, 0.12, 'sine', 0.12);
    setTimeout(() => this.playTone(659, 0.15, 'sine', 0.1), 60);
  }

  playFivePoint() {
    this.playTone(523, 0.1, 'sine', 0.12);
    setTimeout(() => this.playTone(659, 0.1, 'sine', 0.12), 70);
    setTimeout(() => this.playTone(784, 0.2, 'sine', 0.12), 140);
  }

  playWrong() {
    this.playTone(200, 0.3, 'sawtooth', 0.1);
    setTimeout(() => this.playTone(150, 0.25, 'sawtooth', 0.08), 100);
  }

  playClear() {
    [523, 659, 784, 1047].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.25, 'sine', 0.12), i * 120);
    });
  }

  playStart() {
    this.playTone(440, 0.1, 'sine', 0.1);
    setTimeout(() => this.playTone(554, 0.15, 'sine', 0.1), 80);
  }
}

export const soundManager = new SoundManager();
