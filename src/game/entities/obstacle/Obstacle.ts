import { GAME_SETTINGS } from 'game/constants';
import { Entity, Sprite } from 'game/core';
import { TCoordinates, TSpeedModifierRefernce } from 'game/core/types';

export default class Obstacle extends Entity {
  constructor(initialPosition: TCoordinates, speedModifierRefernce?: TSpeedModifierRefernce) {
    super({
      initialPosition,
      sprite: new Sprite({
        resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
        startCoordinates: { x: 0, y: 133 },
        size: { width: 187, height: 84 }
      }),
      speed: GAME_SETTINGS.OBSTACLE_BASE_SPEED,
      speedModifierRefernce
    });
  }

  update(dt: number): void {
    this.position.y += this.speed! * dt * (this.speedModifierRefernce ? this.speedModifierRefernce.speedModifier : 1);
  }
}
