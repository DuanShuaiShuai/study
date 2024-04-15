import { GameStatus, GameViewer } from "./types";
export declare class Game {
    private _viewer;
    private _gameStatus;
    get gameStatus(): GameStatus;
    private _curTeris?;
    private _nextTeris;
    private _timer?;
    private _duration;
    private _exists;
    private _score;
    get score(): number;
    set score(val: number);
    constructor(_viewer: GameViewer);
    private createNext;
    private init;
    start(): void;
    pause(): void;
    controlLeft(): void;
    controlRight(): void;
    controlDown(): void;
    controlRotate(): void;
    private autoDrop;
    private switchTeris;
    private resetCenterPoint;
    private hitBottom;
    private addScore;
}
