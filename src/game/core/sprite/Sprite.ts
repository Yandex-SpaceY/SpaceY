import { Resources } from 'game/core';
import { TCoordinates, TSize } from 'game/core/types';

enum ANIMATION_DIRECTION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

type TSprite = {
  resourceURL: string,
  startСoordinates: TCoordinates,
  size: TSize,
  animationSpeed?: number,
  animationFrames?: number[],
  animationDirection?: ANIMATION_DIRECTION.HORIZONTAL | ANIMATION_DIRECTION.VERTICAL,
  animationOnce?: boolean
}

export default class Sprite {
  private _index: number;
  resourceURL: string;
  startСoordinates: TCoordinates;
  size: TSize;
  animationSpeed?: number;
  animationFrames?: number[];
  animationDirection?: ANIMATION_DIRECTION.HORIZONTAL | ANIMATION_DIRECTION.VERTICAL;
  animationOnce?: boolean;
  animationDone?: boolean;

  constructor(props: TSprite) {
    this._index = 0;
    this.resourceURL = props.resourceURL;
    this.startСoordinates = props.startСoordinates;
    this.size = props.size;
    this.animationSpeed = props.animationSpeed || 0;
    this.animationFrames = props.animationFrames;
    this.animationDirection = props.animationDirection;
    this.animationOnce = props.animationOnce;
  }

  update(dt: number): void {
    if (this.animationSpeed !== undefined) {
      this._index += this.animationSpeed * dt;
    }
  }

  render(ctx: CanvasRenderingContext2D, resources: Resources): void {
    let  frame = 0;
    if (this.animationSpeed !== undefined && this.animationFrames !== undefined ) {
      if (this.animationSpeed > 0) {
        const  max = this.animationFrames.length;
        const  idx = Math.floor(this._index);
        frame = this.animationFrames[idx % max];

        if (this.animationOnce && idx >= max) {
          this.animationDone = true;

          return;
        }
      }
    }

    let  x = this.startСoordinates.x;
    let  y = this.startСoordinates.y;

    if (this.animationDirection === ANIMATION_DIRECTION.VERTICAL) {
      y += frame * this.size.height;
    } else {
      x += frame * this.size.width;
    }

    ctx.drawImage(resources.get(this.resourceURL) as CanvasImageSource,
      x, y,
      this.size.width, this.size.height,
      0, 0,
      this.size.width, this.size.height);
  }

}
