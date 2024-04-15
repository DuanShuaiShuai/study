"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquarePageViewer = void 0;
const jquery_1 = __importDefault(require("jquery"));
const PageConfig_1 = __importDefault(require("./PageConfig"));
class SquarePageViewer {
    show() {
        if (this.isRemove) {
            return;
        }
        if (!this.dom) {
            this.dom = (0, jquery_1.default)("<div>")
                .css({
                position: "absolute",
                width: PageConfig_1.default.SquareSize.width,
                height: PageConfig_1.default.SquareSize.height,
                border: "1px solid #ccc",
                boxSizing: "border-box",
            })
                .appendTo(this.container);
        }
        this.dom.css({
            left: this.square.point.x * PageConfig_1.default.SquareSize.width,
            top: this.square.point.y * PageConfig_1.default.SquareSize.height,
            background: this.square.color,
        });
    }
    remove() {
        if (this.dom && !this.isRemove) {
            this.dom.remove();
            this.isRemove = true;
        }
    }
    constructor(square, container) {
        this.square = square;
        this.container = container;
        this.isRemove = false;
    }
}
exports.SquarePageViewer = SquarePageViewer;
