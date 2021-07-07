import { GAME_SETTINGS } from 'game/constants';
import { Resources, Stage } from 'game/core';

export default class MainStage extends Stage {
  constructor(context: CanvasRenderingContext2D, resources: Resources) {
    super(context, resources);
    this.setBackgroundPattern(GAME_SETTINGS.MAIN_STAGE_BACKGROUND_PATH);
  }
}
