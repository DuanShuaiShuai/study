// 泛型 是指附属于某一个函数的类型

// 一 在函数中使用泛型
// 泛型 是一个类型变量，在定义的时候无法确定具体类型，可以用该变量来表示来代替，只有在调用时候，才能确定它的类型
function take<T>(arr: T[], n: number) {
  if (n > arr.length) {
    return arr;
  }
  const newArr = [];
  for (let i = 0; i < n; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}
const newArr = take<number>([1, 2], 2);

// 二 在类型别名/接口/类型中使用泛型
// 类型别名
type callback<T> = (n: T, i: number) => boolean;
// console.log(newArr);

function filter<T>(arr: T[], callback: callback<T>) {
  const newArr: T[] = [];
  arr.forEach((o, i) => {
    if (callback(o, i)) {
      newArr.push(o);
    }
  });
  return newArr;
}

const arr = filter<number>([1, 2, 3, 4, 5, 6], (o, i) => o % 2 === 0);
// console.log(arr);
// 类型
class ArrayHelper<T> {
  constructor(private arr: T[]) {}
  private getRandom(min: number, max: number) {
    const dec = max - min;
    return Math.floor(Math.random() * dec + min);
  }
  take(n: number) {
    if (n > this.arr.length) {
      return arr;
    }
    const newArr = [];
    for (let i = 0; i < n; i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  }
  shuffle(arr: T[]) {
    this.arr.forEach((o, i) => {
      let targetIndex = this.getRandom(0, this.arr.length);
      let tem = this.arr[i];
      this.arr[i] = this.arr[targetIndex];
      this.arr[targetIndex] = tem;
    });
  }
}

// 泛型约束
// 把obj下边的name属性，首字母大写

interface hasNameProperty {
  name: string;
}
function nameToUpperCase<T extends hasNameProperty>(obj: T): T {
  obj.name = obj.name
    .split(" ")
    .map((o) => o[0].toUpperCase() + o.substr(1))
    .join(" ");
  return obj;
}
const o = {
  name: "duan shuai",
  t: "sss",
};
const newObj = nameToUpperCase(o);
console.log(newObj);
// 多泛型案例
function mixArray<T, K>(a: T[], b: K[]): (T | K)[] {
  if (a.length !== b.length) {
    throw new Error("长度不相等");
  }
  let result: (T | K)[] = [];
  arr.forEach((o, i) => {
    result.push(a[i]);
    result.push(b[i]);
  });
  return result;
}
console.log(mixArray([1, 2, 3, 4], ["a", "b", "c", "d"]));
