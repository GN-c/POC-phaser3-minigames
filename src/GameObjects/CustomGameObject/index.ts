import { PhaserUtils } from "@Helpers/PhaserUtils";

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      customGameObject(
        ...params: PhaserUtils.GameObjectParams<typeof CustomGameObject>
      ): CustomGameObject;
    }
  }
}

@PhaserUtils.RegisterGameObject("customGameObject")
export class CustomGameObject extends Phaser.GameObjects.GameObject {
  constructor(scene: Phaser.Scene) {
    super(scene, "");
  }
}
