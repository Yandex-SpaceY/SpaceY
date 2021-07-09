import { RESOURCES_FILE_EXTENSIONS } from 'game/constants';

type TResource = HTMLImageElement | HTMLAudioElement | boolean;

export default class Resources {
  resourceCache: Record<string, TResource>;
  readyCallbacks: (() => void)[];

  constructor() {
    this.resourceCache = {};
    this.readyCallbacks = [];
  }

  private _onLoadHandler(res: TResource, url: string): void {
    this.resourceCache[url] = res;

    if (this.isReady()) {
      this.readyCallbacks.forEach(function(func) {
        func();
      });
    }
  }

  private _isImage(url: string): boolean {
    return new RegExp(`.(${RESOURCES_FILE_EXTENSIONS.IMAGES})$`, 'g').test(url);
  }

  private _isAudio(url: string): boolean {
    return new RegExp(`.(${RESOURCES_FILE_EXTENSIONS.SOUNDS})$`, 'g').test(url);
  }

  load(urls: string[]): void {
    urls.forEach(url => {
      if (this.resourceCache[url]) {
        return this.resourceCache[url];
      } else {
        if (this._isImage(url)) {
          const  img = new Image();

          img.onload = () => {
            this._onLoadHandler(img, url);
          };

          img.onerror = () => {
          // TODO: ERROR HANDLING
            console.log('TO DO ERROR HANDLING');
          };

          this.resourceCache[url] = false;
          img.src = url;
        } else if (this._isAudio(url)) {
          const sound = new Audio();

          sound.oncanplaythrough = () => {
            this._onLoadHandler(sound, url);
          };
          sound.onerror = () => {
            // TODO: ERROR HANDLING
            console.log('TO DO ERROR HANDLING');
          };
          this.resourceCache[url] = false;
          sound.src = url;
        }
      }
    });
  }

  get(url: string): HTMLImageElement | HTMLAudioElement | boolean {
    return this.resourceCache[url];
  }

  isReady(): boolean {
    let  ready = true;
    for (const k in this.resourceCache) {
      if (Object.prototype.hasOwnProperty.call(this.resourceCache, k)
            && !this.resourceCache[k]) {
        ready = false;
      }
    }

    return ready;
  }

  onReady(func: (() => void)): void {
    this.readyCallbacks.push(func);
  }
}
