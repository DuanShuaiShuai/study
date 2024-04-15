import { Square } from "./Square";
import { Shape, Point } from "./types";
export declare abstract class SquareGroup {
    private _shape;
    private _centerPoint;
    private _color;
    private _squares;
    get squares(): readonly Square[];
    get shape(): Shape;
    get centerPoint(): Point;
    set centerPoint(v: Point);
    private setSquarePoints;
    constructor(_shape: Shape, _centerPoint: Point, _color: string);
    protected isClock: boolean;
    afterRotateShape(): Shape;
    rotate(): void;
}
