class User1 {
  name?: string;
  gender?: string;
  age?: number;
}

type Values = keyof User1;

let H: Values = "age";

type Mapish = { [k: string]: boolean };

type M = keyof Mapish;

type readonlyT<T> = {
  readonly [key in keyof T]: T[key];
};

let userTem: readonlyT<User1> = {
  name: "lll",
};

// userTem.name = "ssdfsdf";
