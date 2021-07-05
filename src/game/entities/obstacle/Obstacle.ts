import { GAME_SETTINGS } from 'game/constants';
import { Entity, Sprite } from 'game/core';
import { TCoordinates } from 'game/core/types';

export default class Obstacle extends Entity {
  constructor(initialPosition: TCoordinates) {
    super(
      initialPosition,
      new Sprite({
        resourceURL: GAME_SETTINGS.OBJECT_SPRITES,
        startСoordinates: { x: 0, y: 129 },
        size: { width: 187, height: 85 }
      }),
      GAME_SETTINGS.OBSTACLE_BASE_SPEED,
    );
  }
}
