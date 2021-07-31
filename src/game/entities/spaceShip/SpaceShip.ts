import { GAME_SETTINGS } from 'game/constants';
import { Entity, Sprite } from 'game/core';
import { TCoordinates, TSpeedModifierRefernce } from 'game/core/types';

export enum SHIP_STATE {
  FLIGHT = 'flight',
  SHIFT = 'shift',
}

export enum SHIP_SIDE {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum SHIP_STATUS {
  NORMAL = 'normal',
  DAMAGE = 'damage',
  DESTROYED = 'destroyed',
}

export default class SpaceShip extends Entity {
  side: SHIP_SIDE;
  state: SHIP_STATE;
  status: SHIP_STATUS;
  hullStrength: number;

  constructor(initialPosition: TCoordinates, speedModifier?: TSpeedModifierRefernce) {
    super(
      initialPosition,
      new Sprite({
        resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
        startCoordinates: { x: 0, y: 0 },
        size: { width: 36, height: 35 },
        animationSpeed: 13,
        animationFrames: [ 0, 1 ]
      }),
      GAME_SETTINGS.SPACESHIP_BASE_SPEED,
      speedModifier
    );

    this.side = SHIP_SIDE.LEFT;
    this.state = SHIP_STATE.FLIGHT;
    this.status = SHIP_STATUS.NORMAL;
    this.hullStrength = GAME_SETTINGS.SHIP_HULL_STRENGTH;
  }

  update(dt: number, canvasWidth: number): void {
    if (this.side === SHIP_SIDE.RIGHT && this.state === SHIP_STATE.SHIFT) {
      if (this.position.x
        < (canvasWidth - GAME_SETTINGS.SPACESHIP_MARGIN_FROM_SIDE - this.getSize().width)
      ) {
        this.position.x
          += this.speed!
          * dt
          * (this.speedModifierRefernce ? this.speedModifierRefernce.speedModifier : 1);
      } else {
        this.state = SHIP_STATE.FLIGHT;
      }
    } else if (this.side === SHIP_SIDE.LEFT && this.state === SHIP_STATE.SHIFT) {
      if (this.position.x > GAME_SETTINGS.SPACESHIP_MARGIN_FROM_SIDE) {
        this.position.x
          -= this.speed!
          * dt
          * (this.speedModifierRefernce ? this.speedModifierRefernce.speedModifier : 1);
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

  changeStatus(status: SHIP_STATUS): void {
    switch (status) {
      case SHIP_STATUS.NORMAL:
        this.setSprite(new Sprite({
          resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
          startCoordinates: { x: 0, y: 0 },
          size: { width: 36, height: 35 },
          animationSpeed: 13,
          animationFrames: [ 0, 1 ]
        }),);
        this.status = SHIP_STATUS.NORMAL;
        break;
      case SHIP_STATUS.DAMAGE:
        this.setSprite(new Sprite({
          resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
          startCoordinates: { x: 0, y: 0 },
          size: { width: 36, height: 35 },
          animationSpeed: 13,
          animationFrames: [ 0, 2 ]
        }),);
        this.status = SHIP_STATUS.DAMAGE;
        break;
      case SHIP_STATUS.DESTROYED:
        this.setSprite(new Sprite({
          resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
          startCoordinates: { x: 0, y: 218 },
          size: { width: 39, height: 39 },
          animationSpeed: 16,
          animationFrames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
          animationOnce: true,
        }),);
        this.status = SHIP_STATUS.DESTROYED;
        break;
      default:
        break;
    }
  }

  setStatusToDamage(): void {
    this.changeStatus(SHIP_STATUS.DAMAGE);
  }

  setStatusToDestroyed(): void {
    this.changeStatus(SHIP_STATUS.DESTROYED);
  }

  setStatusToNormal(): void {
    this.changeStatus(SHIP_STATUS.NORMAL);
  }
}
