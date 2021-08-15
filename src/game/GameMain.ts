import { Dispatch, SetStateAction } from 'react';

import { boxCollides } from 'game/core/utils';
import { GAME_CONTROLS, GAME_SETTINGS, OBSTACLE_TYPES } from 'game/constants';
import { MainStage } from 'game/stages';
import { Resources, Sound, Stage } from 'game/core';
import { Obstacle, SpaceShip, SHIP_STATUS, Wall } from 'game/entities';
import { TCoordinates } from 'game/core/types';
import { VibrationController } from 'game/core/';

export default class GameMain {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  resources: Resources;
  lastTime: number;

  isGameOver: boolean;
  isGamePaused: boolean;
  isSoundOn: boolean;
  vibration: boolean;
  vibrationController: VibrationController;
  gameTime: number;

  bgMusic: Sound;

  ship: SpaceShip | null;

  pixelCount: number;
  isShipDestroyed: boolean;
  score: number;
  col: number;
  speedModifierRefernce: { speedModifier: number }

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
    this.isSoundOn = true;
    this.vibration = true;
    this.vibrationController = new VibrationController();
    this.resources = new Resources();
    this.resources.load([
      GAME_SETTINGS.OBJECT_SPRITES_PATH,
      GAME_SETTINGS.MAIN_STAGE_BACKGROUND_PATH,
      GAME_SETTINGS.MAIN_MUSIC_PATH,
    ]);
    this.resources.onReady(this.init);

    this.gameTime = 0;

    this.ship = null;

    this.pixelCount = 0;
    this.isShipDestroyed = false;
    this.score = 0;
    this.col = 0;
    this.speedModifierRefernce = { speedModifier: 1 };

    this.stage = null;
    this.bgMusic = new Sound(GAME_SETTINGS.MAIN_MUSIC_PATH);
    this.bgMusic.setIsLopped(true);
    this.bgMusic.setVolume(GAME_SETTINGS.MAIN_MUSIC_VOLUME);

