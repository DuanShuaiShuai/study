import { GameViewer } from "../types";
import { SquareGroup } from "../SquareGroup";
import { Game } from "../Game";
export declare class GamePageViewer implements GameViewer {
    switch(teris: SquareGroup): void;
    onGamePause(): void;
    onGameStart(): void;
    onGameOver(): void;
    showScore(score: number): void;
    private nextDom;
    private panelDom;
    private scoreDom;
    private msgDom;
    init(game: Game): void;
    showNext(teris: SquareGroup): void;
    swtich(teris: SquareGroup): void;
}
