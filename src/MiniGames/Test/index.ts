import { MiniGameClass } from "@GameObjects/MiniGame";
import Phaser from "phaser";

import BootScene from "./Scenes/Boot";
import GameScene from "./Scenes/Game";
import PreloadScene from "./Scenes/Preload";

export default class TestGame extends Phaser.Game {
  constructor(parent: HTMLElement) {
    super({
      title: "Mini Test Game",
      type: Phaser.WEBGL,
      disableContextMenu: true,
      backgroundColor: Phaser.Display.Color.RandomRGB().color,
      scale: {
        parent,
        width: 250,
        height: 250,
      },
      loader: {
        path: "test-mini-game",
      },
      scene: [BootScene, PreloadScene, GameScene],
    });
  }
}
