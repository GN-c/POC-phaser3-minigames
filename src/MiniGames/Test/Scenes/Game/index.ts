import BaseScene from "@Helpers/BaseScene";

export default class GameScene extends BaseScene {
  crosshair: Phaser.GameObjects.Image;
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
        "THIS IS TEST MINI-GAME\nCLICK TO CLOSE MINI-GAME",
        { color: "white", resolution: 2, align: "center" }
      )
      .setOrigin(0.5);

    /**
     * Destroy this Game instance if clicked
     */
    this.input.once(Phaser.Input.Events.POINTER_DOWN, () =>
      this.game.destroy(true, false)
    );

    /**
     * Create Crosshair
     */
    this.crosshair = this.add
      .image(0, 0, "crosshair")
      .setScale(0.5)
      .setOrigin(0.5);
  }

  update(): void {
    if (this.input.activePointer)
      this.crosshair
        .setPosition(
          Phaser.Math.Linear(this.crosshair.x, this.input.activePointer.x, 0.3),
          Phaser.Math.Linear(this.crosshair.y, this.input.activePointer.y, 0.3)
        )
        .setAngle(this.crosshair.angle + 1);
  }
}
