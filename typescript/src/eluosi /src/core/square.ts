/**
 * 小方块类 负责数据的逻辑
 */
import { IViewer, Point } from "./types";
// 数据与显示分离
export class Square {
  // 属性：显示者 负责显示的逻辑
  private _viewer?: IViewer;

  public get viewer() {
    return this._viewer;
  }
  public set viewer(val) {
    this._viewer = val;
    if (this._viewer) {
      this._viewer.show();
    }
  }

  public get point() {
    return this._point;
  }
  public set point(val) {
    this._point = val;
    if (this._viewer) {
      this._viewer.show();
    }
  }
  public get color() {
    return this._color;
  }
  constructor(private _point: Point, private _color: string) {}
}
