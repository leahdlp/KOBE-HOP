const CONSTANTS = { 
    dy: 75, 
    GRAVITY: 0.4, 
    TERMINAL_VEL: 7.5 
}

export default class Ball {
  constructor(coor) {
    // this.ctx = canvas.getContext("2d");
    // this.dimensions = { width: , height: }
    this.x = coor.x;
    this.y = coor.y;

    this.balls = []; 

    this.drawBall = this.drawBall.bind(this);
    this.up = this.up.bind(this);
    this.moveBall = this.moveBall.bind(this);
    this.animate = this.animate.bind(this);
    this.collidesWith = this.collidesWith.bind(this);
  }

  drawBall(ctx) {

    console.log('draw')
    console.log(ctx);
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();

    // this.y += CONSTANTS.dy;
  }

  up() {
      this.vel = -1 * CONSTANTS.dy;
  }

  moveBall() {
    console.log('move ball')
    
    this.up();
    setInterval(() => this.y += this.vel, 30);

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
      console.log('animate')
      console.log(ctx);
    this.moveBall()
    this.drawBall(ctx)
  }

  collidesWith(defender) {
    //this function returns true if the the rectangles overlap
    console.log("this.collidesWith");
    const _overlap = (ball, object) => {
      console.log("_overlap");
      //check that they don't overlap in the x axis
      const objLeftOnBall =
        object.left <= ball.right && object.left >= ball.left;
      const objRightOnBall =
        object.right <= ball.right && object.right >= ball.left;

      console.log(object);
      console.log(ball);
      if (!objLeftOnBall && !objRightOnBall) {
        return false;
        // if (object.bottom < ball.top) return true;
        // return false;
      }
      //check that they don't overlap in the y axis
      const objTopAboveBallBot = object.top > ball.bottom;
      const objBotOnBallTop = object.bottom === ball.top;
      if (!objBotOnBallTop || !objTopAboveBallBot) {
        return false;
      }

      return true;
    };

    let collision = false;
    this.eachBall((ball) => {
      //check if the bird is overlapping (colliding) with either ball
        if (_overlap(this.ball, defender)) {
        collision = true;
        console.log(ball);
        console.log(collision);
        }
      // _overlap(ball.bottomball, defender)
    });

    console.log("collision:");
    console.log(collision);
    return collision;
  }
}