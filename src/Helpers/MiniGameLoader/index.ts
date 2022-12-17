import { PhaserUtils } from "@Helpers/PhaserUtils";

/**
 * Extend Namespace to support TS
 */
declare global {
  namespace Phaser.Loader {
    interface LoaderPlugin {
      miniGame(
        ...params: PhaserUtils.FileTypeParams<typeof MiniGameFile>
      ): void;
    }
  }
}

/**
 * Custom loader to Code-split and load scene code chunks on demand
 */
@PhaserUtils.RegisterFileType("miniGame")
class MiniGameFile extends Phaser.Loader.File {
  constructor(loader: Phaser.Loader.LoaderPlugin, key: string) {
    super(loader, {
      type: "miniGame",
      //@ts-ignore
      cache: loader.cacheManager.addCustom("miniGame"),
      key,
    });
  }

  /**
   * Load Specific Game module which is splitted from main bundle during build time
   */
  private importModule(miniGame: string): Promise<typeof Phaser.Scene> {
    return import(`../../MiniGames/${miniGame}/index.ts`).then(
      (m) => m.default
    );
  }

  load(): void {
    /**
     * Load Module
     */
    this.importModule(this.key)
      /**
       * Save to data and trigger onLoad callback
       */
      .then((GameClass) => ((this.data = GameClass), this.onLoad()))
      /**
       * Log Error
       */
      .catch((err) => {
        console.log(err);
        this.onError();
      });
  }

  onError(): void {
    this.loader.nextFile(this, false);
  }

  onLoad(): void {
    this.loader.nextFile(this, true);
  }
}
