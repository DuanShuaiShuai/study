import { Point, IViewer } from "./types";
export declare class Square {
    private _point;
    private _color;
    private _viewer?;
    get viewer(): IViewer | undefined;
    set viewer(v: IViewer | undefined);
    get point(): Point;
    set point(val: Point);
    get color(): string;
    set color(val: string);
}
