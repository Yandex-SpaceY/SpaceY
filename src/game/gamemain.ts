import { Dispatch, SetStateAction } from 'react';

import Resources from './resources';
import Sprite from './sprite';

enum STATE {
  FLIGHT = 'flight',
  SHIFT = 'shift',
}

enum SIDE {
  LEFT = 'left',
  RIGHT = 'right',
}

enum KEYS {
  ESC = 'Escape',
  SPACEBAR = 'Space',
}

const CONTROLS = {
  PAUSE: KEYS.ESC,
  SHIFT: KEYS.SPACEBAR
};

type TPlayer = {
  pos: [number, number];
  side: SIDE.LEFT | SIDE.RIGHT;
  state: STATE.FLIGHT | STATE.SHIFT;
  sprite: Sprite;
};

type TObject = {
  pos: [number, number];
  sprite: Sprite;
};

export default class GameMain {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  resources: Resources;
  lastTime: number;

  player: TPlayer;

  walls: TObject[];
  debris: TObject[];

  isGameOver: boolean;
  isGamePaused: boolean;
  gameTime: number;
  bgPattern: CanvasPattern | null;

  score: number;
  col: number;

  playerSpeed: number;
  wallsSpeed: number;
  debrisSpeed: number;

  setCollisions: Dispatch<SetStateAction<number>>;
  setScore: Dispatch<SetStateAction<number>>;
  setGameOverStatus: Dispatch<SetStateAction<boolean>>;
  setGamePauseStatus: Dispatch<SetStateAction<boolean>>;

  constructor(
    canvas: HTMLCanvasElement,
    setCollisions: Dispatch<SetStateAction<number>>,
    setScore: Dispatch<SetStateAction<number>>,
    setGameOverStatus: Dispatch<SetStateAction<boolean>>,
    setGamePauseStatus: Dispatch<SetStateAction<boolean>>
  ) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.lastTime = Date.now();
    this.isGameOver = false;
    this.isGamePaused = false;

    this.resources = new Resources();

    this.player = {
      pos: [ 0, 0 ],
      side: SIDE.LEFT,
      state: STATE.FLIGHT,
      sprite: new Sprite('https://sapcey.netlify.app/img/sprites.png', [ 0, 0 ], [ 34, 34 ], 13, [ 0, 1 ]),
    };

    this.walls = [];
    this.debris = [];

    this.gameTime = 0;
    this.bgPattern = null;

    this.score = 0;
    this.col = 0;

    this.playerSpeed = 300;
    this.wallsSpeed = 100;
    this.debrisSpeed = 100;

    this.resources.load([ 'https://sapcey.netlify.app/img/sprites.png', 'https://sapcey.netlify.app/img/bg.png' ]);
    this.resources.onReady(this.init);
    this.setControls();

