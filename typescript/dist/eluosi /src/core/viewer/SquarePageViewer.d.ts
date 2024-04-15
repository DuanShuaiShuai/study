import { Square } from "../Square";
import { IViewer } from "../types";
export declare class SquarePageViewer implements IViewer {
    private square;
    private container;
    private dom?;
    private isRemove;
    show(): void;
    remove(): void;
    constructor(square: Square, container: JQuery<HTMLElement>);
}
