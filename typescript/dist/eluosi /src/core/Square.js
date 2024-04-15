"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
class Square {
    constructor() {
        this._point = {
            x: 0,
            y: 0,
        };
        this._color = "";
    }
    get viewer() {
        return this._viewer;
    }
    set viewer(v) {
        this._viewer = v;
        if (v) {
            v.show();
        }
    }
    get point() {
        return this._point;
    }
    set point(val) {
        this._point = val;
        if (this._viewer) {
            this._viewer.show();
        }
    }
    get color() {
        return this._color;
    }
    set color(val) {
        this._color = val;
    }
}
exports.Square = Square;
