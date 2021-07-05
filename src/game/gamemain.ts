import { Dispatch, SetStateAction } from 'react';

import { GAME_SETTINGS } from 'game/constants';
import { MainStage } from 'game/stages';
import { Entity, Resources, Stage } from 'game/core';
import { SpaceShip, Wall } from 'game/entities';
export default class GameMain {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  resources: Resources;
  lastTime: number;

  isGameOver: boolean;
  isGamePaused: boolean;
  gameTime: number;

  ship: Entity | null;

  score: number;
  col: number;

  stage: Stage;

  setCollisions: Dispatch<SetStateAction<number>>;
  setScore: Dispatch<SetStateAction<number>>;
  setGameOverStatus: (isGameOver: boolean) => void;
  setGamePauseStatus: (isGamePaused: boolean) => void;

  constructor(
    canvas: HTMLCanvasElement,
    setCollisions: Dispatch<SetStateAction<number>>,
    setScore: Dispatch<SetStateAction<number>>,
    setGameOverStatus: (isGameOver: boolean) => void,
    setGamePauseStatus: (isGamePaused: boolean) => void
  ) {
    this.canvas = canvas;
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

    this.stage = new MainStage(this.context, this.resources);

    this.setCollisions = setCollisions;
    this.setScore = setScore;
    this.setGameOverStatus = setGameOverStatus;
    this.setGamePauseStatus = setGamePauseStatus;
  }

  init = (): void => {
    this.lastTime = performance.now();

    this.stage.addEntitiesToKey(GAME_SETTINGS.SPACESHIP_ENTITY_KEY, [new SpaceShip({ x: 0, y: 0 })]);
    this.ship = this.stage.getEntitiesByKey(GAME_SETTINGS.SPACESHIP_ENTITY_KEY)[0];
  };

  reset(): void {
    this.isGameOver = false;
    this.setGameOverStatus(this.isGameOver);

    this.gameTime = 0;
    this.col = 0;
    this.score = 0;

    this.stage.clearEntitiesByKey(GAME_SETTINGS.WALLS_ENTITIES_KEY);
    this.stage.clearEntitiesByKey(GAME_SETTINGS.OBSTACLES_ENTITIES_KEY);

    this.ship!.position = { x: this.canvas.width / 2 - 102 - 17, y: this.canvas.height - 120 };

    this.initWalls();

  }

  render(): void {
    this.stage.renderBackgroundPattern(this.canvas.width, this.canvas.height);

    // Render the player if the game isn't over
    if (!this.isGameOver) {
      this.stage.renderEntities(GAME_SETTINGS.SPACESHIP_ENTITY_KEY);
    }

    this.stage.renderEntities(GAME_SETTINGS.WALLS_ENTITIES_KEY);
    this.stage.renderEntities(GAME_SETTINGS.OBSTACLES_ENTITIES_KEY);
  }

  initWalls(): void {
    const numberOfWalls = Math.ceil(this.canvas.height / 96) + 1;
    for (let i = 1; i <= numberOfWalls; i++) {
      this.stage.addEntitiesToKey(
        GAME_SETTINGS.WALLS_ENTITIES_KEY,
        [new Wall({ x: 0 - 42, y: this.canvas.height - i * 96 })]);
      this.stage.addEntitiesToKey(
        GAME_SETTINGS.WALLS_ENTITIES_KEY,
        [new Wall({ x: this.canvas.width - 85 + 42, y: this.canvas.height - i * 96 })]);
    }
  }

}