    this.setCollisions = setCollisions;
    this.setScore = setScore;
    this.setGameOverStatus = setGameOverStatus;
    this.setGamePauseStatus = setGamePauseStatus;
  }

  setControls(): void {
    document.addEventListener('keydown', this.controls);
  }

  unsetControlsAndSubscriptions(): void {
    document.removeEventListener('keydown', this.controls);

    this.setCollisions(0);
    this.setScore(0);
    this.setGameOverStatus(false);
    this.setGamePauseStatus(false);
  }

  controls = (event: KeyboardEvent): void => {
    if (event.code === CONTROLS.SHIFT) {
      if (!this.isGamePaused) {
        if (this.player.side === SIDE.RIGHT) {
          this.player.side = SIDE.LEFT;
          this.player.state = STATE.SHIFT;
        } else {
          this.player.side = SIDE.RIGHT;
          this.player.state = STATE.SHIFT;
        }
      }
    } else if (event.key === CONTROLS.PAUSE as unknown as string) {
      this.togglePauseStatus();
      this.setGamePauseStatus(this.isGamePaused);
    }
  };

  togglePauseStatus(): void {
    this.isGamePaused = !this.isGamePaused;
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
    this.bgPattern = this.ctx.createPattern(
      this.resources.get('https://sapcey.netlify.app/img/bg.png') as CanvasImageSource,
      'repeat'
    );

    this.reset();
    this.lastTime = performance.now();
    this.mainLoop();
  };

  update(dt: number): void {
    if (!this.isGamePaused) {
      this.gameTime += dt;

      this.updateEntities(dt);

      if (Math.random() < 1 - Math.pow(0.993, this.gameTime)) {
        let pos: [number, number] = [ 0, 0 ];
        if (Math.random() < 0.5) {
          pos = [ 42, -85 ];
        } else {
          pos = [ this.canvas.width - 42 - 187, -85 ];
        }
        if (this.debris.length > 0) {
          if (this.debris[this.debris.length - 1].pos[1] > 84) {
            this.debris.push({
              pos: pos,
              sprite: new Sprite('https://sapcey.netlify.app/img/sprites.png', [ 0, 129 ], [ 187, 85 ]),
            });
          }
        } else {
          this.debris.push({
            pos: pos,
            sprite: new Sprite('https://sapcey.netlify.app/img/sprites.png', [ 0, 129 ], [ 187, 85 ]),
          });
        }
      }

      this.score++;

      if (this.col > 100) {
        this.isGameOver = true;
      }

      this.checkCollisions();
      this.setCollisions(this.col);
      this.setScore(this.score);
      this.setGameOverStatus(this.isGameOver);
      this.setGamePauseStatus(this.isGamePaused);
    }
  }

  updateEntities(dt: number): void {
    // Update the player sprite animation
    if (this.player.side === SIDE.RIGHT && this.player.state === STATE.SHIFT) {
      if (this.player.pos[0] < this.canvas.width / 2 + 102 - 17) {
        this.player.pos[0] += this.playerSpeed * dt;
      } else {
        this.player.state = STATE.FLIGHT;
      }
    } else if (this.player.side === SIDE.LEFT && this.player.state === STATE.SHIFT) {
      if (this.player.pos[0] > this.canvas.width / 2 - 102 - 17) {
        this.player.pos[0] -= this.playerSpeed * dt;
      } else {
        this.player.state = STATE.FLIGHT;
      }
    }
    this.player.sprite.update(dt);

    // Update all walls
    for (let i = 0; i < this.walls.length; i++) {
      this.walls[i].pos[1] += this.wallsSpeed * dt;
      this.walls[i].sprite.update(dt);

      // Remove if offscreen
      if (this.walls[i].pos[1] > this.canvas.height) {
        this.walls[i].pos[1] = 0 - 96;
      }
    }

    // Update all debris
    for (let i = 0; i < this.debris.length; i++) {
      this.debris[i].pos[1] += this.debrisSpeed * dt;
      this.debris[i].sprite.update(dt);

      // Remove if offscreen
      if (this.debris[i].pos[1] > this.canvas.height) {
        this.debris.splice(i, 1);
        i--;
      }
    }
  }

  collides(
    x: number, y: number,
    r: number, b: number,
    x2: number, y2: number,
    r2: number, b2: number
  ): boolean {
    return !(r <= x2 || x > r2 || b <= y2 || y > b2);
  }

  boxCollides(
    pos: [number, number],
    size: [number, number],
    pos2: [number, number],
    size2: [number, number]
  ): boolean {
    return this.collides(
      pos[0], pos[1],
      pos[0] + size[0], pos[1] + size[1],
      pos2[0], pos2[1],
      pos2[0] + size2[0], pos2[1] + size2[1]
    );
  }

  checkPlayerBounds(): void {
    // Check bounds
    if (this.player.pos[0] < 0) {
      this.player.pos[0] = 0;
    } else if (this.player.pos[0] > this.canvas.width - this.player.sprite.size[0]) {
      this.player.pos[0] = this.canvas.width - this.player.sprite.size[0];
    }

    if (this.player.pos[1] < 0) {
      this.player.pos[1] = 0;
    } else if (this.player.pos[1] > this.canvas.height - this.player.sprite.size[1]) {
      this.player.pos[1] = this.canvas.height - this.player.sprite.size[1];
    }
  }

  checkCollisions(): void {
    this.checkPlayerBounds();

    for (let i = 0; i < this.debris.length; i++) {
      const pos = this.debris[i].pos;
      const size = this.debris[i].sprite.size;

      if (this.boxCollides(pos, size, this.player.pos, this.player.sprite.size)) {
        this.col++;
      }
    }
  }

  renderEntities(list: TObject[]): void {
    for (let i = 0; i < list.length; i++) {
      this.renderEntity(list[i]);
    }
  }

  renderEntity(entity: TObject | TPlayer): void {
    this.ctx.save();
    this.ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(this.ctx, this.resources);
    this.ctx.restore();
  }

  render(): void {
    this.ctx.fillStyle = this.bgPattern as CanvasPattern;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render the player if the game isn't over
    if (!this.isGameOver) {
      this.renderEntity(this.player);
    }

    this.renderEntities(this.walls);
    this.renderEntities(this.debris);
  }

  reset(): void {
    this.isGameOver = false;
    this.gameTime = 0;
    this.col = 0;
    this.score = 0;

    this.walls = [];
    this.debris = [];

    this.player.pos = [ this.canvas.width / 2 - 102 - 17, this.canvas.height - 120 ];

    const numberOfWalls = Math.ceil(this.canvas.height / 96) + 1;

    for (let i = 1; i <= numberOfWalls; i++) {
      this.walls.push({
        pos: [ 0 - 42, this.canvas.height - i * 96 ],
        sprite: new Sprite('https://sapcey.netlify.app/img/sprites.png', [ 0, 34 ], [ 85, 96 ]),
      });
      this.walls.push({
        pos: [ this.canvas.width - 85 + 42, this.canvas.height - i * 96 ],
        sprite: new Sprite('https://sapcey.netlify.app/img/sprites.png', [ 0, 34 ], [ 85, 96 ]),
      });
    }
  }
}
