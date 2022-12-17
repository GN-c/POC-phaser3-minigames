import CopyPlugin from "copy-webpack-plugin";
import { JSONHandler, Handler, GLSLHandler } from "./Handlers";

export default class AssetOptimizationPlugin extends CopyPlugin {
  private handlers: readonly Handler[] = [
    new JSONHandler(this.mode),
    new GLSLHandler(this.mode),
  ];

  constructor(private readonly mode: "development" | "production") {
    super({
      patterns: [
        {
          from: "assets",
          to: "./",
          transform: async (content, filePath) => {
            /**
             * Find needed handler
             */
            const handler = this.handlers.find((handler) =>
              handler.supportedExtensions.test(filePath)
            );
            /**
             * Try running handler if it exists
             * otherwise return same content
             */
            if (handler)
              try {
                return await handler.handle(content);
              } catch {
                return content;
              }
            else return content;
          },
        },
      ],
    });
  }
}
