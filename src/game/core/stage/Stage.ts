import { Entity, Resources } from 'game/core';

export default class Stage {
  private _context: CanvasRenderingContext2D;
  private _resources: Resources;
  private _backgroundPattern?: CanvasPattern | null;
  private _entities: Record<string, Entity[] | []> | Record<string, never>;

  constructor(context: CanvasRenderingContext2D, resources: Resources) {
    this._context = context;
    this._resources = resources;
    this._entities = {};
  }

  private _renderEntity(entity: Entity): void {
    this._context.save();
    this._context.translate(entity.position.x, entity.position.y);
    entity.render(this);
    this._context.restore();
  }

  addEntitiesToKey(key: string, entities: Entity[]): void {
    if (!this._entities[key]) {
      this._entities[key] = [];
    }

    this._entities[key].push(...entities);
  }

  getEntitiesByKey(key: string): Entity[] {
    return this._entities[key];
  }

  clearEntities(): void {
    this._entities = {};
  }

  clearEntitiesByKey(key: string): void {
    this._entities[key] = [];
  }

  getContext(): CanvasRenderingContext2D {
    return this._context;
  }

  getResources(): Resources {
    return this._resources;
  }

  setBackgroundPattern(patternURL: string): void {
    this._backgroundPattern = this._context.createPattern(
      this._resources.get(patternURL) as CanvasImageSource,
      'repeat'
    );
  }

  renderBackgroundPattern(width: number, height: number): void {
    this._context.fillStyle = this._backgroundPattern as CanvasPattern;
    this._context.fillRect(0, 0, width, height);
  }

  renderEntities(key?: string): void {
    if (key) {
      this._entities[key].forEach(entity => this._renderEntity(entity));
    } else {
      Object.values(this._entities).forEach(entities => {
        entities.forEach(entity => this._renderEntity(entity));
      });
    }
  }
}
