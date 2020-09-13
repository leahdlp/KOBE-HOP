const CONSTANTS = {
//   PLATFORM_SPEED: 2,
  GAP_HEIGHT: 175,
  GAP_WIDTH: 60,
  PLATFORM_HEIGHT: 25,
  PLATFORM_WIDTH: 75,
  EDGE_BUFFER: 50,
  PLATFORM_SPACING: [100, 100],
//   WARM_UP_SECONDS: 1,
};

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

    const firstPlatformLocation = [
        this.dimensions.height / 5,
        this.dimensions.width / 3
    ]
    //   CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.PLATFORM_SPEED;

    this.platforms = [
      this.randomPlatform(firstPlatformLocation),
      this.randomPlatform(
        firstPlatformLocation[0] + CONSTANTS.PLATFORM_SPACING,
        firstPlatformLocation[1] + CONSTANTS.PLATFORM_SPACING
      ),
      this.randomPlatform(
        firstPlatformLocation[0] + CONSTANTS.PLATFORM_SPACING * 2,
        firstPlatformLocation[1] + CONSTANTS.PLATFORM_SPACING * 2
      ),
    ];
    console.log('con')
  }

  randomPlatform(location) {
    console.log('plat')
    const heightRange =
      Math.floor(this.dimensions.height) - 2 * CONSTANTS.EDGE_BUFFER - CONSTANTS.GAP_HEIGHT;
    const spaceRange =
      Math.floor(this.dimensions.width) - 2 * CONSTANTS.EDGE_BUFFER - CONSTANTS.GAP_WIDTH;
    // const gapTop = Math.random() * heightRange + CONSTANTS.EDGE_BUFFER;
    // const gapSide = Math.random() * widthRange + CONSTANTS.EDGE_BUFFER;
    const platform = {
        left: location[0],
        right: CONSTANTS.PLATFORM_WIDTH + location[0],
        top: location[1],
        bottom: CONSTANTS.PLATFORM_HEIGHT + location[1],
        landed: false,
    };
    return platform;
  }

  animate(ctx) {
    this.drawBackground(ctx);
    this.drawPlatforms(ctx);
    this.movePlatform();
  }

  drawBackground(ctx) {
      let background = new Image();
      background.src =
          "https://cdn3.vectorstock.com/i/1000x1000/15/12/background-of-basketball-court-vector-7441512.jpg";
      // background.onload = function() {
          ctx.drawImage(background, -100, -110)
      // }
    // ctx.fillStyle = "skyblue";
    // ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  landedPlatform(player, callback) {
    this.eachPlatform(platform => {
      if (platform.top < player.bottom) {
        if (!platform.landed) {
          platform.landed = true;
          callback();
        }
      }
    });
  }

  movePlatform() {
    this.eachPlatform(function (platform) {
      platform.top -= CONSTANTS.PLATFORM_SPEED;
      platform.bottom -= CONSTANTS.PLATFORM_SPEED;
    });

    //if a platform has left the screen add a new one to the end
    if (this.platforms[0].top <= 0) {
      this.platforms.shift();
      const newX = this.platformss[1].left + CONSTANTS.PLATFORM_SPACING;
      const newY = this.platforms[1].top + CONSTANTS.PLATFORM_SPACING;
      this.platforms.push(this.randomPlatform([newX, newY]));
    }
  }

  drawPlatforms(ctx) {
    console.log('draw')
    this.eachPlatform(function (platform) {
      console.log(platform)
      ctx.fillStyle = "#6a0dad";
      console.log(ctx)
      //draw platform
      ctx.fillRect(
        platform.left,
        platform.top,
        CONSTANTS.Platform_WIDTH,
        platform.top - platform.bottom
      );
    });
  }

  eachPlatform(callback) {
    this.platforms.forEach(callback.bind(this));
  }
  //This method shall return true if the bird passed in is currently
  //colliding with any platform.
  collidesWith(player) {
    //this function returns true if the the rectangles overlap
    const _overlap = (platform, object) => {
      //check that they don't overlap in the x axis
      if ((object.left < platform.right && object.left > platform.left) 
        || (platform.right < object.right && platform.left < object.right)) {

        if (object.bottom < platform.top) return true;
        return false;
      }
      //check that they don't overlap in the y axis
    //   if (objecttop > platform.bottom || objectbottom > platform.top) {
    //     return false;
    //   }
    //   return true;
    };
    let collision = false;
    this.eachPlatform(platform => {
        //check if the bird is overlapping (colliding) with either platform
      if (_overlap(platform, player)) collision = true;
        // _overlap(platform.bottomPlatform, player)
    });
    return collision;
  }
}

