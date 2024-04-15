import { SquareGroup } from "./SquareGroup";
import { Game } from "./Game";
export interface Point {
    readonly x: number;
    readonly y: number;
}
export interface IViewer {
    show(): void;
    remove(): void;
}
export type Shape = Point[];
export declare enum MoveDirection {
    left = 0,
    right = 1,
    down = 2
}
export declare enum GameStatus {
    init = 0,
    playing = 1,
    pause = 2,
    over = 3
}
export interface GameViewer {
    showNext(teris: SquareGroup): void;
    swtich(teris: SquareGroup): void;
    init(game: Game): void;
    showScore(score: number): void;
    onGamePause(): void;
    onGameStart(): void;
    onGameOver(): void;
}
