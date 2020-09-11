import Player from "./player";
import Level from "./level";

export default class KobeHop {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.registerEvents();
    this.restart();
  }

  play() {
    this.running = true;
    this.animate();
    this.player.jump();
  }

  restart() {
    this.running = false;
    this.score = 0;
    this.player = new Player(this.dimensions);
    this.level = new Level(this.dimensions);

    this.animate();
  }

  registerEvents() {
    this.boundKeyStrokeHandler = this.keyStroke.bind(this);
    this.ctx.canvas.addEventListener("keydown", this.boundKeyStrokeHandler);
  }

  keyStroke(e) {
    let keyCode = e.keyCode;

    if (!this.running) this.play();

    switch (keyCode) {
      case 37:
        this.player.movePlayer("left");
        break;
      case 39:
        this.player.movePlayer("right")
      default:
        break;
    }
    // this.player.jump();
  }

  gameOver() {
    return (
      this.level.collidesWith(this.player.bounds()) ||
      this.player.outOfBounds()
    );
  }

  animate() {
    this.level.animate(this.ctx);
    this.player.animate(this.ctx);
    //then we check to see if the game is over and let the player know
    if (this.gameOver()) {
      alert(this.score);
      this.restart();
    }

    //we see if they have scored a point by passing a platform
    this.level.landedPlatform(this.player.bounds(), () => {
      this.score += 1;
      console.log(this.score);
    });

    //and draw the score
    this.drawScore();

    //if the game is NOT running, we do not animate the next frame
    if (this.running) {
      //This calls this function again, after around 1/60th of a second
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  drawScore() {
    //loc will be the location
    const loc = { x: ( 5 * this.dimensions.width) / 6, y: this.dimensions.height / 6 };
    this.ctx.font = "bold 50pt serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.score, loc.x, loc.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(this.score, loc.x, loc.y);
  }
}
