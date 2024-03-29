export const GAME_SETTINGS = {
  GAME_AREA_WIDTH: 360,
  GAME_AREA_HEIGHT: 667,
  OBJECT_SPRITES_PATH: './assets/sprites.png',
  MAIN_STAGE_BACKGROUND_PATH: './assets/bg.png',
  MAIN_MUSIC_PATH: './assets/music.mp3',
  MAIN_MUSIC_VOLUME: 0.2,
  REPAIR_SOUND_PATH: './assets/repair.mp3',
  REPAIR_SOUND_VOLUME: 0.6,
  PIXELS_PER_DISTANCE_UNIT: 10, // Number of pixel passed to increase score distance
  DISTANCE_TO_INCREASE_SPEED: 200, // Number of distance passed to increase speed modifier
  SPACESHIP_ENTITY_KEY: 'ship',
  SPACESHIP_BASE_SPEED: 300,
  SPACESHIP_MARGIN_FROM_BOTTOM: 120,
  SPACESHIP_MARGIN_FROM_SIDE: 72,
  OBSTACLES_ENTITIES_KEY: 'obstacles',
  OBSTACLE_BASE_SPEED: 100,
  OBSTACLE_MARGIN_FROM_SIDE: 42,
  MAXIMUM_OBSTACLES_PER_SIDE: 5, // Maximum number of obstacles in a raw on one side
  WALLS_ENTITIES_KEY: 'walls',
  WALL_BASE_SPEED: 100,
  WALL_VISIBLE_PART_FROM_SIDE: 42,
  REPAIR_ENTITY_KEY: 'repair',
  REPAIR_STRENGTH: 25,
  REPAIR_MARGIN_FROM_SIDE: 70,
  SHIP_HULL_STRENGTH: 100,
};

export const SKILL_LEVEL_SETTINGS = {
  SPEED_MODIFIER: [ 1, 1.3, 1.5 ],
  SPEED_MODIFIER_INCREMENT: [ 0.1, 0.3, 0.4 ],
  REPAIR_PROBABILITY_DECREMENT: [ 0, 0.3, 0.6 ]
};

export const OBSTACLE_TYPES = {
  TYPE1: {
    name: 'TYPE1',
    width: 187,
    gap: 85,
  },
  TYPE2: {
    name: 'TYPE2',
    width: 187,
    gap: 65,
  },
  TYPE3: {
    name: 'TYPE3',
    width: 84,
    gap: 56,
  },
};

export enum GAME_KEYS {
  ESC = 'Escape',
  SPACEBAR = 'Space',
}

export const GAME_CONTROLS = {
  PAUSE: GAME_KEYS.ESC as string,
  SHIFT: GAME_KEYS.SPACEBAR as string
};

export enum RESOURCES_FILE_EXTENSIONS {
  IMAGES = 'png',
  SOUNDS = 'mp3|mp4'
}