    this.setHull = props.setHull;
    this.setScore = props.setScore;
    this.setGameOverStatus = props.setGameOverStatus;
    this.setGamePauseStatus = props.setGamePauseStatus;
  }

  setControls(): void {
    document.addEventListener('keydown', this.handleKeyControls);
    this.canvas.addEventListener('touchstart', this.handleTouch, false);
  }

  clear(): void {
    document.removeEventListener('keydown', this.handleKeyControls);

    this.setHull(0);
    this.setScore(0);
    this.setGameOverStatus(false);
    this.setGamePauseStatus(false);

    this.bgMusic.remove();
  }

  handleKeyControls = (event: KeyboardEvent): void => {
    if (event.code === GAME_CONTROLS.SHIFT) {
      this.handleTouch();
    } else if (event.code === GAME_CONTROLS.PAUSE) {
      this.togglePauseStatus();
      this.setGamePauseStatus(this.isGamePaused);
    }
  };

  handleTouch = (): void => {
    if (!this.isGamePaused && !this.isShipDestroyed) {
      this.ship!.actionShift();
    }
  }

  setSoundStatus(status: boolean): void {
    this.isSoundOn = status;
    status ? this.bgMusic.play(): this.bgMusic.stop();
  }

  setVibrationStatus(status: boolean): void {
    this.vibration = status;
  }

  setPauseStatus(status: boolean): void {
    this.isGamePaused = status;
  }

  togglePauseStatus(): void {
    this.setPauseStatus(!this.isGamePaused);
  }

  initWalls(wallsEntitiesKey: string): void {
    const wallSpriteWidth = 85;
    const wallSpriteHeight = 95;

    const numberOfWalls = Math.ceil(this.canvas.height / wallSpriteHeight) + 2;
    const wallLoopStartShift = ((numberOfWalls - 1) * wallSpriteHeight);

    for (let i = 1; i <= numberOfWalls; i++) {
      this.stage!.addEntitiesToKey(
        wallsEntitiesKey,
        [
          new Wall({
            x: 0 - GAME_SETTINGS.WALL_VISIBLE_PART_FROM_SIDE,
            y: this.canvas.height - i * wallSpriteHeight - (wallLoopStartShift - wallSpriteHeight)
          },
          wallLoopStartShift,
          this.speedModifierRefernce
          )
        ]);
      this.stage!.addEntitiesToKey(
        wallsEntitiesKey,
        [
          new Wall({
            x: this.canvas.width - wallSpriteWidth + GAME_SETTINGS.WALL_VISIBLE_PART_FROM_SIDE,
            y: this.canvas.height - i * wallSpriteHeight - (wallLoopStartShift - wallSpriteHeight)
          },
          wallLoopStartShift,
          this.speedModifierRefernce
          )
        ]);
    }
  }

  generateObstaclesWithOneSideCounter(obstaclesEntitiesKey: string): () => void {
    // Closure for counting obstacles on one side in a row
    let oneSideCounter = 0;
    let isLeft = false;
    let isLeftPrev = false;
    let prevObstacleGap = OBSTACLE_TYPES.TYPE1.gap;

    return (): void => {
      const obstacles = this.stage!.getEntitiesByKey(obstaclesEntitiesKey);

      if (
        (Math.random() < 1 - Math.pow(0.993, this.gameTime))
      && this.score > 20) {
        const position: TCoordinates = { x: 0, y: 0 };
        const seed = Math.random();

        let obstacleType = OBSTACLE_TYPES.TYPE1.name;
        let obstacleWidth = OBSTACLE_TYPES.TYPE1.width;
        let obstacleGap = OBSTACLE_TYPES.TYPE1.gap;

        if (seed > 0.333 && seed <= 0.666) {
          obstacleType = OBSTACLE_TYPES.TYPE2.name;
          obstacleWidth = OBSTACLE_TYPES.TYPE2.width;
          obstacleGap = OBSTACLE_TYPES.TYPE2.gap;
        } else
        if (seed > 0.666) {
          obstacleType = OBSTACLE_TYPES.TYPE3.name;
          obstacleWidth = OBSTACLE_TYPES.TYPE3.width;
          obstacleGap = OBSTACLE_TYPES.TYPE3.gap;
        }

        const leftPosition = GAME_SETTINGS.OBSTACLE_MARGIN_FROM_SIDE;
        const rightPosition = this.canvas.width - GAME_SETTINGS.OBSTACLE_MARGIN_FROM_SIDE - obstacleWidth;

        if (Math.random() < 0.5) {
          position.x = leftPosition;
          position.y = -obstacleGap;
          isLeft = true;
        } else {
          position.x = rightPosition;
          position.y = -obstacleGap;
          isLeft = false;
        }

        if (obstacles.length > 0) {
          if (obstacles[obstacles.length - 1].position.y > prevObstacleGap) {

            if (isLeft === isLeftPrev) {
              oneSideCounter++;
            } else {
              oneSideCounter = 1;
            }

            if (oneSideCounter > GAME_SETTINGS.MAXIMUM_OBSTACLES_PER_SIDE) {
              // Switch obstacle position to avoid long sequence obtacles on one side
              if (isLeft) {
                position.x = rightPosition;
              } else {
                position.x = leftPosition;
              }

              oneSideCounter = 0;
            }

            this.stage!.addEntitiesToKey(
              obstaclesEntitiesKey,
              [new Obstacle(position, this.speedModifierRefernce, obstacleType)]
            );

            isLeftPrev = isLeft;
            prevObstacleGap = obstacleGap;
          }
        } else {
        this.stage!.addEntitiesToKey(
          obstaclesEntitiesKey,
          [new Obstacle(position, this.speedModifierRefernce, obstacleType)]
        );
        }
      }
    };
  }

  generateObstacles = this.generateObstaclesWithOneSideCounter(GAME_SETTINGS.OBSTACLES_ENTITIES_KEY);

  reset(): void {
    this.isGameOver = false;
    this.setGameOverStatus(this.isGameOver);

    this.gameTime = 0;
    this.isShipDestroyed = false;
    this.col = 0;
    this.score = 0;
    this.speedModifierRefernce.speedModifier = GAME_SETTINGS.BASE_SPEED_MODIFIER;

    this.setHull(this.ship!.hullStrength);

    this.vibrationController.stopVibration();

    this.stage!.clearEntitiesByKey(GAME_SETTINGS.WALLS_ENTITIES_KEY);
    this.stage!.clearEntitiesByKey(GAME_SETTINGS.OBSTACLES_ENTITIES_KEY);

    this.ship!.position = {
      x: GAME_SETTINGS.SPACESHIP_MARGIN_FROM_SIDE,
      y: (this.canvas.height / 2) + (GAME_SETTINGS.GAME_AREA_HEIGHT / 2) - GAME_SETTINGS.SPACESHIP_MARGIN_FROM_BOTTOM };

    this.initWalls(GAME_SETTINGS.WALLS_ENTITIES_KEY);
  }

  render(): void {
    this.stage!.renderBackgroundPattern(this.canvas.width, this.canvas.height);
    this.stage!.renderEntities();
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

      const isCollision = boxCollides(pos, size, this.ship!.getHitBoxPosition(), this.ship!.getHitBoxSize());

      if (isCollision) {
        if (!this.isShipDestroyed) {
          this.col++;
        }
        if (this.ship!.status === SHIP_STATUS.NORMAL) {
          this.ship!.setStatusToDamage();
          setTimeout(() => {
            if (!this.isGameOver && this.ship!.status !== SHIP_STATUS.DESTROYED) {
              this.ship!.setStatusToNormal();
            }
          }, 500);
        }
        if (!this.vibrationController.checkInterval() && this.vibration) {
          this.vibrationController.startPersistentVibrate([200], 100);
        }
      } else if (this.vibrationController.checkInterval()) {
        const current = this.col;
        setTimeout(() => {
          if (current === this.col) {
            this.vibrationController.stopVibration();
          }
        }, 500);
      }
    });
  }

  update(dt: number): void {
    if (!this.isGamePaused) {
      this.gameTime += dt;
      this.pixelCount += GAME_SETTINGS.WALL_BASE_SPEED * GAME_SETTINGS.BASE_SPEED_MODIFIER * dt;

      this.updateEntities(dt);
      this.generateObstacles();

      if (this.pixelCount >= GAME_SETTINGS.PIXELS_PER_DISTANCE_UNIT && !this.isShipDestroyed) {
        this.score++;
        this.pixelCount = 0;

        if (this.score % GAME_SETTINGS.DISTANCE_TO_INCREASE_SPEED === 0 && this.pixelCount === 0) {
          this.speedModifierRefernce.speedModifier += GAME_SETTINGS.SPEED_MODIFIER_INCREMENT;
        }
      }

      if (this.col >= this.ship!.hullStrength) {
        if (this.ship!.status !== SHIP_STATUS.DESTROYED) {
          this.isShipDestroyed = true;
          this.ship!.setStatusToDestroyed();
        }
        if (this.ship!.sprite.animationDone && !this.isGameOver) {
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

    if (this.isSoundOn) {
      this.bgMusic.play();
    }

    this.stage.addEntitiesToKey(GAME_SETTINGS.SPACESHIP_ENTITY_KEY, [new SpaceShip({ x: 0, y: 0 })]);
    this.ship = this.stage.getEntitiesByKey(GAME_SETTINGS.SPACESHIP_ENTITY_KEY)[0] as SpaceShip;
    this.setControls();

    this.reset();
    this.lastTime = performance.now();
    this.mainLoop();
  };
}
