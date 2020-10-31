import Game from './game';

document.addEventListener("DOMContentLoaded", function () {
  const game_canv = document.getElementById("game-canvas");
  // const bg_canv = document.getElementById("bg-canvas");
  // canvasEl.width = Game.DIM_X;
  // canvasEl.height = Game.DIM_Y;
  // const ctx = canvasEle.getContext("2d");
  const game = new Game(game_canv);
  // new GameView(game, ctx).start();
  // console.log(canvasEle)
  // console.log(
    // 'webapck is working'
  // )

  // window.MovingObject = MovingObject;
});
