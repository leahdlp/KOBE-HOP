import Ball from './ball'
import MovingObject from './moving_object'

const CONSTANTS = {
  GRAVITY: 0.4,
  JUMP_SPEED: 100,
  FALL_SPEED: 1,
  TERMINAL_VEL: 7.5,
  PLAYER_WIDTH: 55,
  PLAYER_HEIGHT: 85,
};

class Player extends MovingObject {
  constructor(dimensions) {
    super(dimensions)

    // this.dimensions = dimensions;
    this.x = this.dimensions.width / 3;
    // this.y = this.dimensions.height / 2;
    this.y = 715;
    this.vel = 0;

    this.balls = [];
  }

  fall() {
    this.vel = CONSTANTS.FALL_SPEED
  }

  jump() {
    //if this were a more realistic player simulation, we would be adding to the velocity
    //instead of just assigning it outright
    //to make the experience more fun and 'bouncy' we just set it directly
    this.vel = -1 * CONSTANTS.JUMP_SPEED;
    // this.movePlayer()
  }
  
  movePlayer(dir="") {
    // console.log('moving player')

    if (dir === "right") {
      console.log('before right', this.x)
      this.x = (this.x += 25) % this.dimensions.width;
      console.log('after right', this.x)
    } else if (dir === "left") {
      console.log('before left', this.x)
      this.x = (this.x -= 25) % this.dimensions.width;
      console.log('after left', this.x)
    } else if (dir === "up") {
      console.log('up')
      this.jump()
      this.y += this.vel;
      // console.log(this.y)
      const max_height = 200;
      // if (this.y <= max_height) this.y = max_height;
      // console.log('THIS.Y ======', this.y)
      // this.y = max_height;
      setInterval(() => {
        // console.log(this.y)
        this.y += this.vel
        
        if (this.y <= max_height) {
          this.y = max_height;
          this.y -= this.vel;
        }
      }, 50);
      // // console.log(this.y)
    // if (this.y === (max_height)) {
        // this.fall();
        // while (!this.outOfBounds) this.y += this.vel;
    // }
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

    // console.log('done moving.')
  }

  animate(ctx) {
    // ctx.clearRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
    // ctx.clearRect(
    //   this.bounds().left,
    //   this.bounds().top,
    //   this.bounds().right,
    //   this.bounds().bottom
    // );
    this.movePlayer();
    this.drawPlayer(ctx);
  }
//
  drawPlayer(ctx) {
    // console.log('drawning player...')
    // const kobe = new Image();
    
    // kobe.onload = function() {
    //   ctx.drawImage(kobe, this.y, this.x, 100, 100)
    // }

    // kobe.src =
    //   "https://banner2.cleanpng.com/20180328/ghw/kisspng-kobe-bryant-basketball-slam-dunk-clip-art-nba-5abc013fb852c9.818527801522270527755.jpg";
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);

        // console.log("begin to clear...");
        // ctx.clearRect(
        //   this.x,
        //   this.y,
        //   CONSTANTS.PLAYER_WIDTH,
        //   CONSTANTS.PLAYER_HEIGHT
        // );
        // console.log("ending clear");

    const _draw = () => {
      // console.log('start draw function...')
      const sprite = new Image();
      
      // Define the size of a frame
      let frameWidth = 55;
      let frameHeight = 85;
      
      // Rows and columns start from 0
      let row = 3.9;
      let column = 7.65;
      // console.log(`${this.x}, ${this.y}`)
      const x = this.x;
      const y = this.y;
      
      sprite.onload = function() {
        ctx.drawImage(sprite, 
          column*frameWidth, 
          row*frameHeight, 
          // this.x,
          // this.y,
          frameWidth, 
          frameHeight, 
          // this.x, 
          // this.y,
          x, 
          y,
          // this.y, 
          // this.x,
          // 500, 760, 
          // this.x,
          // this.y)
          frameWidth, 
          frameHeight);
        }
  
      // ctx.clearRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
      // sprite.src = image_url("assets/images/basketball-player-sprite-clipart.png");
      sprite.src = "https://library.kissclipart.com/20180914/rrw/kissclipart-basketball-player-sprite-clipart-nba-basketball-pl-cf84a83dd372375e.png";
      // console.log('SPRITEEEEEEEEEE')
      // console.log(sprite);
      // console.log("SPRITEEEEEEEEEE SOURCEEEEE");
      // console.log(sprite.src);
      // sprite.setAttribute("style", "background-color: transparent")
      // console.log('done with draw function.')
    }

    _draw()
      // console.log('done drawing.')
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

  shootBall(ctx) {
    const ball = this.balls.pop()
    // console.log(ctx);

    ball.animate(ctx);

    // ball.moveBall()
  }
}

export default Player;