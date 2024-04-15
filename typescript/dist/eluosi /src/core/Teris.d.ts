import { Point } from "./types";
import { SquareGroup } from "./SquareGroup";
export declare class TShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string);
}
export declare class LShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string);
}
export declare class LMirrorShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string);
}
export declare class SShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string);
    rotate(): void;
}
export declare class SMirrorShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string);
    rotate(): void;
}
export declare class SquareShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string);
    afterRotateShape(): import("./types").Shape;
}
export declare class LineShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string);
    rotate(): void;
}
export declare class UShape extends SquareGroup {
    constructor(_centerPoint: Point, _color: string);
}
export declare const shapes: (typeof TShape)[];
export declare const colors: string[];
export declare function createTeris(centerPoint: Point): SquareGroup;
