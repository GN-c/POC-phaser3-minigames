import { Handler } from "./base";

export class JSONHandler extends Handler {
  supportedExtensions = /.json/;

  async handle(content: Buffer) {
    return this.isDevelopment
      ? content
      : Buffer.from(JSON.stringify(JSON.parse(content.toString())));
  }
}
