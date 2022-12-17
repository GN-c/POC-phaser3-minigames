export abstract class Handler {
  public abstract readonly supportedExtensions: RegExp;

  constructor(public readonly mode: "development" | "production") {}

  abstract handle(content: Buffer): Promise<Buffer>;

  get isDevelopment() {
    return this.mode == "development";
  }

  get isProduction() {
    return this.mode == "production";
  }
}
