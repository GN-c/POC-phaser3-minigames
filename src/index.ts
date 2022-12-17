import Phaser from "phaser";

import "@Helpers/WebFontLoader";

import BootScene from "@Scenes/Boot";
import PreloadScene from "@Scenes/Preload";
import GameScene from "@Scenes/Game";

export default class Game extends Phaser.Game {
  constructor(parent: HTMLElement) {
    super({
      title: "Main Game",
      type: Phaser.WEBGL,
      disableContextMenu: true,
      transparent: true,
      scale: {
        parent,
        mode: Phaser.Scale.ScaleModes.RESIZE,
      },
      dom: {
        createContainer: true,
      },
      scene: [BootScene, PreloadScene, GameScene],
    });
  }
}
