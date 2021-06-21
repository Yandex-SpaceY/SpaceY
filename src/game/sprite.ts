import Resources from './resources';

export default class Sprite {
  private _index: number;
  url: string;
  pos: [number, number];
  size: [number, number];
  speed?: number;
  frames?: [number, number];
  dir?: 'horizontal' | 'vertical';
  once?: boolean;
  done?: boolean;

  constructor(url: string, pos: [number, number], size: [number, number], speed?: number, frames?: [number, number], dir?: 'horizontal' | 'vertical', once?: boolean) {
    this._index = 0;
    this.url = url;
    this.pos = pos;
    this.size = size;
    this.speed = speed === undefined ? 0 : speed;
    this.frames = frames;
    this.dir = dir;
    this.once = once;
  }

  update(dt: number): void {
    if (this.speed !== undefined) {
      this._index += this.speed * dt;
    }
  }

  render(ctx: CanvasRenderingContext2D, resources: Resources): void {
    let  frame = 0;
    if (this.speed !== undefined && this.frames !== undefined ) {
      if (this.speed > 0) {
        const  max = this.frames.length;
        const  idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        if (this.once && idx >= max) {
          this.done = true;

          return;
        }
      }
    }

    let  x = this.pos[0];
    let  y = this.pos[1];

    if (this.dir === 'vertical') {
      y += frame * this.size[1];
    } else {
      x += frame * this.size[0];
    }

    ctx.drawImage(resources.get(this.url) as CanvasImageSource,
      x, y,
      this.size[0], this.size[1],
      0, 0,
      this.size[0], this.size[1]);
  }

}
