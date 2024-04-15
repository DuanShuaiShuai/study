"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStatus = exports.MoveDirection = void 0;
var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["left"] = 0] = "left";
    MoveDirection[MoveDirection["right"] = 1] = "right";
    MoveDirection[MoveDirection["down"] = 2] = "down";
})(MoveDirection || (exports.MoveDirection = MoveDirection = {}));
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["init"] = 0] = "init";
    GameStatus[GameStatus["playing"] = 1] = "playing";
    GameStatus[GameStatus["pause"] = 2] = "pause";
    GameStatus[GameStatus["over"] = 3] = "over";
})(GameStatus || (exports.GameStatus = GameStatus = {}));
