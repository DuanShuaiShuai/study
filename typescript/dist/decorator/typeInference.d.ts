type Type1 = "a" | "b" | "c" | "d" | "e";
type Type2 = Exclude<Type1, "b" | "c" | "f">;
type Type3 = "a" | "b" | "c" | "d" | "e";
type Type4 = Extract<Type3, "b" | "c" | "f">;
type T0 = NonNullable<string | number | undefined>;
type Type5 = () => number;
type Type6 = ReturnType<Type5>;
declare let sum: (a: number, b: number) => number;
declare let c: ReturnType<typeof sum>;
declare class User2 {
}
declare let t: InstanceType<typeof User2>;
declare class User3 {
    name: string;
}
type twoParamsConstructor = new (arg1: any, arg2: any) => User3;
declare const B: twoParamsConstructor;
interface squareConfig {
    color: string;
    width: number;
    height?: number;
}
declare function createSquare(config: squareConfig): void;
declare let config: {
    color: string;
    width: number;
};
