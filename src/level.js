const CONSTANTS = {
  PLATFORM_SPEED: 1,
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
        (5 * this.dimensions.height) / 5
    ]
    //   CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.PLATFORM_SPEED;
    const int = this.getRandomInt

    // console.log(firstPlatformLocation)
    // setInterval(() => this.hoop.place_random_hoop, 20000)
    // this.hoops = [
      // this.randomHoop(),
      // this.randomHoop(),
      // this.randomHoop()
    // ];

    // this.platforms = [
    //   this.randomPlatform(firstPlatformLocation),
    //   this.randomPlatform(
    //     [
    //       firstPlatformLocation[0] - CONSTANTS.PLATFORM_SPACING[0] * int(3),
    //       firstPlatformLocation[1] - CONSTANTS.PLATFORM_SPACING[1] * int(3)
    //     ]
    //   ),
    //   this.randomPlatform(
    //     [
    //       firstPlatformLocation[0] - CONSTANTS.PLATFORM_SPACING[0] * int(4),
    //       firstPlatformLocation[1] - CONSTANTS.PLATFORM_SPACING[1] * int(4)
    //     ]
    //   ),
    //   this.randomPlatform(
    //     [
    //       firstPlatformLocation[0] - CONSTANTS.PLATFORM_SPACING[0] * int(5),
    //       firstPlatformLocation[1] - CONSTANTS.PLATFORM_SPACING[1] * int(5)
    //     ]
    //   ),
    // ];

    this.platforms = [this.randomPlatform(firstPlatformLocation)]
    this.fillPlatforms(firstPlatformLocation)

    // console.log('con platforms:', this.platforms)
  }

  getRandomInt(max) {
    const int = Math.floor(Math.random() * Math.floor(max));

    if (int === 0) return 1;
    return int;
  }

  fillPlatforms(location) {
    const int = this.getRandomInt;

    for (let i = 0; i < 11; i++) {
      this.platforms.push(
        this.randomPlatform([
          location[0] - CONSTANTS.PLATFORM_SPACING[0] * int(i),
          location[1] - CONSTANTS.PLATFORM_SPACING[1] * int(i),
        ])
      );
    }
  }

  randomPlatform(location) {

    // console.log('randomPlatform')
    // console.log('lcoation', location)
    const heightRange =
      Math.floor(this.dimensions.height) - 2 * CONSTANTS.EDGE_BUFFER - CONSTANTS.GAP_HEIGHT;

    const spaceRange =
      Math.floor(this.dimensions.width) - 2 * CONSTANTS.EDGE_BUFFER - CONSTANTS.GAP_WIDTH;
    // const gapTop = Math.random() * heightRange + CONSTANTS.EDGE_BUFFER;
    // const gapSide = Math.random() * widthRange + CONSTANTS.EDGE_BUFFER;
    const left = Math.abs(location[0] + spaceRange) % this.dimensions.width;
    const right = Math.abs(CONSTANTS.PLATFORM_WIDTH + location[0] + spaceRange) % this.dimensions.width;
    const top = (location[1] + heightRange) % this.dimensions.height;
    const bottom = (CONSTANTS.PLATFORM_HEIGHT + location[1] + heightRange) % this.dimensions.height;

    // console.log(`left: ${left}, right: ${right}, top: ${top}, bottom: ${bottom}`)
    // debugger
    const platform = {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        landed: false,
    };
    // debugger
    // console.log(location[0] + CONSTANTS.PLATFORM_WIDTH)
    // console.log(CONSTANTS.PLATFORM_WIDTH + location[0]);

    // console.log(CONSTANTS.PLATFORM_HEIGHT)

    // console.log('left', platform.left)
    // console.log('right', platform.right);

    // console.log('top', platform.top);

    // console.log('bottom', platform.bottom);
    // console.log(platform)

    return platform;
  }

  animate(ctx) {
    console.log('level animate')
    // console.log('level animate')
    // console.log('drawBackground')
    this.drawBackground(ctx);
    // console.log("drawPlatforms");
    this.drawPlatforms(ctx);
    // this.drawHoop(ctx)
    // setInterval(() => setTimeout(this.drawHoop(ctx), 100), 10000)
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
    // debugger
    // console.log('this.movePlatform')
    this.eachPlatform(function (platform) {
      platform.top += CONSTANTS.PLATFORM_SPEED;
      platform.bottom += CONSTANTS.PLATFORM_SPEED;
    });

    //if a platform has left the screen add a new one to the end
    // console.log(`PLATFORM GONE?: ${this.platforms[0].top >= 0}`);
    // console.log(this.platforms[0].top)
    // console.log(this.platforms[0].top >= 0);
    // console.log(`first plat top: ${this.platforms[0].top}, canv bottom: ${this.dimensions.height}`)
    // console.log(
      // `if statement: ${this.platforms[0].top >= this.dimensions.height}`
      // );
    if (this.platforms[0].top >= this.dimensions.height) {
      this.platforms.shift();

      const idx = this.platforms.length - 1;
      const newX = this.platforms[idx].left + CONSTANTS.PLATFORM_SPACING[0];
      const newY = this.platforms[idx].top + CONSTANTS.PLATFORM_SPACING[1];
      // console.log(`newX: ${newX}, newY: ${newY}`)
      // console.log()
      // this.platforms.push(this.randomPlatform([newX, newY]));
      this.platforms.push(this.randomPlatform([newX, newY]))
    }
    // debugger
    // console.log('WE ARE HEREERERERERERER')
    // console.log(this.platforms)

    // console.log(this.platforms)
  }

  // drawHoop(ctx) {
  //     // console.log('DRAWING HOOP')
  //     // ctx.fillStyle = "blue";
  //     // ctx.fillRect(100, 100, 200, 200);
  //     const sprite = new Image();

  //     const x = this.getRandomInt(this.dimensions.width - 125);
  //     const y = 75;

  //     sprite.onload = function() {
  //       ctx.drawImage(sprite, x, y, 125, 125)
  //     }

  //     sprite.src = "https://www.pikpng.com/pngl/m/60-606890_animated-basketball-png-basketball-hoop-clipart-transparent-background.png";
  //     sprite.setAttribute("style", "background-color: transparent")
  // }

  drawPlatforms(ctx) {
    // console.log('this.drawPlatforms');
    this.eachPlatform(function (platform) {
      // console.log(platform)
      // ctx.fillStyle = "#6a0dad";
      ctx.fillStyle = "purple"
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
      // check that they don't overlap in the x axis
      const objLeftOnPlat = object.left <= platform.right && object.left >= platform.left;
      const objRightOnPlat = object.right <= platform.right && object.right >= platform.left;
      const objBotOnPlatTop = Math.abs(platform.top - object.bottom) === 0;
      
      // console.log("OBJECT BOTTOM: ", object.bottom/);
      // console.log("PLATFORM TOP: ", platform.top);
      // console.log('objectBotOnPlat: ', !objBotOnPlatTop)
      // console.log('OBJECT RIGHT: ', object.right)
      // console.log('PLATFORM RIGHT: ', platform.right)
      // console.log("OBJECT LEFT: ", object.left);
      // console.log("PLATFORM LEFT: ", platform.left);
      // console.log('objectLeftOnPlat', !objLeftOnPlat);
      // console.log('objRightOnPlat', !objRightOnPlat);

      if (!objLeftOnPlat && !objRightOnPlat) {
        // if (player.y < 400) { 
          // debugger
        // }
        return false;
        // if (objBotOnPlatTop) return true;
        // return false;
      }
      
      if (objLeftOnPlat || objRightOnPlat) {
        // debugger
        // console.log('PLATFORM:::::', platform.top)
        // console.log('PLAYER:::::::', object.bottom)
        // console.log('objBotOnPlat:::::::::', objBotOnPlatTop)

        if (objBotOnPlatTop) {
          debugger
        }
      }
      //check that they don't overlap in the y axis
      const objTopAbovePlatBot = object.top > platform.bottom;
      if (!objBotOnPlatTop) {
        // console.log()
        // if (player.y < 400) { 
          // debugger
        // }
        return false;
      }

      return true;
    };

    let collision = false;
    this.eachPlatform(platform => {
        //check if the bird is overlapping (colliding) with either platform
      if (_overlap(platform, player.bounds())) {
        // console.log('WE ARE HERE IN THE OVERLAP')
        // console.log(platform)
        collision = true;
        // debugger
        // console.log(player)
        player.y = platform.top;
        // console.log('PLATFORM: ', platform)
        // console.log(collision)
        // player.movePlayer("up")
      }
        // _overlap(platform.bottomPlatform, player)
    });

    // console.log('collision:')
    // console.log(collision)
    return collision;
  }
}

