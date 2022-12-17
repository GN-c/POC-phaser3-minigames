/**
 * Import original mixin method that phaser uses for combining components
 */
// const _mixin = require("phaser/src/utils/Class.js").mixin;

/**
 * Utils for helping with Phaser stuff
 */
export namespace PhaserUtils {
  /**
   * Returns Parameter type for Phaser.GameObjects.GameObject and it's descendants
   */
  export type GameObjectParams<
    G extends new (...params: any) => Phaser.GameObjects.GameObject
  > = G extends new (
    scene: Phaser.Scene,
    ...params: infer P
  ) => Phaser.GameObjects.GameObject
    ? P
    : never;

  /**
   * Returns Parameter type for Phaser.Loader.File and it's descendants
   */
  export type FileTypeParams<
    G extends new (...params: any) => Phaser.Loader.File
  > = G extends new (
    loader: Phaser.Loader.LoaderPlugin,
    ...params: infer P
  ) => Phaser.Loader.File
    ? P
    : never;

  /**
   * TS Class Decorator for Registering Gameobject
   */
  export function RegisterGameObject(key: string) {
    return (GameObjectClass: any) => {
      Phaser.GameObjects.GameObjectFactory.register(
        key,
        function (this: Phaser.GameObjects.GameObjectFactory, ...args: any[]) {
          const gameObject = new GameObjectClass(this.scene, ...args);
          return this.scene.add.existing(gameObject);
        }
      );
      return GameObjectClass;
    };
  }

  /**
   * TS Class Decorator for Registering Gameobject
   */
  export function RegisterFileType(key: string) {
    return (FileTypeClass: any) => {
      Phaser.Loader.FileTypesManager.register(
        key,
        function (this: Phaser.Loader.LoaderPlugin, ...args: any[]) {
          this.addFile(new FileTypeClass(this, ...args));
        }
      );
      return FileTypeClass;
    };
  }
}
