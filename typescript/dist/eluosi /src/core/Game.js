"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const types_1 = require("./types");
const Teris_1 = require("./Teris");
const TerisRule_1 = require("./TerisRule");
const GameConfig_1 = __importDefault(require("./GameConfig"));
class Game {
    get gameStatus() {
        return this._gameStatus;
    }
    get score() {
        return this._score;
    }
    set score(val) {
        this._score = val;
        this._viewer.showScore(val);
        const level = GameConfig_1.default.levels.filter((it) => it.score <= val).pop();
        if (level.duration === this._duration) {
            return;
        }
        this._duration = level.duration;
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = undefined;
            this.autoDrop();
        }
    }
    constructor(_viewer) {
        this._viewer = _viewer;
        this._gameStatus = types_1.GameStatus.init;
        this._exists = [];
        this._score = 0;
        this._duration = GameConfig_1.default.levels[0].duration;
        this._nextTeris = (0, Teris_1.createTeris)({ x: 0, y: 0 });
        this.createNext();
        this._viewer.init(this);
        this._viewer.showScore(this.score);
    }
    createNext() {
        this._nextTeris = (0, Teris_1.createTeris)({ x: 0, y: 0 });
        this.resetCenterPoint(GameConfig_1.default.nextSize.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris);
    }
    init() {
        this._exists.forEach((sq) => {
            if (sq.viewer) {
                sq.viewer.remove();
            }
        });
        this._exists = [];
        this.createNext();
        this._curTeris = undefined;
        this.score = 0;
    }
    start() {
        if (this._gameStatus === types_1.GameStatus.playing) {
            return;
        }
        if (this._gameStatus === types_1.GameStatus.over) {
            this.init();
        }
        this._gameStatus = types_1.GameStatus.playing;
        if (!this._curTeris) {
            this.switchTeris();
        }
        this.autoDrop();
        this._viewer.onGameStart();
    }
    pause() {
        if (this._gameStatus === types_1.GameStatus.playing) {
            this._gameStatus = types_1.GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGamePause();
        }
    }
    controlLeft() {
        if (this._curTeris && this._gameStatus === types_1.GameStatus.playing) {
            TerisRule_1.TerisRule.move(this._curTeris, types_1.MoveDirection.left, this._exists);
        }
    }
    controlRight() {
        if (this._curTeris && this._gameStatus === types_1.GameStatus.playing) {
            TerisRule_1.TerisRule.move(this._curTeris, types_1.MoveDirection.right, this._exists);
        }
    }
    controlDown() {
        if (this._curTeris && this._gameStatus === types_1.GameStatus.playing) {
            TerisRule_1.TerisRule.moveDirectly(this._curTeris, types_1.MoveDirection.down, this._exists);
            this.hitBottom();
        }
    }
    controlRotate() {
        if (this._curTeris && this._gameStatus === types_1.GameStatus.playing) {
            TerisRule_1.TerisRule.rotate(this._curTeris, this._exists);
        }
    }
    autoDrop() {
        if (this._timer || this._gameStatus !== types_1.GameStatus.playing) {
            return;
        }
        this._timer = setInterval(() => {
            if (this._curTeris) {
                if (!TerisRule_1.TerisRule.move(this._curTeris, types_1.MoveDirection.down, this._exists)) {
                    this.hitBottom();
                }
            }
        }, this._duration);
    }
    switchTeris() {
        this._curTeris = this._nextTeris;
        this._curTeris.squares.forEach((sq) => {
            if (sq.viewer) {
                sq.viewer.remove();
            }
        });
        this.resetCenterPoint(GameConfig_1.default.panelSize.width, this._curTeris);
        if (!TerisRule_1.TerisRule.canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)) {
            this._gameStatus = types_1.GameStatus.over;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGameOver();
            return;
        }
        this.createNext();
        this._viewer.swtich(this._curTeris);
    }
    resetCenterPoint(width, teris) {
        const x = Math.ceil(width / 2) - 1;
        const y = 0;
        teris.centerPoint = { x, y };
        while (teris.squares.some((it) => it.point.y < 0)) {
            teris.centerPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y + 1,
            };
        }
    }
    hitBottom() {
        this._exists = this._exists.concat(this._curTeris.squares);
        const num = TerisRule_1.TerisRule.deleteSquares(this._exists);
        this.addScore(num);
        this.switchTeris();
    }
    addScore(lineNum) {
        if (lineNum === 0) {
            return;
        }
        else if (lineNum === 1) {
            this.score += 10;
        }
        else if (lineNum === 2) {
            this.score += 25;
        }
        else if (lineNum === 3) {
            this.score += 50;
        }
        else {
            this.score += 100;
        }
    }
}
exports.Game = Game;
