/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ball; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONSTANTS = {
  dy: 75,
  GRAVITY: 0.4,
  TERMINAL_VEL: 7.5
};

var Ball = /*#__PURE__*/function () {
  function Ball(coor) {
    _classCallCheck(this, Ball);

    // this.ctx = canvas.getContext("2d");
    // this.dimensions = { width: , height: }
    this.x = coor.x;
    this.y = coor.y;
    this.vel = 0;
    this.balls = [];
    this.drawBall = this.drawBall.bind(this);
    this.up = this.up.bind(this);
    this.moveBall = this.moveBall.bind(this);
    this.animate = this.animate.bind(this);
    this.collidesWith = this.collidesWith.bind(this);
  }

  _createClass(Ball, [{
    key: "drawBall",
    value: function drawBall(ctx) {
      console.log("draw");
      console.log(ctx);
      ctx.beginPath();
      ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = "rgb(161, 87, 2)";
      ctx.fill();
      ctx.closePath(); // this.y += CONSTANTS.dy;
    }
  }, {
    key: "up",
    value: function up() {
      this.vel = -1 * CONSTANTS.dy;
    }
  }, {
    key: "moveBall",
    value: function moveBall() {
      var _this = this;

      console.log("move ball");
      this.up();
      setInterval(function () {
        console.log("setInterval");
        console.log("".concat(_this.y, ", ").concat(_this.vel));
        _this.y += _this.vel;
        console.log(_this.y);
      }, 30);
      console.log("".concat(this.x, ", ").concat(this.y));
      this.vel += CONSTANTS.GRAVITY; //we set a 'terminal velocity', a maximum speed the Player can travel
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
  }, {
    key: "animate",
    value: function animate(ctx) {
      console.log("animate");
      console.log("x: ".concat(this.x, ", y: ").concat(this.y)); // console.log(ctx);

      this.moveBall();
      this.drawBall(ctx);
    }
  }, {
    key: "collidesWith",
    value: function collidesWith(defender) {
      var _this2 = this;

      //this function returns true if the the rectangles overlap
      console.log("this.collidesWith");

      var _overlap = function _overlap(ball, object) {
        console.log("_overlap"); //check that they don't overlap in the x axis

        var objLeftOnBall = object.left <= ball.right && object.left >= ball.left;
        var objRightOnBall = object.right <= ball.right && object.right >= ball.left;
        console.log(object);
        console.log(ball);

        if (!objLeftOnBall && !objRightOnBall) {
          return false; // if (object.bottom < ball.top) return true;
          // return false;
        } //check that they don't overlap in the y axis


        var objTopAboveBallBot = object.top > ball.bottom;
        var objBotOnBallTop = object.bottom === ball.top;

        if (!objBotOnBallTop || !objTopAboveBallBot) {
          return false;
        }

        return true;
      };

      var collision = false;
      this.eachBall(function (ball) {
        //check if the bird is overlapping (colliding) with either ball
        if (_overlap(_this2.ball, defender)) {
          collision = true;
          console.log(ball);
          console.log(collision);
        } // _overlap(ball.bottomball, defender)

      });
      console.log("collision:");
      console.log(collision);
      return collision;
    }
  }, {
    key: "bounds",
    value: function bounds() {
      return {
        left: this.x,
        right: this.x + CONSTANTS.PLAYER_WIDTH,
        top: this.y,
        bottom: this.y + CONSTANTS.PLAYER_HEIGHT
      };
    }
  }]);

  return Ball;
}();



/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DoodleJump; });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ "./src/level.js");
/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ball */ "./src/ball.js");
/* harmony import */ var _hoop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hoop */ "./src/hoop.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var DoodleJump = /*#__PURE__*/function () {
  function DoodleJump(ctx, dimensions) {
    _classCallCheck(this, DoodleJump);

    // this.ctx = canvas.getContext("2d");
    // console.log(this./ctx)
    this.ctx = ctx; // this.backgrnd = canvas2.getContext("2d");

    this.dimensions = dimensions; // console.log((2/3) * canvas.width)
    // console.log((4/5) * canvas.height)

    this.balls; // this.balls = this.player.balls;
    // this.hoops = [];
    // this.defenders = [];

    this.registerEvents();
    this.restart(); // console.log('constructor')
  }

  _createClass(DoodleJump, [{
    key: "gameBalls",
    value: function gameBalls() {
      console.log('gameBalls');

      for (var i = 0; i < 3; i++) {
        this.player.balls.push(new _ball__WEBPACK_IMPORTED_MODULE_2__["default"]({
          x: this.player.x,
          y: this.player.y
        }));
      }

      console.log(this.player.balls);
    }
  }, {
    key: "displayBallReserve",
    value: function displayBallReserve(ctx) {
      // ctx.clearRect(0, 0, 500, 100);
      var num = this.player.balls.length;
      console.log(num);
      console.log('DISPLAYING BALLS');

      for (var i = 0; i < num; i++) {
        // console.log(i);
        var x_coor = i * 40 + 10; // if (i === 0) x_coor = 10

        this.drawBallReserve(x_coor, 10, ctx); // console.log('why?')
      }
    }
  }, {
    key: "drawBallReserve",
    value: function drawBallReserve(x, y, ctx) {
      // if (!this.ctx) return null;
      var sprite = new Image();
      console.log("".concat(x, ", ").concat(y));

      sprite.onload = function () {
        ctx.drawImage(sprite, -10, -10, // this.x,
        // this.y,
        // frameWidth, 
        // frameHeight,
        300, 300, // this.x, 
        // this.y,
        x, y, // this.y, 
        // this.x,
        // 500, 760, 
        // this.x,
        // this.y)
        50, 50);
      };

      sprite.src = "https://www.freepngimg.com/thumb/basketball/10-basketball-ball-png-image-thumb.png";
    }
  }, {
    key: "play",
    value: function play() {
      // console.log('play')
      this.running = true; // setInterval(() => this.keyStroke({ keyCode: 38 }), 1000)

      this.animate();
    }
  }, {
    key: "restart",
    value: function restart() {
      // console.log('restart')
      this.running = false;
      this.score = 0;

      if (this.player) {
        this.y = 0;
        this.x = 0; //   delete this.player.x;
        //   delete this.player.y;
        //   delete this.player.vel;
      }

      this.player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](this.dimensions);
      this.gameBalls();
      this.balls = this.player.balls;
      this.level = new _level__WEBPACK_IMPORTED_MODULE_1__["default"](this.dimensions); // window.setTimeout(() => this.animate(), 4000);

      this.animate();
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      // console.log('registerEvents')
      this.boundKeyStrokeHandler = this.keyStroke.bind(this);
      document.addEventListener("keydown", this.boundKeyStrokeHandler);
    }
  }, {
    key: "keyStroke",
    value: function keyStroke(e) {
      // console.log('keyStroke')
      var keyCode = e.keyCode; // console.log(keyCode);

      if (!this.running) this.play();
      console.log(keyCode);

      switch (keyCode) {
        case 32:
          this.player.shootBall(this.ctx);
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
          this.player.movePlayer("right");
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
      } // this.player.jump();

    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      return this.player.outOfBounds() || this.balls.length === 0;
    } //this is the key method of gaming action
    //animate tells the game to advance one bit
    //the bird moves, the level moves
    //everything is redrawn to the screen

  }, {
    key: "animate",
    value: function animate() {
      var _this = this;

      var start = requestAnimationFrame;
      var render = this.animate.bind(this);
      this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); // console.log('animate')
      //first we move and draw the level
      // console.log('animate level')

      this.level.animate(this.ctx); //then we move and draw the bird
      // console.log('animate player')D

      this.player.animate(this.ctx);
      this.displayBallReserve(this.ctx); //then we check to see if the game is over and let the player know

      if (this.gameOver()) {
        // console.log('game over')
        alert(this.score);
        this.restart();
        cancelAnimationFrame(start(render));
      } // //we see if they have scored a point by passing a platform


      this.level.landedPlatform(this.player.bounds(), function () {
        _this.score += 1;

        _this.player.movePlayer("up"); // console.log(this.score);

      });

      if (this.level.collidesWith(this.player)) {
        // console.log("if collidesWith");
        this.player.movePlayer("up");
      } //and draw the score
      // console.log('draw score')


      this.drawScore(); //if the game is NOT running, we do not animate the next frame

      if (this.running) {
        // console.log('if running...requestAnimationFrame')
        //This calls this function again, after around 1/60th of a second
        // requestAnimationFrame(this.animate.bind(this));
        setInterval(function () {
          var hoop = new _hoop__WEBPACK_IMPORTED_MODULE_3__["default"](_this.dimensions);
          hoop.animate(_this.ctx);
        }, 10000);
        start(render);
      }
    }
  }, {
    key: "drawScore",
    value: function drawScore() {
      // console.log('draw score')
      //loc will be the location
      var loc = {
        x: 5.25 * this.dimensions.width / 6,
        y: 0.5 * this.dimensions.height / 6
      };
      this.ctx.font = "bold 50pt serif";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(this.score, loc.x, loc.y);
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 2;
      this.ctx.strokeText(this.score, loc.x, loc.y);
    }
  }]);

  return DoodleJump;
}(); // 




