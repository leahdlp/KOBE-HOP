import Player from "./player";
import Level from "./level";
import Ball from "./ball";

export default class DoodleJump {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    // this.backgrnd = canvas2.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    // console.log((2/3) * canvas.width)
    // console.log((4/5) * canvas.height)

    this.balls;
    // this.balls = this.player.balls;
    // this.hoops = [];
    // this.defenders = [];

    this.registerEvents();
    this.restart();
    // console.log('constructor')
  }

  gameBalls() {
    console.log('gameBalls')
    for (let i = 0; i < 3; i++) {
      this.player.balls.push(new Ball({ x: this.player.x, y: this.player.y }));
    }

    console.log(this.player.balls)
  }

  play() {
    // console.log('play')
    this.running = true;

    // setInterval(() => this.keyStroke({ keyCode: 38 }), 1000)
    this.animate();
  }

  restart() {
    // console.log('restart')
    this.running = false;
    this.score = 0;
    this.player = new Player(this.dimensions);
    this.gameBalls();
    this.balls = this.player.balls;
    this.level = new Level(this.dimensions);

    this.animate();
  }

  registerEvents() {
    // console.log('registerEvents')
    this.boundKeyStrokeHandler = this.keyStroke.bind(this);
    document.addEventListener("keydown", this.boundKeyStrokeHandler);
  }

  keyStroke(e) {
    // console.log('keyStroke')
    let keyCode = e.keyCode;
    // console.log(keyCode);
    if (!this.running) this.play();

    console.log(this.ctx)

    switch (keyCode) {
      case 32:
        this.player.shootBall(this.ctx)
        break;
      case 37:
        // console.log('l')
        this.player.movePlayer("left");
        break;
      case 38:
        this.player.movePlayer("up");
        break;
      case 39:
        // console.log('r')
        this.player.movePlayer("right")
        break;
      // case 40:
      //   this.player.movePlayer("down");
      //   break;
      default:
        // console.log('eslse')
        break;
    }

    // this.player.jump();
  }

  gameOver() {
    return (
      this.player.outOfBounds() || this.balls.length === 0
    );
  }

  //this is the key method of gaming action
  //animate tells the game to advance one bit
  //the bird moves, the level moves
  //everything is redrawn to the screen
  animate() {
    // console.log('animate')
    //first we move and draw the level
    // console.log('animate level')
    window.setTimeout(() => {
      this.level.animate(this.ctx);
      this.player.animate(this.ctx);
      this.drawScore();
    }, 5000)
    //then we move and draw the bird
    // console.log('animate player')
    //then we check to see if the game is over and let the player know
    if (this.gameOver()) {
      // console.log('game over')
      alert(this.score);
      this.restart();
    }

    // //we see if they have scored a point by passing a platform
    this.level.landedPlatform(this.player.bounds(), () => {
      this.score += 1;
      this.player.movePlayer("up");
      // console.log(this.score);
    });

    if (this.level.collidesWith(this.player.bounds())) {
      // console.log("if collidesWith");
      this.player.movePlayer("up");
    }

    //and draw the score
    // console.log('draw score')
    // this.drawScore();

    //if the game is NOT running, we do not animate the next frame
    if (this.running) {
      // console.log('if running...requestAnimationFrame')
      //This calls this function again, after around 1/60th of a second
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  drawScore() {
    // console.log('draw score')
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