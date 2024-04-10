import { Square } from "./Square";
import { Point, Shape } from "./types";

export class SquareGroup {
  //显示数组
  private _squares: Square[];
  public get squares() {
    return this._squares;
  }
  public get centerPoint(): Point {
    return this._centerPoint;
  }
  public get shape() {
    return this._shape;
  }
  public set centerPoint(v: Point) {
    this._centerPoint = v;
    //同时设置所有小方块对象的坐标
    this._shape.forEach((p, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y,
      };
    });
  }
  constructor(
    private _shape: Shape, //逻辑数组
    private _centerPoint: Point,
    private _color: string
  ) {
    //设置小方块的数组
    const arr: Square[] = [];
    this._shape.forEach((p) => {
      const sq = new Square(
        {
          x: this._centerPoint.x + p.x,
          y: this._centerPoint.y + p.y,
        },
        this._color
      );
      arr.push(sq);
    });
    this._squares = arr;
  }
}
