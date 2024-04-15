"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquareGroup = void 0;
const Square_1 = require("./Square");
class SquareGroup {
    get squares() {
        return this._squares;
    }
    get shape() {
        return this._shape;
    }
    get centerPoint() {
        return this._centerPoint;
    }
    set centerPoint(v) {
        this._centerPoint = v;
        this.setSquarePoints();
    }
    setSquarePoints() {
        this._shape.forEach((p, i) => {
            this._squares[i].point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y,
            };
        });
    }
    constructor(_shape, _centerPoint, _color) {
        this._shape = _shape;
        this._centerPoint = _centerPoint;
        this._color = _color;
        this.isClock = true;
        const arr = [];
        this._shape.forEach((p) => {
            const sq = new Square_1.Square();
            sq.color = this._color;
            arr.push(sq);
        });
        this._squares = arr;
        this.setSquarePoints();
    }
    afterRotateShape() {
        if (this.isClock) {
            return this._shape.map((p) => {
                const newP = {
                    x: -p.y,
                    y: p.x,
                };
                return newP;
            });
        }
        else {
            return this._shape.map((p) => {
                const newP = {
                    x: p.y,
                    y: -p.x,
                };
                return newP;
            });
        }
    }
    rotate() {
        const newShape = this.afterRotateShape();
        this._shape = newShape;
        this.setSquarePoints();
    }
}
exports.SquareGroup = SquareGroup;
