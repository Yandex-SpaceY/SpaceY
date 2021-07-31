import { TCoordinates, TSize, TSpeedModifierRefernce } from 'game/core/types';
import { Stage, Sprite } from 'game/core';

export default class Entity {
  sprite: Sprite;
  position: TCoordinates;
  speed: number | null;
  speedModifierRefernce?: TSpeedModifierRefernce;

  constructor(
    initialPosition: TCoordinates,
    sprite: Sprite, speed?: number,
    speedModifierRefernce?: TSpeedModifierRefernce
  ) {
    this.sprite = sprite;

    this.position = initialPosition;
    this.speed = speed || null;
    this.speedModifierRefernce = speedModifierRefernce || { speedModifier: 1 };
  }

  setSprite(sprite: Sprite): void {
    this.sprite = sprite;
  }

  getSize(): TSize {
    return this.sprite.size;
  }

  render(stage: Stage): void {
    this.sprite.render(stage.getContext(), stage.getResources());
  }

  updateSpriteAnimation(dt: number): void {
    this.sprite.update(dt);
  }
}
