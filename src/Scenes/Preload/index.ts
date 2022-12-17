import BaseScene from "@Helpers/BaseScene";
import "@Helpers/SceneLoader";

export default class PreloadScene extends BaseScene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.sceneModule("Game");
  }

  create() {
    /**
     * Start next scene
     */
    this.scene.start("Game");
  }
}
