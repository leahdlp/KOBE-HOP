import Player from "./player";
import Level from "./level";
import Ball from "./ball";
import Hoop from "./hoop";

export default class DoodleJump {
  constructor(ctx, dimensions) {
    // this.ctx = canvas.getContext("2d");
    // console.log(this./ctx)
    this.ctx = ctx;
    // this.backgrnd = canvas2.getContext("2d");
    this.dimensions = dimensions;
    console.log((2/3) * canvas.width)
    console.log((4/5) * canvas.height)

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

  displayBallReserve(ctx) {
    // ctx.clearRect(0, 0, 500, 100);
    const num = this.player.balls.length;
    console.log(num);
    console.log('DISPLAYING BALLS')

    for (let i = 0; i < num; i++) {
      // console.log(i);
      let x_coor = (i * 40) + 10;
      // if (i === 0) x_coor = 10
      this.drawBallReserve(x_coor, 10, ctx);
      // console.log('why?')
    }
  }

  drawBallReserve(x, y, ctx) {
    // if (!this.ctx) return null;
    const sprite = new Image();
    console.log(`${x}, ${y}`)

    sprite.onload = function() {
        ctx.drawImage(sprite,
            -10, 
            -10, 
            // this.x,
            // this.y,
            // frameWidth, 
            // frameHeight,
            300, 300, 
            // this.x, 
            // this.y,
            x, 
            y,
            // this.y, 
            // this.x,
            // 500, 760, 
            // this.x,
            // this.y)
            50, 50
            );
    }

    sprite.src =
      "https://www.freepngimg.com/thumb/basketball/10-basketball-ball-png-image-thumb.png";
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

    if (this.player) {
      this.y = 0;
      this.x = 0;
    //   delete this.player.x;
    //   delete this.player.y;
    //   delete this.player.vel;
    }

    this.player = new Player(this.dimensions);
    this.gameBalls();
    this.balls = this.player.balls;
    this.level = new Level(this.dimensions);

    // window.setTimeout(() => this.animate(), 4000);
    this.animate()
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

    console.log(keyCode)

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
      case 13: 
        this.restart();
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
    const start = requestAnimationFrame;
    const render = this.animate.bind(this);

    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)
    // console.log('animate')
    //first we move and draw the level
    // console.log('animate level')
    this.level.animate(this.ctx);
    //then we move and draw the bird
    // console.log('animate player')D
    this.player.animate(this.ctx);

    this.displayBallReserve(this.ctx);
    //then we check to see if the game is over and let the player know
    if (this.gameOver()) {
      // console.log('game over')
      alert(this.score);
      this.restart();
      cancelAnimationFrame(start(render))
    }

    // //we see if they have scored a point by passing a platform
    this.level.landedPlatform(this.player.bounds(), () => {
      this.score += 1;
      this.player.movePlayer("up");
      // console.log(this.score);
    });

    if (this.level.collidesWith(this.player)) {
      // console.log("if collidesWith");
      this.player.movePlayer("up");
    }

    //and draw the score
    // console.log('draw score')
    this.drawScore();

    //if the game is NOT running, we do not animate the next frame
    if (this.running) {
      // console.log('if running...requestAnimationFrame')
      //This calls this function again, after around 1/60th of a second
      // requestAnimationFrame(this.animate.bind(this));
      setInterval(() => {
        const hoop = new Hoop(this.dimensions);
        hoop.animate(this.ctx);
      }, 10000);
      start(render)
    }
  }

  drawScore() {
    // console.log('draw score')
    //loc will be the location
    const loc = { x: (5.25 * this.dimensions.width) / 6, y: (0.5 * this.dimensions.height) / 6 };
    this.ctx.font = "bold 50pt serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.score, loc.x, loc.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(this.score, loc.x, loc.y);
  }
}
// 