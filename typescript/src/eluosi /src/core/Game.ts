import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";
import { GameStatus, GameViewer, MoveDirection } from "./types";

export class Game {
  // 游戏状态
  private _gameStatus: GameStatus = GameStatus.init;
  //   当前玩家操作的方块
  private _curTeris?: SquareGroup;
  // 下一个方块
  private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
  // 计时器
  private _timer?: number;
  // 自定下落的时间间隔
  private _duration: number = 1000;
  // 当前游戏中 已存在的小方块
  private _exists: Square[] = [];
  constructor(private _viewer: GameViewer) {
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
  }
  start() {
    if (this._gameStatus === GameStatus.playing) {
      return;
    }
    this._gameStatus = GameStatus.playing;
    if (!this._curTeris) {
      // 给当前玩家操作的方块
      this.switchTeris();
    }
    this.autoDrop();
  }
  pause() {
    if (this._gameStatus === GameStatus.playing) {
      this._gameStatus = GameStatus.pause;
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }
  controlLeft() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.move(this._curTeris, MoveDirection.left, this._exists);
    }
  }

  controlRight() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.move(this._curTeris, MoveDirection.right, this._exists);
    }
  }

  controlDown() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.moveDirectly(this._curTeris, MoveDirection.down, this._exists);
      //触底
      this.hitBottom();
    }
  }

  controlRotate() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.rotate(this._curTeris, this._exists);
    }
  }

  autoDrop() {
    if (this._timer || this._gameStatus !== GameStatus.playing) {
      return;
    }
    this._timer = window.setInterval(() => {
      if (this._curTeris) {
        if (!TerisRule.move(this._curTeris, MoveDirection.down, this._exists)) {
          //触底
          this.hitBottom();
        }
      }
    }, this._duration);
  }
  /**
   * 切换小方块
   */
  switchTeris() {
    this._curTeris = this._nextTeris;
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTeris);
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.switch(this._curTeris);
    this._viewer.showNext(this._nextTeris);
  }
  /**
   * 设置中心点坐标，已达到让该方块出现在区域的中上方
   * @param width
   * @param teris
   */
  resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1;
    const y = 0;
    teris.centerPoint = { x, y };
    while (teris.squares.some((it) => it.point.y < 0)) {
      teris.squares.forEach(
        (sq) =>
          (sq.point = {
            x: sq.point.x,
            y: sq.point.y + 1,
          })
      );
    }
  }
  /**
   * 触底后的操作 将当前的俄罗斯包含的小方块，加入到已存在的方块数组中
   */
  private hitBottom() {
    // 将当前的俄罗斯包含的小方块，加入到已存在的方块数组中(_exist)
    this._exists = this._exists.concat(this._curTeris!.squares);
    console.log(this._exists);

    // 存入之后 再切换方块
    this.switchTeris();
  }
}
