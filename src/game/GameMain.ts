import { Dispatch, SetStateAction } from 'react';

import { boxCollides } from 'game/core/utils';
import { GAME_CONTROLS, GAME_SETTINGS } from 'game/constants';
import { MainStage } from 'game/stages';
import { Resources, Stage } from 'game/core';
import { Obstacle, SpaceShip, Wall } from 'game/entities';
import { TCoordinates } from 'game/core/types';

export default class GameMain {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  resources: Resources;
  lastTime: number;

  isGameOver: boolean;
  isGamePaused: boolean;
  gameTime: number;

  ship: SpaceShip | null;

  score: number;
  col: number;

  stage: Stage | null;

  setHull: Dispatch<SetStateAction<number>>;
  setScore: Dispatch<SetStateAction<number>>;
  setGameOverStatus: (isGameOver: boolean) => void;
  setGamePauseStatus: (isGamePaused: boolean) => void;

  constructor(props: {
    canvas: HTMLCanvasElement,
    setHull: Dispatch<SetStateAction<number>>;
    setScore: Dispatch<SetStateAction<number>>,
    setGameOverStatus: (isGameOver: boolean) => void,
    setGamePauseStatus: (isGamePaused: boolean) => void
  }
  ) {
    this.canvas = props.canvas;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.lastTime = Date.now();
    this.isGameOver = false;
    this.isGamePaused = false;

    this.resources = new Resources();
    this.resources.load([ GAME_SETTINGS.OBJECT_SPRITES, GAME_SETTINGS.MAIN_STAGE_BACKGROUND ]);
    this.resources.onReady(this.init);

    this.gameTime = 0;

    this.ship = null;

    this.score = 0;
    this.col = 0;

    this.stage = null;

    this.setHull = props.setHull;
    this.setScore = props.setScore;
    this.setGameOverStatus = props.setGameOverStatus;
    this.setGamePauseStatus = props.setGamePauseStatus;
  }

  setControls(): void {
    document.addEventListener('keydown', this.controls);
  }

  unsetControlsAndSubscriptions(): void {
    document.removeEventListener('keydown', this.controls);

    this.setHull(0);
    this.setScore(0);
    this.setGameOverStatus(false);
    this.setGamePauseStatus(false);
  }

  controls = (event: KeyboardEvent): void => {
    if (event.code === GAME_CONTROLS.SHIFT) {
      if (!this.isGamePaused) {
        this.ship!.actionShift();
      }
    } else if (event.code === GAME_CONTROLS.PAUSE) {
      this.togglePauseStatus();
      this.setGamePauseStatus(this.isGamePaused);
    }
  };

  togglePauseStatus(): void {
    this.isGamePaused = !this.isGamePaused;
  }

  setPauseStatus(status: boolean): void {
    this.isGamePaused = status;
  }

  initWalls(wallsEntitiesKey: string): void {
    const numberOfWalls = Math.ceil(this.canvas.height / 96) + 1;
    for (let i = 1; i <= numberOfWalls; i++) {
      this.stage!.addEntitiesToKey(
        wallsEntitiesKey,
        [new Wall({ x: 0 - 42, y: this.canvas.height - i * 96 })]);
      this.stage!.addEntitiesToKey(
        wallsEntitiesKey,
        [new Wall({ x: this.canvas.width - 85 + 42, y: this.canvas.height - i * 96 })]);
    }
  }

  generateObstacles(obstaclesEntitiesKey: string): void {
    const obstacles = this.stage!.getEntitiesByKey(obstaclesEntitiesKey);
    if (Math.random() < 1 - Math.pow(0.993, this.gameTime)) {
      const position: TCoordinates = { x: 0, y: 0 };
      if (Math.random() < 0.5) {
        position.x = 42;
        position.y = -85;
      } else {
        position.x = this.canvas.width - 42 - 187;
        position.y = -85;
      }
      if (obstacles.length > 0) {
        if (obstacles[obstacles.length - 1].position.y > 84) {
          this.stage!.addEntitiesToKey(
            obstaclesEntitiesKey,
            [new Obstacle(position)]
          );
        }
      } else {
        this.stage!.addEntitiesToKey(
          obstaclesEntitiesKey,
          [new Obstacle(position)]
        );
      }
    }
  }

