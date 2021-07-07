import { GAME_SETTINGS } from 'game/constants';
import { Entity, Sprite } from 'game/core';
import { TCoordinates } from 'game/core/types';

export default class Obstacle extends Entity {
  constructor(initialPosition: TCoordinates) {
    super(
      initialPosition,
      new Sprite({
        resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
        startСoordinates: { x: 0, y: 130 },
        size: { width: 187, height: 85 }
      }),
      GAME_SETTINGS.OBSTACLE_BASE_SPEED,
    );
  }

  update(dt: number): void {
    this.position.y += this.speed! * dt;
    this.updateSpriteAnimation(dt);
  }
}
