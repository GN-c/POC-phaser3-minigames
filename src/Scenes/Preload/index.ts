import BaseScene from "@Helpers/BaseScene";
import "@Helpers/MiniGameLoader";

export default class PreloadScene extends BaseScene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.miniGame("Test");
  }

  create() {
    /**
     * Start next scene
     */
    this.scene.start("Game");
  }
}
