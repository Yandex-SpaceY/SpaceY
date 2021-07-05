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

  constructor(initialPosition: TCoordinates) {
    super(
      initialPosition,
      new Sprite({
        resourceURL: GAME_SETTINGS.OBJECT_SPRITES,
        startСoordinates: { x: 0, y: 0 },
        size: { width: 34, height: 34 },
        animationSpeed: 13,
        animationFrames: [ 0, 1 ]
      }),
      GAME_SETTINGS.SPACESHIP_BASE_SPEED,
    );

    this.state = SHIP_STATE.FLIGHT;
    this.side = SHIP_SIDE.LEFT;
  }
}
