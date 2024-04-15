import { Shape, Point, MoveDirection } from "./types";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";
export declare class TerisRule {
    static canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean;
    static move(teris: SquareGroup, targetPoint: Point, exists: Square[]): boolean;
    static move(teris: SquareGroup, direction: MoveDirection, exists: Square[]): boolean;
    static moveDirectly(teris: SquareGroup, direction: MoveDirection, exists: Square[]): void;
    static rotate(teris: SquareGroup, exists: Square[]): boolean;
    static deleteSquares(exists: Square[]): number;
    private static deleteLine;
}
