export default class VibrationController {
  vibrateInterval: null | ReturnType<typeof setTimeout>;

  constructor() {
    this.vibrateInterval = null;
  }

  startVibration(duration: number[]): void {
    navigator.vibrate(duration);
  }

  stopVibration(): void {
    if (this.vibrateInterval) {
      clearInterval(this.vibrateInterval);
      this.vibrateInterval = null;
    }
    navigator.vibrate(0);
  }

  startPersistentVibrate(duration: number[], interval: number): void {
    this.vibrateInterval = setInterval(() => {
      this.startVibration(duration);
    }, interval);
  }

  checkInterval(): boolean {
    return !!this.vibrateInterval;
  }
}
