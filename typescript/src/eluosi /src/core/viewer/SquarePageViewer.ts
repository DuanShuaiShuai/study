import { Square } from "../square";
import { IViewer } from "../types";
import $ from "jquery";
import PageConfig from "./PageConfig";

$();
/**
 * 小方块的页面显示类
 */
export class SquarePageViewer implements IViewer {
  private _dom?: JQuery<HTMLElement>;
  private _isRemove: boolean = false;
  constructor(private square: Square, private container: JQuery<HTMLElement>) {}
  show(): void {
    if (this._isRemove) {
      return;
    }
    if (!this._dom && !this._isRemove) {
      //创建_dom
      this._dom = $("<div>")
        .css({
          position: "absolute",
          width: PageConfig.SquareSize.width,
          height: PageConfig.SquareSize.height,
          border: "1px solid #ccc",
          boxSize: "border-box",
          background: this.square.color,
        })
        .appendTo(this.container);
    }
    this._dom?.css({
      left: this.square.point.x * PageConfig.SquareSize.width,
      top: this.square.point.y * PageConfig.SquareSize.height,
    });
  }
  remove(): void {
    if (this._dom) {
      this._dom.remove();
      this._isRemove = true;
    }
  }
}
