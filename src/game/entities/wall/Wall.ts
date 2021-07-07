import { GAME_SETTINGS } from 'game/constants';
import { Entity, Sprite } from 'game/core';
import { TCoordinates } from 'game/core/types';

export default class Wall extends Entity {
  constructor(initialPosition: TCoordinates) {
    super(
      initialPosition,
      new Sprite({
        resourceURL: GAME_SETTINGS.OBJECT_SPRITES_PATH,
        startСoordinates: { x: 0, y: 34 },
        size: { width: 85, height: 96 }
      }),
      GAME_SETTINGS.WALL_BASE_SPEED,
    );
  }

  update(dt: number, canvasHeight: number): void {
    this.position.y += this.speed! * dt;
    this.updateSpriteAnimation(dt);

    // Transfer to start if offscreen for loop
    if (this.position.y > canvasHeight) {
      this.position.y = 0 - 96;
    }
  }
}
