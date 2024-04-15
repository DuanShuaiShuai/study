"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePageViewer = void 0;
const types_1 = require("../types");
const SquarePageViewer_1 = require("./SquarePageViewer");
const jquery_1 = __importDefault(require("jquery"));
const GameConfig_1 = __importDefault(require("../GameConfig"));
const PageConfig_1 = __importDefault(require("./PageConfig"));
class GamePageViewer {
    constructor() {
        this.nextDom = (0, jquery_1.default)("#next");
        this.panelDom = (0, jquery_1.default)("#panel");
        this.scoreDom = (0, jquery_1.default)("#score");
        this.msgDom = (0, jquery_1.default)("#msg");
    }
    switch(teris) {
        throw new Error("Method not implemented.");
    }
    onGamePause() {
        this.msgDom.css({
            display: "flex",
        });
        this.msgDom.find("p").html("游戏暂停");
    }
    onGameStart() {
        this.msgDom.hide();
    }
    onGameOver() {
        this.msgDom.css({
            display: "flex",
        });
        this.msgDom.find("p").html("游戏结束");
    }
    showScore(score) {
        this.scoreDom.html(score.toString());
    }
    init(game) {
        this.panelDom.css({
            width: GameConfig_1.default.panelSize.width * PageConfig_1.default.SquareSize.width,
            height: GameConfig_1.default.panelSize.height * PageConfig_1.default.SquareSize.height,
        });
        this.nextDom.css({
            width: GameConfig_1.default.nextSize.width * PageConfig_1.default.SquareSize.width,
            height: GameConfig_1.default.nextSize.height * PageConfig_1.default.SquareSize.height,
        });
        (0, jquery_1.default)(document).keydown((e) => {
            if (e.keyCode === 37) {
                game.controlLeft();
            }
            else if (e.keyCode === 38) {
                game.controlRotate();
            }
            else if (e.keyCode === 39) {
                game.controlRight();
            }
            else if (e.keyCode === 40) {
                game.controlDown();
            }
            else if (e.keyCode === 32) {
                if (game.gameStatus === types_1.GameStatus.playing) {
                    game.pause();
                }
                else {
                    game.start();
                }
            }
        });
    }
    showNext(teris) {
        teris.squares.forEach((sq) => {
            sq.viewer = new SquarePageViewer_1.SquarePageViewer(sq, this.nextDom);
        });
    }
    swtich(teris) {
        teris.squares.forEach((sq) => {
            sq.viewer.remove();
            sq.viewer = new SquarePageViewer_1.SquarePageViewer(sq, this.panelDom);
        });
    }
}
exports.GamePageViewer = GamePageViewer;
