const CONSTANTS = {
  GRAVITY: 0.4,
  JUMP_SPEED: 100,
  FALL_SPEED: 1,
  TERMINAL_VEL: 7.5,
  PLAYER_WIDTH: 40,
  PLAYER_HEIGHT: 40,
};

export default class MovingObject {
  constructor(dimensions, coords) {
    this.dimensions = dimensions;
    this.coords = coords;
    // this.x = this.dimensions.width / 3;
    // this.y = this.dimensions.height / 2;
    // this.y = 760;
    this.vel = 0;

    this.balls = [];
  }

  jump() {
    //if this were a more realistic player simulation, we would be adding to the velocity
    //instead of just assigning it outright
    //to make the experience more fun and 'bouncy' we just set it directly
    this.vel = -1 * CONSTANTS.JUMP_SPEED;
    // this.movePlayer()
  }

  move(dir = "") {
    if (dir === "right") {
      this.x += 25;
    } else if (dir === "left") {
      this.x -= 25;
    } else if (dir === "up") {
      this.jump();
      // console.log(this.y)
      // let max_height = this.y + this.vel
      // this.y = max_height;
      setInterval(() => {
        console.log(this.y);
        this.y += this.vel;

        if (this.y > (this.bounds.top + 100)) this.y = this.bounds.top + 100;
      }, 50);
      
      // // console.log(this.y)
      // if (this.y === (max_height)) {
      //   this.fall();
      //   while (!this.outOfBounds) this.y += this.vel;
    }
    // } else if (dir === "down") {
    // this.fall()
    // setInterval(() => this.y += this.vel, 30);
    // }

    //for each frame, the Player should move by it's current velocity
    //velocity is 'pixels per frame', so each frame it should update position by vel
    //the acceleration of gravity is in pixels per second per second
    //so each second, it changes the velocity by whatever the gravity constant is
    this.vel += CONSTANTS.GRAVITY;
    //we set a 'terminal velocity', a maximum speed the Player can travel
    //this keeps the game from becoming too wild because the Player is moving too fast to control
    if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
      //if the terminal velocity is exceeded, we set it to the terminal velicty
      if (this.vel > 0) {
        this.vel = CONSTANTS.TERMINAL_VEL;
      } else {
        this.vel = CONSTANTS.TERMINAL_VEL * -1;
      }
    }
  }

  animate(ctx) {
    this.move();
    this.draw(ctx);
  }

    draw(ctx, dimensions, sprite) {
        if (!sprite) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(
            this.x,
            this.y,
            CONSTANTS.PLAYER_WIDTH,
            CONSTANTS.PLAYER_HEIGHT
            );
        } else {

        }

    }

  bounds() {
    return {
      left: this.x,
      right: this.x + CONSTANTS.PLAYER_WIDTH,
      top: this.y,
      bottom: this.y + CONSTANTS.PLAYER_HEIGHT,
    };
  }

  outOfBounds() {
    // const aboveTheTop = this.y < 0;
    const belowTheBottom =
      this.y + CONSTANTS.PLAYER_HEIGHT > this.dimensions.height;
    return belowTheBottom;
  }
}

