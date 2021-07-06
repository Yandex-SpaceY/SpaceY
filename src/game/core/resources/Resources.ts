export default class Resources {
  resourceCache: Record<string, HTMLImageElement | boolean>;
  readyCallbacks: (() => void)[];

  constructor() {
    this.resourceCache = {};
    this.readyCallbacks = [];
  }

  load(urls: string[]): void {
    urls.forEach(url => {
      if (this.resourceCache[url]) {
        return this.resourceCache[url];
      } else {
        const  img = new Image();
        img.onload = () => {
          this.resourceCache[url] = img;

          if (this.isReady()) {
            this.readyCallbacks.forEach(function(func) {
              func();
            });
          }
        };
        img.onerror = () => {
          // TODO: ERROR HANDLING
          console.log('TO DO ERROR HANDLING');
        };
        this.resourceCache[url] = false;
        img.src = url;
      }
    });
  }

  get(url: string): HTMLImageElement | boolean {
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