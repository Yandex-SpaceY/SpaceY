import { TCoordinates, TSize } from 'game/core/types';
import { Stage, Sprite } from 'game/core';

export default class Entity {
  private _sprite: Sprite;
  position: TCoordinates;
  speed: number | null

  constructor(initialPosition: TCoordinates, sprite: Sprite, speed?: number) {
    this.position = initialPosition;
    this._sprite = sprite;
    this.speed = speed || null;
  }

  setSprite(sprite: Sprite): void {
    this._sprite = sprite;
  }

  getSize(): TSize {
    return this._sprite.size;
  }

  render(stage: Stage): void {
    this._sprite.render(stage.getContext(), stage.getResources());
  }
}
