import Game from './game';

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d")
  const dimensions = { width: canvas.width, height: canvas.height };
  // const bg_canv = document.getElementById("bg-canvas");
  // canvasEl.width = Game.DIM_X;
  ctx.clearRect(0, 0, dimensions.width, dimensions.height);
  // canvasEl.height = Game.DIM_Y;
  const game = new Game(ctx, dimensions);
  // const ctx = canvasEle.getContext("2d");
  // new GameView(game, ctx).start();
  // console.log(canvasEle)
  // console.log(
    // 'webapck is working'
  // )

  // window.MovingObject = MovingObject;
});
