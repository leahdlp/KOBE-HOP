// const Game = require("./game");
// const GameView = require("./game_view");
// import Game from '../game';
// import Player from "../player";
// import MovingObject from "./moving_object"

import Game from './game';

document.addEventListener("DOMContentLoaded", function () {
  const game_canv = document.getElementById("game-canvas");
  const bg_canv = document.getElementById("bg-canvas");
  // canvasEl.width = Game.DIM_X;
  // canvasEl.height = Game.DIM_Y;
  // const ctx = canvasEle.getContext("2d");
  const game = new Game(game_canv, bg_canv);
  // new GameView(game, ctx).start();
  // console.log(canvasEle)
  // console.log(
    // 'webapck is working'
  // )

  // window.MovingObject = MovingObject;
});



// class DoodleJump {
//   constructor(canvas) {
//     this.ctx = canvas.getContext("2d");
//     this.dimensions = { width: canvas.width, height: canvas.height };
//     this.registerEvents();
//     this.restart();
//   }

//   play() {
//     this.running = true;
//     this.animate();
//     this.player.jump();
//   }

//   restart() {
//     this.running = false;
//     this.score = 0;
//     this.player = new Player(this.dimensions);
//     this.level = new Level(this.dimensions);

//     this.animate();
//   }

//   registerEvents() {
//     this.boundKeyStrokeHandler = this.keyStroke.bind(this);
//     this.ctx.canvas.addEventListener("keydown", this.boundKeyStrokeHandler);
//   }

//   keyStroke(e) {
//     let keyCode = e.keyCode;

//     if (!this.running) this.play();

//     switch (keyCode) {
//       case 37:
//         this.player.movePlayer("left");
//         break;
//       case 39:
//         this.player.movePlayer("right");
//       default:
//         break;
//     }
//     // this.player.jump();
//   }

//   gameOver() {
//     return (
//       this.level.collidesWith(this.player.bounds()) || this.player.outOfBounds()
//     );
//   }

//   //this is the key method of gaming action
//   //animate tells the game to advance one bit
//   //the bird moves, the level moves
//   //everything is redrawn to the screen
//   animate() {
//     //first we move and draw the level
//     this.level.animate(this.ctx);
//     //then we move and draw the bird
//     this.player.animate(this.ctx);
//     //then we check to see if the game is over and let the player know
//     if (this.gameOver()) {
//       alert(this.score);
//       this.restart();
//     }

//     //we see if they have scored a point by passing a platform
//     this.level.landedPlatform(this.player.bounds(), () => {
//       this.score += 1;
//       console.log(this.score);
//     });

//     //and draw the score
//     this.drawScore();

//     //if the game is NOT running, we do not animate the next frame
//     if (this.running) {
//       //This calls this function again, after around 1/60th of a second
//       requestAnimationFrame(this.animate.bind(this));
//     }
//   }

//   drawScore() {
//     //loc will be the location
//     const loc = {
//       x: (5 * this.dimensions.width) / 6,
//       y: this.dimensions.height / 6,
//     };
//     this.ctx.font = "bold 50pt serif";
//     this.ctx.fillStyle = "white";
//     this.ctx.fillText(this.score, loc.x, loc.y);
//     this.ctx.strokeStyle = "black";
//     this.ctx.lineWidth = 2;
//     this.ctx.strokeText(this.score, loc.x, loc.y);
//   }
// }

// const LEVEL_CONSTANTS = {
//   //   PLATFORM_SPEED: 2,
//   GAP_HEIGHT: 175,
//   GAP_WIDTH: 60,
//   PLATFORM_HEIGHT: 25,
//   PLATFORM_WIDTH: 75,
//   EDGE_BUFFER: 50,
//   PLATFORM_SPACING: [100, 100],
//   //   WARM_UP_SECONDS: 1,
// };

// class Level {
//   constructor(dimensions) {
//     this.dimensions = dimensions;

//     const firstPlatformLocation = [
//       this.dimensions.height / 5,
//       this.dimensions.width / 3,
//     ];
//     //   LEVEL_CONSTANTS.WARM_UP_SECONDS * 60 * LEVEL_CONSTANTS.PLATFORM_SPEED;

//     this.platforms = [
//       this.randomPlatform(firstPlatformLocation),
//       this.randomPlatform(
//         firstPlatformLocation[0] + LEVEL_CONSTANTS.PLATFORM_SPACING,
//         firstPlatformLocation[1] + LEVEL_CONSTANTS.PLATFORM_SPACING
//       ),
//       this.randomPlatform(
//         firstPlatformLocation[0] + LEVEL_CONSTANTS.PLATFORM_SPACING * 2,
//         firstPlatformLocation[1] + LEVEL_CONSTANTS.PLATFORM_SPACING * 2
//       ),
//     ];
//   }

//   randomPlatform(location) {
//     const heightRange =
//       this.dimensions.height - 2 * LEVEL_CONSTANTS.EDGE_BUFFER - LEVEL_CONSTANTS.GAP_HEIGHT;
//     const spaceRange =
//       this.dimensions.width - 2 * LEVEL_CONSTANTS.EDGE_BUFFER - LEVEL_CONSTANTS.GAP_WIDTH;
//     // const gapTop = Math.random() * heightRange + LEVEL_CONSTANTS.EDGE_BUFFER;
//     // const gapSide = Math.random() * widthRange + LEVEL_CONSTANTS.EDGE_BUFFER;
//     const platform = {
//       left: location[0],
//       right: LEVEL_CONSTANTS.PLATFORM_WIDTH + location[0],
//       top: location[1],
//       bottom: LEVEL_CONSTANTS.PLATFORM_HEIGHT + location[1],
//       landed: false,
//     };
//     return platform;
//   }