/***/ }),

/***/ "./src/hoop.js":
/*!*********************!*\
  !*** ./src/hoop.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Hoop; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Hoop = /*#__PURE__*/function () {
  function Hoop(dimensions) {
    _classCallCheck(this, Hoop);

    this.dimensions = dimensions;
  }

  _createClass(Hoop, [{
    key: "getRandomInt",
    value: function getRandomInt(max) {
      var _int = Math.floor(Math.random() * Math.floor(max));

      if (_int === 0) return 1;
      return _int;
    }
  }, {
    key: "drawHoop",
    value: function drawHoop(ctx) {
      // console.log('DRAWING HOOP')
      // ctx.fillStyle = "blue";
      // ctx.fillRect(100, 100, 200, 200);
      var sprite = new Image();
      var x = this.getRandomInt(this.dimensions.width - 125);
      var y = 75;

      sprite.onload = function () {
        ctx.drawImage(sprite, x, y, 125, 125);
      };

      sprite.src = "https://www.pikpng.com/pngl/m/60-606890_animated-basketball-png-basketball-hoop-clipart-transparent-background.png";
      sprite.setAttribute("style", "background-color: transparent");
    }
  }, {
    key: "animate",
    value: function animate(ctx) {
      this.drawHoop(ctx);
    }
  }, {
    key: "collidesWith",
    value: function collidesWith(ball) {
      // this function returns true if the the rectangles overlap
      // console.log("this.collidesWith");
      var _overlap = function _overlap(platform, object) {
        //   console.log("_overlap");
        //check that they don't overlap in the x axis
        var objLeftOnPlat = object.left <= platform.right && object.left >= platform.left;
        var objRightOnPlat = object.right <= platform.right && object.right >= platform.left; //   console.log(object);
        //   console.log(platform);

        if (!objLeftOnPlat && !objRightOnPlat) {
          return false; // if (object.bottom < platform.top) return true;
          // return false;
        } //check that they don't overlap in the y axis


        var objTopAbovePlatBot = object.top > platform.bottom;
        var objBotOnPlatTop = object.bottom === platform.top;

        if (!objBotOnPlatTop) {
          return false;
        }

        return true;
      };

      var collision = false;
      this.eachPlatform(function (platform) {
        //check if the bird is overlapping (colliding) with either platform
        if (_overlap(platform, ball)) {
          collision = true; // console.log(platform);
          // console.log(collision);
        } // _overlap(platform.bottomPlatform, ball)

      }); // console.log("collision:");
      // console.log(collision);

      return collision;
    }
  }]);

  return Hoop;
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  var dimensions = {
    width: canvas.width,
    height: canvas.height
  }; // const bg_canv = document.getElementById("bg-canvas");
  // canvasEl.width = Game.DIM_X;

  ctx.clearRect(0, 0, dimensions.width, dimensions.height); // canvasEl.height = Game.DIM_Y;

  var game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, dimensions);
});

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Level; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONSTANTS = {
  PLATFORM_SPEED: 1,
  GAP_HEIGHT: 125,
  GAP_WIDTH: 60,
  PLATFORM_HEIGHT: 20,
  PLATFORM_WIDTH: 100,
  EDGE_BUFFER: 50,
  PLATFORM_SPACING: [100, 100] //   WARM_UP_SECONDS: 1,

}; // need to push

