import { PhaserUtils } from "@Helpers/PhaserUtils";

/**
 * Extend Namespace to support TS
 */
declare global {
  namespace Phaser.Loader {
    interface LoaderPlugin {
      sceneModule(
        ...params: PhaserUtils.FileTypeParams<typeof SceneModuleFile>
      ): void;
    }
  }
}

/**
 * Custom loader to Code-split and load scene code chunks on demand
 */
@PhaserUtils.RegisterFileType("sceneModule")
class SceneModuleFile extends Phaser.Loader.File {
  constructor(loader: Phaser.Loader.LoaderPlugin, key: string) {
    super(loader, {
      type: "scene",
      key,
    });
  }

  /**
   * Load Specific Scene module which is splitted from main bundle during build time
   */
  private importModule(sceneKey: string): Promise<typeof Phaser.Scene> {
    return import(`../../Scenes/${sceneKey}/index.ts`).then((m) => m.default);
  }

  load(): void {
    /**
     * Load Module
     */
    this.importModule(this.key)
      /**
       * Save to data and trigger onLoad callback
       */
      .then((SceneClass) => ((this.data = SceneClass), this.onLoad()))
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
    /**
     * Add Scene to ScenePlugin
     */
    this.loader.scene.scene.add(this.key, this.data, false);
    this.loader.nextFile(this, true);
  }
}
