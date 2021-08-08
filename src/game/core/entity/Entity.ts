import { TCoordinates, TSize, TSpeedModifierReference } from 'game/core/types';
import { Stage, Sprite } from 'game/core';

interface EntityProps {
  initialPosition: TCoordinates;
  sprite: Sprite;
  speed?: number;
  speedModifierRefernce?: TSpeedModifierReference;
  hitBoxStartPoint?: TCoordinates;
  hitBoxSize?: TSize;
}

export default class Entity {
  sprite: Sprite;
  position: TCoordinates;
  speed: number | null;
  speedModifierRefernce?: TSpeedModifierReference;
  hitBoxStartPoint?: TCoordinates | null;
  hitBoxSize?: TSize | null;

  constructor(props: EntityProps) {
    this.sprite = props.sprite;

    this.position = props.initialPosition;
    this.speed = props.speed || null;
    this.speedModifierRefernce = props.speedModifierRefernce || { speedModifier: 1 };

    this.hitBoxStartPoint = props.hitBoxStartPoint || null;
    this.hitBoxSize = props.hitBoxSize || null;
  }

  setSprite(sprite: Sprite): void {
    this.sprite = sprite;
  }

  getSize(): TSize {
    return this.sprite.size;
  }

  getHitBoxSize(): TSize {
    if (this.hitBoxSize) {
      return this.hitBoxSize;
    }

    return this.sprite.size;
  }

  getHitBoxPosition(): TCoordinates {
    if (this.hitBoxStartPoint) {
      return {
        x: this.position.x + this.hitBoxStartPoint.x,
        y: this.position.y + this.hitBoxStartPoint.y
      };
    }

    return this.position;
  }

  render(stage: Stage): void {
    this.sprite.render(stage.getContext(), stage.getResources());
  }

  updateSpriteAnimation(dt: number): void {
    this.sprite.update(dt);
  }
}
