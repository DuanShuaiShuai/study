"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeris = exports.colors = exports.shapes = exports.UShape = exports.LineShape = exports.SquareShape = exports.SMirrorShape = exports.SShape = exports.LMirrorShape = exports.LShape = exports.TShape = void 0;
const util_1 = require("./util");
const SquareGroup_1 = require("./SquareGroup");
class TShape extends SquareGroup_1.SquareGroup {
    constructor(_centerPoint, _color) {
        super([
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
        ], _centerPoint, _color);
    }
}
exports.TShape = TShape;
class LShape extends SquareGroup_1.SquareGroup {
    constructor(_centerPoint, _color) {
        super([
            { x: -2, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
        ], _centerPoint, _color);
    }
}
exports.LShape = LShape;
class LMirrorShape extends SquareGroup_1.SquareGroup {
    constructor(_centerPoint, _color) {
        super([
            { x: 2, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
        ], _centerPoint, _color);
    }
}
exports.LMirrorShape = LMirrorShape;
class SShape extends SquareGroup_1.SquareGroup {
    constructor(_centerPoint, _color) {
        super([
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 1 },
        ], _centerPoint, _color);
    }
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}
exports.SShape = SShape;
class SMirrorShape extends SquareGroup_1.SquareGroup {
    constructor(_centerPoint, _color) {
        super([
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
        ], _centerPoint, _color);
    }
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}
exports.SMirrorShape = SMirrorShape;
class SquareShape extends SquareGroup_1.SquareGroup {
    constructor(_centerPoint, _color) {
        super([
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
        ], _centerPoint, _color);
    }
    afterRotateShape() {
        return this.shape;
    }
}
exports.SquareShape = SquareShape;
class LineShape extends SquareGroup_1.SquareGroup {
    constructor(_centerPoint, _color) {
        super([
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
        ], _centerPoint, _color);
    }
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}
exports.LineShape = LineShape;
class UShape extends SquareGroup_1.SquareGroup {
    constructor(_centerPoint, _color) {
        super([
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: -1, y: -1 },
            { x: 1, y: -1 },
        ], _centerPoint, _color);
    }
}
exports.UShape = UShape;
exports.shapes = [
    TShape,
    LShape,
    LMirrorShape,
    SShape,
    SMirrorShape,
    SquareShape,
    LineShape,
    UShape,
];
exports.colors = ["red", "green", "blue", "orange"];
function createTeris(centerPoint) {
    let index = (0, util_1.getRandom)(0, exports.shapes.length);
    const shape = exports.shapes[index];
    index = (0, util_1.getRandom)(0, exports.colors.length);
    const color = exports.colors[index];
    return new shape(centerPoint, color);
}
exports.createTeris = createTeris;