//   animate(ctx) {
//     this.drawBackground(ctx);
//     this.movePlatforms();
//     this.drawPlatforms(ctx);
//   }

//   drawBackground(ctx) {
//     let background = new Image();
//     background.src =
//       "https://cdn3.vectorstock.com/i/1000x1000/15/12/background-of-basketball-court-vector-7441512.jpg";
//     background.onload = function () {
//       ctx.drawImage(background, 0, 0);
//     };
//     // ctx.fillStyle = "skyblue";
//     // ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
//   }

//   landedPlatform(player, callback) {
//     this.eachPlatform((platform) => {
//       if (platform.top < player.bottom) {
//         if (!platform.landed) {
//           platform.landed = true;
//           callback();
//         }
//       }
//     });
//   }

//   movePlatform() {
//     this.eachPlatform(function (platform) {
//       platform.top -= LEVEL_CONSTANTS.PLATFORM_SPEED;
//       platform.bottom -= LEVEL_CONSTANTS.PLATFORM_SPEED;
//     });

//     //if a platform has left the screen add a new one to the end
//     if (this.platforms[0].top <= 0) {
//       this.platforms.shift();
//       const newX = this.platformss[1].left + LEVEL_CONSTANTS.PLATFORM_SPACING;
//       const newY = this.platforms[1].top + LEVEL_CONSTANTS.PLATFORM_SPACING;
//       this.platforms.push(this.randomPlatform([newX, newY]));
//     }
//   }

//   drawPlatforms(ctx) {
//     this.eachPlatform(function (platform) {
//       ctx.fillStyle = "green";

//       //draw platform
//       ctx.fillRect(
//         platform.left,
//         platform.top,
//         LEVEL_CONSTANTS.Platform_WIDTH,
//         platform.top - platform.bottom
//       );
//     });
//   }

//   eachPlatform(callback) {
//     this.platforms.forEach(callback.bind(this));
//   }
//   //This method shall return true if the bird passed in is currently
//   //colliding with any platform.
//   collidesWith(player) {
//     //this function returns true if the the rectangles overlap
//     const _overlap = (platform, object) => {
//       //check that they don't overlap in the x axis
//       if (
//         (object.left < platform.right && object.left > platform.left) ||
//         (platform.right < object.right && platform.left < object.right)
//       ) {
//         if (object.bottom < platform.top) return true;
//         return false;
//       }
//       //check that they don't overlap in the y axis
//       //   if (objecttop > platform.bottom || objectbottom > platform.top) {
//       //     return false;
//       //   }
//       //   return true;
//     };
//     let collision = false;
//     this.eachPlatform((platform) => {
//       //check if the bird is overlapping (colliding) with either platform
//       if (_overlap(platform, player)) collision = true;
//       // _overlap(platform.bottomPlatform, player)
//     });
//     return collision;
//   }
// }

// const PLAYER_CONSTANTS = {
//   GRAVITY: 0.4,
//   JUMP_SPEED: 8,
//   TERMINAL_VEL: 12,
//   PLAYER_WIDTH: 40,
//   PLAYER_HEIGHT: 30,
// };

// class Player {
//   constructor(dimensions) {
//     this.dimensions = dimensions;
//     this.x = this.dimensions.width / 3;
//     // this.y = this.dimensions.height / 2;
//     this.y = 0;
//     this.vel = 0;
//   }

//   jump() {
//     //if this were a more realistic player simulation, we would be adding to the velocity
//     //instead of just assigning it outright
//     //to make the experience more fun and 'bouncy' we just set it directly
//     this.vel = -1 * PLAYER_CONSTANTS.JUMP_SPEED;
//   }

//   movePlayer(dir = "") {
//     if (dir === "right") {
//       this.x += 10;
//     } else if (dir === "left") {
//       this.x -= 10;
//     }
//     //for each frame, the Player should move by it's current velocity
//     //velocity is 'pixels per frame', so each frame it should update position by vel
//     this.y += this.vel;
//     //the acceleration of gravity is in pixels per second per second
//     //so each second, it changes the velocity by whatever the gravity PLAYER_constant is
//     this.vel += PLAYER_CONSTANTS.GRAVITY;
//     //we set a 'terminal velocity', a maximum speed the Player can travel
//     //this keeps the game from becoming too wild because the Player is moving too fast to control
//     if (Math.abs(this.vel) > PLAYER_CONSTANTS.TERMINAL_VEL) {
//       //if the terminal velocity is exceeded, we set it to the terminal velicty
//       if (this.vel > 0) {
//         this.vel = PLAYER_CONSTANTS.TERMINAL_VEL;
//       } else {
//         this.vel = PLAYER_CONSTANTS.TERMINAL_VEL * -1;
//       }
//     }
//   }

//   animate(ctx) {
//     this.movePlayer();
//     this.drawPlayer(ctx);
//   }

//   drawPlayer(ctx) {
//     ctx.fillStyle = "yellow";
//     ctx.fillRect(
//       this.x,
//       this.y,
//       PLAYER_CONSTANTS.PLAYER_WIDTH,
//       PLAYER_CONSTANTS.PLAYER_HEIGHT
//     );
//   }

//   bounds() {
//     return {
//       left: this.x,
//       right: this.x + PLAYER_CONSTANTS.PLAYER_WIDTH,
//       top: this.y,
//       bottom: this.y + PLAYER_CONSTANTS.PLAYER_HEIGHT,
//     };
//   }

//   outOfBounds() {
//     // const aboveTheTop = this.y < 0;
//     const belowTheBottom =
//       this.y + PLAYER_CONSTANTS.PLAYER_HEIGHT > this.dimensions.height;
//     return belowTheBottom;
//   }
// }