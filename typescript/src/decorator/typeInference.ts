type Type1 = "a" | "b" | "c" | "d" | "e";
type Type2 = Exclude<Type1, "b" | "c" | "f">;

type Type3 = "a" | "b" | "c" | "d" | "e";
type Type4 = Extract<Type3, "b" | "c" | "f">;

type T0 = NonNullable<string | number | undefined>;

type Type5 = () => number;
type Type6 = ReturnType<Type5>;

let sum = (a: number, b: number) => {
  return a + b;
};
let c: ReturnType<typeof sum> = 4;

class User2 {}

let t: InstanceType<typeof User2> = new User2();

class User3 {
  name: string = "xx";
}
type twoParamsConstructor = new (arg1: any, arg2: any) => User3;

const B: twoParamsConstructor = class Test {
  name: string = "xx";
  constructor() {}
};

interface squareConfig {
  color: string;
  width: number;
  height?: number;
}
function createSquare(config: squareConfig) {}
let config = { color: "red", width: 100 };
createSquare(config);
