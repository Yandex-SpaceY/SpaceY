import { GAME_SETTINGS } from 'game/constants';
import { Entity, Sprite } from 'game/core';
import { TCoordinates, TSpeedModifierReference } from 'game/core/types';

export enum REPAIR_STATUS {
  ACTIVE = 'active',
  NOT_ACTIVE = 'not_active',
}

export default class Repair extends Entity {
  repairStrength: number;
  status: REPAIR_STATUS;

  constructor(
    initialPosition: TCoordinates,
    speedModifierRefernce?: TSpeedModifierReference
  ) {
    super({
      initialPosition,
      sprite: new Sprite({
        resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
        startCoordinates: { x: 0, y: 258 },
        size: { width: 26, height: 32 },
        animationSpeed: 3,
        animationFrames: [ 0, 1, 2, 3, 2, 1 ]
      }),
      speed: GAME_SETTINGS.OBSTACLE_BASE_SPEED,
      speedModifierRefernce,
      hitBoxStartPoint: { x: 1, y: 1 },
      hitBoxSize: { width: 23, height: 30 }
    });

    this.status = REPAIR_STATUS.NOT_ACTIVE;
    this.repairStrength = GAME_SETTINGS.REPAIR_STRENGTH;
    this.position.y = -100;
  }

  update(dt: number, canvasHeight: number): void {
    if (this.status === REPAIR_STATUS.ACTIVE) {
      const speedModifierReference = this.speedModifierRefernce ? this.speedModifierRefernce.speedModifier : 1;
      this.position.y += this.speed! * dt * (speedModifierReference);

      this.updateSpriteAnimation(dt);
      if (this.position.y > canvasHeight) {
        this.switchStatus();
      }
    } else {
      this.position.y = -100;
    }
  }

  changeStatus(status: REPAIR_STATUS): void {
    this.status = status;
  }

  switchStatus(): void {
    if (this.status === REPAIR_STATUS.ACTIVE) {
      this.changeStatus(REPAIR_STATUS.NOT_ACTIVE);
    } else {
      this.changeStatus(REPAIR_STATUS.ACTIVE);
    }
  }
}
