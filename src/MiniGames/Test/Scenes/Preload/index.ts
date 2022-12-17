import BaseScene from "@Helpers/BaseScene";

export default class PreloadScene extends BaseScene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.image("crosshair");
  }

  create() {
    /**
     * Start next scene
     */
    this.scene.start("Game");
  }
}