var Level = /*#__PURE__*/function () {
  function Level(dimensions) {
    _classCallCheck(this, Level);

    // console.log('level constructor')
    this.dimensions = dimensions;
    var firstPlatformLocation = [// this.dimensions.height,
    // 10,
    // this.dimensions.width,
    // this.dimensions.height
    2 * this.dimensions.width / 3, 5 * this.dimensions.height / 5]; //   CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.PLATFORM_SPEED;

    var _int = this.getRandomInt; // console.log(firstPlatformLocation)
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

    this.platforms = [this.randomPlatform(firstPlatformLocation)];
    this.fillPlatforms(firstPlatformLocation); // console.log('con platforms:', this.platforms)
  }

  _createClass(Level, [{
    key: "getRandomInt",
    value: function getRandomInt(max) {
      var _int2 = Math.floor(Math.random() * Math.floor(max));

      if (_int2 === 0) return 1;
      return _int2;
    }
  }, {
    key: "fillPlatforms",
    value: function fillPlatforms(location) {
      var _int3 = this.getRandomInt;

      for (var i = 0; i < 11; i++) {
        this.platforms.push(this.randomPlatform([location[0] - CONSTANTS.PLATFORM_SPACING[0] * _int3(i), location[1] - CONSTANTS.PLATFORM_SPACING[1] * _int3(i)]));
      }
    }
  }, {
    key: "randomPlatform",
    value: function randomPlatform(location) {
      // console.log('randomPlatform')
      // console.log('lcoation', location)
      var heightRange = Math.floor(this.dimensions.height) - 2 * CONSTANTS.EDGE_BUFFER - CONSTANTS.GAP_HEIGHT;
      var spaceRange = Math.floor(this.dimensions.width) - 2 * CONSTANTS.EDGE_BUFFER - CONSTANTS.GAP_WIDTH; // const gapTop = Math.random() * heightRange + CONSTANTS.EDGE_BUFFER;
      // const gapSide = Math.random() * widthRange + CONSTANTS.EDGE_BUFFER;

      var left = Math.abs(location[0] + spaceRange) % this.dimensions.width;
      var right = Math.abs(CONSTANTS.PLATFORM_WIDTH + location[0] + spaceRange) % this.dimensions.width;
      var top = (location[1] + heightRange) % this.dimensions.height;
      var bottom = (CONSTANTS.PLATFORM_HEIGHT + location[1] + heightRange) % this.dimensions.height; // console.log(`left: ${left}, right: ${right}, top: ${top}, bottom: ${bottom}`)
      // debugger

      var platform = {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        landed: false
      }; // debugger
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
  }, {
    key: "animate",
    value: function animate(ctx) {
      console.log('level animate'); // console.log('level animate')
      // console.log('drawBackground')

      this.drawBackground(ctx); // console.log("drawPlatforms");

      this.drawPlatforms(ctx); // this.drawHoop(ctx)
      // setInterval(() => setTimeout(this.drawHoop(ctx), 100), 10000)
      // console.log("movePlatform");

      this.movePlatform();
    }
  }, {
    key: "drawBackground",
    value: function drawBackground(ctx) {
      // console.log('this.drawBackground')
      // const background = new Image();
      // background.src =
      // "https://cdn3.vectorstock.com/i/1000x1000/15/12/background-of-basketball-court-vector-7441512.jpg";
      // background.onload = function() {
      //     ctx.drawImage(background, -100, -110)
      // }
      var canv = document.getElementById("game-canvas");
      canv.setAttribute("style", "background-image: url('https://cdn3.vectorstock.com/i/1000x1000/15/12/background-of-basketball-court-vector-7441512.jpg');"); // window.setTimeout
      // canv.setAttribute("style", "background-position: center")
      // ctx.setAtr
      // ctx.fillStyle = "skyblue";
      // ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }
  }, {
    key: "landedPlatform",
    value: function landedPlatform(player, callback) {
      this.eachPlatform(function (platform) {
        if (platform.top === player.bottom) {
          if (!platform.landed) {
            platform.landed = true; // console.log('landed')

            callback();
          }
        }
      });
    }
  }, {
    key: "movePlatform",
    value: function movePlatform() {
      // debugger
      // console.log('this.movePlatform')
      this.eachPlatform(function (platform) {
        platform.top += CONSTANTS.PLATFORM_SPEED;
        platform.bottom += CONSTANTS.PLATFORM_SPEED;
      }); //if a platform has left the screen add a new one to the end
      // console.log(`PLATFORM GONE?: ${this.platforms[0].top >= 0}`);
      // console.log(this.platforms[0].top)
      // console.log(this.platforms[0].top >= 0);
      // console.log(`first plat top: ${this.platforms[0].top}, canv bottom: ${this.dimensions.height}`)
      // console.log(
      // `if statement: ${this.platforms[0].top >= this.dimensions.height}`
      // );

      if (this.platforms[0].top >= this.dimensions.height) {
        this.platforms.shift();
        var idx = this.platforms.length - 1;
        var newX = this.platforms[idx].left + CONSTANTS.PLATFORM_SPACING[0];
        var newY = this.platforms[idx].top + CONSTANTS.PLATFORM_SPACING[1]; // console.log(`newX: ${newX}, newY: ${newY}`)
        // console.log()
        // this.platforms.push(this.randomPlatform([newX, newY]));

        this.platforms.push(this.randomPlatform([newX, newY]));
      } // debugger
      // console.log('WE ARE HEREERERERERERER')
      // console.log(this.platforms)
      // console.log(this.platforms)

    } // drawHoop(ctx) {
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

  }, {
    key: "drawPlatforms",
    value: function drawPlatforms(ctx) {
      // console.log('this.drawPlatforms');
      this.eachPlatform(function (platform) {
        // console.log(platform)
        // ctx.fillStyle = "#6a0dad";
        ctx.fillStyle = "purple"; // console.log(ctx)
        //draw platform

        ctx.fillRect(platform.left, platform.top, CONSTANTS.PLATFORM_WIDTH, CONSTANTS.PLATFORM_HEIGHT);
      });
    }
  }, {
    key: "eachPlatform",
    value: function eachPlatform(callback) {
      // console.log('this.eachPlatform');
      this.platforms.forEach(callback.bind(this));
    } //This method shall return true if the bird passed in is currently
    //colliding with any platform.

  }, {
    key: "collidesWith",
    value: function collidesWith(player) {
      //this function returns true if the the rectangles overlap
      // console.log('this.collidesWith')
      var _overlap = function _overlap(platform, object) {
        // console.log('_overlap')
        // check that they don't overlap in the x axis
        var objLeftOnPlat = object.left <= platform.right && object.left >= platform.left;
        var objRightOnPlat = object.right <= platform.right && object.right >= platform.left;
        var objBotOnPlatTop = Math.abs(platform.top - object.bottom) === 0; // console.log("OBJECT BOTTOM: ", object.bottom/);
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
          return false; // if (objBotOnPlatTop) return true;
          // return false;
        }

        if (objLeftOnPlat || objRightOnPlat) {
          // debugger
          // console.log('PLATFORM:::::', platform.top)
          // console.log('PLAYER:::::::', object.bottom)
          // console.log('objBotOnPlat:::::::::', objBotOnPlatTop)
          if (objBotOnPlatTop) {
            debugger;
          }
        } //check that they don't overlap in the y axis


        var objTopAbovePlatBot = object.top > platform.bottom;

        if (!objBotOnPlatTop) {
          // console.log()
          // if (player.y < 400) { 
          // debugger
          // }
          return false;
        }

        return true;
      };

      var collision = false;
      this.eachPlatform(function (platform) {
        //check if the bird is overlapping (colliding) with either platform
        if (_overlap(platform, player.bounds())) {
          // console.log('WE ARE HERE IN THE OVERLAP')
          // console.log(platform)
          collision = true; // debugger
          // console.log(player)

          player.y = platform.top; // console.log('PLATFORM: ', platform)
          // console.log(collision)
          // player.movePlayer("up")
        } // _overlap(platform.bottomPlatform, player)

      }); // console.log('collision:')
      // console.log(collision)

      return collision;
    }
  }]);

  return Level;
}();



/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MovingObject; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONSTANTS = {
  GRAVITY: 0.4,
  JUMP_SPEED: 100,
  FALL_SPEED: 1,
  TERMINAL_VEL: 7.5,
  PLAYER_WIDTH: 40,
  PLAYER_HEIGHT: 40
};

var MovingObject = /*#__PURE__*/function () {
  function MovingObject(dimensions, coords) {
    _classCallCheck(this, MovingObject);

    this.dimensions = dimensions;
    this.coords = coords; // this.x = this.dimensions.width / 3;
    // this.y = this.dimensions.height / 2;
    // this.y = 760;

    this.vel = 0;
    this.balls = [];
  }

  _createClass(MovingObject, [{
    key: "jump",
    value: function jump() {
      //if this were a more realistic player simulation, we would be adding to the velocity
      //instead of just assigning it outright
      //to make the experience more fun and 'bouncy' we just set it directly
      this.vel = -1 * CONSTANTS.JUMP_SPEED; // this.movePlayer()
    }
  }, {
    key: "move",
    value: function move() {
      var _this = this;

      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      if (dir === "right") {
        this.x += 25;
      } else if (dir === "left") {
        this.x -= 25;
      } else if (dir === "up") {
        this.jump(); // console.log(this.y)
        // let max_height = this.y + this.vel
        // this.y = max_height;

        setInterval(function () {
          console.log(_this.y);
          _this.y += _this.vel;
          if (_this.y > _this.bounds.top + 100) _this.y = _this.bounds.top + 100;
        }, 50); // // console.log(this.y)
        // if (this.y === (max_height)) {
        //   this.fall();
        //   while (!this.outOfBounds) this.y += this.vel;
      } // } else if (dir === "down") {
      // this.fall()
      // setInterval(() => this.y += this.vel, 30);
      // }
      //for each frame, the Player should move by it's current velocity
      //velocity is 'pixels per frame', so each frame it should update position by vel
      //the acceleration of gravity is in pixels per second per second
      //so each second, it changes the velocity by whatever the gravity constant is


      this.vel += CONSTANTS.GRAVITY; //we set a 'terminal velocity', a maximum speed the Player can travel
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
  }, {
    key: "animate",
    value: function animate(ctx) {
      this.move();
      this.draw(ctx);
    }
  }, {
    key: "draw",
    value: function draw(ctx, dimensions, sprite) {
      if (!sprite) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
      } else {}
    }
  }, {
    key: "bounds",
    value: function bounds() {
      return {
        left: this.x,
        right: this.x + CONSTANTS.PLAYER_WIDTH,
        top: this.y,
        bottom: this.y + CONSTANTS.PLAYER_HEIGHT
      };
    }
  }, {
    key: "outOfBounds",
    value: function outOfBounds() {
      // const aboveTheTop = this.y < 0;
      var belowTheBottom = this.y + CONSTANTS.PLAYER_HEIGHT > this.dimensions.height;
      return belowTheBottom;
    }
  }]);

  return MovingObject;
}();



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ball */ "./src/ball.js");
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var CONSTANTS = {
  GRAVITY: 0.4,
  JUMP_SPEED: 100,
  FALL_SPEED: 1,
  TERMINAL_VEL: 7.5,
  PLAYER_WIDTH: 55,
  PLAYER_HEIGHT: 85
};

