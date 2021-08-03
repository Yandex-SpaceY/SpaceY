import { GAME_SETTINGS, OBSTACLE_TYPES } from 'game/constants';
import { Entity, Sprite } from 'game/core';
import { TCoordinates, TSize, TSpeedModifierRefernce } from 'game/core/types';

export default class Obstacle extends Entity {
  constructor(
    initialPosition: TCoordinates,
    speedModifierRefernce?: TSpeedModifierRefernce,
    obstacleType: string = OBSTACLE_TYPES.TYPE1.name
  ) {
    let startCoordinates: TCoordinates = { x: 0, y: 133 };
    let size: TSize = { width: 187, height: 84 };

    if (obstacleType) {
      switch (obstacleType) {
        case OBSTACLE_TYPES.TYPE2.name:
          startCoordinates = { x: 188, y: 197 };
          size = { width: 187, height: 18 };
          break;
        case OBSTACLE_TYPES.TYPE3.name:
          startCoordinates = { x: 375, y: 161 };
          size = { width: 84, height: 56 };
          break;
        default:
          break;
      }
    }
    super({
      initialPosition,
      sprite: new Sprite({
        resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
        startCoordinates,
        size
      }),
      speed: GAME_SETTINGS.OBSTACLE_BASE_SPEED,
      speedModifierRefernce
    });
  }

  update(dt: number): void {
    this.position.y += this.speed! * dt * (this.speedModifierRefernce ? this.speedModifierRefernce.speedModifier : 1);
  }
}
