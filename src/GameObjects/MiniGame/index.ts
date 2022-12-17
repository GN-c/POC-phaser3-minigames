import { PhaserUtils } from "@Helpers/PhaserUtils";

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      miniGame(
        ...params: PhaserUtils.GameObjectParams<typeof MiniGame>
      ): MiniGame;
    }
  }
}

export type MiniGameClass<T extends Phaser.Game = Phaser.Game> = new (
  parent: HTMLElement
) => T;

@PhaserUtils.RegisterGameObject("miniGame")
export class MiniGame extends Phaser.GameObjects.DOMElement {
  declare node: HTMLDivElement;

  private readonly GameClass: MiniGameClass;
  private readonly game: Phaser.Game;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    readonly miniGameKey: string
  ) {
    super(scene, x, y, document.createElement("div"));

    /**
     * Get Mini Game Class from cache
     */
    this.GameClass = this.scene.cache.custom.miniGame.get(this.miniGameKey);

    /**
     * Create instance of game
     */
    this.game = new this.GameClass(this.node);

    /**
     * Destroy this Gameobject if Game is Destroyed internally
     */
    this.game.events.once(Phaser.Core.Events.DESTROY, this.destroy, this);

    /**
     * Update size of div
     */
    this.updateSize();
  }

  destroy(fromScene?: boolean) {
    super.destroy(fromScene);
    /**
     * Destroy Game if this Gameobject is destroyed
     */
    this.game.destroy(true, false);
  }
}
