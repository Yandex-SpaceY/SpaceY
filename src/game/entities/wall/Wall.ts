import { GAME_SETTINGS } from 'game/constants';
import { Entity, Sprite } from 'game/core';
import { TCoordinates, TSpeedModifierRefernce } from 'game/core/types';

export default class Wall extends Entity {
  wallLoopStartShift?: number;

  constructor(
    initialPosition: TCoordinates,
    wallLoopStartPoint?: number,
    speedModifierRefernce?: TSpeedModifierRefernce
  ) {
    super(
      initialPosition,
      new Sprite({
        resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
        startCoordinates: { x: 0, y: 36 },
        size: { width: 85, height: 95 }
      }),
      GAME_SETTINGS.WALL_BASE_SPEED,
      speedModifierRefernce
    );

    if (wallLoopStartPoint) {
      this.wallLoopStartShift = wallLoopStartPoint;
    }
  }

  update(dt: number, canvasHeight: number): void {
    this.position.y += this.speed! * dt * (this.speedModifierRefernce ? this.speedModifierRefernce.speedModifier : 1);

    // Transfer to start if offscreen for loop
    if (this.position.y > canvasHeight) {
      this.position.y -= (this.wallLoopStartShift ? this.wallLoopStartShift : 0);
    }
  }
}
