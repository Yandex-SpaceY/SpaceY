import { GAME_SETTINGS } from 'game/constants';
import { Entity, Sprite } from 'game/core';
import { TCoordinates } from 'game/core/types';

export enum SHIP_STATE {
  FLIGHT = 'flight',
  SHIFT = 'shift',
}

export enum SHIP_SIDE {
  LEFT = 'left',
  RIGHT = 'right',
}

export default class SpaceShip extends Entity {
  state: SHIP_STATE;
  side: SHIP_SIDE;
  hullStrength: number;

  constructor(initialPosition: TCoordinates) {
    super(
      initialPosition,
      new Sprite({
        resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
        startCoordinates: { x: 0, y: 0 },
        size: { width: 34, height: 34 },
        animationSpeed: 13,
        animationFrames: [ 0, 1 ]
      }),
      GAME_SETTINGS.SPACESHIP_BASE_SPEED,
    );

    this.state = SHIP_STATE.FLIGHT;
    this.side = SHIP_SIDE.LEFT;
    this.hullStrength = GAME_SETTINGS.SHIP_HULL_STRENGTH;
  }

  update(dt: number, canvasWidth: number): void {
    if (this.side === SHIP_SIDE.RIGHT && this.state === SHIP_STATE.SHIFT) {
      if (this.position.x < canvasWidth / 2 + 102 - 17) {
        this.position.x += this.speed! * dt;
      } else {
        this.state = SHIP_STATE.FLIGHT;
      }
    } else if (this.side === SHIP_SIDE.LEFT && this.state === SHIP_STATE.SHIFT) {
      if (this.position.x > canvasWidth / 2 - 102 - 17) {
        this.position.x -= this.speed! * dt;
      } else {
        this.state = SHIP_STATE.FLIGHT;
      }
    }
    this.updateSpriteAnimation(dt);
  }

  actionShift(): void {
    if (this.side === SHIP_SIDE.RIGHT) {
      this.side = SHIP_SIDE.LEFT;
      this.state = SHIP_STATE.SHIFT;
    } else {
      this.side = SHIP_SIDE.RIGHT;
      this.state = SHIP_STATE.SHIFT;
    }
  }
}