var Player = /*#__PURE__*/function (_MovingObject) {
  _inherits(Player, _MovingObject);

  var _super = _createSuper(Player);

  function Player(dimensions) {
    var _this;

    _classCallCheck(this, Player);

    _this = _super.call(this, dimensions); // this.dimensions = dimensions;

    _this.x = _this.dimensions.width / 3; // this.y = this.dimensions.height / 2;

    _this.y = 715;
    _this.vel = 0;
    _this.balls = [];
    return _this;
  }

  _createClass(Player, [{
    key: "fall",
    value: function fall() {
      this.vel = CONSTANTS.FALL_SPEED;
    }
  }, {
    key: "jump",
    value: function jump() {
      //if this were a more realistic player simulation, we would be adding to the velocity
      //instead of just assigning it outright
      //to make the experience more fun and 'bouncy' we just set it directly
      this.vel = -1 * CONSTANTS.JUMP_SPEED; // this.movePlayer()
    }
  }, {
    key: "movePlayer",
    value: function movePlayer() {
      var _this2 = this;

      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      // console.log('moving player')
      if (dir === "right") {
        console.log('before right', this.x);
        this.x = (this.x += 25) % this.dimensions.width;
        console.log('after right', this.x);
      } else if (dir === "left") {
        console.log('before left', this.x);
        this.x = (this.x -= 25) % this.dimensions.width;
        console.log('after left', this.x);
      } else if (dir === "up") {
        console.log('up');
        this.jump();
        this.y += this.vel; // console.log(this.y)

        var max_height = 200; // if (this.y <= max_height) this.y = max_height;
        // console.log('THIS.Y ======', this.y)
        // this.y = max_height;

        setInterval(function () {
          // console.log(this.y)
          _this2.y += _this2.vel;

          if (_this2.y <= max_height) {
            _this2.y = max_height;
            _this2.y -= _this2.vel;
          }
        }, 50); // // console.log(this.y)
        // if (this.y === (max_height)) {
        // this.fall();
        // while (!this.outOfBounds) this.y += this.vel;
        // }
      } // } else if (dir === "down") {
      // this.fall()
      // setInterval(() => this.y += this.vel, 30);
      // }
      //for each frame, the Player should move by it's current velocity
      //velocity is 'pixels per frame', so each frame it should update position by vel
      //the acceleration of gravity is in pixels per second per second
      //so each second, it changes the velocity by whatever the gravity constant is


      this.vel += CONSTANTS.GRAVITY; //we set a 'terminal velocity', a maximum speed the Player can travel
      //this keeps the game from becoming too wild because the Player is moving too fast to control

      if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
        //if the terminal velocity is exceeded, we set it to the terminal velicty
        if (this.vel > 0) {
          this.vel = CONSTANTS.TERMINAL_VEL;
        } else {
          this.vel = CONSTANTS.TERMINAL_VEL * -1;
        }
      } // console.log('done moving.')

    }
  }, {
    key: "animate",
    value: function animate(ctx) {
      // ctx.clearRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
      // ctx.clearRect(
      //   this.bounds().left,
      //   this.bounds().top,
      //   this.bounds().right,
      //   this.bounds().bottom
      // );
      this.movePlayer();
      this.drawPlayer(ctx);
    } //

  }, {
    key: "drawPlayer",
    value: function drawPlayer(ctx) {
      var _this3 = this;

      console.log('drawning player...'); // const kobe = new Image();
      // kobe.onload = function() {
      //   ctx.drawImage(kobe, this.y, this.x, 100, 100)
      // }
      // kobe.src =
      //   "https://banner2.cleanpng.com/20180328/ghw/kisspng-kobe-bryant-basketball-slam-dunk-clip-art-nba-5abc013fb852c9.818527801522270527755.jpg";

      ctx.fillStyle = "yellow";
      ctx.fillRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT); // console.log("begin to clear...");
      // ctx.clearRect(
      //   this.x,
      //   this.y,
      //   CONSTANTS.PLAYER_WIDTH,
      //   CONSTANTS.PLAYER_HEIGHT
      // );
      // console.log("ending clear");

      var _draw = function _draw() {
        // console.log('start draw function...')
        var sprite = new Image(); // Define the size of a frame

        var frameWidth = 55;
        var frameHeight = 85; // Rows and columns start from 0

        var row = 3.9;
        var column = 7.65; // console.log(`${this.x}, ${this.y}`)

        var x = _this3.x;
        var y = _this3.y;

        sprite.onload = function () {
          ctx.drawImage(sprite, column * frameWidth, row * frameHeight, // this.x,
          // this.y,
          frameWidth, frameHeight, // this.x, 
          // this.y,
          x, y, // this.y, 
          // this.x,
          // 500, 760, 
          // this.x,
          // this.y)
          frameWidth, frameHeight);
        }; // ctx.clearRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
        // sprite.src = image_url("assets/images/basketball-player-sprite-clipart.png");


        sprite.src = "https://library.kissclipart.com/20180914/rrw/kissclipart-basketball-player-sprite-clipart-nba-basketball-pl-cf84a83dd372375e.png"; // console.log('SPRITEEEEEEEEEE')
        // console.log(sprite);
        // console.log("SPRITEEEEEEEEEE SOURCEEEEE");
        // console.log(sprite.src);
        // sprite.setAttribute("style", "background-color: transparent")
        // console.log('done with draw function.')
      };

      _draw(); // console.log('done drawing.')

    }
  }, {
    key: "bounds",
    value: function bounds() {
      return {
        left: this.x,
        right: this.x + CONSTANTS.PLAYER_WIDTH,
        top: this.y,
        bottom: this.y + CONSTANTS.PLAYER_HEIGHT
      };
    }
  }, {
    key: "outOfBounds",
    value: function outOfBounds() {
      // const aboveTheTop = this.y < 0;
      var belowTheBottom = this.y + CONSTANTS.PLAYER_HEIGHT > this.dimensions.height;
      return belowTheBottom;
    }
  }, {
    key: "shootBall",
    value: function shootBall(ctx) {
      var ball = this.balls.pop(); // console.log(ctx);

      ball.animate(ctx); // ball.moveBall()
    }
  }]);

  return Player;
}(_moving_object__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map