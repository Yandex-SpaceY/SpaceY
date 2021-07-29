export default class Sound {
  private _sound: HTMLAudioElement;

  constructor(audioURL: string) {
    this._sound = new Audio(audioURL);
    this._sound.setAttribute('preload', 'auto');
    this._sound.setAttribute('controls', 'none');
    this._sound.style.display = 'none';
    this._sound.loop = false;
    document?.body.appendChild(this._sound);
  }

  setIsLopped(isLopped: boolean): void {
    this._sound.loop = isLopped;
  }

  play(): void {
    this._sound.play().catch(() => {
      // Avoid DOMException: play() failed because the user didn’t interact with the document first in console
      return;
    });
  }

  stop(): void {
    this._sound.pause();
  }

  restart(): void {
    this._sound.currentTime = 0;
    this.play();
  }

  playFrom(startTime: number): void {
    this._sound.currentTime = startTime;
    this.play();
  }

  playFragment(startTime: number, stopTime: number): void {
    this.playFrom(startTime);

    const handleStop = () => {
      if (this._sound.currentTime > stopTime) {
        if (this._sound.loop) {
          this._sound.currentTime = startTime;
        } else {
          this.stop();
          this._sound.removeEventListener('timeupdate', handleStop, false);
        }
      }
    };

    this._sound.addEventListener('timeupdate', handleStop, false);
  }

  setVolume(volume: number): void {
    this._sound.volume = volume;
  }

  remove(): void {
    document?.body.removeChild(this._sound);
  }
}
