declare class User1 {
    name?: string;
    gender?: string;
    age?: number;
}
type Values = keyof User1;
declare let H: Values;
type Mapish = {
    [k: string]: boolean;
};
type M = keyof Mapish;
type readonlyT<T> = {
    readonly [key in keyof T]: T[key];
};
declare let userTem: readonlyT<User1>;
