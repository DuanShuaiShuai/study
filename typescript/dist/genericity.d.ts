declare function take<T>(arr: T[], n: number): T[];
declare const newArr: number[];
type callback<T> = (n: T, i: number) => boolean;
declare function filter<T>(arr: T[], callback: callback<T>): T[];
declare const arr: number[];
declare class ArrayHelper<T> {
    private arr;
    constructor(arr: T[]);
    private getRandom;
    take(n: number): number[];
    shuffle(arr: T[]): void;
}
interface hasNameProperty {
    name: string;
}
declare function nameToUpperCase<T extends hasNameProperty>(obj: T): T;
declare const o: {
    name: string;
    t: string;
};
declare const newObj: {
    name: string;
    t: string;
};
declare function mixArray<T, K>(a: T[], b: K[]): (T | K)[];
