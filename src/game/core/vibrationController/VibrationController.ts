export default class VibrationController {
  vibrateInterval: null | ReturnType<typeof setTimeout>;

  constructor() {
    this.vibrateInterval = null;
  }

  startVibrate(duration: number[]): void {
    navigator.vibrate(duration);
  }

  stopVibrate(): void {
    if (this.vibrateInterval) {
      clearInterval(this.vibrateInterval);
      this.vibrateInterval = null;
    }
    navigator.vibrate(0);
  }

  startPersistentVibrate(duration: number[], interval: number): void {
    this.vibrateInterval = setInterval(() => {
      this.startVibrate(duration);
    }, interval);
  }

  checkInterval(): boolean {
    return !!this.vibrateInterval;
  }
}
