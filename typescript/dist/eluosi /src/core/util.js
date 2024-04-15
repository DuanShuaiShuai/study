"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = void 0;
function getRandom(min, max) {
    const dec = max - min;
    return Math.floor(Math.random() * dec + min);
}
exports.getRandom = getRandom;