  reset(): void {
    this.isGameOver = false;
    this.setGameOverStatus(this.isGameOver);

    this.gameTime = 0;
    this.col = 0;
    this.score = 0;

    this.setHull(this.ship!.hullStrength);

    this.stage!.clearEntitiesByKey(GAME_SETTINGS.WALLS_ENTITIES_KEY);
    this.stage!.clearEntitiesByKey(GAME_SETTINGS.OBSTACLES_ENTITIES_KEY);

    this.ship!.position = { x: this.canvas.width / 2 - 102 - 17, y: this.canvas.height - 120 };

    this.initWalls(GAME_SETTINGS.WALLS_ENTITIES_KEY);
  }

  render(): void {
    this.stage!.renderBackgroundPattern(this.canvas.width, this.canvas.height);

    // Render the player if the game isn't over
    if (!this.isGameOver) {
      this.stage!.renderEntities(GAME_SETTINGS.SPACESHIP_ENTITY_KEY);
    }

    this.stage!.renderEntities(GAME_SETTINGS.WALLS_ENTITIES_KEY);
    this.stage!.renderEntities(GAME_SETTINGS.OBSTACLES_ENTITIES_KEY);
  }

  updateEntities(dt: number): void {
    this.ship!.update(dt, this.canvas.width);

    this.stage!.getEntitiesByKey(GAME_SETTINGS.WALLS_ENTITIES_KEY).forEach(wall => {
      //TODO: Do something with types conversion
      const w = wall as Wall;
      w.update(dt, this.canvas.height);
    });

    this.stage!.getEntitiesByKey(GAME_SETTINGS.OBSTACLES_ENTITIES_KEY).forEach((obstacle, index) => {
      //TODO: Do something with types conversion
      const o = obstacle as Obstacle;
      o.update(dt);

      // Remove if offscreen
      if (o.position.y > this.canvas.height) {
        this.stage!.getEntitiesByKey(GAME_SETTINGS.OBSTACLES_ENTITIES_KEY).splice(index, 1);
      }
    });
  }

  checkCollisions(): void {
    this.stage!.getEntitiesByKey(GAME_SETTINGS.OBSTACLES_ENTITIES_KEY).forEach(obstacle => {
      const pos = obstacle.position;
      const size = obstacle.getSize();

      if (boxCollides(pos, size, this.ship!.position, this.ship!.getSize())) {
        this.col++;
      }
    });
  }

  update(dt: number): void {
    if (!this.isGamePaused) {
      this.gameTime += dt;

      this.updateEntities(dt);
      this.generateObstacles(GAME_SETTINGS.OBSTACLES_ENTITIES_KEY);

      this.score++;

      if (this.col >= this.ship!.hullStrength) {
        if (!this.isGameOver) {
          this.isGameOver = true;
          this.setGameOverStatus(this.isGameOver);
        }
      }
      if (!this.isGameOver) {
        this.checkCollisions();
        this.setHull(this.ship!.hullStrength - this.col);
        this.setScore(this.score);
      }
    }
  }

  mainLoop = (): void => {
    const now = performance.now();
    const dt = (now - this.lastTime) / 1000.0;

    this.update(dt);
    this.render();

    this.lastTime = now;
    window.requestAnimationFrame(this.mainLoop);
  };

  init = (): void => {
    this.stage = new MainStage(this.context, this.resources);

    this.stage.addEntitiesToKey(GAME_SETTINGS.SPACESHIP_ENTITY_KEY, [new SpaceShip({ x: 0, y: 0 })]);
    this.ship = this.stage.getEntitiesByKey(GAME_SETTINGS.SPACESHIP_ENTITY_KEY)[0] as SpaceShip;
    this.setControls();

    this.reset();
    this.lastTime = performance.now();
    this.mainLoop();
  };
}