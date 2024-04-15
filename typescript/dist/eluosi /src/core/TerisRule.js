"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerisRule = void 0;
const types_1 = require("./types");
const GameConfig_1 = __importDefault(require("./GameConfig"));
function isPoint(obj) {
    if (typeof obj.x === "undefined") {
        return false;
    }
    return true;
}
class TerisRule {
    static canIMove(shape, targetPoint, exists) {
        const targetSquarePoints = shape.map((it) => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y,
            };
        });
        let result = targetSquarePoints.some((p) => {
            return (p.x < 0 ||
                p.x > GameConfig_1.default.panelSize.width - 1 ||
                p.y < 0 ||
                p.y > GameConfig_1.default.panelSize.height - 1);
        });
        if (result) {
            return false;
        }
        result = targetSquarePoints.some((p) => exists.some((sq) => sq.point.x === p.x && sq.point.y === p.y));
        if (result) {
            return false;
        }
        return true;
    }
    static move(teris, targetPointOrDirection, exists) {
        if (isPoint(targetPointOrDirection)) {
            if (this.canIMove(teris.shape, targetPointOrDirection, exists)) {
                teris.centerPoint = targetPointOrDirection;
                return true;
            }
            return false;
        }
        else {
            const direction = targetPointOrDirection;
            let targetPoint;
            if (direction === types_1.MoveDirection.down) {
                targetPoint = {
                    x: teris.centerPoint.x,
                    y: teris.centerPoint.y + 1,
                };
            }
            else if (direction === types_1.MoveDirection.left) {
                targetPoint = {
                    x: teris.centerPoint.x - 1,
                    y: teris.centerPoint.y,
                };
            }
            else {
                targetPoint = {
                    x: teris.centerPoint.x + 1,
                    y: teris.centerPoint.y,
                };
            }
            return this.move(teris, targetPoint, exists);
        }
    }
    static moveDirectly(teris, direction, exists) {
        while (this.move(teris, direction, exists)) { }
    }
    static rotate(teris, exists) {
        const newShape = teris.afterRotateShape();
        if (this.canIMove(newShape, teris.centerPoint, exists)) {
            teris.rotate();
            return true;
        }
        else {
            return false;
        }
    }
    static deleteSquares(exists) {
        const ys = exists.map((sq) => sq.point.y);
        const maxY = Math.max(...ys);
        const minY = Math.min(...ys);
        let num = 0;
        for (let y = minY; y <= maxY; y++) {
            if (this.deleteLine(exists, y)) {
                num++;
            }
        }
        return num;
    }
    static deleteLine(exists, y) {
        const squares = exists.filter((sq) => sq.point.y === y);
        if (squares.length === GameConfig_1.default.panelSize.width) {
            squares.forEach((sq) => {
                if (sq.viewer) {
                    sq.viewer.remove();
                }
                const index = exists.indexOf(sq);
                exists.splice(index, 1);
            });
            exists
                .filter((sq) => sq.point.y < y)
                .forEach((sq) => {
                sq.point = {
                    x: sq.point.x,
                    y: sq.point.y + 1,
                };
            });
            return true;
        }
        return false;
    }
}
exports.TerisRule = TerisRule;
