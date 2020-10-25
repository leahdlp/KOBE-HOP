const CONSTANTS = {
//   PLATFORM_SPEED: 2,
  GAP_HEIGHT: 125,
  GAP_WIDTH: 60,
  PLATFORM_HEIGHT: 20,
  PLATFORM_WIDTH: 100,
  EDGE_BUFFER: 50,
  PLATFORM_SPACING: [100, 100],
//   WARM_UP_SECONDS: 1,
};

// need to push

export default class Level {
  constructor(dimensions) {
    // console.log('level constructor')
    this.dimensions = dimensions;

    const firstPlatformLocation = [
        // this.dimensions.height,
        // 10,
        // this.dimensions.width,
        // this.dimensions.height
        
        (2 * this.dimensions.width) / 3,
        (4 * this.dimensions.height) / 5
    ]
    //   CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.PLATFORM_SPEED;
    const int = this.getRandomInt

    // console.log(firstPlatformLocation)

    this.platforms = [
      this.randomPlatform(firstPlatformLocation),
      this.randomPlatform(
        [
          firstPlatformLocation[0] - CONSTANTS.PLATFORM_SPACING[0] * int(3),
          firstPlatformLocation[1] - CONSTANTS.PLATFORM_SPACING[1] * int(3)
        ]
      ),
      this.randomPlatform(
        [
          firstPlatformLocation[0] - CONSTANTS.PLATFORM_SPACING[0] * int(4),
          firstPlatformLocation[1] - CONSTANTS.PLATFORM_SPACING[1] * int(4)
        ]
      ),
      this.randomPlatform(
        [
          firstPlatformLocation[0] - CONSTANTS.PLATFORM_SPACING[0] * int(5),
          firstPlatformLocation[1] - CONSTANTS.PLATFORM_SPACING[1] * int(5)
        ]
      ),
    ];
    // console.log('con platforms:', this.platforms)
  }

  getRandomInt(max) {
    const int = Math.floor(Math.random() * Math.floor(max));

    if (int === 0) return 1;
    return int;
  }

  randomPlatform(location) {
    // console.log('randomPlatform')
    // console.log('lcoation', location)
    const heightRange =
      Math.floor(this.dimensions.height) - 2 * CONSTANTS.EDGE_BUFFER - CONSTANTS.GAP_HEIGHT;

      // console.log(heightRange)
      // console.log(CONSTANTS.PLATFORM_HEIGHT + location[1])
      // console.log(location[1])
    const spaceRange =
      Math.floor(this.dimensions.width) - 2 * CONSTANTS.EDGE_BUFFER - CONSTANTS.GAP_WIDTH;
    // const gapTop = Math.random() * heightRange + CONSTANTS.EDGE_BUFFER;
    // const gapSide = Math.random() * widthRange + CONSTANTS.EDGE_BUFFER;
    const platform = {
        left: (location[0] + spaceRange) % this.dimensions.width,
        right: (CONSTANTS.PLATFORM_WIDTH + location[0] + spaceRange) % this.dimensions.width,
        top: (location[1] + heightRange) % this.dimensions.height,
        bottom: (CONSTANTS.PLATFORM_HEIGHT + location[1] + heightRange) % this.dimensions.height,
        landed: false,
    };

    // console.log(location[0] + CONSTANTS.PLATFORM_WIDTH)
    // console.log(CONSTANTS.PLATFORM_WIDTH + location[0]);

    // console.log(CONSTANTS.PLATFORM_HEIGHT)

    // console.log('left', platform.left)
    // console.log('right', platform.right);

    // console.log('top', platform.top);

    // console.log('bottom', platform.bottom);

    return platform;
  }

  animate(ctx) {
    // console.log('level animate')
    // console.log('drawBackground')
    this.drawBackground(ctx)
    // console.log("drawPlatforms");
    this.drawPlatforms(ctx);
    // console.log("movePlatform");
    this.movePlatform();
  }

  drawBackground(ctx) {
      // console.log('this.drawBackground')
      // const background = new Image();
      // background.src =
        // "https://cdn3.vectorstock.com/i/1000x1000/15/12/background-of-basketball-court-vector-7441512.jpg";
      // background.onload = function() {
      //     ctx.drawImage(background, -100, -110)
      // }
      const canv = document.getElementById("game-canvas");
      canv.setAttribute(
        "style",
        "background-image: url('https://cdn3.vectorstock.com/i/1000x1000/15/12/background-of-basketball-court-vector-7441512.jpg');"
      )
      // window.setTimeout
      // canv.setAttribute("style", "background-position: center")
      // ctx.setAtr
    // ctx.fillStyle = "skyblue";
    // ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  landedPlatform(player, callback) {
    this.eachPlatform(platform => {
      if (platform.top === player.bottom) {
        if (!platform.landed) {
          platform.landed = true;
          // console.log('landed')
          callback();
        }
      }
    });
  }

  movePlatform() {
    // console.log('this.movePlatform')
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
    // console.log('this.drawPlatforms');
    this.eachPlatform(function (platform) {
      // console.log(platform)
      // ctx.fillStyle = "#6a0dad";
      ctx.fillStyle = "green"
      // console.log(ctx)
      //draw platform
      ctx.fillRect(
        platform.left,
        platform.top,
        CONSTANTS.PLATFORM_WIDTH,
        CONSTANTS.PLATFORM_HEIGHT
      );
    });
  }

  eachPlatform(callback) {
    // console.log('this.eachPlatform');
    this.platforms.forEach(callback.bind(this));
  }
  //This method shall return true if the bird passed in is currently
  //colliding with any platform.
  collidesWith(player) {
    //this function returns true if the the rectangles overlap
    // console.log('this.collidesWith')
    const _overlap = (platform, object) => {
      // console.log('_overlap')
      //check that they don't overlap in the x axis
      const objLeftOnPlat = object.left <= platform.right && object.left >= platform.left;
      const objRightOnPlat = object.right <= platform.right && object.right >= platform.left;

      // console.log(object)
      // console.log(platform)
      if (!objLeftOnPlat && !objRightOnPlat) {
        return false;
        // if (object.bottom < platform.top) return true;
        // return false;
      }
      //check that they don't overlap in the y axis
      const objTopAbovePlatBot = object.top > platform.bottom;
      const objBotOnPlatTop = object.bottom === platform.top;
      if (!objBotOnPlatTop) {
        return false;
      }

      return true;
    };

    let collision = false;
    this.eachPlatform(platform => {
        //check if the bird is overlapping (colliding) with either platform
      if (_overlap(platform, player)) {
        collision = true;
        // console.log(platform)
        // console.log(collision)
        player.movePlayer("up")
      }
        // _overlap(platform.bottomPlatform, player)
    });

    // console.log('collision:')
    // console.log(collision)
    return collision;
  }
}

