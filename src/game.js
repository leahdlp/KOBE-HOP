import Player from "./player";
import Level from "./level";

export default class DoodleJump {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.registerEvents();
    this.restart();
    console.log('tf')
  }

  play() {
    console.log('play')
    this.running = true;
    this.animate();
  }

  restart() {
    console.log('res')
    this.running = false;
    this.score = 0;
    this.player = new Player(this.dimensions);
    this.level = new Level(this.dimensions);

    this.animate();
  }

  registerEvents() {
    console.log('reg')
    this.boundKeyStrokeHandler = this.keyStroke.bind(this);
    document.addEventListener("keydown", this.boundKeyStrokeHandler);
  }

  keyStroke(e) {
    // console.log('key')
    let keyCode = e.keyCode;
    console.log(keyCode);
    if (!this.running) this.play();

    switch (keyCode) {
      case 37:
        console.log('l')
        this.player.movePlayer("left");
        break;
      case 39:
        console.log('r')
        this.player.movePlayer("right")
      default:
        // console.log('eslse')
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

  //this is the key method of gaming action
  //animate tells the game to advance one bit
  //the bird moves, the level moves
  //everything is redrawn to the screen
  animate() {
    //first we move and draw the level
    this.level.animate(this.ctx);
    //then we move and draw the bird
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
// 