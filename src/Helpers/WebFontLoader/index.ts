import { PhaserUtils } from "@Helpers/PhaserUtils";

/**
 * Extend Namespace to support TS
 */
declare global {
  namespace Phaser.Loader {
    interface LoaderPlugin {
      webFont(...params: PhaserUtils.FileTypeParams<typeof WebFontFile>): void;
    }
  }
}

/**
 * Custom loader to load Web fonts in Phaser way
 */
@PhaserUtils.RegisterFileType("webFont")
class WebFontFile extends Phaser.Loader.File {
  private font?: FontFace;
  constructor(
    loader: Phaser.Loader.LoaderPlugin,
    key: string,
    url: string,
    private descriptors?: FontFaceDescriptors
  ) {
    super(loader, {
      type: "webfont",
      key,
      url,
    });
  }

  load(): void {
    /**
     * Create Font Face and Start loading it
     */
    this.font = new FontFace(
      this.key,
      `url(${Phaser.Loader.GetURL(this, this.loader.baseURL)})`,
      this.descriptors
    );
    this.font
      .load()
      .then(() => this.onLoad())
      .catch((err) => {
        console.log(err);
        this.onError();
      });
  }

  onError(): void {
    this.loader.nextFile(this, false);
  }

  onLoad(): void {
    //@ts-ignore
    document.fonts.add(this.font!);
    this.loader.nextFile(this, true);
  }
}
