import Game from "@Game";

/**
 * Base Scene class for all main scenes
 */
export default abstract class BaseScene extends Phaser.Scene {
  declare renderer: Phaser.Renderer.WebGL.WebGLRenderer;
  declare game: Game;

  constructor(key: string) {
    super(key);
  }

  /**
   * Place div in the top left corner to display ms needed for each frame calculation
   */
  debugMSPerFrame() {
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.top = "10px";
    element.style.left = "10px";
    document.body.appendChild(element);

    let start: number;
    this.events.on(Phaser.Scenes.Events.PRE_UPDATE, () => {
      start = performance.now();
    });
    this.events.on(Phaser.Scenes.Events.RENDER, () => {
      element.innerText = (performance.now() - start).toFixed(5) + "ms";
    });
  }
}
