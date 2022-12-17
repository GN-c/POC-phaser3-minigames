import { Handler } from "./base";
//@ts-ignore
import glslify from "glslify";
//@ts-ignore
import glslOptimizer from "glsl-optimizer-js";
import { GlslMinify } from "webpack-glsl-minify/build/minify";

export class GLSLHandler extends Handler {
  supportedExtensions = /.glsl/;

  async handle(contentBuffer: Buffer) {
    const srcGLSL = contentBuffer.toString();
    /** Decompose loaded glsl */
    const { phaserHeaders, GLSLs } = this.decomposePhaserBundle(srcGLSL);

    /**
     * Compose GLSL Back
     */
    if (this.isDevelopment)
      return Buffer.from(
        this.composePhaserBundle(
          phaserHeaders,
          /**
           * only run glslify in development mode
           */
          GLSLs.map((GLSL) => glslify(GLSL))
        )
      );
    else
      return Buffer.from(
        this.composePhaserBundle(
          phaserHeaders,
          /**
           * GLSLify -> Optimize -> Minify glsl code
           */
          await Promise.all(
            GLSLs.map((GLSL) =>
              this.minifier
                .execute(this.optimizeGLSL(glslify(GLSL), 2, 0))
                .then((shader) => shader.sourceCode)
            )
          )
        )
      );
  }

  /**
   * Optimize GLSL code performance
   * More details: https://github.com/aras-p/glsl-optimizer
   *
   * extract optimize function from wasm
   */
  private readonly optimizeGLSL = glslOptimizer().cwrap(
    "optimize_glsl",
    "string",
    ["string", "number", "number"]
  ) as (source: string, shaderType: number, vertexShader: 0 | 1) => string;

  /**
   * GLSL Code Minifier
   */
  private readonly minifier = new GlslMinify({
    preserveUniforms: true,
    includesOnly: this.isDevelopment,
    nomangle: ["getSampler", "count"],
  });

  /**
   * Separate phaser headers from shader code
   *
   * Since Phaser acceptable glsl code can also contain code for multiple shaders separated by headers
   * we try splitting code into multiple subparts
   *
   * phaser header is separated from glsl code using '---'
   * you can see example here: https://labs.phaser.io/assets/shaders/bundle2.glsl.js
   *
   */
  private readonly delimiter = "---";
  private decomposePhaserBundle(GLSL: string) {
    const phaserHeaders: string[] = [];
    const GLSLs: string[] = [];

    /** Check if we have any header at all */
    if (GLSL.includes(this.delimiter)) {
      /** Remove stuff before starting of first header */
      GLSL.slice(GLSL.indexOf(this.delimiter) + this.delimiter.length)
        /** Split on each delimiter */
        .split(this.delimiter)
        .forEach((str, index) =>
          index % 2 ? GLSLs.push(str) : phaserHeaders.push(str)
        );
      return { phaserHeaders, GLSLs };
    } else
    /**
     * Simply return glsl code directly without headers
     */
      return { phaserHeaders: [], GLSLs: [GLSL] };
  }

  /**
   * Combine headers and glsl into Phaser acceptable code
   */
  private composePhaserBundle(phaserHeaders: string[], GLSLs: string[]) {
    /** Check if we have any header at all, since it's not mandatory */
    if (phaserHeaders.length) {
      let GLSL = "";
      for (let i = 0; i < GLSLs.length; i++)
        GLSL += "---\n" + phaserHeaders[i].trim() + "\n---\n" + GLSLs[i].trim();
      return GLSL;
      /** Otherwise simply return glsl code  */
    } else return GLSLs[0];
  }
}
