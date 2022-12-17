import BaseScene from "@Helpers/BaseScene";

import "@GameObjects/MiniGame";

export default class GameScene extends BaseScene {
  constructor() {
    super("Game");
  }

  create() {
    /**
     * Do stuff
     */
    this.add
      .text(
        this.renderer.width / 2,
        this.renderer.height / 2,
        "THIS IS MAIN GAME\nCLICK TO TRIGGER MINI-GAME",
        { color: "black", resolution: 2, align: "center" }
      )
      .setOrigin(0.5);

    this.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      (pointer: Phaser.Input.Pointer) =>
        this.add.miniGame(pointer.x, pointer.y, "Test").setOrigin(0.5)
    );
  }
}
