import Phaser from "phaser";

import "@Helpers/SceneLoader";
import "@Helpers/WebFontLoader";

import BootScene from "@Scenes/Boot";
import PreloadScene from "@Scenes/Preload";

export default class Game extends Phaser.Game {
  constructor(parent: HTMLElement) {
    super({
      type: Phaser.WEBGL,
      disableContextMenu: true,
      transparent: true,
      scale: {
        parent,
        mode: Phaser.Scale.ScaleModes.RESIZE,
      },
      scene: [BootScene, PreloadScene],
    });
  }
}
